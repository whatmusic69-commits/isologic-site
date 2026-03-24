import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";

type ServicesSection = {
  id: string; // anchor id
  title: string;
  subtitle?: string;
  description?: string;
  whatYouGetTitle?: string;
  items?: string[];
};

type StandardsSection = { title: string; intro?: string; items: string[] };
type WhyOutsourceSection = { title: string; intro?: string; items: string[] };

type ServicesContent = {
  hero: { title: string; subtitle?: string; intro?: string };
  sections: ServicesSection[];
  standardsSection?: StandardsSection;
  whyOutsourceSection?: WhyOutsourceSection;
};

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const content = await getPageContent<ServicesContent>("services", lang);

  return (
    <main>
      {/* Hero / Intro */}
      <section className="section">
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
        </Reveal>
        {content.hero.intro && (
          <div className="mt-4 max-w-3xl text-neutral-700">{content.hero.intro}</div>
        )}
      </section>

      {/* Services sections with anchors */}
      {content.sections?.map((sec, idx) => (
        <section key={sec.id || idx} id={sec.id} className="section">
          <Reveal>
            <SectionHeading alignment="left" title={sec.title} subtitle={sec.subtitle} />
          </Reveal>
          {sec.description && (
            <div className="mt-4 max-w-3xl text-neutral-700">{sec.description}</div>
          )}
          {sec.items && sec.items.length > 0 && (
            <div className="mt-8">
              {sec.whatYouGetTitle && (
                <h3 className="text-lg font-semibold text-neutral-900">{sec.whatYouGetTitle}</h3>
              )}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.items.map((it, i) => (
                  <Reveal key={i}>
                    <div className="card card-hover p-5 h-full">
                      <div className="flex items-start gap-3">
                        <span className="text-accent mt-1" aria-hidden>•</span>
                        <p className="text-sm leading-6 text-neutral-700">{it}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Standards we support */}
      {content.standardsSection && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.standardsSection.title} subtitle={content.standardsSection.intro} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.standardsSection.items.map((s, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-5 h-full">
                  <p className="text-sm leading-6 text-neutral-800">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Why outsource */}
      {content.whyOutsourceSection && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.whyOutsourceSection.title} subtitle={content.whyOutsourceSection.intro} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.whyOutsourceSection.items.map((w, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-5 h-full">
                  <p className="text-sm leading-6 text-neutral-800">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const content = await getPageContent<ServicesContent>("services", lang);
  const title = content?.hero?.title || "Services";
  const description = truncate(content?.hero?.subtitle || content?.hero?.intro || "");
  const { base, langs } = buildAlternates("/services");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/services`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/services` },
    twitter: { title, description: description || undefined },
  };
}
