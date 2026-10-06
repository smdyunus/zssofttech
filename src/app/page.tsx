import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import NandyalAdvantage from '@/components/NandyalAdvantage';
import PlacedStudents from '@/components/PlacedStudents';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import PhotoGallery from '@/components/sections/photo-gallery';
import { companyGalleryItems } from '@/lib/data/company-gallery-data';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <FeaturedCourses limit={6} />
      <NandyalAdvantage />
      <PlacedStudents />
      <Testimonials />
      <PhotoGallery
        id="gallery"
        variant="dark"
        className="bg-dark-bg py-24"
        title="Life at ZS Soft Tech"
        description="Training sessions, workshops, celebrations, and the collaborative learning environment at our Nandyal center."
        items={companyGalleryItems}
      />
      <CTASection />
    </>
  );
}
