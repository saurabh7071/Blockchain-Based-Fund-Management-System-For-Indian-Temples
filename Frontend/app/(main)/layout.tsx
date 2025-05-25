// app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/CustomSidebar";
import Loading from "../components/Loading";
import { useMetamask } from "../hooks/useMetamask"; // adjust path if needed

export default function RootLayout({ children }: { children: ReactNode }) {
  const { loading } = useMetamask(); // ⬅️ Get loading state here

  if (loading) {
    return (
      <html lang="en">
        <body className="bg-[#FEF3E2] text-[#3A0519] font-sans">
          <div className="min-h-screen flex justify-center items-center">
            <Loading />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-[#FEF3E2] text-[#3A0519] font-sans">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 ml-14 md:ml-48 pt-16 p-4 transition-all duration-300">
              {children}
            </main>
          </div>
          <footer className="bg-[#F3C623] text-center py-4">
            <p>Temple Fund - Secure and Decentralized Fund Management</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
