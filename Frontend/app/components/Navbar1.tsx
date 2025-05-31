"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMetamask } from "../hooks/useMetamask";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { LogOut, Wallet, ChevronDown, UserCircle, Settings } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { account, connectWallet, loading } = useMetamask();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [step, setStep] = useState(0); // 0 = hello, 1 = welcome, 2 = digital seva
  const [showConnectedButton, setShowConnectedButton] = useState(false); // 👈 for delayed button show
  
  const handleChangePassword = () => {
    alert("Change password functionality");
  };

  const [userData, setUserData] = useState<any>(null);

  // Greeting sequence
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

  // Delayed Connect Wallet button if not connected
  useEffect(() => {
    if (account) {
      const timer = setTimeout(() => {
        setShowConnectedButton(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowConnectedButton(false);
    }
  }, [account]);

  const slideFade = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const fadeIn = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
  const user = localStorage.getItem("user_data");
  if (!user && router.pathname !== "/superadminlogin") {
    router.push("/superadminlogin");
  } else if (user) {
    setUserData(JSON.parse(user));
  }
}, [router]);


  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Greeting */}
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

          {/* Right side - Wallet + Dropdown */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              {!account && showConnectedButton && (
                <motion.button
                  key="connectwalletbutton"
                  onClick={connectWallet}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                  transition={{ duration: 0.4 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  <span>
                    {loading ? "Checking Wallet..." : "Connect Wallet"}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {account && showConnectedButton && (
              <motion.button
                  key="connectedwalletbutton"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={fadeIn}
                  transition={{ duration: 0.4 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                <Wallet className="w-4 h-4" />
                <span>{`Connected: ${account.slice(0, 6)}...${account.slice(
                  -4
                )}`}</span>
              </motion.button>
            )}

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <UserCircle className="w-8 h-8" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Account Details */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-gray-800">Admin User</p>
                      <p className="text-gray-600">admin@fundmanagement.com</p>
                      <p className="text-gray-500">Super Administrator</p>
                      <p className="text-gray-500">
                        Last Login: Today, 10:30 AM
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={handleChangePassword}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                    <LogoutButton
                      logoutUrl="http://localhost:5050/api/v1/superAdmin/logout-superAdmin"
                      redirectTo="/superadminlogin"
                      onLogoutClick={() => setShowUserDropdown(false)} // close dropdown immediately on click
                    >
                      <div className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </div>
                    </LogoutButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
