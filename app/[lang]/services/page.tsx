import { notFound } from "next/navigation";
import type { JSX } from "react";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";
import CollapsibleSection from "@/components/ui/collapsible-section";
import HashAccordionOpener from "@/components/ui/hash-accordion-opener";
import CtaBand from "@/components/ui/cta-band";
import Image from "next/image";
import {
  DocumentIcon,
  GlobeIcon,
  LeafIcon,
  ShieldIcon,
  HardHatIcon,
  FoodIcon,
  SearchIcon,
  UsersIcon,
  ClipboardCheckIcon,
  BadgeCheckIcon,
  CalendarIcon,
  ReportIcon,
  ToolsIcon,
  RefreshIcon,
  ActivityIcon,
  SupportIcon,
  BuildingIcon,
  NetworkIcon,
} from "@/components/ui/icons";

type ServicesSection = {
  id: string; // anchor id
  title: string;
  subtitle?: string;
  description?: string;
  whatYouGetTitle?: string;
  items?: string[];
  pricingTimeline?: { title: string; paragraphs: string[] };
  note?: string;
  ctaText?: string;
  ctaButtonLabel?: string;
  extraParagraphs?: string[];
};

type StandardsSection = { title: string; intro?: string; items: string[] };
type WhyOutsourceSection = { title: string; intro?: string; items: string[] };

