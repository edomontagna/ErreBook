import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <Building2 className="h-8 w-8 text-primary" />
      </div>
      <h1 className="font-serif text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="font-serif text-2xl font-semibold mb-2">Pagina non trovata</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        La pagina che stai cercando non esiste o è stata spostata.
        Prova a tornare alla homepage o alla dashboard.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna Indietro
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
