"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const PhoneIcon     = () => <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
const MailIcon      = () => <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const MapPinIcon    = () => <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const FacebookIcon  = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
const InstagramIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TwitterIcon   = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const TikTokIcon    = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>;
const SnapchatIcon  = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.8 2 6.5 4.3 6.5 7.5v.8c-.3.1-.6.1-.9.2-.3.1-.5.3-.5.6s.2.6.5.7l.3.1c-.4.8-.9 1.5-1.6 2-.2.1-.2.4-.1.6.4.6 1.4.9 3 1.1.2.4.4.8.9.8.3 0 .7-.1 1.3-.2.5.5 1.2.8 2.1.8s1.6-.3 2.1-.8c.6.1 1 .2 1.3.2.5 0 .7-.4.9-.8 1.6-.2 2.6-.5 3-1.1.1-.2.1-.5-.1-.6-.7-.5-1.2-1.2-1.6-2l.3-.1c.3-.1.5-.4.5-.7s-.2-.5-.5-.6c-.3-.1-.6-.1-.9-.2v-.8C17.5 4.3 15.2 2 12 2z"/></svg>;
const LinkedinIcon  = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

const socialLinks = [
  { Icon: FacebookIcon,  href: "https://www.facebook.com/alfaridaice.sa/",      label: "Facebook"  },
  { Icon: InstagramIcon, href: "https://www.instagram.com/alfaridaice_sa/",     label: "Instagram" },
  { Icon: TwitterIcon,   href: "https://x.com/EngMoha64468185",                 label: "Twitter"   },
  { Icon: TikTokIcon,    href: "https://www.tiktok.com/@alfaridaice_sa",        label: "TikTok"    },
  { Icon: SnapchatIcon,  href: "https://www.snapchat.com/@alfaridaice_sa",      label: "Snapchat"  },
  { Icon: LinkedinIcon,  href: "https://sa.linkedin.com/company/al-farida-ice", label: "LinkedIn"  },
];

const quickLinks = [
  { key: "home",     href: "/" as const },
  { key: "services", href: "/services" as const },
  { key: "projects", href: "/projects" as const },
  { key: "about",    href: "/about" as const },
  { key: "contact",  href: "/contact" as const },
];

export default function Footer() {
  const t      = useTranslations("footer");
  const tNav   = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-950 border-t border-dark-800 overflow-hidden">
      <div className="orb orb-emerald w-96 h-96 -bottom-48 start-1/2 -translate-x-1/2 opacity-15" />

      <div className="container-wide py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center group-hover:bg-sky-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/40 group-hover:scale-110">
                <span className="text-dark-950 font-black text-xl">ف</span>
              </div>
              <span className="font-bold text-white text-base">
                {locale === "ar" ? "شركة الفريدة" : "Alfarida Company"}
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-dark-400 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-200 hover:shadow-md hover:shadow-sky-500/20 hover:scale-110 hover:-translate-y-0.5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-dark-400 hover:text-sky-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors" />
                    {tNav(key as keyof typeof tNav)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+966598366214" className="flex items-start gap-3 text-dark-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                  <span className="text-emerald-500"><PhoneIcon /></span>
                  <span dir="ltr">+966-598-366-214</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@alfarida.com" className="flex items-start gap-3 text-dark-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                  <span className="text-emerald-500"><MailIcon /></span>
                  <span>info@alfarida.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-dark-400 text-sm">
                  <span className="text-emerald-500"><MapPinIcon /></span>
                  <span>
                    {locale === "ar"
                      ? "الدمام، المنطقة الشرقية، المملكة العربية السعودية"
                      : "Dammam, Eastern Province, Saudi Arabia"}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {locale === "ar" ? "المعلومات القانونية" : "Legal Info"}
            </h3>
            <div className="space-y-3">
              <div className="glass-light rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-dark-500">{t("cr")}</span>
                  <span className="text-dark-300 font-mono" dir="ltr">7028430937</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-dark-500">{t("vat")}</span>
                  <span className="text-dark-300 font-mono" dir="ltr">314282530700003</span>
                </div>
              </div>
              <div className="glass-light rounded-xl p-4">
                <p className="text-xs text-dark-500 leading-relaxed">
                  {locale === "ar"
                    ? "مرخصة من وزارة التجارة السعودية ZATCA"
                    : "Licensed by Ministry of Commerce & registered with Saudi Council of Engineers"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-800 relative z-10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-500">
          <p>
            © {currentYear}{" "}
            {locale === "ar" ? "شركة الفريدة" : "Alfarida Company"}.{" "}
            {t("rights")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              {locale === "ar" ? "الشروط والأحكام" : "Terms of Use"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}