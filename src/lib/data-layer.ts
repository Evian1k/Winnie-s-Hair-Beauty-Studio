/**
 * Data Access Layer
 * ----------------
 * Uses Prisma (Supabase Postgres in production, SQLite in dev) when
 * DATABASE_URL is configured. Otherwise falls back to an in-memory store
 * (the frontend uses localStorage separately via Zustand).
 *
 * All API routes use this layer — they work in both demo and production modes.
 */

import { db } from "@/lib/db";

export const dbEnabled = Boolean(process.env.DATABASE_URL);

// ===== Bookings =====

export interface BookingInput {
  serviceId: string;
  serviceName: string;
  category: string;
  date: string; // ISO
  time: string;
  stylistId: string;
  stylistName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  price: number;
}

export interface BookingRecord extends BookingInput {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export async function createBooking(input: BookingInput): Promise<BookingRecord> {
  if (dbEnabled) {
    const booking = await db.booking.create({
      data: {
        ...input,
        date: new Date(input.date),
      },
    });
    return { ...booking, date: booking.date.toISOString(), status: booking.status as BookingRecord["status"] };
  }

  // In-memory fallback
  const booking: BookingRecord = {
    ...input,
    id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  inMemoryBookings.unshift(booking);
  return booking;
}

export async function listBookings(): Promise<BookingRecord[]> {
  if (dbEnabled) {
    const bookings = await db.booking.findMany({ orderBy: { createdAt: "desc" } });
    return bookings.map((b) => ({ ...b, date: b.date.toISOString(), status: b.status as BookingRecord["status"] }));
  }
  return [...inMemoryBookings];
}

export async function updateBookingStatus(
  id: string,
  status: BookingRecord["status"]
): Promise<BookingRecord | null> {
  if (dbEnabled) {
    const booking = await db.booking.update({ where: { id }, data: { status } });
    return { ...booking, date: booking.date.toISOString(), status: booking.status as BookingRecord["status"] };
  }
  const idx = inMemoryBookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  inMemoryBookings[idx].status = status;
  return inMemoryBookings[idx];
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (dbEnabled) {
    await db.booking.delete({ where: { id } });
    return true;
  }
  const idx = inMemoryBookings.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  inMemoryBookings.splice(idx, 1);
  return true;
}

// ===== Contact Messages =====

export interface MessageInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface MessageRecord extends MessageInput {
  id: string;
  read: boolean;
  createdAt: string;
}

export async function createMessage(input: MessageInput): Promise<MessageRecord> {
  if (dbEnabled) {
    return await db.contactMessage.create({ data: input });
  }
  const msg: MessageRecord = {
    ...input,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  inMemoryMessages.unshift(msg);
  return msg;
}

export async function listMessages(): Promise<MessageRecord[]> {
  if (dbEnabled) {
    return await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  }
  return [...inMemoryMessages];
}

export async function markMessageRead(id: string): Promise<boolean> {
  if (dbEnabled) {
    await db.contactMessage.update({ where: { id }, data: { read: true } });
    return true;
  }
  const msg = inMemoryMessages.find((m) => m.id === id);
  if (msg) msg.read = true;
  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (dbEnabled) {
    await db.contactMessage.delete({ where: { id } });
    return true;
  }
  const idx = inMemoryMessages.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  inMemoryMessages.splice(idx, 1);
  return true;
}

// ===== Newsletter =====

export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  if (dbEnabled) {
    try {
      await db.newsletterSubscriber.create({ data: { email } });
      return { success: true, message: "Subscribed successfully" };
    } catch (err: any) {
      if (err?.code === "P2002") {
        return { success: false, message: "You're already subscribed" };
      }
      throw err;
    }
  }
  if (inMemorySubscribers.includes(email.toLowerCase())) {
    return { success: false, message: "You're already subscribed" };
  }
  inMemorySubscribers.push(email.toLowerCase());
  return { success: true, message: "Subscribed successfully" };
}

export async function listSubscribers(): Promise<{ email: string; createdAt: string }[]> {
  if (dbEnabled) {
    return await db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
  }
  return inMemorySubscribers.map((email) => ({ email, createdAt: new Date().toISOString() }));
}

// ===== In-memory fallbacks (used only when DATABASE_URL is not set) =====

const inMemoryBookings: BookingRecord[] = [];
const inMemoryMessages: MessageRecord[] = [];
const inMemorySubscribers: string[] = [];
