import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Uses admin privileges to check tokens securely
);

// PASTE YOUR RAW EXTERNAL TARGET PLAYLIST ENGINES HERE
const BASIC_M3U_PLAYLIST_URL = "https://iptv-org.github.io/iptv/index.category.m3u";
const PREMIUM_M3U_PLAYLIST_URL = "https://iptv-org.github.io/iptv/index.m3u";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response("#EXTM3U\n#INFO: Missing Authentication Token Request Parameters", { status: 400 });
    }

    // Look up user profile data based on their stream token key string
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    if (authError) throw authError;

    const matchedUser = users.find(u => u.user_metadata?.stream_token === token);

    if (!matchedUser) {
      return new Response("#EXTM3U\n#INFO: Unauthorized Protocol Token Footprint.", { status: 403 });
    }

    const currentStatus = matchedUser.user_metadata?.subscription_status;

    // --- EXECUTE DYNAMIC REDIRECTION LOGIC MATCHES ---
    if (currentStatus === 'Premium Active') {
      // Redirect Premium users to your elite extended master list
      return NextResponse.redirect(PREMIUM_M3U_PLAYLIST_URL);
    } 
    
    if (currentStatus === 'Basic Active') {
      // Redirect Basic users to your standard entry level list
      return NextResponse.redirect(BASIC_M3U_PLAYLIST_URL);
    }

    // Fallback if payment is unpaid or expired
    return new Response("#EXTM3U\n#INFO: Line Connection Suspended. Complete billing activation inside your dashboard console profile portal.", { status: 402 });

  } catch (err: any) {
    console.error('M3U Routing System Error:', err.message);
    return new Response(`#EXTM3U\n#INFO: Critical Internal Server Gateway Handshake Error.`, { status: 500 });
  }
}