import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLang } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { languages } from "@/lib/i18n";
import { getBaseUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const base = getBaseUrl();
  // Build hreflang alternates for all supported languages
  const langs: Record<string, string> = Object.fromEntries(
    languages.map((l) => [l, `${base}/${l}`])
  );
  return {
    alternates: {
      canonical: `${base}/${lang}`,
      languages: langs,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <>
      <Navbar lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
