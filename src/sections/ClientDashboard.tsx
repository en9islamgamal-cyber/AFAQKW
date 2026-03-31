import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Calendar, Users, Wrench, CheckCircle, LogOut, Camera, X, ArrowRight } from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false); // حالة إظهار التفاصيل

  useEffect(() => {
    async function fetchClientProject() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('client_email', session.user.email)
          .single();
        
        if (!error) setProject(data);
      }
      setLoading(false);
    }
    fetchClientProject();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl" dir="rtl">
        ⏳ جاري تحميل بيانات مشروعك...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" dir="rtl">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md border border-slate-100">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-black text-slate-800 mb-4">عذراً، لا يوجد مشروع مرتبط</h2>
          <button onClick={onLogout} className="w-full bg-[#e86024] text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all">
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12" dir="rtl">
      {/* الهيدر */}
      <header className="bg-[#0a0f1c] text-white p-5 shadow-2xl border-b-4 border-[#e86024]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-[#e86024] p-2 rounded-lg"><Building2 size={24} /></div>
             <h1 className="text-xl font-black">بوابة <span className="text-[#e86024]">آفاق</span></h1>
          </div>
          <button onClick={onLogout} className="text-red-400 hover:text-white px-4 py-2 rounded-xl font-bold transition-all text-sm flex items-center gap-2">
            خروج <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {/* كارت المشروع القابل للضغط */}
        <div 
          onClick={() => setShowDetails(true)}
          className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-95"
        >
          <div className="h-64 bg-slate-200 relative">
            {project.image_url ? (
              <img src={project.image_url} alt="Site" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><Camera size={48} /></div>
            )}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg font-black text-slate-900 text-sm">
               {project.status}
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{project.project_name}</h2>
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-6">
              <MapPin size={18} className="text-[#e86024]" /> {project.location}
            </div>

            <div className="flex justify-between items-end mb-2">
               <span className="text-slate-400 font-bold text-sm">نسبة الإنجاز</span>
               <span className="text-2xl font-black text-[#e86024]">{project.completion_rate}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
               <div className="bg-[#e86024] h-full rounded-full transition-all duration-1000" style={{ width: `${project.completion_rate}%` }}></div>
            </div>

            <div className="mt-8 flex justify-center">
               <span className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2">
                  اضغط لعرض كامل التفاصيل <ArrowRight size={18} className="rotate-180" />
               </span>
            </div>
          </div>
        </div>
      </main>

      {/* --- النافذة المنبثقة (Project Details Modal) --- */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10">
          {/* الخلفية المظلمة */}
          <div className="absolute inset-0 bg-[#0a0f1c]/90 backdrop-blur-sm" onClick={() => setShowDetails(false)}></div>
          
          {/* محتوى النافذة */}
          <div className="relative bg-white w-full max-w-5xl max-h-full overflow-y-auto rounded-[3rem] shadow-2xl animate-in zoom-in duration-300">
            
            {/* زر الإغلاق */}
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-6 left-6 z-10 bg-slate-100 hover:bg-red-500 hover:text-white p-3 rounded-full transition-all text-slate-500"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
               {/* الصورة المكبرة */}
               <div className="h-80 lg:h-auto bg-slate-200">
                  {project.image_url ? (
                    <img src={project.image_url} alt="Detailed Site" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">لا توجد صورة حالياً</div>
                  )}
               </div>

               {/* تفاصيل المشروع بالكامل */}
               <div className="p-8 lg:p-16">
                  <div className="mb-10">
                    <h3 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{project.project_name}</h3>
                    <p className="text-[#e86024] font-black text-xl">{project.work_type}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-10">
                    <div className="flex items-center gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><MapPin size={28} /></div>
                      <div><p className="text-xs font-bold text-slate-400">موقع المشروع</p><p className="font-black text-slate-800 text-lg">{project.location}</p></div>
                    </div>
                    <div className="flex items-center gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Calendar size={28} /></div>
                      <div><p className="text-xs font-bold text-slate-400">تاريخ آخر تحديث ميداني</p><p className="font-black text-slate-800 text-lg" dir="ltr">{project.last_updated || '---'}</p></div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-8 rounded-[2rem] text-white mb-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold opacity-60">حالة الإنجاز الكلية</span>
                      <span className="text-4xl font-black text-[#e86024]">{project.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                       <div className="bg-[#e86024] h-full" style={{ width: `${project.completion_rate}%` }}></div>
                    </div>
                  </div>

                  {/* إحصائيات الميدان */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl text-center">
                      <Users size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-3xl font-black text-slate-900">{project.workers_count || 0}</p>
                      <p className="text-xs font-bold text-slate-400">عامل متواجد</p>
                    </div>
                    <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl text-center">
                      <Wrench size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-3xl font-black text-slate-900">{project.techs_count || 0}</p>
                      <p className="text-xs font-bold text-slate-400">فني متخصص</p>
                    </div>
                  </div>

                  {project.status === 'تم التسليم' && (
                    <div className="mt-8 bg-green-50 p-6 rounded-3xl border border-green-200 text-green-700 flex items-center gap-4">
                      <CheckCircle size={30} />
                      <p className="font-bold">تم تسليم المشروع نهائياً وفق أعلى المعايير الهندسية.</p>
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
