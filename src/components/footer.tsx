"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Heart,
} from "lucide-react";
import { SALON_INFO, NAV_LINKS, SERVICES } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export function Footer() {
  const setView = useSalonStore((s) => s.setView);
  const addSubscriber = useSalonStore((s) => s.addSubscriber);
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    const ok = addSubscriber(email.trim());
    if (ok) {
      toast.success("Welcome to the Lizaya family! Check your inbox for a special welcome offer.");
      setEmail("");
    } else {
      toast.info("You're already subscribed to our newsletter.");
    }
  };

  return (
    <footer className="relative mt-auto bg-gradient-to-b from-background to-secondary/40 border-t border-border">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A961]/40 to-transparent" />

      {/* Newsletter */}
      <div className="container-luxe py-12 sm:py-16 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#0F4C3A] mb-2">Stay in the loop</p>
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground text-balance">
              Join our insider list for grooming tips, spa offers &amp; first dibs on appointments
            </h3>
          </motion.div>
          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-background border-border focus-visible:ring-[#0F4C3A]/40 h-12 px-5"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] hover:opacity-90 text-white rounded-full h-12 px-6 shrink-0 shadow-luxe"
            >
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </motion.form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxe py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => setView("home")} className="flex items-center gap-3 mb-4 focus-luxe rounded-sm">
              <div className="w-11 h-11 rounded-full overflow-hidden shadow-luxe">
                <LogoMark size={44} className="w-full h-full" />
              </div>
              <div className="text-left">
                <p className="font-serif text-lg font-semibold">Lizaya</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Hair Studio</p>
              </div>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {SALON_INFO.description}
            </p>
            <div className="flex items-center gap-2 mt-5">
              <SocialButton href={SALON_INFO.social.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={SALON_INFO.social.tiktok} label="TikTok">
                <TikTokIcon className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={SALON_INFO.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialButton>
            </div>
          </div>

          {/* Quick links */}
          <FooterCol title="Explore">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.view} onClick={() => setView(l.view as any)}>{l.label}</FooterLink>
            ))}
            <FooterLink onClick={() => setView("faq")}>FAQ</FooterLink>
          </FooterCol>

          {/* Services */}
          <FooterCol title="Services">
            <FooterLink onClick={() => setView("services")}>Hair Styling</FooterLink>
            <FooterLink onClick={() => setView("services")}>Barbershop</FooterLink>
            <FooterLink onClick={() => setView("services")}>SPA & Massage</FooterLink>
            <FooterLink onClick={() => setView("services")}>Nails</FooterLink>
            <FooterLink onClick={() => setView("services")}>View all services →</FooterLink>
          </FooterCol>

          {/* Contact */}
          <FooterCol title="Visit Us">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-[#0F4C3A] mt-0.5 shrink-0" />
              <span>
                {SALON_INFO.address.line1},<br />
                {SALON_INFO.address.line2},<br />
                {SALON_INFO.address.city}, {SALON_INFO.address.country}
              </span>
            </li>
            <li>
              <a href={`tel:${SALON_INFO.phoneRaw}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-[#0F4C3A] shrink-0" />
                {SALON_INFO.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SALON_INFO.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors break-all">
                <Mail className="h-4 w-4 text-[#0F4C3A] shrink-0" />
                {SALON_INFO.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-[#0F4C3A] mt-0.5 shrink-0" />
              <span>
                Mon–Sat: 8AM – 9:30PM<br />
                Sun: 10AM – 8PM
              </span>
            </li>
          </FooterCol>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-luxe py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} {SALON_INFO.name}. Made with
            <Heart className="h-3 w-3 text-[#0F4C3A] fill-[#0F4C3A]" /> in Kenya.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => setView("privacy")} className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button onClick={() => setView("terms")} className="hover:text-foreground transition-colors">Terms of Service</button>
            <button onClick={() => setView("admin")} className="hover:text-foreground transition-colors">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gradient-to-br hover:from-[#0F4C3A] hover:to-[#1A6B52] hover:border-transparent transition-all duration-300"
    >
      {children}
    </a>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <li>
      <button onClick={onClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left focus-luxe rounded-sm">
        {children}
      </button>
    </li>
  );
}
