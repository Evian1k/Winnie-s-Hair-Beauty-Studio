"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { FAQS, SALON_INFO, type FAQItem } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "appointments", label: "Appointments" },
  { value: "pricing", label: "Pricing" },
  { value: "hair-care", label: "Hair Care" },
  { value: "policy", label: "Policy" },
] as const;

type Cat = (typeof CATEGORIES)[number]["value"];

export function FaqView() {
  const [category, setCategory] = React.useState<Cat>("all");
  const setView = useSalonStore((s) => s.setView);

  const filtered = React.useMemo(() => {
    if (category === "all") return FAQS;
    return FAQS.filter((f) => f.category === category);
  }, [category]);

  return (
    <div>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="text-gradient-rose">answered</span>
          </>
        }
        subtitle="Everything you need to know before your visit. Can't find your question? Reach out — we love to help."
        image="/images/salon-interior.svg"
      />

      <section className="pb-20">
        <div className="container-luxe max-w-3xl">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  category === c.value
                    ? "bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white shadow-luxe"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div layout>
            <Accordion type="single" collapsible className="space-y-3">
              {filtered.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <AccordionItem
                    value={faq.id}
                    className="bg-card rounded-2xl border border-border px-5 shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline py-5 text-left">
                      <span className="font-serif text-base font-semibold pr-3">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 border border-[#B76E79]/20"
          >
            <HelpCircle className="h-10 w-10 text-[#B76E79] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Our team is happy to help. Reach out and we'll get back to you within hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => (window.location.href = `tel:${SALON_INFO.phoneRaw}`)}
                variant="outline"
                className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call {SALON_INFO.phone}
              </Button>
              <Button
                onClick={() => setView("contact")}
                className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send a Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
