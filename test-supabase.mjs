import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogdvlbpjnegodosorysb.supabase.co';
const supabaseKey = 'sb_publishable_0uhXXthCYAFwOsOmLlC2Qg_x9GXxAQ5';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log("Testing Supabase connection...");
  
  const { data, error, count } = await supabase
    .from('dishes')
    .select('id, name', { count: 'exact' });
    
  if (error) {
    console.error("Supabase Error:", error.message);
  } else {
    console.log(`Success! Found ${count} dishes in the database.`);
    if (count > 0) {
      console.log("Sample:", data.slice(0, 3));
    }
  }
}

testSupabase();
