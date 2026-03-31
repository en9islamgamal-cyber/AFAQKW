import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase'; // تم تعديل المسار ليعمل من فولدر src مباشرة
import { Building2, MapPin, Calendar, Users, Wrench, CheckCircle, LogOut, X, ArrowRight, Camera } from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useEffect(() => {
    async function fetchProject() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data } = await supabase.from('projects').select('*').eq('client_email', session.user.email).maybeSingle();
        if (data) setProject(data);
      }
      setLoading(false);
    }
    fetchProject();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold">⏳ جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="bg-[#0a0f1c] p-5 shadow-2xl border-b-2 border-[#e86024] flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="bg-[#e86024] p-2 rounded-lg"><Building2 size={24} /></div>
          <h1 className="text-xl font-black">آفاق للتطوير</h1>
        </div>
        <button onClick={onLogout} className="text-red-400 font-bold flex items-center gap-2">خروج <LogOut size={18} /></button>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div onClick={() => setShowDetails(true)} className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-slate-100 overflow-hidden cursor-pointer transition-all hover:-translate-y-2">
          <div className="h-64 bg-slate-200 relative">
            {project?.image_url ? <img src={project.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">بانتظار تحديث الصور</div>}
            <div className="absolute top-6 right-6 bg-[#e86024] text-white px-4 py-2 rounded-xl font-black text-xs shadow-lg">{project?.status}</div>
          </div>
          <div className="p-10 text-slate-900">
            <h3 className="text-3xl font-black mb-4">{project?.project_name || 'مشروع جديد'}</h3>
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-8"><MapPin size={20} className="text-[#e86024]" /> {project?.location}</div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="font-black text-slate-800">نسبة الإنجاز</span>
                <span className="text-3xl font-black text-[#e86024]">{project?.completion_rate}%</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full p-1"><div className="bg-[#e86024] h-full rounded-full transition-all duration-1000" style={{ width: `${project?.completion_rate}%` }}></div></div>
            </div>
            <div className="flex justify-center"><button className="bg-slate-900 text-white px-10 py-4 rounded-full font-black flex items-center gap-3">عرض التفاصيل الكاملة <ArrowRight size={20} className={isAr ? 'rotate-180' : ''} /></button></div>
          </div>
        </div>
      </main>

      {showDetails && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10">
          <div className="absolute inset-0 bg-[#0a0f1c]/95 backdrop-blur-md" onClick={() => setShowDetails(false)}></div>
          <div className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in text-slate-900">
            <button onClick={() => setShowDetails(false)} className="absolute top-6 left-6 z-50 bg-slate-100 p-4 rounded-full text-slate-600"><X size={24} /></button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-80 lg:h-auto bg-slate-100">{project?.image_url && <img src={project.image_url} className="w-full h-full object-cover" />}</div>
              <div className="p-10 lg:p-16">
                <h3 className="text-4xl font-black mb-2">{project?.project_name}</h3>
                <p className="text-slate-500 font-bold mb-10 border-b-2 pb-6">{project?.work_type}</p>
                <div className="grid grid-cols-1 gap-4 mb-10">
                  <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm"><MapPin size={24} /></div>
                    <div><p className="text-[11px] font-bold text-slate-400">الموقع</p><p className="font-black text-slate-800 text-lg">{project?.location}</p></div>
                  </div>
                  <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 shadow-sm"><Calendar size={24} /></div>
                    <div><p className="text-[11px] font-bold text-slate-400">آخر تحديث</p><p className="font-black text-slate-800 text-lg" dir="ltr">{project?.last_updated || '---'}</p></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-900 rounded-[2rem] text-center text-white">
                    <p className="text-4xl font-black text-[#e86024] mb-1">{project?.workers_count || 0}</p>
                    <p className="text-[10px] font-bold opacity-60">عامل ميداني</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-[2rem] text-center text-white">
                    <p className="text-4xl font-black text-[#e86024] mb-1">{project?.techs_count || 0}</p>
                    <p className="text-[10px] font-bold opacity-60">فني متخصص</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
