'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';
import { courses } from '@/lib/data/courses';

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const selectedCourse = searchParams.get('course');
    if (selectedCourse) {
      setFormState((prev) => ({ ...prev, course: selectedCourse }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formState.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = 'Enter a valid email address';
    if (!formState.course) newErrors.course = 'Please select a course';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: instituteInfo.contact.phone,
      href: `tel:${instituteInfo.contact.phone.replace(/\D/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: instituteInfo.contact.email,
      href: `mailto:${instituteInfo.contact.email}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: instituteInfo.address,
      href: '#',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: instituteInfo.workingHours,
      href: '#',
    },
  ];

  const courseOptions = courses.map((course) => course.title);

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card/30 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider mb-1">
                    {info.label}
                  </div>
                  <div className="text-sm text-foreground">{info.value}</div>
                </div>
              </a>
            ))}

            <a
              href={`https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=Hi%20ZS%20Soft%20Tech!%20I%27m%20interested%20in%20your%20courses.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm font-semibold text-green-400">
                  Chat on WhatsApp
                </div>
                <div className="text-xs text-muted">Quick response guaranteed</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Thank You!
                </h3>
                <p className="text-muted">
                  We&apos;ve received your enquiry. Our team will contact you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-foreground text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.name ? 'border-red-500' : 'border-border/50'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-foreground text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.phone ? 'border-red-500' : 'border-border/50'
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-foreground text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.email ? 'border-red-500' : 'border-border/50'
                    }`}
                    placeholder="your@email.com (optional)"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Interested Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formState.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.course ? 'border-red-500' : 'border-border/50'
                    } ${!formState.course ? 'text-gray-500' : ''}`}
                  >
                    <option value="">Select a course</option>
                    {courseOptions.map((course) => (
                      <option key={course} value={course} className="bg-card text-foreground">
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.course}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-border/50 rounded-xl text-foreground text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Any specific questions or requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-primary text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Enquiry
                </button>

                <p className="text-xs text-center text-muted">
                  By submitting, you agree to receive communications from ZS Soft Tech.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
