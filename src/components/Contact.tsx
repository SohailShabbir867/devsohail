import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiMail,
  FiSend,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import { SITE_DATA, SOCIAL_LINKS } from '../data/constants';

const CONTACT_SOCIAL_LINKS = [
  { name: 'GitHub', href: SOCIAL_LINKS.github, icon: FaGithub },
  { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: FaLinkedinIn },
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, icon: FaInstagram },
  { name: 'Facebook', href: SOCIAL_LINKS.facebook, icon: FaFacebookF },
  { name: 'TikTok', href: SOCIAL_LINKS.tiktok, icon: FaTiktok },
  { name: 'WhatsApp', href: SOCIAL_LINKS.whatsapp, icon: FaWhatsapp },
];

type ContactField = 'name' | 'email' | 'message';
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;
type SubmissionStatus = {
  type: 'idle' | 'sending' | 'success' | 'partial' | 'error';
  message: string;
};

const EMPTY_FORM: ContactValues = { name: '', email: '', message: '' };
const FIELD_LABELS: Record<ContactField, string> = {
  name: 'Your name',
  email: 'Your email',
  message: 'Your message',
};

const validateField = (field: ContactField, value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${FIELD_LABELS[field]} is required.`;
  }
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return 'Enter a valid email address.';
  }

  return '';
};

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({
    type: 'idle',
    message: '',
  });
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<
    Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>
  >({ name: null, email: null, message: null });

  const updateField = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setStatus({ type: 'idle', message: '' });
    setErrors((current) =>
      current[field]
        ? { ...current, [field]: validateField(field, value) || undefined }
        : current,
    );
  };

  const validateForm = () => {
    const nextErrors: ContactErrors = {};

    (Object.keys(FIELD_LABELS) as ContactField[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.type === 'sending') return;

    const nextErrors = validateForm();
    setErrors(nextErrors);
    setShowErrorSummary(true);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'idle', message: '' });
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    const {
      VITE_EMAILJS_SERVICE_ID: serviceId,
      VITE_EMAILJS_CONTACT_TEMPLATE_ID: contactTemplateId,
      VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID: autoReplyTemplateId,
      VITE_EMAILJS_PUBLIC_KEY: publicKey,
    } = import.meta.env;

    if (!serviceId || !contactTemplateId || !autoReplyTemplateId || !publicKey) {
      setStatus({
        type: 'error',
        message:
          'Email delivery is not configured yet. Please contact me through WhatsApp instead.',
      });
      return;
    }

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    setStatus({ type: 'sending', message: 'Sending your message…' });

    try {
      await emailjs.send(
        serviceId,
        contactTemplateId,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          message,
          to_email: SITE_DATA.email,
        },
        publicKey,
      );
    } catch (error) {
      console.error('EmailJS failed to deliver the contact message:', error);
      setStatus({
        type: 'error',
        message:
          'Your message could not be sent. Please try again or contact me through WhatsApp.',
      });
      return;
    }

    setValues(EMPTY_FORM);
    setErrors({});
    setShowErrorSummary(false);

    try {
      await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        {
          to_name: name,
          email,
          to_email: email,
          from_name: SITE_DATA.name,
          reply_to: SITE_DATA.email,
          message,
        },
        publicKey,
      );
      setStatus({
        type: 'success',
        message: 'Your message was sent. A confirmation email is on its way.',
      });
    } catch (error) {
      console.error('EmailJS failed to send the contact confirmation:', error);
      setStatus({
        type: 'partial',
        message:
          'Your message was delivered, but the confirmation email could not be sent. I have your message and will follow up.',
      });
    }
  };

  const inputClassName =
    'mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0A0A0E] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#FF014F] focus:ring-2 focus:ring-[#FF014F]/20 disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full overflow-hidden bg-dark py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-[360px] w-[360px] rounded-full opacity-10 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.6) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-14"
        >
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF014F]/45 bg-[#FF014F]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF3B7B] sm:text-xs">
            <FiMail aria-hidden="true" size={15} />
            Get in touch
          </p>
          <h2
            id="contact-title"
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Let&apos;s Start a <span className="text-[#FF014F]">Conversation</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            Send a message using the form, or reach out directly through WhatsApp.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#FF014F] via-[#FF3B7B] to-[#FF014F]"
          />
        </motion.header>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-[#111115] p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Have a project in mind?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              I&apos;m happy to discuss projects, collaborations, or ideas. Choose
              whichever contact method works best for you.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${SITE_DATA.email}`}
                className="focus-ring flex min-h-14 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#FF014F]/50 hover:bg-[#FF014F]/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF014F]/10 text-[#FF3B7B]">
                  <FiMail aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-[#A1A1AA]">Email</span>
                  <span className="block break-all text-sm font-medium text-white">
                    {SITE_DATA.email}
                  </span>
                </span>
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex min-h-14 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#FF014F]/50 hover:bg-[#FF014F]/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF014F]/10 text-[#FF3B7B]">
                  <FaWhatsapp aria-hidden="true" size={18} />
                </span>
                <span>
                  <span className="block text-xs text-[#A1A1AA]">WhatsApp</span>
                  <span className="block text-sm font-medium text-white">
                    {SITE_DATA.phone}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h4 className="text-sm font-semibold text-white">
                Connect with me
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CONTACT_SOCIAL_LINKS.map(({ name, href, icon: SocialIcon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${name} profile`}
                    className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#FF014F]/50 hover:bg-[#FF014F]/10 hover:text-white"
                  >
                    <SocialIcon
                      aria-hidden="true"
                      className="shrink-0 text-[#FF3B7B]"
                      size={16}
                    />
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl border border-white/10 bg-[#111115] p-6 sm:p-8"
          >
            <div className="mb-6 border-b border-white/10 pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF3B7B]">
                Contact form
              </p>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Tell me about your project
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                Share a question, project, or idea. I&apos;ll reply to the email
                address you provide.
              </p>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status.type === 'sending'}
              className="space-y-5"
            >
              {showErrorSummary && Object.keys(errors).length > 0 && (
                <div
                  ref={errorSummaryRef}
                  role="alert"
                  tabIndex={-1}
                  aria-labelledby="contact-error-title"
                  className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100 outline-none focus:ring-2 focus:ring-red-300"
                >
                  <h3 id="contact-error-title" className="font-semibold">
                    Please check the following fields:
                  </h3>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {(Object.keys(errors) as ContactField[]).map((field) => (
                      <li key={field}>
                        <a
                          href={`#contact-${field}`}
                          onClick={(event) => {
                            event.preventDefault();
                            fieldRefs.current[field]?.focus();
                          }}
                          className="underline underline-offset-2"
                        >
                          {errors[field]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-white"
                  >
                    Your name
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current.name = element;
                    }}
                    id="contact-name"
                    name="name"
                    type="text"
                    disabled={status.type === 'sending'}
                    placeholder="Your name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    onBlur={() =>
                      setErrors((current) => ({
                        ...current,
                        name: validateField('name', values.name) || undefined,
                      }))
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClassName}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1.5 text-xs text-red-300"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-white"
                  >
                    Email address
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current.email = element;
                    }}
                    id="contact-email"
                    name="email"
                    type="email"
                    disabled={status.type === 'sending'}
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    onBlur={() =>
                      setErrors((current) => ({
                        ...current,
                        email: validateField('email', values.email) || undefined,
                      }))
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'contact-email-error' : undefined
                    }
                    className={inputClassName}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1.5 text-xs text-red-300"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  ref={(element) => {
                    fieldRefs.current.message = element;
                  }}
                  id="contact-message"
                  name="message"
                  rows={6}
                  disabled={status.type === 'sending'}
                  placeholder="What would you like to discuss?"
                  value={values.message}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      message:
                        validateField('message', values.message) || undefined,
                    }))
                  }
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  className={`${inputClassName} min-h-36 resize-y`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-xs text-red-300"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status.type === 'sending'}
                className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FF014F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(255,1,79,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#D60044] hover:shadow-[0_12px_32px_rgba(255,1,79,0.3)] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:shadow-none sm:w-auto sm:min-w-[180px]"
              >
                {status.type === 'sending' ? (
                  <FiLoader
                    aria-hidden="true"
                    className="animate-spin motion-reduce:animate-none"
                    size={16}
                  />
                ) : (
                  <FiSend aria-hidden="true" size={16} />
                )}
                {status.type === 'sending' ? 'Sending message…' : 'Send Message'}
              </button>

              {status.message && status.type !== 'sending' && (
                <div
                  role={status.type === 'error' ? 'alert' : 'status'}
                  aria-live={status.type === 'error' ? 'assertive' : 'polite'}
                  className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                      : status.type === 'partial'
                        ? 'border-amber-400/30 bg-amber-500/10 text-amber-100'
                        : 'border-red-400/30 bg-red-500/10 text-red-100'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FiCheckCircle
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <FiAlertCircle
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                    />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
