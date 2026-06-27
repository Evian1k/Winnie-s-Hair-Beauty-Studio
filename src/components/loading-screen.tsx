"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalonStore } from "@/lib/salon-store";

export function LoadingScreen() {
  const initialLoading = useSalonStore((s) => s.initialLoading);

  return (
    <AnimatePresence>
      {initialLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF9E6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Decorative gold rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-[#D4AF37]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full border border-[#B76E79]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              className="relative w-24 h-24 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[#B76E79]"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <div className="font-serif text-4xl font-bold text-gradient-gold">W</div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-foreground">
                Winnie's
              </h1>
              <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Hair &amp; Beauty Studio
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
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79]"
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
              Curating your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
