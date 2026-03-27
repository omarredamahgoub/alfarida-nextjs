"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = ["home", "services", "projects", "about", "contact"] as const;

const hrefMap: Record<string, string> = {
  home:     "/",
  services: "/services",
  projects: "/projects",
  about:    "/about",
  contact:  "/contact",
};

export default function Header() {
  const t        = useTranslations("nav");
  const locale   = useLocale();
  const pathname = usePathname();
  const isAr     = locale === "ar";

  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-xl shadow-black/20 border-b border-sky-500/10"
          : "bg-transparent"
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-wide h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center
                          group-hover:bg-sky-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sky-500/40 group-hover:scale-110"
>
            <span className="text-dark-950 font-black text-lg leading-none">ف</span>          </div>
          <div className="flex flex-col leading-tight">
            <span className={cn(
              "font-bold text-white text-sm",
              isAr ? "font-[Cairo]" : "font-[DM_Sans]"
            )}>
              {isAr ? "شركة الفريدة" : "Alfarida Co."}
            </span>
            <span className="text-sky-400 text-[10px] font-medium tracking-wider uppercase">
              {isAr ? "للتبريد والتجميد الصناعى" : "Construction & Contracting"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((key) => (
            <Link
              key={key}
              href={hrefMap[key] as "/"}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === hrefMap[key]
                  ? "text-sky-400 bg-sky-500/10"
                  : "text-dark-300 hover:text-white hover:bg-white/5"
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm
                         text-dark-300 hover:text-white hover:bg-white/5
                         transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{isAr ? "AR" : "EN"}</span>
              <ChevronDown className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                langDropdown && "rotate-180"
              )} />
            </button>

            {langDropdown && (
              <div className="absolute top-full mt-1 end-0 glass rounded-xl overflow-hidden
                              shadow-xl shadow-black/30 border border-sky-500/10 min-w-[120px]">
                {(["ar", "en"] as const).map((loc) => (
                  <a
                    key={loc}
                    href={`/${loc}${pathname}`}
                    onClick={() => setLangDropdown(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 text-sm transition-colors",
                      loc === locale
                        ? "text-sky-400 bg-sky-500/10"
                        : "text-dark-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{loc === "ar" ? "🇸🇦" : "🇬🇧"}</span>
                    <span>{loc === "ar" ? "العربية" : "English"}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link href="/contact" className="hidden md:inline-flex btn-primary text-xs">
            {t("getQuote")}
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-dark-300 hover:text-white
                       hover:bg-white/5 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-full inset-x-0 glass border-b border-sky-500/10",
        "transition-all duration-300 overflow-hidden",
        mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container-wide py-4 flex flex-col gap-1">
          {navLinks.map((key) => (
            <Link
              key={key}
              href={hrefMap[key] as "/"}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === hrefMap[key]
                  ? "text-sky-400 bg-sky-500/10"
                  : "text-dark-300 hover:text-white hover:bg-white/5"
              )}
            >
              {t(key)}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/5 mt-2">
            <Link href="/contact" className="btn-primary w-full justify-center">
              {t("getQuote")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
