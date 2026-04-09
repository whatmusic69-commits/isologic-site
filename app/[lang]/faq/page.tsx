import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import FAQAccordion, { FaqItem } from "@/components/ui/faq-accordion";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";

type FaqContent = {
  hero: { title: string; subtitle?: string };
  items: FaqItem[];
  ctaBand?: { title: string; buttonText: string };
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const content = await getPageContent<FaqContent>("faq", lang);

  return (
    <main>
      <section className="section section-compact">
        <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
      </section>

      <section className="section section-compact" style={{ paddingTop: 0 }}>
        <FAQAccordion items={content.items} />
      </section>

      {content.ctaBand && (
        <section className="section-narrow">
          <div className="card card-hover p-8 text-center">
            <h3 className="text-xl font-semibold">{content.ctaBand.title}</h3>
            <div className="mt-4">
              <a href={`/${lang}/contact`} className="btn btn-primary">{content.ctaBand.buttonText}</a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const content = await getPageContent<FaqContent>("faq", lang);
  const title = content?.hero?.title || "FAQs";
  const description = truncate(content?.hero?.subtitle || "");
  const { base, langs } = buildAlternates("/faq");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}/faq`, languages: langs },
    openGraph: { title, description: description || undefined, url: `${base}/${lang}/faq` },
    twitter: { title, description: description || undefined },
  };
}
