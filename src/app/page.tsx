"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalonStore } from "@/lib/salon-store";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingButtons } from "@/components/floating-buttons";
import { HomeView } from "@/components/views/home-view";
import { AboutView } from "@/components/views/about-view";
import { ServicesView } from "@/components/views/services-view";
import { GalleryView } from "@/components/views/gallery-view";
import { PricingView } from "@/components/views/pricing-view";
import { BookingView } from "@/components/views/booking-view";
import { ContactView } from "@/components/views/contact-view";
import { FaqView } from "@/components/views/faq-view";
import { AdminView } from "@/components/views/admin-view";
import { PrivacyView, TermsView, NotFoundView } from "@/components/views/legal-views";

export default function Home() {
  const currentView = useSalonStore((s) => s.currentView);

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="min-h-screen flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView + "-content"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {currentView === "home" && <HomeView />}
                  {currentView === "about" && <AboutView />}
                  {currentView === "services" && <ServicesView />}
                  {currentView === "gallery" && <GalleryView />}
                  {currentView === "pricing" && <PricingView />}
                  {currentView === "book" && <BookingView />}
                  {currentView === "contact" && <ContactView />}
                  {currentView === "faq" && <FaqView />}
                  {currentView === "privacy" && <PrivacyView />}
                  {currentView === "terms" && <TermsView />}
                  {currentView === "admin" && <AdminView />}
                  {currentView === "not-found" && <NotFoundView />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </main>
      <FloatingButtons />
    </>
  );
}
