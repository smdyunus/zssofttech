'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Code2,
  Brain,
  Cloud,
  BarChart3,
  Network,
  TestTube,
} from 'lucide-react';
import { instituteInfo, courseCategories } from '@/lib/data/institute';

const categoryIcons: Record<string, React.ReactNode> = {
  'Full Stack Development': <Code2 className="w-4 h-4" />,
  'DevOps & Cloud': <Cloud className="w-4 h-4" />,
  'Data Science & AI': <Brain className="w-4 h-4" />,
  Testing: <TestTube className="w-4 h-4" />,
  Architecture: <Network className="w-4 h-4" />,
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Top Bar - HIDDEN per user request */}
      {/* <div className="bg-gradient-primary text-white py-2 hidden md:block">...</div> */}

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border/50'
            : 'bg-card/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[88px]">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/zs-logo-header-cropped.png"
                alt="ZS Soft Tech Logo"
                width={470}
                height={246}
                className="h-12 sm:h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5"
              >
                Home
              </Link>

              {/* Courses Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <Link
                  href="/courses"
                  className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5 flex items-center gap-1"
                >
                  Courses
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      showMegaMenu ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {showMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] max-h-[80vh] overflow-y-auto bg-[#0f172a] border border-border rounded-2xl shadow-2xl shadow-black/40 p-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {courseCategories.map((cat) => (
                          <div key={cat.title}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {categoryIcons[cat.title] || (
                                  <BarChart3 className="w-4 h-4" />
                                )}
                              </div>
                              <h3 className="font-semibold text-sm text-foreground">
                                {cat.title}
                              </h3>
                            </div>
                            <div className="space-y-1">
                              {cat.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block px-3 py-2 text-sm text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                        <p className="text-xs text-muted">
                          {instituteInfo.stats.coursesOffered} courses
                        </p>
                        <Link
                          href="/courses"
                          className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                          View All Courses →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Temporarily hidden: Internships nav link
              <Link
                href="/internships"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5"
              >
                Internships
              </Link>
              */}

              <Link
                href="/blog"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5"
              >
                Blogs
              </Link>

              <Link
                href="/about"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium text-sm rounded-lg hover:bg-white/5"
              >
                Contact Us
              </Link>

              {/* Temporarily hidden: Login button
              <Link
                href="/login"
                className="ml-2 px-5 py-2.5 bg-gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Login
              </Link>
              */}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-card border-t border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
                <Link
                  href="/"
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                {courseCategories.map((cat) => (
                  <div key={cat.title} className="py-2">
                    <div className="flex items-center gap-2 px-4 mb-1">
                      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        {categoryIcons[cat.title] || (
                          <BarChart3 className="w-3 h-3" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                        {cat.title}
                      </span>
                    </div>
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 pl-12 pr-4 text-sm text-gray-400 hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Temporarily hidden: Internships mobile nav link
                <Link
                  href="/internships"
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Internships
                </Link>
                */}

                <Link
                  href="/blog"
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>
                <Link
                  href="/about"
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>

                <div className="pt-4 space-y-3">
                  {/* Temporarily hidden: Login button
                  <Link
                    href="/login"
                    className="block w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  */}
                </div>

                <div className="pt-4 border-t border-border/50 flex flex-col gap-2 text-sm text-muted">
                  <a href={`tel:${instituteInfo.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {instituteInfo.contact.phone}
                  </a>
                  <a href={`mailto:${instituteInfo.contact.email}`} className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {instituteInfo.contact.email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
