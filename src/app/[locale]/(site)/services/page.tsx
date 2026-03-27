// src/app/[locale]/(site)/services/page.tsx

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  Building2, Network, LayoutDashboard, Factory,
  CheckCircle2, ArrowLeft, ArrowRight, Phone
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn, getLocalizedField } from "@/lib/utils";
import { getAllServices } from "@/lib/data/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return { title: t("title"), description: t("description") };
}

const serviceIcons: Record<string, React.ElementType> = {
  "building-2": Building2,
  "network": Network,
  "layout-dashboard": LayoutDashboard,
  "factory": Factory,
};

const categoryColors: Record<string, string> = {
  "general-contracting": "from-emerald-900/30 to-emerald-800/10",
  "infrastructure": "from-teal-900/30 to-teal-800/10",
  "interior-design": "from-cyan-900/30 to-cyan-800/10",
  "industrial-projects": "from-green-900/30 to-green-800/10",
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // ✅ بدل Prisma
  const services = getAllServices();

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "خدمات شركة الفريدة" : "Alfarida Company Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: getLocalizedField(s as Record<string, unknown>, "title", locale),
      description: getLocalizedField(s as Record<string, unknown>, "description", locale),
    })),
  };

  const whyUsItems = [
    { titleAr: "أكثر من 20 عاماً", titleEn: "20+ Years", descAr: "عقدان من تسليم المشاريع البارزة في المملكة.", descEn: "Two decades of landmark project delivery." },
    { titleAr: "مهندسون معتمدون", titleEn: "Certified Engineers", descAr: "فريق معتمد من هيئة المهندسين السعوديين.", descEn: "SEC-certified professional engineering team." },
    { titleAr: "معايير ISO", titleEn: "ISO Standards", descAr: "تنفيذ وفق معايير إدارة الجودة ISO 9001.", descEn: "Executed to ISO 9001 quality management standards." },
    { titleAr: "تسليم في الموعد", titleEn: "On-Time Delivery", descAr: "98٪ من مشاريعنا تُسلَّم في الموعد المحدد.", descEn: "98% of projects delivered on schedule." },
  ];

  return (
    <div className="page-enter">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="orb orb-emerald w-[500px] h-[500px] -top-40 -end-40 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/0 to-dark-950" />

        <div className="container-wide relative z-10 text-center">
          <div className="section-badge mx-auto">{t("hero.badge")}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5">
            {t("hero.title")}
          </h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-8">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon ?? "building-2"] ?? Building2;
              const color = categoryColors[service.slug] ?? "from-emerald-900/20 to-transparent";
              const features = (locale === "ar" ? service.featuresAr : service.featuresEn) ?? [];

              return (
                <div
                  key={service.id}
                  className={cn(
                    "group relative rounded-3xl overflow-hidden border border-dark-800",
                    "hover:border-emerald-500/30 transition-all duration-500",
                    "animate-fade-in",
                    `animate-delay-${(i + 1) * 100}`
                  )}
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", color)} />
                  <div className="absolute inset-0 bg-dark-900/70" />

                  <div className="relative z-10 p-8 md:p-10">
                    <div className={cn("flex flex-col md:flex-row gap-8", i % 2 === 1 && "md:flex-row-reverse")}>
                      <div className="md:w-48 shrink-0 flex flex-col items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="text-7xl font-black text-dark-800 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                          {getLocalizedField(service as Record<string, unknown>, "title", locale)}
                        </h2>
                        <p className="text-dark-300 mb-6">
                          {getLocalizedField(service as Record<string, unknown>, "description", locale)}
                        </p>

                        {features.length > 0 && (
                          <div className="grid sm:grid-cols-2 gap-2">
                            {features.map((f: string) => (
                              <div key={f} className="flex items-center gap-2 text-sm text-dark-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                {f}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ✅ لينك للصفحة الديناميك */}
                        <Link href={`/services/${service.slug}`} className="text-emerald-400 mt-4 inline-block">
                          {isAr ? "عرض التفاصيل" : "View Details"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-black text-white mb-4">{t("cta.title")}</h2>
        <p className="text-dark-300 mb-8">{t("cta.subtitle")}</p>

        <Link href="/contact" className="btn-primary">
          {t("cta.button")}
          <Arrow className="inline w-4 h-4 ms-2" />
        </Link>
      </section>
    </div>
  );
}