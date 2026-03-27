// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always", // أو "as-needed" حسب تفضيلك لظهور /ar في الرابط
  localeDetection: false, // أضف هذا السطر لمنع حلقات التوجيه التلقائية بناءً على لغة المتصفح
  pathnames: {
    "/": "/",
    // بقية المسارات...
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
