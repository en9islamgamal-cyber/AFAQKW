import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '../lib/supabase'; 

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps { className?: string; }

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    projectType: '', 
    message: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current, { x: isAr ? '6vw' : '-6vw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(formCardRef.current, { x: isAr ? '-6vw' : '6vw', y: '3vh', opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' } });
    }, section);
    return () => ctx.revert();
  }, [isAr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('quote_requests')
        .insert([
          { 
            full_name: formData.name, 
            email: formData.email, 
            phone: formData.phone,
            service_type: formData.projectType,
            message: `شركة: ${formData.company} \nالرسالة: ${formData.message}`,
            status: 'جديد'
          }
        ]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', projectType: '', message: '' });
    } catch (err: any) {
      setError(isAr ? 'حدث خطأ أثناء الإرسال، حاول مرة أخرى' : 'Error sending request, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = isAr ? [
    { icon: Mail, label: 'البريد الإلكتروني', value: 'info@afaqkw.online' },
    { icon: Phone, label: 'الهاتف', value: '+965 96951688' },
    { icon: MapPin, label: 'الموقع', value: 'الكويت - الفروانية - شارع حبيب المناور' },
  ] : [
    { icon: Mail, label: 'Email', value: 'info@afaqkw.online' },
    { icon: Phone, label: 'Phone', value: '+965 96951688' },
    { icon: MapPin, label: 'Location', value: 'Habib Al-Munawer St, Farwaniya, Kuwait' },
  ];

  return (
    <section id="contact" ref={sectionRef} className={`relative bg-white py-20 lg:py-32 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* الجانب الأيمن: معلومات التواصل */}
          <div ref={leftColRef} className={`lg:w-[45%] lg:pt-8 ${isAr ? 'text-right' : 'text-left'}`}>
            <h2 className="font-heading text-4xl lg:text-6xl font-black text-[#0F172A] leading-tight mb-6">
              {isAr ? 'دعنا نبني' : "Let's build your"}<br />
              <span className="text-[#FF6A00]">{isAr ? 'مشروعك القادم.' : 'next project.'}</span>
            </h2>
            <p className={`text-[#1F2937] mb-10 leading-relaxed max-w-md ${isAr ? 'text-xl font-medium' : 'text-lg'}`}>
              {isAr ? 'أخبرنا بمخططاتك. سنقوم بالرد خلال يومي عمل بنطاق عمل واضح والخطوات التالية للبدء.' : "Tell us what you're planning. We'll respond within two business days with a clear scope and next steps."}
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 flex items-center justify-center border border-[#FF6A00]/20 group-hover:bg-[#FF6A00] transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#FF6A00] group-hover:text-white" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#1F2937]/70 uppercase tracking-widest font-black mb-1">{item.label}</span>
                    <span className="text-lg text-[#0F172A] font-bold" dir="ltr">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الجانب الأيسر: فورم طلب عرض السعر */}
          <div ref={formCardRef} className={`lg:w-[55%] ${isAr ? 'lg:pr-8 text-right' : 'lg:pl-8 text-left'}`}>
            <div className="bg-[#F8F9FA] border border-gray-200 rounded-[2.5rem] p-8 lg:p-12 shadow-xl relative overflow-hidden">
              
              {isSubmitted ? (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0F172A] mb-3">{isAr ? 'تم إرسال طلبك بنجاح!' : 'Request Sent Successfully!'}</h3>
                  <p className="text-[#1F2937] font-medium">
                    {isAr ? 'شكراً لثقتك في آفاق. سيتواصل معك أحد مهندسينا قريباً.' : "Thank you for your trust. One of our engineers will contact you soon."}
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-8 text-[#FF6A00] font-black underline italic hover:text-orange-700">إرسال طلب آخر</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-[#1F2937] font-black uppercase tracking-widest">{isAr ? 'الاسم بالكامل' : 'Full Name'}</label>
                      <Input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={isAr ? 'مثال: محمد أحمد' : 'e.g. John Doe'} required className="h-14 bg-white border-gray-300 text-[#0F172A] rounded-xl focus:border-[#FF6A00] font-bold shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-[#1F2937] font-black uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@afaq.com" required className="h-14 bg-white border-gray-300 text-[#0F172A] rounded-xl focus:border-[#FF6A00] font-bold shadow-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-[#1F2937] font-black uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                      <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+965 ---- ----" required className="h-14 bg-white border-gray-300 text-[#0F172A] rounded-xl focus:border-[#FF6A00] font-bold shadow-sm" />
                    </div>
                    <div className="space-y-2" dir={isAr ? 'rtl' : 'ltr'}>
                      <label className="text-xs text-[#1F2937] font-black uppercase tracking-widest">{isAr ? 'نوع الخدمة' : 'Service Type'}</label>
                      <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                        <SelectTrigger className="h-14 bg-white border-gray-300 text-[#0F172A] rounded-xl focus:border-[#FF6A00] font-bold shadow-sm">
                          <SelectValue placeholder={isAr ? 'اختر التخصص' : 'Select Service'} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-[#0F172A] font-bold shadow-lg">
                          <SelectItem value="MEP">{isAr ? 'أنظمة كهروميكانيكية (MEP)' : 'MEP Systems'}</SelectItem>
                          <SelectItem value="Construction">{isAr ? 'مقاولات عامة' : 'General Construction'}</SelectItem>
                          <SelectItem value="Firefighting">{isAr ? 'أنظمة مكافحة الحريق' : 'Firefighting Systems'}</SelectItem>
                          <SelectItem value="Infrastructure">{isAr ? 'بنية تحتية' : 'Infrastructure'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-[#1F2937] font-black uppercase tracking-widest">{isAr ? 'تفاصيل المشروع' : 'Project Details'}</label>
                    <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={isAr ? 'اكتب باختصار عن مشروعك...' : 'Briefly describe your project...'} rows={4} required className="bg-white border-gray-300 text-[#0F172A] rounded-2xl focus:border-[#FF6A00] font-bold resize-none shadow-sm" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#FF6A00] hover:bg-orange-600 text-white rounded-2xl font-black text-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50">
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> {isAr ? 'جاري الإرسال...' : 'Sending...'}</>
                    ) : (
                      <>{isAr ? 'طلب عرض سعر الآن' : 'Request Quote Now'} {isAr ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
