
// types
export type ContactIcon = "email" | "phone" | "github" | "linkedin" | "instagram" | "facebook";

export type ContactEntry = {
  icon: ContactIcon;
  label: string;
  value: string;
  link: string;
};

export type QRCodeEntry = {
  label: string;
  src: string;
};

export interface ContactData {
  title: string;
  subtitle: string;
  contacts: ContactEntry[];
  qrcodes: QRCodeEntry[];
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  button: string;
}

export interface TravelData {
  title: string;
  description: string;
}

export interface QuoteData {
  text: string;
  author: string;
}

export interface SkillData {
  name: string;
  category: string;
  icon: string;
  level?: number;
}

export interface ProjectItem {
  title: string;
  desc: string;
  tech: string[];
}

export interface ProjectsData {
  title: string;
  items: ProjectItem[];
}

// translations
export const translations = {
  en: {
    hero: {
      title: "Ryu — Adventurer & Engineer",
      subtitle: "Freelance Web Developer | Global Explorer | Ski Instructor",
      description:
        "Building modern web apps and engineering solutions while exploring the world. With experience across 60+ countries, I bring a unique global perspective to problem-solving.",
      button: "Let’s Build Something Together",
    } as HeroData,
    travels: {
      title: "My Travels",
      description: "I’ve visited over 68 countries, exploring cultures and adventures.",
    } as TravelData,
    quote: {
      text: "If you can get 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.",
      author: "— James Clear",
    } as QuoteData,
    skills: [
      { name: "Project Management", category: "Professional", icon: "📊", level: 90 },
      { name: "Teamwork", category: "Professional", icon: "🤝", level: 95 },
      { name: "Time Management", category: "Professional", icon: "⏱️", level: 85 },
      { name: "Leadership", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "Python", category: "Technical", icon: "🐍", level: 85 },
      { name: "JavaScript", category: "Technical", icon: "✨", level: 90 },
    ] as SkillData[],
    projects: {
      title: "Projects",
      items: [
        { title: "Task Schedule Management App", desc: "Manage tasks efficiently with a sleek interface.", tech: ["React", "Node.js", "MongoDB"] },
        { title: "Product Management App", desc: "Organize and track products with real-time updates.", tech: ["Next.js", "Express", "PostgreSQL"] },
      ],
    } as ProjectsData,
    contact: {
      title: "Get in Touch",
      subtitle: "Open for freelance projects, collaborations, or just a chat about your next big idea. Reach me via any method below.",
      contacts: [
        { icon: "email", label: "Email", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: "phone", label: "Phone", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: "github", label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: "instagram", label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: "facebook", label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ] as ContactEntry[],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ] as QRCodeEntry[],
    } as ContactData,
  },
  ja: {
    hero: {
      title: "リュウ — 冒険者＆エンジニア",
      subtitle: "フリーランスWeb開発者 | 世界を旅する探検家 | スキーインストラクター",
      description:
        "世界を旅しながらモダンなWebアプリやエンジニアリングソリューションを構築。60カ国以上の経験を活かし、ユニークなグローバルな視点で問題解決に取り組みます。",
      button: "一緒に何かを作りましょう",
    } as HeroData,
    travels: {
      title: "私の旅行",
      description: "68か国以上を訪れ、文化と冒険を体験しました。",
    } as TravelData,
    quote: {
      text: "毎日1%ずつ良くなれば、1年後には37倍の成長を遂げることができる。",
      author: "— ジェームズ・クリア",
    } as QuoteData,
    skills: [
      { name: "プロジェクト管理", category: "Professional", icon: "📊", level: 90 },
      { name: "チームワーク", category: "Professional", icon: "🤝", level: 95 },
      { name: "時間管理", category: "Professional", icon: "⏱️", level: 85 },
      { name: "リーダーシップ", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "パイソン", category: "Technical", icon: "🐍", level: 85 },
      { name: "ジャバスクリプト", category: "Technical", icon: "✨", level: 90 },
    ] as SkillData[],
    projects: {
      title: "プロジェクト",
      items: [
        { title: "タスクスケジュール管理アプリ", desc: "洗練されたインターフェースでタスクを効率的に管理。", tech: ["React", "Node.js", "MongoDB"] },
        { title: "プロダクト管理アプリ", desc: "リアルタイムで製品を整理・追跡。", tech: ["Next.js", "Express", "PostgreSQL"] },
      ],
    } as ProjectsData,
    contact: {
      title: "お問い合わせ",
      subtitle: "フリーランスプロジェクト、コラボレーション、または次の大きなアイデアについての雑談も歓迎です。以下の方法でご連絡ください。",
      contacts: [
        { icon: "email", label: "メール", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: "phone", label: "電話", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: "github", label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: "instagram", label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: "facebook", label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ] as ContactEntry[],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ] as QRCodeEntry[],
    } as ContactData,
  },
  zh: {
    hero: {
      title: "Ryu — 冒险家 & 工程师",
      subtitle: "自由职业网页开发者 | 全球探险者 | 滑雪教练",
      description:
        "在探索世界的同时构建现代网页应用和工程解决方案。拥有60多个国家的经验，为问题解决带来独特的全球视角。",
      button: "让我们一起创造点什么",
    } as HeroData,
    travels: {
      title: "我的旅行",
      description: "我已访问超过68个国家，探索文化和冒险。",
    } as TravelData,
    quote: {
      text: "如果你每天进步1%，一年后你将变得更强大。",
      author: "— 詹姆斯·克利尔",
    } as QuoteData,
    skills: [
      { name: "项目管理", category: "Professional", icon: "📊", level: 90 },
      { name: "团队合作", category: "Professional", icon: "🤝", level: 95 },
      { name: "时间管理", category: "Professional", icon: "⏱️", level: 85 },
      { name: "领导能力", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "Python", category: "Technical", icon: "🐍", level: 85 },
      { name: "JavaScript", category: "Technical", icon: "✨", level: 90 },
    ] as SkillData[],
    projects: {
      title: "项目",
      items: [
        { title: "任务管理应用", desc: "通过简洁界面高效管理任务。", tech: ["React", "Node.js", "MongoDB"] },
        { title: "产品管理应用", desc: "实时组织和跟踪产品。", tech: ["Next.js", "Express", "PostgreSQL"] },
      ],
    } as ProjectsData,
    contact: {
      title: "联系我",
      subtitle: "欢迎自由职业项目、合作，或聊聊你的下一个大想法。请通过以下方式联系我。",
      contacts: [
        { icon: "email", label: "邮箱", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: "phone", label: "电话", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: "github", label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: "instagram", label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: "facebook", label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line 二维码", src: "/qrcodes/line-qr.png" },
        { label: "Wechat 二维码", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp 二维码", src: "/qrcodes/whatsapp-qr.png" },
      ],
    } as any
  },
};

export function getTranslation(lang: "en" | "ja" | "zh") {
  return translations[lang] || translations.en; // fallback to English
}