"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { bookings } from "@/data/bookings";
import { formatCurrency, formatDate } from "@/lib/format";

const recentBookings = [...bookings]
  .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
  .slice(0, 5);

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prenotazioni Recenti</CardTitle>
        <CardDescription>Le 5 prenotazioni con check-in piu recente</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ospite</TableHead>
              <TableHead>Struttura</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Importo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.guest.name}</TableCell>
                <TableCell className="max-w-[180px] truncate text-muted-foreground">
                  {booking.propertyName}
                </TableCell>
                <TableCell>{formatDate(booking.checkIn)}</TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(booking.pricing.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
