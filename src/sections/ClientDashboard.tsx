import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Calendar, Users, Wrench, CheckCircle, LogOut, Camera } from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          <p className="text-slate-500 mb-8 font-bold">يرجى التواصل مع الإدارة لتفعيل حسابك.</p>
          <button onClick={onLogout} className="w-full bg-[#e86024] text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all">
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12" dir="rtl">
      {/* الهيدر العلوي */}
      <header className="bg-[#0a0f1c] text-white p-5 shadow-2xl border-b-4 border-[#e86024]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-[#e86024] p-2 rounded-lg"><Building2 size={24} /></div>
             <div>
                <h1 className="text-xl font-black">آفاق <span className="text-[#e86024]">للتطوير</span></h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Client Portal</p>
             </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 px-4 py-2 rounded-xl font-bold transition-all border border-red-500/20 text-sm">
            تسجيل خروج <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* كارت المشروع الرئيسي */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* قسم الصورة (علي اليمين في العربي) */}
          <div className="lg:w-1/2 h-80 lg:h-auto bg-slate-200 relative">
            {project.image_url ? (
              <img src={project.image_url} alt="Site Progress" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                <Camera size={64} className="mb-4 opacity-20" />
                <p className="font-bold text-lg italic">سيتم تحديث صور الموقع قريباً</p>
              </div>
            )}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
               <span className={`w-3 h-3 rounded-full ${project.status === 'تم التسليم' ? 'bg-green-500' : 'bg-[#e86024] animate-pulse'}`}></span>
               <span className="font-black text-slate-900 text-sm">{project.status}</span>
            </div>
          </div>

          {/* قسم البيانات */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="mb-8">
              <span className="text-[#e86024] font-black text-sm mb-2 block uppercase tracking-widest">تفاصيل المشروع الحالي</span>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                {project.project_name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
               <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><MapPin size={22} /></div>
                  <div><p className="text-[11px] font-bold text-slate-400">الموقع</p><p className="font-black text-slate-800">{project.location}</p></div>
               </div>
               <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Calendar size={22} /></div>
                  <div><p className="text-[11px] font-bold text-slate-400">آخر تحديث</p><p className="font-black text-slate-800" dir="ltr">{project.last_updated || '---'}</p></div>
               </div>
            </div>

            {/* شريط الإنجاز */}
            <div className="mb-10 bg-slate-900 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
               <div className="relative z-10 flex justify-between items-end mb-4">
                  <span className="text-white/70 font-bold text-sm">معدل الإنجاز الفعلي</span>
                  <span className="text-5xl font-black text-[#e86024]">{project.completion_rate}%</span>
               </div>
               <div className="relative z-10 w-full bg-white/10 h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-l from-[#e86024] to-orange-400 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${project.completion_rate}%` }}
                  ></div>
               </div>
               {/* شعار الشركة خلفية خفيفة */}
               <Building2 className="absolute -left-10 -bottom-10 text-white/5 w-48 h-48" />
            </div>

            {/* إحصائيات الميدان */}
            <div className="grid grid-cols-2 gap-6">
               <div className="text-center p-6 bg-white border-2 border-slate-100 rounded-3xl">
                  <Users className="mx-auto mb-3 text-slate-300" size={32} />
                  <p className="text-3xl font-black text-slate-900">{project.workers_count || 0}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">عمال الموقع</p>
               </div>
               <div className="text-center p-6 bg-white border-2 border-slate-100 rounded-3xl">
                  <Wrench className="mx-auto mb-3 text-slate-300" size={32} />
                  <p className="text-3xl font-black text-slate-900">{project.techs_count || 0}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase mt-1">طاقم الفنيين</p>
               </div>
            </div>

            {/* رسالة النجاح في حالة التسليم */}
            {project.status === 'تم التسليم' && (
              <div className="mt-8 bg-green-50 p-6 rounded-2xl border border-green-200 flex items-center gap-4 text-green-800">
                <CheckCircle size={32} className="text-green-500" />
                <p className="font-bold">تهانينا! تم اكتمال كافة بنود المشروع وتسليمه نهائياً.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
