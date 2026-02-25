"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { useBookings } from "@/hooks/use-bookings";
import { formatCurrency, formatDate } from "@/lib/format";
import { SOURCE_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { bookings, pendingCount } = useBookings({
    search,
    status: statusFilter && statusFilter !== "all" ? statusFilter : undefined,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader title="Prenotazioni" description="Gestisci tutte le prenotazioni">
        {pendingCount > 0 && (
          <Badge variant="secondary" className="text-sm">
            {pendingCount} in attesa
          </Badge>
        )}
      </PageHeader>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca per ospite, proprietà o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tutti gli stati" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="pending">In Attesa</SelectItem>
            <SelectItem value="confirmed">Confermata</SelectItem>
            <SelectItem value="completed">Completata</SelectItem>
            <SelectItem value="cancelled">Cancellata</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ospite</TableHead>
                <TableHead>Proprietà</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Totale</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">
                    {booking.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {booking.guest.name}
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate text-muted-foreground">
                    {booking.propertyName}
                  </TableCell>
                  <TableCell>{formatDate(booking.checkIn)}</TableCell>
                  <TableCell>{formatDate(booking.checkOut)}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(booking.pricing.total)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {SOURCE_LABELS[booking.source] || booking.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/bookings/${booking.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">Nessuna prenotazione trovata</p>
          <p className="text-muted-foreground">
            Prova a modificare i filtri di ricerca
          </p>
        </div>
      )}
    </motion.div>
  );
}
