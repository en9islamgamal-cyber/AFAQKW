import { createClient } from '@supabase/supabase-js';

// رابط مشروعك في Supabase
const supabaseUrl = 'https://havhdhrqoyjexyzwsetk.supabase.co';

// مفتاح الربط الخاص بك
const supabaseKey = 'sb_publishable_eGXU8YTQPQ4BdHQRsnBHxA_ILwX-6qB';

export const supabase = createClient(supabaseUrl, supabaseKey);
