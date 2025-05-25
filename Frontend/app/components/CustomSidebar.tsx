"use client";
import { useState } from "react";
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";  // import this
import "./styles/sidebar.css";

const navLinks = [
  { label: "Home", href: "/", icon: <IconHome size={20} /> },
  { label: "Register", href: "/register", icon: <IconUser size={20} /> },
  { label: "Confirm", href: "/confirm", icon: <IconSettings size={20} /> },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname(); // get current URL path

  return (
    <aside
      className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
                <span className={`label ${isHovered ? "show" : "hide"}`}>
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
