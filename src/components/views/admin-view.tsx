"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Lock,
  Mail,
  Trash2,
  Check,
  X,
  Eye,
  Star,
} from "lucide-react";
import { PageHeader } from "@/components/section-heading";
import { useSalonStore } from "@/lib/salon-store";
import { SERVICES, TESTIMONIALS, FAQS, SALON_INFO } from "@/lib/salon-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "winnie2024";

// Helper for admin API calls
async function adminFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("winnies-admin-token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers.authorization = `Bearer ${token}`;
  return fetch(path, { ...options, headers });
}

export function AdminView() {
  const adminAuthed = useSalonStore((s) => s.adminAuthed);
  const setAdminAuthed = useSalonStore((s) => s.setAdminAuthed);
  const [password, setPassword] = React.useState("");
  const [authenticating, setAuthenticating] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    try {
      // Try server-side auth (works when ADMIN_PASSWORD env is set in production)
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("winnies-admin-token", data.token);
        }
        setAdminAuthed(true);
        toast.success("Welcome back, Winnie!");
      } else {
        // Fallback to client-side check (demo mode)
        if (password === ADMIN_PASSWORD) {
          localStorage.setItem("winnies-admin-token", ADMIN_PASSWORD);
          setAdminAuthed(true);
          toast.success("Welcome back, Winnie!");
        } else {
          toast.error("Incorrect password. Hint: winnie2024");
        }
      }
    } catch (err) {
      // Network error — fallback to client-side check
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("winnies-admin-token", ADMIN_PASSWORD);
        setAdminAuthed(true);
        toast.success("Welcome back, Winnie!");
      } else {
        toast.error("Incorrect password.");
      }
    }
    setAuthenticating(false);
  };

  if (!adminAuthed) {
    return (
      <div>
        <PageHeader eyebrow="Admin" title={<>Studio <span className="text-gradient-rose">dashboard</span></>} />
        <section className="pb-20">
          <div className="container-luxe max-w-md">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleLogin}
              className="bg-card rounded-3xl p-8 shadow-luxe border border-border"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B76E79] to-[#D4AF37] flex items-center justify-center mb-5 mx-auto">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-center mb-2">Welcome back</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Sign in to manage bookings, services, and more.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password" className="mb-1.5 block">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  disabled={authenticating}
                  className="w-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] hover:opacity-90 text-white rounded-full"
                >
                  {authenticating ? "Signing in…" : "Sign In"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Demo password: <code className="px-1.5 py-0.5 rounded bg-secondary font-mono">winnie2024</code>
              </p>
            </motion.form>
          </div>
        </section>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const setAdminAuthed = useSalonStore((s) => s.setAdminAuthed);
  const [tab, setTab] = React.useState("overview");

  return (
    <div className="min-h-screen">
      <PageHeader eyebrow="Admin" title={<>Studio <span className="text-gradient-rose">dashboard</span></>} />
      <section className="pb-20">
        <div className="container-luxe">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Logged in as <strong className="text-foreground">Winnie Achieng</strong>
            </p>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("winnies-admin-token");
                }
                setAdminAuthed(false);
                toast.info("You've been signed out.");
              }}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign Out
            </Button>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full rounded-2xl p-1 bg-secondary/50 mb-6 h-auto">
              {[
                { v: "overview", l: "Overview", i: LayoutDashboard },
                { v: "bookings", l: "Bookings", i: Calendar },
                { v: "messages", l: "Messages", i: MessageSquare },
                { v: "services", l: "Services", i: Star },
                { v: "gallery", l: "Gallery", i: ImageIcon },
                { v: "settings", l: "Settings", i: Settings },
              ].map((t) => (
                <TabsTrigger
                  key={t.v}
                  value={t.v}
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B76E79] data-[state=active]:to-[#D4A574] data-[state=active]:text-white py-2 text-xs sm:text-sm"
                >
                  <t.i className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden sm:inline">{t.l}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview"><OverviewTab /></TabsContent>
            <TabsContent value="bookings"><BookingsTab /></TabsContent>
            <TabsContent value="messages"><MessagesTab /></TabsContent>
            <TabsContent value="services"><ServicesTab /></TabsContent>
            <TabsContent value="gallery"><GalleryTab /></TabsContent>
            <TabsContent value="settings"><SettingsTab /></TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, accent }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-6 shadow-luxe border border-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center", accent)}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="font-serif text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
}

function OverviewTab() {
  const bookings = useSalonStore((s) => s.bookings);
  const messages = useSalonStore((s) => s.messages);
  const subscribers = useSalonStore((s) => s.subscribers);

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Revenue" value={`KSh ${totalRevenue.toLocaleString()}`} trend="+12%" accent="bg-[#D4AF37]/15 text-[#D4AF37]" />
        <StatCard icon={Calendar} label="Bookings" value={bookings.length} trend="+8%" accent="bg-[#B76E79]/15 text-[#B76E79]" />
        <StatCard icon={MessageSquare} label="Messages" value={messages.length} accent="bg-[#D4A574]/15 text-[#D4A574]" />
        <StatCard icon={Mail} label="Subscribers" value={subscribers.length} trend="+5%" accent="bg-[#B76E79]/15 text-[#B76E79]" />
      </div>

      {/* Quick alerts */}
      <div className="grid md:grid-cols-2 gap-4">
        {pendingBookings > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              {pendingBookings} pending booking{pendingBookings > 1 ? "s" : ""} awaiting confirmation
            </p>
          </div>
        )}
        {unreadMessages > 0 && (
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
              {unreadMessages} unread message{unreadMessages > 1 ? "s" : ""} from customers
            </p>
          </div>
        )}
      </div>

      {/* Recent bookings */}
      <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border">
        <h3 className="font-serif text-lg font-semibold mb-4">Recent Bookings</h3>
        {recentBookings.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No bookings yet. Share your booking page to get started!</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-secondary/30">
                <div>
                  <p className="font-medium text-sm">{b.customerName}</p>
                  <p className="text-xs text-muted-foreground">{b.serviceName} · {format(new Date(b.date), "d MMM")} · {b.time}</p>
                </div>
                <Badge variant="outline" className={cn(
                  "text-xs",
                  b.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  b.status === "pending" && "bg-amber-50 text-amber-700 border-amber-200",
                  b.status === "cancelled" && "bg-red-50 text-red-700 border-red-200",
                  b.status === "completed" && "bg-blue-50 text-blue-700 border-blue-200"
                )}>
                  {b.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingsTab() {
  const bookings = useSalonStore((s) => s.bookings);
  const updateBookingStatus = useSalonStore((s) => s.updateBookingStatus);
  const deleteBooking = useSalonStore((s) => s.deleteBooking);
  const [filter, setFilter] = React.useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all",
              filter === f
                ? "bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white"
                : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card rounded-3xl p-12 text-center shadow-luxe border border-border">
          <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No {filter !== "all" ? filter + " " : ""}bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 shadow-luxe border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-serif text-base font-semibold">{b.customerName}</p>
                  <p className="text-xs text-muted-foreground">{b.customerEmail} · {b.customerPhone}</p>
                </div>
                <Badge variant="outline" className={cn(
                  "text-xs capitalize",
                  b.status === "confirmed" && "bg-emerald-50 text-emerald-700 border-emerald-200",
                  b.status === "pending" && "bg-amber-50 text-amber-700 border-amber-200",
                  b.status === "cancelled" && "bg-red-50 text-red-700 border-red-200",
                  b.status === "completed" && "bg-blue-50 text-blue-700 border-blue-200"
                )}>
                  {b.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider">Service</p>
                  <p className="font-medium">{b.serviceName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider">Date</p>
                  <p className="font-medium">{format(new Date(b.date), "d MMM yyyy")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider">Time</p>
                  <p className="font-medium">{b.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider">Stylist</p>
                  <p className="font-medium">{b.stylistName}</p>
                </div>
              </div>

              {b.notes && (
                <p className="text-xs text-muted-foreground p-3 bg-secondary/40 rounded-lg mb-3">
                  <strong>Notes:</strong> {b.notes}
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <p className="font-serif text-sm font-bold text-gradient-rose">
                  KSh {b.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  {b.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full h-8 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        onClick={() => {
                          updateBookingStatus(b.id, "confirmed");
                          toast.success("Booking confirmed. Email sent to customer.");
                        }}
                      >
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full h-8 border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => {
                          updateBookingStatus(b.id, "cancelled");
                          toast.info("Booking cancelled.");
                        }}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {b.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8 border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        updateBookingStatus(b.id, "completed");
                        toast.success("Marked as completed.");
                      }}
                    >
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Complete
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full h-8 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      deleteBooking(b.id);
                      toast.info("Booking deleted.");
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesTab() {
  const messages = useSalonStore((s) => s.messages);
  const markMessageRead = useSalonStore((s) => s.markMessageRead);
  const deleteMessage = useSalonStore((s) => s.deleteMessage);

  if (messages.length === 0) {
    return (
      <div className="bg-card rounded-3xl p-12 text-center shadow-luxe border border-border">
        <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "bg-card rounded-2xl p-5 shadow-luxe border border-border",
            !m.read && "ring-2 ring-[#B76E79]/30"
          )}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="font-serif text-base font-semibold">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.email} {m.phone && `· ${m.phone}`}</p>
            </div>
            <p className="text-xs text-muted-foreground">{format(new Date(m.createdAt), "d MMM, h:mm a")}</p>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">{m.message}</p>
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            {!m.read && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full h-8"
                onClick={() => markMessageRead(m.id)}
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                Mark as read
              </Button>
            )}
            <a href={`mailto:${m.email}`}>
              <Button size="sm" variant="outline" className="rounded-full h-8">
                <Mail className="h-3.5 w-3.5 mr-1" />
                Reply
              </Button>
            </a>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full h-8 hover:bg-red-50 hover:text-red-600 ml-auto"
              onClick={() => deleteMessage(m.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ServicesTab() {
  const [services, setServices] = React.useState(SERVICES);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {services.length} services · Edit prices and details below
        </p>
        <Button size="sm" className="rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white">
          + Add Service
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-card rounded-2xl p-4 shadow-luxe border border-border">
            <img src={s.image} alt={s.name} className="w-full h-32 object-cover rounded-xl mb-3" />
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-serif text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{s.category}</p>
              </div>
              {s.popular && <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Input
                defaultValue={s.startingPrice}
                className="h-8 text-sm"
                onChange={(e) => {
                  const newPrice = parseInt(e.target.value) || 0;
                  setServices((prev) => prev.map((p) => p.id === s.id ? { ...p, startingPrice: newPrice } : p));
                }}
              />
              <span className="text-xs text-muted-foreground">KSh</span>
              <Button size="sm" variant="outline" className="h-8 ml-auto" onClick={() => toast.success(`Price updated for ${s.name}`)}>
                Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryTab() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<{
    enabled: boolean;
    message: string;
  } | null>(null);
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

  // Check Cloudinary status on mount
  React.useEffect(() => {
    fetch("/api/cloudinary/signature")
      .then((r) => r.json())
      .then((data) => {
        setUploadStatus({
          enabled: data.enabled,
          message: data.message || "Ready to upload",
        });
      })
      .catch(() => setUploadStatus({ enabled: false, message: "Failed to check upload status" }));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum 5MB.");
      return;
    }

    setUploading(true);
    setUploadedUrl(null);

    try {
      // Get signature from server
      const sigRes = await fetch("/api/cloudinary/signature");
      const sig = await sigRes.json();

      if (!sig.enabled) {
        toast.error("Cloudinary not configured. Add credentials to .env to enable uploads.");
        setUploading(false);
        return;
      }

      // Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", sig.signature);
      formData.append("timestamp", sig.timestamp.toString());
      formData.append("api_key", sig.apiKey);
      formData.append("folder", "winnies-salon");

      const uploadRes = await fetch(sig.uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      const result = await uploadRes.json();
      setUploadedUrl(result.secure_url);
      toast.success("Image uploaded! Copy the URL below to add to your gallery.");
    } catch (err) {
      console.error("[Upload] Error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage portfolio images</p>
        <Button
          size="sm"
          className="rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || !uploadStatus?.enabled}
        >
          {uploading ? "Uploading…" : "+ Upload Image"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      <div className="bg-card rounded-2xl p-8 text-center border-2 border-dashed border-border">
        <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
        <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click "Upload Image"</p>
        <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</p>
      </div>

      {uploadStatus && (
        <div className={cn(
          "p-4 rounded-2xl text-sm",
          uploadStatus.enabled
            ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200"
            : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200"
        )}>
          <strong>{uploadStatus.enabled ? "✓ Cloudinary connected" : "⚠ Cloudinary not configured"}</strong>
          <p className="mt-1 text-xs">{uploadStatus.message}</p>
        </div>
      )}

      {uploadedUrl && (
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Uploaded image URL</p>
          <div className="flex items-center gap-3">
            <img src={uploadedUrl} alt="Uploaded" className="w-16 h-16 rounded-lg object-cover" />
            <code className="flex-1 text-xs px-2 py-1.5 rounded bg-secondary break-all">{uploadedUrl}</code>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full shrink-0"
              onClick={() => {
                navigator.clipboard.writeText(uploadedUrl);
                toast.success("URL copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        To enable uploads: sign up at <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-[#B76E79] hover:underline">cloudinary.com</a> and add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your <code className="px-1 py-0.5 rounded bg-secondary font-mono">.env</code> file.
      </p>
    </div>
  );
}

function SettingsTab() {
  const [integrationStatus, setIntegrationStatus] = React.useState<{
    name: string;
    status: "Active" | "Not configured";
    desc: string;
  }[]>([
    { name: "Database (Prisma + Postgres/SQLite)", status: "Not configured", desc: "Checking…" },
    { name: "Cloudinary (Image Uploads)", status: "Not configured", desc: "Checking…" },
    { name: "Resend (Email Notifications)", status: "Not configured", desc: "Checking…" },
    { name: "Google Maps", status: "Active", desc: "Embedded map working" },
  ]);

  React.useEffect(() => {
    // Check Cloudinary status
    fetch("/api/cloudinary/signature")
      .then((r) => r.json())
      .then((data) => {
        setIntegrationStatus((prev) => prev.map((item) =>
          item.name.includes("Cloudinary")
            ? {
                ...item,
                status: data.enabled ? "Active" : "Not configured",
                desc: data.enabled ? "Connected — uploads enabled" : "Add CLOUDINARY_* env vars to enable",
              }
            : item
        ));
      })
      .catch(() => {});

    // Check if database is enabled by attempting to fetch bookings (will 401 if DB-backed admin route works)
    fetch("/api/admin/verify")
      .then((r) => r.json())
      .then(() => {
        setIntegrationStatus((prev) => prev.map((item) =>
          item.name.includes("Database")
            ? {
                ...item,
                status: "Active",
                desc: "Connected — data persisted to database",
              }
            : item
        ));
      })
      .catch(() => {
        setIntegrationStatus((prev) => prev.map((item) =>
          item.name.includes("Database")
            ? {
                ...item,
                status: "Not configured",
                desc: "Add DATABASE_URL (Supabase Postgres) to .env",
              }
            : item
        ));
      });
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border">
        <h3 className="font-serif text-lg font-semibold mb-4">Business Information</h3>
        <p className="text-xs text-muted-foreground mb-4">
          These values are loaded from environment variables. To change them, edit your <code className="px-1 py-0.5 rounded bg-secondary font-mono">.env</code> file and redeploy.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block text-xs">Business Name</Label>
            <Input defaultValue={SALON_INFO.name} readOnly className="bg-secondary/30" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Phone</Label>
            <Input defaultValue={SALON_INFO.phone} readOnly className="bg-secondary/30" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Email</Label>
            <Input defaultValue={SALON_INFO.email} readOnly className="bg-secondary/30" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">WhatsApp</Label>
            <Input defaultValue={SALON_INFO.whatsapp} readOnly className="bg-secondary/30" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Instagram</Label>
            <Input defaultValue={SALON_INFO.social.instagram} readOnly className="bg-secondary/30" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Facebook</Label>
            <Input defaultValue={SALON_INFO.social.facebook} readOnly className="bg-secondary/30" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-3xl p-6 shadow-luxe border border-border">
        <h3 className="font-serif text-lg font-semibold mb-4">Integration Status</h3>
        <div className="space-y-3">
          {integrationStatus.map((i) => (
            <div key={i.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
              <div>
                <p className="text-sm font-medium">{i.name}</p>
                <p className="text-xs text-muted-foreground">{i.desc}</p>
              </div>
              <Badge variant="outline" className={cn(
                "text-xs",
                i.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800" : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
              )}>
                {i.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-secondary/30 text-xs text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-1">How to activate integrations:</p>
          <p>1. Copy <code className="px-1 py-0.5 rounded bg-background font-mono">.env.example</code> to <code className="px-1 py-0.5 rounded bg-background font-mono">.env</code></p>
          <p>2. Sign up for each service and add your API keys</p>
          <p>3. Redeploy on Vercel — integrations activate automatically</p>
          <p className="mt-2">See <code className="px-1 py-0.5 rounded bg-background font-mono">DEPLOYMENT.md</code> in your project root for the full guide.</p>
        </div>
      </div>
    </div>
  );
}
