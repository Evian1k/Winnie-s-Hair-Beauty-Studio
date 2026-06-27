"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone, MessageCircle, ArrowUp, X, Send } from "lucide-react";
import { SALON_INFO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FloatingButtons() {
  const [showTop, setShowTop] = React.useState(false);
  const { scrollY } = useScroll();
  const chatOpen = useSalonStore((s) => s.chatOpen);
  const setChatOpen = useSalonStore((s) => s.setChatOpen);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTop(latest > 600);
  });

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
    "Hello Lizaya Hair Studio! I'd like to book an appointment."
  )}`;

  return (
    <>
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 no-print">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-full glass shadow-luxe flex items-center justify-center text-foreground hover:text-[#0F4C3A] transition-colors focus-luxe"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.a
          href={`tel:${SALON_INFO.phoneRaw}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A961] to-[#9A7B3F] shadow-luxe flex items-center justify-center text-white hover:scale-110 transition-transform focus-luxe"
          aria-label={`Call ${SALON_INFO.phone}`}
        >
          <Phone className="h-5 w-5" />
        </motion.a>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-luxe-lg flex items-center justify-center text-white hover:scale-110 transition-transform focus-luxe"
          aria-label="Chat with us on WhatsApp"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>

        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "w-12 h-12 rounded-full shadow-luxe flex items-center justify-center text-white transition-transform hover:scale-110 focus-luxe",
            chatOpen ? "bg-foreground" : "bg-gradient-to-br from-[#0F4C3A] to-[#1A6B52]"
          )}
          aria-label="Open live chat"
        >
          {chatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {chatOpen && <ChatWidget />}
      </AnimatePresence>
    </>
  );
}

function ChatWidget() {
  const setChatOpen = useSalonStore((s) => s.setChatOpen);
  const setView = useSalonStore((s) => s.setView);
  const [messages, setMessages] = React.useState<{ from: "bot" | "user"; text: string }[]>([
    {
      from: "bot",
      text: "Karibu! 👋 Welcome to Lizaya Hair Studio. How can we help you today?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickReplies = [
    "Book an appointment",
    "See services & pricing",
    "Where are you located?",
    "Opening hours",
  ];

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      let reply = "Thank you for your message! Our team will get back to you shortly. For urgent matters, please call 0701 890354.";
      const lower = text.toLowerCase();
      if (lower.includes("book")) {
        reply = "Wonderful! You can book directly on our booking page — pick your service, date, time and stylist in under a minute. Shall I take you there?";
      } else if (lower.includes("price") || lower.includes("service")) {
        reply = "Our services start from KSh 300 for beard trims up to KSh 8,000 for our Spa Retreat Package. Visit our pricing page for full details.";
      } else if (lower.includes("where") || lower.includes("location") || lower.includes("located")) {
        reply = "We're at Gateway Mall, Syokimau, in the EK Physiotherapy building near JKIA. Plus code: JWP6+6X Nairobi. Ample parking available!";
      } else if (lower.includes("hour") || lower.includes("open") || lower.includes("close")) {
        reply = "We're open Mon–Sat 8AM–9:30PM and Sun 10AM–8PM. We close late to fit your schedule — perfect for after-work appointments!";
      } else if (lower.includes("barber") || lower.includes("shave") || lower.includes("fade")) {
        reply = "Our barbershop is one of the best in Syokimau! Freddie specializes in skin fades, beard grooming, and hot towel shaves. Want to book a barber appointment?";
      }
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] max-w-sm no-print"
    >
      <div className="glass-emerald rounded-3xl shadow-luxe-lg overflow-hidden flex flex-col max-h-[70vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold">
                L
              </div>
              <div>
                <p className="font-serif text-base">Lizaya Concierge</p>
                <p className="text-xs opacity-80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  Online now
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto luxe-scroll p-4 space-y-3 bg-background/40 min-h-[200px] max-h-[40vh]">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm",
                  m.from === "user"
                    ? "bg-gradient-to-br from-[#0F4C3A] to-[#1A6B52] text-white rounded-br-md"
                    : "bg-white dark:bg-card shadow-sm text-foreground rounded-bl-md"
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-background/40">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/60 hover:bg-secondary text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="p-3 bg-background border-t border-border flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="rounded-full bg-background border-border h-10 px-4"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-gradient-to-br from-[#0F4C3A] to-[#1A6B52] h-10 w-10 shrink-0"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
