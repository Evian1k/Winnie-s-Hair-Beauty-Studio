// Lizaya Hair Studio — centralized salon data.
// Easily editable by owner. In production this would be served from Supabase/Prisma.

const env = (typeof process !== "undefined" ? process.env : {}) as Record<string, string | undefined>;

export const SALON_INFO = {
  name: "Lizaya Hair Studio",
  shortName: "Lizaya",
  tagline: "Salon · SPA · Barbershop",
  description:
    "At Lizaya Hair Studio, we bring together hair artistry, barbering precision, spa tranquillity, and nail perfection under one roof — at Gateway Mall, Syokimau. Our multi-talented team treats every client like family.",
  phone: "0701 890354",
  phoneRaw: "+254701890354",
  whatsapp: "254701890354",
  email: "hello@lizayahairstudio.co.ke",
  address: {
    line1: "Gateway Mall, Syokimau",
    line2: "EK Physiotherapy Building, near JKIA",
    city: "Syokimau",
    region: "Machakos County",
    country: "Kenya",
    plusCode: "JWP6+6X Nairobi",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Gateway+Mall+Syokimau+Lizaya+Hair+Studio&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Gateway+Mall+Syokimau+Lizaya+Hair+Studio",
  rating: 4.1,
  reviewCount: 166,
  hours: [
    { day: "Monday", open: "08:00", close: "21:30", closed: false },
    { day: "Tuesday", open: "08:00", close: "21:30", closed: false },
    { day: "Wednesday", open: "08:00", close: "21:30", closed: false },
    { day: "Thursday", open: "08:00", close: "21:30", closed: false },
    { day: "Friday", open: "08:00", close: "21:30", closed: false },
    { day: "Saturday", open: "08:00", close: "21:30", closed: false },
    { day: "Sunday", open: "10:00", close: "20:00", closed: false },
  ],
  social: {
    instagram: env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/lizayahairstudio",
    tiktok: env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@lizayahairstudio",
    facebook: env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/lizayahairstudio",
  },
  siteUrl: env.NEXT_PUBLIC_SITE_URL || "https://lizayahairstudio.co.ke",
  founded: 2014,
  location: "Gateway Mall, Syokimau",
};

export type ServiceCategory = "hair" | "barber" | "spa" | "nails";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  startingPrice: number;
  duration: string;
  image: string;
  popular?: boolean;
}

