"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="w-full rounded-2xl bg-white p-4 shadow-xl md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Destinazione
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Dove vuoi andare?" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Check-in
          </label>
          <Input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Check-out
          </label>
          <Input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            Ospiti
          </label>
          <Input
            type="number"
            min={1}
            max={10}
            placeholder="N. ospiti"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Search button */}
        <Button
          onClick={handleSearch}
          size="lg"
          className="h-11 w-full gap-2"
        >
          <Search className="h-4 w-4" />
          Cerca Proprietà
        </Button>
      </div>
    </div>
  );
}
