"use client";
import { useState, useEffect } from "react";
import { IconHome, IconUser, IconSettings, IconList } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/sidebar.css";

// Dummy function — replace with real role-fetching logic
// const useUserRole = (): "superadmin" | "templeadmin" | null => {
//   // Example: use context or fetch logic here
//   const [role, setRole] = useState<"superadmin" | "templeadmin" | null>(null);

//   useEffect(() => {
//     // Replace with your logic to fetch role (e.g., from MongoDB/API)
//     const fetchRole = async () => {
//       const wallet = window.localStorage.getItem("wallet"); // Or from context
//       if (wallet === "") {
//         setRole("superadmin");
//       } else {
//         setRole("templeadmin");
//       }
//     };
//     fetchRole();
//   }, []);

//   return role;
// };

export default function Sidebar() {
  const pathname = usePathname();
//  const role = useUserRole();
const role = "superadmin"; // Hardcoded for testing, replace with useUserRole()

  const superAdminLinks = [
    { label: "Register", href: "/superadmin/register-temple", icon: <IconUser size={20} /> },
    { label: "Confirm", href: "/superadmin/dashboard/confirm-temple", icon: <IconSettings size={20} /> },
    { label: "List of Registered", href: "/superadmin/dashboard/registered-temples", icon: <IconList size={20} /> },
  ];

  const templeAdminLinks = [
    { label: "Register Campaign", href: "/templeadmin/dashboard/register-campaign", icon: <IconHome size={20} /> },
    // Add temple admin-specific links here
  ];

  const navLinks = role === "superadmin" ? superAdminLinks : templeAdminLinks;

  if (!role) return null; // or a loader

  return (
    <aside
      className={`sidebar`}
    >
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
                <span className={`label`}>
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
