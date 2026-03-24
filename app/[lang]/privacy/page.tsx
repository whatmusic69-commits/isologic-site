import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLang } from "@/lib/i18n";
import { getPageContent } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { buildAlternates, truncate } from "@/lib/seo";

type PrivacySection = {
  number?: string | number;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type PrivacyContent = {
  hero: { title: string; subtitle?: string; lastUpdated?: string };
  sections: PrivacySection[];
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const content = await getPageContent<PrivacyContent>("privacy", lang);

  return (
    <main>
      <section className="section section-compact">
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
        </Reveal>
        {content.hero.lastUpdated && (
          <div className="mt-3 text-sm text-neutral-600">{content.hero.lastUpdated}</div>
        )}
      </section>

      {content.sections?.map((sec, i) => (
        <section key={i} className="section section-compact">
          <Reveal>
            <div className="card card-hover p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold">
                {sec.number ? `${sec.number}. ` : ""}{sec.title}
              </h3>
              {sec.paragraphs?.map((p, idx) => (
                <p key={idx} className="mt-3 text-neutral-700">{p}</p>
              ))}
              {sec.items && sec.items.length > 0 && (
                <ul className="mt-4 list-disc pl-5 text-neutral-700 space-y-1">
                  {sec.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </section>
      ))}
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const content = await getPageContent<PrivacyContent>("privacy", lang);
  const title = content?.hero?.title || "Privacy Policy";
  const description = truncate(content?.hero?.subtitle || content?.sections?.[0]?.paragraphs?.[0] || "");
  const { base, langs } = buildAlternates("/privacy");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/privacy`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/privacy` },
    twitter: { title, description: description || undefined },
  };
}
