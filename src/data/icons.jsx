import {
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  Check,
  Circle,
  Clock,
  Code2,
  Database,
  MapPin,
  MonitorSmartphone,
  Server,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { iconKeys } from "./iconKeys";

/**
 * Registry ikon yang boleh dipakai di data.
 * JSON hanya menyimpan key (string), wrapper yang mengubahnya menjadi komponen.
 * Tambahkan key baru di iconKeys.js dan di sini secara bersamaan.
 */
export const iconMap = {
  briefcase: BriefcaseBusiness,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  check: Check,
  clock: Clock,
  code: Code2,
  database: Database,
  "map-pin": MapPin,
  "monitor-smartphone": MonitorSmartphone,
  server: Server,
  user: User,
  users: Users,
  wrench: Wrench,
};

export function getIcon(key) {
  return iconMap[key] ?? Circle;
}

if (import.meta.env?.DEV) {
  const missing = iconKeys.filter((key) => !iconMap[key]);
  if (missing.length > 0) {
    console.warn(`[icons] key belum terdaftar di iconMap: ${missing.join(", ")}`);
  }
}
