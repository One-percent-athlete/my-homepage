export const demoSlugs = [
  "chatbot",
  "ski-school", "automobile-operations", "company-meals", "uniform-ordering", "traveler-guide-matching",
  "task-schedule",
  "product-management",
  "modern-landing",
  "interactive-portfolio",
  "ecommerce-platform",
  "smart-matching",
] as const;

export type DemoSlug = (typeof demoSlugs)[number];

export const demoTitles: Record<DemoSlug, string> = {
  "chatbot":"Chatbot Assistant",
  "ski-school":"Ski School Management", "automobile-operations":"Automobile Management", "company-meals":"Company Meal Ordering", "uniform-ordering":"Company Uniform Ordering", "traveler-guide-matching":"Traveler & Local Guide Matching",
  "task-schedule": "Task Schedule Management",
  "product-management": "Product Management System",
  "modern-landing": "Modern Landing Page",
  "interactive-portfolio": "Interactive Portfolio",
  "ecommerce-platform": "E-Commerce Platform",
  "smart-matching": "Smart Matching App",
};
