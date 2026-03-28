'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4C13 4 4 13 4 24c0 3.6 1 6.9 2.7 9.8L4 44l10.5-2.7C17.2 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6-.8-8.5-2.2l-.6-.4-6.2 1.6 1.6-6-.4-.6C8.7 30 8 27.1 8 24 8 15.2 15.2 8 24 8s16 7.2 16 16-7.2 16-16 16zm8.8-11.9c-.5-.2-2.8-1.4-3.2-1.6-.4-.1-.7-.2-1 .2-.3.5-1.2 1.6-1.5 1.9-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-.9.2-.2.5-.5.7-.8.2-.2.3-.5.4-.8.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.4-3.3-.4-.8-.7-.7-1-.7h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.1 4.8 7.6 6.7 1.1.5 1.9.7 2.5.9 1.1.3 2 .3 2.8.2.9-.1 2.8-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.5-.3-.9-.5z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  const whatsappUrl = `https://wa.me/${instituteInfo.contact.whatsapp.replace(/\D/g, '')}?text=Hi%20ZS%20Soft%20Tech!%20I%27m%20interested%20in%20your%20courses.%20Please%20share%20more%20details.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="relative bg-white text-gray-800 px-3 py-2 rounded-xl shadow-xl"
          >
            <button
              onClick={() => setIsTooltipVisible(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
            <p className="text-xs font-semibold whitespace-nowrap">Need help?</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5b] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 transition-colors"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(37, 211, 102, 0.5)',
            '0 0 0 14px rgba(37, 211, 102, 0)',
          ],
        }}
        transition={{
          boxShadow: { duration: 1.8, repeat: Infinity, ease: 'easeOut' },
        }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
