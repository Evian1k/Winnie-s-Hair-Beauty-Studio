"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
} from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { SALON_INFO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export function ContactView() {
  const addMessage = useSalonStore((s) => s.addMessage);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);

    // Save locally (immediate)
    addMessage(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Thank you! We'll be in touch within 24 hours.");
      } else {
        toast.success("Message saved. We'll be in touch within 24 hours.");
      }
    } catch (err) {
      console.error("[Contact] API call failed:", err);
      toast.success("Message saved. We'll be in touch within 24 hours.");
    }

    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitting(false);
  };

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
    "Hello Winnie's Hair & Beauty Studio!"
  )}`;

  const today = new Date().getDay(); // 0=Sun, 6=Sat

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Come say <span className="text-gradient-rose">hello</span>
          </>
        }
        subtitle="We'd love to hear from you. Reach out by phone, WhatsApp, email, or the form below — we respond within 24 hours."
        image="https://sfile.chatglm.cn/images-ppt/06a25c33f3d9.png"
      />

      <section className="pb-12">
        <div className="container-luxe grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Phone,
              label: "Call us",
              value: SALON_INFO.phone,
              href: `tel:${SALON_INFO.phoneRaw}`,
              note: "Mon–Sun",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "Chat with us",
              href: whatsappUrl,
              note: "Fastest response",
            },
            {
              icon: Mail,
              label: "Email",
              value: SALON_INFO.email,
              href: `mailto:${SALON_INFO.email}`,
              note: "24-hour reply",
            },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label === "WhatsApp" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="block p-6 rounded-3xl border border-border bg-card shadow-luxe"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#D4AF37] flex items-center justify-center mb-4">
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{c.label}</p>
              <p className="font-serif text-lg font-semibold mb-1">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.note}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="pb-20">
        <div className="container-luxe grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
          >
            <h3 className="font-serif text-2xl font-semibold mb-2">Send us a message</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="mb-1.5 block">Full name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Wanjiru"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="mb-1.5 block">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="mb-1.5 block">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="min-h-[140px]"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full"
              >
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Map + info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-3xl overflow-hidden shadow-luxe border border-border h-72 sm:h-80">
              <iframe
                title="Winnie's Hair & Beauty Studio location on Google Maps"
                src={SALON_INFO.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#B76E79]" />
                </div>
                <div>
                  <p className="font-serif text-base font-semibold mb-0.5">Visit our studio</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {SALON_INFO.address.line1}<br />
                    {SALON_INFO.address.line2}<br />
                    {SALON_INFO.address.city}, {SALON_INFO.address.country}
                  </p>
                  <a
                    href={SALON_INFO.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#B76E79] hover:underline mt-2 inline-block font-medium"
                  >
                    Get directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-[#B76E79]" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-base font-semibold mb-2">Opening hours</p>
                  <div className="space-y-1.5">
                    {SALON_INFO.hours.map((h) => (
                      <div
                        key={h.day}
                        className={cn(
                          "flex items-center justify-between text-sm py-1.5 px-3 rounded-lg",
                          today === (SALON_INFO.hours.indexOf(h) + 1) % 7
                            ? "bg-[#B76E79]/10 text-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        <span>{h.day}</span>
                        <span>{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Instagram className="h-5 w-5 text-[#B76E79]" />
                </div>
                <div>
                  <p className="font-serif text-base font-semibold mb-2">Follow us</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={SALON_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-[#B76E79] hover:to-[#D4A574] hover:border-transparent transition-all"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href={SALON_INFO.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-[#B76E79] hover:to-[#D4A574] hover:border-transparent transition-all"
                    >
                      <TikTokIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={SALON_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-[#B76E79] hover:to-[#D4A574] hover:border-transparent transition-all"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
