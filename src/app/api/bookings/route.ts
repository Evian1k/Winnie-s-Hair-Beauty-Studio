import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/lib/data-layer";
import {
  sendBookingConfirmationEmail,
  sendAdminBookingNotification,
  emailEnabled,
} from "@/lib/email";

export const runtime = "nodejs";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  serviceName: z.string().min(1),
  category: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  stylistId: z.string().min(1),
  stylistName: z.string().min(1),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(8),
  notes: z.string().optional(),
  price: z.number().min(0),
});

// Simple in-memory rate limiting (per-IP, 5 bookings per 10 minutes)
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
        { error: "Too many booking attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const booking = await createBooking(parsed.data);

    // Send emails (async, non-blocking — don't fail the request if email fails)
    if (emailEnabled) {
      Promise.all([
        sendBookingConfirmationEmail(booking),
        sendAdminBookingNotification(booking),
      ]).catch((err) => console.error("[Email] Failed to send booking emails:", err));
    } else {
      console.log("[Booking — demo mode] Created booking:", booking.id);
    }

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/bookings] Error:", err);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await import("@/lib/data-layer").then((m) => m.listBookings());
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("[GET /api/bookings] Error:", err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
