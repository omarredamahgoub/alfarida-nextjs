// src/app/[locale]/(site)/home/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import {
  ArrowLeft, ArrowRight, Building2, Network, LayoutDashboard,
  Factory, CheckCircle2, MapPin, Calendar, Star, Award,
  Users, Briefcase, TrendingUp, ChevronRight
} from "lucide-react";
import { cn, formatDate, getLocalizedField } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("siteName") };
}

const serviceIcons: Record<string, React.ElementType> = {
  "building-2":        Building2,
  "network":           Network,
  "layout-dashboard":  LayoutDashboard,
  "factory":           Factory,
};

const stats = [
  { valueAr: "+20",   valueEn: "20+",  labelKey: "years",     icon: Award   },
  { valueAr: "+350",  valueEn: "350+", labelKey: "projects",   icon: Briefcase },
  { valueAr: "+200",  valueEn: "200+", labelKey: "clients",    icon: Users   },
  { valueAr: "+150",  valueEn: "150+", labelKey: "employees",  icon: TrendingUp },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t  = await getTranslations({ locale, namespace: "home" });
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Fetch data
  const [services, featuredProjects] = await Promise.all([
    prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.project.findMany({
      where:   { status: "PUBLISHED", featured: true },
      orderBy: { order: "asc" },
      take:    3,
    }),
  ]);

  return (
    <div className="page-enter">

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="orb orb-emerald w-[600px] h-[600px] top-0 -start-48 opacity-30" />
        <div className="orb orb-emerald w-[400px] h-[400px] bottom-0 -end-20 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/40 to-dark-950" />

        {/* Decorative line */}
        <div className="absolute start-8 top-1/4 bottom-1/4 w-px
                        bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent hidden lg:block" />

        <div className="container-wide relative z-10 py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="section-badge animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t("hero.badge")}
            </div>

            {/* Headline */}
            <h1 className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6",
              "animate-slide-up animate-delay-100",
              "leading-[1.1]"
            )}>
              {isAr ? (
                <>
                  نبني{" "}
                  <span className="text-gradient">المستقبل</span>
                  <br />بجودة لا تضاهى
                </>
              ) : (
                <>
                  Building the{" "}
                  <span className="text-gradient">Future</span>
                  <br />with Unmatched Quality
                </>
              )}
            </h1>

            {/* Sub */}
            <p className="text-lg md:text-xl text-dark-300 max-w-2xl mb-10
                           animate-slide-up animate-delay-200">
              {t("hero.subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up animate-delay-300">
              <Link href="/projects" className="btn-primary group text-base px-8 py-4">
                {t("hero.cta")}
                <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flip-rtl" />
              </Link>
              <Link href="/services" className="btn-outline text-base px-8 py-4">
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section className="relative py-16 border-y border-dark-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map(({ valueAr, valueEn, labelKey, icon: Icon }, i) => (
              <div
                key={labelKey}
                className={cn(
                  "text-center p-6 rounded-2xl glass-light border border-dark-700",
                  "hover:border-emerald-500/30 transition-all duration-300",
                  "animate-fade-in",
                  `animate-delay-${(i + 1) * 100}`
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center
                                justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-gradient mb-1">
                  {isAr ? valueAr : valueEn}
                </div>
                <div className="text-dark-400 text-sm font-medium">
                  {t(`stats.${labelKey}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About snippet ─────────────────────── */}
      <section className="section-padding relative overflow-hidden">
        <div className="orb orb-emerald w-[500px] h-[500px] -end-48 top-0 opacity-10" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-badge">{t("about.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                {t("about.title")}
              </h2>
              <div className="divider-emerald mb-6" />
              <p className="text-dark-300 text-lg leading-relaxed mb-8">
                {t("about.body")}
              </p>
              <Link href="/about" className="btn-outline group">
                {t("about.cta")}
                <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flip-rtl" />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden glass border border-emerald-500/10 p-8">
                {/* Certifications grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: isAr ? "ISO 9001" : "ISO 9001", desc: isAr ? "إدارة الجودة" : "Quality Management" },
                    { label: isAr ? "ISO 14001" : "ISO 14001", desc: isAr ? "البيئة" : "Environment" },
                    { label: isAr ? "OHSAS 18001" : "OHSAS 18001", desc: isAr ? "السلامة" : "Safety" },
                    { label: isAr ? "هيئة المهندسين" : "SEC Certified", desc: isAr ? "معتمدون رسمياً" : "Officially Certified" },
                  ].map(({ label, desc }) => (
                    <div key={label} className="card p-4 text-center card-hover transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                      <div className="text-white font-bold text-sm">{label}</div>
                      <div className="text-dark-400 text-xs mt-0.5">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -start-4 glass rounded-2xl p-4 border border-emerald-500/20 shadow-xl">
                <Star className="w-6 h-6 text-emerald-400 mb-1" />
                <div className="text-white font-bold text-sm">
                  {isAr ? "منذ 2005" : "Est. 2005"}
                </div>
                <div className="text-dark-400 text-xs">
                  {isAr ? "20+ عاماً من التميز" : "20+ Years of Excellence"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────── */}
      <section className="section-padding bg-dark-900/50 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto">{t("services.badge")}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("services.title")}
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">{t("services.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon ?? "building-2"] ?? Building2;
              return (
                <div
                  key={service.id}
                  className={cn(
                    "card p-6 card-hover cursor-pointer group",
                    "animate-fade-in",
                    `animate-delay-${(i + 1) * 100}`
                  )}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center
                                  justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">
                    {getLocalizedField(service as Record<string, unknown>, "title", locale)}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed line-clamp-3">
                    {getLocalizedField(service as Record<string, unknown>, "description", locale)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-emerald-500 text-xs font-semibold
                                  group-hover:gap-2 transition-all duration-200">
                    {isAr ? "اعرف أكثر" : "Learn More"}
                    <ChevronRight className="w-3.5 h-3.5 flip-rtl" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              {isAr ? "جميع الخدمات" : "All Services"}
              <Arrow className="w-4 h-4 flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────── */}
      <section className="section-padding relative overflow-hidden">
        <div className="orb orb-emerald w-96 h-96 start-0 bottom-0 opacity-10" />
        <div className="container-wide relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-badge">{t("projects.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {t("projects.title")}
              </h2>
              <p className="text-dark-400">{t("projects.subtitle")}</p>
            </div>
            <Link href="/projects" className="btn-outline shrink-0 group">
              {t("projects.viewAll")}
              <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform flip-rtl" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                className={cn(
                  "card card-hover group overflow-hidden",
                  "animate-fade-in",
                  `animate-delay-${(i + 1) * 100}`
                )}
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-dark-800 to-dark-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-dark-700 group-hover:text-emerald-900
                                          transition-colors duration-300" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 start-3">
                    <span className="badge text-[10px]">
                      {project.category.toLowerCase()}
                    </span>
                  </div>
                  {/* Emerald overlay on hover */}
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-white font-bold mb-2 group-hover:text-emerald-400
                                 transition-colors duration-200">
                    {getLocalizedField(project as Record<string, unknown>, "title", locale)}
                  </h3>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                    {getLocalizedField(project as Record<string, unknown>, "description", locale)}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-col gap-1.5 pt-4 border-t border-dark-800">
                    {project.locationAr && (
                      <div className="flex items-center gap-2 text-dark-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {getLocalizedField(project as Record<string, unknown>, "location", locale)}
                      </div>
                    )}
                    {project.completedAt && (
                      <div className="flex items-center gap-2 text-dark-500 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {formatDate(project.completedAt, locale)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="orb orb-emerald w-[500px] h-[500px] start-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2 opacity-20" />

        <div className="container-wide relative z-10 text-center">
          <div className="section-badge mx-auto">{t("contact.badge")}</div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-3xl mx-auto">
            {t("contact.title")}
          </h2>
          <p className="text-dark-300 mb-10 max-w-xl mx-auto text-lg">
            {t("contact.subtitle")}
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4 group">
            {t("contact.cta")}
            <Arrow className="w-5 h-5 group-hover:translate-x-0.5 transition-transform flip-rtl" />
          </Link>
        </div>
      </section>
    </div>
  );
}
