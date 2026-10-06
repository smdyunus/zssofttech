"use client";

import PhotoGallery from "@/components/sections/photo-gallery";
import { companyGalleryItems } from "@/lib/data/company-gallery-data";

/** Internships page gallery — Life at ZS Global Tech Solutions. */
export function InternshipGallery() {
  return (
    <PhotoGallery
      id="gallery"
      variant="dark"
      className="bg-dark-bg py-24"
      title="Life at ZS Global Tech Solutions"
      description="Training sessions, workshops, team celebrations, and the collaborative learning environment interns experience at our Nandyal center."
      items={companyGalleryItems}
    />
  );
}
