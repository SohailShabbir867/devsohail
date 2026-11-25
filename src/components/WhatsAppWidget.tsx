import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SOCIAL_LINKS, SITE_DATA } from '../data/constants';

const WhatsAppWidget = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isOpen) {
      messageInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closePanel, isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      messageInputRef.current?.focus();
      return;
    }

    const whatsappUrl = new URL(SOCIAL_LINKS.whatsapp);
    whatsappUrl.searchParams.set('text', trimmedMessage);
    window.open(whatsappUrl.toString(), '_blank', 'noopener,noreferrer');
    closePanel();
    setMessage('');
  };

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="whatsapp-widget-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="WhatsApp message form"
            className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#111115] shadow-2xl shadow-black/60"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-[#17171D] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                  <FaWhatsapp aria-hidden="true" size={21} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Message me on WhatsApp
                  </h2>
                  <p className="mt-0.5 text-xs text-white/60">
                    {SITE_DATA.phone}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close WhatsApp message form"
                className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiX aria-hidden="true" size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <label
                htmlFor="whatsapp-message"
                className="text-xs font-medium text-white/80"
              >
                Your message
              </label>
              <textarea
                ref={messageInputRef}
                id="whatsapp-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                required
                placeholder="Write a message to start the conversation…"
                className="mt-2 min-h-24 w-full resize-y rounded-xl border border-white/10 bg-[#0A0A0E] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#071B0D] transition-colors hover:bg-[#1FBA59] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend aria-hidden="true" size={15} />
                Continue in WhatsApp
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      <button
        ref={toggleButtonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close WhatsApp form' : 'Open WhatsApp form'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'whatsapp-widget-panel' : undefined}
        className="focus-ring inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#071B0D] shadow-lg shadow-black/40 transition-transform hover:scale-105"
      >
        {isOpen ? (
          <FiX aria-hidden="true" size={23} />
        ) : (
          <span className="relative">
            <FaWhatsapp aria-hidden="true" size={28} />
            <FiMessageCircle
              aria-hidden="true"
              className="absolute -right-2 -top-1 rounded-full bg-[#25D366] p-0.5"
              size={13}
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
