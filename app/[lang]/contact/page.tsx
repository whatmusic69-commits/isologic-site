import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";
import ContactForm, { ContactFormSchema } from "@/components/ui/contact-form";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/icons";
import servicesTranslations from "@/content/translations/services.json";

type ContactPageContent = {
  contactPage: {
    title: string;
    subtitle?: string;
    ctaText?: string;
    asideTitle?: string;
    asideSubtitle?: string;
    contactDetails?: {
      email?: string;
      phone?: string;
      phoneHref?: string;
      address?: string;
      addressUrl?: string;
    };
    successTitle?: string;
    successBody?: string;
    form: ContactFormSchema;
  };
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const content = await getPageContent<ContactPageContent>("contact", lang);

  const page = content.contactPage;
  const email = page.contactDetails?.email?.trim();
  const phoneLabel = page.contactDetails?.phone?.trim();
  const phoneHref = page.contactDetails?.phoneHref?.trim() || phoneLabel?.replace(/\s+/g, "");
  const address = page.contactDetails?.address?.trim();
  const addressUrl = page.contactDetails?.addressUrl?.trim();
  // Map service option slugs to localized labels from shared translations.
  const svc = (servicesTranslations as any)[lang as keyof typeof servicesTranslations]?.contact || {};
  const formWithMappedServices: ContactFormSchema = {
    ...page.form,
    serviceOptions: page.form.serviceOptions.map((opt: string) => (opt in svc ? svc[opt as keyof typeof svc] : opt)),
  };

  return (
    <main>
      {/* 1. INTRO / HERO BLOCK */}
      <section className="section">
        <Reveal>
          <SectionHeading alignment="left" title={page.title} subtitle={page.subtitle} />
        </Reveal>
        {page.ctaText && (
          <div className="mt-4 max-w-3xl text-neutral-700">{page.ctaText}</div>
        )}
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* LEFT: text content */}
          <Reveal>
            <div className="card card-hover p-6 md:p-8 md:self-start">
              {page.asideTitle && (
                <h3 className="text-xl font-semibold text-neutral-900">{page.asideTitle}</h3>
              )}
              {page.asideSubtitle && (
                <p className="mt-3 text-neutral-700">{page.asideSubtitle}</p>
              )}
              {/* Inline contact details moved here to sit next to the form */}
              <div className="mt-4">
                <ul className="space-y-2 text-sm text-neutral-800">
                  {email && (
                    <li className="flex items-start gap-2">
                      <MailIcon className="mt-0.5 w-4 h-4 text-accent" />
                      <a className="hover:text-accent transition-colors" href={`mailto:${email}`}>{email}</a>
                    </li>
                  )}
                  {phoneLabel && phoneHref && (
                    <li className="flex items-start gap-2">
                      <PhoneIcon className="mt-0.5 w-4 h-4 text-accent" />
                      <a className="hover:text-accent transition-colors" href={`tel:${phoneHref}`}>{phoneLabel}</a>
                    </li>
                  )}
                  {address && addressUrl && (
                    <li className="flex items-start gap-2">
                      <MapPinIcon className="mt-0.5 w-4 h-4 text-accent" />
                      <a
                        className="hover:text-accent transition-colors"
                        href={addressUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {address}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: form */}
          <Reveal>
            <div className="card card-hover p-6 md:p-8">
              <ContactForm form={formWithMappedServices} successTitle={page.successTitle} successBody={page.successBody} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const content = await getPageContent<ContactPageContent>("contact", lang);
  const title = content?.contactPage?.title || "Contact";
  const description = truncate(content?.contactPage?.subtitle || "");
  const { base, langs } = buildAlternates("/contact");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/contact`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/contact` },
    twitter: { title, description: description || undefined },
  };
}
