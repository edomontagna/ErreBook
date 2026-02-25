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
  // segments[0] is "admin", segments[1] is the page
  const currentPage = breadcrumbMap[segments[1]] || segments[1] || "Dashboard";

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6">
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
        <span className="text-muted-foreground">ErreBook</span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{currentPage}</span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex relative w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cerca..." className="pl-8 h-9" />
      </div>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
          3
        </Badge>
      </Button>

      {/* User avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          ER
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
