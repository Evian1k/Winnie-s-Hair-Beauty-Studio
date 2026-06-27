import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SalonProvider } from "@/components/salon-provider";
import { cn } from "@/lib/utils";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://lizayahairstudio.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lizaya Hair Studio — Salon, SPA & Barbershop | Gateway Mall, Syokimau",
    template: "%s | Lizaya Hair Studio",
  },
  description:
    "Lizaya Hair Studio at Gateway Mall, Syokimau — your premier destination for hair styling, barbershop grooming, spa treatments, and nail care. 4.1★ rating, 166+ reviews. Open daily until 9:30 PM.",
  keywords: [
    "hair salon Syokimau",
    "barbershop Gateway Mall",
    "spa Syokimau",
    "beauty salon near JKIA",
    "hair styling Kenya",
    "barber shop Mavoko",
    "nail studio Syokimau",
    "massage spa Syokimau",
    "Lizaya Hair Studio",
    "men's grooming Kenya",
    "beard trim Syokimau",
    "braiding salon",
    "facials Syokimau",
    "manicure pedicure",
  ],
  authors: [{ name: "Lizaya Hair Studio" }],
  creator: "Lizaya Hair Studio",
  publisher: "Lizaya Hair Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "Beauty",
  openGraph: {
    title: "Lizaya Hair Studio — Salon, SPA & Barbershop | Gateway Mall, Syokimau",
    description:
      "Your premier destination for hair, barber, spa, and nail services in Syokimau. 4.1★ rating, 166+ reviews. Open daily until 9:30 PM.",
    url: siteUrl,
    siteName: "Lizaya Hair Studio",
    images: [
      {
        url: "https://sfile.chatglm.cn/images-ppt/12a31a152fe9.jpg",
        width: 1200,
        height: 630,
        alt: "Lizaya Hair Studio — Salon, SPA & Barbershop in Gateway Mall, Syokimau",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lizaya Hair Studio — Salon, SPA & Barbershop | Gateway Mall, Syokimau",
    description:
      "Your premier destination for hair, barber, spa, and nail services in Syokimau. 4.1★ rating, 166+ reviews.",
    images: ["https://sfile.chatglm.cn/images-ppt/12a31a152fe9.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1F17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Lizaya Hair Studio",
  alternateName: "Lizaya Hair Studio - Salon, SPA & Barbershop",
  image: "https://sfile.chatglm.cn/images-ppt/12a31a152fe9.jpg",
  description:
    "Premier hair salon, barbershop, spa, and nail studio at Gateway Mall, Syokimau. 4.1★ rating, 166+ reviews.",
  "@id": "https://lizayahairstudio.co.ke",
  url: "https://lizayahairstudio.co.ke",
  telephone: "+254701890354",
  priceRange: "KSh 300 - KSh 12,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gateway Mall, Syokimau (EK Physiotherapy Building)",
    addressLocality: "Syokimau",
    addressRegion: "Machakos County",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.3495,
    longitude: 36.9290,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.1",
    reviewCount: "166",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://instagram.com/lizayahairstudio",
    "https://facebook.com/lizayahairstudio",
    "https://tiktok.com/@lizayahairstudio",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Salon, Spa & Barbershop Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Styling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Barbershop & Grooming" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spa & Massage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Manicure & Pedicure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facials" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Coloring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Braiding" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(jost.variable, cormorant.variable, cormorantSC.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SalonProvider>{children}</SalonProvider>
          <Toaster />
          <SonnerToaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
