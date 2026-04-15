import type { Metadata } from "next";
import { InternshipHero } from "./sections/internship-hero";
import { WhyChooseUs } from "./sections/why-choose-us";
import { Programs } from "./sections/programs";
import { CareerPath } from "./sections/career-path";
import { InternshipCTA } from "./sections/internship-cta";

export const metadata: Metadata = {
  title: "Internships | ZS Soft Tech",
  description:
    "Break the “No Experience — No Job” cycle with ZS Soft Tech internships: real-world projects, mentorship, and a clear path from classroom to career in Nandyal.",
};

export default function InternshipsPage() {
  return (
    <>
      <InternshipHero />
      <WhyChooseUs />
      <Programs />
      <CareerPath />
      <InternshipCTA />
    </>
  );
}
