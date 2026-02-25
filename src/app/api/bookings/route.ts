import { NextResponse } from "next/server";
import { bookings } from "@/data/bookings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const propertyId = searchParams.get("propertyId");

  let result = [...bookings];

  if (status) result = result.filter((b) => b.status === status);
  if (propertyId) result = result.filter((b) => b.propertyId === propertyId);

  return NextResponse.json({ data: result, total: result.length });
}
