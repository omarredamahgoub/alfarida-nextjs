// src/app/admin/dashboard/settings/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "الإعدادات" };

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });

  const grouped = settings.reduce<Record<string, typeof settings>>((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {});

  const groupLabels: Record<string, string> = {
    branding: "الهوية والعلامة التجارية",
    contact:  "بيانات التواصل",
    legal:    "المعلومات القانونية",
    general:  "عام",
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">إعدادات الموقع</h1>
        <p className="text-dark-400 text-sm mt-1">
          إدارة المعلومات الأساسية للشركة وإعدادات الموقع
        </p>
      </div>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="card p-6 space-y-4">
          <h2 className="text-white font-bold border-b border-dark-800 pb-4">
            {groupLabels[group] ?? group}
          </h2>
          <div className="space-y-4">
            {items.map((setting) => (
              <div key={setting.id} className="grid sm:grid-cols-3 gap-4 items-start">
                <div>
                  <div className="text-dark-300 text-sm font-medium">{setting.key}</div>
                  <div className="text-dark-600 text-xs mt-0.5 font-mono">{setting.type}</div>
                </div>
                <div className="sm:col-span-2">
                  <input
                    defaultValue={setting.value}
                    className="input-field text-sm"
                    dir={setting.key.endsWith("_ar") ? "rtl" : "ltr"}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card p-6">
        <h2 className="text-white font-bold mb-4">ملاحظة</h2>
        <p className="text-dark-400 text-sm leading-relaxed">
          لتعديل الإعدادات، قم بتحديث القيم مباشرة في قاعدة البيانات أو عبر Prisma Studio.{" "}
          سيتم إضافة واجهة التعديل المباشر في الإصدار القادم.
        </p>
        <div className="mt-4 p-3 rounded-xl bg-dark-800 font-mono text-xs text-emerald-400" dir="ltr">
          npx prisma studio
        </div>
      </div>
    </div>
  );
}
