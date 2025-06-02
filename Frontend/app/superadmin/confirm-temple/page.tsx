"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Check, X, Wallet, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { useMetamask } from "@/app/hooks/useMetamask";
import { TEMPLE_REGISTRY_ADDRESS, TEMPLE_REGISTRY_ABI } from "@/app/utils/TempleRegistry";

interface TempleConfirmation {
  id: number;
  templeName: string;
  walletId: string;
  networkType: string;
  requestDate: string;
  gasEstimate: string;
  status: string;
}

export default function ConfirmPage() {
  const { account, provider, connectWallet } = useMetamask();
  const [expandedMetaMaskCard, setExpandedMetaMaskCard] = useState<number | null>(null);
  const [expandedNetworkCard, setExpandedNetworkCard] = useState<number | null>(null);
  const [pendingConfirmations, setPendingConfirmations] = useState<TempleConfirmation[]>([]);

  const POLL_INTERVAL_MS = 5000;

  const fetchPendingConfirmations = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5050/api/v1/superAdmin/get-pending-confirmations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setPendingConfirmations(result.data);
      } else {
        toast.error(result.message || "Failed to fetch pending confirmations.");
      }
    } catch (error) {
      console.error("Error fetching confirmations:", error);
      toast.error("An error occurred while fetching pending confirmations.");
    }
  };

  const handleConfirm = async (templeAdminId: string, templeAddress: string) => {
    if (!provider || !account) {
      toast.error("Please connect your wallet first.");
      await connectWallet();
      return;
    }

    if (!ethers.isAddress(templeAddress)) {
      toast.error("Invalid temple address.");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const registry = new ethers.Contract(TEMPLE_REGISTRY_ADDRESS, TEMPLE_REGISTRY_ABI, signer);

      const currentSuperAdmin = await registry.superAdmin();
      if (account.toLowerCase() !== currentSuperAdmin.toLowerCase()) {
        toast.error("Only the superAdmin can confirm temple registration.");
        return;
      }

      const estimatedGas = await registry.registerTemple.estimateGas(templeAddress);
      const gasLimit = estimatedGas * BigInt(2);

      toast.info("Sending transaction to register temple...");
      const tx = await registry.registerTemple(templeAddress, { gasLimit });
      await tx.wait();
      toast.success("Temple successfully registered on-chain!");

      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:5050/api/v1/superAdmin/confirm-temple-admin-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ templeAdminId }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Blockchain success, but DB update failed.");
        return;
      }

      toast.success("Temple Admin confirmed and DB updated!");
      fetchPendingConfirmations();
    } catch (error: any) {
      console.error("Error during confirmation:", error);
      toast.error("Error confirming temple: " + (error?.reason || error.message || "Unknown error"));
    }
  };

  const handleRemove = (connectionId: number) => {
    console.log(`Removing network connection with ID: ${connectionId}`);
    alert(`Network connection removed for ID: ${connectionId}`);
  };

  useEffect(() => {
    fetchPendingConfirmations();
    const interval = setInterval(fetchPendingConfirmations, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Confirmation Panel</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MetaMask Connections */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Wallet className="mr-2" />
            Pending Network Connections
          </h3>
          <div className="space-y-4">
            {pendingConfirmations.length > 0 ? (
              pendingConfirmations.map((temple) => (
                <div
                  key={temple._id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setExpandedMetaMaskCard(temple._id)}
                    onMouseLeave={() => setExpandedMetaMaskCard(null)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {temple.templeName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {temple.templeLocation}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Request Time:</span>{" "}
                          {new Date(temple.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {expandedMetaMaskCard === temple._id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>

                    {expandedMetaMaskCard === temple._id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-1">
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {temple.templeLocation}
                          </p>
                          <p>
                            <span className="font-medium">Contact:</span>{" "}
                            {temple.name}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {temple.phone}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {temple.email}
                          </p>
                          <p>
                            <span className="font-medium">Wallet Address:</span>{" "}
                            {temple.walletAddress}
                          </p>
                        </div>
                        <button
                          onClick={() => handleConfirm(temple._id, temple.walletAddress)}
                          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center text-sm font-medium"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No pending confirmations available.
              </p>
            )}
          </div>
        </div>

        {/* Network Connections */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Globe className="mr-2" />
            Pending Metamask Connections
          </h3>
          <div className="space-y-4">
            {pendingNetworkConnections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => setExpandedNetworkCard(connection.id)}
                  onMouseLeave={() => setExpandedNetworkCard(null)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {connection.templeName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {connection.networkType}
                      </p>
                    </div>
                    {expandedNetworkCard === connection.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>

                  {expandedNetworkCard === connection.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-1">
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Wallet ID:</span>{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {connection.walletId}
                          </code>
                        </p>
                        <p>
                          <span className="font-medium">Network:</span>{" "}
                          {connection.networkType}
                        </p>
                        <p>
                          <span className="font-medium">Request Date:</span>{" "}
                          {connection.requestDate}
                        </p>
                        <p>
                          <span className="font-medium">Gas Estimate:</span>{" "}
                          {connection.gasEstimate}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <span className="text-orange-600">
                            {connection.status}
                          </span>
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={() => handleConfirm(connection.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center text-sm font-medium"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Confirm
                        </button>
                        <button
                          onClick={() => handleRemove(connection.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center text-sm font-medium"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
