"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconHome, IconUser, IconSettings, IconList } from "@tabler/icons-react";
import "./styles/sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();

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
      </ul>
    </aside>
  );
}
