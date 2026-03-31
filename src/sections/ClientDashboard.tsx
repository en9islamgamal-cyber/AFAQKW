import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Calendar, Users, Wrench, CheckCircle, LogOut, Camera, X, ArrowRight, Info } from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function fetchClientProject() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('client_email', session.user.email)
          .single();
        setProject(data);
      }
      setLoading(false);
    }
    fetchClientProject();
  }, []);

  // دالة لفتح التفاصيل مع التأكد من التشغيل
  const openModal = () => {
    console.log("Card Clicked!"); // هتبان عندك في الكونسول
    setShowDetails(true);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl">⏳ جاري التحميل...</div>;

  if (!project) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6" dir="rtl">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border-t-4 border-red-500">
        <Info className="mx-auto text-slate-300 mb-4" size={50} />
        <h2 className="text-xl font-bold text-slate-800 mb-6">لا يوجد مشروع مرتبط بهذا الإيميل حالياً</h2>
        <button onClick={onLogout} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">تسجيل الخروج</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20" dir="rtl">
      {/* الهيدر الاحترافي */}
      <header className="bg-[#0a0f1c] text-white p-5 shadow-2xl sticky top-0 z-40 border-b-2 border-[#e86024]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-[#e86024] p-2 rounded-lg text-white"><Building2 size={24} /></div>
             <h1 className="text-xl font-black tracking-tight">آفاق <span className="text-[#e86024]">للتطوير</span></h1>
          </div>
          <button onClick={onLogout} className="text-red-400 hover:text-white font-bold flex items-center gap-2 transition-colors">
            خروج <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-slate-400 font-bold mb-6 flex items-center gap-2"><span>📌</span> مشروعي الحالي:</h2>
        
        {/* الكارت الرئيسي - تم تعزيز الـ onClick */}
        <div 
          onClick={openModal}
          className="group relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all hover:shadow-[#e86024]/20 hover:-translate-y-1 active:scale-95"
        >
          <div className="h-64 lg:h-80 bg-slate-200 relative overflow-hidden">
            {project.image_url ? (
              <img src={project.image_url} alt="Site" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><Camera size={48} className="opacity-20" /></div>
            )}
            <div className="absolute top-6 right-6 bg-[#e86024] text-white px-4 py-2 rounded-full font-black text-xs shadow-lg">
               {project.status}
            </div>
          </div>

          <div className="p-10">
            <h3 className="text-3xl font-black text-slate-900 mb-4">{project.project_name}</h3>
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-8">
              <MapPin size={20} className="text-[#e86024]" /> {project.location}
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
               <div className="flex justify-between items-end mb-3">
                  <span className="text-slate-900 font-black">نسبة الإنجاز</span>
                  <span className="text-3xl font-black text-[#e86024]">{project.completion_rate}%</span>
               </div>
               <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden p-1">
                  <div className="bg-[#e86024] h-full rounded-full transition-all duration-1000" style={{ width: `${project.completion_rate}%` }}></div>
               </div>
            </div>

            <div className="flex justify-center">
               <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-black flex items-center gap-3 group-hover:bg-[#e86024] transition-colors">
                  عرض تفاصيل المشروع الكاملة <ArrowRight size={20} className="rotate-180" />
               </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- النافذة المنبثقة (Modal) مع Z-Index خارق --- */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          {/* الخلفية المظلمة */}
          <div className="absolute inset-0 bg-[#0a0f1c]/95 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
          
          {/* محتوى النافذة */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-6 left-6 z-10 bg-slate-100 hover:bg-red-500 hover:text-white p-4 rounded-full transition-all text-slate-600 shadow-lg"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="h-80 lg:h-auto bg-slate-100">
                  {project.image_url ? (
                    <img src={project.image_url} alt="Detail" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">لا توجد صورة بعد</div>
                  )}
               </div>

               <div className="p-8 lg:p-14">
                  <span className="text-[#e86024] font-black text-sm mb-2 block tracking-widest uppercase">تقرير المتابعة الفني</span>
                  <h3 className="text-4xl font-black text-slate-900 mb-3 leading-tight">{project.project_name}</h3>
                  <p className="text-slate-500 font-bold text-lg mb-10 border-b pb-6">{project.work_type}</p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                      <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm"><MapPin size={24} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400">موقع المشروع</p><p className="font-black text-slate-800 text-lg">{project.location}</p></div>
                    </div>
                    <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                      <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 shadow-sm"><Calendar size={24} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400">تاريخ التحديث</p><p className="font-black text-slate-800 text-lg" dir="ltr">{project.last_updated || '---'}</p></div>
                    </div>
                  </div>

                  {/* إحصائيات الميدان */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-6 bg-slate-900 rounded-[2.5rem] text-center text-white">
                      <p className="text-4xl font-black text-[#e86024] mb-1">{project.workers_count || 0}</p>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">عامل ميداني</p>
                    </div>
                    <div className="p-6 bg-slate-900 rounded-[2.5rem] text-center text-white">
                      <p className="text-4xl font-black text-[#e86024] mb-1">{project.techs_count || 0}</p>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">فني متخصص</p>
                    </div>
                  </div>

                  {project.status === 'تم التسليم' && (
                    <div className="bg-green-50 p-6 rounded-3xl border border-green-200 text-green-700 flex items-center gap-4">
                      <CheckCircle size={30} className="flex-shrink-0" />
                      <p className="font-bold text-sm">تم استلام الموقع نهائياً بأعلى مستويات الجودة.</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
