"use client";

import * as React from "react";
import { useSalonStore, getViewFromHash } from "@/lib/salon-store";

export function SalonProvider({ children }: { children: React.ReactNode }) {
  const setView = useSalonStore((s) => s.setView);
  const setInitialLoading = useSalonStore((s) => s.setInitialLoading);
  const initialLoading = useSalonStore((s) => s.initialLoading);

  // Initialize view from hash on mount
  React.useEffect(() => {
    const view = getViewFromHash();
    if (view !== "home") {
      setView(view);
    }
  }, [setView]);

  // Handle hash changes (back/forward)
  React.useEffect(() => {
    const handleHashChange = () => {
      const view = getViewFromHash();
      setView(view);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [setView]);

  // Loading screen timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [setInitialLoading]);

  return <>{children}</>;
}
