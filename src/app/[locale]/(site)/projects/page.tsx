// src/app/[locale]/(site)/projects/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { cn, formatDate, getLocalizedField } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.meta" });
  return { title: t("title"), description: t("description") };
}

const categoryMap: Record<string, string> = {
  all:            "ALL",
  commercial:     "COMMERCIAL",
  residential:    "RESIDENTIAL",
  industrial:     "INDUSTRIAL",
  infrastructure: "INFRASTRUCTURE",
  interior:       "INTERIOR",
  construction:   "CONSTRUCTION",
};

const categoryColors: Record<string, string> = {
  COMMERCIAL:     "bg-blue-500/10 text-blue-400 border-blue-500/20",
  RESIDENTIAL:    "bg-purple-500/10 text-purple-400 border-purple-500/20",
  INDUSTRIAL:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
  INFRASTRUCTURE: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  INTERIOR:       "bg-pink-500/10 text-pink-400 border-pink-500/20",
  CONSTRUCTION:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  OTHER:          "bg-dark-700 text-dark-400 border-dark-600",
};

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale }   = await params;
  const { category } = await searchParams;

  const t    = await getTranslations({ locale, namespace: "projects" });
  const isAr = locale === "ar";

  const selectedCat  = category ?? "all";
  const prismaFilter = categoryMap[selectedCat];

  const projects = await prisma.project.findMany({
    where: {
      status: "PUBLISHED",
      ...(prismaFilter && prismaFilter !== "ALL"
        ? { category: prismaFilter as "COMMERCIAL" | "RESIDENTIAL" | "INDUSTRIAL" | "INFRASTRUCTURE" | "INTERIOR" | "CONSTRUCTION" | "OTHER" }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const jsonLd = {
    "@context":      "https://schema.org",
    "@type":         "ItemList",
    name:            isAr ? "مشاريع شركة الفريدة" : "Alfarida Company Projects",
    numberOfItems:   projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type":    "CreativeWork",
      position:   i + 1,
      name:       getLocalizedField(p as Record<string, unknown>, "title", locale),
      description: getLocalizedField(p as Record<string, unknown>, "description", locale),
    })),
  };

  const filterKeys = ["all", "commercial", "residential", "industrial", "infrastructure", "interior", "construction"] as const;

  return (
    <div className="page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="orb orb-emerald w-[500px] h-[500px] -top-40 start-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/0 to-dark-950" />

        <div className="container-wide relative z-10 text-center">
          <div className="section-badge mx-auto">{t("hero.badge")}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5">
            {t("hero.title")}
          </h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-[72px] z-40 bg-dark-950/90 backdrop-blur-xl
                          border-b border-dark-800 py-4">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filterKeys.map((key) => {
              const active = selectedCat === key;
              return (
                <a
                  key={key}
                  href={key === "all" ? "?" : `?category=${key}`}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    active
                      ? "bg-emerald-500 text-dark-950"
                      : "glass-light text-dark-400 hover:text-white hover:border-emerald-500/30"
                  )}
                >
                  {t(`filters.${key}`)}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="section-padding">
        <div className="container-wide">
          {projects.length === 0 ? (
            <div className="text-center py-24">
              <Building2 className="w-16 h-16 text-dark-700 mx-auto mb-4" />
              <p className="text-dark-400">{t("empty")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => {
                const catColor = categoryColors[project.category] ?? categoryColors.OTHER;
                return (
                  <article
                    key={project.id}
                    className={cn(
                      "card card-hover group overflow-hidden",
                      "animate-fade-in",
                      `animate-delay-${Math.min((i + 1) * 100, 600)}`
                    )}
                  >
                    {/* Cover image */}
                    <div className="relative h-52 bg-gradient-to-br from-dark-800 to-dark-900 overflow-hidden">
                      {project.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.coverImage}
                          alt={getLocalizedField(project as Record<string, unknown>, "title", locale)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building2 className="w-14 h-14 text-dark-700 group-hover:text-dark-600
                                                transition-colors duration-300" />
                        </div>
                      )}

                      {/* Category */}
                      <div className="absolute top-3 start-3">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px]",
                          "font-bold border",
                          catColor
                        )}>
                          {t(`filters.${project.category.toLowerCase()}` as keyof typeof t)}
                        </span>
                      </div>

                      {/* Featured star */}
                      {project.featured && (
                        <div className="absolute top-3 end-3">
                          <span className="badge text-[10px]">
                            ★ {isAr ? "مميز" : "Featured"}
                          </span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80
                                      via-transparent to-transparent opacity-0
                                      group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <h2 className="text-white font-bold text-lg mb-2
                                     group-hover:text-emerald-400 transition-colors duration-200">
                        {getLocalizedField(project as Record<string, unknown>, "title", locale)}
                      </h2>
                      <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {getLocalizedField(project as Record<string, unknown>, "description", locale)}
                      </p>

                      {/* Client */}
                      {project.clientAr && (
                        <div className="text-xs text-dark-500 mb-3 font-medium">
                          {t("card.client")}:{" "}
                          <span className="text-dark-300">
                            {getLocalizedField(project as Record<string, unknown>, "client", locale)}
                          </span>
                        </div>
                      )}

                      {/* Meta row */}
                      <div className="flex items-center justify-between pt-4 border-t border-dark-800">
                        <div className="flex flex-col gap-1">
                          {project.locationAr && (
                            <div className="flex items-center gap-1.5 text-dark-500 text-xs">
                              <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                              {getLocalizedField(project as Record<string, unknown>, "location", locale)}
                            </div>
                          )}
                          {project.completedAt && (
                            <div className="flex items-center gap-1.5 text-dark-500 text-xs">
                              <Calendar className="w-3 h-3 text-emerald-700 shrink-0" />
                              {formatDate(project.completedAt, locale)}
                            </div>
                          )}
                        </div>

                        {project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg glass-light flex items-center justify-center
                                       text-dark-400 hover:text-emerald-400 transition-colors"
                            aria-label={t("card.viewDetails")}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Count */}
          {projects.length > 0 && (
            <p className="text-center text-dark-500 text-sm mt-10">
              {isAr
                ? `عرض ${projects.length} مشروع`
                : `Showing ${projects.length} project${projects.length !== 1 ? "s" : ""}`}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
