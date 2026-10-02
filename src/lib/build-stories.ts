// Real project accounts are separate from sample-data interactive demos.
export interface BuildStory {slug:string;title:string;category:string;intro:string;problem:string;built:string;result:string;features:string[];demoHref?:string;}
export const buildCaseStudies:Record<"en"|"ja"|"zh",BuildStory[]> = {
  "en": [
    {
      "slug": "ski-school",
      "title": "Ski School Management",
      "category": "School operations",
      "intro": "From a lesson request to an instructor's earnings.",
      "problem": "A ski school needs to coordinate customers, instructor availability and lesson payments.",
      "built": "Instructor profiles and schedules, customer lesson requests, instructor acceptance, and invoice and earnings views.",
      "result": "Customers can request lessons, instructors can accept them, and the school can review invoices and how much each person earns.",
      "features": [
        "Lesson requests",
        "Instructor schedules",
        "Invoices & earnings"
      ]
    },
    {
      "slug": "automobile-operations",
      "title": "Automobile Management",
      "category": "Vehicle operations",
      "intro": "Vehicles, inspections and staff work in one workflow.",
      "problem": "Vehicle details, inspection dates, rental bookings and staff tasks all need to stay organized.",
      "built": "Car registration, shaken inspection scheduling, staff task assignments, problem reporting and rental schedules.",
      "result": "The team can track each vehicle's details, plan inspections and rentals, assign work and report problems.",
      "features": [
        "Shaken inspections",
        "Staff assignments",
        "Rental schedules"
      ]
    },
    {
      "slug": "company-meals",
      "title": "Company Meal Ordering",
      "category": "Internal tools",
      "intro": "Employee choices become a kitchen preparation plan.",
      "problem": "The kitchen needs to know how many portions of each meal to prepare before service.",
      "built": "A menu selection workflow with an ordering deadline, meal counts for the kitchen and menu popularity analysis.",
      "result": "Employees choose meals before the cutoff; the kitchen sees quantities for each menu item and can review which meals are popular.",
      "features": [
        "Ordering cutoff",
        "Portion counts",
        "Menu popularity"
      ]
    },
    {
      "slug": "uniform-ordering",
      "title": "Company Uniform Ordering",
      "category": "Internal tools",
      "intro": "From employee orders to factory totals and payroll deductions.",
      "problem": "Admins need to know how many garments each factory ordered and how to collect each employee's payment.",
      "built": "An internal uniform ordering app with factory-level quantities by garment type and employee charges for salary deduction.",
      "result": "Admins can see how many pants and other garments each factory ordered, and deduct each person's uniform cost from their salary.",
      "features": [
        "Employee orders",
        "Factory & garment totals",
        "Salary deductions"
      ]
    },
    {
      "slug": "traveler-guide-matching",
      "title": "Traveler & Local Guide Matching",
      "category": "Travel & activities",
      "intro": "Meet a local. Share an experience.",
      "problem": "Travelers need a way to find local guides and people to share activities with.",
      "built": "A matching app connecting travelers with local guides, including shared activities such as cycling together.",
      "result": "Travelers can find local connections for guiding and shared activities beyond a conventional tour.",
      "features": [
        "Traveler–guide matching",
        "Local connections",
        "Shared activities"
      ]
    },
    {
      "slug": "homepages-landing-pages",
      "title": "Homepages & Landing Pages",
      "category": "Web experiences",
      "intro": "A place to introduce a business, project or idea.",
      "problem": "Every business or project needs a clear place to introduce itself online.",
      "built": "Homepages and landing pages for different projects.",
      "result": "A web presence that gives visitors a starting point for learning about the business or project.",
      "features": [
        "Homepages",
        "Landing pages"
      ]
    }
  ],
  "ja": [
    {
      "slug": "ski-school",
      "title": "スキースクール管理",
      "category": "スクール運営",
      "intro": "レッスンの依頼から、講師の報酬まで。",
      "problem": "スクールでは、お客様・講師の予定・レッスン料金をまとめて管理する必要があります。",
      "built": "講師プロフィールと予定、お客様のレッスン依頼、講師による受付、請求書と報酬の確認機能。",
      "result": "お客様がレッスンを依頼し、講師が受け付け、スクールが請求書と各人の報酬を確認できます。",
      "features": [
        "レッスン依頼",
        "講師の予定",
        "請求書・報酬"
      ]
    },
    {
      "slug": "automobile-operations",
      "title": "自動車管理",
      "category": "車両業務",
      "intro": "車両・車検・スタッフの仕事をつなぐ。",
      "problem": "車両情報、車検の日程、レンタルの予約、担当者の仕事を整理する必要があります。",
      "built": "車両登録、車検予定、スタッフへのタスク割り当て、問題報告、レンタル予定の管理機能。",
      "result": "車両情報を確認し、車検とレンタルを計画し、仕事を割り当てて問題を報告できます。",
      "features": [
        "車検予定",
        "担当者の割り当て",
        "レンタル予定"
      ]
    },
    {
      "slug": "company-meals",
      "title": "社内の食事注文",
      "category": "社内ツール",
      "intro": "社員の選択を、厨房の準備につなげる。",
      "problem": "厨房は、各メニューを何食作るか提供前に把握する必要があります。",
      "built": "締切のあるメニュー選択、厨房向けの食数集計、メニューの人気分析。",
      "result": "社員が締切までに食事を選び、厨房がメニュー別の必要数や人気を確認できます。",
      "features": [
        "注文締切",
        "食数集計",
        "人気分析"
      ]
    },
    {
      "slug": "uniform-ordering",
      "title": "社内の制服注文",
      "category": "社内ツール",
      "intro": "社員の注文から、工場別の集計と給与控除まで。",
      "problem": "管理者は、工場ごとの衣類の注文数と、社員ごとの支払いを把握する必要があります。",
      "built": "制服注文、工場別・衣類別の数量集計、給与控除に使う社員ごとの費用管理を備えた社内アプリ。",
      "result": "各工場がズボンなどを何着注文したか確認し、社員ごとの制服代を給与から控除できます。",
      "features": [
        "社員の制服注文",
        "工場・衣類別の集計",
        "給与控除"
      ]
    },
    {
      "slug": "traveler-guide-matching",
      "title": "旅行者と現地ガイドのマッチング",
      "category": "旅行・アクティビティ",
      "intro": "現地の人と出会い、体験を共有する。",
      "problem": "旅行者が現地ガイドや一緒に活動する相手を見つける方法が必要です。",
      "built": "旅行者と現地ガイドをつなぎ、サイクリングなどの共同アクティビティにも対応するマッチングアプリ。",
      "result": "ガイドだけでなく、一緒に活動を楽しむ現地の人ともつながれます。",
      "features": [
        "旅行者・ガイドのマッチング",
        "現地のつながり",
        "共同アクティビティ"
      ]
    },
    {
      "slug": "homepages-landing-pages",
      "title": "ホームページとランディングページ",
      "category": "ウェブ体験",
      "intro": "事業やプロジェクトを紹介する場所。",
      "problem": "事業やプロジェクトには、オンラインで紹介するための窓口が必要です。",
      "built": "さまざまなプロジェクトのホームページとランディングページ。",
      "result": "訪問者が事業やプロジェクトを知るための入口となるウェブサイト。",
      "features": [
        "ホームページ",
        "ランディングページ"
      ]
    }
  ],
  "zh": [
    {
      "slug": "ski-school",
      "title": "滑雪学校管理",
      "category": "学校运营",
      "intro": "从课程申请，到教练收入。",
      "problem": "滑雪学校需要协调客户、教练时间和课程费用。",
      "built": "教练资料与日程、客户课程申请、教练接受申请，以及账单和收入查看功能。",
      "result": "客户可以申请课程，教练可以接受申请，学校可以查看账单与每个人的收入。",
      "features": [
        "课程申请",
        "教练日程",
        "账单与收入"
      ]
    },
    {
      "slug": "automobile-operations",
      "title": "汽车管理",
      "category": "车辆运营",
      "intro": "把车辆、年检和员工任务连接起来。",
      "problem": "车辆资料、车检时间、租车安排和员工任务都需要有序管理。",
      "built": "车辆登记、日本车检（shaken）安排、员工任务分配、问题报告和租车日程。",
      "result": "团队可以查看车辆资料、安排车检与租车、分配工作并报告问题。",
      "features": [
        "车检安排",
        "员工任务",
        "租车日程"
      ]
    },
    {
      "slug": "company-meals",
      "title": "公司餐食订购",
      "category": "内部工具",
      "intro": "员工的选择，成为厨房的备餐计划。",
      "problem": "厨房需要提前知道每种菜品要准备多少份。",
      "built": "带截止时间的菜单选择、厨房份数统计和菜品受欢迎程度分析。",
      "result": "员工在截止前选择餐食，厨房可以查看各菜品数量，并了解哪些餐食更受欢迎。",
      "features": [
        "订餐截止时间",
        "份数统计",
        "菜品热度"
      ]
    },
    {
      "slug": "uniform-ordering",
      "title": "公司制服订购",
      "category": "内部工具",
      "intro": "从员工订单，到工厂汇总与工资扣款。",
      "problem": "管理员需要知道各工厂订购了多少衣物，以及每位员工应支付的费用。",
      "built": "实现内部制服订购、按工厂和衣物类型统计数量，以及用于工资扣款的员工费用记录。",
      "result": "管理员可以查看各工厂订购的裤子等衣物数量，并从员工工资中扣除各自的制服费用。",
      "features": [
        "员工订购",
        "工厂与衣物汇总",
        "工资扣款"
      ]
    },
    {
      "slug": "traveler-guide-matching",
      "title": "旅行者与当地向导匹配",
      "category": "旅行与活动",
      "intro": "认识当地人，一起体验。",
      "problem": "旅行者需要找到当地向导，以及可以共同参加活动的人。",
      "built": "连接旅行者与当地向导的匹配应用，也支持一起骑行等共同活动。",
      "result": "旅行者可以建立当地联系，寻找向导并一起参与活动。",
      "features": [
        "旅行者与向导匹配",
        "当地联系",
        "共同活动"
      ]
    },
    {
      "slug": "homepages-landing-pages",
      "title": "主页与落地页",
      "category": "网站体验",
      "intro": "介绍业务、项目或想法的地方。",
      "problem": "业务与项目都需要一个清晰的线上介绍入口。",
      "built": "为不同项目制作主页和落地页。",
      "result": "访客可以从网站开始了解相关业务或项目。",
      "features": [
        "主页",
        "落地页"
      ]
    }
  ]
};
export const buildStories:Record<"en"|"ja"|"zh",BuildStory[]> = {
  "en": [
    {
      "slug": "ski-school",
      "title": "Ski School Management",
      "category": "School operations",
      "intro": "From a lesson request to an instructor's earnings.",
      "problem": "A ski school needs to coordinate customers, instructor availability and lesson payments.",
      "built": "Instructor profiles and schedules, customer lesson requests, instructor acceptance, and invoice and earnings views.",
      "result": "Customers can request lessons, instructors can accept them, and the school can review invoices and how much each person earns.",
      "features": [
        "Lesson requests",
        "Instructor schedules",
        "Invoices & earnings"
      ],
      "demoHref": "/demos/ski-school"
    },
    {
      "slug": "automobile-operations",
      "title": "Automobile Management",
      "category": "Vehicle operations",
      "intro": "Vehicles, inspections and staff work in one workflow.",
      "problem": "Vehicle details, inspection dates, rental bookings and staff tasks all need to stay organized.",
      "built": "Car registration, shaken inspection scheduling, staff task assignments, problem reporting and rental schedules.",
      "result": "The team can track each vehicle's details, plan inspections and rentals, assign work and report problems.",
      "features": [
        "Shaken inspections",
        "Staff assignments",
        "Rental schedules"
      ],
      "demoHref": "/demos/automobile-operations"
    },
    {
      "slug": "company-meals",
      "title": "Company Meal Ordering",
      "category": "Internal tools",
      "intro": "Employee choices become a kitchen preparation plan.",
      "problem": "The kitchen needs to know how many portions of each meal to prepare before service.",
      "built": "A menu selection workflow with an ordering deadline, meal counts for the kitchen and menu popularity analysis.",
      "result": "Employees choose meals before the cutoff; the kitchen sees quantities for each menu item and can review which meals are popular.",
      "features": [
        "Ordering cutoff",
        "Portion counts",
        "Menu popularity"
      ],
      "demoHref": "/demos/company-meals"
    },
    {
      "slug": "uniform-ordering",
      "title": "Company Uniform Ordering",
      "category": "Internal tools",
      "intro": "From employee orders to factory totals and payroll deductions.",
      "problem": "Admins need to know how many garments each factory ordered and how to collect each employee's payment.",
      "built": "An internal uniform ordering app with factory-level quantities by garment type and employee charges for salary deduction.",
      "result": "Admins can see how many pants and other garments each factory ordered, and deduct each person's uniform cost from their salary.",
      "features": [
        "Employee orders",
        "Factory & garment totals",
        "Salary deductions"
      ],
      "demoHref": "/demos/uniform-ordering"
    },
    {
      "slug": "traveler-guide-matching",
      "title": "Traveler & Local Guide Matching",
      "category": "Travel & activities",
      "intro": "Meet a local. Share an experience.",
      "problem": "Travelers need a way to find local guides and people to share activities with.",
      "built": "A matching app connecting travelers with local guides, including shared activities such as cycling together.",
      "result": "Travelers can find local connections for guiding and shared activities beyond a conventional tour.",
      "features": [
        "Traveler–guide matching",
        "Local connections",
        "Shared activities"
      ],
      "demoHref": "/demos/traveler-guide-matching"
    },
    {
      "slug": "task-schedule",
      "title": "Task Schedule Management App",
      "category": "Planning",
      "intro": "One sprint, three ways to see the work.",
      "problem": "Tasks, deadlines and progress are easy to lose across separate views.",
      "built": "A shared task state powering a drag-and-drop board, weekly calendar and completion dashboard.",
      "result": "Create a task, move it to Done, then see the calendar and completion figures reflect the change.",
      "features": [
        "Task board",
        "Calendar",
        "Analytics"
      ],
      "demoHref": "/demos/task-schedule"
    },
    {
      "slug": "product-management",
      "title": "Product Management System",
      "category": "Inventory",
      "intro": "See what is in stock—and what needs attention.",
      "problem": "A product list alone does not show where inventory needs action.",
      "built": "A searchable catalog with stock controls, status toggles and a low-stock overview.",
      "result": "Adjust stock and watch unit totals, inventory value and low-stock alerts update.",
      "features": [
        "Inventory",
        "Suppliers",
        "Reporting"
      ],
      "demoHref": "/demos/product-management"
    },
    {
      "slug": "modern-landing",
      "title": "Modern Landing Page",
      "category": "Marketing",
      "intro": "Turn a product introduction into a clear next step.",
      "problem": "Visitors need to understand an unfamiliar product before deciding to explore it.",
      "built": "A responsive product story with feature tabs, motion controls, pricing options and a simulated signup.",
      "result": "Explore three features, compare monthly and annual pricing, and try the signup confirmation.",
      "features": [
        "Feature exploration",
        "Pricing options",
        "Signup demo"
      ],
      "demoHref": "/demos/modern-landing"
    },
    {
      "slug": "interactive-portfolio",
      "title": "Interactive Portfolio",
      "category": "Portfolio",
      "intro": "Let the work lead the conversation.",
      "problem": "A mixed portfolio can be difficult to browse by discipline.",
      "built": "A filterable studio gallery with project detail overlays and switchable accent colors.",
      "result": "Filter the gallery by discipline, open a project and change the visual theme without leaving the page.",
      "features": [
        "Gallery filters",
        "Project details",
        "Color themes"
      ],
      "demoHref": "/demos/interactive-portfolio"
    },
    {
      "slug": "ecommerce-platform",
      "title": "E-Commerce Platform",
      "category": "Shopping",
      "intro": "A complete browsing-to-bag interaction.",
      "problem": "Shoppers need to inspect, compare and save products before choosing.",
      "built": "A searchable storefront with category filters, quick views, favorites and a cart drawer.",
      "result": "Save an object, add it to the bag, adjust quantities and complete a simulated checkout.",
      "features": [
        "Product catalog",
        "Favorites",
        "Demo checkout"
      ],
      "demoHref": "/demos/ecommerce-platform"
    },
    {
      "slug": "smart-matching",
      "title": "Smart Matching App",
      "category": "Connections",
      "intro": "Explore the journey from discovery to conversation.",
      "problem": "Profile discovery needs a clear path from interest to connection.",
      "built": "Seeded profiles, connect/pass actions, saved matches, preference sliders and local chat.",
      "result": "Connect with a profile and try a simulated conversation. Profiles and scores are illustrative.",
      "features": [
        "Profiles",
        "Connections",
        "Simulated chat"
      ],
      "demoHref": "/demos/smart-matching"
    },
    {
      "slug": "chatbot",
      "title": "Chatbot Assistant",
      "category": "Conversation",
      "intro": "A helpful answer starts with a good conversation.",
      "problem": "Visitors need a simple way to find answers and understand the next step.",
      "built": "An interactive assistant prototype with suggested prompts, sample answers and a fallback for unsupported questions.",
      "result": "Ask about a workflow, try a follow-up and explore the conversation. Responses are scripted; no AI service is connected.",
      "features": [
        "Suggested prompts",
        "Workflow answers",
        "Helpful fallback"
      ],
      "demoHref": "/demos/chatbot"
    }
  ],
  "ja": [
    {
      "slug": "ski-school",
      "title": "スキースクール管理",
      "category": "スクール運営",
      "intro": "レッスンの依頼から、講師の報酬まで。",
      "problem": "スクールでは、お客様・講師の予定・レッスン料金をまとめて管理する必要があります。",
      "built": "講師プロフィールと予定、お客様のレッスン依頼、講師による受付、請求書と報酬の確認機能。",
      "result": "お客様がレッスンを依頼し、講師が受け付け、スクールが請求書と各人の報酬を確認できます。",
      "features": [
        "レッスン依頼",
        "講師の予定",
        "請求書・報酬"
      ],
      "demoHref": "/demos/ski-school"
    },
    {
      "slug": "automobile-operations",
      "title": "自動車管理",
      "category": "車両業務",
      "intro": "車両・車検・スタッフの仕事をつなぐ。",
      "problem": "車両情報、車検の日程、レンタルの予約、担当者の仕事を整理する必要があります。",
      "built": "車両登録、車検予定、スタッフへのタスク割り当て、問題報告、レンタル予定の管理機能。",
      "result": "車両情報を確認し、車検とレンタルを計画し、仕事を割り当てて問題を報告できます。",
      "features": [
        "車検予定",
        "担当者の割り当て",
        "レンタル予定"
      ],
      "demoHref": "/demos/automobile-operations"
    },
    {
      "slug": "company-meals",
      "title": "社内の食事注文",
      "category": "社内ツール",
      "intro": "社員の選択を、厨房の準備につなげる。",
      "problem": "厨房は、各メニューを何食作るか提供前に把握する必要があります。",
      "built": "締切のあるメニュー選択、厨房向けの食数集計、メニューの人気分析。",
      "result": "社員が締切までに食事を選び、厨房がメニュー別の必要数や人気を確認できます。",
      "features": [
        "注文締切",
        "食数集計",
        "人気分析"
      ],
      "demoHref": "/demos/company-meals"
    },
    {
      "slug": "uniform-ordering",
      "title": "社内の制服注文",
      "category": "社内ツール",
      "intro": "社員の注文から、工場別の集計と給与控除まで。",
      "problem": "管理者は、工場ごとの衣類の注文数と、社員ごとの支払いを把握する必要があります。",
      "built": "制服注文、工場別・衣類別の数量集計、給与控除に使う社員ごとの費用管理を備えた社内アプリ。",
      "result": "各工場がズボンなどを何着注文したか確認し、社員ごとの制服代を給与から控除できます。",
      "features": [
        "社員の制服注文",
        "工場・衣類別の集計",
        "給与控除"
      ],
      "demoHref": "/demos/uniform-ordering"
    },
    {
      "slug": "traveler-guide-matching",
      "title": "旅行者と現地ガイドのマッチング",
      "category": "旅行・アクティビティ",
      "intro": "現地の人と出会い、体験を共有する。",
      "problem": "旅行者が現地ガイドや一緒に活動する相手を見つける方法が必要です。",
      "built": "旅行者と現地ガイドをつなぎ、サイクリングなどの共同アクティビティにも対応するマッチングアプリ。",
      "result": "ガイドだけでなく、一緒に活動を楽しむ現地の人ともつながれます。",
      "features": [
        "旅行者・ガイドのマッチング",
        "現地のつながり",
        "共同アクティビティ"
      ],
      "demoHref": "/demos/traveler-guide-matching"
    },
    {
      "slug": "task-schedule",
      "title": "タスク管理アプリ",
      "category": "計画",
      "intro": "ひとつのスプリントを、3つの視点で。",
      "problem": "タスク・期限・進捗をまとめて把握する必要があります。",
      "built": "タスクボード、週間カレンダー、進捗画面を実装。",
      "result": "タスクを作成して完了へ動かすと、カレンダーと完了率も更新されます。",
      "features": [
        "タスクボード",
        "カレンダー",
        "分析"
      ],
      "demoHref": "/demos/task-schedule"
    },
    {
      "slug": "product-management",
      "title": "商品管理システム",
      "category": "在庫",
      "intro": "在庫と、対応が必要な商品をひと目で。",
      "problem": "在庫状況と対応が必要な商品を把握する必要があります。",
      "built": "商品検索、在庫調整、状態切り替え、在庫不足の概要を実装。",
      "result": "在庫を変更すると、数量・金額・在庫不足の表示が更新されます。",
      "features": [
        "在庫",
        "仕入先",
        "レポート"
      ],
      "demoHref": "/demos/product-management"
    },
    {
      "slug": "modern-landing",
      "title": "モダンランディングページ",
      "category": "マーケティング",
      "intro": "商品の紹介から、次の一歩へ。",
      "problem": "初めて見る商品を理解してから、詳しく知るか判断できる導線が必要です。",
      "built": "機能タブ、動きの停止、料金の切り替え、登録のシミュレーションを備えた紹介ページを実装。",
      "result": "3つの機能を見て、月額と年額を比較し、登録後の確認表示を試せます。",
      "features": [
        "機能の紹介",
        "料金の切り替え",
        "登録デモ"
      ],
      "demoHref": "/demos/modern-landing"
    },
    {
      "slug": "interactive-portfolio",
      "title": "インタラクティブポートフォリオ",
      "category": "ポートフォリオ",
      "intro": "作品から、会話が始まる。",
      "problem": "分野の異なる作品が並ぶと、興味のある制作物を探しにくくなります。",
      "built": "分野別フィルター、作品詳細の表示、アクセント色の切り替えを備えたギャラリーを実装。",
      "result": "分野で絞り込み、作品を開き、ページを離れずに配色を変えられます。",
      "features": [
        "作品の絞り込み",
        "作品の詳細",
        "配色テーマ"
      ],
      "demoHref": "/demos/interactive-portfolio"
    },
    {
      "slug": "ecommerce-platform",
      "title": "Eコマースプラットフォーム",
      "category": "ショッピング",
      "intro": "商品を探すところから、カートまで。",
      "problem": "購入前に商品を確認・比較・保存できる必要があります。",
      "built": "商品検索、絞り込み、詳細、お気に入り、カートを実装。",
      "result": "商品を保存し、数量を変え、購入のシミュレーションを試せます。",
      "features": [
        "商品一覧",
        "お気に入り",
        "購入デモ"
      ],
      "demoHref": "/demos/ecommerce-platform"
    },
    {
      "slug": "smart-matching",
      "title": "スマートマッチングアプリ",
      "category": "つながり",
      "intro": "発見から、会話が始まるまで。",
      "problem": "プロフィールへの興味をつながりへ進める導線が必要です。",
      "built": "サンプルプロフィール、接続・スキップ、設定スライダー、ローカルチャット。",
      "result": "相手を選び、会話を試せます。プロフィールとスコアはデモ用です。",
      "features": [
        "プロフィール",
        "つながり",
        "会話デモ"
      ],
      "demoHref": "/demos/smart-matching"
    },
    {
      "slug": "chatbot",
      "title": "チャットボット",
      "category": "会話",
      "intro": "会話から、必要な答えへ。",
      "problem": "必要な情報と次の行動を分かりやすく案内する必要があります。",
      "built": "質問候補、サンプル回答、対応できない質問への案内を備えた会話プロトタイプ。",
      "result": "業務について質問し、会話の流れを試せます。回答はデモ用で、AIサービスには接続していません。",
      "features": [
        "質問候補",
        "業務の案内",
        "フォールバック"
      ],
      "demoHref": "/demos/chatbot"
    }
  ],
  "zh": [
    {
      "slug": "ski-school",
      "title": "滑雪学校管理",
      "category": "学校运营",
      "intro": "从课程申请，到教练收入。",
      "problem": "滑雪学校需要协调客户、教练时间和课程费用。",
      "built": "教练资料与日程、客户课程申请、教练接受申请，以及账单和收入查看功能。",
      "result": "客户可以申请课程，教练可以接受申请，学校可以查看账单与每个人的收入。",
      "features": [
        "课程申请",
        "教练日程",
        "账单与收入"
      ],
      "demoHref": "/demos/ski-school"
    },
    {
      "slug": "automobile-operations",
      "title": "汽车管理",
      "category": "车辆运营",
      "intro": "把车辆、年检和员工任务连接起来。",
      "problem": "车辆资料、车检时间、租车安排和员工任务都需要有序管理。",
      "built": "车辆登记、日本车检（shaken）安排、员工任务分配、问题报告和租车日程。",
      "result": "团队可以查看车辆资料、安排车检与租车、分配工作并报告问题。",
      "features": [
        "车检安排",
        "员工任务",
        "租车日程"
      ],
      "demoHref": "/demos/automobile-operations"
    },
    {
      "slug": "company-meals",
      "title": "公司餐食订购",
      "category": "内部工具",
      "intro": "员工的选择，成为厨房的备餐计划。",
      "problem": "厨房需要提前知道每种菜品要准备多少份。",
      "built": "带截止时间的菜单选择、厨房份数统计和菜品受欢迎程度分析。",
      "result": "员工在截止前选择餐食，厨房可以查看各菜品数量，并了解哪些餐食更受欢迎。",
      "features": [
        "订餐截止时间",
        "份数统计",
        "菜品热度"
      ],
      "demoHref": "/demos/company-meals"
    },
    {
      "slug": "uniform-ordering",
      "title": "公司制服订购",
      "category": "内部工具",
      "intro": "从员工订单，到工厂汇总与工资扣款。",
      "problem": "管理员需要知道各工厂订购了多少衣物，以及每位员工应支付的费用。",
      "built": "实现内部制服订购、按工厂和衣物类型统计数量，以及用于工资扣款的员工费用记录。",
      "result": "管理员可以查看各工厂订购的裤子等衣物数量，并从员工工资中扣除各自的制服费用。",
      "features": [
        "员工订购",
        "工厂与衣物汇总",
        "工资扣款"
      ],
      "demoHref": "/demos/uniform-ordering"
    },
    {
      "slug": "traveler-guide-matching",
      "title": "旅行者与当地向导匹配",
      "category": "旅行与活动",
      "intro": "认识当地人，一起体验。",
      "problem": "旅行者需要找到当地向导，以及可以共同参加活动的人。",
      "built": "连接旅行者与当地向导的匹配应用，也支持一起骑行等共同活动。",
      "result": "旅行者可以建立当地联系，寻找向导并一起参与活动。",
      "features": [
        "旅行者与向导匹配",
        "当地联系",
        "共同活动"
      ],
      "demoHref": "/demos/traveler-guide-matching"
    },
    {
      "slug": "task-schedule",
      "title": "任务管理应用",
      "category": "计划",
      "intro": "一个迭代，三种工作视角。",
      "problem": "任务、期限与进度需要在一起查看。",
      "built": "实现拖放看板、周历和进度面板。",
      "result": "创建任务并移到已完成，日历与完成率同步更新。",
      "features": [
        "任务看板",
        "日历",
        "分析"
      ],
      "demoHref": "/demos/task-schedule"
    },
    {
      "slug": "product-management",
      "title": "产品管理系统",
      "category": "库存",
      "intro": "看清库存与待处理的问题。",
      "problem": "团队需要快速发现库存问题。",
      "built": "实现商品搜索、库存调整、状态切换和低库存概览。",
      "result": "修改库存后，数量、价值和低库存提醒随之更新。",
      "features": [
        "库存",
        "供应商",
        "报表"
      ],
      "demoHref": "/demos/product-management"
    },
    {
      "slug": "modern-landing",
      "title": "现代落地页",
      "category": "营销",
      "intro": "从了解产品，到迈出下一步。",
      "problem": "访客需要先理解陌生的产品，才能决定是否继续探索。",
      "built": "实现响应式产品介绍、功能标签、动画控制、价格切换和模拟注册。",
      "result": "探索三种功能，比较月付和年付价格，并体验注册确认状态。",
      "features": [
        "功能探索",
        "价格切换",
        "注册演示"
      ],
      "demoHref": "/demos/modern-landing"
    },
    {
      "slug": "interactive-portfolio",
      "title": "交互式作品集",
      "category": "作品集",
      "intro": "让作品开启对话。",
      "problem": "不同领域的作品混在一起时，很难按兴趣浏览。",
      "built": "实现分类筛选、作品详情弹层和主题配色切换。",
      "result": "按领域筛选、打开作品详情，并在同一页面切换视觉主题。",
      "features": [
        "画廊筛选",
        "作品详情",
        "主题配色"
      ],
      "demoHref": "/demos/interactive-portfolio"
    },
    {
      "slug": "ecommerce-platform",
      "title": "电子商务平台",
      "category": "购物",
      "intro": "从浏览商品到加入购物袋。",
      "problem": "购物者需要查看、比较和收藏商品。",
      "built": "实现搜索、分类、预览、收藏和购物车。",
      "result": "收藏商品、调整数量，并完成模拟结账。",
      "features": [
        "商品目录",
        "收藏",
        "结账演示"
      ],
      "demoHref": "/demos/ecommerce-platform"
    },
    {
      "slug": "smart-matching",
      "title": "智能匹配应用",
      "category": "连接",
      "intro": "从发现彼此，到开始对话。",
      "problem": "从对资料感兴趣到建立联系，需要清晰的路径。",
      "built": "实现示例资料、连接与跳过、偏好滑块和本地聊天。",
      "result": "连接一个资料并试用模拟对话。资料与评分均为演示内容。",
      "features": [
        "个人资料",
        "连接",
        "模拟聊天"
      ],
      "demoHref": "/demos/smart-matching"
    },
    {
      "slug": "chatbot",
      "title": "聊天机器人",
      "category": "对话",
      "intro": "通过对话找到答案。",
      "problem": "访客需要简单地找到信息并了解下一步。",
      "built": "实现建议问题、示例回答和不支持的问题提示。",
      "result": "询问工作流程并体验对话。回答为脚本示例，未连接AI服务。",
      "features": [
        "建议问题",
        "流程回答",
        "回退提示"
      ],
      "demoHref": "/demos/chatbot"
    }
  ]
};
export const storyLabels = {
  "en": {
    "demo": "PORTFOLIO DEMO",
    "live": "Explore the demo",
    "project": "SELECTED WORK",
    "problem": "The challenge",
    "built": "What I built",
    "result": "What it enables",
    "contact": "Discuss a similar project"
  },
  "ja": {
    "demo": "ポートフォリオデモ",
    "live": "デモを体験する",
    "project": "開発事例",
    "problem": "課題",
    "built": "実装したこと",
    "result": "できること",
    "contact": "同様の開発を相談する"
  },
  "zh": {
    "demo": "作品演示",
    "live": "体验演示",
    "project": "精选作品",
    "problem": "挑战",
    "built": "我的实现",
    "result": "能做到什么",
    "contact": "讨论类似项目"
  }
};
