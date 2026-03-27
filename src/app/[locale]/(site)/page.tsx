// src/app/[locale]/(site)/page.tsx
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Snowflake, Thermometer, Wrench, Shield, Clock, Award,
  Phone, MapPin, ArrowLeft, ChevronLeft, Star,
  Building2, Factory, Zap, HeadphonesIcon,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("siteName"), description: t("siteDescription") };
}

// ── Stats ──────────────────────────────────────────────────────────
const stats = [
  { value: "+550", labelKey: "projects", icon: Factory },
  { value: "100%", labelKey: "guarantee", icon: Shield },
  { value: "+200", labelKey: "clients", icon: Building2 },
  { value: "24/7", labelKey: "support", icon: HeadphonesIcon },
];

// ── Services ───────────────────────────────────────────────────────
const services = [
  {
    icon: Building2,
    titleKey: "logistics",
    descKey: "logisticsDesc",
    accent: "emerald",
    featured: false,
  },
  {
    icon: Zap,
    titleKey: "rack",
    descKey: "rackDesc",
    accent: "emerald",
    featured: true,
  },
  {
    icon: Wrench,
    titleKey: "maintenance",
    descKey: "maintenanceDesc",
    accent: "emerald",
    featured: false,
  },
];

// ── Testimonials ───────────────────────────────────────────────────
const testimonials = [
  {
    text: "الفريدة فريق محترف وموثوق. نفذوا لنا مستودع تبريد عملاق بأعلى معايير الجودة وفي الوقت المحدد.",
    name: "مدير مشاريع",
    company: "هيئة الإذاعة والتلفزيون السعودية",
  },
  {
    text: "خدمة الصيانة الوقائية ساعدتنا في تجنب الأعطال وتوفير التكاليف. فريق سريع الاستجابة.",
    name: "مدير العمليات",
    company: "ماكدونالدز السعودية",
  },
  {
    text: "أنظمة الراك التي نفذتها الفريدة قللت من استهلاك الكهرباء بنسبة 35%. استثمار ناجح.",
    name: "مدير فني",
    company: "الوطنية للدواجن",
  },
];

