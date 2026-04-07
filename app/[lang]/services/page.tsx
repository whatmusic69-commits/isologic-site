import { notFound } from "next/navigation";
import type { JSX } from "react";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import type { Metadata } from "next";
import { buildAlternates, truncate } from "@/lib/seo";
import CollapsibleSection from "@/components/ui/collapsible-section";
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
      {/* Hero (compact, title only) */}
      <section className="section section-compact" style={{ paddingBottom: "1.25rem" }}>
        <Reveal>
          <SectionHeading alignment="left" title={content.hero.title} />
        </Reveal>
      </section>

      {/* Services sections as collapsible blocks */}
      <section className="section section-compact" style={{ paddingTop: 0 }}>
        <div className="space-y-4">
          {content.sections?.map((sec, idx) => (
            <Reveal key={sec.id || idx}>
              <div id={sec.id}>
                <CollapsibleSection title={sec.title} subtitle={sec.subtitle} defaultOpen={false}>
                  {sec.description && (
                    <div className="max-w-3xl text-neutral-700">{sec.description}</div>
                  )}
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
                                  <div className="text-sm font-semibold tracking-wide text-neutral-900">
                                    {heading.toUpperCase()}
                                  </div>
                                  {body && (
                                    <p className="mt-1 text-sm leading-6 text-neutral-700">{body}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CollapsibleSection>
              </div>
            </Reveal>
          ))}
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
                <div key={i} className="card card-hover p-5 h-full">
                  <div className="text-sm font-semibold tracking-wide text-neutral-900">{lead.trim().toUpperCase()}</div>
                  {body && <p className="mt-1 text-sm leading-6 text-neutral-800">{body}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA at bottom */}
      <section className="section-narrow" style={{ paddingTop: 0 }}>
        <div className="card card-hover p-8 text-center">
          <h3 className="text-xl font-semibold">{lang === "lv" ? "Sazinieties ar mums" : lang === "ru" ? "Свяжитесь с нами" : "Contact us"}</h3>
          <div className="mt-4">
            <a href={`/${lang}/contact`} className="btn btn-primary">{lang === "lv" ? "Atvērt kontaktu formu" : lang === "ru" ? "Открыть форму" : "Open contact form"}</a>
          </div>
        </div>
      </section>
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
