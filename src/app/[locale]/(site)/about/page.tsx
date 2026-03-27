// src/app/[locale]/(site)/about/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, Award, Users, Target, Eye } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: locale === "ar" ? `من نحن | ${t("siteName")}` : `About Us | ${t("siteName")}`,
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const timeline = [
    { year: "2005", ar: "تأسيس شركة الفريدة في الدمام بفريق مكون من 10 مهندسين.", en: "Alfarida Company founded in Dammam with a team of 10 engineers." },
    { year: "2010", ar: "إتمام أول 100 مشروع وحصول الشركة على شهادة ISO 9001.", en: "Completion of first 100 projects and ISO 9001 certification achieved." },
    { year: "2015", ar: "توسع الشركة ليشمل المنطقتين الوسطى والغربية.", en: "Expansion to cover Central and Western regions of Saudi Arabia." },
    { year: "2020", ar: "إطلاق قسم التصميم الداخلي والانضمام لمشاريع رؤية 2030.", en: "Interior design division launched; joined Vision 2030 projects." },
    { year: "2024", ar: "تجاوز 350 مشروعاً منجزاً وتوسع الفريق إلى 150+ متخصص.", en: "Surpassed 350 completed projects, team grew to 150+ professionals." },
  ];

  const values = [
    { icon: Target,  ar: "الجودة أولاً",       en: "Quality First",     descAr: "لا نساوم على جودة العمل في أي مرحلة من مراحل المشروع.", descEn: "We never compromise on quality at any stage of a project." },
    { icon: Eye,     ar: "الشفافية والنزاهة",  en: "Transparency",      descAr: "نؤمن بالتواصل الصريح والأمانة مع عملائنا وشركائنا.", descEn: "We believe in open communication and integrity with clients and partners." },
    { icon: Users,   ar: "العمل الجماعي",       en: "Teamwork",          descAr: "نبني فرقاً متكاملة تجمع بين الخبرات المتنوعة.", descEn: "We build integrated teams combining diverse expertise." },
    { icon: Award,   ar: "التميز المستمر",      en: "Continuous Excellence", descAr: "نسعى دائماً لتجاوز توقعات عملائنا وتحقيق التميز.", descEn: "We always strive to exceed client expectations and achieve excellence." },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="orb orb-emerald w-[500px] h-[500px] top-0 start-0 opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/0 to-dark-950" />
        <div className="container-wide relative z-10 text-center">
          <div className="section-badge mx-auto">
            {isAr ? "من نحن" : "About Us"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            {isAr ? "إرث من التميز منذ 2005" : "A Legacy of Excellence Since 2005"}
          </h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "شركة الفريدة ركيزة في مسيرة البناء والتطوير في المملكة العربية السعودية، نجمع بين الخبرة المحلية والمعايير الهندسية العالمية."
              : "Alfarida Company is a pillar of construction and development in Saudi Arabia, combining local expertise with world-class engineering standards."}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark-900/50 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">
              {isAr ? "قيمنا ومبادئنا" : "Our Values & Principles"}
            </h2>
            <div className="divider-emerald mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, ar, en, descAr, descEn }) => (
              <div key={ar} className="card p-6 group card-hover text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center
                                justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{isAr ? ar : en}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{isAr ? descAr : descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding relative overflow-hidden">
        <div className="orb orb-emerald w-96 h-96 end-0 top-0 opacity-10" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white">
              {isAr ? "رحلتنا عبر السنين" : "Our Journey Through the Years"}
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute start-8 top-0 bottom-0 w-px bg-gradient-to-b
                            from-transparent via-emerald-500/30 to-transparent" />
            <div className="space-y-8">
              {timeline.map(({ year, ar, en }) => (
                <div key={year} className="flex gap-6 items-start">
                  {/* Year dot */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-dark-950
                                    ring-4 ring-emerald-500/20 mt-1" />
                  </div>
                  {/* Content */}
                  <div className="card p-5 flex-1 card-hover">
                    <div className="text-emerald-400 font-black text-lg mb-1" dir="ltr">{year}</div>
                    <p className="text-dark-300 text-sm leading-relaxed">{isAr ? ar : en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-dark-900/50 relative">
        <div className="container-wide">
          <h2 className="text-2xl font-black text-white text-center mb-10">
            {isAr ? "شهاداتنا واعتماداتنا" : "Our Certifications & Accreditations"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "ISO 9001:2015",  desc: isAr ? "إدارة الجودة"           : "Quality Management"       },
              { name: "ISO 14001:2015", desc: isAr ? "الإدارة البيئية"        : "Environmental Management"  },
              { name: "ISO 45001:2018", desc: isAr ? "الصحة والسلامة المهنية" : "Occupational Health & Safety" },
              { name: "SEC Member",     desc: isAr ? "هيئة المهندسين السعوديين" : "Saudi Engineers Council"  },
            ].map(({ name, desc }) => (
              <div key={name} className="card p-6 text-center group card-hover">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-white font-bold text-sm mb-1" dir="ltr">{name}</div>
                <div className="text-dark-500 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
