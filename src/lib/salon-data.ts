// Centralized salon data — easily editable by owner.
// In production this would be served from Supabase/Prisma; for now we keep it in
// a typed module so the admin dashboard can mutate via Zustand + localStorage.

const env = (typeof process !== "undefined" ? process.env : {}) as Record<string, string | undefined>;

export const SALON_INFO = {
  name: "Winnie's Hair & Beauty Studio",
  shortName: "Winnie's",
  tagline: "Where Beauty Meets Artistry",
  description:
    "A luxury hair, nails, and beauty sanctuary in the heart of Katani. We blend world-class technique with warm Kenyan hospitality to make every visit feel like a celebration of you.",
  phone: "+254 790 573509",
  phoneRaw: "+254790573509",
  whatsapp: env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254790573509",
  email: "hello@winnieshairandbeauty.co.ke",
  address: {
    line1: "Katani Lounge Building",
    line2: "Syokimau–Katani Road",
    city: "Katani",
    region: "Machakos County",
    country: "Kenya",
  },
  mapEmbed:
    env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED ||
    "https://www.google.com/maps?q=Katani+Lounge+Building+Syokimau+Katani+Road+Katani+Kenya&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Katani+Lounge+Building+Syokimau+Katani+Road+Katani+Kenya",
  rating: 5.0,
  reviewCount: 127,
  hours: [
    { day: "Monday", open: "08:00", close: "20:00", closed: false },
    { day: "Tuesday", open: "08:00", close: "20:00", closed: false },
    { day: "Wednesday", open: "08:00", close: "20:00", closed: false },
    { day: "Thursday", open: "08:00", close: "20:00", closed: false },
    { day: "Friday", open: "08:00", close: "20:00", closed: false },
    { day: "Saturday", open: "08:00", close: "19:00", closed: false },
    { day: "Sunday", open: "10:00", close: "17:00", closed: false },
  ],
  social: {
    instagram: env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/winnieshairandbeauty",
    tiktok: env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@winnieshairandbeauty",
    facebook: env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/winnieshairandbeauty",
  },
  founded: 2019,
  siteUrl: env.NEXT_PUBLIC_SITE_URL || "https://winnieshairandbeauty.co.ke",
};

export type ServiceCategory = "hair" | "nails" | "beauty";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  startingPrice: number; // KSh
  duration: string;
  image: string;
  popular?: boolean;
}

