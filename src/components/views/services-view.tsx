"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { SERVICES, OFFERS, type ServiceCategory } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  hair: "Hair",
  nails: "Nails",
  beauty: "Beauty",
};

const CATEGORY_DESC: Record<ServiceCategory, string> = {
  hair: "From precision cuts to bold colour transformations — hair artistry for every crown.",
  nails: "Manicures, pedicures, gel, and bespoke nail art that lasts and turns heads.",
  beauty: "Makeup, lashes, facials, and spa rituals to reveal your most radiant self.",
};

export function ServicesView() {
  const setView = useSalonStore((s) => s.setView);
  const setPreselectedService = useSalonStore((s) => s.setPreselectedService);
  const [category, setCategory] = React.useState<ServiceCategory>("hair");

  const handleBook = (serviceId: string) => {
    setPreselectedService(serviceId);
    setView("book");
  };

  const filtered = SERVICES.filter((s) => s.category === category);

  return (
    <div>
      <PageHeader
        eyebrow="Our Services"
        title={
          <>
            A menu crafted for <span className="text-gradient-rose">indulgence</span>
          </>
        }
        subtitle="Every service performed with premium products, certified hands, and an obsessive eye for detail. Transparent pricing. No surprises."
        image="/images/hair-styling.svg"
      />

      {/* Offers banner */}
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
                className="relative p-5 rounded-2xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 border border-[#B76E79]/20 overflow-hidden"
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

      {/* Service tabs */}
      <section className="pb-20">
        <div className="container-luxe">
          <Tabs value={category} onValueChange={(v) => setCategory(v as ServiceCategory)}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-md rounded-full p-1 bg-secondary/50">
                {(Object.keys(CATEGORY_LABEL) as ServiceCategory[]).map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B76E79] data-[state=active]:to-[#D4A574] data-[state=active]:text-white transition-all"
                  >
                    {CATEGORY_LABEL[cat]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {(Object.keys(CATEGORY_LABEL) as ServiceCategory[]).map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                    {CATEGORY_DESC[cat]}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.filter((s) => s.category === cat).map((service, i) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        whileHover={{ y: -6 }}
                        className="group bg-card rounded-3xl overflow-hidden shadow-luxe border border-border flex flex-col"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden img-zoom">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          {service.popular && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-medium shadow-luxe">
                              Popular
                            </span>
                          )}
                          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full glass text-xs font-medium">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {service.duration}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-serif text-xl font-semibold mb-2">{service.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Starting from</p>
                              <p className="font-serif text-lg font-bold text-gradient-rose">
                                KSh {service.startingPrice.toLocaleString()}
                              </p>
                            </div>
                            <Button
                              onClick={() => handleBook(service.id)}
                              size="sm"
                              className="rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white"
                            >
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Book
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* CTA */}
          <div className="text-center mt-16">
            <SectionHeading
              eyebrow="Can't decide?"
              title="Book a free 10-minute consultation"
              subtitle="Not sure which service is right for you? Our team will help you choose — no obligation, no pressure."
              className="mb-6"
            />
            <Button
              onClick={() => setView("book")}
              size="lg"
              className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-7"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Consultation
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
