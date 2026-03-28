'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&q=75',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1000&q=75',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=75',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1000&q=75',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=75',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=75',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=75',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&q=75',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=75',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&q=75',
];

export default function GallerySection() {
  return (
    <section className="py-16 lg:py-24 bg-card/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-4 uppercase tracking-wider">
            Galleries
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Campus & Classroom Gallery</h2>
          <p className="text-muted text-base max-w-2xl mx-auto">
            A quick preview of training sessions, student activities, and project work.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
              className="rounded-xl overflow-hidden border border-border/40 bg-background/40"
            >
              <div className="relative w-full h-36">
                <Image src={image} alt={`Gallery ${index + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 20vw" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
