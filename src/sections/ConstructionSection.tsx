import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Building2, Shield, Paintbrush, Truck } from 'lucide-react';

interface ConstructionSectionProps { className?: string; }

const ConstructionSection = ({ className = '' }: ConstructionSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

  const constructionServices = isAr ? [
    { icon: Building2, text: 'أعمال الخرسانة والهياكل المعدنية' },
    { icon: Shield, text: 'الواجهات الزجاجية (Curtain Wall)، التجليد، والعزل' },
    { icon: Paintbrush, text: 'التشطيبات الداخلية وأنظمة الأسقف المعلقة' },
    { icon: Truck, text: 'إدارة الخدمات اللوجستية للموقع والمخلفات' },
  ] : [
    { icon: Building2, text: 'Concrete & structural steel coordination' },
    { icon: Shield, text: 'Curtain wall, cladding, & waterproofing' },
    { icon: Paintbrush, text: 'Interior fit-outs & ceiling systems' },
    { icon: Truck, text: 'Site logistics & waste management' },
  ];

  return (
    // التعديل: إزالة الكلاسات الخاصة بالتثبيت واستخدام تنسيق مرن (Flexbox) للسكرول الطبيعي
    <section className={`relative min-h-screen flex items-center bg-[#F8F9FA] py-20 overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* صورة الخلفية */}
      <img 
        src="/facade_construction.jpg" 
        alt="Construction Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      
      {/* طبقة شفافة فوق الصورة لضمان وضوح الكلام */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      {/* الحاوية الرئيسية للعناصر */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم النصوص (العنوان والوصف) */}
        <div className={`w-full lg:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-[1.1] mb-6 drop-shadow-sm">
            {isAr ? 'من الهيكل الخرساني' : 'Structure to'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'إلى التشطيبات.' : 'finishes.'}</span>
          </h2>
          <p className={`text-[#1F2937] font-medium leading-relaxed max-w-lg ${isAr ? 'text-xl' : 'text-lg'}`}>
            {isAr ? 'أعمال الخرسانة، المباني، الواجهات، والتشطيبات الداخلية — تدار بضوابط صارمة وتقارير يومية.' : 'Concrete, masonry, cladding, and interior build-outs—managed with tight controls and daily reporting.'}
          </p>

          <div className="mt-8">
            <span className={`inline-block text-sm tracking-wide text-[#0F172A] bg-white px-5 py-2.5 rounded-full shadow-sm font-medium border border-gray-100 ${isAr ? 'font-bold' : ''}`}>
              {isAr ? 'تقارير يومية • قوائم فحص الجودة (Quality Checklists)' : 'Daily Reporting • Quality Checklists'}
            </span>
          </div>
        </div>

        {/* قسم الكارت (الخدمات) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
            <h3 className={`font-heading text-2xl text-[#0F172A] mb-6 border-b border-gray-100 pb-4 ${isAr ? 'font-black' : 'font-bold'}`}>
              {isAr ? 'المقاولات العامة' : 'General Construction'}
            </h3>
            <ul className="space-y-4">
              {constructionServices.map((service, index) => (
                <li key={index} className={`flex items-start gap-3 ${isAr ? 'justify-start' : ''}`}>
                  <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <service.icon className="w-4 h-4 text-[#FF6A00]" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-medium text-[#1F2937] leading-relaxed">{service.text}</span>
                </li>
              ))}
            </ul>
            
            <button className={`mt-8 px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg flex items-center gap-2 text-[#0F172A] text-sm font-bold hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-all duration-300 w-full justify-center ${isAr ? 'flex-row-reverse' : ''}`}>
              {isAr ? 'عرض خدمات المقاولات' : 'View construction services'}
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConstructionSection;
