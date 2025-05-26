"use client";

import Image from "next/image";
import metamaskLogo from "@/public/metamask-logo.png";
import "@/app/signup/signup.css";
import { useMetamask } from "@/app/hooks/useMetamask";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConnectWalletTempleAdmin() {
  const { connectWallet, account } = useMetamask();
  const { uid } = useParams(); // grab uid from the URL
  const router = useRouter();
  const [hasPosted, setHasPosted] = useState(false); // to avoid multiple posts

  const handleConnectWallet = () => {
    connectWallet((message: string, redirectToMetaMask?: boolean) => {
      toast.error(message);
      if (redirectToMetaMask) {
        setTimeout(() => {
          window.open("https://metamask.io/download/", "_blank");
        }, 4000);
      }
    });
  };

  useEffect(() => {
    const postWalletAddress = async () => {
      if (!account || !uid || hasPosted) return;

      try {
        const res = await fetch("/api/templeadmin/connect-wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, walletAddress: account }),
        });

        if (!res.ok) throw new Error("Failed to save wallet address");

        toast.success("✅ Wallet address linked successfully!");

        setHasPosted(true);

        // ⏳ Redirect to dashboard after 5 seconds
        setTimeout(() => {
          router.push("/templeadmin/dashboard");
        }, 5000);
      } catch (error: any) {
        toast.error(`❌ ${error.message}`);
      }
    };

    postWalletAddress();
  }, [account, uid, hasPosted, router]);

  return (
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
      {account && <div className="connectedAccount">Connected: {account}</div>}
    </>
  );
}