// ── Why Us ─────────────────────────────────────────────────────────
const whyUs = [
  { icon: Award, text: "اعتماد ماركات عالمية" },
  { icon: MapPin, text: "تغطية شاملة للمملكة" },
  { icon: Clock, text: "دعم فني 24/7" },
  { icon: Shield, text: "ضمان ذهبي حقيقي" },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center
                          bg-dark-950 overflow-hidden">
        {/* grid bg */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* orbs */}
        <div className="orb orb-emerald w-[600px] h-[600px] -top-40 -start-40 opacity-20" />
        <div className="orb orb-emerald w-[400px] h-[400px] bottom-0 end-0 opacity-10" />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/0 via-dark-950/20 to-dark-950" />

        <div className="container-wide relative z-10 text-center px-4 py-24">
          {/* badge */}
          <div className="section-badge mx-auto mb-6">{t("hero.badge")}</div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white
                         leading-tight mb-6 max-w-4xl mx-auto">
            {t("hero.headline").split("وحلول").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}<span className="text-emerald-400">وحلول</span></span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>

          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subheadline")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className="btn-primary px-8 py-4 text-base font-bold"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href="/services"
              className="btn-ghost px-8 py-4 text-base font-bold"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section className="bg-dark-900 border-y border-dark-800">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-dark-800">
            {[
              { value: "+550", label: "مشروع صناعي", Icon: Factory },
              { value: "100%", label: "ضمان حقيقي", Icon: Shield },
              { value: "+200", label: "عميل استراتيجي", Icon: Building2 },
              { value: "24/7", label: "دعم فني ميداني", Icon: HeadphonesIcon },
            ].map(({ value, label, Icon }) => (
              <div key={label} className="flex flex-col items-center py-10 px-6 gap-3
                                          hover:bg-dark-800/50 transition-colors duration-300">
                <Icon className="w-7 h-7 text-emerald-500" />
                <span className="text-3xl md:text-4xl font-black text-white">{value}</span>
                <span className="text-dark-400 text-xs font-semibold uppercase tracking-widest text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-dark-950">
        <div className="container-wide">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">{t("services.badge")}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("services.title")}
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">{t("services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Building2,
                title: "المستودعات اللوجستية",
                desc: "تنفيذ مشاريع المستودعات الكبرى بمعايير عزل عالمية وكفاءة طاقة قصوى.",
                featured: false,
              },
              {
                Icon: Zap,
                title: "أنظمة الراك (Racks)",
                desc: "الحل الأمثل لتقليل استهلاك الكهرباء بنسبة 40% وضمان تبريد مستمر.",
                featured: true,
              },
              {
                Icon: Wrench,
                title: "الصيانة الوقائية",
                desc: "عقود صيانة دورية وفريق طوارئ مجهز للتدخل السريع على مدار الساعة.",
                featured: false,
              },
            ].map(({ Icon, title, desc, featured }) => (
              <div
                key={title}
                className={`card overflow-hidden group transition-all duration-300
                  ${featured
                    ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 to-dark-900 scale-[1.02]"
                    : "card-hover"
                  }`}
              >
                {featured && (
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />
                )}
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                    ${featured ? "bg-emerald-500/20" : "bg-dark-800"}`}>
                    <Icon className={`w-7 h-7 ${featured ? "text-emerald-400" : "text-dark-400 group-hover:text-emerald-400 transition-colors"}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${featured ? "text-emerald-400" : "text-white"}`}>
                    {title}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed mb-6">{desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold
                               text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    {featured ? "اطلب مواصفات الراك" : "التفاصيل الفنية"}
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT + WHY US
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-dark-900">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* left: visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-dark-800 to-dark-950
                              border border-dark-700 overflow-hidden flex items-center justify-center">
                <Snowflake className="w-32 h-32 text-emerald-500/20" />
                <div className="absolute inset-0 grid-bg opacity-20" />
              </div>
              {/* badge */}
              <div className="absolute -bottom-6 -end-6 bg-emerald-500 text-dark-950
                              p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-black">+20</p>
                <p className="text-sm font-bold">عاماً من الخبرة التقنية</p>
              </div>
            </div>

            {/* right: text */}
            <div className="space-y-8">
              <div className="section-badge">{t("about.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-snug
                             border-s-4 border-emerald-500 ps-6">
                {t("about.title")}
              </h2>
              <p className="text-dark-400 text-lg leading-relaxed">
                {t("about.body")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {whyUs.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-dark-300">
                    <Icon className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3 font-bold"
              >
                {t("about.cta")}
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS TEASER
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-dark-950">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-badge mb-4">{t("projects.badge")}</div>
              <h2 className="text-3xl md:text-4xl font-black text-white">{t("projects.title")}</h2>
              <p className="text-dark-400 mt-2">{t("projects.subtitle")}</p>
            </div>
            <Link
              href="/projects"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              {t("projects.viewAll")}
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "تأسيس نظام RACK — Bitzer", cat: "أنظمة ميكانيكية", catColor: "bg-blue-500/10 text-blue-400" },
              { title: "وحدات Copeland الخارجية", cat: "أنظمة ميكانيكية", catColor: "bg-blue-500/10 text-blue-400" },
              { title: "وحدات تجميد صاعق IQF", cat: "وحدات داخلية", catColor: "bg-indigo-500/10 text-indigo-400" },
              { title: "أبواب سحاب هيدروليكية", cat: "عزل وإنشاءات", catColor: "bg-cyan-500/10 text-cyan-400" },
              { title: "مبخرات Friga-Bohn الفرنسية", cat: "وحدات داخلية", catColor: "bg-indigo-500/10 text-indigo-400" },
              { title: "عزل الأرضيات بالفوم الأزرق", cat: "عزل وإنشاءات", catColor: "bg-cyan-500/10 text-cyan-400" },
            ].map(({ title, cat, catColor }) => (
              <div key={title} className="card card-hover group overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-dark-800 to-dark-900
                                flex items-center justify-center relative overflow-hidden">
                  <Snowflake className="w-16 h-16 text-dark-700 group-hover:text-dark-600
                                        transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
                  <div className="absolute bottom-3 start-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${catColor}`}>
                      {cat}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold group-hover:text-emerald-400
                                 transition-colors duration-200 text-sm">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-dark-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-4">آراء عملائنا</div>
            <h2 className="text-3xl font-black text-white">ثقة قادة السوق</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ text, name, company }) => (
              <div key={name} className="card p-8 flex flex-col gap-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-dark-300 text-sm leading-relaxed italic flex-1">"{text}"</p>
                <div className="border-t border-dark-800 pt-4">
                  <p className="text-white font-bold text-sm">{name}</p>
                  <p className="text-dark-500 text-xs mt-1">{company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="orb orb-emerald w-[500px] h-[500px] -top-40 start-1/2 -translate-x-1/2 opacity-15" />
        <div className="container-wide relative z-10">
          <div className="card border-emerald-500/30 p-12 md:p-16 text-center
                          bg-gradient-to-br from-emerald-950/30 to-dark-900">
            <div className="section-badge mx-auto mb-6">{t("contact.badge")}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto mb-10">
              {t("contact.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary px-10 py-4 text-base font-bold"
              >
                {t("contact.cta")}
              </Link>
              <a
                href="tel:+966598366214"
                className="btn-ghost px-10 py-4 text-base font-bold
                           inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                0598366214
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}