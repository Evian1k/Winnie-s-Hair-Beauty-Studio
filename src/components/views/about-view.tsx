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
  MapPin,
  Scissors,
  Leaf,
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
        title={<>Beauty with a <span className="text-gradient-emerald">heartbeat</span></>}
        subtitle="More than a salon — a Syokimau institution where families have trusted their grooming and beauty needs for over a decade."
        image="https://sfile.chatglm.cn/images-ppt/bf1671d4931d.webp"
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
              <img src="https://sfile.chatglm.cn/images-ppt/c21804e470f6.jpg" alt="Rispa, senior stylist" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-right-6 glass-emerald rounded-2xl p-5 shadow-luxe-lg max-w-xs">
              <p className="font-serif text-sm italic text-foreground leading-relaxed">
                &ldquo;We treat every client like family. That's why they keep coming back — some for over seven years now.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Rispa, Senior Stylist</p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              align="left"
              title={<>From a single chair to <span className="text-gradient-gold">Syokimau's favourite studio</span></>}
              className="mb-6"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Lizaya Hair Studio was founded in 2014 at Gateway Mall, Syokimau — born from
                a simple idea: why should a family visit three different places for a
                woman's hairstyle, a man's haircut, and a relaxing massage? We brought
                them all under one roof.
              </p>
              <p>
                What started as a small salon has grown into a full-service destination
                trusted by hundreds of families near JKIA and across Mavoko. Over the
                years, we've expanded from hair styling to include a dedicated barbershop,
                a tranquil spa room, and a nail studio — each staffed by specialists who
                love what they do.
              </p>
              <p>
                Our clients are our family. Many have been with us for five, six, even
                seven years. Their children got their first haircuts in our chairs. Their
                weddings were celebrated with our bridal packages. Their tired weeks
                ended with our massages. That trust is the highest compliment we could
                ever receive — and we work hard to earn it every single day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "10+", label: "Years Strong" },
                { value: "166+", label: "Google Reviews" },
                { value: "4", label: "Service Worlds" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-4 rounded-2xl border border-border bg-card/50"
                >
                  <p className="font-serif text-2xl font-bold text-gradient-emerald">{s.value}</p>
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
            title={<>Our mission, our <span className="text-gradient-emerald">promise</span></>}
            subtitle="Three principles guide every cut, every shave, every massage, every interaction."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Mission", text: "To make premium grooming and beauty accessible to every family in Syokimau — with warmth, skill, and fair prices for all." },
              { icon: Heart, title: "Vision", text: "To be Mavoko's most loved multi-service studio — known not just for great results, but for the family-like welcome that keeps clients coming back." },
              { icon: ShieldCheck, title: "Values", text: "Hygiene first. Honesty always. Skill above trends. Family over transactions. Every decision starts with what's best for you." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-3xl p-7 shadow-luxe border border-border"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F4C3A]/10 to-[#C9A961]/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#0F4C3A]" />
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
            title={<>The little things, done <span className="text-gradient-gold">well</span></>}
            subtitle="It's not one big thing — it's a hundred small details that add up to an experience worth coming back for."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scissors, title: "Salon + Barbershop", text: "Women's hair and men's grooming under one roof — perfect for couples and families." },
              { icon: Leaf, title: "Tranquil Spa Room", text: "A dedicated spa space for massages, facials, and body treatments away from the buzz." },
              { icon: MapPin, title: "Gateway Mall Location", text: "Conveniently located with ample parking. Get your hair done while running errands." },
              { icon: Clock, title: "Open Until 9:30 PM", text: "Late opening every day fits around your work schedule — perfect for after-work visits." },
              { icon: ShieldCheck, title: "Hygienic & Clean", text: "Sanitised tools, fresh linens, and a spotless space — our clients mention it in reviews." },
              { icon: Users, title: "Family-Friendly", text: "Patient with kids, welcoming to all. We've watched families grow up in our chairs." },
              { icon: Award, title: "Experienced Team", text: "Stylists and barbers with 6–10+ years of experience. Skill you can trust." },
              { icon: Heart, title: "Genuine Hospitality", text: "Friendly, responsive staff who remember your name and your preferences." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-5 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <item.icon className="h-7 w-7 text-[#0F4C3A] mb-3 group-hover:scale-110 transition-transform" />
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
            title={<>The artists behind the <span className="text-gradient-emerald">magic</span></>}
            subtitle="A close-knit team of stylists, barbers, and therapists — many of whom have been with Lizaya for years."
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
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-medium">{member.experience}</div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#C9A961]">{member.role}</p>
                    <p className="font-serif text-lg font-semibold text-white">{member.name}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{s}</span>
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
            className="relative rounded-3xl bg-gradient-forest p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
          >
            <Quote className="h-10 w-10 text-[#C9A961] mx-auto mb-6" />
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-white max-w-3xl mx-auto leading-relaxed text-balance mb-6">
              &ldquo;Been going here the last 7 years. Rispa and Freddie do a fantastic job.
              I love the manis, pedis and massages especially.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#C9A961] fill-[#C9A961]" />
              ))}
            </div>
            <p className="text-white/70 text-sm mt-3">— Sharon Kotut, Local Guide · loyal client for 7 years</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-luxe text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3">Come experience the difference</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book your first appointment and discover why families across Syokimau call Lizaya their beauty home.
          </p>
          <Button onClick={() => setView("book")} size="lg" className="bg-gradient-to-r from-[#0F4C3A] to-[#1A6B52] hover:opacity-90 text-white rounded-full px-7">
            <Calendar className="h-5 w-5 mr-2" />
            Book Your Visit
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
