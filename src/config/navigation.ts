import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
}

export const adminNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Proprietà",
    href: "/admin/properties",
    icon: Building2,
    badge: "8",
  },
  {
    title: "Prenotazioni",
    href: "/admin/bookings",
    icon: BookOpen,
    badge: "3",
  },
  {
    title: "Calendario",
    href: "/admin/calendar",
    icon: CalendarDays,
  },
  {
    title: "Pagamenti",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Impostazioni",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const publicNav = [
  { title: "Proprietà", href: "/properties" },
  { title: "Chi Siamo", href: "/about" },
  { title: "Contatti", href: "/contact" },
];
