import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ValueCard from "@/components/ui/value-card";
import ContactForm, { ContactFormSchema } from "@/components/ui/contact-form";
import Image from "next/image";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";

type AboutContent = {
  hero: { title: string; subtitle?: string };
  description?: string[];
  mission?: { title: string; text: string };
  values?: { title: string; items: Array<{ title: string; text: string }> };
  expertise?: { title: string; items: Array<{ title: string; text: string }> };
  languageSupportText?: string;
};

// New v2 structure for About page (English initially)
type AboutV2 = {
  v2?: boolean;
  hero: { title: string; subtitle?: string; text?: string };
  imageSection?: { imageAlt?: string; paragraphs: string[] };
  cta?: { text: string; buttonLabel: string; targetId?: string };
  coreExpertise?: { paragraphs: string[] };
  foodSupport?: { paragraphs: string[]; ctaText?: string; buttonLabel?: string };
  additionalExpertise?: { paragraphs: string[] };
};

type AboutPrinciples = {
  principlesSection?: {
    cards: Array<{ title: string; text: string }>;
    statement: string;
  };
};

type ContactPageContent = {
  contactPage: {
    title: string;
    subtitle?: string;
    ctaText?: string;
    asideTitle?: string;
    asideSubtitle?: string;
    successTitle?: string;
    successBody?: string;
    form: ContactFormSchema;
  };
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const aboutRaw = await getPageContent<any>("about", lang);
  const principles: AboutPrinciples["principlesSection"] | undefined = (aboutRaw as AboutPrinciples)?.principlesSection;

  // If the new v2 structure is present, render the new layout
  const v2: AboutV2 | null = (aboutRaw && (aboutRaw.v2 || aboutRaw.imageSection || aboutRaw.coreExpertise)) ? (aboutRaw as AboutV2) : null;

  if (v2) {
    const contact = await getPageContent<ContactPageContent>("contact", lang);
    const hero = v2.hero || { title: "About" };

    return (
      <main>
        {/* Section 1 — Hero / Intro */}
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={hero.title} subtitle={hero.subtitle} />
          </Reveal>
          {hero.text && (
            <div className="mt-4 max-w-3xl text-neutral-700">
              {hero.text}
            </div>
          )}
        </section>

        

        {/* Section 2 — Image + Text */}
        {v2.imageSection && (
          <section className="section section-tight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {/* Image */}
              <Reveal>
                <div className="card overflow-hidden relative aspect-[16/9] md:aspect-auto md:h-full">
                  <Image
                    src="/AboutUs.jpg"
                    alt={v2.imageSection.imageAlt || "About ISOlogic"}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={false}
                    className="object-cover"
                  />
                </div>
              </Reveal>
              {/* Text */}
              <Reveal>
                <div className="card card-hover p-6 md:p-8 text-neutral-700">
                  {v2.imageSection.paragraphs.map((p, i) => (
                    <p key={i} className={i === 0 ? "text-neutral-900 font-semibold" : "mt-4"}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Section 3 — CTA */}
        {v2.cta && (
          <section className="section-narrow section-tight">
            <div className="card card-hover p-8 text-center">
              <h3 className="text-xl font-semibold text-neutral-900">{v2.cta.text}</h3>
              <div className="mt-4">
                <a href={`#${v2.cta.targetId || "contact"}`} className="btn btn-primary">{v2.cta.buttonLabel}</a>
              </div>
            </div>
          </section>
        )}

        {/* Section 4 — Core Expertise */}
        {v2.coreExpertise && (
          <section className="section section-compact">
            <Reveal>
              <div className="card card-hover p-6 md:p-8 text-neutral-700">
                {v2.coreExpertise.paragraphs.map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : undefined}>{p}</p>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Section 5 — Food Business Support */}
        {v2.foodSupport && (
          <section className="section section-compact">
            <Reveal>
              <div className="card card-hover p-6 md:p-8 text-neutral-700">
                {v2.foodSupport.paragraphs.map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : undefined}>{p}</p>
                ))}
                {(v2.foodSupport.ctaText || v2.foodSupport.buttonLabel) && (
                  <div className="mt-5 text-center">
                    {v2.foodSupport.ctaText && (
                      <div className="mb-3 text-neutral-900 font-medium">{v2.foodSupport.ctaText}</div>
                    )}
                    <a href="#contact" className="btn btn-primary">{v2.foodSupport.buttonLabel || "Contact us"}</a>
                  </div>
                )}
              </div>
            </Reveal>
          </section>
        )}

        {/* Section 6 — Additional Expertise */}
        {v2.additionalExpertise && (
          <section className="section section-compact">
            <Reveal>
              <div className="card card-hover p-6 md:p-8 text-neutral-700">
                {v2.additionalExpertise.paragraphs.map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : undefined}>{p}</p>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Restored 3-card + statement block — directly above contact form */}
        {principles && (
          <section className="section section-compact">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {principles.cards.map((c, i) => (
                  <div key={i} className="card card-hover p-6 h-full">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="mt-3 text-neutral-600 text-sm leading-6">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 md:mt-6">
                <div className="max-w-3xl mx-auto">
                  <div className="card card-hover p-6 md:p-8 text-center text-neutral-800">
                    <span dangerouslySetInnerHTML={{ __html: principles.statement }} />
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* Section 7 — Contact Form */}
        <section id="contact" className="section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* LEFT: text block reusing contact content copy */}
            <Reveal>
              <div className="card card-hover p-6 md:p-8 md:self-start">
                <h3 className="text-xl font-semibold text-neutral-900">{contact.contactPage.asideTitle || contact.contactPage.title}</h3>
                {contact.contactPage.asideSubtitle && (
                  <p className="mt-3 text-neutral-700">{contact.contactPage.asideSubtitle}</p>
                )}
              </div>
            </Reveal>
            {/* RIGHT: form */}
            <Reveal>
              <div className="card card-hover p-6 md:p-8">
                <ContactForm form={contact.contactPage.form} successTitle={contact.contactPage.successTitle} successBody={contact.contactPage.successBody} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    );
  }

  const content = aboutRaw as AboutContent;

  return (
    <main>
      <section className="section">
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
        </Reveal>
      </section>

      {/* Removed large visual panel section as requested */}

      

      {content.description && content.description.length > 0 && (
        // Tighter spacing for intro block
        <section className="section section-compact">
          <Reveal>
            <div className="card card-hover p-8">
              <div className="space-y-4 text-neutral-700">
                {content.description.map((p, i) => (
                  <p key={i}>
                    {/* Emphasize specific words only on EN as requested */}
                    {lang === "en"
                      ? p
                          .split(/(professional|practical|objective)/gi)
                          .map((part, idx) =>
                            /^(professional|practical|objective)$/i.test(part) ? (
                              <strong key={idx}>{part}</strong>
                            ) : (
                              <span key={idx}>{part}</span>
                            )
                          )
                      : p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {content.mission && (
        // Tighter spacing for mission block
        <section className="section section-compact" style={{ paddingBottom: "1rem" }}>
          <Reveal>
            <div className="card card-hover p-8">
              <h3 className="text-xl font-semibold">
                {/* For EN, emphasize the key phrase within the title; keep prefix normal */}
                {lang === "en"
                  ? (() => {
                      const title = content.mission.title;
                      const m = title.match(/^(Our Mission:\s*)(.*)$/);
                      if (m) {
                        return (
                          <>
                            <span className="font-normal">{m[1]}</span>
                            <span className="font-semibold">{m[2]}</span>
                          </>
                        );
                      }
                      return title;
                    })()
                  : content.mission.title}
              </h3>
              <p className="mt-3 text-neutral-700">{content.mission.text}</p>
            </div>
          </Reveal>
        </section>
      )}

      {content.values && (
        // Pull the section upward for better flow (reduce top padding more)
        <section className="section section-compact" style={{ paddingTop: "1rem" }}>
          <Reveal>
            <SectionHeading alignment="left" title={content.values.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.values.items.map((v, i) => (
              <Reveal key={i}>
                <ValueCard title={v.title} text={v.text} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {content.expertise && (
        <section className="section section-tight">
          <Reveal>
            <SectionHeading alignment="left" title={content.expertise.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.expertise.items.map((e, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-6 h-full">
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-6">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {content.languageSupportText && (
        <section className="section-narrow section-tight">
          <Reveal>
            <div className="card card-hover p-8 text-center">
              <p className="text-neutral-800">
                {lang === "en"
                  ? content.languageSupportText
                      ?.split(/(English|Latvian|Russian)/g)
                      .map((part, idx) =>
                        /^(English|Latvian|Russian)$/.test(part) ? (
                          <strong key={idx}>{part}</strong>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )
                  : content.languageSupportText}
              </p>
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const aboutRaw = await getPageContent<any>("about", lang);
  const isV2 = !!(aboutRaw && (aboutRaw.v2 || aboutRaw.imageSection || aboutRaw.coreExpertise));
  const title = isV2 ? (aboutRaw?.hero?.title ?? "About") : (aboutRaw?.hero?.title ?? "About");
  const description = truncate(
    isV2 ? (aboutRaw?.hero?.text || aboutRaw?.hero?.subtitle || "") : (aboutRaw?.hero?.subtitle || aboutRaw?.mission?.text || "")
  );
  const { base, langs } = buildAlternates("/about");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/about`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/about` },
    twitter: { title, description: description || undefined },
  };
}
