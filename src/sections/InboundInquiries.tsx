import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, Clock, MessageSquare, Loader2, RefreshCcw } from 'lucide-react';

export default function InboundInquiries() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setRequests(data);
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  if (loading) return (
    <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#FF6A00]" size={32} /></div>
  );

  return (
    <div className="mt-10" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-[#0F172A]">📩 طلبات التسعير الواردة</h3>
        <button onClick={fetchRequests} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <RefreshCcw size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between mb-4">
              <h4 className="font-black text-lg text-[#0F172A]">{req.full_name}</h4>
              <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-lg uppercase">{req.status}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-bold"><Mail size={14} className="text-[#FF6A00]"/> {req.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-bold"><Phone size={14} className="text-[#FF6A00]"/> {req.phone}</div>
              <div className="flex items-center gap-2 text-[10px] text-gray-300"><Clock size={12}/> {new Date(req.created_at).toLocaleString('ar-KW')}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed relative">
              <MessageSquare size={14} className="absolute top-2 left-2 opacity-10" />
              {req.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
