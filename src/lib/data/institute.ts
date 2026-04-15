export const instituteInfo = {
  name: "ZS Soft Tech",
  tagline: "Premium IT Training & Software Development Hub",
  founded: 2024,
  location: "Nandyal, Andhra Pradesh, India",
  address:
    "#25/684/374, 2nd Floor, Opp. Nayana Eye Care & Dental Research Centre, behind Swadeshi Hotel, Padmavathi Nagar, Nandyala, Andhra Pradesh, India",
  contact: {
    phone: "+91 79894 03539",
    whatsapp: "+917989403539",
    email: "yunus@zssofttech.com",
    landline: "08514-000000",
  },
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    twitter: "#",
    facebook: "#",
  },
  stats: {
    studentsPlaced: "150+",
    coursesOffered: "16+",
    placementRate: "100%",
    yearsExperience: "2",
    hiringPartners: "25+",
    batchesCompleted: "30+",
  },
  workingHours: "Mon–Fri: 9:00 AM – 6:00 PM",
  internshipsUrl: "https://zssofttech-internships.netlify.app/",
  /** Official Google Maps place (open in app / browser). */
  mapPlaceUrl:
    "https://www.google.com/maps/place/ZS+Soft+Tech/@15.481528,78.483792,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb5ad8927fff419:0x2c4975e6337d847a!8m2!3d15.481528!4d78.483792!16s%2Fg%2F11x7hsw59g",
  /**
   * Google “Embed a map” iframe URL (place id + coords). Renders full Google Maps UI (Open in Maps,
   * satellite toggle, etc.) — unlike legacy `?q=lat,lng&output=embed`.
   * Optional: set `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` to use Maps Embed API instead (same look, more stable).
   */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1527.2345678901!2d78.483792!3d15.481528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ad8927fff419%3A0x2c4975e6337d847a!2sZS%20Soft%20Tech!5e0!3m2!1sen!2sin!4v1714464000!5m2!1sen!2sin",
  /** Used only when `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` is set (Maps Embed API place mode). */
  mapEmbedSearchQuery: "ZS Soft Tech, Padmavathi Nagar, Nandyala, Andhra Pradesh, India",
};

/** Prefer Maps Embed API when a key is configured; otherwise use the share-style `pb` embed above. */
export function getInstituteMapIframeSrc(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY?.trim();
  if (key) {
    const q = instituteInfo.mapEmbedSearchQuery;
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&zoom=16`;
  }
  return instituteInfo.mapEmbedUrl;
}

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Internships", href: "/internships" },
  { name: "Blogs", href: "/blog" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export const courseCategories = [
  {
    title: "Full Stack Development",
    items: [
      { name: "MERN Stack (MongoDB, Express, React, Node)", href: "/courses/mern-stack" },
      { name: "Java Full Stack (Spring Boot)", href: "/courses/java-spring-boot" },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { name: "AWS Cloud & DevOps", href: "/courses/aws-devops" },
      { name: "Microsoft Azure", href: "/courses/azure-cloud" },
    ],
  },
  {
    title: "Data Science & AI",
    items: [
      { name: "Python & Data Analysis — 45-Day Fast Track", href: "/courses/python-data-analysis-45-day-fast-track" },
      { name: "Data Science (DS)", href: "/courses/data-science" },
      { name: "Data Science + AI", href: "/courses/ds-ai" },
      { name: "Agentic AI & Gen AI", href: "/courses/agentic-ai" },
      { name: "AI / ML & Deep Learning", href: "/courses/ai-ml-deep-learning" },
      { name: "Data Analytics with Python & Power BI", href: "/courses/data-analytics" },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Manual Testing", href: "/courses/manual-testing" },
      { name: "Automation Testing (Selenium)", href: "/courses/automation-testing" },
      { name: "Automation Testing with Playwright, TypeScript and AI", href: "/courses/playwright-ai-typescript" },
    ],
  },
  {
    title: "Enterprise & ERP",
    items: [
      { name: "SAP MM (Materials Management)", href: "/courses/sap-training" },
    ],
  },
  {
    title: "Healthcare",
    items: [{ name: "Medical Coding", href: "/courses/medical-coding" }],
  },
  {
    title: "Architecture",
    items: [
      { name: "System Design (HLD / LLD)", href: "/courses/system-design" },
    ],
  },
];
