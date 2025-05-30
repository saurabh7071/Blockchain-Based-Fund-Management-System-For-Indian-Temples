"use client";

import Image from "next/image";
import metamaskLogo from "@/public/metamask-logo.png";
import { useMetamask } from "@/app/hooks/useMetamask";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function ConnectWalletTempleAdmin() {
  const { account } = useMetamask();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectWallet = async () => {
    console.log("Starting wallet connection...");
    setIsLoading(true);

    try {
      // Check if Metamask is installed
      if (typeof window.ethereum === "undefined") {
        console.error("Metamask is not installed");
        throw new Error("Metamask is not installed");
      }

      console.log("Requesting Metamask accounts...");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      console.log("Connected wallet address:", walletAddress);

      // Get access token from session storage
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);

      // Store wallet address in the backend
      console.log("Sending wallet address to backend...");
      const response = await fetch("http://localhost:5050/api/v1/templeAdmin/store-wallet-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ walletAddress }),
      });

      console.log("Store wallet address response status:", response.status);
      const result = await response.json();
      console.log("Store wallet address result:", result);

      if (result.success) {
        toast.success("Wallet connected successfully!");
        console.log("Wallet successfully stored in the backend.");

        // Notify Super Admin about the pending confirmation
        console.log("Notifying Super Admin about pending confirmation...");
        const notifyResponse = await fetch("http://localhost:5050/api/v1/superAdmin/confirm-temple-admin-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ templeAdminId: result.data.templeAdminId }),
        });

        console.log("Notify Super Admin response status:", notifyResponse.status);
        const notifyResult = await notifyResponse.json();
        console.log("Notify Super Admin result:", notifyResult);

        if (!notifyResponse.ok) {
          console.error("Failed to notify Super Admin:", notifyResult.message);
          toast.error(notifyResult.message || "Failed to notify SuperAdmin. Please try again.");
          setIsLoading(false);
          return;
        }

        toast.success("Super Admin notified for confirmation!");
        console.log("Super Admin successfully notified.");
        router.push("/templeadmin/dashboard");
      } else {
        console.error("Failed to store wallet address:", result.message);
        toast.error(result.message || "Failed to connect wallet. Please try again.");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      console.log("Wallet connection process completed.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Running useEffect to handle wallet connection...");
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