import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/ui/service-card";
import Reveal from "@/components/ui/reveal";
import Button from "@/components/ui/button";
import VisualPanel from "@/components/ui/visual-panel";

type HomeContent = {
  hero: {
    title: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  intro?: { title: string; text?: string };
  servicesPreview?: { title: string; cards: Array<{ title: string; description: string }> };
  benefits?: { title: string; items: Array<{ title: string; text: string }> };
  stats?: { items: Array<{ value: string; label: string }> };
  ctaBand?: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string };
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const content = await getPageContent<HomeContent>("home", lang);

  return (
    <main>
      <HeroSection
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primaryCta={
          content.hero.primaryCtaLabel && content.hero.primaryCtaHref
            ? { label: content.hero.primaryCtaLabel, href: content.hero.primaryCtaHref }
            : undefined
        }
        secondaryCta={
          content.hero.secondaryCtaLabel && content.hero.secondaryCtaHref
            ? { label: content.hero.secondaryCtaLabel, href: content.hero.secondaryCtaHref }
            : undefined
        }
      />

      {content.intro && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="center" title={content.intro.title} subtitle={content.intro.text} />
          </Reveal>
        </section>
      )}

      {/* Decorative visual panel */}
      <section className="section">
        <VisualPanel src="/visuals/office.svg" />
      </section>

      {content.servicesPreview && (
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.servicesPreview.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.servicesPreview.cards.map((c, i) => (
              <Reveal key={i}>
                <ServiceCard title={c.title} description={c.description} />
              </Reveal>
            ))}
          </div>
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

      {content.stats && content.stats.items.length > 0 && (
        <section className="section-alt">
          <div className="section">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.stats.items.map((s, i) => (
                <Reveal key={i}>
                  <div className="card card-hover p-6 text-center">
                    <div className="text-2xl md:text-3xl font-semibold text-accent">{s.value}</div>
                    <div className="mt-1 text-sm text-neutral-600">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.ctaBand && (
        <section className="section-narrow">
          <div className="panel-dark card-hover p-8 md:p-10 text-center">
            <h3 className="text-2xl font-semibold">{content.ctaBand.title}</h3>
            {content.ctaBand.subtitle && (
              <p className="mt-2 text-neutral-300">{content.ctaBand.subtitle}</p>
            )}
            {content.ctaBand.ctaLabel && content.ctaBand.ctaHref && (
              <div className="mt-6">
                <a href={content.ctaBand.ctaHref} className="btn btn-primary">{content.ctaBand.ctaLabel}</a>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
