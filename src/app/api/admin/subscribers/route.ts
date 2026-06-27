import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "../_auth";
import { listSubscribers } from "@/lib/data-layer";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const subscribers = await listSubscribers();
  return NextResponse.json({ subscribers });
}
