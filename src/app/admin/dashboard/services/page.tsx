// src/app/admin/dashboard/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "الخدمات" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">الخدمات</h1>
          <p className="text-dark-400 text-sm mt-1">إدارة خدمات الشركة المعروضة في الموقع</p>
        </div>
        <Link href="#" className="btn-primary text-sm opacity-50 cursor-not-allowed">
          <Plus className="w-4 h-4" />
          خدمة جديدة
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800">
                {["الترتيب", "اسم الخدمة", "العنوان الإنجليزي", "الحالة", ""].map((h) => (
                  <th key={h} className="text-start px-6 py-4 text-dark-500 font-semibold
                                         text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-dark-800/50 transition-colors group">
                  <td className="px-6 py-4 text-dark-500 font-mono text-xs">
                    #{service.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{service.titleAr}</div>
                    <div className="text-dark-500 text-xs mt-0.5 line-clamp-1">
                      {service.descriptionAr}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-400 text-xs" dir="ltr">
                    {service.titleEn}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "flex items-center gap-1.5 text-xs font-medium",
                      service.published ? "text-emerald-400" : "text-dark-500"
                    )}>
                      {service.published
                        ? <><ToggleRight className="w-4 h-4" /> مفعّل</>
                        : <><ToggleLeft className="w-4 h-4" /> معطّل</>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg glass-light flex items-center justify-center
                                         text-dark-400 hover:text-emerald-400 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5">
        <p className="text-dark-400 text-sm">
          💡 لتعديل محتوى الخدمات، استخدم Prisma Studio:{" "}
          <code className="text-emerald-400 bg-dark-800 px-2 py-0.5 rounded text-xs" dir="ltr">
            npx prisma studio
          </code>
        </p>
      </div>
    </div>
  );
}
