import React, { useEffect, useState } from 'react';
// تأكد من أن المسار أدناه صحيح حسب مكان الملف (إذا كان في src/sections استخدم ../ وإذا كان في src/ استخدم ./)
import { supabase } from '../lib/supabase'; 
import { 
  Building2, MapPin, Calendar, Users, Wrench, 
  CheckCircle, LogOut, Camera, X, ArrowRight, Info 
} from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // معرفة اللغة الحالية من المتصفح
  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useEffect(() => {
    async function fetchClientProject() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('client_email', session.user.email)
            .maybeSingle(); // استخدام maybeSingle لتفادي الخطأ إذا لم يوجد مشروع
          
          if (!error) setProject(data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClientProject();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl">
        ⏳ {isAr ? 'جاري تحميل بيانات مشروعك...' : 'Loading project data...'}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-center" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="bg-white p-10 rounded-[2rem] shadow-xl max-w-md border-t-8 border-red-500">
          <Info className="mx-auto text-slate-300 mb-4" size={60} />
          <h2 className="text-2xl font-black text-slate-800 mb-2">{isAr ? 'لا يوجد مشروع مرتبط' : 'No Project Linked'}</h2>
          <p className="text-slate-500 mb-8 font-bold">{isAr ? 'يرجى التواصل مع الإدارة لربط مشروعك بهذا الحساب.' : 'Please contact administration to link your project.'}</p>
          <button onClick={onLogout} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
            {isAr ? 'تسجيل الخروج' : 'Log Out'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20" dir={isAr ? 'rtl' : 'ltr'}>
      {/* الهيدر */}
      <header className="bg-[#0a0f1c] text-white p-5 shadow-2xl sticky top-0 z-[100] border-b-2 border-[#e86024]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-[#e86024] p-2 rounded-xl text-white shadow-lg"><Building2 size={24} /></div>
             <h1 className="text-xl font-black tracking-tight">آفاق <span className="text-[#e86024]">للتطوير</span></h1>
          </div>
          <button onClick={onLogout} className="text-red-400 hover:text-white font-bold flex items-center gap-2 transition-all text-sm px-4 py-2 rounded-xl hover:bg-red-500/10">
            {isAr ? 'خروج' : 'Exit'} <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-slate-900 font-black text-2xl mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#e86024] rounded-full"></span>
          {isAr ? 'حالة المشروع الحالية' : 'Current Project Status'}
        </h2>
        
        {/* الكارت الرئيسي المطور */}
        <div 
          onClick={() => setShowDetails(true)}
          className="group relative bg-white rounded-[3rem] shadow-2xl border-2 border-slate-100 overflow-hidden cursor-pointer transition-all hover:border-[#e86024]/30 hover:-translate-y-2"
        >
          <div className="h-72 lg:h-96 bg-slate-200 relative overflow-hidden">
            {project.image_url ? (
              <img src={project.image_url} alt="Site" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                <Camera size={50} className="opacity-20 mb-4" />
                <p className="font-bold italic">{isAr ? 'سيتم رفع صور الموقع قريباً' : 'Photos coming soon'}</p>
              </div>
            )}
            <div className="absolute top-8 right-8 bg-[#e86024] text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-2xl backdrop-blur-sm border border-white/20">
               {project.status}
            </div>
          </div>

          <div className="p-10 lg:p-14">
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{project.project_name}</h3>
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-10">
              <MapPin size={20} className="text-[#e86024]" /> {project.location}
            </div>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-10 shadow-inner">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-slate-900 font-black text-lg">{isAr ? 'نسبة الإنجاز الكلية' : 'Overall Progress'}</span>
                  <span className="text-4xl font-black text-[#e86024]">{project.completion_rate}%</span>
               </div>
               <div className="w-full bg-slate-200 h-5 rounded-full overflow-hidden p-1 shadow-sm">
                  <div className="bg-gradient-to-l from-[#e86024] to-orange-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${project.completion_rate}%` }}></div>
               </div>
            </div>

            <div className="flex justify-center">
               <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-black flex items-center gap-4 hover:bg-[#e86024] transition-all shadow-xl hover:shadow-orange-500/40">
                  {isAr ? 'عرض كامل التفاصيل الميدانية' : 'View Full Field Report'} 
                  <ArrowRight size={22} className={isAr ? 'rotate-180' : ''} />
               </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- النافذة المنبثقة (Modal) مع Z-Index خارق --- */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="absolute inset-0 bg-[#0a0f1c]/98 backdrop-blur-xl" onClick={() => setShowDetails(false)}></div>
          
          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[3.5rem] shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-8 left-8 z-50 bg-slate-100 hover:bg-red-500 hover:text-white p-4 rounded-full transition-all text-slate-600 shadow-xl"
            >
              <X size={28} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="h-[40vh] lg:h-auto bg-slate-100">
                  {project.image_url ? (
                    <img src={project.image_url} alt="Detail" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">{isAr ? 'لا توجد صورة بعد' : 'No photo yet'}</div>
                  )}
               </div>

               <div className="p-10 lg:p-20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-[2px] bg-[#e86024]"></span>
                    <span className="text-[#e86024] font-black text-sm uppercase tracking-[0.2em]">{isAr ? 'تقرير المتابعة الفني' : 'Technical Report'}</span>
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{project.project_name}</h3>
                  <p className="text-slate-500 font-bold text-xl mb-12 border-b-2 border-slate-50 pb-8">{project.work_type}</p>

                  <div className="grid grid-cols-1 gap-5 mb-12">
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                      <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><MapPin size={28} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400 uppercase">{isAr ? 'موقع المشروع' : 'Location'}</p><p className="font-black text-slate-800 text-xl">{project.location}</p></div>
                    </div>
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                      <div className="bg-orange-50 p-4 rounded-2xl text-orange-600"><Calendar size={28} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400 uppercase">{isAr ? 'تاريخ التحديث' : 'Update Date'}</p><p className="font-black text-slate-800 text-xl" dir="ltr">{project.last_updated || '---'}</p></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project.workers_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'عامل ميداني' : 'Workers'}</p>
                    </div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project.techs_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'فني متخصص' : 'Techs'}</p>
                    </div>
                  </div>

                  {project.status === 'تم التسليم' && (
                    <div className="bg-green-50 p-8 rounded-[2rem] border-2 border-green-100 text-green-700 flex items-center gap-5 shadow-sm">
                      <CheckCircle size={40} className="flex-shrink-0" />
                      <div>
                        <p className="font-black text-xl">{isAr ? 'اكتمل المشروع' : 'Project Completed'}</p>
                        <p className="font-bold opacity-80">{isAr ? 'تم استلام الموقع نهائياً بجودة 100%' : 'Delivered with 100% quality'}</p>
                      </div>
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
