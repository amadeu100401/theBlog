import { createClient } from '@supabase/supabase-js';
import { logColor } from '@/util/log-color';

const supabaseUrl = process.env.SUPABASE_URL! as string;
const supabasePublichedKey = process.env.SUPABASE_PUBLISHABLE_KEY! as string;

if (!supabaseUrl || !supabasePublichedKey) {
  logColor('Não foi possível conectar ao bucket');
}

export const supabasePublicClient = createClient(
  supabaseUrl,
  supabasePublichedKey,
);
