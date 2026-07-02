import { createClient } from '@supabase/supabase-js';
import { logColor } from '@/util/log-color';

const supabaseUrl = process.env.SUPABASE_URL! as string;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY! as string;

if (!supabaseUrl || !supabaseSecretKey) {
  logColor('Não foi possível conectar ao bucket');
}

export const supabaseAdmin = createClient(supabaseUrl!, supabaseSecretKey!);
