import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Amiri } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, getLocaleDirection } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AutoTranslator from "@/components/AutoTranslator";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The SDAM Collection — Five Investigations into Who Really Discovered Science",
  description:
    "Five interactive SDAM investigations: Gravity (Al-Khāzini 1121), Optics & Photography (Ibn al-Haytham 1011), The Scientific Method (Ibn al-Haytham 1025), Calculus (Ibn al-Haytham 1000), and Astronomy (al-Sūfī 964). Real archival manuscripts, real mathematical theorems, documented colonial transmission chains.",
  keywords: [
    "history of science",
    "SDAM",
    "scientific discovery attribution",
    "Ibn al-Haytham",
    "Alhazen",
    "al-Khāzini",
    "al-Bīrūnī",
    "al-Sūfī",
    "al-Ṭūsī",
    "Ibn al-Shāṭir",
    "Sharaf al-Ṭūsī",
    "Mādhava",
    "gravity",
    "optics",
    "photography",
    "scientific method",
    "calculus",
    "astronomy",
    "heliocentrism",
    "Islamic Golden Age",
    "colonialism",
    "library theft",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "The SDAM Collection",
    description:
      "Five interactive investigations into who really discovered gravity, optics, the scientific method, calculus, and astronomy. Real manuscripts. Real math. Documented colonial transmission.",
    type: "website",
  },
};

// Static generation — pre-render all 4 locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as 'en' | 'fr' | 'de' | 'ar')) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load messages for this locale
  const messages = await getMessages();

  // Get text direction (RTL for Arabic, LTR for others)
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${cormorant.variable} ${amiri.variable} antialiased bg-cosmos text-cream overflow-x-hidden`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SEOHead />
          <StructuredData />
          <LanguageSwitcher variant="fixed" />
          <AutoTranslator />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
