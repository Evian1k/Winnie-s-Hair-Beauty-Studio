"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Cookie } from "lucide-react";
import { PageHeader } from "@/components/section-heading";
import { SALON_INFO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";

function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title} />
      <section className="pb-20">
        <div className="container-luxe max-w-3xl">
          {updated && (
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center">
              Last updated: {updated}
            </p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed"
          >
            {children}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-semibold text-foreground mt-8 mb-3 flex items-center gap-2">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}

function LI({ children }: { children: React.ReactNode }) {
  return <li className="ml-5 list-disc">{children}</li>;
}

export function PrivacyView() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title={<>Your <span className="text-gradient-rose">privacy</span> matters</>}
      updated="June 2026"
    >
      <P>
        At {SALON_INFO.name}, we take your privacy seriously. This policy explains
        what information we collect, how we use it, and the choices you have. By
        using our website and services, you agree to the practices described here.
      </P>

      <H2>1. Information We Collect</H2>
      <P>
        We collect information you provide directly to us — such as your name,
        email address, phone number, and booking preferences when you make an
        appointment or contact us. We also automatically collect limited technical
        information (such as browser type and pages visited) to improve our website.
      </P>

      <H2>2. How We Use Your Information</H2>
      <P>We use the information we collect to:</P>
      <ul className="space-y-1.5">
        <LI>Process and confirm your bookings and send appointment reminders.</LI>
        <LI>Respond to your enquiries and provide customer support.</LI>
        <LI>Send occasional updates, offers, and newsletters (only if you opt in).</LI>
        <LI>Improve our services, website, and customer experience.</LI>
        <LI>Comply with legal obligations and prevent fraud.</LI>
      </ul>

      <H2>3. Information Sharing</H2>
      <P>
        We never sell your personal information. We may share data with trusted
        third-party service providers (such as email delivery and analytics) who
        help us operate our business, under strict confidentiality agreements.
        We may disclose information when required by law.
      </P>

      <H2>4. Data Security</H2>
      <P>
        We implement industry-standard security measures including SSL encryption,
        secure form validation, rate limiting, and spam protection. While we strive
        to protect your information, no method of transmission over the internet is
        100% secure.
      </P>

      <H2>5. Cookies</H2>
      <P>
        We use essential cookies to operate our website and optional cookies to
        enhance your experience and analyse traffic. You can control cookies
        through your browser settings. Disabling some cookies may affect
        functionality.
      </P>

      <H2>6. Your Rights</H2>
      <P>You have the right to:</P>
      <ul className="space-y-1.5">
        <LI>Access the personal information we hold about you.</LI>
        <LI>Request correction of inaccurate information.</LI>
        <LI>Request deletion of your personal data.</LI>
        <LI>Opt out of marketing communications at any time.</LI>
        <LI>Withdraw consent for data processing where applicable.</LI>
      </ul>

      <H2>7. Children's Privacy</H2>
      <P>
        Our website is not intended for children under 13. We do not knowingly
        collect personal information from children. If you believe a child has
        provided us with information, please contact us so we can delete it.
      </P>

      <H2>8. Changes to This Policy</H2>
      <P>
        We may update this policy from time to time. We will notify you of any
        significant changes by posting the new policy on this page with an updated
        revision date.
      </P>

      <H2>9. Contact Us</H2>
      <P>
        If you have questions about this Privacy Policy, please contact us at{" "}
        <a href={`mailto:${SALON_INFO.email}`} className="text-[#B76E79] hover:underline">
          {SALON_INFO.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#B76E79] hover:underline">
          {SALON_INFO.phone}
        </a>
        .
      </P>
    </LegalLayout>
  );
}

export function TermsView() {
  return (
    <LegalLayout
      eyebrow="Terms of Service"
      title={<>The <span className="text-gradient-rose">fine print</span>, simplified</>}
      updated="June 2026"
    >
      <P>
        Welcome to {SALON_INFO.name}. These Terms of Service govern your use of our
        website and the services we provide. By booking an appointment or using our
        services, you agree to these terms.
      </P>

      <H2>1. Appointments &amp; Cancellations</H2>
      <P>
        Appointments can be booked online, by phone, or via WhatsApp. We require at
        least 24 hours' notice for cancellations or rescheduling. Cancellations
        within 24 hours incur a 50% fee. No-shows are charged the full service
        amount. Bridal deposits are non-refundable within 14 days of the event.
      </P>

      <H2>2. Pricing &amp; Payment</H2>
      <P>
        All prices are listed in Kenyan Shillings (KSh) and include the products used
        during the service. Premium add-ons are quoted separately. We accept M-Pesa,
        cash, Visa, and Mastercard. Payment is due on the day of service unless
        otherwise agreed.
      </P>

      <H2>3. Service Expectations</H2>
      <P>
        We strive to deliver every service to the highest standard. Results may vary
        based on hair type, skin condition, and aftercare. Our stylists will advise
        on suitability before any service. If you are unsatisfied with a service,
        please contact us within 48 hours so we can address your concerns.
      </P>

      <H2>4. Health &amp; Allergies</H2>
      <P>
        Please inform us of any allergies, sensitivities, or medical conditions
        before your service. We use premium products, but patch tests are available
        for new clients. We reserve the right to decline a service if we believe it
        may pose a health risk.
      </P>

      <H2>5. Hygiene &amp; Conduct</H2>
      <P>
        We maintain hospital-grade hygiene standards. We ask clients to treat our
        team and other clients with respect. Abusive, threatening, or intoxicated
        behaviour may result in refusal of service without refund.
      </P>

      <H2>6. Intellectual Property</H2>
      <P>
        All content on this website — including text, images, logos, and designs — is
        the property of {SALON_INFO.name} and may not be reproduced without written
        permission.
      </P>

      <H2>7. Liability</H2>
      <P>
        We are not liable for personal belongings left on the premises, damage to
        hair or skin caused by failure to follow aftercare advice, or any
        consequential loss arising from services provided. Our maximum liability is
        limited to the cost of the service in question.
      </P>

      <H2>8. Photography &amp; Marketing</H2>
      <P>
        With your permission, we may photograph your results for our portfolio and
        social media. You can decline at any time by informing our team. We will
        never share your personal information alongside photos.
      </P>

      <H2>9. Modifications</H2>
      <P>
        We reserve the right to update these terms at any time. Continued use of our
        services after changes constitutes acceptance of the updated terms.
      </P>

      <H2>10. Governing Law</H2>
      <P>
        These terms are governed by the laws of the Republic of Kenya. Any disputes
        will be subject to the jurisdiction of Kenyan courts.
      </P>

      <H2>11. Contact</H2>
      <P>
        Questions about these terms? Email us at{" "}
        <a href={`mailto:${SALON_INFO.email}`} className="text-[#B76E79] hover:underline">
          {SALON_INFO.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#B76E79] hover:underline">
          {SALON_INFO.phone}
        </a>
        .
      </P>
    </LegalLayout>
  );
}

export function NotFoundView() {
  const setView = useSalonStore((s) => s.setView);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="font-serif text-8xl sm:text-9xl font-bold text-gradient-gold mb-4"
        >
          404
        </motion.p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-3">
          This page took a beauty break
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to the beautiful stuff.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setView("home")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </button>
          <button
            onClick={() => setView("services")}
            className="px-6 py-3 rounded-full border border-border hover:bg-secondary/60 font-medium transition-colors"
          >
            Browse Services
          </button>
        </div>
      </motion.div>
    </div>
  );
}
