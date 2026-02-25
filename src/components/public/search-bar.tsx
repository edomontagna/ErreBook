"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProperties } from "@/hooks/use-properties";

export function SearchBar() {
  const router = useRouter();
  const { cities } = useProperties();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("city", location);
    if (guests) params.set("guests", guests);
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="bg-white p-5 shadow-card border border-stone-100 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:items-end">
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/40">
            <MapPin className="h-3 w-3" /> Destinazione
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-10 w-full border-stone-200 text-sm">
              <SelectValue placeholder="Dove?" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/40">
            <CalendarDays className="h-3 w-3" /> Check-in
          </label>
          <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="h-10 border-stone-200 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/40">
            <CalendarDays className="h-3 w-3" /> Check-out
          </label>
          <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="h-10 border-stone-200 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-forest/40">
            <Users className="h-3 w-3" /> Ospiti
          </label>
          <Input type="number" min={1} max={10} placeholder="N." value={guests} onChange={(e) => setGuests(e.target.value)} className="h-10 border-stone-200 text-sm" />
        </div>
        <button
          onClick={handleSearch}
          className="h-10 w-full bg-terra text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-terra-hover hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="h-3.5 w-3.5" /> Cerca
        </button>
      </div>
    </div>
  );
}
