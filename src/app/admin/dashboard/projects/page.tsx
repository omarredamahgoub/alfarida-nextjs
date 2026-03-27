// src/app/admin/dashboard/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, cn } from "@/lib/utils";
import { Plus, Pencil, Eye, EyeOff, Star } from "lucide-react";

export const metadata: Metadata = { title: "المشاريع" };

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  DRAFT:     "bg-dark-700 text-dark-400 border-dark-600",
  ARCHIVED:  "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  PUBLISHED: "منشور",
  DRAFT:     "مسودة",
  ARCHIVED:  "مؤرشف",
};

const categoryLabels: Record<string, string> = {
  COMMERCIAL:     "تجاري",
  RESIDENTIAL:    "سكني",
  INDUSTRIAL:     "صناعي",
  INFRASTRUCTURE: "بنية تحتية",
  INTERIOR:       "تصميم داخلي",
  CONSTRUCTION:   "إنشاء",
  OTHER:          "أخرى",
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">المشاريع</h1>
          <p className="text-dark-400 text-sm mt-1">
            إدارة مشاريع الشركة ({projects.length} مشروع)
          </p>
        </div>
        <Link href="/admin/dashboard/projects/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          مشروع جديد
        </Link>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-500 mb-4">لا توجد مشاريع حتى الآن</p>
            <Link href="/admin/dashboard/projects/new" className="btn-primary text-sm">
              <Plus className="w-4 h-4" />
              أضف أول مشروع
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-800">
                  {["المشروع", "التصنيف", "الحالة", "الترتيب", "تاريخ الإنجاز", ""].map((h) => (
                    <th key={h} className="text-start px-6 py-4 text-dark-500 font-semibold
                                           text-xs uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-dark-800/50 transition-colors group">
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <Star className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        )}
                        <div>
                          <div className="text-white font-medium">{project.titleAr}</div>
                          <div className="text-dark-500 text-xs">{project.titleEn}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-dark-400 text-xs">
                      {categoryLabels[project.category] ?? project.category}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border",
                        statusStyles[project.status]
                      )}>
                        {statusLabels[project.status]}
                      </span>
                    </td>

                    {/* Order */}
                    <td className="px-6 py-4 text-dark-500 text-xs">
                      #{project.order}
                    </td>

                    {/* Completed at */}
                    <td className="px-6 py-4 text-dark-500 text-xs whitespace-nowrap">
                      {project.completedAt
                        ? formatDate(project.completedAt, "ar")
                        : "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100
                                      transition-opacity">
                        <Link
                          href={`/admin/dashboard/projects/${project.id}`}
                          className="w-8 h-8 rounded-lg glass-light flex items-center justify-center
                                     text-dark-400 hover:text-emerald-400 transition-colors"
                          title="تعديل"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <a
                          href={`/ar/projects`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg glass-light flex items-center justify-center
                                     text-dark-400 hover:text-blue-400 transition-colors"
                          title="معاينة"
                        >
                          {project.status === "PUBLISHED"
                            ? <Eye className="w-3.5 h-3.5" />
                            : <EyeOff className="w-3.5 h-3.5" />
                          }
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
