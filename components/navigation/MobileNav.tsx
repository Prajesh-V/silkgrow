"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Store, 
  LineChart, 
  BookOpen, 
  CalendarDays 
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Market", href: "/market", icon: Store },
  { name: "Forecast", href: "/forecast", icon: LineChart },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Bookings", href: "/bookings", icon: CalendarDays },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-surface border-t border-border z-40 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full min-w-[48px] min-h-[48px]"
              aria-current={isActive ? "page" : undefined}
            >
              <div className={`flex flex-col items-center justify-center p-1 px-3 rounded-full transition-colors ${
                isActive ? "text-primary" : "text-text-muted"
              }`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "font-bold" : ""}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
