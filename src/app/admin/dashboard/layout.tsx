// src/app/admin/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Bell, Search } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-dark-900/80 backdrop-blur border-b border-dark-800
                           flex items-center justify-between px-6 gap-4 sticky top-0 z-30">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input
                type="text"
                placeholder="بحث..."
                className="w-full ps-9 pe-4 py-2 rounded-xl bg-dark-800 border border-dark-700
                           text-dark-200 placeholder-dark-500 text-sm
                           focus:outline-none focus:border-emerald-500/50 focus:ring-1
                           focus:ring-emerald-500/10 transition-all"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl glass-light flex items-center
                               justify-center text-dark-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2 ps-3 border-s border-dark-700">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30
                              flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-xs">م</span>
              </div>
              <div className="text-sm">
                <div className="text-white font-medium">{session.user?.name ?? "مدير"}</div>
                <div className="text-dark-500 text-xs">{session.user?.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
