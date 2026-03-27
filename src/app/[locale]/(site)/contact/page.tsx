"use client";
// src/app/[locale]/(site)/contact/page.tsx
import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Send, Snowflake, CheckCircle, AlertCircle,
  Ruler, Thermometer, Headphones, Zap, Cpu, Shield, Lightbulb, MapPin, DoorOpen,
} from "lucide-react";

const saudiCities = [
  { region: "المنطقة الشرقية", cities: ["الدمام","الخبر","الظهران","الجبيل","الأحساء","القطيف","حفر الباطن","الخفجي","بقيق","العيون","النعيرية","سيهات","عنك","صفوى"] },
  { region: "منطقة الرياض", cities: ["الرياض","الخرج","المجمعة","الدوادمي","الزلفي","عفيف","القويعية","وادي الدواسر","الأفلاج","حوطة بني تميم","المزاحمية","ضرما","الحريق","شقراء"] },
  { region: "منطقة مكة المكرمة", cities: ["مكة المكرمة","جدة","الطائف","رابغ","القنفذة","الليث","الجموم","خليص","تربة","الكامل"] },
  { region: "منطقة المدينة المنورة", cities: ["المدينة المنورة","ينبع","العلا","الحناكية","بدر","مهد الذهب"] },
  { region: "منطقة القصيم", cities: ["بريدة","عنيزة","الرس","المذنب"] },
  { region: "منطقة تبوك", cities: ["تبوك","تيماء","الوجه","ضباء","حقل"] },
  { region: "منطقة عسير", cities: ["أبها","خميس مشيط","بيشة","النماص","محايل عسير"] },
  { region: "منطقة جازان", cities: ["جازان","صبيا","أبو عريش","صامطة"] },
  { region: "منطقة نجران", cities: ["نجران","شرورة"] },
  { region: "منطقة الباحة", cities: ["الباحة","بلجرشي"] },
  { region: "منطقة الجوف", cities: ["سكاكا","القريات","دومة الجندل"] },
  { region: "منطقة الحدود الشمالية", cities: ["عرعر","رفحاء","طريف"] },
  { region: "منطقة حائل", cities: ["حائل","بقعاء","الغزالة"] },
];

const featureIcons = [Headphones, Zap, Cpu, Shield, Lightbulb, MapPin];
const featureColors = ["bg-blue-500","bg-green-500","bg-purple-500","bg-yellow-500","bg-sky-500","bg-red-500"];

