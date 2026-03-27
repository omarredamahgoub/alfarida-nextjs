// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = "ar"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  }).format(new Date(date));
}

export function getLocalizedField<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: string
): string {
  const key = `${field}${locale === "ar" ? "Ar" : "En"}` as keyof T;
  return (obj[key] as string) ?? "";
}
