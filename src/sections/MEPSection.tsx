import { useState, useEffect } from 'react';
import { Settings, Droplets, Flame, Zap } from 'lucide-react';

interface MEPSectionProps { className?: string; }

const MEPSection = ({ className = '' }: MEPSectionProps) => {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    setIsAr((localStorage.getItem('lang') || 'EN') === 'AR');
  }, []);

  const mepServices = isAr ? [
    { icon: Settings, text: 'حسابات الأحمال ونمذجة استهلاك الطاقة' },
    { icon: Droplets, text: 'أنظمة التكييف (Chilled Water, DX, VRF)' },
    { icon: Flame, text: 'شبكات مكافحة الحريق الرطبة والجافة' },
    { icon: Zap, text: 'توزيع الطاقة وأنظمة التيار الخفيف (ELV)' },
  ] : [
    { icon: Settings, text: 'Load calculations & energy modeling' },
    { icon: Droplets, text: 'Chilled water, DX, and VRF systems' },
    { icon: Flame, text: 'Wet & dry fire suppression networks' },
    { icon: Zap, text: 'Low-voltage, ELV, and power distribution' },
  ];

  return (
    // التعديل: إزالة كلاسات التثبيت واستخدام Flexbox للسكرول الطبيعي
    <section className={`relative min-h-screen flex items-center bg-[#F8F9FA] py-20 overflow-hidden ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* التعديل: استخدام img وامتداد jpg لضمان التحميل السريع والصحيح */}
      <img 
        src="/hvac_mechanical_room.jpg" 
        alt="MEP Mechanical Room"
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      
      {/* الفلتر الأبيض الشفاف */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* قسم النصوص (العنوان والوصف) */}
        <div className={`w-full lg:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}>
          <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-6 drop-shadow-sm">
            {isAr ? 'أنظمة كهروميكانيكية' : 'MEP that performs'}<br />
            <span className="text-[#FF6A00]">{isAr ? 'تعمل بأقصى كفاءة.' : 'under load.'}</span>
          </h2>
          <p className="text-lg text-[#1F2937] leading-relaxed font-bold max-w-lg">
            {isAr ? 'تكييف، سباكة، مكافحة حريق، وكهرباء — مصممة لسهولة الصيانة.' : 'HVAC, plumbing, firefighting, and electrical—designed for maintainability.'}
          </p>
        </div>

        {/* قسم كارت الخدمات */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[450px] bg-white shadow-2xl border border-gray-100 rounded-2xl p-8 transition-transform hover:-translate-y-1 duration-300">
            <h3 className="text-2xl font-black text-[#0F172A] mb-8 border-b border-gray-100 pb-4">
              {isAr ? 'الأنظمة الكهروميكانيكية (MEP)' : 'MEP Systems'}
            </h3>
            <ul className="space-y-6">
              {mepServices.map((service, index) => (
                <li key={index} className={`flex items-start gap-4 group ${isAr ? 'justify-start' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#FF6A00] transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-[#FF6A00] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-base text-[#1F2937] font-black leading-relaxed pt-2">
                    {service.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MEPSection;
