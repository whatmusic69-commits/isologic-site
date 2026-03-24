import { notFound } from "next/navigation";
import { isValidLang } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
