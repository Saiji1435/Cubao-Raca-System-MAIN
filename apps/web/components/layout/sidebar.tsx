"use client"; // <--- Add this at the very top

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Package, CheckSquare, Settings, LogOut } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Schedules", href: "/schedules" },
  { icon: CheckSquare, label: "Approvals", href: "/approvals" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white h-full flex flex-col">
      {/* Branding Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#0f172a] rounded flex items-center justify-center text-white font-bold shadow-md">
          S
        </div>
        <span className="font-black text-xl text-[#0f172a] tracking-tighter uppercase italic">
          RACA
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 text-[11px] font-black uppercase tracking-tight rounded-lg transition-all ${
                isActive 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-blue-900"
              }`}
            >
              <item.icon size={16} strokeWidth={isActive ? 3 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 px-3 py-2 text-[11px] font-black uppercase text-red-600 w-full hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={16} />
            Logout
        </button>
      </div>
    </div>
  );
}