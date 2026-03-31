import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // حالات التحديث
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState('');
  const [workers, setWorkers] = useState(0);
  const [techs, setTechs] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // جلب المشاريع من قاعدة البيانات
  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // عند اختيار مشروع للتعديل
  const handleSelect = (proj: any) => {
    setSelectedProject(proj);
    setRate(proj.completion_rate || 0);
    setStatus(proj.status || 'قيد التنفيذ');
    setWorkers(proj.workers_count || 0);
    setTechs(proj.techs_count || 0);
    setImageFile(null);
    setMessage('');
  };

  // حفظ التحديثات
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    setLoading(true);
    setMessage('⏳ جاري التحديث...');

    let publicImageUrl = selectedProject.image_url;

    try {
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('project-images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
        publicImageUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from('projects')
        .update({
          completion_rate: rate,
          status: status,
          workers_count: status === 'قيد التنفيذ' ? workers : 0,
          techs_count: status === 'قيد التنفيذ' ? techs : 0,
          image_url: publicImageUrl,
          last_updated: new Date().toISOString().split('T')[0]
        })
        .eq('id', selectedProject.id);

      if (error) throw error;
      
      setMessage('✅ تم تحديث المشروع بنجاح!');
      fetchProjects(); // تحديث القائمة
    } catch (err: any) {
      setMessage('❌ خطأ: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir="rtl">
      
      {/* قائمة المشاريع لاختيار واحد منها */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit max-h-[80vh] overflow-y-auto">
        <h3 className="font-black text-xl text-blue-950 mb-4">المشاريع الجارية</h3>
        <div className="space-y-3">
          {projects.map(proj => (
            <button 
              key={proj.id} 
              onClick={() => handleSelect(proj)}
              className={`w-full text-right p-4 rounded-xl border-2 transition-all ${selectedProject?.id === proj.id ? 'border-[#e86024] bg-orange-50' : 'border-slate-100 hover:border-blue-300'}`}
            >
              <h4 className="font-bold text-slate-800">{proj.client_name || proj.project_name}</h4>
              <div className="flex justify-between mt-2 text-sm text-slate-500">
                <span>{proj.location}</span>
                <span className="font-bold text-[#e86024]">{proj.completion_rate}%</span>
              </div>
            </button>
          ))}
          {projects.length === 0 && <p className="text-slate-400 text-center">لا توجد مشاريع حالياً</p>}
        </div>
      </div>

      {/* شاشة التحديث (تظهر فقط عند اختيار مشروع) */}
      <div className="lg:col-span-2">
        {!selectedProject ? (
          <div className="bg-slate-50 h-full rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-10 text-slate-400 font-bold text-xl">
            👈 اختر مشروعاً من القائمة لتحديث بياناته
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black text-[#e86024] mb-6 border-b pb-4">
              تحديث بيانات: {selectedProject.client_name}
            </h2>

            <form onSubmit={handleUpdate} className="space-y-8">
              {/* السلايدر */}
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-blue-50">
                <div className="flex justify-between items-center mb-6">
                  <label className="text-blue-900 font-black text-lg">نسبة الإنجاز الفعلية</label>
                  <span className="bg-[#e86024] text-white px-5 py-2 rounded-full font-black text-xl">{rate}%</span>
                </div>
                <div className="relative pt-1 px-2">
                  <input type="range" min="0" max="100" value={rate} onChange={(e) => setRate(parseInt(e.target.value))} style={{ direction: 'rtl' }} className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#e86024]" />
                  <div className="flex justify-between text-sm text-slate-500 mt-4 font-bold px-1" dir="ltr">
                    <span>0%</span><span>50%</span><span>100%</span>
                  </div>
                </div>
              </div>

              {/* العمالة والحالة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={status === 'قيد التنفيذ' ? 'md:col-span-1' : 'md:col-span-3'}>
                  <label className="block text-slate-700 font-bold mb-2">حالة المشروع</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#e86024] outline-none">
                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                    <option value="مرحلة التصميم">مرحلة التصميم</option>
                    <option value="تم التسليم">تم التسليم</option>
                  </select>
                </div>
                {status === 'قيد التنفيذ' && (
                  <>
                    <div>
                      <label className="block text-slate-700 font-bold mb-2">عدد العمال 👷</label>
                      <input type="number" value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#e86024] outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-2">عدد الفنيين 👨‍🔧</label>
                      <input type="number" value={techs} onChange={(e) => setTechs(parseInt(e.target.value))} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#e86024] outline-none" />
                    </div>
                  </>
                )}
              </div>

              {/* الصور */}
              <div className="p-6 rounded-2xl border-4 border-dashed border-slate-200 text-center hover:border-blue-300 transition-all">
                <label className="block text-slate-700 font-black mb-4">تحديث صورة الموقع 📸</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer bg-blue-950 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all inline-block">
                  {imageFile ? `✅ تم اختيار: ${imageFile.name}` : 'إرفاق صورة جديدة'}
                </label>
              </div>

              <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-black text-xl transition-all ${loading ? 'bg-slate-400' : 'bg-[#e86024] hover:bg-[#c04b19] text-white'}`}>
                {loading ? 'جاري الحفظ...' : '💾 حفظ التحديثات وإشعار العميل'}
              </button>
              
              {message && <div className="p-4 mt-4 text-center font-bold bg-green-50 text-green-700 rounded-xl">{message}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
