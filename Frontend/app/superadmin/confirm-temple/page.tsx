"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Wallet,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ConfirmPage() {
  const [expandedMetaMaskCard, setExpandedMetaMaskCard] = useState(null);
  const [expandedNetworkCard, setExpandedNetworkCard] = useState(null);
  const [pendingConfirmations, setPendingConfirmations] = useState([]);

  const pendingNetworkConnections = [
    {
      id: 1,
      templeName: "Divine Temple of Prosperity",
      walletId: "0x742d35Cc6637C0532c2c0b6C7C7d7f6",
      networkType: "Ethereum Mainnet",
      requestDate: "2024-01-15",
      gasEstimate: "0.023 ETH",
      status: "Pending Verification",
    },
    {
      id: 2,
      templeName: "Sacred Heart Sanctuary",
      walletId: "0x8ba1f109551bD432803012645Hac136c",
      networkType: "Polygon",
      requestDate: "2024-01-14",
      gasEstimate: "0.001 MATIC",
      status: "Ready for Confirmation",
    },
    {
      id: 3,
      templeName: "Golden Lotus Temple",
      walletId: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      networkType: "BSC",
      requestDate: "2024-01-13",
      gasEstimate: "0.002 BNB",
      status: "Documentation Review",
    },
  ];

  const handleNotify = (templeId) => {
    console.log(`Notification sent to temple ID: ${templeId}`);
    alert(`Notification sent to temple ID: ${templeId}`);
  };

  const fetchPendingConfirmations = async () => {
    console.log("Fetching pending confirmations...");
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);

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

      console.log("Fetch Response Status:", response.status);

      const result = await response.json();
      console.log("Fetch Result:", result);

      if (response.ok) {
        setPendingConfirmations(result.data);
        console.log("Pending confirmations updated:", result.data);
      } else {
        toast.error(result.message || "Failed to fetch pending confirmations.");
      }
    } catch (error) {
      console.error("Error fetching pending confirmations:", error);
      toast.error("An error occurred while fetching pending confirmations.");
    }
  };

  useEffect(() => {
    console.log("Initializing ConfirmPage...");
    fetchPendingConfirmations();
    const interval = setInterval(fetchPendingConfirmations, 5000); // poll every 5 seconds
    return () => {
      console.log("Cleaning up ConfirmPage...");
      clearInterval(interval);
    };
  }, []);

  const handleConfirm = async (templeAdminId: string) => {
    console.log(`Confirming temple admin with ID: ${templeAdminId}`);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);

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

      console.log("Confirm Response Status:", response.status);

      const result = await response.json();
      console.log("Confirm Result:", result);

      if (!response.ok) {
        toast.error(
          result.message || "Failed to confirm registration. Please try again."
        );
        return;
      }

      toast.success(
        "Temple Admin registration confirmed and deployed on blockchain!"
      );
      fetchPendingConfirmations(); // Refresh list of pending confirmations
    } catch (error) {
      console.error("Confirmation error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleRemove = (connectionId) => {
    console.log(`Removing network connection with ID: ${connectionId}`);
    alert(`Network connection removed for ID: ${connectionId}`);
  };

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
                          onClick={() => handleConfirm(temple._id)}
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
