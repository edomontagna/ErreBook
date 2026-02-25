"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  properties: "Proprietà",
  bookings: "Prenotazioni",
  calendar: "Calendario",
  payments: "Pagamenti",
  analytics: "Analytics",
  settings: "Impostazioni",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentPage = breadcrumbMap[segments[1]] || segments[1] || "Dashboard";

  return (
    <header className="flex h-14 items-center gap-4 border-b border-stone-100 bg-white px-4 lg:px-8">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Menu di navigazione</SheetTitle>
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">ErreBook</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-sm font-medium">{currentPage}</span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex relative w-56">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cerca..." className="pl-8 h-8 text-sm border-stone-200" />
      </div>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative h-8 w-8">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] bg-terra text-white">
          3
        </Badge>
      </Button>

      {/* Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-forest text-terra text-xs font-semibold">
          ER
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
