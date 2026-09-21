"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Store, 
  LineChart, 
  BookOpen, 
  CalendarDays,
  Settings,
  Activity
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Market", href: "/market", icon: Store },
  { name: "AI Forecast", href: "/forecast", icon: LineChart },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "My Bookings", href: "/bookings", icon: CalendarDays },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-border bg-surface shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SilkGrow Logo" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-heading font-bold text-lg text-primary block leading-none">SilkGrow</span>
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Decision Support OS</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-base font-medium transition-colors ${
                isActive 
                  ? "bg-primary text-white" 
                  : "text-text-muted hover:bg-background hover:text-text-main"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-text-muted"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border bg-background/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-base hover:bg-background transition-colors cursor-default mb-2">
          <Activity size={18} className="text-primary" />
          <div className="flex-1">
            <div className="text-sm font-medium">Sensor Mesh</div>
            <div className="text-xs text-text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Live Pulse
            </div>
          </div>
        </div>
        <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-base hover:bg-background transition-colors cursor-pointer group">
          <Settings size={18} className="text-text-muted group-hover:text-text-main" />
          <span className="text-sm font-medium text-text-muted group-hover:text-text-main">Settings & Facilities</span>
        </Link>
      </div>
    </aside>
  );
}
