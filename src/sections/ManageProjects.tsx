import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutGrid, ClipboardCheck, Users, Wrench, Calendar, Camera, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState('قيد التنفيذ');
  const [workers, setWorkers] = useState(0);
  const [techs, setTechs] = useState(0);
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSelect = (proj: any) => {
    setSelectedProject(proj);
    setRate(proj.completion_rate || 0);
    setStatus(proj.status || 'قيد التنفيذ');
    setWorkers(proj.workers_count || 0);
    setTechs(proj.techs_count || 0);
    setUpdateDate(proj.last_updated || new Date().toISOString().split('T')[0]);
    setImageFile(null);
    setMessage('');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    setLoading(true);
    setMessage('⏳ جاري حفظ التغييرات...');

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
          last_updated: updateDate,
          image_url: publicImageUrl
        })
        .eq('id', selectedProject.id);

      if (error) throw error;
      
      setMessage('✅ تم تحديث بيانات المشروع بنجاح!');
      fetchProjects();
    } catch (err: any) {
      setMessage('❌ فشل التحديث: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  // كلاسات موحدة للحقول لضمان وضوح الخط وقوة التصميم الفاتح
  const inputStyles = "w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-[#FF6A00] focus:ring-4 focus:ring-[#FF6A00]/5 bg-gray-50 text-[#0F172A] font-black transition-all placeholder-gray-300 shadow-sm";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-arabic" dir="rtl">
      
      {/* القائمة اليمنى: اختيار المشروع */}
      <div className="lg:col-span-1 bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 h-fit max-h-[85vh] overflow-y-auto">
        <h3 className="font-black text-xl text-[#0F172A] mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
           <LayoutGrid className="text-[#FF6A00]" size={24} />
           المشاريع الحالية
        </h3>
        <div className="space-y-4">
          {projects.map(proj => (
            <button 
              key={proj.id} 
              onClick={() => handleSelect(proj)}
              className={`w-full text-right p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-2 ${selectedProject?.id === proj.id ? 'border-[#FF6A00] bg-[#FF6A00]/5 shadow-md scale-[1.02]' : 'border-gray-50 hover:border-gray-200 bg-gray-50/30'}`}
            >
              <h4 className="font-black text-[#0F172A] text-lg leading-tight">{proj.client_name || proj.project_name}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">📍 {proj.location}</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-black text-[#FF6A00] shadow-sm border border-[#FF6A00]/10">{proj.completion_rate}%</span>
              </div>
            </button>
          ))}
          {projects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 font-bold">لا توجد مشاريع مسجلة</p>
            </div>
          )}
        </div>
      </div>

      {/* منطقة التعديل */}
      <div className="lg:col-span-2">
        {!selectedProject ? (
          <div className="bg-white h-[60vh] rounded-[2.5rem] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center p-10 text-gray-400 font-black text-xl text-center shadow-inner">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">👈</div>
            اختر مشروعاً من القائمة الجانبية<br/>للبدء في تحديث بياناته
          </div>
        ) : (
          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
               <h2 className="text-2xl lg:text-3xl font-black text-[#0F172A]">
                 تحديث: <span className="text-[#FF6A00]">{selectedProject.client_name || selectedProject.project_name}</span>
               </h2>
               <div className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-black text-gray-500 uppercase tracking-widest">Project ID: {selectedProject.id.slice(0, 5)}</div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
              
              {/* السلايدر - نسبة الإنجاز */}
              <div className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 shadow-inner">
                <div className="flex justify-between items-center mb-8">
                  <label className="text-[#0F172A] font-black text-xl flex items-center gap-2">
                    <ClipboardCheck className="text-[#FF6A00]" />
                    نسبة الإنجاز الكلية
                  </label>
                  <span className="bg-[#0F172A] text-white px-6 py-2 rounded-2xl font-black text-2xl shadow-lg shadow-gray-300">{rate}%</span>
                </div>
                <div className="relative pt-1 px-2" dir="ltr">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={rate} 
                    onChange={(e) => setRate(parseInt(e.target.value))} 
                    className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#FF6A00]" 
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-6 font-black px-1">
                    <span>0% (البداية)</span>
                    <span>50%</span>
                    <span>100% (تم التسليم)</span>
                  </div>
                </div>
              </div>

              {/* الحالة وتاريخ التحديث */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-black text-[#0F172A] mb-1 mr-1">حالة المشروع الحالي</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputStyles}>
                    <option value="قيد التنفيذ">🚧 قيد التنفيذ</option>
                    <option value="مرحلة التصميم">📐 مرحلة التصميم</option>
                    <option value="تم التسليم">✅ تم التسليم بنجاح</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-black text-[#0F172A] mb-1 mr-1">
                    <Calendar size={16} className="text-[#FF6A00]" />
                    تاريخ آخر تحديث
                  </label>
                  <input type="date" value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} className={inputStyles} />
                </div>
              </div>

              {/* العمالة - تظهر فقط لو قيد التنفيذ */}
              {status === 'قيد التنفيذ' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FF6A00]/5 p-8 rounded-[2rem] border border-[#FF6A00]/10">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-[#0F172A] mb-1 mr-1">
                       <Users size={18} className="text-[#FF6A00]" />
                       عدد العمال بالموقع
                    </label>
                    <input type="number" min="0" value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} className={inputStyles} />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-[#0F172A] mb-1 mr-1">
                       <Wrench size={18} className="text-[#FF6A00]" />
                       عدد الفنيين والمهندسين
                    </label>
                    <input type="number" min="0" value={techs} onChange={(e) => setTechs(parseInt(e.target.value))} className={inputStyles} />
                  </div>
                </div>
              )}

              {/* رفع الصور */}
              <div className="p-8 rounded-[2rem] border-4 border-dashed border-gray-100 text-center hover:border-[#FF6A00]/30 transition-all bg-gray-50 group">
                <label className="block text-[#0F172A] font-black mb-4">تحديث صورة الموقع الميدانية 📸</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer bg-white border-2 border-gray-200 text-[#0F172A] px-10 py-4 rounded-2xl font-black hover:border-[#FF6A00] hover:text-[#FF6A00] transition-all inline-flex items-center gap-3 shadow-sm">
                  {imageFile ? (
                    <><CheckCircle2 className="text-green-500" /> تم اختيار الصورة</>
                  ) : (
                    <><Camera className="text-[#FF6A00]" /> اختيار صورة من الجهاز</>
                  )}
                </label>
                {imageFile && <p className="mt-3 text-xs font-bold text-gray-400">{imageFile.name}</p>}
              </div>

              {/* زر الحفظ */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`w-full py-6 rounded-[1.5rem] font-black text-2xl transition-all shadow-xl flex items-center justify-center gap-4 active:scale-[0.98] ${loading ? 'bg-gray-300' : 'bg-[#FF6A00] hover:bg-orange-600 text-white shadow-[#FF6A00]/20'}`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={28} />
                  ) : (
                    <>💾 حفظ وإرسال الإشعار للعميل</>
                  )}
                </button>
              </div>
              
              {message && (
                 <div className={`p-5 mt-6 text-center font-black rounded-2xl border-2 animate-in zoom-in duration-300 flex items-center justify-center gap-3 ${message.includes('✅') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.includes('✅') ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    {message}
                 </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
