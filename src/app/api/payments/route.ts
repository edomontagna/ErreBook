import { NextResponse } from "next/server";
import { payments } from "@/data/payments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let result = [...payments];

  if (status) result = result.filter((p) => p.status === status);

  return NextResponse.json({ data: result, total: result.length });
}
