import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SalonProvider } from "@/components/salon-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://winnieshairandbeauty.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Winnie's Hair & Beauty Studio | Luxury Salon in Katani, Kenya",
    template: "%s | Winnie's Hair & Beauty Studio",
  },
  description:
    "Winnie's Hair & Beauty Studio is a premium hair, nails, makeup and beauty spa in Katani, Kenya. Book your appointment for braiding, hair coloring, manicure, pedicure, facials and more. ★★★★★ 5.0 Google rating.",
  keywords: [
    "hair salon Kenya",
    "beauty salon Katani",
    "hair styling Syokimau",
    "braiding salon Nairobi",
    "nail studio Kenya",
    "makeup artist Katani",
    "beauty spa Kenya",
    "manicure pedicure",
    "facials Kenya",
    "Winnie's Hair & Beauty Studio",
    "hair coloring",
    "blow dry",
    "eyelashes",
    "eyebrows",
    "waxing",
  ],
  authors: [{ name: "Winnie's Hair & Beauty Studio" }],
  creator: "Winnie's Hair & Beauty Studio",
  publisher: "Winnie's Hair & Beauty Studio",
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
    title: "Winnie's Hair & Beauty Studio | Luxury Salon in Katani, Kenya",
    description:
      "Premium hair, nails, makeup and beauty spa in Katani, Kenya. ★★★★★ 5.0 Google rating. Book your appointment today.",
    url: siteUrl,
    siteName: "Winnie's Hair & Beauty Studio",
    images: [
      {
        url: "/images/salon-interior.svg",
        width: 1200,
        height: 630,
        alt: "Winnie's Hair & Beauty Studio — Luxury Salon in Katani, Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winnie's Hair & Beauty Studio | Luxury Salon in Katani, Kenya",
    description:
      "Premium hair, nails, makeup and beauty spa in Katani, Kenya. ★★★★★ 5.0 Google rating. Book your appointment today.",
    images: ["/images/salon-interior.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
    { media: "(prefers-color-scheme: light)", color: "#FFF5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Winnie's Hair & Beauty Studio",
  image: "/images/salon-interior.svg",
  description:
    "Premium hair, nails, makeup and beauty spa in Katani, Kenya. ★★★★★ 5.0 Google rating.",
  "@id": "https://winnieshairandbeauty.co.ke",
  url: "https://winnieshairandbeauty.co.ke",
  telephone: "+254790573509",
  priceRange: "KSh 500 - KSh 15,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Katani Lounge Building, Syokimau–Katani Road",
    addressLocality: "Katani",
    addressRegion: "Machakos County",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.3965,
    longitude: 36.9663,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://instagram.com/winnieshairandbeauty",
    "https://facebook.com/winnieshairandbeauty",
    "https://tiktok.com/@winnieshairandbeauty",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Salon Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Styling" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Braiding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hair Coloring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Manicure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pedicure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Makeup" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facials" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eyelashes" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, playfair.variable, cormorant.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className="font-sans antialiased bg-background text-foreground min-h-screen"
      >
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
