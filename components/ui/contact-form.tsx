"use client";

import React, { useState } from "react";
import clsx from "../util/clsx";

export type ContactFormSchema = {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceLabel: string;
  serviceOptions: string[];
  standardLabel: string;
  standardOptions: string[];
  message: string;
  gdprText: string;
  submit: string;
};

export default function ContactForm({ form, successTitle, successBody }: { form: ContactFormSchema; successTitle?: string; successBody?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      const el = e.currentTarget as HTMLFormElement;
      const fd = new FormData(el);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        company: String(fd.get("company") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        interest: String(fd.get("service") || "").trim(),
        standard: String(fd.get("standard") || "").trim(),
        message: String(fd.get("message") || "").trim(),
        consent: fd.get("gdpr") === "on",
        website: String(fd.get("website") || "").trim(), // honeypot
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit");
      }

      setSuccess(true);
      el.reset();
    } catch (err) {
      const msg = (err as Error).message || "Neizdevās nosūtīt formu";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase = "block w-full rounded-xl border px-3 py-2.5 md:py-3 text-sm text-neutral-900 bg-white outline-none focus:ring-2";
  const inputRing = "focus:ring-[color:var(--accent)] focus:border-[color:var(--accent)]";
  const inputBorder = "border-[color:var(--border)]";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot field */}
      <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.name}</label>
          <input type="text" name="name" required className={clsx(inputBase, inputBorder, inputRing)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.company}</label>
          <input type="text" name="company" className={clsx(inputBase, inputBorder, inputRing)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.email}</label>
          <input type="email" name="email" required className={clsx(inputBase, inputBorder, inputRing)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.phone}</label>
          <input type="tel" name="phone" className={clsx(inputBase, inputBorder, inputRing)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.serviceLabel}</label>
          <select name="service" className={clsx(inputBase, inputBorder, inputRing)}>
            {form.serviceOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-800 mb-1">{form.standardLabel}</label>
          <select name="standard" className={clsx(inputBase, inputBorder, inputRing)}>
            {form.standardOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-800 mb-1">{form.message}</label>
        <textarea name="message" rows={6} required className={clsx(inputBase, inputBorder, inputRing)} />
      </div>

      <div className="flex items-start gap-3">
        <input id="gdpr" name="gdpr" type="checkbox" required className="mt-1 h-4 w-4 rounded border-[color:var(--border)] text-[color:var(--accent)] focus:ring-[color:var(--accent)]" />
        <label htmlFor="gdpr" className="text-xs text-neutral-700 leading-5">{form.gdprText}</label>
      </div>

      <div className="pt-2">
        <button type="submit" className={clsx("btn btn-primary", submitting && "opacity-60 cursor-not-allowed")} disabled={submitting}>
          {form.submit}
        </button>
      </div>

      {(success || error) && (
        <div className="text-sm mt-3 space-y-2">
          {success && (
            <div className="border border-green-200 bg-green-50 text-green-800 rounded-lg p-3">
              <div className="font-medium">{successTitle || "✅ Thank you for reaching out."}</div>
              <div className="mt-1 text-green-700">{successBody || "Your message has been received and will be reviewed shortly. You will be contacted regarding your ISO consultancy request."}</div>
            </div>
          )}
          {error && <div className="text-red-600">{error}</div>}
        </div>
      )}
    </form>
  );
}
