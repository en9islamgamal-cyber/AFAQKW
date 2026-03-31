import React, { useEffect, useState } from 'react';
// تعديل المسار ليكون متوافق مع وجود الملف داخل فولدر src مباشرة
import { supabase } from './lib/supabase'; 
import { 
  Building2, MapPin, Calendar, Users, Wrench, 
  CheckCircle, LogOut, Camera, X, ArrowRight, Info 
} from 'lucide-react';

export default function ClientDashboard({ onLogout }: { onLogout: () => void }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const isAr = (localStorage.getItem('lang') || 'EN') === 'AR';

  useEffect(() => {
    async function fetchClientProject() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email) {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('client_email', session.user.email);
          
          if (!error && data && data.length > 0) {
            setProject(data[0]);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchClientProject();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0a0f1c] text-[#e86024] font-bold text-xl">
      ⏳ {isAr ? 'جاري التحميل...' : 'Loading...'}
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-center" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md border-t-8 border-red-500">
        <Info className="mx-auto text-slate-300 mb-4" size={60} />
        <h2 className="text-2xl font-black text-slate-800 mb-2">{isAr ? 'لا يوجد مشروع مرتبط' : 'No Project'}</h2>
        <button onClick={onLogout} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold mt-6">{isAr ? 'خروج' : 'Logout'}</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="bg-[#0a0f1c] text-white p-5 shadow-2xl sticky top-0 z-[100] border-b-2 border-[#e86024]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-[#e86024] p-2 rounded-xl text-white shadow-lg"><Building2 size={24} /></div>
             <h1 className="text-xl font-black tracking-tight text-white">آفاق <span className="text-[#e86024]">للتطوير</span></h1>
          </div>
          <button onClick={onLogout} className="text-red-400 hover:text-white font-bold flex items-center gap-2 transition-all text-sm">
            {isAr ? 'خروج' : 'Exit'} <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div 
          onClick={() => setShowDetails(true)}
          className="group relative bg-white rounded-[3rem] shadow-2xl border-2 border-slate-100 overflow-hidden cursor-pointer transition-all hover:-translate-y-2"
        >
          <div className="h-72 lg:h-96 bg-slate-200 relative overflow-hidden">
            {project.image_url ? (
              <img src={project.image_url} alt="Site" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 italic">
                <Camera size={50} className="opacity-20 mb-4" />
                {isAr ? 'بانتظار تحديث الصور' : 'Waiting for photos'}
              </div>
            )}
            <div className="absolute top-8 right-8 bg-[#e86024] text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-2xl">
               {project.status}
            </div>
          </div>

          <div className="p-10 lg:p-14">
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{project.project_name}</h3>
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-10">
              <MapPin size={20} className="text-[#e86024]" /> {project.location}
            </div>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-10">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-slate-900 font-black text-lg">{isAr ? 'نسبة الإنجاز' : 'Progress'}</span>
                  <span className="text-4xl font-black text-[#e86024]">{project.completion_rate}%</span>
               </div>
               <div className="w-full bg-slate-200 h-5 rounded-full overflow-hidden p-1">
                  <div className="bg-gradient-to-l from-[#e86024] to-orange-400 h-full rounded-full transition-all duration-1000" style={{ width: `${project.completion_rate}%` }}></div>
               </div>
            </div>

            <div className="flex justify-center">
               <button className="bg-slate-900 text-white px-12 py-5 rounded-full font-black flex items-center gap-4 hover:bg-[#e86024] transition-all">
                  {isAr ? 'عرض كامل التفاصيل' : 'View Full Details'} 
                  <ArrowRight size={22} className={isAr ? 'rotate-180' : ''} />
               </button>
            </div>
          </div>
        </div>
      </main>

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="absolute inset-0 bg-[#0a0f1c]/98 backdrop-blur-xl" onClick={() => setShowDetails(false)}></div>
          <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[3.5rem] shadow-2xl border border-white/20">
            <button onClick={() => setShowDetails(false)} className="absolute top-8 left-8 z-50 bg-slate-100 p-4 rounded-full text-slate-600 shadow-xl"><X size={28} /></button>
            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="h-[40vh] lg:h-auto bg-slate-100">
                  {project.image_url ? <img src={project.image_url} alt="Detail" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">No Photo</div>}
               </div>
               <div className="p-10 lg:p-20">
                  <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{project.project_name}</h3>
                  <p className="text-slate-500 font-bold text-xl mb-12 border-b-2 border-slate-50 pb-8">{project.work_type}</p>
                  <div className="grid grid-cols-1 gap-5 mb-12 text-slate-900">
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><MapPin size={28} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400">LOCATION</p><p className="font-black text-xl">{project.location}</p></div>
                    </div>
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="bg-orange-50 p-4 rounded-2xl text-orange-600"><Calendar size={28} /></div>
                      <div><p className="text-[11px] font-bold text-slate-400">LAST UPDATE</p><p className="font-black text-xl" dir="ltr">{project.last_updated || '---'}</p></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project.workers_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'عامل' : 'Workers'}</p>
                    </div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">
                      <p className="text-5xl font-black text-[#e86024] mb-2">{project.techs_count || 0}</p>
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{isAr ? 'فني' : 'Techs'}</p>
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
