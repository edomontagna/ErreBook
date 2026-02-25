"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Globe,
  CalendarDays,
  Moon,
  Users,
  CreditCard,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { useBookings } from "@/hooks/use-bookings";
import { formatCurrency, formatDate, formatDateLong, formatNights, formatGuests } from "@/lib/format";
import { SOURCE_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { getBooking } = useBookings();
  const booking = getBooking(id);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium">Prenotazione non trovata</p>
        <Link href="/admin/bookings" className="mt-2 text-primary hover:underline">
          Torna alle prenotazioni
        </Link>
      </div>
    );
  }

  const timelineSteps = [
    {
      label: "Creata",
      date: formatDate(booking.createdAt),
      icon: <FileText className="h-4 w-4" />,
      completed: true,
    },
    {
      label: "Confermata",
      date: booking.status !== "pending" && booking.status !== "cancelled" ? formatDate(booking.createdAt) : null,
      icon: <CheckCircle2 className="h-4 w-4" />,
      completed: booking.status === "confirmed" || booking.status === "completed",
    },
    {
      label: "Check-in",
      date: formatDate(booking.checkIn),
      icon: <CalendarDays className="h-4 w-4" />,
      completed: booking.status === "completed",
    },
    {
      label: "Check-out",
      date: formatDate(booking.checkOut),
      icon: <CalendarDays className="h-4 w-4" />,
      completed: booking.status === "completed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <PageHeader
            title={`Prenotazione ${booking.id}`}
            description={booking.propertyName}
          >
            <StatusBadge status={booking.status} />
          </PageHeader>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Guest Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Informazioni Ospite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
                {booking.guest.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{booking.guest.name}</p>
                <p className="text-xs text-muted-foreground">
                  Nazionalità: {booking.guest.nationality}
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{booking.guest.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{booking.guest.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{booking.guest.nationality}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Dettagli Prenotazione
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDateLong(booking.checkIn)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDateLong(booking.checkOut)}</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Durata</p>
                  <p className="font-medium">{formatNights(booking.nights)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Ospiti</p>
                  <p className="font-medium">{formatGuests(booking.guests)}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Fonte</p>
              <Badge variant="outline" className="mt-1">
                {SOURCE_LABELS[booking.source] || booking.source}
              </Badge>
            </div>
            {booking.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p className="mt-1 text-sm">{booking.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pricing Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Dettaglio Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Soggiorno base</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(booking.pricing.baseTotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pulizia</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(booking.pricing.cleaningFee)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Commissione servizio</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(booking.pricing.serviceFee)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tasse</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(booking.pricing.taxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Totale</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    {formatCurrency(booking.pricing.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stato Pagamento</span>
              <StatusBadge status={booking.paymentStatus} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Prenotazione</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, index) => (
              <div key={step.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p className="mt-2 text-xs font-medium">{step.label}</p>
                  {step.date && (
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  )}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      step.completed ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {booking.status === "pending" && (
              <>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Conferma Prenotazione
                </Button>
                <Button variant="destructive" className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Rifiuta Prenotazione
                </Button>
              </>
            )}
            {booking.status === "confirmed" && (
              <>
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Segna come Completata
                </Button>
                <Button variant="outline" className="gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Segna come No Show
                </Button>
                <Button variant="destructive" className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Cancella Prenotazione
                </Button>
              </>
            )}
            {(booking.status === "completed" || booking.status === "cancelled") && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Questa prenotazione è stata {booking.status === "completed" ? "completata" : "cancellata"}.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
