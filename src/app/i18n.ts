export type Language = "en" | "ja" | "zh";

export type SkillCategory =
  | "Professional"
  | "Technical"
  | "Certifications"
  | "Languages"
  | "Experience";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  level?: number;
}

export interface Project {
  title: string;
  desc: string;
  tech: string[];
}

export interface ContactEntry {
  icon: "phone" | "github" | "linkedin" | "instagram" | "facebook" | "envelope";
  label: string;
  value: string;
  link: string;
}

export interface QRCodeEntry {
  label: string;
  src: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contacts: ContactEntry[];
  qrcodes: QRCodeEntry[];
}

export interface Translations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    button: string;
  };
  travels: {
    title: string;
    description: string;
  };
  quote: {
    text: string;
    author: string;
  };
  skills: Skill[];
  projects: {
    title: string;
    items: Project[];
  };
  contact: ContactData;
}

export const translations = {
  en: {
    hero: {
        title: "Ryu — Adventurer & Engineer",
        subtitle: "Freelance Web Developer | Global Explorer | Ski Instructor",
        description:
        "Building modern web apps and engineering solutions while exploring the world. With experience across 60+ countries, I bring a unique global perspective to problem-solving.",
        button: "Let’s Build Something Together",
    },
    travels: {
      title: "My Travels",
      description: "I’ve visited over 68 countries, exploring cultures and adventures.",
    },
    quote: {
        text: "If you can get 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.",
        author: "— James Clear"
    },
    skills: [
      // Professional
      { name: "Project Management", category: "Professional", icon: "📊", level: 90 },
      { name: "Teamwork", category: "Professional", icon: "🤝", level: 95 },
      { name: "Time Management", category: "Professional", icon: "⏱️", level: 85 },
      { name: "Leadership", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "Effective Communication", category: "Professional", icon: "💬", level: 92 },
      { name: "Critical Thinking", category: "Professional", icon: "🧠", level: 90 },

      // Technical
      { name: "Python", category: "Technical", icon: "🐍", level: 85 },
      { name: "JavaScript", category: "Technical", icon: "✨", level: 90 },

      // Certifications
      { name: "CSIA Level 3 Candidate", category: "Certifications", icon: "🎿", level: 70 },
      { name: "PADI Divemaster", category: "Certifications", icon: "🤿", level: 75 },
      { name: "International Driving License", category: "Certifications", icon: "🚗", level: 100 },

      // Languages
      { name: "Chinese (Fluent)", category: "Languages", icon: "🇨🇳", level: 100 },
      { name: "Japanese (Fluent)", category: "Languages", icon: "🇯🇵", level: 100 },
      { name: "English (Fluent)", category: "Languages", icon: "🇬🇧", level: 100 },
      { name: "Spanish (Basic)", category: "Languages", icon: "🇪🇸", level: 40 },

      // Experience
      { name: "Served in Ground Self Defence Force", category: "Experience", icon: "🪖" },
      { name: "HA/DR Operations", category: "Experience", icon: "🌊" },
      { name: "Sniper", category: "Experience", icon: "🎯" },
      { name: "English/Japanese Translator", category: "Experience", icon: "📝" },
      { name: "Martial Arts High Level", category: "Experience", icon: "🥋" },
      { name: "English Language Teacher", category: "Experience", icon: "📚" },
      { name: "Japanese Language Teacher", category: "Experience", icon: "📚" },
      { name: "Deckhand / Underwater Guide", category: "Experience", icon: "⚓" },
      { name: "Snow Mountain Guide", category: "Experience", icon: "🏔️" },
      { name: "City Tour Guide", category: "Experience", icon: "🏙️" },
      { name: "Walked Camino de Santiago", category: "Experience", icon: "🥾" },
      { name: "Backpacked for 6 years", category: "Experience", icon: "🎒" },
      { name: "Hitchhiked NY → LA", category: "Experience", icon: "🛣️" },
      { name: "Volunteered in Nepal, Bangladesh, Tanzania", category: "Experience", icon: "🌍" },
      { name: "Self-taught Engineer", category: "Experience", icon: "💻" },
    ],
    projects: {
      title: "Projects",
      items: [
        {
          title: "Task Schedule Management App",
          desc: "Manage tasks efficiently with a sleek interface.",
          tech: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "Product Management App",
          desc: "Organize and track products with real-time updates.",
          tech: ["Next.js", "Express", "PostgreSQL"],
        },
        {
          title: "Landing Page",
          desc: "A responsive and modern landing page design.",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          title: "Homepage",
          desc: "Interactive homepage with animations and dark mode.",
          tech: ["React", "TailwindCSS"],
        },
        {
          title: "EC Site",
          desc: "E-commerce platform with secure payment integration.",
          tech: ["Next.js", "Stripe", "MongoDB"],
        },
        {
          title: "Matching App",
          desc: "Connect users efficiently with smart matching algorithms.",
          tech: ["React Native", "Firebase"],
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Open for freelance projects, collaborations, or just a chat about your next big idea. Reach me via any method below.",
      contacts: [
        { icon: "envelope", label: "Email", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: "phone", label: "Phone", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: "github", label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: "instagram", label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: "facebook", label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ],
    } as ContactData,
  },
  ja: {
    hero: {
      title: "リュウ — 冒険者＆エンジニア",
        subtitle: "フリーランスWeb開発者 | 世界を旅する探検家 | スキーインストラクター",
        description:
        "世界を旅しながらモダンなWebアプリやエンジニアリングソリューションを構築。60カ国以上の経験を活かし、ユニークなグローバルな視点で問題解決に取り組みます。",
        button: "一緒に何かを作りましょう",
    },
    travels: {
      title: "私の旅行",
      description: "68か国以上を訪れ、文化と冒険を体験しました。",
    },
    quote: {
      text: "毎日1%ずつ良くなれば、1年後には37倍の成長を遂げることができる。",
      author: "— ジェームズ・クリア"
    },
    skills: [
      // Professional
      { name: "プロジェクト管理", category: "Professional", icon: "📊", level: 90 },
      { name: "チームワーク", category: "Professional", icon: "🤝", level: 95 },
      { name: "時間管理", category: "Professional", icon: "⏱️", level: 85 },
      { name: "リーダーシップ", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "効果的なコミュニケーション", category: "Professional", icon: "💬", level: 92 },
      { name: "批判的思考", category: "Professional", icon: "🧠", level: 90 },

      // Technical
      { name: "パイソン", category: "Technical", icon: "🐍", level: 85 },
      { name: "ジャバスクリプト", category: "Technical", icon: "✨", level: 90 },

      // Certifications
      { name: "CSIAレベル3候補", category: "Certifications", icon: "🎿", level: 70 },
      { name: "PADIダイブマスター", category: "Certifications", icon: "🤿", level: 75 },
      { name: "国際運転免許証", category: "Certifications", icon: "🚗", level: 100 },

      // Languages
      { name: "中国語（流暢）", category: "Languages", icon: "🇨🇳", level: 100 },
      { name: "日本語（流暢）", category: "Languages", icon: "🇯🇵", level: 100 },
      { name: "英語（流暢）", category: "Languages", icon: "🇬🇧", level: 100 },
      { name: "スペイン語（基本）", category: "Languages", icon: "🇪🇸", level: 40 },

      // Experience
      { name: "陸上自衛隊勤務", category: "Experience", icon: "🪖" },
      { name: "災害対応任務", category: "Experience", icon: "🌊" },
      { name: "狙撃手", category: "Experience", icon: "🎯" },
      { name: "英日翻訳者", category: "Experience", icon: "📝" },
      { name: "高レベル武道", category: "Experience", icon: "🥋" },
      { name: "英語教師", category: "Experience", icon: "📚" },
      { name: "日本語教師", category: "Experience", icon: "📚" },
      { name: "船員 / 水中ガイド", category: "Experience", icon: "⚓" },
      { name: "雪山ガイド", category: "Experience", icon: "🏔️" },
      { name: "都市観光ガイド", category: "Experience", icon: "🏙️" },
      { name: "サンティアゴ巡礼歩行", category: "Experience", icon: "🥾" },
      { name: "6年間のバックパック旅行", category: "Experience", icon: "🎒" },
      { name: "NYからLAまでヒッチハイク", category: "Experience", icon: "🛣️" },
      { name: "ネパール、バングラデシュ、タンザニアでボランティア", category: "Experience", icon: "🌍" },
      { name: "独学エンジニア", category: "Experience", icon: "💻" },
    ],
    projects: {
      title: "プロジェクト",
      items: [
        {
          title: "タスクスケジュール管理アプリ",
          desc: "洗練されたインターフェースでタスクを効率的に管理。",
          tech: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "プロダクト管理アプリ",
          desc: "リアルタイムで製品を整理・追跡。",
          tech: ["Next.js", "Express", "PostgreSQL"],
        },
        {
          title: "ランディングページ",
          desc: "レスポンシブでモダンなランディングページデザイン。",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          title: "ホームページ",
          desc: "アニメーションとダークモード付きのインタラクティブホームページ。",
          tech: ["React", "TailwindCSS"],
        },
        {
          title: "ECサイト",
          desc: "安全な決済統合を備えたEコマースプラットフォーム。",
          tech: ["Next.js", "Stripe", "MongoDB"],
        },
        {
          title: "マッチングアプリ",
          desc: "スマートなマッチングアルゴリズムでユーザーを効率的に接続。",
          tech: ["React Native", "Firebase"],
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      subtitle:
        "フリーランスプロジェクト、コラボレーション、または次の大きなアイデアについての雑談も歓迎です。以下の方法でご連絡ください。",
      contacts: [
        { icon: "envelope", label: "メール", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
        { icon: "phone", label: "電話", value: "+81 07-4561-8976", link: "tel:+810745618976" },
        { icon: "github", label: "Github", value: "github.com/One-percent-athlete", link: "https://github.com/One-percent-athlete" },
        { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ryu", link: "https://www.linkedin.com/in/ryu-suzuki-7613a8299/" },
        { icon: "instagram", label: "Instagram", value: "@ryu.free.spirit", link: "https://www.instagram.com/ryu.free.spirit/" },
        { icon: "facebook", label: "Facebook", value: "@ryu.suzuki.super", link: "https://www.facebook.com/ryu.suzuki.super/" },
      ],
      qrcodes: [
        { label: "Line QR", src: "/qrcodes/line-qr.png" },
        { label: "Wechat QR", src: "/qrcodes/wechat-qr.png" },
        { label: "Whatsapp QR", src: "/qrcodes/whatsapp-qr.png" },
      ],
    } as any,
  },
  zh: {
    hero: {
        title: "Ryu — 冒险家 & 工程师",
        subtitle: "自由职业网页开发者 | 全球探险者 | 滑雪教练",
        description:
        "在探索世界的同时构建现代网页应用和工程解决方案。拥有60多个国家的经验，为问题解决带来独特的全球视角。",
        button: "让我们一起创造点什么",
    },
    travels: {
      title: "我的旅行",
      description: "我已访问超过68个国家，探索文化和冒险。",
    },
    quote: {
      text: "如果你每天进步1%，一年后你将变得更强大。",
      author: "— 詹姆斯·克利尔"
    },
    skills: [
      // Professional
      { name: "项目管理", category: "Professional", icon: "📊", level: 90 },
      { name: "团队合作", category: "Professional", icon: "🤝", level: 95 },
      { name: "时间管理", category: "Professional", icon: "⏱️", level: 85 },
      { name: "领导能力", category: "Professional", icon: "🧑‍💼", level: 88 },
      { name: "有效沟通", category: "Professional", icon: "💬", level: 92 },
      { name: "批判性思维", category: "Professional", icon: "🧠", level: 90 },

      // Technical
      { name: "Python", category: "Technical", icon: "🐍", level: 85 },
      { name: "JavaScript", category: "Technical", icon: "✨", level: 90 },

      // Certifications
      { name: "CSIA三级候选", category: "Certifications", icon: "🎿", level: 70 },
      { name: "PADI潜水指导员", category: "Certifications", icon: "🤿", level: 75 },
      { name: "国际驾照", category: "Certifications", icon: "🚗", level: 100 },

      // Languages
      { name: "中文（流利）", category: "Languages", icon: "🇨🇳", level: 100 },
      { name: "日语（流利）", category: "Languages", icon: "🇯🇵", level: 100 },
      { name: "英语（流利）", category: "Languages", icon: "🇬🇧", level: 100 },
      { name: "西班牙语（基础）", category: "Languages", icon: "🇪🇸", level: 40 },

      // Experience
      { name: "服役于陆上自卫队", category: "Experience", icon: "🪖" },
      { name: "人道救援行动", category: "Experience", icon: "🌊" },
      { name: "狙击手", category: "Experience", icon: "🎯" },
      { name: "英日翻译", category: "Experience", icon: "📝" },
      { name: "高级武术", category: "Experience", icon: "🥋" },
      { name: "英语教师", category: "Experience", icon: "📚" },
      { name: "日语教师", category: "Experience", icon: "📚" },
      { name: "甲板手/水下导游", category: "Experience", icon: "⚓" },
      { name: "雪山向导", category: "Experience", icon: "🏔️" },
      { name: "城市导游", category: "Experience", icon: "🏙️" },
      { name: "走过圣地亚哥之路", category: "Experience", icon: "🥾" },
      { name: "背包旅行6年", category: "Experience", icon: "🎒" },
      { name: "搭便车从纽约到洛杉矶", category: "Experience", icon: "🛣️" },
      { name: "在尼泊尔、孟加拉国、坦桑尼亚志愿服务", category: "Experience", icon: "🌍" },
      { name: "自学成才工程师", category: "Experience", icon: "💻" },
    ],
    
    projects: {
      title: "项目",
      items: [
        {
          title: "任务管理应用",
          desc: "通过简洁界面高效管理任务。",
          tech: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "产品管理应用",
          desc: "实时组织和跟踪产品。",
          tech: ["Next.js", "Express", "PostgreSQL"],
        },
        {
          title: "登陆页面",
          desc: "响应式且现代的登陆页面设计。",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          title: "主页",
          desc: "带动画和暗黑模式的交互式主页。",
          tech: ["React", "TailwindCSS"],
        },
        {
          title: "电商网站",
          desc: "带安全支付集成的电子商务平台。",
          tech: ["Next.js", "Stripe", "MongoDB"],
        },
        {
          title: "匹配应用",
          desc: "通过智能匹配算法高效连接用户。",
          tech: ["React Native", "Firebase"],
        },
      ],
    },
    
    contact: {
      title: "联系我",
      subtitle:
        "欢迎自由职业项目、合作，或聊聊你的下一个大想法。请通过以下方式联系我。",
      contacts: [
        { icon: "envelope", label: "邮箱", value: "one.percent.athlete@gmail.com", link: "mailto:one.percent.athlete@gmail.com" },
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