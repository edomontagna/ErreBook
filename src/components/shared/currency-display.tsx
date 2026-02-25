import { formatCurrency } from "@/lib/format";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CurrencyDisplay({ amount, className, size = "md" }: CurrencyDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-bold",
  };

  return (
    <span className={`${sizeClasses[size]} ${className || ""}`}>
      {formatCurrency(amount)}
    </span>
  );
}
