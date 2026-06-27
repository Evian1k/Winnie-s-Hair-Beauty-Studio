import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriber } from "@/lib/data-layer";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email("Valid email is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const result = await addSubscriber(parsed.data.email);
    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 409 });
    }
    return NextResponse.json({ success: true, message: result.message }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/newsletter] Error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
