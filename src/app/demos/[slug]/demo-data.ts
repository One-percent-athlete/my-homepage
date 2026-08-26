export const demoSlugs = [
  "task-schedule",
  "product-management",
  "modern-landing",
  "interactive-portfolio",
  "ecommerce-platform",
  "smart-matching",
] as const;

export type DemoSlug = (typeof demoSlugs)[number];

export const demoTitles: Record<DemoSlug, string> = {
  "task-schedule": "Task Schedule Management",
  "product-management": "Product Management System",
  "modern-landing": "Modern Landing Page",
  "interactive-portfolio": "Interactive Portfolio",
  "ecommerce-platform": "E-Commerce Platform",
  "smart-matching": "Smart Matching App",
};
