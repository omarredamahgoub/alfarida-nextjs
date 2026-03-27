"use client";

// src/app/admin/dashboard/projects/new/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { value: "COMMERCIAL",     label: "تجاري" },
  { value: "RESIDENTIAL",    label: "سكني" },
  { value: "INDUSTRIAL",     label: "صناعي" },
  { value: "INFRASTRUCTURE", label: "بنية تحتية" },
  { value: "INTERIOR",       label: "تصميم داخلي" },
  { value: "CONSTRUCTION",   label: "إنشاء" },
  { value: "OTHER",          label: "أخرى" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const [form, setForm] = useState({
    slug:          "",
    status:        "DRAFT",
    featured:      false,
    order:         0,
    titleAr:       "",
    titleEn:       "",
    descriptionAr: "",
    descriptionEn: "",
    clientAr:      "",
    clientEn:      "",
    locationAr:    "",
    locationEn:    "",
    category:      "OTHER",
    completedAt:   "",
    externalUrl:   "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          ...form,
          completedAt: form.completedAt
            ? new Date(form.completedAt).toISOString()
            : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "حدث خطأ أثناء الحفظ");
        return;
      }

      router.push("/admin/dashboard/projects");
      router.refresh();
    } catch {
      setError("خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/projects"
          className="w-9 h-9 rounded-xl glass-light flex items-center justify-center
                     text-dark-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">مشروع جديد</h1>
          <p className="text-dark-400 text-sm">أضف مشروعاً جديداً إلى محفظة الشركة</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="card p-6 space-y-5">
          <h2 className="text-white font-bold border-b border-dark-800 pb-4">
            المعلومات الأساسية
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                العنوان (عربي) *
              </label>
              <input
                name="titleAr" value={form.titleAr} onChange={handleChange}
                required placeholder="اسم المشروع بالعربية"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Title (English) *
              </label>
              <input
                name="titleEn" value={form.titleEn} onChange={handleChange}
                required placeholder="Project name in English" dir="ltr"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Slug (URL) *
            </label>
            <input
              name="slug" value={form.slug} onChange={handleChange}
              required placeholder="project-name-en" dir="ltr"
              pattern="[a-z0-9-]+"
              className="input-field font-mono text-sm"
            />
            <p className="text-dark-600 text-xs mt-1">
              أحرف صغيرة وأرقام وشرطات فقط
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                الوصف (عربي) *
              </label>
              <textarea
                name="descriptionAr" value={form.descriptionAr} onChange={handleChange}
                required rows={4} placeholder="وصف المشروع بالعربية"
                className="input-field resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Description (English) *
              </label>
              <textarea
                name="descriptionEn" value={form.descriptionEn} onChange={handleChange}
                required rows={4} placeholder="Project description in English" dir="ltr"
                className="input-field resize-none"
              />
            </div>
          </div>
        </div>

        {/* Client & Location */}
        <div className="card p-6 space-y-5">
          <h2 className="text-white font-bold border-b border-dark-800 pb-4">
            العميل والموقع
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">اسم العميل (عربي)</label>
              <input name="clientAr" value={form.clientAr} onChange={handleChange}
                placeholder="اسم العميل" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Client Name (English)</label>
              <input name="clientEn" value={form.clientEn} onChange={handleChange}
                placeholder="Client name" dir="ltr" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">الموقع (عربي)</label>
              <input name="locationAr" value={form.locationAr} onChange={handleChange}
                placeholder="المدينة، المنطقة" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Location (English)</label>
              <input name="locationEn" value={form.locationEn} onChange={handleChange}
                placeholder="City, Region" dir="ltr" className="input-field" />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="card p-6 space-y-5">
          <h2 className="text-white font-bold border-b border-dark-800 pb-4">الإعدادات</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">التصنيف</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="input-field">
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">الحالة</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="input-field">
                <option value="DRAFT">مسودة</option>
                <option value="PUBLISHED">منشور</option>
                <option value="ARCHIVED">مؤرشف</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">الترتيب</label>
              <input type="number" name="order" value={form.order} onChange={handleChange}
                min={0} className="input-field" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">تاريخ الإنجاز</label>
              <input type="date" name="completedAt" value={form.completedAt} onChange={handleChange}
                className="input-field" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">رابط خارجي</label>
              <input name="externalUrl" value={form.externalUrl} onChange={handleChange}
                placeholder="https://..." className="input-field" dir="ltr" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input type="checkbox" name="featured"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="sr-only peer" />
              <div className="w-10 h-6 rounded-full bg-dark-700 peer-checked:bg-emerald-500
                              transition-colors duration-200" />
              <div className="absolute top-1 start-1 w-4 h-4 rounded-full bg-white
                              peer-checked:translate-x-4 rtl:peer-checked:-translate-x-4
                              transition-transform duration-200" />
            </div>
            <span className="text-sm text-dark-300 group-hover:text-white transition-colors">
              مشروع مميز (يظهر في الصفحة الرئيسية)
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 justify-end">
          <Link href="/admin/dashboard/projects" className="btn-ghost">
            إلغاء
          </Link>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</>
            ) : (
              <><Save className="w-4 h-4" /> حفظ المشروع</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
