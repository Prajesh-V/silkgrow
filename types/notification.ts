export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "system" | "market" | "forecast" | "booking";
}
