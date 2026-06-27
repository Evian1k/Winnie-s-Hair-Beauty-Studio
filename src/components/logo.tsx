"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
  showAccent?: boolean;
}

/**
 * Lizaya Hair Studio logo mark — emerald disc with gold "L" monogram,
 * scissors accent, and ornamental divider. Represents Salon · SPA · Barbershop.
 */
export function LogoMark({ size = 44, className, showAccent = true }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`lm-bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F4C3A" />
          <stop offset="60%" stopColor="#1A6B52" />
          <stop offset="100%" stopColor="#2A7D5F" />
        </linearGradient>
        <linearGradient id={`lm-gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7B3F" />
          <stop offset="50%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#E5C885" />
        </linearGradient>
      </defs>

      {/* Emerald disc */}
      <circle cx="50" cy="50" r="49" fill={`url(#lm-bg-${size})`} />
      {/* Inner gold ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={`url(#lm-gold-${size})`} strokeWidth="0.8" opacity="0.6" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#FFFFFF" strokeWidth="0.3" opacity="0.2" />

      {/* Compass dots */}
      <circle cx="50" cy="5" r="0.8" fill="#C9A961" opacity="0.8" />
      <circle cx="50" cy="95" r="0.8" fill="#C9A961" opacity="0.8" />
      <circle cx="5" cy="50" r="0.8" fill="#C9A961" opacity="0.8" />
      <circle cx="95" cy="50" r="0.8" fill="#C9A961" opacity="0.8" />

      {showAccent && (
        <>
          {/* Scissors icon at top — represents barbershop */}
          <g transform="translate(50, 24)" stroke={`url(#lm-gold-${size})`} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="-4" cy="-2" r="2.5" />
            <circle cx="4" cy="-2" r="2.5" />
            <line x1="-2" y1="0" x2="3" y2="6" />
            <line x1="2" y1="0" x2="-3" y2="6" />
          </g>

          {/* L monogram */}
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="38"
            fontWeight="600"
            fill={`url(#lm-gold-${size})`}
          >
            L
          </text>

          {/* Ornamental divider */}
          <line x1="32" y1="78" x2="46" y2="78" stroke={`url(#lm-gold-${size})`} strokeWidth="0.5" opacity="0.7" />
          <circle cx="50" cy="78" r="0.9" fill={`url(#lm-gold-${size})`} />
          <line x1="54" y1="78" x2="68" y2="78" stroke={`url(#lm-gold-${size})`} strokeWidth="0.5" opacity="0.7" />
        </>
      )}

      {!showAccent && (
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="46"
          fontWeight="600"
          fill={`url(#lm-gold-${size})`}
        >
          L
        </text>
      )}
    </svg>
  );
}

interface LogoLockupProps {
  className?: string;
  showTagline?: boolean;
}

export function LogoLockup({ className, showTagline = true }: LogoLockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark size={48} />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
          Lizaya
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
          Hair Studio
        </span>
        {showTagline && (
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-0.5">
            Salon · SPA · Barbershop
          </span>
        )}
      </div>
    </div>
  );
}
