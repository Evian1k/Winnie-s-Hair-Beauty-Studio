import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createMessage } from "@/lib/data-layer";
import { sendContactNotification, sendContactAutoresponder, emailEnabled } from "@/lib/email";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(5, "Message is too short"),
});

// Honeypot field — bots fill this in, real users don't
const contactSchemaWithHoneypot = contactSchema.extend({
  website: z.string().optional(), // honeypot
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot — silently succeed if filled (bot trap)
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = contactSchemaWithHoneypot.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;
    const msg = await createMessage({ name, email, phone, message });

    if (emailEnabled) {
      Promise.all([
        sendContactNotification({ name, email, phone, message }),
        sendContactAutoresponder({ name, email }),
      ]).catch((err) => console.error("[Email] Failed to send contact emails:", err));
    } else {
      console.log("[Contact — demo mode] Saved message:", msg.id);
    }

    return NextResponse.json({ success: true, id: msg.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/contact] Error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
