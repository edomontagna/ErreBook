import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; dot?: boolean }> = {
  confirmed: { label: "Confermata", variant: "default" },
  pending: { label: "In Attesa", variant: "secondary", dot: true },
  cancelled: { label: "Cancellata", variant: "destructive" },
  completed: { label: "Completata", variant: "outline" },
  no_show: { label: "No Show", variant: "destructive" },
  paid: { label: "Pagato", variant: "default" },
  overdue: { label: "Scaduto", variant: "destructive" },
  refunded: { label: "Rimborsato", variant: "outline" },
  partial: { label: "Parziale", variant: "secondary", dot: true },
  active: { label: "Attiva", variant: "default" },
  inactive: { label: "Inattiva", variant: "secondary" },
  maintenance: { label: "Manutenzione", variant: "outline", dot: true },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "secondary" as const };
  return (
    <Badge variant={config.variant} className={cn("gap-1.5", className)}>
      {config.dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {config.label}
    </Badge>
  );
}
