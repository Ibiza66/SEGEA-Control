export type NotificationType =
  | "critical"
  | "urgent"
  | "warning"
  | "info";

export interface Notification {
  id: string;
  title: string;
  description: string;
  daysRemaining: number;
  type: NotificationType;
  icon: string;
}