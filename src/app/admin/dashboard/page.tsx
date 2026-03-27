// src/app/admin/dashboard/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  FolderKanban, MessageSquare, CheckCircle2, Clock,
  TrendingUp, Eye, Plus, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Aggregate stats
  const [
    totalProjects,
    publishedProjects,
    totalInquiries,
    newInquiries,
    recentInquiries,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    {
      label:  "إجمالي المشاريع",
      value:  totalProjects,
      icon:   FolderKanban,
      color:  "text-emerald-400",
      bg:     "bg-emerald-500/10",
      change: "+3 هذا الشهر",
      positive: true,
    },
    {
      label:  "مشاريع منشورة",
      value:  publishedProjects,
      icon:   Eye,
      color:  "text-blue-400",
      bg:     "bg-blue-500/10",
      change: `${Math.round((publishedProjects / Math.max(totalProjects, 1)) * 100)}% منشورة`,
      positive: true,
    },
    {
      label:  "إجمالي الاستفسارات",
      value:  totalInquiries,
      icon:   MessageSquare,
      color:  "text-purple-400",
      bg:     "bg-purple-500/10",
      change: "+12 هذا الأسبوع",
      positive: true,
    },
    {
      label:  "استفسارات جديدة",
      value:  newInquiries,
      icon:   Clock,
      color:  "text-orange-400",
      bg:     "bg-orange-500/10",
      change: "تحتاج مراجعة",
      positive: false,
    },
  ];

  const inquiryStatusColors: Record<string, string> = {
    NEW:         "bg-orange-500/10 text-orange-400 border-orange-500/20",
    IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    RESPONDED:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    CLOSED:      "bg-dark-700 text-dark-400 border-dark-600",
    SPAM:        "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const inquiryStatusLabels: Record<string, string> = {
    NEW:         "جديد",
    IN_PROGRESS: "قيد المعالجة",
    RESPONDED:   "تم الرد",
    CLOSED:      "مغلق",
    SPAM:        "سبام",
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            مرحباً بعودتك، {session?.user?.name?.split(" ")[0] ?? "مدير"} 👋
          </h1>
          <p className="text-dark-400 text-sm mt-1">
            نظرة عامة على أداء الموقع والمشاريع
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/projects/new"
            className="btn-primary text-sm"
          >
            <Plus className="w-4 h-4" />
            مشروع جديد
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg, change, positive }) => (
          <div
            key={label}
            className="card p-5 hover:border-dark-700 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bg)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <TrendingUp className={cn(
                "w-4 h-4",
                positive ? "text-emerald-500" : "text-orange-500"
              )} />
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-dark-500 text-xs font-medium mb-2">{label}</div>
            <div className={cn(
              "text-xs font-medium",
              positive ? "text-emerald-500" : "text-orange-400"
            )}>
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column: Inquiries + Projects */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Inquiries */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold">أحدث الاستفسارات</h2>
            <Link
              href="/admin/dashboard/inquiries"
              className="text-emerald-400 text-xs font-medium hover:text-emerald-300
                         transition-colors flex items-center gap-1"
            >
              عرض الكل
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="text-dark-500 text-sm text-center py-8">
                لا توجد استفسارات حتى الآن
              </p>
            ) : (
              recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl
                             bg-dark-800 hover:bg-dark-700/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium truncate">
                        {inquiry.name}
                      </span>
                      <span className={cn(
                        "shrink-0 inline-flex items-center px-2 py-0.5 rounded-full",
                        "text-[10px] font-bold border",
                        inquiryStatusColors[inquiry.status]
                      )}>
                        {inquiryStatusLabels[inquiry.status]}
                      </span>
                    </div>
                    <p className="text-dark-400 text-xs truncate">{inquiry.email}</p>
                    {inquiry.subject && (
                      <p className="text-dark-500 text-xs mt-0.5 truncate">{inquiry.subject}</p>
                    )}
                  </div>
                  <div className="text-dark-600 text-[10px] shrink-0">
                    {formatDate(inquiry.createdAt, "ar")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold">أحدث المشاريع</h2>
            <Link
              href="/admin/dashboard/projects"
              className="text-emerald-400 text-xs font-medium hover:text-emerald-300
                         transition-colors flex items-center gap-1"
            >
              عرض الكل
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.length === 0 ? (
              <p className="text-dark-500 text-sm text-center py-8">
                لا توجد مشاريع حتى الآن
              </p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl
                             bg-dark-800 hover:bg-dark-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center
                                    justify-center shrink-0">
                      <FolderKanban className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">
                        {project.titleAr}
                      </div>
                      <div className="text-dark-500 text-xs">{project.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border",
                      project.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : project.status === "DRAFT"
                        ? "bg-dark-700 text-dark-400 border-dark-600"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                      {project.status === "PUBLISHED" ? "منشور" :
                       project.status === "DRAFT"     ? "مسودة" : "مؤرشف"}
                    </span>
                    <Link
                      href={`/admin/dashboard/projects/${project.id}`}
                      className="text-dark-500 hover:text-emerald-400 transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h2 className="text-white font-bold mb-4">إجراءات سريعة</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "إضافة مشروع",      href: "/admin/dashboard/projects/new",  icon: Plus,         color: "text-emerald-400" },
            { label: "عرض الاستفسارات", href: "/admin/dashboard/inquiries",       icon: MessageSquare, color: "text-blue-400"    },
            { label: "تعديل الخدمات",   href: "/admin/dashboard/services",        icon: CheckCircle2,  color: "text-purple-400"  },
            { label: "إعدادات الموقع",  href: "/admin/dashboard/settings",        icon: TrendingUp,    color: "text-orange-400"  },
          ].map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl bg-dark-800
                         hover:bg-dark-700 border border-dark-700 hover:border-dark-600
                         transition-all duration-200 group"
            >
              <Icon className={cn("w-5 h-5", color)} />
              <span className="text-dark-300 text-sm font-medium
                               group-hover:text-white transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
