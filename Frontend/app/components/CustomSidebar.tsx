"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconHome, IconUser, IconSettings, IconList } from "@tabler/icons-react";
import Link from "next/link";


import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconHome, IconUser, IconSettings, IconList } from "@tabler/icons-react";
import "./styles/sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//  const role = useUserRole();
const role = "superadmin"; // Hardcoded for testing, replace with useUserRole()

  // Detect role from the route
  const isSuperAdmin = pathname.startsWith("/superadmin");
  const isTempleAdmin = pathname.startsWith("/templeadmin");


  const superAdminLinks = [
    { label: "Dashboard", href: "/superadmin/dashboard", icon: <IconHome size={20} /> },
    { label: "Register", href: "/superadmin/register-temple", icon: <IconUser size={20} /> },
    { label: "Confirm", href: "/superadmin//confirm-temple", icon: <IconSettings size={20} /> },
    { label: "List of Registered", href: "/superadmin/registered-temples", icon: <IconList size={20} /> },
  ];

  const templeAdminLinks = [
    { label: "Dashboard", href: "/templeadmin/dashboard", icon: <IconHome size={20} /> },
    // Add more temple admin links as needed
  ];


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

  const navLinks = role === "superadmin" ? superAdminLinks : templeAdminLinks;

  const navLinks = isSuperAdmin
    ? superAdminLinks
    : isTempleAdmin
    ? templeAdminLinks
    : [];


  // Don’t show the sidebar if the route doesn't match any role prefix
  if (navLinks.length === 0) return null;

  return (
    <aside className="sidebar">
      <ul className="nav-list">
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li key={index}>
              <Link
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <div className="icon">{link.icon}</div>
                <span className="label">{link.label}</span>
              </Link>
              
            </li>
          );
        })}
        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)} // Show confirmation popup
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

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
      </ul>
    </aside>
  );
}
