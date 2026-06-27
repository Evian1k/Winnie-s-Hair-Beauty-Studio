"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar as CalIcon,
  Clock,
  User,
  Mail,
  Phone,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MessageSquare,
  CalendarCheck,
  PartyPopper,
} from "lucide-react";
import { PageHeader } from "@/components/section-heading";
import { SERVICES, STYLISTS, SALON_INFO } from "@/lib/salon-data";
import { useSalonStore } from "@/lib/salon-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Please enter your full name"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

const STEPS = [
  { id: 1, label: "Service", icon: Sparkles },
  { id: 2, label: "Date & Time", icon: CalIcon },
  { id: 3, label: "Stylist", icon: User },
  { id: 4, label: "Your Details", icon: Mail },
  { id: 5, label: "Confirm", icon: CalendarCheck },
];

export function BookingView() {
  const preselectedService = useSalonStore((s) => s.preselectedService);
  const setPreselectedService = useSalonStore((s) => s.setPreselectedService);
  const addBooking = useSalonStore((s) => s.addBooking);
  const setView = useSalonStore((s) => s.setView);

  const [step, setStep] = React.useState(1);
  const [selectedService, setSelectedService] = React.useState<string | null>(preselectedService);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    shouldUnregister: false,
  });

  // Wrapper to call handleSubmit from a non-submit button (step 5 confirm)
  const onConfirmClick = () => {
    handleSubmit(onSubmit)();
  };

  // Prefill service when arriving
  React.useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setStep(2);
      setPreselectedService(null);
    }
  }, [preselectedService, setPreselectedService]);

  const service = SERVICES.find((s) => s.id === selectedService);
  const stylist = STYLISTS.find((s) => s.id === selectedStylist);
  const isAnyStylist = selectedStylist === "any";

  const nextStep = async () => {
    if (step === 1 && !selectedService) {
      toast.error("Please select a service to continue");
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast.error("Please pick a date and time");
      return;
    }
    if (step === 3 && !selectedStylist) {
      toast.error("Please choose a stylist");
      return;
    }
    if (step === 4) {
      const valid = await trigger();
      if (!valid) return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (data: BookingForm) => {
    if (!service || !selectedDate || !selectedTime || (!stylist && !isAnyStylist)) {
      toast.error("Missing booking details. Please review your selection.");
      return;
    }

    const bookingPayload = {
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      date: selectedDate.toISOString(),
      time: selectedTime,
      stylistId: isAnyStylist ? "any" : (stylist?.id ?? ""),
      stylistName: isAnyStylist ? "No preference (first available)" : (stylist?.name ?? ""),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      notes: data.notes,
      price: service.startingPrice,
    };

    // Also save to local store (immediate — used by admin dashboard)
    const localBooking = addBooking(bookingPayload);

    // Try to persist via API (server-side DB + email)
    const loadingToast = toast.loading("Confirming your booking…");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      const result = await res.json();
      toast.dismiss(loadingToast);

      if (!res.ok) {
        toast.success("Booking confirmed! (Saved locally — server sync pending.)");
        setConfirmed(localBooking.id);
        return;
      }

      toast.success(
        result.message ||
          "Booking confirmed! A confirmation email is on its way to your inbox."
      );
      setConfirmed(localBooking.id);
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("[Booking] API call failed:", err);
      // Network failure — booking was still saved to localStorage
      toast.success("Booking confirmed! (Saved locally — server sync pending.)");
      setConfirmed(localBooking.id);
    }
  };

  // Disabled dates (past dates + today after 8pm)
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Success screen
  if (confirmed) {
    return (
      <div>
        <PageHeader eyebrow="Booking Confirmed" title="See you soon!" />
        <section className="pb-20">
          <div className="container-luxe">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-luxe-lg"
              >
                <PartyPopper className="h-10 w-10 text-white" />
              </motion.div>

              <h2 className="font-serif text-3xl font-semibold mb-3">
                Your appointment is booked!
              </h2>
              <p className="text-muted-foreground mb-8">
                We've sent a confirmation email to <strong className="text-foreground">{getValues("customerEmail")}</strong>.
                Our team will reach out 24 hours before your appointment to confirm.
              </p>

              <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border text-left mb-8">
                <h3 className="font-serif text-lg font-semibold mb-4 text-center">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <Row label="Reference" value={confirmed.toUpperCase()} />
                  <Row label="Service" value={service?.name || ""} />
                  <Row label="Date" value={selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy") : ""} />
                  <Row label="Time" value={selectedTime || ""} />
                  <Row label="Stylist" value={stylist?.name || ""} />
                  <Row label="From" value={`KSh ${service?.startingPrice.toLocaleString()}`} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setView("home")}
                  className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-6"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => {
                    setConfirmed(null);
                    setStep(1);
                    setSelectedService(null);
                    setSelectedDate(undefined);
                    setSelectedTime(null);
                    setSelectedStylist(null);
                  }}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  Book Another
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Book Appointment"
        title={
          <>
            Reserve your <span className="text-gradient-rose">moment</span>
          </>
        }
        subtitle="A few quick steps and you're booked. Confirmation email arrives within minutes."
        image="/images/salon-stations.svg"
      />

      <section className="pb-20">
        <div className="container-luxe max-w-5xl">
          {/* Step indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all",
                        step === s.id
                          ? "bg-gradient-to-br from-[#B76E79] to-[#D4A574] text-white shadow-luxe scale-110"
                          : step > s.id
                          ? "bg-[#D4AF37] text-white"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <span className={cn(
                      "text-[10px] sm:text-xs font-medium hidden sm:block",
                      step === s.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 sm:mx-3 bg-border relative -top-5 sm:-top-6">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B76E79] to-[#D4AF37]"
                        animate={{ width: step > s.id ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main form area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
                  >
                    <h3 className="font-serif text-xl font-semibold mb-1">Choose a service</h3>
                    <p className="text-sm text-muted-foreground mb-6">Pick the treatment you'd like to book.</p>

                    <div className="grid sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto luxe-scroll pr-1">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedService(s.id)}
                          className={cn(
                            "group flex items-center gap-3 p-3 rounded-2xl border text-left transition-all",
                            selectedService === s.id
                              ? "border-[#B76E79] bg-[#B76E79]/5 shadow-luxe"
                              : "border-border hover:border-[#B76E79]/40 hover:bg-secondary/40"
                          )}
                        >
                          <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-sm font-semibold truncate">{s.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{s.duration}</p>
                            <p className="text-xs font-medium text-[#B76E79] mt-0.5">From KSh {s.startingPrice.toLocaleString()}</p>
                          </div>
                          {selectedService === s.id && (
                            <Check className="h-5 w-5 text-[#B76E79] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
                  >
                    <h3 className="font-serif text-xl font-semibold mb-1">Pick date &amp; time</h3>
                    <p className="text-sm text-muted-foreground mb-6">Choose a day that works for you.</p>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                          Date
                        </Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={disabledDays}
                          className="rounded-2xl border border-border p-3"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                          Time
                        </Label>
                        <div className="grid grid-cols-3 gap-2 max-h-[280px] overflow-y-auto luxe-scroll pr-1">
                          {TIME_SLOTS.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "py-2.5 rounded-xl text-sm font-medium transition-all",
                                selectedTime === time
                                  ? "bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white shadow-luxe"
                                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Stylist */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
                  >
                    <h3 className="font-serif text-xl font-semibold mb-1">Choose your stylist</h3>
                    <p className="text-sm text-muted-foreground mb-6">Pick the artist you'd like to work with — or select "No preference".</p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedStylist("any")}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border text-left transition-all",
                          selectedStylist === "any"
                            ? "border-[#B76E79] bg-[#B76E79]/5 shadow-luxe"
                            : "border-border hover:border-[#B76E79]/40 hover:bg-secondary/40"
                        )}
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B76E79]/20 to-[#D4AF37]/20 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-[#B76E79]" />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-semibold">No preference</p>
                          <p className="text-xs text-muted-foreground">First available stylist</p>
                        </div>
                        {selectedStylist === "any" && <Check className="h-5 w-5 text-[#B76E79] ml-auto" />}
                      </button>

                      {STYLISTS.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setSelectedStylist(st.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border text-left transition-all",
                            selectedStylist === st.id
                              ? "border-[#B76E79] bg-[#B76E79]/5 shadow-luxe"
                              : "border-border hover:border-[#B76E79]/40 hover:bg-secondary/40"
                          )}
                        >
                          <img src={st.image} alt={st.name} className="w-14 h-14 rounded-full object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-sm font-semibold truncate">{st.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{st.role}</p>
                          </div>
                          {selectedStylist === st.id && <Check className="h-5 w-5 text-[#B76E79] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
                  >
                    <h3 className="font-serif text-xl font-semibold mb-1">Your details</h3>
                    <p className="text-sm text-muted-foreground mb-6">We'll send your confirmation here.</p>

                    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <Label htmlFor="customerName" className="mb-1.5 block">Full name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="customerName"
                            placeholder="e.g. Jane Wanjiru"
                            className="pl-10"
                            {...register("customerName")}
                          />
                        </div>
                        {errors.customerName && (
                          <p className="text-xs text-destructive mt-1">{errors.customerName.message}</p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customerEmail" className="mb-1.5 block">Email *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="customerEmail"
                              type="email"
                              placeholder="you@email.com"
                              className="pl-10"
                              {...register("customerEmail")}
                            />
                          </div>
                          {errors.customerEmail && (
                            <p className="text-xs text-destructive mt-1">{errors.customerEmail.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="customerPhone" className="mb-1.5 block">Phone *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="customerPhone"
                              placeholder="+254 7XX XXX XXX"
                              className="pl-10"
                              {...register("customerPhone")}
                            />
                          </div>
                          {errors.customerPhone && (
                            <p className="text-xs text-destructive mt-1">{errors.customerPhone.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="mb-1.5 block">
                          Notes <span className="text-muted-foreground text-xs">(optional)</span>
                        </Label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            id="notes"
                            placeholder="Tell us about your hair, allergies, preferred products, or any special requests…"
                            className="pl-10 min-h-[100px]"
                            {...register("notes")}
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 5: Confirm */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card rounded-3xl p-6 sm:p-8 shadow-luxe border border-border"
                  >
                    <h3 className="font-serif text-xl font-semibold mb-1">Review &amp; confirm</h3>
                    <p className="text-sm text-muted-foreground mb-6">Make sure everything looks right.</p>

                    <div className="space-y-3">
                      <Row label="Service" value={service?.name || "—"} icon={Sparkles} />
                      <Row label="Date" value={selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy") : "—"} icon={CalIcon} />
                      <Row label="Time" value={selectedTime || "—"} icon={Clock} />
                      <Row
                        label="Stylist"
                        value={selectedStylist === "any" ? "No preference (first available)" : stylist?.name || "—"}
                        icon={User}
                      />
                      <Row label="Name" value={getValues("customerName") || "—"} icon={User} />
                      <Row label="Email" value={getValues("customerEmail") || "—"} icon={Mail} />
                      <Row label="Phone" value={getValues("customerPhone") || "—"} icon={Phone} />
                      {getValues("notes") && (
                        <Row label="Notes" value={getValues("notes") || ""} icon={MessageSquare} />
                      )}
                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-sm font-medium">Starting price</span>
                        <span className="font-serif text-xl font-bold text-gradient-rose">
                          KSh {service?.startingPrice.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                      By confirming, you agree to our cancellation policy (free up to 24 hours before;
                      50% fee within 24 hours; full fee for no-shows).
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="ghost"
                  className={cn("rounded-full", step === 1 && "opacity-0 pointer-events-none")}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>

                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-6"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={onConfirmClick}
                    className="bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full px-6"
                  >
                    <CalendarCheck className="h-4 w-4 mr-2" />
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-card rounded-3xl p-6 shadow-luxe border border-border">
                <h4 className="font-serif text-base font-semibold mb-4">Your booking</h4>
                <div className="space-y-3 text-sm">
                  <Row label="Service" value={service?.name || "Not selected"} />
                  <Row label="Date" value={selectedDate ? format(selectedDate, "d MMM yyyy") : "Not selected"} />
                  <Row label="Time" value={selectedTime || "Not selected"} />
                  <Row
                    label="Stylist"
                    value={selectedStylist === "any"
                      ? "No preference"
                      : stylist?.name || "Not selected"}
                  />
                </div>
                {service && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="font-serif text-2xl font-bold text-gradient-rose">
                      KSh {service.startingPrice.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Need help?</p>
                  <Button
                    onClick={() => (window.location.href = `tel:${SALON_INFO.phoneRaw}`)}
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full border-[#B76E79]/30 hover:bg-[#B76E79]/5"
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    Call {SALON_INFO.phone}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground flex items-center gap-1.5 shrink-0">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </span>
      <span className="font-medium text-right break-words">{value}</span>
    </div>
  );
}
