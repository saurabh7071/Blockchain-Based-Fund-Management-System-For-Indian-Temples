"use client";

import Image from "next/image";
import metamaskLogo from "@/public/metamask-logo.png";
import { useMetamask } from "@/app/hooks/useMetamask";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthWrapper from "@/app/components/AuthWrapper";


export default function ConnectWalletTempleAdmin() {
  const { account } = useMetamask();
  const router = useRouter();

  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Metamask is not installed");
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      console.log("Connected wallet address:", walletAddress);

      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5050/api/v1/templeAdmin/store-wallet-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to store wallet address");
      }

      toast.success("Wallet connected successfully!");
      router.push("/templeadmin/dashboard");
    } catch (error: any) {
      console.error("Error connecting wallet:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };
  useEffect(() => {
    handleConnectWallet();
  }, []);

  return (
    <AuthWrapper role="templeAdmin">
      <>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Image
            src={metamaskLogo}
            alt="MetaMask"
            width={60}
            height={60}
            priority
          />
        </div>
        <p className="connect">Connect Your Metamask</p>
        <p className="connect">Wallet</p>
        <button id="button" type="button" onClick={handleConnectWallet}>
          {account ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </>
    </AuthWrapper>
  );
}
