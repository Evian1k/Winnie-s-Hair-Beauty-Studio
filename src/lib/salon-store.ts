"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ViewName } from "@/lib/salon-data";

// ===== Booking =====
export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  date: string;
  time: string;
  stylistId: string;
  stylistName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

interface SalonState {
  // Navigation
  currentView: ViewName;
  previousView: ViewName | null;
  isPageLoading: boolean;
  setView: (view: ViewName) => void;

  // Loading screen
  initialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Online chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  // Admin auth
  adminAuthed: boolean;
  setAdminAuthed: (authed: boolean) => void;

  // Bookings (persisted)
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id" | "createdAt" | "status">) => Booking;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  deleteBooking: (id: string) => void;

  // Contact messages (persisted)
  messages: ContactMessage[];
  addMessage: (m: Omit<ContactMessage, "id" | "createdAt" | "read">) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Newsletter (persisted)
  subscribers: NewsletterSubscriber[];
  addSubscriber: (email: string) => boolean;

  // Pre-fill booking form
  preselectedService: string | null;
  setPreselectedService: (serviceId: string | null) => void;
}

export const useSalonStore = create<SalonState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentView: "home",
      previousView: null,
      isPageLoading: false,
      setView: (view) => {
        const current = get().currentView;
        if (current === view) return;
        set({ isPageLoading: true, previousView: current, currentView: view });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          // Update URL hash
          const newHash = view === "home" ? "" : `#${view}`;
          const newUrl = `${window.location.pathname}${newHash}`;
          window.history.replaceState(null, "", newUrl);
          setTimeout(() => set({ isPageLoading: false }), 400);
        } else {
          set({ isPageLoading: false });
        }
      },

      // Loading screen
      initialLoading: true,
      setInitialLoading: (loading) => set({ initialLoading: loading }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),

      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),

      adminAuthed: false,
      setAdminAuthed: (authed) => set({ adminAuthed: authed }),

      bookings: [],
      addBooking: (b) => {
        const booking: Booking = {
          ...b,
          id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ bookings: [booking, ...s.bookings] }));
        return booking;
      },
      updateBookingStatus: (id, status) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        })),
      deleteBooking: (id) =>
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),

      messages: [],
      addMessage: (m) => {
        const msg: ContactMessage = {
          ...m,
          id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date().toISOString(),
          read: false,
        };
        set((s) => ({ messages: [msg, ...s.messages] }));
      },
      markMessageRead: (id) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
        })),
      deleteMessage: (id) =>
        set((s) => ({ messages: s.messages.filter((m) => m.id !== id) })),

      subscribers: [],
      addSubscriber: (email) => {
        const exists = get().subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
        if (exists) return false;
        const sub: NewsletterSubscriber = {
          id: `sub_${Date.now()}`,
          email,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ subscribers: [sub, ...s.subscribers] }));
        return true;
      },

      preselectedService: null,
      setPreselectedService: (serviceId) => set({ preselectedService: serviceId }),
    }),
    {
      name: "lizaya-studio-store",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (s) => ({
        bookings: s.bookings,
        messages: s.messages,
        subscribers: s.subscribers,
        adminAuthed: s.adminAuthed,
      }),
    }
  )
);

// Hash-based view init helper
export function getViewFromHash(): ViewName {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  const valid: string[] = ["home", "about", "services", "gallery", "pricing", "book", "contact", "privacy", "terms", "faq", "admin"];
  return (valid.includes(hash) ? hash : "home") as ViewName;
}