const generateRef = () => {
  const now = new Date();
  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ALF-${y}${m}${d}-${rand}`;
};

function CountUp({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-emerald-400 font-black text-2xl">
        {suffix}{count.toLocaleString()}
      </p>
      <p className="text-dark-400 text-xs mt-1">{label}</p>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refNumber, setRefNumber] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "",
    length: "", width: "", height: "",
    activity: isAr ? "تجميد" : "Freezing",
    floorInsulation: "no",
    doorType: isAr ? "مفصلي" : "Hinged",
    doorWidth: "", doorHeight: "",
    notes: "", agree: true,
  });

  const area =
    form.length && form.width &&
    parseFloat(form.length) > 1 && parseFloat(form.width) > 1
      ? (parseFloat(form.length) * parseFloat(form.width)).toFixed(1)
      : null;

  const volume =
    area && form.height && parseFloat(form.height) > 1
      ? (parseFloat(area) * parseFloat(form.height)).toFixed(1)
      : null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city) return;
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return;
    const ref = generateRef();
    setStatus("loading");

    const perimeter = (parseFloat(form.length) + parseFloat(form.width)) * 2;
    const maxDim = Math.max(parseFloat(form.length), parseFloat(form.width));
    const minDim = Math.min(parseFloat(form.length), parseFloat(form.width));
    const height = parseFloat(form.height);
    const wallPanels = { count: perimeter, length: height };
    const ceilingPanels = { count: Math.ceil(maxDim), length: minDim };
    const floorPanels = form.floorInsulation === "yes"
      ? { count: Math.ceil(maxDim), length: minDim }
      : null;
    const normalCorner = perimeter;
    const uChannel = perimeter;
    const decorCorner = (height * 4) + perimeter;
    const ceil = (n: number) => Math.ceil(n);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `طلب عرض سعر جديد - ${ref}`,
          رقم_المرجع: ref,
          الاسم: form.name,
          الجوال: form.phone,
          البريد: form.email,
          المدينة: form.city,
          الأبعاد: `${form.length} × ${form.width} × ${form.height}`,
          ألواح_الحوائط: `${ceil(wallPanels.count)} لوح × ${ceil(wallPanels.length)}م`,
          ألواح_السقف: `${ceil(ceilingPanels.count)} لوح × ${ceil(ceilingPanels.length)}م`,
          ...(floorPanels && { ألواح_الأرضية: `${ceil(floorPanels.count)} لوح × ${ceil(floorPanels.length)}م` }),
          زاوية_عادية: `${ceil(normalCorner)}م`,
          يو_شانل: `${ceil(uChannel)}م`,
          زاوية_ديكور: `${ceil(decorCorner)}م`,
          المساحة: area ? `${ceil(parseFloat(area))} م²` : "-",
          الحجم: volume ? `${ceil(parseFloat(volume))} م³` : "-",
          نوع_النشاط: form.activity,
          عزل_الأرضية: form.floorInsulation === "yes" ? "نعم" : "لا",
          الباب: `${form.doorType} - ${form.doorWidth || "-"}م × ${form.doorHeight || "-"}م`,
          ملاحظات: form.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRefNumber(ref);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const features = (t.raw("sidebar.features") as { title: string; desc: string }[]);

  return (
    <div className="page-enter min-h-screen bg-dark-950">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-emerald w-[500px] h-[500px] -top-40 start-0 opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/0 to-dark-950" />
        <div className="container-wide relative z-10 text-center">
          <div className="section-badge mx-auto mb-4">{t("hero.badge")}</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("hero.title")} <span className="text-emerald-400">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-dark-300 max-w-xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-4">
              <div className="card p-8 sticky top-24 relative overflow-hidden flex flex-col h-full">
                <Snowflake className="absolute -bottom-8 -start-8 w-48 h-48 text-emerald-500/5 rotate-12" />

                {/* العنوان */}
                <div className="mb-6">
                  <div className="w-1 h-8 bg-emerald-500 rounded-full inline-block align-middle me-3" />
                  <span className="text-white font-black text-2xl align-middle">
                    {t("sidebar.title")}{" "}
                    <span className="text-emerald-400">{t("sidebar.titleHighlight")}</span>
                    {t("sidebar.titleSuffix")}
                  </span>
                </div>

                {/* المميزات */}
                <div className="flex flex-col gap-5">
                  {features.map(({ title, desc }, i) => {
                    const Icon = featureIcons[i];
                    const color = featureColors[i];
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-black text-base mb-1">{title}</h3>
                          <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* إحصائيات تفاعلية */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <CountUp target={550} suffix="+" label={t("sidebar.stat1Label")} />
                  <CountUp target={20} suffix="+" label={t("sidebar.stat2Label")} />
                </div>

                {/* زر واتساب */}
                <div className="mt-4">
                  <a
                    href="https://wa.me/966598366214?text=مرحبا، أريد استشارة مجانية"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#1fb955]
                               text-white font-black px-6 py-4 rounded-2xl transition-all shadow-lg w-full
                               shadow-[#25d366]/20 hover:shadow-[#25d366]/40 hover:-translate-y-0.5"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("sidebar.whatsappBtn")}
                  </a>
                </div>
              </div>
            </aside>

            {/* ── Form ── */}
            <div className="lg:col-span-8">
              <div className="card overflow-hidden">
                {/* Form header */}
                <div className="bg-gradient-to-r from-dark-800 to-dark-900 p-8 border-b border-dark-700 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-black text-white">{t("form.title")}</h2>
                    <p className="text-dark-400 mt-1 text-sm">{t("form.subtitle")}</p>
                  </div>
                  <Snowflake className="absolute end-8 top-1/2 -translate-y-1/2 w-20 h-20 text-white/5" />
                </div>

                {status === "success" ? (
                  <div className="p-16 text-center">
                    <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-white mb-2">{t("form.successTitle")}</h3>
                    <p className="text-dark-400">{t("form.successSubtitle")}</p>
                    <div className="mt-4 inline-block bg-dark-800 border border-dark-700 rounded-xl px-6 py-3">
                      <p className="text-dark-400 text-xs mb-1">{t("form.refLabel")}</p>
                      <p className="text-emerald-400 font-black tracking-widest">{refNumber}</p>
                    </div>
                    <br />
                    <button onClick={() => setStatus("idle")} className="btn-primary mt-8 px-8 py-3 font-bold">
                      {t("form.sendAnother")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    {/* Section 01 */}
                    <div className="space-y-6">
                      <h3 className="text-white font-black text-lg flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-black flex items-center justify-center">01</span>
                        {t("form.section1Title")}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300">{t("form.nameLabel")}</label>
                          <input
                            name="name" value={form.name} onChange={handleChange}
                            required placeholder={t("form.namePlaceholder")}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white placeholder-dark-500 text-sm
                                       focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300">{t("form.phoneLabel")}</label>
                          <input
                            name="phone" value={form.phone} onChange={handleChange}
                            required type="tel" placeholder={t("form.phonePlaceholder")} dir="ltr"
                            pattern="^\+?[0-9]{10,15}$"
                            title={t("form.phoneTitle")}
                            onKeyDown={(e) => {
                              const allowed = ["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"];
                              if (!allowed.includes(e.key) && !/^[0-9+]$/.test(e.key)) e.preventDefault();
                              if (e.key === "+" && form.phone.includes("+")) e.preventDefault();
                              if (e.key === "+" && form.phone.length > 0) e.preventDefault();
                              const digits = form.phone.replace(/\D/g, "");
                              if (!allowed.includes(e.key) && e.key !== "+" && digits.length >= 15) e.preventDefault();
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
                              setForm((prev) => ({ ...prev, phone: pasted.slice(0, 15) }));
                            }}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white placeholder-dark-500 text-sm text-left
                                       focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300">{t("form.emailLabel")}</label>
                          <input
                            name="email" value={form.email}
                            onChange={(e) => {
                              const clean = e.target.value.replace(/[^\x00-\x7F!#$%&'*+\-/=?^_`{|}~.@[\]a-zA-Z0-9]/g, "");
                              setForm((prev) => ({ ...prev, email: clean }));
                            }}
                            type="email" placeholder={t("form.emailPlaceholder")} dir="ltr" inputMode="email"
                            onKeyDown={(e) => {
                              if (/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(e.key)) e.preventDefault();
                              if (
                                !/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@[\]\s]$/.test(e.key) &&
                                !["Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"].includes(e.key)
                              ) e.preventDefault();
                            }}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white placeholder-dark-500 text-sm text-left
                                       focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300">{t("form.cityLabel")}</label>
                          <select
                            name="city" value={form.city} onChange={handleChange} required
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white text-sm focus:outline-none focus:border-emerald-500
                                       transition-colors appearance-none"
                          >
                            <option value="" disabled>{t("form.cityPlaceholder")}</option>
                            {saudiCities.map(({ region, cities: regionCities }) => (
                              <optgroup key={region} label={`── ${region}`}>
                                {regionCities.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </optgroup>
                            ))}
                            <optgroup label={`── ${t("form.outsideKSALabel")}`}>
                              <option value={t("form.outsideKSA")}>{t("form.outsideKSA")}</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dark-800" />

                    {/* Section 02 */}
                    <div className="space-y-6">
                      <h3 className="text-white font-black text-lg flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-black flex items-center justify-center">02</span>
                        {t("form.section2Title")}
                      </h3>
                      <div>
                        <p className="text-dark-400 text-xs font-semibold mb-3 flex items-center gap-2">
                          <Ruler className="w-4 h-4" /> {t("form.dimensionsLabel")}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { name: "length", label: t("form.lengthLabel"), val: form.length },
                            { name: "width",  label: t("form.widthLabel"),  val: form.width },
                            { name: "height", label: t("form.heightLabel"), val: form.height },
                          ].map(({ name, label, val }) => (
                            <div key={name} className="space-y-2">
                              <label className="text-xs font-semibold text-dark-400 block text-center">{label}</label>
                              <input
                                name={name} value={val} onChange={handleChange}
                                type="number" step="0.1" min="1" placeholder="1.0"
                                className="w-full bg-dark-800 border border-dark-700 rounded-xl px-3 py-3
                                           text-white text-sm text-center font-bold
                                           focus:outline-none focus:border-emerald-500 transition-colors"
                              />
                            </div>
                          ))}
                        </div>
                        {(area || volume) && (
                          <div className="mt-4 flex gap-4 flex-wrap">
                            {area && (
                              <div className="badge text-xs">
                                {t("form.areaLabel")}: <span className="font-black text-emerald-400">{area} م²</span>
                              </div>
                            )}
                            {volume && (
                              <div className="badge text-xs">
                                {t("form.volumeLabel")}: <span className="font-black text-emerald-400">{volume} م³</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300 flex items-center gap-2">
                            <Thermometer className="w-4 h-4 text-emerald-500" />
                            {t("form.activityLabel")}
                          </label>
                          <select
                            name="activity" value={form.activity} onChange={handleChange}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white text-sm focus:outline-none focus:border-emerald-500
                                       transition-colors appearance-none"
                          >
                            <option value={isAr ? "تجميد" : "Freezing"}>{t("form.activity1")}</option>
                            <option value={isAr ? "تبريد" : "Cooling"}>{t("form.activity2")}</option>
                            <option value={isAr ? "تجميد سريع" : "Blast Freezing"}>{t("form.activity3")}</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-dark-300">{t("form.floorLabel")}</label>
                          <select
                            name="floorInsulation" value={form.floorInsulation} onChange={handleChange}
                            className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                       text-white text-sm focus:outline-none focus:border-emerald-500
                                       transition-colors appearance-none"
                          >
                            <option value="no">{t("form.floor1")}</option>
                            <option value="yes">{t("form.floor2")}</option>
                          </select>
                        </div>
                      </div>

                      {/* الباب */}
                      <div className="space-y-4">
                        <p className="text-dark-400 text-xs font-semibold flex items-center gap-2">
                          <DoorOpen className="w-4 h-4" /> {t("form.doorSectionLabel")}
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-dark-400 block">{t("form.doorTypeLabel")}</label>
                            <select
                              name="doorType" value={form.doorType} onChange={handleChange}
                              className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3
                                         text-white text-sm focus:outline-none focus:border-emerald-500
                                         transition-colors appearance-none"
                            >
                              <option value={isAr ? "مفصلي" : "Hinged"}>{t("form.doorType1")}</option>
                              <option value={isAr ? "منزلق" : "Sliding"}>{t("form.doorType2")}</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-dark-400 block text-center">{t("form.doorWidthLabel")}</label>
                            <input
                              name="doorWidth" value={form.doorWidth} onChange={handleChange}
                              type="number" step="0.1" min="0.7" placeholder="1.0"
                              className="w-full bg-dark-800 border border-dark-700 rounded-xl px-3 py-3
                                         text-white text-sm text-center font-bold
                                         focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-dark-400 block text-center">{t("form.doorHeightLabel")}</label>
                            <input
                              name="doorHeight" value={form.doorHeight} onChange={handleChange}
                              type="number" step="0.1" min="1.7" placeholder="2.0"
                              className="w-full bg-dark-800 border border-dark-700 rounded-xl px-3 py-3
                                         text-white text-sm text-center font-bold
                                         focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dark-800" />

                    {/* Notes + Submit */}
                    <div className="space-y-5">
                      <textarea
                        name="notes" value={form.notes} onChange={handleChange}
                        rows={3} placeholder={t("form.notesPlaceholder")}
                        className="w-full bg-dark-800 border border-dark-700 rounded-2xl px-5 py-4
                                   text-white placeholder-dark-500 text-sm
                                   focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      />
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox" name="agree"
                          checked={form.agree} onChange={handleChange}
                          className="w-5 h-5 rounded accent-emerald-500"
                        />
                        <span className="text-dark-400 text-sm font-semibold">{t("form.agreeLabel")}</span>
                      </label>

                      {status === "error" && (
                        <div className="flex items-center gap-3 text-red-400 bg-red-500/10 rounded-xl px-4 py-3 text-sm">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          {t("form.errorMsg")}
                        </div>
                      )}

                      <button
                        type="submit" disabled={status === "loading"}
                        className="w-full btn-primary py-5 text-base font-black
                                   flex items-center justify-center gap-3
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <>
                            <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                            {t("form.submitting")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t("form.submitBtn")}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
