// src/app/[locale]/(site)/layout.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
