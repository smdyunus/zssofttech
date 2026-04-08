import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatEnquiryWidget from "@/components/ChatEnquiryWidget";
import CursorEffect from "@/components/CursorEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zssofttech.com"),
  icons: {
    icon: "/zs-logo-header-cropped.png",
    shortcut: "/zs-logo-header-cropped.png",
    apple: "/zs-logo-header-cropped.png",
  },
  title: {
    default:
      "ZS Soft Tech – Premium IT Training & Software Development Hub | Nandyal",
    template: "%s | ZS Soft Tech",
  },
  description:
    "Master Full Stack Development (MERN, Java Spring Boot), Agentic AI, Gen AI, DevOps (AWS, Azure), Data Science & System Design at Nandyal's premier IT training institute. 95% placement rate.",
  keywords: [
    "IT training Nandyal",
    "MERN stack course Nandyal",
    "Java Spring Boot training",
    "Agentic AI course",
    "Gen AI training",
    "AWS DevOps Nandyal",
    "Azure cloud training",
    "Data Analytics Power BI",
    "System Design HLD LLD",
    "AI ML training Nandyal",
    "best IT institute Nandyal",
    "software development hub Nandyal",
    "full stack developer course",
    "ZS Soft Tech",
  ],
  authors: [{ name: "ZS Soft Tech" }],
  creator: "ZS Soft Tech",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zssofttech.com",
    siteName: "ZS Soft Tech",
    title:
      "ZS Soft Tech – Premium IT Training & Software Development Hub | Nandyal",
    description:
      "Master the future of technology in Nandyal. Full Stack, AI, DevOps, Data Science & System Design training with 95% placement rate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZS Soft Tech – Premium IT Training & Software Development Hub",
    description:
      "Master the future of technology in Nandyal. World-class IT training with 95% placement rate.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "ZS Soft Tech",
    description:
      "Premium IT Training & Software Development Hub in Nandyal, Andhra Pradesh. Specializing in Full Stack Development, AI/ML, DevOps, Data Science, and System Design.",
    url: "https://zssofttech.com",
    telephone: "+91-79894-03539",
    email: "yunus@zssofttech.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Srinivasa Nagar",
      addressLocality: "Nandyal",
      addressRegion: "Andhra Pradesh",
      postalCode: "518501",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.481528,
      longitude: 78.483792,
    },
    openingHours: "Mo-Sa 09:00-20:00",
    sameAs: [
      "https://instagram.com/zssofttech",
      "https://linkedin.com/company/zssofttech",
      "https://youtube.com/@zssofttech",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function CourseJsonLd() {
  const courses = [
    {
      name: "Python & Data Analysis — 45-Day Fast Track",
      description:
        "Intensive Python and data analysis program with visualization and AI introduction — Nandyal summer batch",
      provider: "ZS Soft Tech",
    },
    {
      name: "MERN Full Stack Development",
      description:
        "Build production-grade web applications with MongoDB, Express.js, React, and Node.js",
      provider: "ZS Soft Tech",
    },
    {
      name: "Java Full Stack – Spring Boot",
      description:
        "Master enterprise Java with Spring Boot, Microservices, and cloud deployment",
      provider: "ZS Soft Tech",
    },
    {
      name: "Agentic AI & Generative AI",
      description:
        "Build autonomous AI agents with LangChain, RAG, and multi-agent orchestration",
      provider: "ZS Soft Tech",
    },
    {
      name: "AWS Cloud & DevOps Engineering",
      description:
        "Master cloud infrastructure, CI/CD, Docker, Kubernetes, and Terraform on AWS",
      provider: "ZS Soft Tech",
    },
    {
      name: "Data Analytics with Python & Power BI",
      description:
        "Master data analysis, visualization, and business intelligence",
      provider: "ZS Soft Tech",
    },
    {
      name: "System Design – HLD & LLD",
      description:
        "Learn high-level and low-level system design for scalable architectures",
      provider: "ZS Soft Tech",
    },
  ];

  const jsonLd = courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider,
      url: "https://zssofttech.com",
    },
    location: {
      "@type": "Place",
      name: "ZS Soft Tech, Nandyal",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nandyal",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN",
      },
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <LocalBusinessJsonLd />
        <CourseJsonLd />
        <CursorEffect />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatEnquiryWidget />
      </body>
    </html>
  );
}
