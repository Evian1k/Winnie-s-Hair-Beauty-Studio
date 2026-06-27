"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Phone,
  MessageCircle,
  Star,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Clock,
} from "lucide-react";
import { SALON_INFO, SERVICES, TESTIMONIALS, PORTFOLIO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function HomeView() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <StatsBand />
      <TestimonialsPreview />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  const setView = useSalonStore((s) => s.setView);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
    "Hello Winnie's Hair & Beauty Studio! I'd like to book an appointment."
  )}`;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-20"
      >
        <img
          src="/images/salon-interior.svg"
          alt="Winnie's Hair & Beauty Studio luxury salon interior"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 border border-[#D4AF37]/30 rounded-full hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-24 h-24 border border-[#B76E79]/30 rounded-full hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{ opacity }}
        className="container-luxe relative z-10"
      >
        <div className="max-w-3xl">
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-white font-medium">
              5.0 on Google · 127+ reviews
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight text-balance"
          >
            Where beauty meets{" "}
            <span className="text-gradient-gold">artistry</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            A luxury hair, nails, and beauty sanctuary in the heart of Katani.
            We blend world-class technique with warm Kenyan hospitality to
            make every visit a celebration of you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              onClick={() => setView("book")}
              size="lg"
              className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-7 shadow-luxe-lg group"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              onClick={() => (window.location.href = `tel:${SALON_INFO.phoneRaw}`)}
              size="lg"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-7"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-7"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Sub-stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/70 text-xs sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#D4AF37]" />
              12+ years of artistry
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#D4AF37]" />
              5,000+ happy clients
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              Premium products
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#D4AF37] to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function TrustBar() {
  const items = [
    "Premium Hair Care",
    "M-Pesa Accepted",
    "Certified Stylists",
    "Hygienic & Sanitised",
    "Cruelty-Free Products",
    "Bridal Specialists",
  ];
  return (
    <div className="border-y border-border bg-secondary/30 overflow-hidden">
      <div className="flex overflow-hidden py-4 whitespace-nowrap">
        <motion.div
          className="flex shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-8">
              <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function AboutPreview() {
  const setView = useSalonStore((s) => s.setView);
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="img-zoom rounded-3xl overflow-hidden shadow-luxe aspect-[3/4]">
                <img
                  src="/images/team-winnie.svg"
                  alt="Winnie, founder of Winnie's Hair & Beauty Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="img-zoom rounded-3xl overflow-hidden shadow-luxe aspect-square">
                <img
                  src="/images/salon-reception.svg"
                  alt="Salon styling station"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="img-zoom rounded-3xl overflow-hidden shadow-luxe aspect-square">
                <img
                  src="/images/salon-products.svg"
                  alt="Premium beauty products"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="img-zoom rounded-3xl overflow-hidden shadow-luxe aspect-[3/4]">
                <img
                  src="/images/makeup.svg"
                  alt="Makeup artistry at Winnie's"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 -left-2 sm:-left-6 glass-pink rounded-2xl p-4 shadow-luxe-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4AF37] flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground">12+</p>
                <p className="text-xs text-muted-foreground">Years of Artistry</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="Our Story"
            align="left"
            title={
              <>
                A sanctuary of beauty, <span className="text-gradient-rose">born in Katani</span>
              </>
            }
            subtitle="Founded in 2019 by Winnie Achieng, our studio was born from a simple belief: every person who walks through our doors deserves to feel celebrated, pampered, and absolutely beautiful."
            className="mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed mb-6"
          >
            What started as a single chair in a small Katani space has blossomed into
            a full-service beauty destination trusted by thousands across greater Nairobi.
            Our team of certified stylists, nail artists, and beauticians bring
            international training and a deep love for African beauty to every appointment.
            We use only premium, cruelty-free products and follow hospital-grade
            hygiene standards — because you deserve nothing less.
          </motion.p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { title: "Our Mission", text: "To reveal the unique beauty in every client through artistry, care, and premium service.", icon: Sparkles },
              { title: "Why Clients Love Us", text: "Consistency, warmth, and results that speak for themselves — every single visit.", icon: HeartIcon },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="p-4 rounded-2xl border border-border bg-card/50"
              >
                <item.icon className="h-5 w-5 text-[#B76E79] mb-2" />
                <p className="font-serif text-base font-semibold mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={() => setView("about")}
            variant="outline"
            className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
          >
            Discover our story
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const setView = useSalonStore((s) => s.setView);
  const setPreselectedService = useSalonStore((s) => s.setPreselectedService);
  const featured = SERVICES.filter((s) => s.popular).slice(0, 6);

  const handleBook = (serviceId: string) => {
    setPreselectedService(serviceId);
    setView("book");
  };

  return (
    <section className="section-pad bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Crafted for your <span className="text-gradient-rose">indulgence</span>
            </>
          }
          subtitle="From bridal glam to a quick refresh, every service is performed with premium products, expert hands, and an obsessive eye for detail."
          className="mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-luxe border border-border"
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
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
                    <p className="font-serif text-lg font-bold text-gradient-rose">
                      KSh {service.startingPrice.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleBook(service.id)}
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white"
                  >
                    Book
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            onClick={() => setView("services")}
            variant="outline"
            size="lg"
            className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
          >
            View all services
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const setView = useSalonStore((s) => s.setView);
  const items = PORTFOLIO.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Portfolio"
            align="left"
            title={
              <>
                Transformations that <span className="text-gradient-gold">speak for themselves</span>
              </>
            }
            subtitle="Real clients, real results. Browse a glimpse of the magic created in our chairs."
            className="mb-0"
          />
          <Button
            onClick={() => setView("gallery")}
            variant="outline"
            className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5 shrink-0"
          >
            View full gallery
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setView("gallery")}
              className={cn(
                "group relative rounded-2xl overflow-hidden shadow-luxe cursor-pointer img-zoom",
                i === 0 && "col-span-2 row-span-2 aspect-square",
                i !== 0 && "aspect-square"
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">{item.category}</p>
                <p className="font-serif text-base sm:text-lg text-white font-semibold">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { value: "5,000+", label: "Happy Clients", icon: Users },
    { value: "12+", label: "Years of Artistry", icon: Award },
    { value: "16", label: "Signature Services", icon: Sparkles },
    { value: "5.0★", label: "Google Rating", icon: Star },
  ];
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-noir overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B76E79] via-transparent to-[#D4AF37]" />
      </div>
      <div className="container-luxe relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex w-12 h-12 rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4AF37] items-center justify-center mb-3">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/70 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const setView = useSalonStore((s) => s.setView);
  const [index, setIndex] = React.useState(0);
  const items = TESTIMONIALS.slice(0, 5);

  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="section-pad bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-10 right-10 font-serif text-[20rem] leading-none text-[#B76E79]/5 select-none hidden lg:block">
        &ldquo;
      </div>
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by <span className="text-gradient-rose">thousands</span>
            </>
          }
          subtitle="Don't just take our word for it — hear from the people who matter most."
          className="mb-12"
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-3xl p-6 sm:p-10 shadow-luxe border border-border"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed text-balance mb-6">
              &ldquo;{items[index].text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                src={items[index].avatar}
                alt={items[index].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#B76E79]/20"
              />
              <div>
                <p className="font-semibold text-foreground">{items[index].name}</p>
                <p className="text-xs text-muted-foreground">
                  {items[index].location} · {items[index].service}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-gradient-to-r from-[#B76E79] to-[#D4A574]" : "w-1.5 bg-border"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            onClick={() => setView("contact")}
            variant="outline"
            className="rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
          >
            Read more reviews on Google
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const setView = useSalonStore((s) => s.setView);
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-luxe-lg"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/images/salon-reception.svg"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
              Ready when you are
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 text-balance leading-[1.1]">
              Your most beautiful self is one appointment away
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
              Book in seconds, get a confirmation email, and arrive to a warm welcome.
              Walk in as you are. Leave as the most radiant version of yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setView("book")}
                size="lg"
                className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-7 shadow-luxe-lg"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Your Appointment
              </Button>
              <Button
                onClick={() => setView("services")}
                size="lg"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-7"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
