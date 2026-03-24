import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import FAQAccordion, { FaqItem } from "@/components/ui/faq-accordion";

type FaqContent = {
  hero: { title: string; subtitle?: string };
  items: FaqItem[];
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
      <section className="section">
        <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
      </section>

      <section className="section">
        <FAQAccordion items={content.items} />
      </section>
    </main>
  );
}
