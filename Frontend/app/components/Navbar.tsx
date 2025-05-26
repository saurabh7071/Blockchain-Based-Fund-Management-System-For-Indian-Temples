"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // Import router for redirection
import { useMetamask } from "../hooks/useMetamask";

export default function Navbar() {
  const { account, connectWallet, loading } = useMetamask();
  const [step, setStep] = useState(0); // 0 = hello, 1 = welcome, 2 = digital seva
 // State for logout confirmation popup

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

      </div>
    </nav>
  );
}