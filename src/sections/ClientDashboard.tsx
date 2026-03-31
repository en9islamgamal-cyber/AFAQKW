import React, { useEffect, useState } from 'react';
// التصحيح: نخرج خطوة لبره عشان نوصل لفولدر lib
import { supabase } from '../lib/supabase'; 
import { Building2, MapPin, Calendar, Users, Wrench, CheckCircle, LogOut, X, ArrowRight, Camera } from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          const { data } = await supabase
            .from('projects')
            .select('*')
            .eq('client_email', session.user.email)
            .maybeSingle();
          if (data) setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl">
      ⏳ {isAr ? 'جاري تحميل بياناتك...' : 'Loading your data...'}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir={isAr ? 'rtl' : 'ltr'}>
      {/* الهيدر */}
      <header className="bg-[#0a0f1c] p-5 shadow-2xl border-b-2 border-[#e86024] flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="bg-[#e86024] p-2 rounded-lg text-white shadow-lg"><Building2 size={24} /></div>
          <h1 className="text-xl font-black">آفاق للتطوير</h1>
        </div>
        <button onClick={onLogout} className="text-red-400 font-bold flex items-center gap-2 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all">
          {isAr ? 'خروج' : 'Logout'} <LogOut size={18} />
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {/* الكارت الرئيسي */}
        <div 
          onClick={() => setShowDetails(true)} 
          className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-slate-100 overflow-hidden cursor-pointer transition-all hover:-translate-y-2 active:scale-95"
        >
          <div className="h-64 lg:h-80 bg-slate-200 relative">
            {project?.image_url ? (
              <img src={project.image_url} alt="Site" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 italic">
                <Camera size={50} className="opacity-20 mb-4" />
                {isAr ? 'بانتظار تحديث الصور' : 'Waiting for site photos'}
              </div>
            )}
            <div className="absolute top-6 right-6 bg-[#e86024] text-white px-5 py-2 rounded-2xl font-black text-xs shadow-lg">
               {project?.status || 'قيد المعالجة'}
            </div>
          </div>

          <div className="p-10">
            <h3 className="text-3xl font-black text-slate-900 mb-4">{project?.project_name || (isAr ? 'مشروع جديد' : 'New Project')}</h3>
            <div className="flex items-center gap-2 text-slate-600 font-bold mb-8">
              <MapPin size={20} className="text-[#e86024]" /> {project?.location || (isAr ? 'لم يحدد بعد' : 'Not specified')}
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 shadow-inner">
              <div className="flex justify-between items-end mb-4">
                <span className="font-black text-slate-800">{isAr ? 'نسبة الإنجاز الفعلية' : 'Progress Rate'}</span>
                <span className="text-3xl font-black text-[#e86024]">{project?.completion_rate || 0}%</span>
              </div>
              <div className="w-full bg-slate-200 h-5 rounded-full p-1 overflow-hidden shadow-sm">
                <div 
                  className="bg-gradient-to-l from-[#e86024] to-orange-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(232,96,36,0.5)]" 
                  style={{ width: `${project?.completion_rate || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center">
               <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black flex items-center gap-3 hover:bg-[#e86024] transition-all shadow-xl hover:shadow-orange-500/30">
                  {isAr ? 'عرض التفاصيل الكاملة للموقع' : 'View Full Details'} 
                  <ArrowRight size={20} className={isAr ? 'rotate-180' : ''} />
               </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- النافذة المنبثقة (Modal) --- */}
      {showDetails && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 lg:p-10">
          <div className="absolute inset-0 bg-[#0a0f1c]/95 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
          
          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[3.5rem] shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowDetails(false)} 
              className="absolute top-8 left-8 z-50 bg-slate-100 hover:bg-red-500 hover:text-white p-4 rounded-full transition-all text-slate-600 shadow-xl"
            >
              <X size={28} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
               {/* قسم الصورة المكبرة */}
               <div className="h-[40vh] lg:h-auto bg-slate-100">
                  {project?.image_url ? (
                    <img src={project.image_url} alt="Detailed Site" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">لا توجد صورة حالياً</div>
                  )}
               </div>

               {/* قسم البيانات التفصيلية */}
               <div className="p-10 lg:p-20 text-slate-950">
                  <span className="text-[#e86024] font-black text-sm mb-2 block uppercase tracking-widest">{isAr ? 'تقرير ميداني مفصل' : 'Detailed Field Report'}</span>
                  <h3 className="text-4xl font-black mb-4 leading-tight">{project?.project_name}</h3>
                  <p className="text-slate-600 font-bold text-xl mb-12 border-b-2 border-slate-50 pb-8">{project?.work_type}</p>

                  <div className="grid grid-cols-1 gap-6 mb-12">
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                      <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm"><MapPin size={32} /></div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{isAr ? 'موقع المشروع' : 'Location'}</p>
                        <p className="font-black text-slate-900 text-2xl">{project?.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                      <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 shadow-sm"><Calendar size={32} /></div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{isAr ? 'آخر تحديث للبيانات' : 'Last Update'}</p>
                        <p className="font-black text-slate-900 text-2xl" dir="ltr">{project?.last_updated || '---'}</p>
                      </div>
                    </div>
                  </div>

                  {/* إحصائيات القوى العاملة */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-8 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl transform transition-hover hover:scale-105 border border-white/5">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project?.workers_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'عامل ميداني' : 'Workers'}</p>
                    </div>
                    <div className="p-8 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl transform transition-hover hover:scale-105 border border-white/5">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project?.techs_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'فني متخصص' : 'Technicians'}</p>
                    </div>
                  </div>

                  {project?.status === 'تم التسليم' && (
                    <div className="bg-green-50 p-8 rounded-[2.5rem] border-2 border-green-100 text-green-700 flex items-center gap-6 shadow-sm">
                      <CheckCircle size={48} className="text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-black text-2xl mb-1">تم الانتهاء من المشروع</p>
                        <p className="font-bold opacity-80 text-sm">تم استلام كافة الأعمال وتسليمها للعميل بنجاح.</p>
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
