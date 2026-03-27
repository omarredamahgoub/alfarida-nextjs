// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const isAr = locale === "ar";
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://alfarida.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
    keywords: isAr
      ? ["مقاولات", "إنشاء", "شركة الفريدة", "المنطقة الشرقية", "السعودية"]
      : ["contracting", "construction", "alfarida", "eastern province", "saudi arabia"],
    authors: [{ name: t("siteName") }],
    creator: t("siteName"),
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      url: baseUrl,
      siteName: t("siteName"),
      title: t("siteName"),
      description: t("siteDescription"),
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("siteDescription"),
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        "ar-SA": `${baseUrl}/ar`,
        "en-US": `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: locale === "ar" ? "شركة الفريدة" : "Alfarida Company",
              url: process.env.NEXTAUTH_URL ?? "https://alfarida.com",
              logo: `${process.env.NEXTAUTH_URL ?? "https://alfarida.com"}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+966-13-000-0000",
                contactType: "customer service",
                availableLanguage: ["Arabic", "English"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dammam",
                addressRegion: "Eastern Province",
                addressCountry: "SA",
              },
              sameAs: [
                "https://twitter.com/alfarida",
                "https://linkedin.com/company/alfarida",
              ],
            }),
          }}
        />
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