export const SERVICES: Service[] = [
  // ===== HAIR =====
  {
    id: "hair-styling",
    category: "hair",
    name: "Hair Styling",
    description:
      "From sleek blow-dries to red-carpet updos, our stylists craft looks that turn heads. We work with your face shape, hair texture, and personal style to deliver a finish that lasts.",
    startingPrice: 1500,
    duration: "60 min",
    image: "/images/hair-styling.svg",
    popular: true,
  },
  {
    id: "hair-treatment",
    category: "hair",
    name: "Hair Treatment",
    description:
      "Deep conditioning, keratin, and protein treatments designed to restore shine, strength, and elasticity. Ideal for chemically-treated or heat-damaged hair.",
    startingPrice: 2500,
    duration: "90 min",
    image: "/images/hair-treatment.svg",
  },
  {
    id: "braiding",
    category: "hair",
    name: "Braiding",
    description:
      "Box braids, knotless braids, cornrows, twists, and Fulani styles — done with premium fibre and a light hand for a finish that protects your edges and lasts weeks.",
    startingPrice: 3000,
    duration: "3–6 hrs",
    image: "/images/braiding.svg",
    popular: true,
  },
  {
    id: "natural-hair",
    category: "hair",
    name: "Natural Hair",
    description:
      "Twist-outs, braid-outs, Bantu knots, and wash-and-gos tailored to your curl pattern. We celebrate and nourish your natural crown.",
    startingPrice: 2000,
    duration: "75 min",
    image: "/images/natural-hair.svg",
  },
  {
    id: "hair-coloring",
    category: "hair",
    name: "Hair Coloring",
    description:
      "Global colour, balayage, ombré, highlights, and fashion tones using premium ammonia-free brands. Custom formulated for your skin tone and lifestyle.",
    startingPrice: 4500,
    duration: "2–4 hrs",
    image: "/images/hair-coloring.svg",
    popular: true,
  },
  {
    id: "hair-wash",
    category: "hair",
    name: "Hair Wash & Blow Dry",
    description:
      "A luxurious shampoo, scalp massage, and blow-dry finish. The perfect mid-week refresher or pre-event glow-up.",
    startingPrice: 800,
    duration: "45 min",
    image: "/images/hair-wash.svg",
  },
  // ===== NAILS =====
  {
    id: "manicure",
    category: "nails",
    name: "Manicure",
    description:
      "Classic, spa, or luxury manicure with cuticle care, exfoliation, mask, and polish. Your hands will look and feel renewed.",
    startingPrice: 1200,
    duration: "45 min",
    image: "/images/manicure.svg",
    popular: true,
  },
  {
    id: "pedicure",
    category: "nails",
    name: "Pedicure",
    description:
      "Spa pedicure with soak, scrub, callus removal, mask, and massage. Walk out on cloud-soft feet.",
    startingPrice: 1500,
    duration: "60 min",
    image: "/images/pedicure.svg",
  },
  {
    id: "gel-polish",
    category: "nails",
    name: "Gel Polish",
    description:
      "Long-lasting, high-shine gel polish that holds for up to three weeks. Choose from over 200 designer shades.",
    startingPrice: 1800,
    duration: "60 min",
    image: "/images/gel-polish.svg",
    popular: true,
  },
  {
    id: "acrylic",
    category: "nails",
    name: "Acrylic & Extensions",
    description:
      "Sculpted acrylics, press-ons, and bespoke nail art. From minimalist chic to elaborate designs — your nails, your story.",
    startingPrice: 2500,
    duration: "90 min",
    image: "/images/acrylic-nails.svg",
  },
  // ===== BEAUTY =====
  {
    id: "makeup",
    category: "beauty",
    name: "Makeup",
    description:
      "Bridal, evening, editorial, and everyday glam. We use HD and long-wear formulas for a flawless finish that photographs beautifully.",
    startingPrice: 3500,
    duration: "75 min",
    image: "/images/makeup.svg",
    popular: true,
  },
  {
    id: "eyebrows",
    category: "beauty",
    name: "Eyebrows",
    description:
      "Shaping, threading, tinting, and microblading. Perfectly framed arches tailored to your face.",
    startingPrice: 500,
    duration: "30 min",
    image: "/images/eyebrows.svg",
  },
  {
    id: "eyelashes",
    category: "beauty",
    name: "Eyelashes",
    description:
      "Classic, volume, hybrid, and mega-volume extensions. Wispy, dramatic, or natural — lash maps designed for your eye shape.",
    startingPrice: 2000,
    duration: "90 min",
    image: "/images/eyelashes.svg",
    popular: true,
  },
  {
    id: "facials",
    category: "beauty",
    name: "Facials",
    description:
      "Deep-cleansing, hydrating, anti-ageing, and brightening facials using premium skincare. Skin that glows from within.",
    startingPrice: 2500,
    duration: "75 min",
    image: "/images/facial.svg",
    popular: true,
  },
  {
    id: "waxing",
    category: "beauty",
    name: "Waxing",
    description:
      "Soft and hard wax for face, underarms, legs, bikini, and full body. Quick, hygienic, and as gentle as possible.",
    startingPrice: 600,
    duration: "20–60 min",
    image: "/images/brightening.svg",
  },
  {
    id: "massage",
    category: "beauty",
    name: "Massage Therapy",
    description:
      "Swedish, deep-tissue, and aromatherapy massage. Melt away tension and leave feeling reborn. Optional add-on to any package.",
    startingPrice: 3000,
    duration: "60 min",
    image: "/images/massage.svg",
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: "hair" | "nails" | "makeup" | "facials";
  image: string;
  description: string;
  featured?: boolean;
}

export const PORTFOLIO: PortfolioItem[] = [
  { id: "p1", title: "Sleek Bob", category: "hair", image: "/images/hair-styling.svg", description: "Precision cut with a glossy finish", featured: true },
  { id: "p2", title: "Knotless Braids", category: "hair", image: "/images/braiding.svg", description: "Waist-length knotless braids with curls", featured: true },
  { id: "p3", title: "Balayage Glow", category: "hair", image: "/images/hair-coloring.svg", description: "Sun-kissed balayage on natural hair", featured: true },
  { id: "p4", title: "Soft Curls", category: "hair", image: "/images/hair-treatment.svg", description: "Voluminous curl definition" },
  { id: "p5", title: "Natural Crown", category: "hair", image: "/images/natural-hair.svg", description: "Defined twist-out on natural hair" },
  { id: "p6", title: "Salon Blowout", category: "hair", image: "/images/hair-wash.svg", description: "Bouncy salon blowout" },
  { id: "p7", title: "Rose Quartz Nails", category: "nails", image: "/images/manicure.svg", description: "Pink rose quartz inspired manicure", featured: true },
  { id: "p8", title: "Spa Pedicure", category: "nails", image: "/images/pedicure.svg", description: "Pristine spa pedicure finish" },
  { id: "p9", title: "Glossy Gel", category: "nails", image: "/images/gel-polish.svg", description: "High-shine nude gel polish" },
  { id: "p10", title: "Acrylic Art", category: "nails", image: "/images/acrylic-nails.svg", description: "Custom acrylic with chrome details", featured: true },
  { id: "p11", title: "Nude Set", category: "nails", image: "/images/nude-nails.svg", description: "Elegant nude almond nails" },
  { id: "p12", title: "Bridal Glam", category: "makeup", image: "/images/makeup.svg", description: "Soft bridal makeup with dewy finish", featured: true },
  { id: "p13", title: "Evening Smokey", category: "makeup", image: "/images/eyebrows.svg", description: "Sultry smokey eye for evening events" },
  { id: "p14", title: "Lash Extensions", category: "makeup", image: "/images/eyelashes.svg", description: "Volume lash set, natural mapping" },
  { id: "p15", title: "Bold Liner", category: "makeup", image: "/images/makeup.svg", description: "Graphic liner editorial look" },
  { id: "p16", title: "Glow Makeup", category: "makeup", image: "/images/makeup.svg", description: "Bronzed glow with bold lips" },
  { id: "p17", title: "Hydrating Facial", category: "facials", image: "/images/facial.svg", description: "Deep hydration facial results", featured: true },
  { id: "p18", title: "Spa Glow", category: "facials", image: "/images/spa-glow.svg", description: "Post-treatment radiant skin" },
  { id: "p19", title: "Brightening", category: "facials", image: "/images/brightening.svg", description: "Vitamin C brightening facial" },
  { id: "p20", title: "Relaxing Massage", category: "facials", image: "/images/massage.svg", description: "Aromatherapy back massage" },
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Amara Wanjiku",
    location: "Syokimau",
    rating: 5,
    text:
      "I have been a client at Winnie's for over two years and I will not trust my hair to anyone else. The team is professional, the space is gorgeous, and every visit feels like a treat. My knotless braids lasted eight weeks and still looked fresh.",
    service: "Knotless Braids",
    date: "2 weeks ago",
    avatar: "/images/testimonial-1.svg",
  },
  {
    id: "t2",
    name: "Faith Achieng",
    location: "Katani",
    rating: 5,
    text:
      "Best salon experience I have had in Kenya. Winnie did my bridal makeup and I felt like a queen on my wedding day. The attention to detail is unmatched. Highly recommend for any bride-to-be.",
    service: "Bridal Makeup",
    date: "1 month ago",
    avatar: "/images/testimonial-2.svg",
  },
  {
    id: "t3",
    name: "Janet Mwangi",
    location: "Athi River",
    rating: 5,
    text:
      "The hair treatment brought my damaged hair back to life. The staff take time to understand your hair needs and recommend the right products. I left with soft, shiny, healthy hair. Thank you Winnie's team!",
    service: "Hair Treatment",
    date: "3 weeks ago",
    avatar: "/images/testimonial-3.svg",
  },
  {
    id: "t4",
    name: "Cynthia Otieno",
    location: "Kitengela",
    rating: 5,
    text:
      "Their gel polish lasts three weeks without chipping. The salon is clean, modern, and very welcoming. I drive all the way from Kitengela because no other salon compares. Worth every shilling.",
    service: "Gel Polish",
    date: "1 week ago",
    avatar: "/images/testimonial-4.svg",
  },
  {
    id: "t5",
    name: "Lilian Kamau",
    location: "Mlolongo",
    rating: 5,
    text:
      "I came in for a facial and left glowing. The aesthetician was knowledgeable and walked me through every step. My skin has never looked better. I have already booked my next session.",
    service: "Hydrating Facial",
    date: "5 days ago",
    avatar: "/images/testimonial-5.svg",
  },
  {
    id: "t6",
    name: "Sarah Njoki",
    location: "Katani",
    rating: 5,
    text:
      "Winnie's is my happy place. From the moment you walk in you are treated like royalty. The lash extensions look so natural people keep asking if they are real. Five stars all the way.",
    service: "Eyelash Extensions",
    date: "2 months ago",
    avatar: "/images/testimonial-6.svg",
  },
  {
    id: "t7",
    name: "Mary Atieno",
    location: "Syokimau",
    rating: 5,
    text:
      "Took my daughter here for her birthday treat — manicure, pedicure, and a blow dry. The team made her feel so special. The customer service is exceptional. We will definitely be back.",
    service: "Manicure & Pedicure",
    date: "1 month ago",
    avatar: "/images/testimonial-7.svg",
  },
  {
    id: "t8",
    name: "Beatrice Wambui",
    location: "Katani",
    rating: 5,
    text:
      "Best balayage in town! Winnie understood exactly what I wanted and the result exceeded my expectations. The color is beautiful and my hair still feels healthy. I am a customer for life.",
    service: "Hair Coloring",
    date: "3 weeks ago",
    avatar: "/images/testimonial-8.svg",
  },
];

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
}

