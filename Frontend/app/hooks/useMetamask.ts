"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const SUPER_ADMIN_ADDRESS = "0x2973CCafB0A9b0439a80d082d9c5ACf254033dF7";

  // Setup provider
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    } else {
      setError("MetaMask is not installed.");
    }
  }, []);

  // Automatically check wallet connection
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (!provider) return;

      try {
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          const connectedAccount = accounts[0];
          setAccount(connectedAccount);
          setIsSuperAdmin(connectedAccount === SUPER_ADMIN_ADDRESS);
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

  // 🔥 Main wallet connection function
  const connectWallet = async (
    onError?: (message: string, redirectToMetaMask?: boolean) => void
  ) => {
    if (!provider) {
      const msg = "MetaMask is not installed. Redirecting...";
      setError(msg);
      onError?.(msg, true);
      setLoading(false);
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const connectedAccount = accounts[0];
      setAccount(connectedAccount);
      setIsSuperAdmin(connectedAccount === SUPER_ADMIN_ADDRESS);
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
  };

  const connectToPolygon = async () => {
    if (!window.ethereum) {
      const msg = "Please install MetaMask!";
      setError(msg);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    if (chainId !== BigInt(137)) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
        console.log("Switched to Polygon network!");
      } catch (switchError) {
        console.log(switchError);
        setError("Please switch to the Polygon network.");
      }
    }
  };

  return {
    account,
    connectWallet,
    error,
    isSuperAdmin,
    loading,
  };
};
