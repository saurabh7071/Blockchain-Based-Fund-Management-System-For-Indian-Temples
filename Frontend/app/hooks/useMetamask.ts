"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Detect MetaMask
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      if (localStorage.getItem("redirectedToMetaMask") === "true") {
        localStorage.removeItem("redirectedToMetaMask");
        toast.success("MetaMask detected. Please connect your wallet.");
      }
    } else if (typeof window !== "undefined") {
      const msg = "MetaMask is not installed. Redirecting to download page...";
      setError(msg);
      setLoading(false);
      toast.error(msg);
      localStorage.setItem("redirectedToMetaMask", "true");
      window.open("https://metamask.io/download.html", "_blank");
    }
  }, []);

  // ✅ Check wallet connection
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!provider) return;

      try {
        const accounts: string[] = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await connectToPolygon();
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err);
      } finally {
        setLoading(false);
      }
    };

    checkIfWalletIsConnected();
  }, [provider]);

  // ✅ Switch to Polygon Amoy Network
  const connectToPolygon = useCallback(async () => {
    if (!window.ethereum) {
      const msg = "MetaMask is not installed!";
      setError(msg);
      toast.error(msg);
      return;
    }

    const currentProvider = new ethers.BrowserProvider(window.ethereum);
    const { chainId } = await currentProvider.getNetwork();

    if (chainId !== BigInt(80002)) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13882" }],
        });
        toast.success("Switched to Polygon Amoy network!");
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13882",
                  chainName: "Polygon Amoy Testnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc-amoy.polygon.technology"],
                  blockExplorerUrls: ["https://amoy.polygonscan.com"],
                },
              ],
            });
            toast.success("Polygon Amoy network added!");
          } catch (addError) {
            const msg = "Failed to add Polygon Amoy network.";
            setError(msg);
            toast.error(msg);
          }
        } else {
          const msg = "Please switch to the Polygon Amoy network.";
          setError(msg);
          toast.error(msg);
        }
      }
    }
  }, []);

  // ✅ Manual wallet connection
  const connectWallet = useCallback(
    async (
      onError?: (message: string, redirectToMetaMask?: boolean) => void
    ) => {
      if (!provider) {
        const msg = "MetaMask is not installed.";
        setError(msg);
        onError?.(msg, true);
        return;
      }

      try {
        const accounts: string[] = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        await connectToPolygon();
      } catch (err: any) {
        if (err.code === 4001) {
          setError("Connection request rejected by user.");
          onError?.("Connection request rejected by user.");
        } else if (err.code === -32002) {
          setError("Connection request already pending in MetaMask.");
          onError?.("Connection request already pending in MetaMask.");
        } else {
          console.error("MetaMask connection error:", err);
          setError("Failed to connect to MetaMask.");
          onError?.("Failed to connect to MetaMask.");
        }
      } finally {
        setLoading(false);
      }
    },
    [provider, connectToPolygon]
  );

  return {
    account,
    connectWallet,
    error,
    loading,
  };
};
