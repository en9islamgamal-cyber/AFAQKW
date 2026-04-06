import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '../lib/supabase'; 

gsap.registerPlugin(ScrollTrigger);

const ContactSection = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current, { x: isAr ? '50px' : '-50px', opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.fromTo(formCardRef.current, { y: '30px', opacity: 0 }, { y: 0, opacity: 1, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isAr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('quote_requests').insert([{ full_name: formData.name, email: formData.email, phone: formData.phone, message: formData.message, status: 'جديد' }]);
      if (!error) { setIsSubmitted(true); setFormData({ name: '', email: '', phone: '', message: '' }); }
    } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" ref={sectionRef} className={`bg-white py-20 ${className}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="px-6 lg:px-[7vw] flex flex-col lg:flex-row gap-12">
        {/* بيانات التواصل الصحيحة */}
        <div ref={leftColRef} className="lg:w-1/2">
          <h2 className="text-4xl lg:text-6xl font-black text-[#0F172A] mb-8">
            {isAr ? 'دعنا نبني' : "Let's build"}<br/><span className="text-[#FF6A00]">{isAr ? 'مشروعك القادم.' : 'your project.'}</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6A00]/10 rounded-xl flex items-center justify-center"><Mail className="text-[#FF6A00]" /></div>
              <div><p className="text-xs text-gray-400 font-bold uppercase">Email</p><p className="font-black text-[#0F172A]">info@afaqkw.online</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6A00]/10 rounded-xl flex items-center justify-center"><Phone className="text-[#FF6A00]" /></div>
              <div><p className="text-xs text-gray-400 font-bold uppercase">Phone</p><p className="font-black text-[#0F172A]" dir="ltr">+965 96951688</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6A00]/10 rounded-xl flex items-center justify-center"><MapPin className="text-[#FF6A00]" /></div>
              <div><p className="text-xs text-gray-400 font-bold uppercase">Location</p><p className="font-black text-[#0F172A]">{isAr ? 'الكويت - الفروانية - شارع حبيب المناور' : 'Habib Al-Munawer St, Farwaniya, Kuwait'}</p></div>
            </div>
          </div>
        </div>

        {/* الفورم */}
        <div ref={formCardRef} className="lg:w-1/2">
          <div className="bg-[#F8F9FA] p-8 lg:p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-10">
                <Send className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-[#0F172A]">{isAr ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}</h3>
                <button onClick={() => setIsSubmitted(false)} className="mt-4 text-[#FF6A00] font-bold underline">إرسال طلب آخر</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="h-14 bg-white" />
                <Input type="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="h-14 bg-white" />
                <Input type="tel" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="h-14 bg-white" />
                <Textarea placeholder={isAr ? 'تفاصيل المشروع' : 'Project Details'} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} required className="bg-white" />
                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#FF6A00] text-white rounded-2xl font-black text-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                  {isSubmitting ? '...' : (isAr ? 'اطلب عرض سعر' : 'Get a Quote')}
                  {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
