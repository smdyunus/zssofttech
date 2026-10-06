import Link from 'next/link';
import ContactUsLink from '@/components/ContactUsLink';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';
import { FEATURE_INTERNSHIPS } from '@/lib/feature-flags';
import { getInstituteMapIframeSrc, instituteInfo } from '@/lib/data/institute';

const allQuickLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Courses', href: '/courses' },
  { name: 'Services', href: '/services' },
  { name: 'Internships', href: '/internships' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

const quickLinks = FEATURE_INTERNSHIPS
  ? allQuickLinks
  : allQuickLinks.filter((l) => l.href !== '/internships');

const courseLinks = [
  { name: 'Agentic AI Using UiPath + Automation', href: '/courses/automation-agentic-ai-uipath' },
  { name: 'Python & Data Analysis — 45-Day Fast Track', href: '/courses/python-data-analysis-45-day-fast-track' },
  { name: 'MERN Stack Development', href: '/courses/mern-stack' },
  { name: 'Python Full Stack Course', href: '/courses/python-full-stack' },
  { name: 'Java Spring Boot', href: '/courses/java-spring-boot' },
  { name: 'Agentic AI & Gen AI', href: '/courses/agentic-ai' },
  { name: 'Data Science + AI', href: '/courses/ds-ai' },
  { name: 'AWS DevOps', href: '/courses/aws-devops' },
  { name: 'Automation Testing', href: '/courses/automation-testing' },
  { name: 'Medical Coding', href: '/courses/medical-coding' },
];

const socialLinks = [
  { name: 'Instagram', href: instituteInfo.social.instagram, icon: Instagram },
  { name: 'LinkedIn', href: instituteInfo.social.linkedin, icon: Linkedin },
  { name: 'YouTube', href: instituteInfo.social.youtube, icon: Youtube },
  { name: 'Twitter', href: instituteInfo.social.twitter, icon: Twitter },
  { name: 'Facebook', href: instituteInfo.social.facebook, icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white border-t border-secondary/40">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div>
                <div className="font-bold text-lg text-white leading-tight">
                  ZS Soft Tech
                </div>
                <div className="text-[10px] text-purple-200 uppercase tracking-widest">
                  IT Training & Development
                </div>
              </div>
            </Link>
            <p className="text-sm text-purple-100/75 leading-relaxed mb-6">
              Premium IT training and software development in Nandyal —
              helping the next generation of tech professionals build real skills and careers.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-purple-100 hover:text-white hover:bg-secondary transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-purple-200 mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href === '/contact' ? (
                    <ContactUsLink className="text-sm text-purple-100/80 hover:text-purple-200 transition-colors flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </ContactUsLink>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-purple-100/80 hover:text-purple-200 transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-purple-200 mb-5 text-sm uppercase tracking-wider">
              Courses
            </h3>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-100/80 hover:text-purple-200 transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h3 className="font-semibold text-purple-200 mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${instituteInfo.contact.phone.replace(/\D/g, '')}`}
                  className="flex items-start gap-3 text-sm text-purple-100/80 hover:text-purple-200 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-200" />
                  {instituteInfo.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${instituteInfo.contact.email}`}
                  className="flex items-start gap-3 text-sm text-purple-100/80 hover:text-purple-200 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-200" />
                  {instituteInfo.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-purple-100/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-200" />
                {instituteInfo.address}
              </li>
              <li className="flex items-start gap-3 text-sm text-purple-100/80">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-200" />
                {instituteInfo.workingHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps embed */}
        {instituteInfo.mapEmbedUrl && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="font-semibold text-purple-200 text-sm uppercase tracking-wider">Find Us</h3>
                {instituteInfo.mapPlaceUrl && (
                  <a
                    href={instituteInfo.mapPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-200 hover:text-white transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/15 h-64 lg:h-80 bg-[#e5e3df]">
                <iframe
                  src={getInstituteMapIframeSrc()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZS Soft Tech on Google Maps"
                  className="w-full h-full min-h-[256px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-dark-bg">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>&copy; {new Date().getFullYear()} ZS Soft Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/apps/sunshine-developers/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
