"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ChevronRight, Calendar, Crown } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { SERVICES, PACKAGES, OFFERS } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingView() {
  const setView = useSalonStore((s) => s.setView);
  const setPreselectedService = useSalonStore((s) => s.setPreselectedService);

  const handleBook = (serviceId?: string) => {
    if (serviceId) setPreselectedService(serviceId);
    setView("book");
  };

  const categories = [
    { id: "hair", label: "Hair Services", icon: "💇🏽‍♀️" },
    { id: "nails", label: "Nail Services", icon: "💅🏽" },
    { id: "beauty", label: "Beauty & Spa", icon: "✨" },
  ] as const;

  return (
    <div>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Transparent rates, <span className="text-gradient-rose">no surprises</span>
          </>
        }
        subtitle="Premium service at fair prices. Browse à la carte services and curated packages below."
        image="/images/salon-products.svg"
      />

      {/* Offers */}
      <section className="pb-8">
        <div className="container-luxe">
          <div className="grid sm:grid-cols-3 gap-4">
            {OFFERS.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-5 rounded-2xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 border border-[#B76E79]/20"
              >
                <Sparkles className="h-5 w-5 text-[#B76E79] mb-2" />
                <h4 className="font-serif text-base font-semibold mb-1">{offer.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <code className="text-xs px-2 py-1 rounded bg-background font-mono text-[#B76E79]">{offer.code}</code>
                  <span className="text-[10px] text-muted-foreground">{offer.expires}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* À la carte services */}
      <section className="pb-16">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="À La Carte"
            title={
              <>
                Individual <span className="text-gradient-gold">services</span>
              </>
            }
            subtitle="Mix and match to build your perfect appointment."
            className="mb-12"
          />

          <div className="space-y-12">
            {categories.map((cat) => {
              const services = SERVICES.filter((s) => s.category === cat.id);
              return (
                <div key={cat.id}>
                  <h3 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    {cat.label}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service, i) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="group p-5 rounded-2xl border border-border bg-card/50 hover:bg-card hover:shadow-luxe transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-serif text-base font-semibold pr-3">{service.name}</h4>
                          {service.popular && (
                            <span className="shrink-0 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
                            <p className="font-serif text-base font-bold text-gradient-rose">
                              KSh {service.startingPrice.toLocaleString()}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleBook(service.id)}
                            size="sm"
                            variant="outline"
                            className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5 h-8 px-3"
                          >
                            Book
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-pad bg-secondary/30">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Packages"
            title={
              <>
                Curated <span className="text-gradient-rose">experiences</span>
              </>
            }
            subtitle="Save up to 20% when you bundle services into a package. Perfect for bridal, events, and self-care days."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={cn(
                  "relative rounded-3xl p-6 border-2 bg-card flex flex-col",
                  pkg.popular
                    ? "border-[#B76E79] shadow-luxe-lg"
                    : "border-border shadow-luxe"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </div>
                )}
                <h3 className="font-serif text-xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{pkg.description}</p>
                <div className="mb-4">
                  <p className="font-serif text-3xl font-bold text-gradient-rose">
                    KSh {pkg.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.duration}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleBook()}
                  className={cn(
                    "w-full rounded-full",
                    pkg.popular
                      ? "bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white"
                      : "bg-foreground text-background hover:opacity-90"
                  )}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Package
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing notes */}
      <section className="pb-20 pt-12">
        <div className="container-luxe">
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card/50">
            <h4 className="font-serif text-lg font-semibold mb-4 text-center">Good to know</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                All prices include products used during the service.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                Premium add-ons (e.g. hair extensions) are quoted separately and agreed beforehand.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                We accept M-Pesa, cash, and all major cards.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                Bridal packages require a 50% deposit to secure the date.
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                Loyalty members enjoy 15% off all additional services.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
