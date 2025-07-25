import React from "react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: "/home-but-white.png", label: "Home" },
    { to: "/search", icon: "/search-white.png", label: "Search" },
    { to: "/upload", icon: "/plus_white.png", label: "Upload" },
    { to: "/user", icon: "/user-white.png", label: "User" },
  ];

  return (
    <nav className="bg-[#2A324B] text-white flex justify-around items-center h-12 border-t border-neutral-800 rounded-b-xl">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center ${location.pathname === item.to ? "opacity-100" : "opacity-50"
            } transition-opacity`}
        >
          <img src={item.icon} alt={item.label} className="w-5 h-5" />
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;
