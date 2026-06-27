"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Award,
  Users,
  ShieldCheck,
  Clock,
  Star,
  Quote,
} from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/section-heading";
import { STYLISTS, SALON_INFO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

export function AboutView() {
  const setView = useSalonStore((s) => s.setView);
  return (
    <div>
      <PageHeader
        eyebrow="About Us"
        title={
          <>
            Beauty with a <span className="text-gradient-rose">heart</span>
          </>
        }
        subtitle="More than a salon — a sanctuary where artistry, care, and community come together to celebrate you."
        image="/images/salon-stations.svg"
      />

      {/* Story */}
      <section className="section-pad">
        <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="img-zoom rounded-3xl overflow-hidden shadow-luxe-lg aspect-[4/5]">
              <img
                src="/images/team-winnie.svg"
                alt="Winnie Achieng, Founder"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-right-6 glass-pink rounded-2xl p-5 shadow-luxe-lg max-w-xs">
              <p className="font-serif text-sm italic text-foreground leading-relaxed">
                &ldquo;Beauty isn't about perfection. It's about revealing the
                radiance that's already within you.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Winnie Achieng, Founder</p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              align="left"
              title={
                <>
                  From a single chair to{" "}
                  <span className="text-gradient-gold">Katani's favourite studio</span>
                </>
              }
              className="mb-6"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Winnie's Hair &amp; Beauty Studio was founded in 2019 by Winnie Achieng,
                a passionate stylist with over a decade of experience and training
                across Nairobi, Dubai, and London. What began as a single chair in a
                modest Katani space has grown into a full-service beauty destination
                trusted by thousands of clients across greater Nairobi.
              </p>
              <p>
                The journey wasn't always glamorous. In the early days, Winnie would
                work 14-hour days, often taking clients well past closing, determined
                to build a reputation based on consistency and care. Word spread.
                Clients brought their sisters, their mothers, their bridesmaids. The
                studio expanded. The team grew. But the values never changed: premium
                products, meticulous hygiene, fair pricing, and treating every client
                like family.
              </p>
              <p>
                Today, our team of certified stylists, nail artists, makeup artists,
                and beauticians continues that mission. We're proud to call Katani
                home — and prouder still to be a small part of our clients' most
                important moments, from first dates to wedding days.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "5,000+", label: "Clients Served" },
                { value: "127+", label: "5-Star Reviews" },
                { value: "12+", label: "Years Strong" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-4 rounded-2xl border border-border bg-card/50"
                >
                  <p className="font-serif text-2xl font-bold text-gradient-rose">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section-pad bg-secondary/30">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What Drives Us"
            title={
              <>
                Our mission, our <span className="text-gradient-rose">promise</span>
              </>
            }
            subtitle="Three principles guide every snip, every brushstroke, every interaction."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Mission",
                text: "To reveal the unique beauty in every client through world-class artistry, premium products, and genuine care — making luxury beauty accessible to all.",
              },
              {
                icon: Heart,
                title: "Vision",
                text: "To be East Africa's most loved beauty destination — known not just for exceptional service, but for warmth, integrity, and the confidence we instil in every client.",
              },
              {
                icon: ShieldCheck,
                title: "Values",
                text: "Hygiene first. Honesty always. Artistry above trends. Community over competition. Every decision we make starts with what's best for you.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-3xl p-7 shadow-luxe border border-border"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B76E79]/10 to-[#D4AF37]/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#B76E79]" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why clients love us */}
      <section className="section-pad">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Why Clients Love Us"
            title={
              <>
                The little things, done <span className="text-gradient-gold">exceptionally</span>
              </>
            }
            subtitle="It's not one big thing — it's a hundred small details that add up to an experience worth coming back for."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Internationally Trained", text: "Our team trains in Nairobi, Dubai, and London to bring you global standards." },
              { icon: ShieldCheck, title: "Hospital-Grade Hygiene", text: "Sanitised tools, single-use items where needed, and a spotless space — always." },
              { icon: Clock, title: "Punctual Appointments", text: "We respect your time. Bookings start when they're supposed to, every time." },
              { icon: Heart, title: "Genuine Hospitality", text: "Complimentary refreshments, warm conversation, and a team that remembers your name." },
              { icon: Sparkles, title: "Premium Products", text: "Cruelty-free, salon-grade brands your hair and skin will thank you for." },
              { icon: Star, title: "5-Star Consistency", text: "127+ Google reviews at 5.0 — because great once isn't enough." },
              { icon: Users, title: "Community Minded", text: "We support local makers, mentor young stylists, and give back to Katani." },
              { icon: ShieldCheck, title: "Honest Pricing", text: "Transparent rates, no surprise charges. What you see is what you pay." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-5 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <item.icon className="h-7 w-7 text-[#B76E79] mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif text-base font-semibold mb-1.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-secondary/30">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Meet the Team"
            title={
              <>
                The artists behind the <span className="text-gradient-rose">magic</span>
              </>
            }
            subtitle="A close-knit team of certified professionals who love what they do — and it shows."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STYLISTS.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card rounded-3xl overflow-hidden shadow-luxe border border-border group"
              >
                <div className="relative aspect-[3/4] overflow-hidden img-zoom">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-medium">
                    {member.experience}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">{member.role}</p>
                    <p className="font-serif text-lg font-semibold text-white">{member.name}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="section-pad">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-noir p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
          >
            <Quote className="h-10 w-10 text-[#D4AF37] mx-auto mb-6" />
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-white max-w-3xl mx-auto leading-relaxed text-balance mb-6">
              &ldquo;Winnie's isn't just where I get my hair done — it's where I go
              to feel like myself again. The team is family.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-white/70 text-sm mt-3">— Faith Achieng, loyal client since 2021</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-luxe text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3">
            Come experience the difference
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book your first appointment and discover why thousands of clients call Winnie's their beauty home.
          </p>
          <Button
            onClick={() => setView("book")}
            size="lg"
            className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-7"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Your Visit
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
