import { NextResponse } from "next/server";
import { analyticsDashboard } from "@/data/analytics";

export async function GET() {
  return NextResponse.json({ data: analyticsDashboard });
}
