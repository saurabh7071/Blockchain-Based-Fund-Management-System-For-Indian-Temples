"use client";
import { CheckCircle2, Wallet, ArrowRight } from "lucide-react";  
import { useMetamask } from "@/app/hooks/useMetamask";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthWrapper from "@/app/components/AuthWrapper";

export default function ConfirmWalletPage() {
  const { account, loading, error } = useMetamask();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<{ name: string; address: string } | null>(null);
  const [mounted, setMounted] = useState(false);
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
        body: JSON.stringify({ walletAddress: account }),
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

      toast.success("Wallet connected successfully!");
      router.push("/templeadmin/dashboard");

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
      setIsConnecting(false);
    } finally {
      console.log("Wallet connection process completed.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
  if (account) {
    handleWalletConnect();
  }
}, [account]);


  useEffect(() => {
    if (account) {
      setConnectedWallet({
        name: 'MetaMask',
        address: account,
      });
      setIsConnecting(false);
    }
  }, [account]);


  if (connectedWallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className={`w-full max-w-md transform transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-white font-bold text-xl mb-2">Wallet Connected</h2>
              <p className="text-green-100 text-sm">Your MetaMask wallet is now connected</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🦊</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{connectedWallet.name}</h3>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-600 text-xs mb-1 font-medium">Wallet Address</p>
                  <p className="text-gray-800 font-mono text-sm break-all">{connectedWallet.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
    console.log("Running useEffect to handle wallet connection...");
    handleConnectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`w-full max-w-md transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Connect Wallet</h1>
          <p className="text-gray-600">Connect your MetaMask wallet to get started</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6">
            <button
              onClick={handleWalletConnect}
              disabled={isConnecting}
              className="w-full group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">🦊</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg text-white mb-1">MetaMask</h3>
                  <p className="text-orange-100 text-sm">Connect using browser wallet</p>
                </div>
                {isConnecting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
          {isConnecting && (
            <div className="px-6 pb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-3 text-blue-800 mb-3">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="font-medium">Connecting...</span>
                </div>
                <p className="text-blue-700 text-sm">Please confirm in your MetaMask wallet</p>
              </div>
            </div>
          )}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Secure wallet connection powered by MetaMask</p>
        </div>
      </div>
    </div>
  );
}