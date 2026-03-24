import { notFound } from "next/navigation";
import { isValidLang } from "@/lib/i18n";
import { getPageContent } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

type ServiceDetail = {
  hero: { title: string; subtitle?: string };
  overview?: { title: string; text: string };
  benefits?: { title: string; items: Array<{ title: string; text: string }> };
  steps?: { title: string; items: Array<{ title: string; text: string }> };
};

const allowed = ["acceptance", "license", "risk-review", "internal-audit"] as const;
type ServiceKey = (typeof allowed)[number];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  if (!isValidLang(lang)) notFound();
  if (!allowed.includes(service as ServiceKey)) notFound();

  const content = await getPageContent<ServiceDetail>(`services/${service}`, lang);

  return (
    <main>
      <section className="section">
        <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
      </section>

      {content.overview && (
        <section className="section">
          <Reveal>
            <div className="card card-hover p-8">
              <h3 className="text-xl font-semibold">{content.overview.title}</h3>
              <p className="mt-3 text-neutral-700">{content.overview.text}</p>
            </div>
          </Reveal>
        </section>
      )}

      {content.benefits && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.benefits.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.benefits.items.map((b, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-6 h-full">
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-6">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {content.steps && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.steps.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.steps.items.map((s, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-6 h-full">
                  <div className="text-accent text-sm font-semibold">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-6">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
