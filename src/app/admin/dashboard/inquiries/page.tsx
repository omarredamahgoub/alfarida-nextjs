// src/app/admin/dashboard/inquiries/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { MessageSquare, Mail, Phone, Building2 } from "lucide-react";

export const metadata: Metadata = { title: "الاستفسارات" };

const statusColors: Record<string, string> = {
  NEW:         "bg-orange-500/10 text-orange-400 border-orange-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  RESPONDED:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CLOSED:      "bg-dark-700 text-dark-400 border-dark-600",
  SPAM:        "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  NEW:         "جديد",
  IN_PROGRESS: "قيد المعالجة",
  RESPONDED:   "تم الرد",
  CLOSED:      "مغلق",
  SPAM:        "سبام",
};

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    all:         inquiries.length,
    NEW:         inquiries.filter((i) => i.status === "NEW").length,
    IN_PROGRESS: inquiries.filter((i) => i.status === "IN_PROGRESS").length,
    RESPONDED:   inquiries.filter((i) => i.status === "RESPONDED").length,
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">الاستفسارات</h1>
          <p className="text-dark-400 text-sm mt-1">
            إدارة ومتابعة استفسارات العملاء
          </p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "الكل",          count: counts.all,         color: "text-white bg-dark-800 border-dark-700" },
          { label: "جديد",          count: counts.NEW,         color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
          { label: "قيد المعالجة", count: counts.IN_PROGRESS, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
          { label: "تم الرد",       count: counts.RESPONDED,   color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
        ].map(({ label, count, color }) => (
          <div key={label} className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium",
            color
          )}>
            {label}
            <span className="font-black">{count}</span>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="card overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-12 h-12 text-dark-700 mx-auto mb-3" />
            <p className="text-dark-500">لا توجد استفسارات حتى الآن</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-start px-6 py-4 text-dark-500 font-semibold text-xs uppercase tracking-wider">
                    المرسل
                  </th>
                  <th className="text-start px-6 py-4 text-dark-500 font-semibold text-xs uppercase tracking-wider">
                    بيانات التواصل
                  </th>
                  <th className="text-start px-6 py-4 text-dark-500 font-semibold text-xs uppercase tracking-wider">
                    الموضوع
                  </th>
                  <th className="text-start px-6 py-4 text-dark-500 font-semibold text-xs uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="text-start px-6 py-4 text-dark-500 font-semibold text-xs uppercase tracking-wider">
                    التاريخ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="hover:bg-dark-800/50 transition-colors"
                  >
                    {/* Name + company */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{inquiry.name}</div>
                      {inquiry.company && (
                        <div className="flex items-center gap-1 text-dark-500 text-xs mt-0.5">
                          <Building2 className="w-3 h-3" />
                          {inquiry.company}
                        </div>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-dark-400 text-xs">
                        <Mail className="w-3 h-3 text-emerald-700 shrink-0" />
                        <a href={`mailto:${inquiry.email}`}
                           className="hover:text-emerald-400 transition-colors">
                          {inquiry.email}
                        </a>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-1.5 text-dark-400 text-xs mt-1">
                          <Phone className="w-3 h-3 text-emerald-700 shrink-0" />
                          <a href={`tel:${inquiry.phone}`}
                             className="hover:text-emerald-400 transition-colors" dir="ltr">
                            {inquiry.phone}
                          </a>
                        </div>
                      )}
                    </td>

                    {/* Subject / message preview */}
                    <td className="px-6 py-4 max-w-xs">
                      {inquiry.subject && (
                        <div className="text-dark-200 font-medium text-xs mb-0.5">
                          {inquiry.subject}
                        </div>
                      )}
                      <div className="text-dark-500 text-xs truncate max-w-[200px]">
                        {inquiry.message}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border",
                        statusColors[inquiry.status]
                      )}>
                        {statusLabels[inquiry.status]}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-dark-500 text-xs whitespace-nowrap">
                      {formatDate(inquiry.createdAt, "ar")}
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
