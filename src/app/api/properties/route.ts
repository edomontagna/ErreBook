import { NextResponse } from "next/server";
import { properties } from "@/data/properties";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  let result = [...properties];

  if (city) result = result.filter((p) => p.address.city === city);
  if (type) result = result.filter((p) => p.type === type);
  if (status) result = result.filter((p) => p.status === status);

  return NextResponse.json({ data: result, total: result.length });
}
