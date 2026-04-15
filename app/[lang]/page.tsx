import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/ui/service-card";
import Reveal from "@/components/ui/reveal";
import Button from "@/components/ui/button";
import VisualPanel from "@/components/ui/visual-panel";
import CtaBand from "@/components/ui/cta-band";
import FeatureGrid from "@/components/ui/feature-grid";
import StandardsSection from "@/components/ui/standards-section";
import OwnershipSection from "@/components/ui/ownership-section";
import TestimonialsSection from "@/components/ui/testimonials-section";
import IndustriesSection from "@/components/ui/industries-section";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";
import { languages } from "@/lib/i18n";

type HomeContent = {
  hero: {
    title: string;
    subtitle?: string;
    paragraphs?: string[];
    checklist?: string[];
    imageAlt?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  intro?: { title: string; text?: string };
  servicesPreview?: { title: string; cards: Array<{ title: string; description: string }> };
  benefits?: { title: string; items: Array<{ title: string; text: string }> };
  whyChoose?: { title: string; subtitle?: string; items: Array<{ title: string; description: string; icon?: string }> };
  standardsSection?: { title: string; subtitle?: string; ctaText?: string; ctaHref?: string; items?: Array<{ title: string; icon?: string }>; groups?: Array<{ title: string; bullets: string[] }> };
  ownershipSection?: { title: string; subtitle?: string; buttonText?: string; buttonHref?: string; items: Array<{ title: string; eyebrow?: string; description?: string; icon?: string }> };
  testimonialsSection?: { title: string; subtitle?: string; rotationIntervalMs?: number; items: Array<{ quote: string; authorName: string; authorRole?: string; company?: string; rating?: number }> };
  industriesSection?: { title: string; subtitle?: string; items: Array<{ title: string; icon?: string }> };
  stats?: { items: Array<{ value: string; label: string }> };
  ctaBand?: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string; secondaryLabel?: string; secondaryHref?: string };
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
        paragraphs={content.hero.paragraphs}
        checklist={content.hero.checklist}
        imageSrc="/homePage.jpg"
        imageAlt={content.hero.imageAlt}
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

      {/* As requested by the client, remove the "Trusted partner..." intro text block entirely */}

      {content.industriesSection && (
        <IndustriesSection title={content.industriesSection.title} subtitle={content.industriesSection.subtitle} items={content.industriesSection.items} />
      )}

      {content.standardsSection ? (
        <StandardsSection
          title={content.standardsSection.title}
          subtitle={content.standardsSection.subtitle}
          ctaText={content.standardsSection.ctaText}
          ctaHref={content.standardsSection.ctaHref}
          items={content.standardsSection.items || []}
          groups={content.standardsSection.groups}
        />
      ) : content.servicesPreview ? (
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
      ) : null}

      {content.whyChoose ? (
        <FeatureGrid title={content.whyChoose.title} subtitle={content.whyChoose.subtitle} items={content.whyChoose.items} />
      ) : content.benefits ? (
        // Fallback to the previous layout if legacy content is present
        <section className="section">
          <Reveal>
            <SectionHeading alignment="left" title={content.benefits.title} />
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.benefits.items.map((b, i) => (
              <Reveal key={i}>
                <div className="card card-hover p-6 h-full">
                  <h3 className="text-lg md:text-xl font-semibold leading-tight break-words hyphens-auto">{b.title}</h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-6">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {content.stats && content.stats.items.length > 0 && (
        <section className="section-alt">
          <div className="section">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.stats.items.map((s, i) => (
                <Reveal key={i}>
                  <div className="card relative overflow-hidden card-hover p-6 text-center before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-accent before:rounded-t-2xl before:content-['']">
               <div className="text-xl md:text-2xl font-semibold text-black leading-tight break-words">{s.value}</div>
                    <div className="mt-1 text-sm text-neutral-600">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.ownershipSection && (
        <OwnershipSection
          title={content.ownershipSection.title}
          subtitle={content.ownershipSection.subtitle}
          buttonText={content.ownershipSection.buttonText}
          buttonHref={content.ownershipSection.buttonHref}
          items={content.ownershipSection.items}
        />
      )}

      {(content.testimonialsSection?.items?.length ?? 0) > 0 && (
        <TestimonialsSection
          title={content.testimonialsSection?.title ?? ""}
          subtitle={content.testimonialsSection?.subtitle}
          rotationIntervalMs={content.testimonialsSection?.rotationIntervalMs}
          items={content.testimonialsSection?.items ?? []}
        />
      )}

      {content.ctaBand && (
        <section className="section-narrow">
          <CtaBand
            title={content.ctaBand.title}
            subtitle={content.ctaBand.subtitle}
            ctaLabel={content.ctaBand.ctaLabel}
            ctaHref={content.ctaBand.ctaHref}
            secondaryLabel={content.ctaBand.secondaryLabel}
            secondaryHref={content.ctaBand.secondaryHref}
          />
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const content = await getPageContent<HomeContent>("home", lang);
  const title = content?.hero?.title || "Home";
  const description = truncate(content?.hero?.subtitle || content?.intro?.text || "");
  const { base, langs } = buildAlternates("");
  const image = `${base}/homePage.jpg`;
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `${base}/${lang}`, languages: langs },
    openGraph: {
      title,
      description: description || undefined,
      url: `${base}/${lang}`,
      images: [{ url: image, alt: content?.hero?.imageAlt || title }],
    },
    twitter: {
      title,
      description: description || undefined,
      images: [image],
      card: "summary_large_image",
    },
  };
}
