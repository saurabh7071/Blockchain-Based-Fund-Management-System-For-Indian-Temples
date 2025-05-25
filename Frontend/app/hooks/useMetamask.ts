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
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
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

  const connectWallet = async () => {
    if (!provider) {
      setError("MetaMask is not connected.");
      setLoading(false);
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const connectedAccount = accounts[0];
      setAccount(connectedAccount);
      setIsSuperAdmin(connectedAccount === SUPER_ADMIN_ADDRESS);
      await connectToPolygon();
    } catch (err) {
      setError("Failed to connect to MetaMask.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const connectToPolygon = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
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

  return { account, connectWallet, error, isSuperAdmin,loading };
};
