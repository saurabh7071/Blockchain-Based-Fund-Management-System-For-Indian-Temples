"use client";

import { usePathname } from "next/navigation";
import { IconHome, IconUser, IconSettings, IconList } from "@tabler/icons-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import "./styles/sidebar.css";

export default function Sidebar() {
  const pathname = usePathname();

  const isSuperAdmin = pathname.startsWith("/superadmin");
  const isTempleAdmin = pathname.startsWith("/templeadmin");

  const superAdminLinks = [
    { label: "Dashboard", href: "/superadmin/dashboard", icon: <IconHome size={20} /> },
    { label: "Register", href: "/superadmin/register-temple", icon: <IconUser size={20} /> },
    { label: "Confirm", href: "/superadmin/confirm-temple", icon: <IconSettings size={20} /> },
    { label: "List of Registered", href: "/superadmin/registered-temples", icon: <IconList size={20} /> },
  ];

  const templeAdminLinks = [
    { label: "Dashboard", href: "/templeadmin/dashboard", icon: <IconHome size={20} /> },
    // Add more links here
  ];

  const navLinks = isSuperAdmin
    ? superAdminLinks
    : isTempleAdmin
    ? templeAdminLinks
    : [];

  if (navLinks.length === 0) return null;

  const logoutUrl = isSuperAdmin
    ? "http://localhost:5050/api/v1/superAdmin/logout-superAdmin"
    : isTempleAdmin
    ? "http://localhost:5050/api/v1/templeAdmin/logout-Temple-Admin"
    : "";

  const redirectTo = isSuperAdmin
    ? "/superadminlogin"
    : isTempleAdmin
    ? "/templelogin"
    : "/";

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

        {/* ✅ Reusable and role-aware logout button */}
        <li>
          <LogoutButton logoutUrl={logoutUrl} redirectTo={redirectTo} />
        </li>
      </ul>
    </aside>
  );
}
