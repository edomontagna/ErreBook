"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { properties } from "@/data/properties";
import { propertyStats } from "@/data/analytics";
import { formatCurrency, formatPercent } from "@/lib/format";

export function PropertyOverview() {
  const statsMap = new Map(
    propertyStats.map((stat) => [stat.propertyId, stat])
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {properties.map((property) => {
        const stats = statsMap.get(property.id);
        return (
          <Link
            key={property.id}
            href={`/admin/properties/${property.id}`}
            className="group"
          >
            <Card className="h-full gap-3 transition-colors group-hover:border-primary/30 group-hover:shadow-md">
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{property.address.city}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Occupazione</p>
                    <p className="font-medium">
                      {stats ? formatPercent(stats.occupancyRate) : "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ricavi</p>
                    <p className="font-medium">
                      {stats ? formatCurrency(stats.revenue) : "--"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">
                        {property.rating.toFixed(property.rating % 1 === 0 ? 0 : 2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({property.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
