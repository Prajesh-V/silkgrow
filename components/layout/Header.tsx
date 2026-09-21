"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { getStorageItem, STORAGE_KEYS } from "@/lib/storage";
import type { DemoUser, Market } from "@/types";
import marketsData from "@/data/markets.json";

import { 
  getNotifications, 
  setNotifications, 
  markAsRead, 
  markAllAsRead, 
  initializeDemoNotifications 
} from "@/lib/notification";
import type { AppNotification } from "@/types/notification";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [notifications, setNotificationsState] = useState<AppNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedUser = getStorageItem<DemoUser>(STORAGE_KEYS.USER);
    setUser(storedUser);
    
    const marketId = getStorageItem<string>(STORAGE_KEYS.SELECTED_MARKET) || (marketsData as Market[])[0].id;
    const market = (marketsData as Market[]).find(m => m.id === marketId) || (marketsData as Market[])[0];
    setSelectedMarket(market);

    // Init notifications
    if (storedUser) {
      const notifs = initializeDemoNotifications(market.name);
      setNotificationsState(notifs);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = (id: string) => {
    markAsRead(id);
    setNotificationsState(getNotifications());
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    setNotificationsState(getNotifications());
  };

  const renderNotificationPopover = () => (
    <div className="fixed top-[72px] left-4 right-4 w-auto md:absolute md:top-12 md:right-0 md:left-auto md:w-[360px] bg-surface border border-border rounded-lg shadow-xl z-50 flex flex-col max-h-[calc(100vh-100px)] md:max-h-[70vh] overflow-hidden origin-top-right">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50 shrink-0">
        <h3 className="font-bold text-sm">Notifications</h3>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-xs text-primary font-medium hover:underline">
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-text-muted">No notifications right now.</div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-4 border-b border-border/50 last:border-0 hover:bg-background/50 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
              onClick={() => handleMarkRead(n.id)}
            >
              <div className="flex gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                <div>
                  <h4 className={`text-sm ${!n.read ? 'font-bold text-text-main' : 'font-medium text-text-muted'}`}>{n.title}</h4>
                  <p className="text-xs text-text-muted mt-1">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-40 bg-surface border-b border-border h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SilkGrow Logo" className="w-8 h-8 object-contain" />
          <span className="font-heading font-bold text-lg text-primary">SilkGrow</span>
        </div>
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-text-muted hover:text-primary transition-colors relative" aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>}
          </button>
          {showNotifications && renderNotificationPopover()}
          <Link href="/profile" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center cursor-pointer">
            <User size={16} className="text-text-muted" />
          </Link>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-40 bg-surface border-b border-border h-16 px-6 items-center justify-between shrink-0">
        <div className="flex-1 max-w-xl flex items-center bg-background rounded-base px-3 py-2 border border-border">
          <Search size={18} className="text-text-muted" />
          <input
            type="text"
            placeholder="Search rearing batches, market mandi rates..."
            className="w-full bg-transparent border-none focus:outline-none ml-2 text-sm text-text-main placeholder:text-text-muted"
            readOnly
          />
        </div>
        <div className="flex items-center gap-6 ml-4">
          <div className="text-sm text-text-muted font-medium bg-background px-3 py-1 rounded-full border border-border">
            {mounted && selectedMarket ? `${selectedMarket.name} Silk Belt • Sunny 28°C` : "Loading..."}
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-text-muted hover:text-primary transition-colors relative mt-1" aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>}
            </button>
            {showNotifications && renderNotificationPopover()}
          </div>
          <Link href="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-background px-2 py-1 rounded-md transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium">{mounted ? (user?.name || "Farmer") : ""}</span>
          </Link>
        </div>
      </header>
    </>
  );
}
