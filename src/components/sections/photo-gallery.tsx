"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  companyGalleryItems,
  type GalleryItem,
} from "@/lib/data/company-gallery-data";

export type PhotoGalleryVariant = "light" | "dark";

export interface PhotoGalleryProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  items?: GalleryItem[];
  className?: string;
  variant?: PhotoGalleryVariant;
}

export default function PhotoGallery({
  id = "gallery",
  eyebrow = "Gallery",
  title,
  description,
  items = companyGalleryItems,
  className = "",
  variant = "dark",
}: PhotoGalleryProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${className}`.trim()}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </span>
          <h2
            id={`${id}-heading`}
            className={`section-heading ${
              isDark ? "hero-copy" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          <p
            className={`section-lead section-lead-center mt-4 ${
              isDark ? "hero-copy-muted" : "text-muted"
            }`}
          >
            {description}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {items.map((item, index) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.4 }}
              className={`group relative overflow-hidden rounded-2xl ${
                item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 [image-orientation:from-image]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <p className="text-base font-bold text-white sm:text-lg">
                  {item.caption}
                </p>
                {item.subtitle ? (
                  <p className="mt-1 text-sm text-white/75 sm:text-[0.95rem]">
                    {item.subtitle}
                  </p>
                ) : null}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
