// src/app/[locale]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">الصفحة غير موجودة</h1>
        <p className="text-dark-400 mb-8">
          Page Not Found — الصفحة التي تبحث عنها غير موجودة
        </p>
        <Link href="/ar" className="btn-primary">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
