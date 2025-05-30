"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const initialize = async () => {
      if (typeof window === "undefined") return;

      if (!window.ethereum) {
        const msg = "MetaMask is not installed. Redirecting to MetaMask...";
        setError(msg);
        toast.info(msg, { toastId: "metamask-not-installed" });

        localStorage.setItem("redirectedToMetaMask", "true");
        setTimeout(() => {
          window.open("https://metamask.io/download.html", "_blank");
        }, 2000);

        setLoading(false);
        return;
      }

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      if (localStorage.getItem("redirectedToMetaMask") === "true") {
        localStorage.removeItem("redirectedToMetaMask");
        toast.success("MetaMask detected. Please connect your wallet.", { toastId: "metamask-detected" });
      }

      try {
        const accounts: string[] = await ethProvider.send("eth_requestAccounts", []);
        if (accounts.length === 0) {
          const msg = "No accounts found in MetaMask.";
          setError(msg);
          toast.error(msg, { toastId: "no-accounts-found" });
          setLoading(false);
          return;
        }

        setAccount(accounts[0]);

        toast.success("Wallet connected!", { toastId: "wallet-connected" });

        const { chainId } = await ethProvider.getNetwork();
        if (chainId !== BigInt(80002)) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x13882" }],
            });
            toast.info("Switched to Polygon Amoy network.", { toastId: "network-switched" });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
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
              toast.success("Successfully added Polygon Amoy network!", { toastId: "network-added" });
            } else {
              const msg = "Please switch to the Polygon Amoy network.";
              setError(msg);
              toast.error(msg, { toastId: "switch-network-error" });
            }
          }
        }
      } catch (err: any) {
        if (err.code === 4001) {
          const msg = "Connection request rejected by user.";
          setError(msg);
          toast.error(msg, { toastId: "user-rejected" });
        } else if (err.code === -32002) {
          const msg = "Connection request already pending in MetaMask.";
          setError(msg);
          toast.error(msg, { toastId: "request-pending" });
        } else {
          console.error("MetaMask connection error:", err);
          const msg = "Failed to connect to MetaMask.";
          setError(msg);
          toast.error(msg, { toastId: "connection-failed" });
        }
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    account,
    provider,
    error,
    loading,
  };
};
