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
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async (): Promise<string | null> => {
  setLoading(true);

  if (typeof window === "undefined" || !window.ethereum) {
    const msg = "MetaMask is not installed.";
    setError(msg);
    toast.info(msg);
    setLoading(false);
    return null;
  }

  const ethProvider = new ethers.BrowserProvider(window.ethereum);
  setProvider(ethProvider);

  try {
    const accounts: string[] = await ethProvider.send("eth_requestAccounts", []);
    if (accounts.length === 0) {
      const msg = "No accounts found in MetaMask.";
      setError(msg);
      toast.error(msg);
      return null;
    }

    const connectedAccount = accounts[0];
    setAccount(connectedAccount);
    localStorage.setItem("connectedAccount", connectedAccount);

    const { chainId } = await ethProvider.getNetwork();
    if (chainId !== BigInt(80002)) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13882" }],
        });
        toast.info("Switched to Polygon Amoy network.");
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13882",
                chainName: "Polygon Amoy Testnet",
                nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
                rpcUrls: ["https://rpc-amoy.polygon.technology"],
                blockExplorerUrls: ["https://amoy.polygonscan.com"],
              },
            ],
          });
          toast.success("Successfully added Polygon Amoy network!");
        } else {
          const msg = "Please switch to the Polygon Amoy network.";
          setError(msg);
          toast.error(msg);
        }
      }
    }

    return connectedAccount;
  } catch (err: any) {
    let msg = "Failed to connect to MetaMask.";
    if (err.code === 4001) {
      msg = "Connection request rejected by user.";
    } else if (err.code === -32002) {
      msg = "Connection request already pending in MetaMask.";
    }

    console.error("MetaMask connection error:", err);
    setError(msg);
    toast.error(msg);
    return null;
  } finally {
    setLoading(false);
  }
};
  // Auto-connect if account exists in localStorage or if MetaMask is still connected
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window === "undefined" || !window.ethereum) return;

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      const accounts: string[] = await ethProvider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem("connectedAccount", accounts[0]);
      }
    };

    autoConnect();
  }, []);

  return {
    account,
    provider,
    error,
    loading,
    connectWallet,
  };
};
