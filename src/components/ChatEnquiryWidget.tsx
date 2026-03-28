'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, RotateCcw, Send, Loader2, Check } from 'lucide-react';
import { courses } from '@/lib/data/courses';
import {
  ENQUIRY_NAME_MAX,
  enquiryPhoneDigits,
  validateEnquiryName,
  validateEnquiryPhone,
} from '@/lib/contact-enquiry-validation';
import {
  getContactMailDelivery,
  submitContactEnquiry,
} from '@/lib/contact-enquiry-client-submit';
/** Fills required API `message` when the chat flow does not ask for free text. */
const CHAT_ENQUIRY_DEFAULT_MESSAGE = 'Enquiry submitted via website chat.';

const TEASER_DISMISS_KEY = 'zs-chat-teaser-dismissed';

const SUPPORT_AVATAR_SRC = '/images/chat-support-avatar.png';

type Step =
  | 'invite'
  | 'name'
  | 'course'
  | 'phone'
  | 'done'
  | 'submitting';

type ChatMsg = { id: string; role: 'bot' | 'user'; text: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Bottom-right on avatar, ~half inside / half outside the circle. */
function OnlineBadgeOverlay({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const box = size === 'md' ? 'h-[18px] w-[18px]' : 'h-3.5 w-3.5';
  const icon = size === 'md' ? 'w-2.5 h-2.5' : 'w-2 h-2';
  return (
    <motion.span
      className={`pointer-events-none absolute z-10 flex items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white shadow-md ${box} bottom-0 right-0 translate-x-[35%] translate-y-[35%]`}
      aria-hidden
      animate={{
        scale: [1, 1.08, 1],
        boxShadow: [
          '0 0 0 0 rgba(16, 185, 129, 0.5)',
          '0 0 0 5px rgba(16, 185, 129, 0)',
          '0 0 0 0 rgba(16, 185, 129, 0)',
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Check className={`${icon} text-white`} strokeWidth={3} />
    </motion.span>
  );
}

function BotAvatar() {
  return (
    <motion.div
      className="relative h-9 w-9 shrink-0 shadow-md"
      aria-hidden
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="h-full w-full overflow-hidden rounded-full bg-gray-200 ring-2 ring-white">
        <Image
          src={SUPPORT_AVATAR_SRC}
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>
      <OnlineBadgeOverlay size="sm" />
    </motion.div>
  );
}

export default function ChatEnquiryWidget() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [step, setStep] = useState<Step>('invite');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mailDelivery, setMailDelivery] = useState<'loading' | 'smtp' | 'forms'>(
    'loading'
  );

  /** Snapshot for submit (avoids stale state across steps / async). */
  const fieldsRef = useRef({
    name: '',
    message: '',
    courseSlug: '',
  });

  const endRef = useRef<HTMLDivElement>(null);
  const courseOptions = useMemo(
    () => [...courses].sort((a, b) => a.title.localeCompare(b.title)),
    []
  );

  useEffect(() => {
    try {
      setShowTeaser(sessionStorage.getItem(TEASER_DISMISS_KEY) !== '1');
    } catch {
      setShowTeaser(true);
    }
  }, []);

  useEffect(() => {
    getContactMailDelivery().then((d) =>
      setMailDelivery(d === 'smtp' ? 'smtp' : 'forms')
    );
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step, panelOpen]);

  const appendMessages = useCallback((...items: Omit<ChatMsg, 'id'>[]) => {
    setMessages((prev) => [
      ...prev,
      ...items.map((m) => ({ ...m, id: uid() })),
    ]);
  }, []);

  const startConversation = useCallback(() => {
    setFieldError(null);
    setSubmitError(null);
    setStep('invite');
    setDraft('');
    fieldsRef.current = { name: '', message: '', courseSlug: '' };
    setMessages([
      {
        id: uid(),
        role: 'bot',
        text: 'Hello! May I have a moment to chat with you?',
      },
    ]);
  }, []);

  const resetConversation = useCallback(() => {
    startConversation();
  }, [startConversation]);

  useEffect(() => {
    if (!panelOpen) return;
    if (messages.length !== 0) return;
    startConversation();
  }, [panelOpen, messages.length, startConversation]);

  const dismissTeaser = useCallback(() => {
    setShowTeaser(false);
    try {
      sessionStorage.setItem(TEASER_DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const openPanel = () => {
    dismissTeaser();
    setPanelOpen(true);
  };

  /** Teaser already asked permission; skip duplicate Yes inside the panel. */
  const handleTeaserYes = () => {
    dismissTeaser();
    setFieldError(null);
    setSubmitError(null);
    setStep('name');
    setDraft('');
    fieldsRef.current = { name: '', message: '', courseSlug: '' };
    setMessages([
      {
        id: uid(),
        role: 'bot',
        text: 'Hello! May I have a moment to chat with you?',
      },
      { id: uid(), role: 'user', text: 'Yes' },
      {
        id: uid(),
        role: 'bot',
        text: 'May I know your full name, please?',
      },
    ]);
    setPanelOpen(true);
  };

  const handleTeaserNo = () => {
    dismissTeaser();
  };

  const handleInviteYes = () => {
    setFieldError(null);
    appendMessages(
      { role: 'user', text: 'Yes' },
      { role: 'bot', text: 'May I know your full name, please?' }
    );
    setStep('name');
  };

  const handleInviteNo = () => {
    appendMessages(
      { role: 'user', text: 'No' },
      {
        role: 'bot',
        text: 'No problem. Whenever you’re ready, tap the chat icon and we’ll be here.',
      }
    );
    setStep('done');
  };

  const handleSendName = () => {
    const err = validateEnquiryName(draft);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError(null);
    const trimmed = draft.trim();
    fieldsRef.current.name = trimmed;
    appendMessages(
      { role: 'user', text: trimmed },
      {
        role: 'bot',
        text: 'Thank you! Which course interests you the most right now?',
      }
    );
    setDraft('');
    setStep('course');
  };

  const handlePickCourse = (slug: string) => {
    const c = courses.find((x) => x.slug === slug);
    const label = c?.title ?? slug;
    fieldsRef.current.courseSlug = slug;
    fieldsRef.current.message = CHAT_ENQUIRY_DEFAULT_MESSAGE;
    appendMessages(
      { role: 'user', text: label },
      {
        role: 'bot',
        text: 'Can you share your 10-digit mobile number? Our counselor will call you soon with the details.',
      }
    );
    setStep('phone');
  };

  const handleSendPhone = async () => {
    const err = validateEnquiryPhone(draft);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError(null);
    const digits = enquiryPhoneDigits(draft);
    appendMessages({ role: 'user', text: digits });
    setDraft('');
    setStep('submitting');

    const f = fieldsRef.current;
    const payload = {
      name: f.name.trim(),
      phone: digits,
      email: '',
      courseSlug: f.courseSlug,
      message: f.message.trim() || CHAT_ENQUIRY_DEFAULT_MESSAGE,
    };

    const delivery = mailDelivery === 'loading' ? 'forms' : mailDelivery;
    const result = await submitContactEnquiry(payload, delivery);

    if (!result.ok) {
      setSubmitError(result.error);
      appendMessages({
        role: 'bot',
        text: `${result.error} Tap refresh to try again, or use the Contact page.`,
      });
      setStep('done');
      return;
    }

    appendMessages({
      role: 'bot',
      text: 'Thank you! Our counselor will contact you soon. Have a wonderful day!',
    });
    setStep('done');
    setSubmitError(null);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const timeLabel = 'Just now';

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3">
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="w-[min(100vw-1.5rem,380px)] h-[min(70vh,520px)] bg-white rounded-2xl shadow-2xl shadow-black/40 border border-gray-200/80 flex flex-col overflow-hidden text-gray-900"
              role="dialog"
              aria-label="Chat with us"
            >
              <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 shrink-0" />
              <div className="flex items-center justify-end gap-1 px-2 py-2 border-b border-gray-100">
                <button
                  type="button"
                  onClick={resetConversation}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  aria-label="Start over"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={closePanel}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto px-3 py-3 space-y-4 bg-gray-50/80"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.role === 'bot'
                        ? 'flex gap-2 items-start'
                        : 'flex flex-col items-end gap-1'
                    }
                  >
                    {m.role === 'bot' && <BotAvatar />}
                    <div className={m.role === 'bot' ? 'min-w-0 flex-1' : 'max-w-[90%]'}>
                      <div
                        className={
                          m.role === 'bot'
                            ? 'inline-block rounded-2xl rounded-tl-md bg-white border border-gray-100 px-3 py-2 text-sm text-gray-800 shadow-sm'
                            : 'inline-block rounded-2xl rounded-tr-md bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 text-sm shadow-md'
                        }
                      >
                        {m.text}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 ml-0.5">
                        {timeLabel}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="p-3 border-t border-gray-100 bg-white space-y-2">
                {submitError && step === 'done' && (
                  <p className="text-xs text-red-600 text-center">{submitError}</p>
                )}
                {fieldError && (
                  <p className="text-xs text-red-600">{fieldError}</p>
                )}

                {step === 'invite' && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleInviteYes}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300" />
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={handleInviteNo}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300" />
                      No
                    </button>
                  </div>
                )}

                {step === 'name' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={ENQUIRY_NAME_MAX}
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value);
                        if (fieldError) setFieldError(null);
                      }}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && (e.preventDefault(), handleSendName())
                      }
                      placeholder="Your full name"
                      className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                      autoComplete="name"
                    />
                    <button
                      type="button"
                      onClick={handleSendName}
                      className="shrink-0 w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 'course' && (
                  <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                    {courseOptions.map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => handlePickCourse(c.slug)}
                        className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-full border border-orange-400/70 bg-white text-sm text-orange-600 font-medium hover:bg-orange-50 transition-colors"
                      >
                        <span className="w-4 h-4 rounded-full border-2 border-orange-300 shrink-0" />
                        <span className="line-clamp-2">{c.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 'phone' && (
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value.replace(/\D/g, '').slice(0, 10));
                        if (fieldError) setFieldError(null);
                      }}
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        (e.preventDefault(), handleSendPhone())
                      }
                      placeholder="10-digit mobile (starts with 6–9)"
                      className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                      autoComplete="tel"
                    />
                    <button
                      type="button"
                      onClick={() => void handleSendPhone()}
                      disabled={mailDelivery === 'loading'}
                      className="shrink-0 w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 'submitting' && (
                  <div className="flex items-center justify-center gap-2 py-3 text-sm text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                    Sending…
                  </div>
                )}

                {step === 'done' && (
                  <button
                    type="button"
                    onClick={resetConversation}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    New enquiry
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTeaser && !panelOpen && (
            <motion.div
              key="teaser-card"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-[min(100vw-1.5rem,280px)] rounded-2xl border border-gray-200/90 bg-white p-4 text-gray-900 shadow-2xl shadow-black/25"
            >
              <p className="text-sm font-medium leading-snug text-gray-800">
                Hello! May I have a moment to chat with you?
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleTeaserYes}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-gray-300" />
                  Yes
                </button>
                <button
                  type="button"
                  onClick={handleTeaserNo}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gray-200 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-gray-300" />
                  No
                </button>
              </div>
              <div className="mt-4 flex justify-end">
                <motion.button
                  type="button"
                  onClick={openPanel}
                  aria-label="Open chat"
                  className="relative h-14 w-14 shrink-0 overflow-visible shadow-lg shadow-black/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <div className="h-full w-full overflow-hidden rounded-full ring-4 ring-white/95">
                    <Image
                      src={SUPPORT_AVATAR_SRC}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-top"
                      priority
                    />
                  </div>
                  <OnlineBadgeOverlay size="md" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(!showTeaser || panelOpen) && (
          <motion.button
            type="button"
            onClick={() => (panelOpen ? closePanel() : openPanel())}
            className="relative h-14 w-14 shrink-0 overflow-visible shadow-lg shadow-black/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            aria-label={panelOpen ? 'Close chat' : 'Open chat'}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            animate={{ y: [0, -3, 0] }}
            transition={{
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full ring-4 ring-white/90">
              <Image
                src={SUPPORT_AVATAR_SRC}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
            <OnlineBadgeOverlay size="md" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
