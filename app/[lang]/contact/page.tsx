import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { isValidLang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import Button from "@/components/ui/button";
import VisualPanel from "@/components/ui/visual-panel";

type ContactContent = {
  hero: { title: string; subtitle?: string };
  details: { email: string; phone: string; address: string; ctaLabel?: string };
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const content = await getPageContent<ContactContent>("contact", lang);

  return (
    <main>
      <section className="section">
        <SectionHeading alignment="left" title={content.hero.title} subtitle={content.hero.subtitle} />
      </section>

      <section className="section">
        <VisualPanel src="/visuals/office.svg" />
      </section>

      <section className="section grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal>
          <div className="card card-hover p-6">
            <p className="text-sm text-neutral-600">Email</p>
            <p className="mt-1 font-medium">{content.details.email}</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="card card-hover p-6">
            <p className="text-sm text-neutral-600">Phone</p>
            <p className="mt-1 font-medium">{content.details.phone}</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="card card-hover p-6">
            <p className="text-sm text-neutral-600">Address</p>
            <p className="mt-1 font-medium">{content.details.address}</p>
          </div>
        </Reveal>
      </section>

      {content.details.ctaLabel && (
        <section className="section-narrow">
          <div className="card card-hover p-8 text-center">
            <h3 className="text-xl font-semibold">{content.details.ctaLabel}</h3>
            <div className="mt-4"><a href={`mailto:${content.details.email}`} className="btn btn-primary">{content.details.ctaLabel}</a></div>
          </div>
        </section>
      )}
    </main>
  );
}
