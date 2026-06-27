"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#B76E79] font-medium"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance leading-[1.1]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          "h-px bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-transparent",
          align === "center" ? "w-24" : "w-20"
        )}
      />
    </div>
  );
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string;
}

export function PageHeader({ eyebrow, title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {image && (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-10"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7]/60 via-background to-background dark:from-[#2D1F2D]/40" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 -right-20 w-72 h-72 bg-[#B76E79]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-32 -left-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />

      <div className="container-luxe">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </div>
    </section>
  );
}
