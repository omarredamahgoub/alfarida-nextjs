// prisma/seed.ts
import { PrismaClient, ProjectCategory, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Alfarida database...");

  // ── Admin user ──────────────────────────────
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "Admin@1234",
    12
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@alfarida.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@alfarida.com",
      password: hashedPassword,
      name: "مدير الموقع",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user created");

  // ── Services ────────────────────────────────
  const services = [
    {
      slug: "general-contracting",
      icon: "building-2",
      order: 1,
      titleAr: "المقاولات العامة",
      titleEn: "General Contracting",
      descriptionAr: "نقدم خدمات المقاولات العامة الشاملة من تصميم وتنفيذ وإشراف على المشاريع الإنشائية بأعلى معايير الجودة.",
      descriptionEn: "We provide comprehensive general contracting services including design, execution, and supervision of construction projects to the highest quality standards.",
      featuresAr: ["إدارة المشاريع", "الإشراف الهندسي", "ضمان الجودة", "الالتزام بالمواعيد"],
      featuresEn: ["Project Management", "Engineering Supervision", "Quality Assurance", "On-time Delivery"],
    },
    {
      slug: "infrastructure",
      icon: "network",
      order: 2,
      titleAr: "البنية التحتية",
      titleEn: "Infrastructure",
      descriptionAr: "تنفيذ مشاريع البنية التحتية المتكاملة شاملة الطرق والشبكات والأنظمة الأساسية.",
      descriptionEn: "Execution of integrated infrastructure projects including roads, networks, and essential systems.",
      featuresAr: ["شبكات المياه", "شبكات الصرف الصحي", "الطرق والممرات", "الإضاءة"],
      featuresEn: ["Water Networks", "Sewage Systems", "Roads & Pathways", "Lighting"],
    },
    {
      slug: "interior-design",
      icon: "layout-dashboard",
      order: 3,
      titleAr: "التصميم الداخلي",
      titleEn: "Interior Design",
      descriptionAr: "تحويل المساحات إلى بيئات راقية تجمع بين الجمالية والوظيفية بأسلوب معاصر.",
      descriptionEn: "Transforming spaces into sophisticated environments that blend aesthetics and functionality in a contemporary style.",
      featuresAr: ["التصميم المعماري", "الديكور الداخلي", "الإضاءة التصميمية", "الأثاث المخصص"],
      featuresEn: ["Architectural Design", "Interior Décor", "Decorative Lighting", "Custom Furniture"],
    },
    {
      slug: "industrial-projects",
      icon: "factory",
      order: 4,
      titleAr: "المشاريع الصناعية",
      titleEn: "Industrial Projects",
      descriptionAr: "تنفيذ المنشآت الصناعية والمصانع وفق أعلى المعايير الهندسية والسلامة.",
      descriptionEn: "Construction of industrial facilities and factories in accordance with the highest engineering and safety standards.",
      featuresAr: ["المصانع والمستودعات", "أنظمة السلامة", "التمديدات الصناعية", "الصيانة"],
      featuresEn: ["Factories & Warehouses", "Safety Systems", "Industrial Piping", "Maintenance"],
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log("✅ Services seeded");

  // ── Sample projects ──────────────────────────
  const projects = [
    {
      slug: "riyadh-commercial-complex",
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 1,
      titleAr: "المجمع التجاري الرياض",
      titleEn: "Riyadh Commercial Complex",
      descriptionAr: "مجمع تجاري متكامل في قلب الرياض يضم 120 محلاً تجارياً وأبراج مكتبية حديثة.",
      descriptionEn: "An integrated commercial complex in the heart of Riyadh featuring 120 retail units and modern office towers.",
      clientAr: "مجموعة الفريدة للاستثمار",
      clientEn: "Alfarida Investment Group",
      locationAr: "الرياض، المملكة العربية السعودية",
      locationEn: "Riyadh, Saudi Arabia",
      category: ProjectCategory.COMMERCIAL,
      tags: ["commercial", "towers", "retail"],
      completedAt: new Date("2024-06-01"),
    },
    {
      slug: "dammam-residential-villas",
      status: ProjectStatus.PUBLISHED,
      featured: true,
      order: 2,
      titleAr: "فيلات الدمام السكنية",
      titleEn: "Dammam Residential Villas",
      descriptionAr: "مجمع فلل راقي يضم 45 وحدة سكنية فاخرة مع مرافق ترفيهية متكاملة.",
      descriptionEn: "A premium villa compound comprising 45 luxury residential units with complete recreational facilities.",
      clientAr: "شركة الإسكان الخليجية",
      clientEn: "Gulf Housing Company",
      locationAr: "الدمام، المنطقة الشرقية",
      locationEn: "Dammam, Eastern Province",
      category: ProjectCategory.RESIDENTIAL,
      tags: ["residential", "villas", "luxury"],
      completedAt: new Date("2023-12-01"),
    },
    {
      slug: "jubail-industrial-facility",
      status: ProjectStatus.PUBLISHED,
      featured: false,
      order: 3,
      titleAr: "منشأة الجبيل الصناعية",
      titleEn: "Jubail Industrial Facility",
      descriptionAr: "منشأة صناعية متخصصة على مساحة 30,000 متر مربع في المدينة الصناعية بالجبيل.",
      descriptionEn: "A specialized industrial facility spanning 30,000 square meters in Jubail Industrial City.",
      clientAr: "شركة البتروكيماويات المتحدة",
      clientEn: "United Petrochemicals Co.",
      locationAr: "الجبيل الصناعية",
      locationEn: "Jubail Industrial City",
      category: ProjectCategory.INDUSTRIAL,
      tags: ["industrial", "petrochemical", "jubail"],
      completedAt: new Date("2024-03-01"),
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log("✅ Projects seeded");

  // ── Site settings ────────────────────────────
  const settings = [
    { key: "company_name_ar", value: "شركة الفريدة", group: "branding" },
    { key: "company_name_en", value: "Alfarida Company", group: "branding" },
    { key: "tagline_ar", value: "نبني المستقبل بجودة لا تضاهى", group: "branding" },
    { key: "tagline_en", value: "Building the Future with Unmatched Quality", group: "branding" },
    { key: "phone", value: "+966-13-000-0000", group: "contact" },
    { key: "email", value: "info@alfarida.com", group: "contact" },
    { key: "address_ar", value: "الدمام، المنطقة الشرقية، المملكة العربية السعودية", group: "contact" },
    { key: "address_en", value: "Dammam, Eastern Province, Saudi Arabia", group: "contact" },
    { key: "cr_number", value: "2050XXXXXXX", group: "legal" },
    { key: "vat_number", value: "3XXXXXXXXXXXXXXX", group: "legal" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log("✅ Site settings seeded");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
