import { getStorageItem, setStorageItem } from "./storage";
import type { FeedingLog } from "@/types/feeding";

const STORAGE_KEY = "silkgrow:feedingLogs";

export function getFeedingLogs(): FeedingLog[] {
  return getStorageItem<FeedingLog[]>(STORAGE_KEY) || [];
}

export function addFeedingLog(log: Omit<FeedingLog, "id">): FeedingLog {
  const logs = getFeedingLogs();
  const newLog: FeedingLog = {
    ...log,
    id: `fl-${Date.now()}`
  };
  logs.push(newLog);
  setStorageItem(STORAGE_KEY, logs);
  return newLog;
}
