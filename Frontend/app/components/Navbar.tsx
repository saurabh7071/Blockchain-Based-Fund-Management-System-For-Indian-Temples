"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { useMetamask } from "../hooks/useMetamask";

export default function Navbar() {
  const { account, connectWallet, loading } = useMetamask();
  const [step, setStep] = useState(0); // 0 = hello, 1 = welcome, 2 = digital seva
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation popup
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    if (!loading) {
      const helloTimer = setTimeout(() => setStep(1), 1400);
      const welcomeTimer = setTimeout(() => setStep(2), 3000);

      return () => {
        clearTimeout(helloTimer);
        clearTimeout(welcomeTimer);
      };
    }
  }, [loading]);

  const slideFade = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/v1/superAdmin/logout-superAdmin", {
        method: "POST",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (!response.ok) {
          console.error("Logout failed:", result.message || "Unknown error");
          throw new Error(result.message || "Logout failed");
        }

        // Clear all tokens and redirect to login
        sessionStorage.clear();
        localStorage.clear();
        router.push("/superadminlogin");
      } else {
        // Handle non-JSON responses (e.g., HTML error pages)
        const text = await response.text();
        console.error("Unexpected response format:", text);
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  };

  return (
    <nav className="h-16 sticky top-0 z-50 flex justify-between items-center px-6 shadow-md">
      {/* Left side greeting */}
      <div className="flex items-center text-lg gap-2 min-w-[250px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="hello"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideFade}
              transition={{ duration: 0.6 }}
              className="text-lg font-semibold text-[#b03a2e]"
            >
              Hello, Maheshwari Ji
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="welcome"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideFade}
              transition={{ duration: 0.6 }}
              className="text-lg font-semibold text-[#b03a2e]"
            >
              Welcome to Digital Seva
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="digitalseva"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-[#b03a2e]"
            >
              Digital Seva
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right side wallet status */}
      <div className="flex items-center gap-4">
        {account ? (
          <div className="wallet-connected">
            <span>Connected: {account}</span>
          </div>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            <span className="connect-button-content">Connect Wallet</span>
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)} // Show confirmation popup
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)} // Close popup
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}