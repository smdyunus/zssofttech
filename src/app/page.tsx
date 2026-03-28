import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import FeaturedCourses from '@/components/FeaturedCourses';
import NandyalAdvantage from '@/components/NandyalAdvantage';
import Testimonials from '@/components/Testimonials';
import HiringPartners from '@/components/HiringPartners';
import CTASection from '@/components/CTASection';
import GallerySection from '@/components/GallerySection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedCourses limit={6} />
      <NandyalAdvantage />
      <Testimonials />
      <GallerySection />
      <HiringPartners />
      <CTASection />
    </>
  );
}
