'use client';

import "./globals.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TempleLoader from "./components/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500); // adjust as needed, or remove delay for instant load off

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="bg-[#FEF3E2] text-[#3A0519] font-sans">
        {isLoading ? (
          <TempleLoader />
        ) : (
          <>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </>
        )}
      </body>
    </html>
  );
}
