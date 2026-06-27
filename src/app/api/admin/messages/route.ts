import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "../_auth";
import { listMessages, markMessageRead, deleteMessage } from "@/lib/data-layer";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const messages = await listMessages();
  return NextResponse.json({ messages });
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, action } = await req.json();
    if (!id || action !== "markRead") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    await markMessageRead(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PATCH /api/admin/messages] Error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/messages] Error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