type ServicesContent = {
  hero: { title: string; subtitle?: string; intro?: string };
  sections: ServicesSection[];
  standardsSection?: StandardsSection;
  whyOutsourceSection?: WhyOutsourceSection;
  bottomSection?: { paragraphs: string[] };
  ctaBand?: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string; secondaryLabel?: string; secondaryHref?: string };
};

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const content = await getPageContent<ServicesContent>("services", lang);

  return (
    <main>
      {/* Client-side: open correct section based on URL hash */}
      <HashAccordionOpener />
      {/* Hero (compact, title only) */}
      <section className="section section-compact" style={{ paddingBottom: "1.25rem" }}>
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} />
        </Reveal>
      </section>

      {/* Services sections as collapsible blocks */}
          <section className="section section-compact" style={{ paddingTop: 0 }}>
        <div className="space-y-4">
          {content.sections?.map((sec, idx) => {
            const img = pickServiceImage(sec.id);
            // const imageFirst = idx % 2 === 0; // alternate left/right on desktop

            return (
              <Reveal key={sec.id || idx}>
                <div id={sec.id}>
                  <CollapsibleSection title={sec.title} subtitle={sec.subtitle} defaultOpen={false}>
                    {/* Intro: for sections with image → 2-col row; without image → full-width text */}
                                       {img ? (
  <div className="relative">
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-5 lg:gap-0 items-start">
      {/* Image */}
      <div className="relative z-0">
        <div className="relative overflow-hidden rounded-[28px] bg-neutral-100">
          <div className="relative w-full h-[260px] md:h-[360px] lg:h-[430px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text strips */}
      {sec.description && (
        <div className="relative z-10 mt-4 lg:mt-0 lg:-ml-24 xl:-ml-28 lg:pt-8 flex flex-col gap-4">
          {splitDescriptionBlocks(sec.description).slice(0, 3).map((paragraph, i) => (
            <div
              key={i}
              className={[
                "bg-white/95 border border-black/8",
                "rounded-[22px]",
                "px-5 py-4 md:px-6 md:py-5",
                "text-neutral-700 text-base md:text-lg leading-8",
                "shadow-[0_10px_28px_rgba(0,0,0,0.06)]",
                i === 0
                  ? "lg:max-w-[78%]"
                  : i === 1
                    ? "lg:max-w-[92%] lg:ml-12"
                    : "lg:max-w-[84%]"
              ].join(" ")}
            >
              {paragraph}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
) : (
  sec.description ? (
    <div className="text-neutral-700 whitespace-pre-line">
      {sec.description}
    </div>
  ) : null
)}

                    {/* What You Get cards */}
                    {sec.items && sec.items.length > 0 && (
                      <div className="mt-6">
                        {sec.whatYouGetTitle && (
                          <h3 className="text-base md:text-lg font-semibold text-neutral-900">{sec.whatYouGetTitle}</h3>
                        )}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {sec.items.map((raw, i) => {
                            const [title, ...rest] = String(raw).split(":");
                            const heading = title.trim();
                            const body = rest.join(":").trim();
                            const Icon = pickServiceIcon(heading);
                            return (
                              <div key={i} className="card card-hover p-5 h-full">
                                <div className="flex items-start gap-3">
                                  {Icon && <Icon className="mt-0.5 w-7 h-7 text-neutral-900" />}
                                  <div>
                                    <div className="text-sm font-semibold tracking-wide text-neutral-900">{heading.toUpperCase()}</div>
                                    {body && <p className="mt-1 text-sm leading-6 text-neutral-700">{body}</p>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Optional pricing/timeline after cards */}
                    {sec.pricingTimeline && (
                      <div className="mt-6 card card-hover p-5 md:p-6">
                        <h3 className="text-base md:text-lg font-semibold text-neutral-900">{sec.pricingTimeline.title}</h3>
                        <div className="mt-3 space-y-3 text-neutral-700">
                          {sec.pricingTimeline.paragraphs.map((p, i) => (
                            <p key={i} className="text-sm md:text-base leading-6">{p}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Optional note & CTA after cards/pricing */}
                    {sec.note && (
                      <p className="mt-6 text-neutral-700">{sec.note}</p>
                    )}
                    {sec.ctaText && (
                      <div className="mt-6 card card-hover p-5 md:p-6">
                        <div className="text-neutral-900 font-medium">{sec.ctaText}</div>
                        <div className="mt-3">
                          <a href={`/${lang}/contact`} className="btn btn-primary">{sec.ctaButtonLabel || "Contact us"}</a>
                        </div>
                      </div>
                    )}

                    {/* Additional paragraphs (e.g., Lead Auditor availability inside the section) */}
                    {sec.extraParagraphs && sec.extraParagraphs.length > 0 && (
                      <div className="mt-6 card card-hover p-5 md:p-6">
                        <div className="space-y-3 text-neutral-700">
                          {sec.extraParagraphs.map((p, i) => (
                            <p key={i} className="text-sm md:text-base leading-6">{p}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </CollapsibleSection>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Standards we support */}
      {content.standardsSection && (
        <section className="section section-compact">
          <Reveal>
            <SectionHeading alignment="left" title={content.standardsSection.title} subtitle={content.standardsSection.intro} />
          </Reveal>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.standardsSection.items
              .filter((s) => !/ISO\s*20000|ISO\s*22301|ISO\s*27017/i.test(s))
              .map((s, i) => {
                const Icon = pickStandardIcon(s);
                return (
                  <div key={i} className="card card-hover p-5 h-full">
                    <div className="flex items-start gap-3">
                      {Icon && <Icon className="mt-0.5 w-7 h-7 text-neutral-900" />}
                      <div>
                        <div className="text-sm font-semibold tracking-wide text-neutral-900">{s.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Why outsource */}
      {content.whyOutsourceSection && (
        <section className="section section-compact">
          <Reveal>
            <SectionHeading alignment="left" title={content.whyOutsourceSection.title} subtitle={content.whyOutsourceSection.intro} />
          </Reveal>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.whyOutsourceSection.items.map((w, i) => {
              const [lead, ...rest] = String(w).split(":");
              const body = rest.join(":").trim();
              return (
                <div
                  key={i}
                  className="card relative overflow-hidden pl-6 card-hover p-5 h-full before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-accent before:content-['']"
                >
                  <div className="text-sm font-semibold tracking-wide text-neutral-900">{lead.trim().toUpperCase()}</div>
                  {body && <p className="mt-1 text-sm leading-6 text-neutral-800">{body}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA at bottom (matches Ready to Get Started? design) */}
      {content.ctaBand && (
        <section className="section-narrow" style={{ paddingTop: 0 }}>
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

      {/* Removed separate bottom notes block: integrated into Lead Auditing section */}
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

type IconType = (props: { className?: string }) => JSX.Element;

function splitDescriptionBlocks(text: string): string[] {
  const byParagraph = text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (byParagraph.length > 1) return byParagraph;

  const sentences =
    text
      .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
      ?.map((s) => s.trim())
      .filter(Boolean) ?? [text];

  if (sentences.length <= 2) return [text];

  const targetBlocks = Math.min(3, sentences.length);
  const perBlock = Math.ceil(sentences.length / targetBlocks);
  const blocks: string[] = [];

  for (let i = 0; i < sentences.length; i += perBlock) {
    blocks.push(sentences.slice(i, i + perBlock).join(" "));
  }

  return blocks;
}

function pickServiceIcon(title: string): IconType | null {
  const t = title.toLowerCase();
  if (t.includes("gap")) return SearchIcon;
  if (t.includes("documentation") || t.includes("document")) return DocumentIcon;
  if (t.includes("training") || t.includes("staff")) return UsersIcon;
  if (t.includes("internal") && t.includes("audit")) return ClipboardCheckIcon;
  if (t.includes("certification")) return BadgeCheckIcon;
  if (t.includes("planning") || t.includes("program")) return CalendarIcon;
  if (t.includes("execution") || t.includes("report")) return ReportIcon;
  if (t.includes("corrective") || t.includes("follow-up") || t.includes("follow up")) return ToolsIcon;
  if (t.includes("health") || t.includes("checks")) return ActivityIcon;
  if (t.includes("surveillance")) return ShieldIcon;
  if (t.includes("regulatory") || t.includes("updates")) return RefreshIcon;
  if (t.includes("advisory") || t.includes("ongoing")) return SupportIcon;
  if (t.includes("lead")) return ClipboardCheckIcon;
  if (t.includes("implementation")) return DocumentIcon;
  if (t.includes("maintenance")) return ToolsIcon;
  return DocumentIcon;
}

function pickStandardIcon(s: string): IconType | null {
  const t = s.toLowerCase();
  if (/9001/.test(t)) return DocumentIcon; // quality / document
  if (/9100|as9100/.test(t)) return GlobeIcon; // aerospace / globe
  if (/14001/.test(t)) return LeafIcon; // environmental
  if (/27001/.test(t)) return ShieldIcon; // security
  if (/45001/.test(t)) return HardHatIcon; // health & safety
  if (/22000|haccp/.test(t)) return FoodIcon; // food safety
  return DocumentIcon;
}

function pickServiceImage(id: string): { src: string; alt: string } | null {
  switch (id) {
    case "implementation":
      return { src: "/ServicesGlasses.jpg", alt: "ISO Implementation / Certification" };
    case "internal-auditing":
      return { src: "/ServicesLaptop.jpg", alt: "Internal Auditing" };
    case "iso-maintenance":
      return { src: "/ServicesWarehouse.jpg", alt: "ISO Maintenance / Support" };
    case "food-safety-haccp":
      return { src: "/ServicesGrocery.jpg", alt: "Food Safety & HACCP Compliance" };
    default:
      return null;
  }
}
