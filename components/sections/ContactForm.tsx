"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { contact } from "@/lib/data";
import { Check, Send } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/**
 * Optional free access key from web3forms.com. With it, messages are delivered
 * straight to your inbox. Without it, the form opens the visitor's email app
 * with the message pre-filled, so it always works.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const ease = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-[border-color,box-shadow] duration-300 focus:border-accent-cyan/60 focus:shadow-[0_0_0_4px_rgb(0_240_255/0.12)] focus-visible:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  // Return the button to its resting state a few seconds after a result.
  useEffect(() => {
    if (status === "idle" || status === "sending") return;
    const t = window.setTimeout(() => setStatus("idle"), 6000);
    return () => window.clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Portfolio enquiry from ${name}`;

    // Honeypot: hidden from people, so only bots fill it in.
    if (data.get("company")) {
      setStatus("sent");
      return;
    }

    if (!WEB3FORMS_KEY) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, name, email, message }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const button: Record<Status, { key: string; content: ReactNode }> = {
    idle: {
      key: "idle",
      content: (
        <>
          Send Message
          <Send width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </>
      ),
    },
    error: {
      key: "idle",
      content: (
        <>
          Send Message
          <Send width={16} height={16} />
        </>
      ),
    },
    sending: {
      key: "sending",
      content: (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
          Sending…
        </>
      ),
    },
    sent: {
      key: "sent",
      content: (
        <>
          <Check width={18} height={18} />
          Message sent
        </>
      ),
    },
    mailto: {
      key: "mailto",
      content: (
        <>
          <Check width={18} height={18} />
          Opening your email app
        </>
      ),
    },
  };

  const note: Partial<Record<Status, ReactNode>> = {
    sent: "Thanks — I'll get back to you soon.",
    mailto: (
      <>
        Your email app should open with the message ready to send. If it doesn&apos;t, write to{" "}
        <a href={`mailto:${contact.email}`} className="text-accent-cyan underline-offset-4 hover:underline">
          {contact.email}
        </a>
        .
      </>
    ),
    error: (
      <>
        Something went wrong. Please email me directly at{" "}
        <a href={`mailto:${contact.email}`} className="text-accent-cyan underline-offset-4 hover:underline">
          {contact.email}
        </a>
        .
      </>
    ),
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex h-full flex-col gap-5">
      <Field label="Name">
        <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputClass} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </Field>
      <Field label="Message" grow>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Hi Lokesh, I'd like to talk about…"
          className={`${inputClass} h-full min-h-32 resize-none`}
        />
      </Field>

      {/* Honeypot, kept off-screen */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-accent-cyan text-sm font-semibold text-black shadow-[0_0_0_1px_rgb(0_240_255/0.6),0_10px_40px_-10px_rgb(0_240_255/0.7)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgb(0_240_255/0.9),0_10px_50px_-8px_rgb(0_240_255/0.9)] disabled:cursor-wait"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={button[status].key}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="flex items-center gap-2"
          >
            {button[status].content}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <div aria-live="polite" className="min-h-5 text-center text-sm text-white/55">
        <AnimatePresence mode="wait">
          {note[status] && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              {note[status]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({ label, grow = false, children }: { label: string; grow?: boolean; children: ReactNode }) {
  return (
    <label className={`group flex flex-col ${grow ? "flex-1" : ""}`}>
      <span className="mb-2 font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase transition-colors duration-300 group-focus-within:text-accent-cyan">
        {label}
      </span>
      {children}
    </label>
  );
}
