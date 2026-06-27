"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalonStore } from "@/lib/salon-store";
import { LogoMark } from "@/components/logo";

export function LoadingScreen() {
  const initialLoading = useSalonStore((s) => s.initialLoading);

  return (
    <AnimatePresence>
      {initialLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#FAF6F0] via-white to-[#F0EBE0]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Decorative emerald rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#C9A961]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full border border-[#0F4C3A]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              className="relative w-28 h-28 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#C9A961]"
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[#0F4C3A]"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-luxe-lg">
                <LogoMark size={80} className="w-full h-full" />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-foreground">
                Lizaya
              </h1>
              <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Hair Studio
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-[#0F4C3A]/60">
                Salon · SPA · Barbershop
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="relative h-px w-48 bg-muted overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0F4C3A] via-[#C9A961] to-[#0F4C3A]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Preparing your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
