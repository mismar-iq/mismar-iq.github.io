import React, { useState } from 'react';
import { Check, Compass } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface MaterialSpec {
  id: string;
  category: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  specs: string[];
  specsEn: string[];
  tolerance: string;
  warranty: string;
  codeStandard: string;
  image: string;
}

export const EngineeringMaterials: React.FC = () => {
  const { language } = useContent();

  const materials: MaterialSpec[] = [
    {
      id: 'mat-concrete',
      category: 'الهيكل الإنشائي · Structural Core',
      titleAr: 'خرسانة مسلحة C40/50 عالية الإجهاد',
      titleEn: 'C40/50 High-Performance Structural Concrete',
      subtitleAr: 'مقاومة للأملاح والكبريتات مع خلط متجانس وفحص مخبري لأسطوانات الكسر',
      subtitleEn: 'Sulfate-resistant ready-mix with mandatory 7 & 28-day laboratory compression audits',
      specs: [
        'إجهاد كسر لا يقل عن 40 نيوتن/مم² معتمد',
        'خلطات مبردة في الصيف للتحكم بحرارة الإماهة وتفادي الشروخ',
        'صب مستمر باستخدام مضخات هيدروليكية وهزازات ميكانيكية دقيقة',
        'معالجة كيميائية ومائية مدروسة للحفاظ على رطوبة الصب'
      ],
      specsEn: [
        'Certified compressive strength exceeding 40 N/mm²',
        'Temperature-controlled chilled mix in summer preventing thermal cracking',
        'Continuous hydraulic pumping with calibrated mechanical vibration',
        'Standardized chemical & wet curing protocols'
      ],
      tolerance: '±0.0mm عيوب تعشيش',
      warranty: 'ضمان هيكلي 10 سنوات',
      codeStandard: 'ACI 318 / المواصفات العراقية',
      image: '/src/assets/images/mismar_structural_skeleton_1792792782043.jpg'
    },
    {
      id: 'mat-travertine',
      category: 'الواجهات المعمارية · Exterior Cladding',
      titleAr: 'تكسيات الترافنتينو والحجر الطبيعي النخب الأول',
      titleEn: 'First-Choice Natural Travertine & Architectural Stone',
      subtitleAr: 'تركيب ميكانيكي آمن بحديد مجلفن مقاوم للتمدد والعوامل الجوية والحرارة في العراق',
      subtitleEn: 'Mechanically anchored with heavy-duty galvanized subframes for extreme weather resilience',
      specs: [
        'نظام تثبيت ميكانيكي متطور (Mechanical Cladding) مع فراغ تهوية عازل',
        'حجر طبيعي نخب أول بمسامات معالجة وحماية ضد الرطوبة والأتربة',
        'قطع ليزري عالي الدقة لفواصل هندسية مستقيمة ومتناسقة',
        'إنارة معمارية مخفية LED مدمجة تبرز جمال ونحت الخطوط الخارجية'
      ],
      specsEn: [
        'Advanced ventilated mechanical bracket subframe system',
        'Treated pores and hydrophobic nano-sealant protection',
        'Laser-cut edges for razor-straight 3mm alignment joints',
        'Integrated recessed architectural warm-spectrum lighting'
      ],
      tolerance: 'فواصل موحدة 3 مم',
      warranty: 'ضمان الواجهات 10 سنوات',
      codeStandard: 'ASTM C1528 / المواصفات الفنية',
      image: '/src/assets/images/hero_mismar_architecture_1792791375406.jpg'
    },
    {
      id: 'mat-glass',
      category: 'الواجهات الزجاجية · Curtain Walls',
      titleAr: 'نوافذ ألمنيوم حراري Thermal-Break وزجاج مزدوج',
      titleEn: 'Thermal-Break Aluminum & Low-E Double Glazing',
      subtitleAr: 'عزل صوتي فائق وتوفير استهلاك التكييف بنسبة تصل إلى 45%',
      subtitleEn: 'High acoustic attenuation and up to 45% HVAC thermal energy savings',
      specs: [
        'قطاعات ألمنيوم خاصة بسماكات ثقيلة مع جسر بولي أميد مانع للحرارة',
        'زجاج دبل جلاس (6+12+6) مليمتر مع غاز الآرجون وطبقة Low-E',
        'عزل صوتي متقدم يخمد ضوضاء الشوارع الحيوية بالكامل',
        'إكسسوارات ومفصلات ومسكات إيطالية وألمانية نخب أول'
      ],
      specsEn: [
        'Heavy-gauge structural frames with continuous polyamide thermal breaks',
        'Double-glazed (6mm + 12mm Argon gap + 6mm) with Low-E soft coating',
        'Superior acoustic rating STC > 40 dB for peaceful sanctuary interior',
        'First-grade Italian & German architectural hardware'
      ],
      tolerance: 'عزل صوتي STC > 40',
      warranty: 'ضمان التوريد والتركيب 5 سنوات',
      codeStandard: 'EN 1279 / المواصفة القياسية',
      image: '/src/assets/images/project_commercial_tower_1792791377042.jpg'
    },
    {
      id: 'mat-smart',
      category: 'الأتمتة والأنظمة الذكية · Smart Automation',
      titleAr: 'بنية تحتية وأنظمة تحكم ذكية متكاملة KNX',
      titleEn: 'KNX Full Home Automation & Smart MEP Infrastructure',
      subtitleAr: 'إدارة متكاملة للإضاءة، التكييف، الستائر، وأنظمة الأمان والحماية',
      subtitleEn: 'Centralized micro-control of architectural illumination, HVAC zones, access, and CCTV',
      specs: [
        'بروتوكول KNX القياسي العالمي غير المقيد بشركة تصنيع واحدة',
        'تحكم مناخي مستقل لكل غرفة لتوفير الطاقة وزيادة الراحة',
        'سيناريوهات إضاءة معمارية مخصصة للضيافة، الاسترخاء، والمساء',
        'تطبيق موحد للهاتف مع إمكانية الربط بأنظمة الصوت والمسرح المنزلي'
      ],
      specsEn: [
        'Open-standard KNX protocol guaranteeing lifetime system upgradability',
        'Individual room HVAC zoning optimized for low consumption',
        'Curated mood lighting scenes for hospitality, evening, and relaxation',
        'Unified mobile touch control and integration with architectural audio'
      ],
      tolerance: 'زمن استجابة < 50ms',
      warranty: 'ضمان الأنظمة الذكية',
      codeStandard: 'ISO/IEC 14543-3',
      image: '/src/assets/images/project_luxury_villa_1792791377882.jpg'
    }
  ];

  const [activeId, setActiveId] = useState<string>(materials[0].id);
  const selected = materials.find((m) => m.id === activeId) || materials[0];

  return (
    <section id="engineering" className="py-24 lg:py-32 bg-[#141d24] text-white border-b border-[#2d3e4b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#b88a58] tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'هندسة المواد والمواصفات القياسية' : 'Material Science & Craft'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {language === 'ar'
              ? 'كل مليمتر تم حسابه. كل مادة تم اختيارها لأقصى متانة.'
              : 'Every millimeter computed. Every material audited for generational endurance.'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            {language === 'ar'
              ? 'نطبق أدق المواصفات الهندسية القياسية، ونفحص كل مادة إنشائية في مختبرات المركز الوطني الإنشائي لضمان خرسانة خالية من أي شروخ أو هبوط مع مرور العقود.'
              : 'We subject every critical structural element to laboratory testing to guarantee zero settlement, zero thermal bridging, and timeless aesthetics.'}
          </p>
        </div>

        {/* Segmented Tabs for Materials */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#2d3e4b]">
          {materials.map((m) => {
            const isCurrent = m.id === activeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveId(m.id)}
                className={`px-5 py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isCurrent
                    ? 'bg-[#b88a58] text-[#18232b] border-[#b88a58]'
                    : 'bg-[#18232b] text-neutral-300 hover:text-white border-[#2d3e4b] hover:border-neutral-500'
                }`}
              >
                <span>{language === 'ar' ? m.titleAr.split(' ').slice(0, 3).join(' ') : m.titleEn.split(' ').slice(0, 3).join(' ')}</span>
              </button>
            );
          })}
        </div>

        {/* Active Material Showcase Card */}
        <div className="border border-[#2d3e4b] bg-[#18232b] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto overflow-hidden bg-[#141d24]">
              <img
                src={selected.image}
                alt={selected.titleAr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18232b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#18232b]" />

              {/* Floating Engineering Badge */}
              <div className="absolute bottom-6 right-6 p-4 bg-[#18232b]/90 backdrop-blur-md border border-[#2d3e4b] text-xs">
                <span className="text-neutral-400 font-mono text-[10px] block mb-1">
                  ENGINEERING DEED:
                </span>
                <span className="text-white font-bold block">{selected.warranty}</span>
                <span className="text-[#b88a58] text-[11px] font-mono">{selected.codeStandard}</span>
              </div>
            </div>

            {/* Spec Details Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#b88a58] uppercase tracking-widest block mb-2">
                  {selected.category}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                  {language === 'ar' ? selected.titleAr : selected.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                  {language === 'ar' ? selected.subtitleAr : selected.subtitleEn}
                </p>

                {/* Specs List */}
                <div className="space-y-3 pt-2">
                  {(language === 'ar' ? selected.specs : selected.specsEn).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                      <div className="w-4 h-4 border border-[#b88a58] flex items-center justify-center shrink-0 mt-0.5 text-[#b88a58]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-relaxed font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Metric Chips */}
              <div className="pt-6 border-t border-[#2d3e4b] grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-[#213039] border border-[#2d3e4b]">
                  <span className="text-neutral-400 text-[10px] block">STANDARD CODE</span>
                  <span className="text-white font-bold text-xs">{selected.codeStandard}</span>
                </div>
                <div className="p-3 bg-[#213039] border border-[#2d3e4b]">
                  <span className="text-neutral-400 text-[10px] block">TOLERANCE RATING</span>
                  <span className="text-[#b88a58] font-bold text-xs">{selected.tolerance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
