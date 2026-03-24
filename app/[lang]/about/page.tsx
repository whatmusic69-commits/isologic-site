import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import ValueCard from "@/components/ui/value-card";
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const content = await getPageContent<AboutContent>("about", lang);

  return (
    <main>
      <section className="section">
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
        </Reveal>
      </section>

      {/* Removed large visual panel section as requested */}

      {content.description && content.description.length > 0 && (
        <section className="section section-tight">
          <Reveal>
            <div className="card card-hover p-8">
              <div className="space-y-4 text-neutral-700">
                {content.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {content.mission && (
        <section className="section section-tight">
          <Reveal>
            <div className="card card-hover p-8">
              <h3 className="text-xl font-semibold">{content.mission.title}</h3>
              <p className="mt-3 text-neutral-700">{content.mission.text}</p>
            </div>
          </Reveal>
        </section>
      )}

      {content.values && (
        <section className="section section-tight">
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
        <section className="section">
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
              <p className="text-neutral-800">{content.languageSupportText}</p>
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
  const content = await getPageContent<AboutContent>("about", lang);
  const title = content?.hero?.title || "About";
  const description = truncate(content?.hero?.subtitle || content?.mission?.text || "");
  const { base, langs } = buildAlternates("/about");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/about`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/about` },
    twitter: { title, description: description || undefined },
  };
}
