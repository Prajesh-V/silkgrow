import { getStorageItem, setStorageItem } from "./storage";
import type { AppNotification } from "@/types/notification";

const STORAGE_KEY = "silkgrow:notificationState";

export function getNotifications(): AppNotification[] {
  return getStorageItem<AppNotification[]>(STORAGE_KEY) || [];
}

export function setNotifications(notifications: AppNotification[]): void {
  setStorageItem(STORAGE_KEY, notifications);
}

export function markAsRead(id: string): void {
  const notifications = getNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  setNotifications(updated);
}

export function markAllAsRead(): void {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  setNotifications(updated);
}

// Generate demo notifications based on current app state if none exist
export function initializeDemoNotifications(marketName: string): AppNotification[] {
  const existing = getNotifications();
  if (existing.length > 0) return existing;

  const initial: AppNotification[] = [
    {
      id: "n1",
      title: "Welcome to SilkGrow",
      message: `Your profile is linked to the ${marketName} silk belt.`,
      date: new Date().toISOString(),
      read: false,
      type: "system"
    },
    {
      id: "n2",
      title: "Price Alert",
      message: `Cocoon prices at ${marketName} Mandi have shown a slight upward trend today.`,
      date: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: "market"
    }
  ];
  setNotifications(initial);
  return initial;
}
