// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FolderKanban, MessageSquare,
  Wrench, Settings, LogOut, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard",           label: "لوحة التحكم",   icon: LayoutDashboard },
  { href: "/admin/dashboard/projects",  label: "المشاريع",      icon: FolderKanban    },
  { href: "/admin/dashboard/inquiries", label: "الاستفسارات",   icon: MessageSquare   },
  { href: "/admin/dashboard/services",  label: "الخدمات",       icon: Wrench          },
  { href: "/admin/dashboard/settings",  label: "الإعدادات",     icon: Settings        },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-dark-900 border-e border-dark-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center
                          group-hover:bg-emerald-400 transition-colors">
            <span className="text-dark-950 font-black text-xl">ف</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">شركة الفريدة</div>
            <div className="text-dark-500 text-xs">لوحة الإدارة</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                "transition-all duration-200 group",
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-dark-400 hover:text-white hover:bg-dark-800"
              )}
            >
              <Icon className={cn(
                "w-4.5 h-4.5 shrink-0",
                active ? "text-emerald-400" : "text-dark-500 group-hover:text-dark-300"
              )} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User / logout */}
      <div className="p-4 border-t border-dark-800">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm
                     font-medium text-dark-400 hover:text-red-400 hover:bg-red-500/5
                     transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-400" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
