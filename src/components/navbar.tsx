"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Search, Moon, Sun, Phone, Calendar } from "lucide-react";
import { useTheme } from "next-themes";
import { useSalonStore } from "@/lib/salon-store";
import { NAV_LINKS, SALON_INFO } from "@/lib/salon-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SERVICES, FAQS, PACKAGES } from "@/lib/salon-data";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const currentView = useSalonStore((s) => s.currentView);
  const setView = useSalonStore((s) => s.setView);
  const setMobileMenuOpen = useSalonStore((s) => s.setMobileMenuOpen);

  React.useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const handleNav = (view: string) => {
    setView(view as any);
    setMobileOpen(false);
    setMobileMenuOpen(false);
  };

  // Search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return { services: [], faqs: [], packages: [] };
    const q = searchQuery.toLowerCase();
    return {
      services: SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.includes(q)
      ).slice(0, 5),
      faqs: FAQS.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      ).slice(0, 4),
      packages: PACKAGES.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      ).slice(0, 3),
    };
  }, [searchQuery]);

  const totalResults =
    searchResults.services.length +
    searchResults.faqs.length +
    searchResults.packages.length;

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-luxe py-2"
            : "bg-transparent py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container-luxe flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group focus-luxe rounded-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Winnie's Hair & Beauty Studio home"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#B76E79] via-[#D4A574] to-[#D4AF37] flex items-center justify-center shadow-luxe">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white">W</span>
              <div className="absolute inset-0 rounded-full ring-1 ring-white/30" />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="font-serif text-base font-semibold text-foreground tracking-wide">
                Winnie's
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                Hair &amp; Beauty
              </span>
            </div>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNav(link.view)}
                className={cn(
                  "link-underline text-sm font-medium tracking-wide transition-colors focus-luxe rounded-sm",
                  currentView === link.view
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                data-active={currentView === link.view}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-secondary/60 focus-luxe"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="sr-only">
                  <DialogTitle>Search the site</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                  <Input
                    autoFocus
                    placeholder="Search services, FAQs, packages…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
                  />
                </div>
                <div className="max-h-[60vh] overflow-y-auto luxe-scroll">
                  {searchQuery.trim() === "" ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      Type to search our services, FAQs, and packages.
                    </div>
                  ) : totalResults === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No results found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    <div className="py-2">
                      {searchResults.services.length > 0 && (
                        <div className="px-2">
                          <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">Services</p>
                          {searchResults.services.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                handleNav("services");
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 text-left transition-colors"
                            >
                              <img src={s.image} alt="" className="w-10 h-10 rounded object-cover" />
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{s.name}</p>
                                <p className="text-xs text-muted-foreground truncate">From KSh {s.startingPrice.toLocaleString()}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.packages.length > 0 && (
                        <div className="px-2 mt-2">
                          <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">Packages</p>
                          {searchResults.packages.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                handleNav("pricing");
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 text-left transition-colors"
                            >
                              <div className="w-10 h-10 rounded bg-gradient-to-br from-[#B76E79]/15 to-[#D4AF37]/15 flex items-center justify-center text-xs font-serif font-bold text-[#B76E79]">
                                {p.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{p.name}</p>
                                <p className="text-xs text-muted-foreground truncate">KSh {p.price.toLocaleString()}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.faqs.length > 0 && (
                        <div className="px-2 mt-2">
                          <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">FAQs</p>
                          {searchResults.faqs.map((f) => (
                            <button
                              key={f.id}
                              onClick={() => {
                                handleNav("faq");
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="w-full px-3 py-2.5 rounded-lg hover:bg-secondary/60 text-left transition-colors"
                            >
                              <p className="text-sm font-medium line-clamp-1">{f.question}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{f.answer}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary/60 focus-luxe"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* CTA — Book (desktop) */}
            <Button
              onClick={() => handleNav("book")}
              className="hidden md:inline-flex bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full shadow-luxe"
              size="sm"
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              Book Now
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full hover:bg-secondary/60 focus-luxe"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm p-0 bg-gradient-to-b from-[#FFF5F7] to-white dark:from-[#1A0F1A] dark:to-[#0F0A0F]"
              >
                <SheetHeader className="px-6 pt-6 pb-4 text-left">
                  <SheetTitle className="flex items-center gap-3 font-serif text-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79] via-[#D4A574] to-[#D4AF37] flex items-center justify-center">
                      <span className="text-white font-bold">W</span>
                    </div>
                    Winnie's
                  </SheetTitle>
                </SheetHeader>

                <nav className="px-4 py-4 flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.button
                      key={link.view}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      onClick={() => handleNav(link.view)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors",
                        currentView === link.view
                          ? "bg-gradient-to-r from-[#B76E79]/10 to-[#D4AF37]/10 text-foreground"
                          : "hover:bg-secondary/60 text-muted-foreground"
                      )}
                    >
                      <span className="font-serif text-lg">{link.label}</span>
                      <span className="text-[10px] text-muted-foreground/60">
                        0{i + 1}
                      </span>
                    </motion.button>
                  ))}
                </nav>

                <div className="px-6 pt-4 border-t border-border mt-2 space-y-3">
                  <Button
                    onClick={() => handleNav("book")}
                    className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button
                    onClick={() => (window.location.href = `tel:${SALON_INFO.phoneRaw}`)}
                    variant="outline"
                    className="w-full rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    {SALON_INFO.phone}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
}
