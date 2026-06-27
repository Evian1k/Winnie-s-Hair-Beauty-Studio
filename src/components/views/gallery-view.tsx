"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PageHeader } from "@/components/section-heading";
import { GALLERY, type GalleryImage } from "@/lib/salon-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Filter = "all" | "hair" | "nails" | "makeup" | "facials" | "salon";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hair", label: "Hair" },
  { value: "nails", label: "Nails" },
  { value: "makeup", label: "Makeup" },
  { value: "facials", label: "Facials" },
  { value: "salon", label: "Salon" },
];

export function GalleryView() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    if (filter === "all") return GALLERY;
    return GALLERY.filter((g) => g.category === filter);
  }, [filter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  // Keyboard nav
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A portfolio of <span className="text-gradient-gold">transformations</span>
          </>
        }
        subtitle="Real clients. Real results. Filter by category and click any image to view full size."
        image="https://sfile.chatglm.cn/images-ppt/cab219cbd04b.jpg"
      />

      <section className="pb-20">
        <div className="container-luxe">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  filter === f.value
                    ? "bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white shadow-luxe"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.button
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => openLightbox(i)}
                  className="group relative w-full mb-4 block break-inside-avoid overflow-hidden rounded-2xl shadow-luxe focus-luxe"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">{img.category}</p>
                      <p className="font-serif text-base text-white font-semibold">{img.caption}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  {filtered[lightboxIndex].category}
                </p>
                <p className="font-serif text-lg text-white mt-1">
                  {filtered[lightboxIndex].caption}
                </p>
                <p className="text-xs text-white/50 mt-2">
                  {lightboxIndex + 1} of {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
