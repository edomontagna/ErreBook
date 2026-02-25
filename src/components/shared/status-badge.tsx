import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  confirmed: { label: "Confermata", variant: "default" },
  pending: { label: "In Attesa", variant: "secondary" },
  cancelled: { label: "Cancellata", variant: "destructive" },
  completed: { label: "Completata", variant: "outline" },
  no_show: { label: "No Show", variant: "destructive" },
  paid: { label: "Pagato", variant: "default" },
  overdue: { label: "Scaduto", variant: "destructive" },
  refunded: { label: "Rimborsato", variant: "outline" },
  partial: { label: "Parziale", variant: "secondary" },
  active: { label: "Attiva", variant: "default" },
  inactive: { label: "Inattiva", variant: "secondary" },
  maintenance: { label: "Manutenzione", variant: "outline" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "secondary" as const };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
