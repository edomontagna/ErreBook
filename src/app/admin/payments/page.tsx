"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search,
  Euro,
  Clock,
  AlertTriangle,
  RotateCcw,
  CreditCard,
  Building2,
  Banknote,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { payments } from "@/data/payments";
import { formatCurrency, formatDate } from "@/lib/format";
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

const METHOD_LABELS: Record<string, string> = {
  stripe: "Stripe",
  bank_transfer: "Bonifico",
  cash: "Contanti",
  paypal: "PayPal",
};

const METHOD_ICONS: Record<string, React.ReactNode> = {
  stripe: <CreditCard className="h-3.5 w-3.5" />,
  bank_transfer: <Building2 className="h-3.5 w-3.5" />,
  cash: <Banknote className="h-3.5 w-3.5" />,
  paypal: <CreditCard className="h-3.5 w-3.5" />,
};

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filteredPayments = useMemo(() => {
    let result = [...payments];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.guestName.toLowerCase().includes(q) ||
          p.propertyName.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter && statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    return result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [search, statusFilter]);

  const totals = useMemo(() => {
    const paid = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = payments
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const overdue = payments
      .filter((p) => p.status === "overdue")
      .reduce((sum, p) => sum + p.amount, 0);
    const refunded = payments
      .filter((p) => p.status === "refunded")
      .reduce((sum, p) => sum + p.amount, 0);
    return { paid, pending, overdue, refunded };
  }, []);

  const summaryCards = [
    {
      title: "Totale Ricevuto",
      value: formatCurrency(totals.paid),
      icon: <Euro className="h-5 w-5 text-emerald-600" />,
      color: "text-emerald-600",
    },
    {
      title: "In Attesa",
      value: formatCurrency(totals.pending),
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      color: "text-amber-600",
    },
    {
      title: "Scaduti",
      value: formatCurrency(totals.overdue),
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      color: "text-red-600",
    },
    {
      title: "Rimborsati",
      value: formatCurrency(totals.refunded),
      icon: <RotateCcw className="h-5 w-5 text-blue-600" />,
      color: "text-blue-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className="space-y-6"
    >
      <PageHeader title="Pagamenti" description="Gestisci i pagamenti delle prenotazioni" />

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
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
            <SelectItem value="paid">Pagato</SelectItem>
            <SelectItem value="pending">In Attesa</SelectItem>
            <SelectItem value="overdue">Scaduto</SelectItem>
            <SelectItem value="refunded">Rimborsato</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ospite</TableHead>
                <TableHead>Proprietà</TableHead>
                <TableHead className="text-right">Importo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Metodo</TableHead>
                <TableHead>Scadenza</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                  <TableCell className="font-medium">{payment.guestName}</TableCell>
                  <TableCell className="max-w-[180px] truncate text-muted-foreground">
                    {payment.propertyName}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {METHOD_ICONS[payment.method]}
                      <span className="text-sm">
                        {METHOD_LABELS[payment.method] || payment.method}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">Nessun pagamento trovato</p>
          <p className="text-muted-foreground">
            Prova a modificare i filtri di ricerca
          </p>
        </div>
      )}
    </motion.div>
  );
}