export const SERVICES: Service[] = [
  // ===== HAIR (Women) =====
  {
    id: "hair-styling",
    category: "hair",
    name: "Hair Styling",
    description:
      "From sleek blow-dries to elegant updos, our stylists craft looks that complement your features and lifestyle. We work with all hair textures and lengths.",
    startingPrice: 1200,
    duration: "60 min",
    image: "https://sfile.chatglm.cn/images-ppt/e6bdb0ac0855.jpg",
    popular: true,
  },
  {
    id: "hair-coloring",
    category: "hair",
    name: "Hair Coloring",
    description:
      "Global colour, balayage, ombré, and highlights using premium ammonia-free brands. Custom-mixed for your skin tone and desired finish.",
    startingPrice: 3500,
    duration: "2–4 hrs",
    image: "https://sfile.chatglm.cn/images-ppt/a2d7fff25cc0.jpg",
    popular: true,
  },
  {
    id: "braiding",
    category: "hair",
    name: "Braiding",
    description:
      "Box braids, knotless braids, cornrows, twists, and Fulani styles. Done with premium fibre and a gentle hand for a protective, long-lasting finish.",
    startingPrice: 2500,
    duration: "3–6 hrs",
    image: "https://sfile.chatglm.cn/images-ppt/ecbe61b16c10.jpg",
  },
  {
    id: "hair-treatment",
    category: "hair",
    name: "Hair Treatment",
    description:
      "Deep conditioning, keratin, and protein treatments to restore shine, strength, and elasticity. Ideal for chemically-treated or heat-damaged hair.",
    startingPrice: 2000,
    duration: "90 min",
    image: "https://sfile.chatglm.cn/images-ppt/d256dbbeaff3.jpg",
  },
  {
    id: "natural-hair",
    category: "hair",
    name: "Natural Hair Care",
    description:
      "Twist-outs, braid-outs, Bantu knots, and wash-and-gos tailored to your curl pattern. We celebrate and nourish your natural crown.",
    startingPrice: 1500,
    duration: "75 min",
    image: "https://sfile.chatglm.cn/images-ppt/b7e66e3271bf.jpg",
  },
  {
    id: "hair-wash",
    category: "hair",
    name: "Wash & Blow Dry",
    description:
      "A luxurious shampoo, scalp massage, and blow-dry finish. The perfect mid-week refresher or pre-event glow-up.",
    startingPrice: 700,
    duration: "45 min",
    image: "https://sfile.chatglm.cn/images-ppt/338651ac1995.jpg",
  },

  // ===== BARBERSHOP (Men) =====
  {
    id: "mens-cut",
    category: "barber",
    name: "Men's Haircut",
    description:
      "Precision cuts, skin fades, tapers, and classic styles tailored to your face shape. Finished with a clean lineup and styling.",
    startingPrice: 500,
    duration: "45 min",
    image: "https://sfile.chatglm.cn/images-ppt/a11effd4f0e9.jpg",
    popular: true,
  },
  {
    id: "beard-grooming",
    category: "barber",
    name: "Beard Trim & Shape",
    description:
      "Beard sculpting, trimming, and conditioning. We shape your beard to complement your face and finish with beard oil for a polished look.",
    startingPrice: 300,
    duration: "30 min",
    image: "https://sfile.chatglm.cn/images-ppt/623063f5fad4.jpg",
    popular: true,
  },
  {
    id: "hot-towel-shave",
    category: "barber",
    name: "Hot Towel Shave",
    description:
      "A traditional straight-razor shave with hot towels, pre-shave oil, and after-shave balm. The ultimate grooming ritual.",
    startingPrice: 600,
    duration: "45 min",
    image: "https://sfile.chatglm.cn/images-ppt/07ffed731941.jpg",
  },
  {
    id: "fade",
    category: "barber",
    name: "Skin Fade",
    description:
      "Bald, low, mid, or high fades — blended seamlessly into your chosen length on top. Our barbers deliver crisp, clean lines every time.",
    startingPrice: 600,
    duration: "50 min",
    image: "https://sfile.chatglm.cn/images-ppt/d2ae10fe40f4.jpg",
    popular: true,
  },
  {
    id: "kids-cut",
    category: "barber",
    name: "Kids' Haircut",
    description:
      "Patient, friendly cuts for children under 12. We make the chair fun and send them home looking sharp.",
    startingPrice: 350,
    duration: "30 min",
    image: "https://sfile.chatglm.cn/images-ppt/8d1496d23b97.jpeg",
  },
  {
    id: "barber-package",
    category: "barber",
    name: "Gentleman's Package",
    description:
      "Haircut, beard trim, hot towel shave, and facial cleansing — the complete grooming experience in one sit.",
    startingPrice: 1500,
    duration: "90 min",
    image: "https://sfile.chatglm.cn/images-ppt/0a96904c1d1d.jpg",
  },

  // ===== SPA =====
  {
    id: "massage",
    category: "spa",
    name: "Massage Therapy",
    description:
      "Swedish, deep tissue, and aromatherapy massage to melt away tension. Choose 30, 60, or 90 minutes of pure relaxation.",
    startingPrice: 2500,
    duration: "60 min",
    image: "https://sfile.chatglm.cn/images-ppt/9d1807b23c78.jpg",
    popular: true,
  },
  {
    id: "facial",
    category: "spa",
    name: "Facial Treatment",
    description:
      "Deep-cleansing, hydrating, brightening, and anti-ageing facials using premium skincare. Skin that glows from within.",
    startingPrice: 2000,
    duration: "75 min",
    image: "https://sfile.chatglm.cn/images-ppt/07556261e148.jpg",
    popular: true,
  },
  {
    id: "body-scrub",
    category: "spa",
    name: "Body Scrub & Polish",
    description:
      "Full-body exfoliation with sea salt, sugar, or coffee scrub to remove dead skin and reveal soft, glowing skin underneath.",
    startingPrice: 3000,
    duration: "75 min",
    image: "https://sfile.chatglm.cn/images-ppt/8d3e16344557.jpg",
  },
  {
    id: "spa-package",
    category: "spa",
    name: "Spa Retreat Package",
    description:
      "60-min massage + facial + body scrub + complimentary tea. The ultimate escape from the city — over 3 hours of pure indulgence.",
    startingPrice: 8000,
    duration: "3+ hrs",
    image: "https://sfile.chatglm.cn/images-ppt/aba8ca916eba.jpg",
  },

  // ===== NAILS =====
  {
    id: "manicure",
    category: "nails",
    name: "Manicure",
    description:
      "Classic, spa, or luxury manicure with cuticle care, exfoliation, mask, and polish. Your hands will look and feel renewed.",
    startingPrice: 1000,
    duration: "45 min",
    image: "https://sfile.chatglm.cn/images-ppt/da5149414cf2.jpg",
    popular: true,
  },
  {
    id: "pedicure",
    category: "nails",
    name: "Pedicure",
    description:
      "Spa pedicure with soak, scrub, callus removal, mask, and massage. Walk out on cloud-soft feet.",
    startingPrice: 1200,
    duration: "60 min",
    image: "https://sfile.chatglm.cn/images-ppt/7ee1857bd0a1.jpg",
  },
  {
    id: "gel-polish",
    category: "nails",
    name: "Gel Polish",
    description:
      "Long-lasting, high-shine gel polish that holds for up to three weeks. Over 200 designer shades to choose from.",
    startingPrice: 1500,
    duration: "60 min",
    image: "https://sfile.chatglm.cn/images-ppt/bd8f2a7a3c4b.jpg",
    popular: true,
  },
  {
    id: "acrylic",
    category: "nails",
    name: "Acrylic & Nail Art",
    description:
      "Sculpted acrylics, extensions, and bespoke nail art. From minimalist chic to elaborate designs — your nails, your story.",
    startingPrice: 2000,
    duration: "90 min",
    image: "https://sfile.chatglm.cn/images-ppt/822456b454ff.png",
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: "hair" | "barber" | "spa" | "nails";
  image: string;
  description: string;
  featured?: boolean;
}

export const PORTFOLIO: PortfolioItem[] = [
  { id: "p1", title: "Precision Fade", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/a11effd4f0e9.jpg", description: "Clean skin fade with textured top", featured: true },
  { id: "p2", title: "Beard Sculpt", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/623063f5fad4.jpg", description: "Perfectly shaped beard with oil finish", featured: true },
  { id: "p3", title: "Hot Towel Shave", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/07ffed731941.jpg", description: "Traditional straight-razor shave" },
  { id: "p4", title: "Kids' Cut", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/8d1496d23b97.jpeg", description: "Sharp style for the little gentleman" },
  { id: "p5", title: "Skin Fade", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/d2ae10fe40f4.jpg", description: "Seamless bald fade blend" },
  { id: "p6", title: "Gentleman's Package", category: "barber", image: "https://sfile.chatglm.cn/images-ppt/0a96904c1d1d.jpg", description: "Full grooming experience" },
  { id: "p7", title: "Sleek Blowout", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/e6bdb0ac0855.jpg", description: "Voluminous salon blow-dry", featured: true },
  { id: "p8", title: "Balayage Glow", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/a2d7fff25cc0.jpg", description: "Sun-kissed balayage transformation" },
  { id: "p9", title: "Box Braids", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/ecbe61b16c10.jpg", description: "Classic waist-length braids" },
  { id: "p10", title: "Knotless Braids", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/d256dbbeaff3.jpg", description: "Tension-free protective style" },
  { id: "p11", title: "Natural Crown", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/b7e66e3271bf.jpg", description: "Defined natural curls" },
  { id: "p12", title: "Salon Wash", category: "hair", image: "https://sfile.chatglm.cn/images-ppt/338651ac1995.jpg", description: "Luxurious wash and blow-dry" },
  { id: "p13", title: "Deep Tissue Massage", category: "spa", image: "https://sfile.chatglm.cn/images-ppt/9d1807b23c78.jpg", description: "Targeted tension relief", featured: true },
  { id: "p14", title: "Hydrating Facial", category: "spa", image: "https://sfile.chatglm.cn/images-ppt/07556261e148.jpg", description: "Deep hydration facial results" },
  { id: "p15", title: "Body Scrub", category: "spa", image: "https://sfile.chatglm.cn/images-ppt/8d3e16344557.jpg", description: "Full-body exfoliation polish" },
  { id: "p16", title: "Spa Retreat", category: "spa", image: "https://sfile.chatglm.cn/images-ppt/aba8ca916eba.jpg", description: "Multi-treatment spa package" },
  { id: "p17", title: "Gold Manicure", category: "nails", image: "https://sfile.chatglm.cn/images-ppt/da5149414cf2.jpg", description: "Gold-accented manicure", featured: true },
  { id: "p18", title: "Spa Pedicure", category: "nails", image: "https://sfile.chatglm.cn/images-ppt/7ee1857bd0a1.jpg", description: "Pristine spa pedicure" },
  { id: "p19", title: "Glossy Gel", category: "nails", image: "https://sfile.chatglm.cn/images-ppt/bd8f2a7a3c4b.jpg", description: "High-shine nude gel polish" },
  { id: "p20", title: "Nail Art", category: "nails", image: "https://sfile.chatglm.cn/images-ppt/822456b454ff.png", description: "Bespoke acrylic nail art" },
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
    name: "Sharon Kotut",
    location: "Syokimau",
    rating: 5,
    text:
      "Been going here the last 7 years. Rispa and Freddie do a fantastic job. I love the manis, pedis and massages especially. The team is like family to me now — I wouldn't trust anyone else with my beauty needs.",
    service: "Manicure, Pedicure & Massage",
    date: "4 years ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/c21804e470f6.jpg",
  },
  {
    id: "t2",
    name: "Letting Eliphas",
    location: "Local Guide · 220 reviews",
    rating: 5,
    text:
      "Very hospitable and responsive staff. The customer service is top notch. I always leave feeling refreshed and well taken care of. Highly recommend Lizaya for anyone in the Syokimau area.",
    service: "Haircut & Grooming",
    date: "6 years ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/451f6aa330bd.jpg",
  },
  {
    id: "t3",
    name: "Brian Mwangi",
    location: "Syokimau",
    rating: 5,
    text:
      "Best barbershop in Syokimau, hands down. Freddie gives the cleanest fades I've had in years. The hot towel shave is the highlight of my week. Professional, clean, and great value for money.",
    service: "Skin Fade & Hot Towel Shave",
    date: "2 months ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/497b3a6ebc52.jpg",
  },
  {
    id: "t4",
    name: "Faith Wanjiru",
    location: "Gateway Mall",
    rating: 4,
    text:
      "Conveniently located in the mall — I get my hair done while running errands. The staff are friendly and the place is always clean. My braids lasted over six weeks. Will definitely be back.",
    service: "Braiding",
    date: "1 month ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/70ea40768411.jpg",
  },
  {
    id: "t5",
    name: "James Otieno",
    location: "JKIA area",
    rating: 5,
    text:
      "Came in for a quick trim before a flight and left with the best cut I've had in years. The barber took his time, listened to what I wanted, and delivered. Genuinely impressive service near the airport.",
    service: "Men's Haircut",
    date: "3 weeks ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/036bbfda6798.jpg",
  },
  {
    id: "t6",
    name: "Mary Achieng",
    location: "Syokimau",
    rating: 4,
    text:
      "The spa package was exactly what I needed after a long week. The massage was excellent and the facial left my skin glowing. The ambience is calm and relaxing. Good value for money.",
    service: "Spa Retreat Package",
    date: "2 weeks ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/9d42851274ef.jpg",
  },
  {
    id: "t7",
    name: "David Kamau",
    location: "Mavoko",
    rating: 5,
    text:
      "Brought my son for his first proper haircut and the barber was so patient with him. Made the whole experience fun. My son now asks to go back. That's a win in my book. Highly recommend for kids' cuts.",
    service: "Kids' Haircut",
    date: "1 month ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/413cfda84f71.jpg",
  },
  {
    id: "t8",
    name: "Grace Njeri",
    location: "Syokimau",
    rating: 4,
    text:
      "I've been a loyal client for over two years. The team is friendly, the salon is hygienic, and the results speak for themselves. My gel polish lasts three weeks without chipping. Great place.",
    service: "Gel Polish",
    date: "3 weeks ago",
    avatar: "https://sfile.chatglm.cn/images-ppt/130b580debd8.jpg",
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
    id: "rispa",
    name: "Rispa",
    role: "Senior Hair Stylist & Nail Artist",
    bio: "Rispa has been with Lizaya since the beginning and is loved by long-term clients for her manis, pedis, and massages. With over 10 years of experience, she brings warmth and precision to every appointment.",
    image: "https://sfile.chatglm.cn/images-ppt/c21804e470f6.jpg",
    specialties: ["Manicure", "Pedicure", "Massage", "Nail Art"],
    experience: "10+ years",
  },
  {
    id: "freddie",
    name: "Freddie",
    role: "Master Barber",
    bio: "Freddie is our go-to barber for fades, beard sculpting, and hot towel shaves. His attention to detail and steady hand have earned him a loyal following among our male clients.",
    image: "https://sfile.chatglm.cn/images-ppt/451f6aa330bd.jpg",
    specialties: ["Skin Fades", "Beard Grooming", "Hot Towel Shave"],
    experience: "8 years",
  },
  {
    id: "amina",
    name: "Amina",
    role: "Spa Therapist & Facialist",
    bio: "Amina specialises in massage therapy, facials, and body treatments. Certified in Swedish, deep tissue, and aromatherapy techniques, she creates a deeply relaxing experience for every client.",
    image: "https://sfile.chatglm.cn/images-ppt/720409d7c7ab.jpg",
    specialties: ["Massage", "Facials", "Body Scrub"],
    experience: "6 years",
  },
  {
    id: "grace",
    name: "Grace",
    role: "Hair Colorist & Braiding Specialist",
    bio: "Grace brings creativity and technical skill to every colour and braiding service. From subtle balayage to bold fashion tones, she'll help you achieve the look you've been dreaming of.",
    image: "https://sfile.chatglm.cn/images-ppt/3a3344795fdd.jpg",
    specialties: ["Hair Coloring", "Braiding", "Treatments"],
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
    question: "Do I need an appointment or can I walk in?",
    answer:
      "We welcome both walk-ins and booked appointments. However, to avoid wait times — especially on weekends and evenings — we strongly recommend booking in advance. You can book online via our website, call us on 0701 890354, or send a WhatsApp message.",
  },
  {
    id: "f2",
    category: "appointments",
    question: "What are your opening hours?",
    answer:
      "We're open Monday to Saturday from 8:00 AM to 9:30 PM, and Sunday from 10:00 AM to 8:00 PM. We're open late to accommodate busy schedules — perfect for after-work appointments.",
  },
  {
    id: "f3",
    category: "appointments",
    question: "Where exactly are you located?",
    answer:
      "We're inside Gateway Mall, Syokimau, in the EK Physiotherapy building — near JKIA. Our plus code is JWP6+6X Nairobi. If you're coming from the airport, we're about 10-15 minutes away. There's ample parking at the mall.",
  },
  {
    id: "f4",
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, cash, and all major cards (Visa and Mastercard). For spa packages and bridal services, a 50% deposit is required to secure your slot, with the balance due on the day of service.",
  },
  {
    id: "f5",
    category: "pricing",
    question: "Do you offer packages or combos?",
    answer:
      "Yes! We offer several packages: the Gentleman's Package (haircut + beard + shave + facial), the Spa Retreat Package (massage + facial + body scrub), and custom combos. Check our pricing page or ask our team for details.",
  },
  {
    id: "f6",
    category: "pricing",
    question: "Are your prices the same for men and women?",
    answer:
      "Our barbershop services (men's cuts, fades, beard grooming) are priced separately from our hair salon services (styling, coloring, braiding). Spa and nail services are unisex and priced the same for everyone. See our pricing page for full details.",
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
    question: "How often should I get a haircut?",
    answer:
      "For men's cuts, every 2–4 weeks maintains a sharp look. For women's hair, every 6–8 weeks for healthy ends. If you have a fade or skin fade, every 1–2 weeks keeps it looking fresh.",
  },
  {
    id: "f9",
    category: "hair-care",
    question: "Do you offer services for children?",
    answer:
      "Yes! We offer kids' haircuts for children under 12 at a special rate. Our barbers are patient and experienced with children. For spa and nail services, we recommend children be 10+ and accompanied by an adult.",
  },
  {
    id: "f10",
    category: "policy",
    question: "What is your cancellation policy?",
    answer:
      "Cancellations or reschedules made 12 hours before your appointment are free. Within 12 hours, a 50% fee applies. No-shows are charged the full service amount. We understand emergencies happen — just call us as early as possible.",
  },
  {
    id: "f11",
    category: "policy",
    question: "Do you offer bridal or group services?",
    answer:
      "Yes, we offer bridal packages and group bookings for weddings, birthdays, and corporate events. Please contact us at least 2 weeks in advance to arrange bridal or group services. We can also come to your venue for an additional call-out fee.",
  },
  {
    id: "f12",
    category: "policy",
    question: "Is the salon hygienic?",
    answer:
      "Absolutely. Hygiene is one of our top priorities. We sanitise all tools between clients, use single-use items where needed, and maintain a clean, fresh environment throughout the day. Many of our clients specifically mention our cleanliness in their reviews.",
  },
];

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "hair" | "barber" | "spa" | "nails" | "salon";
}

export const GALLERY: GalleryImage[] = [
  { id: "g1", url: "https://sfile.chatglm.cn/images-ppt/99980ae52869.jpg", caption: "Our salon interior", category: "salon" },
  { id: "g2", url: "https://sfile.chatglm.cn/images-ppt/bf1671d4931d.webp", caption: "Styling stations", category: "salon" },
  { id: "g3", url: "https://sfile.chatglm.cn/images-ppt/2328b9abed67.jpg", caption: "Barbershop area", category: "salon" },
  { id: "g4", url: "https://sfile.chatglm.cn/images-ppt/ebbe02a07294.jpg", caption: "Barber chairs", category: "salon" },
  { id: "g5", url: "https://sfile.chatglm.cn/images-ppt/9d1807b23c78.jpg", caption: "Spa treatment room", category: "spa" },
  { id: "g6", url: "https://sfile.chatglm.cn/images-ppt/8d3e16344557.jpg", caption: "Body scrub station", category: "spa" },
  { id: "g7", url: "https://sfile.chatglm.cn/images-ppt/e6bdb0ac0855.jpg", caption: "Sleek blowout", category: "hair" },
  { id: "g8", url: "https://sfile.chatglm.cn/images-ppt/a2d7fff25cc0.jpg", caption: "Balayage transformation", category: "hair" },
  { id: "g9", url: "https://sfile.chatglm.cn/images-ppt/ecbe61b16c10.jpg", caption: "Box braids", category: "hair" },
  { id: "g10", url: "https://sfile.chatglm.cn/images-ppt/d256dbbeaff3.jpg", caption: "Knotless braids", category: "hair" },
  { id: "g11", url: "https://sfile.chatglm.cn/images-ppt/a11effd4f0e9.jpg", caption: "Precision fade", category: "barber" },
  { id: "g12", url: "https://sfile.chatglm.cn/images-ppt/623063f5fad4.jpg", caption: "Beard sculpt", category: "barber" },
  { id: "g13", url: "https://sfile.chatglm.cn/images-ppt/07ffed731941.jpg", caption: "Hot towel shave", category: "barber" },
  { id: "g14", url: "https://sfile.chatglm.cn/images-ppt/d2ae10fe40f4.jpg", caption: "Skin fade", category: "barber" },
  { id: "g15", url: "https://sfile.chatglm.cn/images-ppt/da5149414cf2.jpg", caption: "Gold manicure", category: "nails" },
  { id: "g16", url: "https://sfile.chatglm.cn/images-ppt/bd8f2a7a3c4b.jpg", caption: "Glossy gel polish", category: "nails" },
  { id: "g17", url: "https://sfile.chatglm.cn/images-ppt/822456b454ff.png", caption: "Acrylic nail art", category: "nails" },
  { id: "g18", url: "https://sfile.chatglm.cn/images-ppt/07556261e148.jpg", caption: "Facial treatment", category: "spa" },
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
    id: "gentleman",
    name: "Gentleman's Package",
    description: "The complete grooming experience for the modern man",
    price: 1500,
    duration: "90 min",
    includes: [
      "Men's haircut with fade",
      "Beard trim & shape",
      "Hot towel straight-razor shave",
      "Facial cleansing",
      "Styling & aftercare",
    ],
    popular: true,
  },
  {
    id: "spa-retreat",
    name: "Spa Retreat Package",
    description: "Over 3 hours of pure relaxation and renewal",
    price: 8000,
    duration: "3+ hours",
    includes: [
      "60-min massage (Swedish or deep tissue)",
      "Full facial treatment",
      "Body scrub & polish",
      "Complimentary herbal tea",
      "Scalp massage",
    ],
  },
  {
    id: "glam",
    name: "Glam Up Package",
    description: "Perfect for events, date nights, and special occasions",
    price: 6000,
    duration: "3 hours",
    includes: [
      "Hair styling (blow dry or updo)",
      "Manicure with gel polish",
      "Facial treatment",
      "Eyebrow shaping",
      "Makeup application",
    ],
  },
  {
    id: "couples",
    name: "Couples Spa Package",
    description: "Relax together with side-by-side treatments",
    price: 10000,
    duration: "2 hours",
    includes: [
      "60-min couples massage",
      "Facials for both",
      "Complimentary refreshments",
      "Private treatment room",
      "Romantic ambience setup",
    ],
  },
];

export const OFFERS = [
  {
    id: "o1",
    title: "First Visit Special",
    description: "New clients get 10% off any service. Just mention this offer when booking.",
    code: "LIZAYA10",
    expires: "Ongoing",
  },
  {
    id: "o2",
    title: "Weekday Lunchtime Deal",
    description: "Book any haircut or manicure Monday–Thursday between 12 PM and 3 PM and get a free hair treatment add-on.",
    code: "LUNCHTIME",
    expires: "Until end of year",
  },
  {
    id: "o3",
    title: "Bring a Friend",
    description: "Book with a friend on the same day and you both get 15% off your services.",
    code: "FRIENDS15",
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
