type Service = {
  slug: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    slug: "web-design",
    title: "Web Design",
    description: "Modern responsive web design",
  },
  {
    slug: "seo",
    title: "SEO Optimization",
    description: "Improve your search rankings",
  },
];

export function getAllServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return services.map((s) => ({ slug: s.slug }));
}