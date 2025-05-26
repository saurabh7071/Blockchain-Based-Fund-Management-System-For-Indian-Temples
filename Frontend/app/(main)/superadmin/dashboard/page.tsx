"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";

const SuperAdmin = () => {
  const [templeAddress, setTempleAddress] = useState("");
  const [status, setStatus] = useState("");
  const [temples, setTemples] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = "0xa02eF5665d10131E3F24bD91CF81D2013631D01A";
  const contractABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "authority",
            type: "address",
          },
        ],
        name: "TempleAuthorityAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "authority",
            type: "address",
          },
        ],
        name: "TempleAuthorityRemoved",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "authority", type: "address" },
        ],
        name: "checkTemple",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllTempleAuthorities",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getTempleAuthorityCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "isTempleAuthority",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "authority", type: "address" },
        ],
        name: "registerTemple",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "authority", type: "address" },
        ],
        name: "removeTemple",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "superAdmin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "templeAuthorities",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
  ];

  const getContract = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not installed.");
      return null;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const { chainId } = await provider.getNetwork();

    if (chainId !== BigInt(80002)) {
      setStatus("Switch to the Polygon Amoy network (Chain ID 80002).");
      return null;
    }

    return new Contract(contractAddress, contractABI, signer);
  };

  const handleTransaction = async (
    action: (contract: Contract) => Promise<void>
  ) => {
    setIsLoading(true);
    setStatus("");
    try {
      const contract = await getContract();
      if (!contract) return;
      await action(contract);
      fetchAllTemples();
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error?.reason || error?.message || "Transaction failed."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const registerTemple = async () =>
    handleTransaction(async (contract) => {
      if (!ethers.isAddress(templeAddress)) {
        throw new Error("Invalid Ethereum address.");
      }

      const tx = await contract.registerTemple(templeAddress);
      setStatus("Registering...");
      await tx.wait();
      setStatus("Temple registered ✅");
    });

  const removeTemple = async () =>
    handleTransaction(async (contract) => {
      if (!ethers.isAddress(templeAddress)) {
        throw new Error("Invalid Ethereum address.");
      }

      const tx = await contract.removeTemple(templeAddress);
      setStatus("Removing...");
      await tx.wait();
      setStatus("Temple removed ✅");
    });

  const checkTemple = async () => {
    setStatus("");
    setIsRegistered(null);

    if (!ethers.isAddress(templeAddress)) {
      setStatus("Invalid Ethereum address.");
      return;
    }

    try {
      const contract = await getContract();
      if (!contract) return;
      const registered = await contract.checkTemple(templeAddress);
      setIsRegistered(registered);
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error?.reason || error?.message || "Check failed."}`);
    }
  };

  const fetchAllTemples = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;
      const list = await contract.getAllTempleAuthorities();
      setTemples(list);
    } catch (error: any) {
      console.error(error);
      setStatus("Failed to fetch temple list.");
    }
  };

  useEffect(() => {
    fetchAllTemples();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">SuperAdmin: Manage Temples</h2>
      <input
        className="w-full p-2 mb-4 border rounded"
        type="text"
        placeholder="Enter Temple Address"
        value={templeAddress}
        onChange={(e) => setTempleAddress(e.target.value)}
      />
      <div className="flex gap-2 mb-4">
        <button disabled={isLoading} onClick={registerTemple} className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
        <button disabled={isLoading} onClick={removeTemple} className="bg-red-600 text-white px-4 py-2 rounded">
          Remove
        </button>
        <button disabled={isLoading} onClick={checkTemple} className="bg-blue-600 text-white px-4 py-2 rounded">
          Check
        </button>
      </div>

      {status && <p className="mb-2 text-sm text-gray-700">{status}</p>}

      {isRegistered !== null && (
        <p className="mb-2">
          Temple <strong>{templeAddress}</strong> is{" "}
          <span className={isRegistered ? "text-green-600" : "text-red-600"}>
            {isRegistered ? "registered ✅" : "not registered ❌"}
          </span>
        </p>
      )}

      <h3 className="mt-6 font-semibold">Registered Temples</h3>
      {temples.length > 0 ? (
        <ul className="list-disc pl-6">
          {temples.map((temple, idx) => (
            <li key={idx} className="break-all">{temple}</li>
          ))}
        </ul>
      ) : (
        <p>No temples registered yet.</p>
      )}
    </div>
  );
};

export default SuperAdmin;
