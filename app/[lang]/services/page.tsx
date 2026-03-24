import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/ui/service-card";
import Reveal from "@/components/ui/reveal";
import VisualPanel from "@/components/ui/visual-panel";

type ServicesContent = {
  hero: { title: string; subtitle?: string };
  services: { title: string; items: Array<{ title: string; description: string }> };
  process?: { title: string; steps: Array<{ title: string; text: string }> };
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const content = await getPageContent<ServicesContent>("services", lang);

  return (
    <main>
      <section className="section">
        <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
      </section>

      <section className="section">
        <VisualPanel src="/visuals/shield.svg" />
      </section>

      <section className="section">
        {/* Anchor targets for navbar dropdown items */}
        <div id="acceptance" className="sr-only" aria-hidden />
        <div id="license" className="sr-only" aria-hidden />
        <div id="risk-review" className="sr-only" aria-hidden />
        <div id="internal-audit" className="sr-only" aria-hidden />
        <Reveal>
          <SectionHeading alignment="left" title={content.services.title} />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.items.map((s, i) => (
            <Reveal key={i}>
              <ServiceCard title={s.title} description={s.description} />
            </Reveal>
          ))}
        </div>
      </section>

      {content.process && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.process.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.process.steps.map((step, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-6 h-full">
                  <div className="text-accent text-sm font-semibold">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-neutral-400 text-sm leading-6">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
