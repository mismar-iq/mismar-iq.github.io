import { SiteContent } from '../types';

export const defaultSiteContent: SiteContent = {
  settings: {
    siteName: {
      ar: 'شركة مسمار للمقاولات',
      en: 'MISMAR CONTRACTING'
    },
    siteTagline: {
      ar: 'حلول متكاملة في البناء والمقاولات، من الفكرة الأولى حتى أدق التفاصيل في عموم العراق.',
      en: 'Comprehensive Contracting & Architectural Engineering Across Iraq'
    },
    logoText: 'MISMAR CONTRACTING',
    logoImage: '/assets/aistudio/image_4bd9251f.png',
    primaryColor: '#b88a58', // Muted desert bronze / ochre
    secondaryColor: '#18232b', // Deep architectural petrol slate
    enableEnglish: true,
    defaultLanguage: 'ar',
    heroSlides: [
      {
        id: 'hero-1',
        title: {
          ar: 'نبني بثقة. ونصنع\nما يدوم.',
          en: 'We build with confidence.\nWe craft what endures.'
        },
        subtitle: {
          ar: 'حلول متكاملة في البناء والمقاولات، من الفكرة الأولى حتى أدق التفاصيل.',
          en: 'Comprehensive solutions in construction and general contracting, from initial concept to the finest detail.'
        },
        kicker: {
          ar: 'مسمار للمقاولات',
          en: 'MISMAR CONTRACTING'
        },
        primaryCtaText: {
          ar: 'اكتشف خدماتنا',
          en: 'Explore Services'
        },
        primaryCtaLink: '#services',
        secondaryCtaText: {
          ar: 'اطلب عرض سعر',
          en: 'Request Quote'
        },
        secondaryCtaLink: '#contact',
        backgroundImage: '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
        isVisible: true
      }
    ],
    sectionsConfig: [
      { id: 'sec-hero', key: 'hero', nameAr: 'الواجهة الرئيسية (الهيرو)', nameEn: 'Hero Section', isVisible: true, order: 1 },
      { id: 'sec-method', key: 'stats', nameAr: 'منهجنا (الأساس الجيد)', nameEn: 'Methodology Section', isVisible: true, order: 2 },
      { id: 'sec-services', key: 'services', nameAr: 'الخدمات الإنشائية', nameEn: 'Services Section', isVisible: true, order: 3 },
      { id: 'sec-packages', key: 'packages', nameAr: 'باقات البناء', nameEn: 'Packages Section', isVisible: true, order: 4 },
      { id: 'sec-projects', key: 'projects', nameAr: 'مشاريعنا المنفذة', nameEn: 'Projects Portfolio', isVisible: true, order: 5 },
      { id: 'sec-about', key: 'about', nameAr: 'من نحن ورؤيتنا', nameEn: 'About Us Section', isVisible: true, order: 6 },
      { id: 'sec-custom', key: 'custom', nameAr: 'الأقسام المخصصة', nameEn: 'Custom Sections', isVisible: true, order: 7 },
      { id: 'sec-quote', key: 'quote', nameAr: 'تواصل معنا (نبدأ من الفكرة)', nameEn: 'Contact Split Form', isVisible: true, order: 8 },
      { id: 'sec-contact', key: 'contact', nameAr: 'معلومات الاتصال', nameEn: 'Contact Channels', isVisible: true, order: 9 }
    ]
  },

  about: {
    title: {
      ar: 'من نحن - شركة مسمار للمقاولات',
      en: 'About Us - MISMAR CONTRACTING'
    },
    subtitle: {
      ar: 'هندسة معمارية متقدمة، التزام بالوقت، وتنفيذ يتجاوز التوقعات في العراق',
      en: 'Advanced Engineering, On-Time Delivery, and Unmatched Quality in Iraq'
    },
    leadParagraph: {
      ar: 'تأسست شركة مسمار للمقاولات لتكون شريكاً هندسياً موثوقاً في تشييد وتطوير المشاريع السكنية والتجارية في العراق، حيث نجمع بين متانة الهيكل الإنشائي وجمال وفخامة التفاصيل المعمارية العصرية.',
      en: 'Founded to deliver structural mastery across Iraq\'s residential and commercial landscape, combining engineered strength with bespoke architectural finishing.'
    },
    paragraphs: [
      {
        id: 'ab-p1',
        title: {
          ar: 'المنهجية الهندسية الصارمة وفحوصات الجودة',
          en: 'Rigorous Engineering Standards'
        },
        content: {
          ar: 'نعتمد على كادر هندسي عراقي متكامل من الاستشاريين الإنشائيين والمعماريين، مع إجراء فحوصات مختبرية مستمرة للخرسانة وحديد التسليح في المركز الوطني للمختبرات الإنشائية وفق المواصفات القياسية المعتمدة.',
          en: 'Our dedicated team of civil and architectural engineers ensures rigorous lab testing for concrete and rebar in certified national engineering laboratories.'
        }
      },
      {
        id: 'ab-p2',
        title: {
          ar: 'الشفافية والالتزام بجداول الكميات الدقيقة',
          en: 'Budget Integrity & Transparency'
        },
        content: {
          ar: 'نؤمن بأن الثقة أساس كل إنجاز؛ لذا نقدم عقوداً قانونية وهندسية واضحة وجداول كميات تفصيلية بالدينار العراقي دون تكاليف خفية، مع توثيق دوري مصور للمالك في كل مرحلة صب وبناء.',
          en: 'Trust is our cornerstone. We commit to transparent bills of quantities without hidden costs and regular photographic site progress reporting.'
        }
      }
    ],
    vision: {
      ar: 'أن نكون الخيار الأول في العراق لتشييد الفلل السكنية الفاخرة والمشاريع التجارية الاستثمارية وفق أرقى المواصفات المعمارية العالمية.',
      en: 'To be the premier contractor of choice across Iraq for luxury residential and commercial developments.'
    },
    mission: {
      ar: 'تقديم حلول إنشائية وتشييدية متكاملة تجمع بين الدقة الهندسية، وفخامة المواد، والالتزام التام بالمواعيد المحددة والضمانات الرسمية.',
      en: 'To deliver integrated construction solutions combining engineering precision, material excellence, and strict timeline adherence.'
    },
    values: [
      {
        id: 'val-1',
        title: { ar: 'الإتقان والمطابقة القياسية', en: 'Mastery & Quality' },
        description: { ar: 'تطبيق أعلى المعايير والمواصفات القياسية العراقية وفحص المواد مخبرياً.', en: 'Strict adherence to national building standards and multi-tier lab audits.' },
        icon: 'ShieldCheck'
      },
      {
        id: 'val-2',
        title: { ar: 'الالتزام التام بالوقت', en: 'Punctuality' },
        description: { ar: 'احترام المواعيد المحددة في العقود وتسليم المشاريع في وقتها المحدد.', en: 'Uncompromising commitment to scheduled handover dates.' },
        icon: 'Clock'
      },
      {
        id: 'val-3',
        title: { ar: 'الشفافية التامة بالكميات', en: 'Full Transparency' },
        description: { ar: 'عقود واضحة، جداول كميات تفصيلية بالدينار العراقي، وتقارير أسبوعية مصورة.', en: 'Transparent contracts, comprehensive BOQs, and weekly photo reports.' },
        icon: 'FileCheck'
      },
      {
        id: 'val-4',
        title: { ar: 'ضمان رسمي 10 سنوات', en: '10-Year Warranty' },
        description: { ar: 'ضمانات هيكلية شاملة على الإنشاءات والخرسانة والعوازل المائية والحرارية.', en: 'Up to 10-year structural warranties and comprehensive maintenance support.' },
        icon: 'Award'
      }
    ],
    stats: [
      { id: 'st-1', value: '15+', label: { ar: 'عاماً من الخبرة', en: 'Years of Experience' }, sublabel: { ar: 'في قطاع البناء والمقاولات في العراق', en: 'In Iraqi Construction' } },
      { id: 'st-2', value: '140+', label: { ar: 'مشروعاً منجزاً', en: 'Completed Projects' }, sublabel: { ar: 'فلل ومباني تجارية ومجمعات', en: 'Villas & Commercial Buildings' } },
      { id: 'st-3', value: '450K+', label: { ar: 'متر مربع تم تشييدها', en: 'Sqm Constructed' }, sublabel: { ar: 'بأعلى المواصفات الهندسية', en: 'High Precision Execution' } },
      { id: 'st-4', value: '100%', label: { ar: 'فحص مخبري للمواد', en: 'Lab Certified' }, sublabel: { ar: 'وضمانات رسمية معتمدة', en: 'Certified Warranties' } }
    ],
    mainImage: '/src/assets/images/about_mismar_craft_1792791377536.jpg',
    galleryImages: [
      '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
      '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
      '/src/assets/images/project_commercial_tower_1792791377042.jpg'
    ]
  },

  methodology: {
    kicker: {
      ar: '01 — منهجنا',
      en: '01 — Our Philosophy'
    },
    heading: {
      ar: 'الأساس الجيد لا\nيطلب الانتباه.',
      en: 'Good foundation\ncommands quiet confidence.'
    },
    description: {
      ar: 'نهتم بالتفاصيل التي تصنع فرقاً حقيقياً، ونضع جودة التنفيذ في قلب كل مشروع.',
      en: 'We obsess over the invisible details that make a lasting difference, embedding structural integrity at the heart of every build.'
    },
    steps: [
      {
        id: 'step-1',
        num: '01',
        title: {
          ar: 'الوضوح قبل البناء',
          en: 'Clarity Before Construction'
        },
        description: {
          ar: 'دراسة هندسية مستفيضة للمخططات الإنشائية وجداول الكميات لتفادي أي تكاليف خفية أو مفاجآت أثناء التنفيذ.',
          en: 'Rigorous engineering audit of structural blueprints and BOQs to eliminate hidden costs.'
        }
      },
      {
        id: 'step-2',
        num: '02',
        title: {
          ar: 'التفاصيل تصنع الفرق',
          en: 'Details Define Excellence'
        },
        description: {
          ar: 'عناية فائقة بتسليح الخرسانة، العوازل المائية والحرارية، ونقاط التقاء المواد المعمارية بأعلى دقة.',
          en: 'Meticulous supervision over structural rebar cages, waterproofing, and architectural junctions.'
        }
      },
      {
        id: 'step-3',
        num: '03',
        title: {
          ar: 'الالتزام التام بالمعايير',
          en: 'Strict Code Adherence'
        },
        description: {
          ar: 'مطابقة تامة للمواصفات القياسية العراقية والكود الهندسي المعتمد مع إجراء اختبارات كسر أسطوانات الخرسانة وفحص الشد.',
          en: 'Full compliance with engineering codes and certified laboratory compression and tensile testing.'
        }
      },
      {
        id: 'step-4',
        num: '04',
        title: {
          ar: 'التسليم وضمان الاستدامة',
          en: 'Handover & 10-Year Warranty'
        },
        description: {
          ar: 'تسليم متكامل بعقد ضمان رسمي يمتد لـ 10 سنوات على الهيكل الإنشائي والعوازل لراحة بالك التامة.',
          en: 'Turnkey handover backed by a certified 10-year structural and waterproofing deed.'
        }
      }
    ]
  },

  packages: [
    {
      id: 'pkg-good',
      name: {
        ar: 'الباقة الجيدة',
        en: 'Good Package'
      },
      tagline: {
        ar: 'خيار اقتصادي مدروس بجودة هندسية قياسية وضمانات معتمدة',
        en: 'Smart economical choice with certified quality and warranties'
      },
      description: {
        ar: 'باقة مثالية للمشاريع السكنية والاستثمارية التي تبحث عن توازن ذكي بين التكلفة الاقتصادية والمواصفات الهندسية الموثوقة مع إشراف هندسي مستمر.',
        en: 'Ideal for residential and investment builds seeking a smart balance between cost efficiency and trusted structural standards.'
      },
      pricePerMeter: {
        ar: 'ابتداءً من 450,000 دينار / م²',
        en: 'Starting from 450,000 IQD / m²'
      },
      image: '/src/assets/images/project_commercial_tower_1792791377042.jpg',
      accentColor: 'slate',
      isPopular: false,
      isVisible: true,
      order: 1,
      inquiryMessage: 'مرحباً شركة مسمار للمقاولات، أود الاستفسار عن تفاصيل وحساب تكلفة (الباقة الجيدة).',
      features: [
        { id: 'f-1', ar: 'تنفيذ أعمال الهيكل الإنشائي (العظم) وفق المواصفات القياسية العراقية', en: 'Structural skeleton built under approved national engineering codes' },
        { id: 'f-2', ar: 'سمنت مقاوم للأملاح معتمد (ماس / السليمانية) مع فحص مكعبات الخرسانة', en: 'Sulfate-resistant certified cement with laboratory compression tests' },
        { id: 'f-3', ar: 'حديد تسليح عالي المقاومة مفحوص ومطابق للمواصفات', en: 'High-tensile certified steel rebar with lab tensile verification' },
        { id: 'f-4', ar: 'عزل مائي وحراري للأسطح والحمامات بطبقات متطورة بضمان 10 سنوات', en: 'Multi-layer waterproofing & thermal insulation with 10-year warranty' },
        { id: 'f-5', ar: 'تمديدات سباكة وكهرباء بمواد درجة أولى معتمدة', en: 'High-grade approved plumbing and electrical conduit networks' },
        { id: 'f-6', ar: 'إشراف هندسي منتظم وزيارات موقعية موثقة بتقارير', en: 'Regular engineering site supervision visits and progress audits' }
      ]
    },
    {
      id: 'pkg-excellent',
      name: {
        ar: 'الباقة الممتازة',
        en: 'Premium Package'
      },
      tagline: {
        ar: 'الباقة الأكثر طلباً للفلل السكنية العصرية بتشطيبات متطورة',
        en: 'Most popular package for modern family villas with refined fit-out'
      },
      description: {
        ar: 'الحل الأمثل لأصحاب الفلل الخاصة الباحثين عن مواد تشطيب عالية الجودة، تصاميم عصرية، وحلول عزل حراري وصوتي متقدمة تناسب الأجواء في العراق.',
        en: 'The ideal solution for private villas seeking refined interior materials, soundproofing, thermal insulation for Iraqi climate, and dedicated project management.'
      },
      pricePerMeter: {
        ar: 'ابتداءً من 750,000 دينار / م²',
        en: 'Starting from 750,000 IQD / m²'
      },
      image: '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
      accentColor: 'amber',
      isPopular: true,
      isVisible: true,
      order: 2,
      inquiryMessage: 'مرحباً شركة مسمار للمقاولات، أود الاستفسار عن تفاصيل والتعاقد على (الباقة الممتازة).',
      features: [
        { id: 'f-201', ar: 'جميع مميزات الباقة الجيدة مضافاً إليها مواصفات ترقية للتشطيب الفاخر', en: 'All features of the Good Package plus luxury finishing upgrades' },
        { id: 'f-202', ar: 'واجهات حجر طبيعي نخب أول أو طابوق كربلائي معالج مع إضاءات مخفية', en: 'First-grade natural stone facades or treated Karbala brick with accent LED' },
        { id: 'f-203', ar: 'أرضيات بورسلان إسباني أو إيطالي نخب أول لمساحات الاستقبال والصالات', en: 'First-choice Spanish/Italian porcelain tiles for main reception halls' },
        { id: 'f-204', ar: 'نوافذ ألمنيوم دبل جلاس عازل للصوت والحرارة والغبار', en: 'Double-glazed thermal-break aluminum windows' },
        { id: 'f-205', ar: 'تأسيس شبكات التكييف المركزي/المخفي والسمارت هوم', en: 'Full rough-in for concealed AC and smart home automation' },
        { id: 'f-206', ar: 'مهندس مقيم متفرغ للمشروع وتقارير دورية مصورة للمالك', en: 'Dedicated resident engineer and regular photographic site audits' },
        { id: 'f-207', ar: 'ضمان هيكلي 10 سنوات وضمان شامل على الأعمال التكميلية', en: '10-year structural warranty & 2-year full finishing warranty' }
      ]
    },
    {
      id: 'pkg-luxury',
      name: {
        ar: 'الباقة الفاخرة',
        en: 'Luxury Package'
      },
      tagline: {
        ar: 'قمة الفخامة المعمارية والمواصفات الخاصة للقصور والفلل الاستثنائية',
        en: 'Pinnacle of luxury and bespoke craftsmanship for high-end estates'
      },
      description: {
        ar: 'صُممت هذه الباقة لعملاء النخبة والمشاريع الفريدة، حيث تتضمن أرقى أنواع الرخام الطبيعي المستورد، أنظمة الأتمتة الذكية المتكاملة، مسابح إنفينيتي، وتصاميم معمارية خاصة بالكامل.',
        en: 'Engineered for elite estates and unique architectural concepts, featuring imported natural marble, full KNX home automation, infinity pools, and custom joinery.'
      },
      pricePerMeter: {
        ar: 'تسعير مخصص حسب جدول الكميات والتصاميم',
        en: 'Bespoke pricing based on custom specifications & BOQ'
      },
      image: '/src/assets/images/project_luxury_villa_1792791377882.jpg',
      accentColor: 'bronze',
      isPopular: false,
      isVisible: true,
      order: 3,
      inquiryMessage: 'مرحباً شركة مسمار للمقاولات، أود مناقشة مشروع خاص واستشارة هندسية لـ (الباقة الفاخرة).',
      features: [
        { id: 'f-301', ar: 'إشراف مباشر من كبار الاستشاريين وإدارة هندسية تنفيذية مخصصة', en: 'Direct management by senior engineering directors and consultants' },
        { id: 'f-302', ar: 'أرضيات وجدران رخام طبيعي مستورد (ستاتوريو / كلكتا / ترافنتينو) مقطوع بالليزر', en: 'Imported bookmatched marble (Statuario, Calacatta, Travertine)' },
        { id: 'f-303', ar: 'نظام سمارت هوم متكامل (KNX) للتحكم بالإضاءة والتكييف والستائر والأمان', en: 'Full KNX smart home system controlling lighting, HVAC, curtains & CCTV' },
        { id: 'f-304', ar: 'واجهات زجاجية بانورامية كاملة الارتفاع (Curtain Walls) معزولة كلياً', en: 'Floor-to-ceiling panoramic structural curtain walls' },
        { id: 'f-305', ar: 'تنفيذ مسابح إنفينيتي مع أنظمة تدفئة وفلاتر متقدمة ولاندسكيب حدائق', en: 'Infinity swimming pool with filtration systems and architectural landscape' },
        { id: 'f-306', ar: 'أبواب خشب صلب طبيعي مصممة خصيصاً مع إكسسوارات ومسكات إيطالية فاخرة', en: 'Custom solid wood bespoke doors with Italian architectural hardware' },
        { id: 'f-307', ar: 'عقد صيانة مجانية لمدة عامين بعد التسليم النهائي مع ضمان 10 سنوات', en: '2-year post-handover preventative maintenance package with 10-year warranty' }
      ]
    }
  ],

  services: [
    {
      id: 'srv-1',
      title: { ar: 'المقاولات العامة والإنشاءات الهيكلية', en: 'General Contracting & Skeleton Works' },
      description: {
        ar: 'تنفيذ أعمال الهيكل والخرسانة المسلحة للمشاريع السكنية والتجارية في بغداد وعموم العراق بدقة متناهية والتزام بالمواصفات الهندسية.',
        en: 'Execution of reinforced concrete and steel structures for residential and commercial landmarks conforming to national guidelines.'
      },
      iconName: 'Building2',
      image: '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
      isVisible: true,
      order: 1
    },
    {
      id: 'srv-2',
      title: { ar: 'باقات البناء المتكاملة (تسليم مفتاح)', en: 'Turnkey Construction Packages' },
      description: {
        ar: 'خدمات شاملة تبدأ من المخططات والتراخيص وحتى تسليم المفتاح النهائي، مع إشراف هندسي وإدارة كاملة للمواد والكوادر الماهرة.',
        en: 'Full lifecycle delivery from structural foundation to keys handover, managed by licensed project directors.'
      },
      iconName: 'KeyRound',
      image: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
      isVisible: true,
      order: 2
    },
    {
      id: 'srv-3',
      title: { ar: 'التشطيبات المعمارية والديكور الداخلي', en: 'Architectural Finishing & Fit-Out' },
      description: {
        ar: 'تنفيذ التشطيبات الراقية بجميع أنواعها: الرخام، البورسلان، التكسيات الحديثة، الواجهات الخارجية، وأنظمة الإضاءة المعمارية المتطورة.',
        en: 'Luxury fit-out services including bespoke stonework, high-end tiling, modern ceilings, facades, and architectural lighting.'
      },
      iconName: 'Paintbrush',
      image: '/src/assets/images/project_luxury_villa_1792791377882.jpg',
      isVisible: true,
      order: 3
    },
    {
      id: 'srv-4',
      title: { ar: 'الإشراف الهندسي وإدارة المشاريع', en: 'Engineering Supervision & Management' },
      description: {
        ar: 'متابعة ميدانية يومية وفحص دقيق لجميع بنود التنفيذ، مع تقارير هندسية معتمدة ومطابقة المخططات الإنشائية والمعمارية.',
        en: 'Rigorous daily site supervision, structural audits, BOQ cost management, and engineering progress reporting.'
      },
      iconName: 'HardHat',
      image: '/src/assets/images/about_mismar_craft_1792791377536.jpg',
      isVisible: true,
      order: 4
    },
    {
      id: 'srv-5',
      title: { ar: 'ترميم وتطوير المباني والمقرات', en: 'Renovation & Commercial Upgrades' },
      description: {
        ar: 'تحديث المباني القائمة وتأهيلها إنشائياً وتجميلياً لتواكب أحدث المعايير العصرية وزيادة قيمتها الاستثمارية والوظيفية.',
        en: 'Comprehensive structural reinforcement, facade revamping, and modern commercial renovation.'
      },
      iconName: 'Hammer',
      isVisible: true,
      order: 5
    },
    {
      id: 'srv-6',
      title: { ar: 'تنسيق الحدائق والمسابح واللاندسكيب', en: 'Landscape & Infinity Pool Works' },
      description: {
        ar: 'تصميم وتنفيذ الحدائق الخارجية، الشلالات، الجلسات العصرية، ومسابح إنفينيتي بأنظمة تدوير مياه وتدفئة أوتوماتيكية.',
        en: 'Architectural hardscaping, modern outdoor living spaces, infinity swimming pools, and automated filtration.'
      },
      iconName: 'Palmtree',
      isVisible: true,
      order: 6
    }
  ],

  projects: [
    {
      id: 'proj-1',
      title: {
        ar: 'فيلا الجادرية المعمارية الفاخرة',
        en: 'Al-Jadriya Modern Architectural Villa'
      },
      description: {
        ar: 'مشروع فيلا سكنية خاصة في حي الجادرية الراقي ببغداد، تم تنفيذه بالكامل بنظام تسليم مفتاح مع واجهات من الترافنتينو والخرسانة المعمارية ومسبح وحدائق متدرجة.',
        en: 'Turnkey private luxury villa residence in Al-Jadriya district, Baghdad, featuring travertine stone, exposed architectural concrete, swimming pool, and bespoke interior fit-out.'
      },
      category: 'residential',
      categoryName: { ar: 'فلل وقصور سكنية', en: 'Luxury Residential Villas' },
      location: { ar: 'العراق - بغداد (حي الجادرية)', en: 'Baghdad - Al-Jadriya District, Iraq' },
      status: 'completed',
      statusName: { ar: 'تم التسليم بنجاح', en: 'Completed' },
      year: '2025',
      areaM2: 750,
      coverImage: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
      galleryImages: [
        '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
        '/src/assets/images/project_luxury_villa_1792791377882.jpg',
        '/src/assets/images/about_mismar_craft_1792791377536.jpg'
      ],
      isVisible: true,
      order: 1,
      featured: true
    },
    {
      id: 'proj-2',
      title: {
        ar: 'مبنى المنصور التجاري والإداري',
        en: 'Al-Mansour Financial & Commercial Landmark'
      },
      description: {
        ar: 'مبنى تجاري وإداري متطور في شارع الأميرات بالمنصور ببغداد، بواجهات زجاجية هندسية وكاسرات شمس برونزية وأنظمة إدارة مبانٍ متطورة.',
        en: 'Modern corporate commercial landmark on Princesses Street, Al-Mansour, Baghdad, featuring architectural bronze louvers, curtain walls, and high-spec infrastructure.'
      },
      category: 'commercial',
      categoryName: { ar: 'مباني وأبراج تجارية', en: 'Commercial Landmarks' },
      location: { ar: 'العراق - بغداد (حي المنصور)', en: 'Baghdad - Al-Mansour, Iraq' },
      status: 'completed',
      statusName: { ar: 'تم التسليم بنجاح', en: 'Completed' },
      year: '2024',
      areaM2: 3800,
      coverImage: '/src/assets/images/project_commercial_tower_1792791377042.jpg',
      galleryImages: [
        '/src/assets/images/mismar_hero_clean_1792793901017.jpg'
      ],
      isVisible: true,
      order: 2,
      featured: true
    },
    {
      id: 'proj-3',
      title: {
        ar: 'قصر اليرموك المعاصر',
        en: 'Al-Yarmouk Contemporary Estate'
      },
      description: {
        ar: 'قصر فاره على مساحة واسعة في حي اليرموك ببغداد، يتضمن صالات استقبال بارتفاع مضاعف، تكسيات حجرية طبيعية وترافنتينو، وأنظمة سمارت هوم حديثة.',
        en: 'Extensive private estate in Al-Yarmouk, Baghdad, with double-height reception halls, natural stone cladding, and full smart home integration.'
      },
      category: 'residential',
      categoryName: { ar: 'قصور ومجمعات خاصة', en: 'Palaces & Private Estates' },
      location: { ar: 'العراق - بغداد (حي اليرموك)', en: 'Baghdad - Al-Yarmouk, Iraq' },
      status: 'completed',
      statusName: { ar: 'تم التسليم بنجاح', en: 'Completed' },
      year: '2024',
      areaM2: 1400,
      coverImage: '/src/assets/images/project_luxury_villa_1792791377882.jpg',
      galleryImages: [
        '/src/assets/images/mismar_hero_clean_1792793901017.jpg'
      ],
      isVisible: true,
      order: 3,
      featured: true
    }
  ],

  contact: {
    phone: '+964 770 123 4567',
    whatsapp: '9647701234567',
    email: 'info@mismarcontracting.iq',
    address: {
      ar: 'العراق، بغداد، حي المنصور، شارع الأميرات، مجمع الأعمال الهندسي - الطابق الثالث',
      en: 'Princesses Street, Al-Mansour District, Baghdad, Iraq'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Baghdad,Iraq',
    workingHours: {
      ar: 'السبت - الخميس: 9:00 صباحاً - 6:00 مساءً | الجمعة: مغلق',
      en: 'Sat - Thu: 9:00 AM - 6:00 PM | Friday: Closed'
    },
    crNumber: '508924',
    socialLinks: [
      { id: 'soc-wa', platform: 'whatsapp', label: 'واتساب خدمة العملاء', url: 'https://wa.me/9647701234567', isVisible: true },
      { id: 'soc-ig', platform: 'instagram', label: 'إنستغرام المشاريع', url: 'https://instagram.com/mismar_contracting', isVisible: true },
      { id: 'soc-li', platform: 'linkedin', label: 'لينكد إن الشركة', url: 'https://linkedin.com/company/mismar-contracting', isVisible: true },
      { id: 'soc-fb', platform: 'facebook', label: 'فيسبوك شركة مسمار', url: 'https://facebook.com/mismar.contracting', isVisible: true }
    ],
    quoteWhatsappTemplate: 'مرحباً شركة مسمار للمقاولات 🏗️\nأرغب في الحصول على استشارة ودراسة عرض سعر لمشروع بناء في العراق:\n- الاسم: {name}\n- نوع المشروع: {projectType}\n- المساحة التقديرية: {area} م²\n- تفاصيل الفكرة: {notes}\nيرجى التواصل لمناقشة المخطط وجداول الكميات.'
  },

  customSections: [],

  mediaLibrary: [
    {
      id: 'med-official-logo',
      name: 'شعار المكتب الرسمي (MISMAR CONTRACTING)',
      url: '/assets/aistudio/image_4bd9251f.png',
      uploadedAt: '2026-10-24',
      category: 'branding'
    },
    {
      id: 'med-hero-clean',
      name: 'واجهة مسمار المعمارية النظيفة (الهيكل الخرساني والإنشاء)',
      url: '/src/assets/images/mismar_hero_clean_1792793901017.jpg',
      uploadedAt: '2026-10-23',
      category: 'exterior'
    },
    {
      id: 'med-1',
      name: 'واجهة فيلا معمارية - تشطيب فاخر',
      url: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg',
      uploadedAt: '2026-10-23',
      category: 'exterior'
    },
    {
      id: 'med-2',
      name: 'برج المنصور التجاري',
      url: '/src/assets/images/project_commercial_tower_1792791377042.jpg',
      uploadedAt: '2026-10-23',
      category: 'commercial'
    },
    {
      id: 'med-3',
      name: 'قصر اليرموك المعاصر',
      url: '/src/assets/images/project_luxury_villa_1792791377882.jpg',
      uploadedAt: '2026-10-23',
      category: 'residential'
    },
    {
      id: 'med-4',
      name: 'المهندسون والإشراف الميداني',
      url: '/src/assets/images/about_mismar_craft_1792791377536.jpg',
      uploadedAt: '2026-10-23',
      category: 'team'
    }
  ],

  lastUpdated: new Date().toISOString()
};
