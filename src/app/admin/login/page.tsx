// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="orb orb-emerald w-96 h-96 top-0 start-1/2 -translate-x-1/2 opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center
                          mx-auto mb-4 emerald-glow">
            <span className="text-dark-950 font-black text-3xl">ف</span>
          </div>
          <h1 className="text-2xl font-black text-white">لوحة تحكم الفريدة</h1>
          <p className="text-dark-400 text-sm mt-1">
            Alfarida Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-emerald-500/10">
          <h2 className="text-lg font-bold text-white mb-6">تسجيل الدخول</h2>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border
                            border-red-500/20 text-red-400 text-sm mb-6">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alfarida.com"
                  required
                  className="input-field ps-11"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field ps-11 pe-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-dark-500
                             hover:text-dark-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-dark-600 text-xs mt-6">
          هذه المنطقة محمية ومخصصة للموظفين المصرح لهم فقط
        </p>
      </div>
    </div>
  );
}