export const STYLISTS: Stylist[] = [
  {
    id: "winnie",
    name: "Winnie Achieng",
    role: "Founder & Lead Stylist",
    bio: "With over 12 years of experience and training in Nairobi, Dubai, and London, Winnie founded the studio with a vision to bring world-class beauty services to Katani. She specializes in hair coloring, treatments, and bridal styling.",
    image: "/images/team-winnie.svg",
    specialties: ["Hair Coloring", "Bridal Styling", "Treatments"],
    experience: "12+ years",
  },
  {
    id: "grace",
    name: "Grace Wanjiru",
    role: "Senior Hair Stylist",
    bio: "Grace is our braiding queen. From knotless braids to intricate Fulani styles, she combines speed with precision for a finish that protects your edges and lasts weeks.",
    image: "/images/team-grace.svg",
    specialties: ["Braiding", "Natural Hair", "Twists"],
    experience: "8 years",
  },
  {
    id: "lucy",
    name: "Lucy Njeri",
    role: "Nail & Beauty Artist",
    bio: "Lucy brings artistry to every nail set and facial. Certified in advanced gel, acrylic, and skincare techniques, she ensures every detail is picture-perfect.",
    image: "/images/team-lucy.svg",
    specialties: ["Nail Art", "Facials", "Manicure"],
    experience: "6 years",
  },
  {
    id: "amina",
    name: "Amina Hassan",
    role: "Makeup Artist",
    bio: "Amina's work has graced editorial shoots and over 200 brides. She specialises in HD, airbrush, and long-wear techniques that photograph flawlessly and last all day.",
    image: "/images/team-amina.svg",
    specialties: ["Bridal Makeup", "Editorial", "Airbrush"],
    experience: "7 years",
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "pricing" | "appointments" | "hair-care" | "policy";
}

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    category: "appointments",
    question: "How do I book an appointment?",
    answer:
      "You can book online through our website's booking page, call us directly on +254 790 573509, or send us a WhatsApp message. We recommend booking at least 3 days in advance for weekend appointments and 2 weeks in advance for bridal services.",
  },
  {
    id: "f2",
    category: "appointments",
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Friday from 8:00 AM to 8:00 PM, Saturday from 8:00 AM to 7:00 PM, and Sunday from 10:00 AM to 5:00 PM. We are closed on public holidays unless pre-arranged for bridal parties.",
  },
  {
    id: "f3",
    category: "appointments",
    question: "Do you accept walk-ins?",
    answer:
      "We welcome walk-ins whenever we have availability, but we strongly recommend booking in advance to secure your preferred stylist and time slot. Walk-in clients may experience wait times during peak hours.",
  },
  {
    id: "f4",
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, cash, Visa and Mastercard. For bridal packages, a 50% deposit is required to secure the date, with the balance due on the day of service.",
  },
  {
    id: "f5",
    category: "pricing",
    question: "Do you offer package deals?",
    answer:
      "Yes! We offer bridal packages, monthly beauty memberships, and combination deals (e.g. hair + nails + facial). Check our pricing page or speak to our team for custom packages tailored to your needs.",
  },
  {
    id: "f6",
    category: "pricing",
    question: "Are prices inclusive of products?",
    answer:
      "All standard service prices include the products used during the service. Premium add-on treatments, hair extensions, and specialty products are quoted separately and agreed with you before application.",
  },
  {
    id: "f7",
    category: "hair-care",
    question: "How do I maintain my braids?",
    answer:
      "Wrap your hair with a silk or satin scarf at night, moisturise your scalp every 2–3 days with a light oil, and avoid heavy water exposure. We provide a free maintenance guide after every braiding service.",
  },
  {
    id: "f8",
    category: "hair-care",
    question: "How often should I get a hair treatment?",
    answer:
      "For chemically-treated or heat-damaged hair, we recommend a treatment every 2–3 weeks until hair health is restored, then monthly for maintenance. Natural hair benefits from a deep conditioning treatment every 4–6 weeks.",
  },
  {
    id: "f9",
    category: "hair-care",
    question: "Can I bring my own hair products?",
    answer:
      "Absolutely. If you have specific products you prefer, please bring them along and our stylists will be happy to use them. We will advise on compatibility with the service you are booking.",
  },
  {
    id: "f10",
    category: "policy",
    question: "What is your cancellation policy?",
    answer:
      "We understand plans change. Cancellations or reschedules made 24 hours before your appointment are free. Within 24 hours, a 50% fee applies. No-shows are charged the full service amount. Bridal deposits are non-refundable within 14 days of the event.",
  },
  {
    id: "f11",
    category: "policy",
    question: "Do you offer home or hotel services?",
    answer:
      "We offer on-location bridal and event services within the greater Nairobi area for an additional call-out fee. Please contact us at least 2 weeks in advance to arrange on-location services.",
  },
  {
    id: "f12",
    category: "policy",
    question: "Is the salon child-friendly?",
    answer:
      "Yes! We love seeing young clients. We offer children's braiding, haircuts, and basic nail services at special rates. Children under 12 must be accompanied by an adult throughout the service.",
  },
];

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "hair" | "nails" | "makeup" | "facials" | "salon";
}

