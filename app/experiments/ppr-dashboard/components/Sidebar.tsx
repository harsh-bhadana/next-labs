"use client";

import { Home, LayoutDashboard, Settings, User, LogOut, Search } from "lucide-react";
import { Link, Button, Input } from "@heroui/react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-default-200 h-full p-4 flex flex-col gap-4 bg-background/50 backdrop-blur-md">
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
          N
        </div>
        <span className="text-xl font-bold tracking-tight">NextLabs</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarLink icon={<Home size={20} />} label="Overview" />
        <SidebarLink icon={<Search size={20} />} label="Search" />
        <SidebarLink icon={<User size={20} />} label="Account" />
        <SidebarLink icon={<Settings size={20} />} label="Settings" />
      </nav>

      <div className="pt-4 border-t border-default-200">
        <SidebarLink icon={<LogOut size={20} />} label="Sign Out" />
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active ? "bg-primary/10 text-primary font-medium" : "text-default-500 hover:bg-default-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
