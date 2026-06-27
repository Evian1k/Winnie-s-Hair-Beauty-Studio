"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
  showAccent?: boolean;
}

/**
 * Refined salon logo mark — gold disc with elegant W monogram,
 * rose accent, ornamental divider, and "EST. 2019" tag.
 *
 * Rendered as inline SVG so it inherits crispness at any size
 * and works as a favicon (via /public/icon.svg) and in the navbar/footer.
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
          <stop offset="0%" stopColor="#B76E79" />
          <stop offset="50%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <radialGradient id={`lm-rose-${size}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFE8EC" />
          <stop offset="60%" stopColor="#F4B8C4" />
          <stop offset="100%" stopColor="#B76E79" />
        </radialGradient>
      </defs>

      {/* Gold disc */}
      <circle cx="50" cy="50" r="49" fill={`url(#lm-bg-${size})`} />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.35" />
      {/* Compass dots */}
      <circle cx="50" cy="5" r="0.8" fill="#FFFFFF" opacity="0.7" />
      <circle cx="50" cy="95" r="0.8" fill="#FFFFFF" opacity="0.7" />
      <circle cx="5" cy="50" r="0.8" fill="#FFFFFF" opacity="0.7" />
      <circle cx="95" cy="50" r="0.8" fill="#FFFFFF" opacity="0.7" />

      {showAccent && (
        <>
          {/* Rose accent */}
          <g transform="translate(50, 28)">
            <ellipse cx="-4" cy="0" rx="3.5" ry="5" fill={`url(#lm-rose-${size})`} opacity="0.85" transform="rotate(-35)" />
            <ellipse cx="4" cy="0" rx="3.5" ry="5" fill={`url(#lm-rose-${size})`} opacity="0.85" transform="rotate(35)" />
            <ellipse cx="0" cy="-3" rx="3.5" ry="4" fill={`url(#lm-rose-${size})`} />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* W monogram */}
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="40"
            fontWeight="bold"
            fill="#FFFFFF"
          >
            W
          </text>

          {/* Ornamental divider */}
          <line x1="32" y1="78" x2="46" y2="78" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />
          <circle cx="50" cy="78" r="0.8" fill="#FFFFFF" opacity="0.9" />
          <line x1="54" y1="78" x2="68" y2="78" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.6" />
        </>
      )}

      {!showAccent && (
        /* Simplified version for tiny sizes — just the W */
        <text
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="48"
          fontWeight="bold"
          fill="#FFFFFF"
        >
          W
        </text>
      )}
    </svg>
  );
}

interface LogoLockupProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * Full horizontal logo lockup — emblem + wordmark.
 * Used in footer and on the About page.
 */
export function LogoLockup({ className, showTagline = true }: LogoLockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark size={48} />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
          Winnie&rsquo;s
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
          Hair &amp; Beauty Studio
        </span>
        {showTagline && (
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-0.5">
            Katani · Kenya
          </span>
        )}
      </div>
    </div>
  );
}