export const GALLERY: GalleryImage[] = [
  { id: "g1", url: "/images/salon-interior.svg", caption: "Our flagship salon interior", category: "salon" },
  { id: "g2", url: "/images/salon-stations.svg", caption: "Styling stations", category: "salon" },
  { id: "g3", url: "/images/hair-styling.svg", caption: "Sleek bob styling", category: "hair" },
  { id: "g4", url: "/images/braiding.svg", caption: "Knotless braids", category: "hair" },
  { id: "g5", url: "/images/hair-coloring.svg", caption: "Balayage transformation", category: "hair" },
  { id: "g6", url: "/images/hair-treatment.svg", caption: "Defined curls", category: "hair" },
  { id: "g7", url: "/images/manicure.svg", caption: "Rose quartz nails", category: "nails" },
  { id: "g8", url: "/images/gel-polish.svg", caption: "Glossy gel manicure", category: "nails" },
  { id: "g9", url: "/images/acrylic-nails.svg", caption: "Acrylic with chrome", category: "nails" },
  { id: "g10", url: "/images/pedicure.svg", caption: "Spa pedicure", category: "nails" },
  { id: "g11", url: "/images/makeup.svg", caption: "Bridal makeup", category: "makeup" },
  { id: "g12", url: "/images/eyelashes.svg", caption: "Volume lashes", category: "makeup" },
  { id: "g13", url: "/images/makeup.svg", caption: "Editorial makeup", category: "makeup" },
  { id: "g14", url: "/images/facial.svg", caption: "Hydrating facial", category: "facials" },
  { id: "g15", url: "/images/spa-glow.svg", caption: "Glow facial results", category: "facials" },
  { id: "g16", url: "/images/brightening.svg", caption: "Brightening treatment", category: "facials" },
  { id: "g17", url: "/images/salon-reception.svg", caption: "Reception lounge", category: "salon" },
  { id: "g18", url: "/images/salon-products.svg", caption: "Premium products", category: "salon" },
];

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  popular?: boolean;
}

