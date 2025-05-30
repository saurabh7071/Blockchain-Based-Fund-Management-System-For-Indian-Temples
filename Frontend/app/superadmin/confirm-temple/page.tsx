"use client";

import React, { useState } from "react";
import {
  Bell,
  Check,
  X,
  Wallet,
  Globe,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  getTempleRegistryContract,
  SUPER_ADMIN,
} from "@/app/utils/TempleRegistry";
import { useMetamask } from "@/app/hooks/useMetamask";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function ConfirmPage() {
  const { account, provider, error, loading } = useMetamask();
  const [expandedMetaMaskCard, setExpandedMetaMaskCard] = useState<
    number | null
  >(null);
  const [expandedNetworkCard, setExpandedNetworkCard] = useState<number | null>(
    null
  );

  const pendingMetaMaskConnections = [
    {
      id: 1,
      templeName: "Divine Temple of Prosperity",
      requestDate: "2024-01-15",
      location: "Mumbai, India",
      contactPerson: "Raj Sharma",
      phone: "+91-9876543210",
      email: "raj@divinetemple.org",
      description:
        "Ancient temple seeking blockchain integration for donation management",
    },
    {
      id: 2,
      templeName: "Sacred Heart Sanctuary",
      requestDate: "2024-01-14",
      location: "Delhi, India",
      contactPerson: "Priya Gupta",
      phone: "+91-9876543211",
      email: "priya@sacredheart.org",
      description: "Modern temple with focus on transparent fund allocation",
    },
    {
      id: 3,
      templeName: "Golden Lotus Temple",
      requestDate: "2024-01-13",
      location: "Bangalore, India",
      contactPerson: "Kumar Reddy",
      phone: "+91-9876543212",
      email: "kumar@goldenlotus.org",
      description: "Heritage temple looking to modernize donation tracking",
    },
  ];

  const pendingNetworkConnections = [
    {
      id: 1,
      templeName: "baba ram rahim",
      walletId: "0x2973ccafb0a9b0439a80d082d9c5acf254033df7",
      requestDate: "2024-01-15",
      gasEstimate: "0.023 ETH",
      status: "Pending Verification",
    },
    {
      id: 2,
      templeName: "gaurav rai",
      walletId: "0x1e846de5881612fb4bdc9dea0be0c5d79e6b9b37",
      networkType: "Polygon",
      requestDate: "2024-01-14",
      gasEstimate: "0.001 MATIC",
      status: "Ready for Confirmation",
    },
    {
      id: 3,
      templeName: "Golden Lotus Temple",
      walletId: "0x75bf063b574656c6c645615497a104482960e9ae",
      networkType: "BSC",
      requestDate: "2024-01-13",
      gasEstimate: "0.002 BNB",
      status: "Documentation Review",
    },
  ];

  const handleNotify = (templeId: number) => {
    alert(`Notification sent to temple ID: ${templeId}`);
  };

  const handleConfirm = async (connectionId: number) => {
    const connection = pendingNetworkConnections.find(
      (c) => c.id === connectionId
    );
    if (!connection || !provider) return;

    try {
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      if (signerAddress !== SUPER_ADMIN) {
        toast.error("Only SuperAdmin can confirm temple authorities.");
        return;
      }

      const contract = getTempleRegistryContract(signer);

      // 🔍 CallStatic to simulate the transaction
      await contract.callStatic.registerTemple(connection.walletId);

      // 🔍 Estimate gas
      const gasEstimate = await contract.estimateGas.registerTemple(
        connection.walletId
      );

      // ✅ Send transaction with estimated gas
      const tx = await contract.registerTemple(connection.walletId, {
        gasLimit: gasEstimate.mul(2), // Optional: buffer for safety
      });

      await tx.wait();
      toast.success(
        `Temple "${connection.templeName}" registered successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm temple authority.");
    }
  };

  const handleRemove = async (connectionId: number) => {
    const connection = pendingNetworkConnections.find(
      (c) => c.id === connectionId
    );
    if (!connection || !provider) return;

    try {
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      if (signerAddress !== SUPER_ADMIN) {
        toast.error("Only SuperAdmin can remove temple authorities.");
        return;
      }

      const contract = getTempleRegistryContract(signer);
      await contract.callStatic.removeTemple(connection.walletId);
      const gasEstimate = await contract.estimateGas.removeTemple(
        connection.walletId
      );
      const tx = await contract.removeTemple(connection.walletId, {
        gasLimit: gasEstimate.mul(2),
      });
      await tx.wait();

      await tx.wait();

      toast.success(`Temple "${connection.templeName}" removed successfully!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove temple authority.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Confirmation Panel</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MetaMask Connections */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Wallet className="mr-2" />
            Pending MetaMask Connections
          </h3>
          <div className="space-y-4">
            {pendingMetaMaskConnections.map((temple) => (
              <div
                key={temple.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => setExpandedMetaMaskCard(temple.id)}
                  onMouseLeave={() => setExpandedMetaMaskCard(null)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {temple.templeName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {temple.requestDate}
                      </p>
                    </div>
                    {expandedMetaMaskCard === temple.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>

                  {expandedMetaMaskCard === temple.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-1">
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {temple.location}
                        </p>
                        <p>
                          <span className="font-medium">Contact:</span>{" "}
                          {temple.contactPerson}
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
                          <span className="font-medium">Description:</span>{" "}
                          {temple.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotify(temple.id)}
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center text-sm font-medium"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notify
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Connections */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Globe className="mr-2" />
            Pending Network Connections
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
