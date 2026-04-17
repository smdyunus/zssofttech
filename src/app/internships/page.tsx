import type { Metadata } from "next";
import { AicteInternshipSection } from "./sections/aicte-internship-section";
import { CareerPath } from "./sections/career-path";
import { InternshipCTA } from "./sections/internship-cta";
import { InternshipHero } from "./sections/internship-hero";
import { InternshipTwoModels } from "./sections/internship-two-models";
import { Programs } from "./sections/programs";
import { WhyChooseUs } from "./sections/why-choose-us";

export const metadata: Metadata = {
  title: "Internships & Training | ZS Soft Tech — Nandyal",
  description:
    "AICTE-norms–aligned free internship learning model and optional premium training with mentorship at ZS Soft Tech, Nandyal. Transparent tracks for students and institutions.",
};

export default function InternshipsPage() {
  return (
    <>
      <InternshipHero />
      <InternshipTwoModels />
      <AicteInternshipSection />
      <Programs />
      <WhyChooseUs />
      <CareerPath />
      <InternshipCTA />
    </>
  );
}