export const PACKAGES: PricingPackage[] = [
  {
    id: "bridal",
    name: "Bridal Royal",
    description: "The complete bridal experience for your special day",
    price: 35000,
    duration: "Full day",
    includes: [
      "Bridal makeup with airbrush",
      "Hair styling & treatment",
      "Manicure & pedicure",
      "Facial treatment",
      "Eyebrow shaping & lash extensions",
      "Trial session 2 weeks prior",
      "Touch-up kit for the day",
    ],
    popular: true,
  },
  {
    id: "glam",
    name: "Glam Up Package",
    description: "Perfect for events, photoshoots, and date nights",
    price: 8500,
    duration: "3 hours",
    includes: [
      "Makeup application",
      "Hair styling (blow dry or updo)",
      "Manicure with gel polish",
      "Eyebrow shaping",
    ],
  },
  {
    id: "spa-day",
    name: "Spa Retreat Day",
    description: "A full day of pampering and renewal",
    price: 12000,
    duration: "4–5 hours",
    includes: [
      "Full body massage (60 min)",
      "Hydrating facial",
      "Spa manicure & pedicure",
      "Hair treatment & blow dry",
      "Complimentary refreshments",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Beauty Membership",
    description: "Stay polished all month long",
    price: 9000,
    duration: "Monthly",
    includes: [
      "2 hair wash & blow dry",
      "1 gel polish refill",
      "1 facial treatment",
      "1 eyebrow shaping",
      "15% off all additional services",
      "Priority booking",
    ],
  },
];

export const OFFERS = [
  {
    id: "o1",
    title: "New Client Special",
    description: "Enjoy 15% off your first service at Winnie's. New clients only.",
    code: "WELCOME15",
    expires: "Ongoing",
  },
  {
    id: "o2",
    title: "Midweek Treat",
    description: "Book any service Monday to Wednesday and get a free hair treatment add-on.",
    code: "MIDWEEK",
    expires: "Until end of year",
  },
  {
    id: "o3",
    title: "Bring a Friend",
    description: "Book with a friend and you both receive 10% off your services.",
    code: "FRIEND10",
    expires: "Ongoing",
  },
];

export const NAV_LINKS: { label: string; view: string }[] = [
  { label: "Home", view: "home" },
  { label: "About", view: "about" },
  { label: "Services", view: "services" },
  { label: "Gallery", view: "gallery" },
  { label: "Pricing", view: "pricing" },
  { label: "Book", view: "book" },
  { label: "Contact", view: "contact" },
];

export const ALL_VIEWS = [
  "home", "about", "services", "gallery", "pricing", "book", "contact",
  "privacy", "terms", "faq", "admin", "not-found",
] as const;
export type ViewName = (typeof ALL_VIEWS)[number];
