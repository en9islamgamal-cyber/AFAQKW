import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddProject() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState('قيد التنفيذ');
  const [workers, setWorkers] = useState(0);
  const [techs, setTechs] = useState(0);
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage('⏳ جاري الحفظ ورفع البيانات...');

    let publicImageUrl = '';

    // 1. منطق رفع الصورة (لو موجودة)
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images') // تأكد من إنشاء Bucket بهذا الاسم في Supabase
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        publicImageUrl = publicUrlData.publicUrl;
      }
    }

    // 2. حفظ البيانات في الجدول
    const { error } = await supabase
      .from('projects')
      .insert([{ 
        project_name: name, 
        location: location, 
        completion_rate: rate, 
        status: status,
        workers_count: status === 'قيد التنفيذ' ? workers : 0,
        techs_count: status === 'قيد التنفيذ' ? techs : 0,
        last_updated: updateDate,
        image_url: publicImageUrl
      }]);

    setUploading(false);
    if (error) {
      setMessage('❌ حدث خطأ: ' + error.message);
    } else {
      setMessage('✅ تم تحديث المشروع بنجاح!');
      // تصفير الخانات
      setName(''); setLocation(''); setRate(0); setImageFile(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans text-right" dir="rtl">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-blue-100 pb-4">
        <span className="text-4xl">🏗️</span>
        <div>
          <h2 className="text-2xl font-black text-blue-900">تحديث بيانات الموقع</h2>
          <p className="text-slate-500 text-sm italic">أضف آخر التطورات لعملائك</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-8">
        
        {/* القسم الأول: معلومات أساسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-bold mb-2">اسم المشروع</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none transition-all bg-white" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">الموقع</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none bg-white" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2">تاريخ التحديث</label>
            <input type="date" value={updateDate} onChange={(e) => setUpdateDate(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none bg-white font-mono" />
          </div>
        </div>

        {/* القسم الثاني: نسبة الإنجاز (Slider) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <label className="text-slate-700 font-bold">نسبة الإنجاز الفعلية</label>
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-black text-lg">{rate}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={rate} 
            onChange={(e) => setRate(parseInt(e.target.value))}
            className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 font-bold">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* القسم الثالث: الحالة والعمالة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className={status === 'قيد التنفيذ' ? 'md:col-span-1' : 'md:col-span-3'}>
            <label className="block text-slate-700 font-bold mb-2">حالة العمل</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none bg-slate-50 cursor-pointer font-bold">
              <option>قيد التنفيذ</option>
              <option>مرحلة التصميم</option>
              <option>تم التسليم</option>
            </select>
          </div>

          {status === 'قيد التنفيذ' && (
            <>
              <div className="animate-in slide-in-from-right-4 duration-300">
                <label className="block text-slate-700 font-bold mb-2 text-sm">عدد العمال 👷</label>
                <input type="number" value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} className="w-full border-2 border-orange-200 p-3 rounded-xl focus:border-orange-500 outline-none" />
              </div>
              <div className="animate-in slide-in-from-right-8 duration-300">
                <label className="block text-slate-700 font-bold mb-2 text-sm">عدد الفنيين 👨‍🔧</label>
                <input type="number" value={techs} onChange={(e) => setTechs(parseInt(e.target.value))} className="w-full border-2 border-blue-200 p-3 rounded-xl focus:border-blue-500 outline-none" />
              </div>
            </>
          )}
        </div>

        {/* القسم الرابع: رفع صور الموقع */}
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 text-center">
          <label className="block text-slate-700 font-bold mb-4">صور من أرض الواقع 📸</label>
          <input 
            type="file" accept="image/*" 
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="hidden" id="file-upload" 
          />
          <label htmlFor="file-upload" className="cursor-pointer bg-white border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all inline-block">
            {imageFile ? `📸 تم اختيار: ${imageFile.name}` : 'اضغط لرفع صورة من الموقع'}
          </label>
          <p className="text-xs text-slate-400 mt-2">يفضل صور بصيغة JPG أو PNG لا تتعدى 5 ميجا</p>
        </div>

        {/* زر الحفظ */}
        <button 
          type="submit" disabled={uploading}
          className={`w-full py-4 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${uploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-900 text-white'}`}
        >
          {uploading ? 'جاري الرفع...' : '🚀 تحديث بيانات المشروع'}
        </button>
      </form>

      {message && (
        <div className="mt-8 p-4 rounded-xl text-center font-bold bg-blue-900 text-white animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
}
