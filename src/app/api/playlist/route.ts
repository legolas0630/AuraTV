import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a highly privileged admin client to check user metadata securely on the server side
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    // 1. Grab the unique token from the TV app's requested URL string
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response('Missing access token.', { status: 400 });
    }

    // 2. Scan Supabase Auth users to find who matches this specific stream token
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      console.error('Supabase Auth Scan Error:', error);
      return new Response('Database internal error.', { status: 500 });
    }

    const matchedUser = users.find(u => u.user_metadata?.stream_token === token);

    // 3. PRO IPTV UX: If user doesn't exist or trial has expired, return a fake M3U channel that displays a clean error on their TV screen!
    if (!matchedUser || matchedUser.user_metadata?.subscription_status === 'expired') {
      const errorM3u = `#EXTM3U\n#EXTINF:-1 tvg-id="error" tvg-name="AuraTV Account Notice" group-title="System Messages",⚠️ AuraTV Line Inactive or Trial Expired\nhttp://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
      return new Response(errorM3u, {
        headers: { 'Content-Type': 'application/x-mpegurl' },
      });
    }

    // 4. THE LIVE PRODUCT: Compile a premium, clean list of working Free-to-Air global broadcasts
    let m3uFile = `#EXTM3U\n\n`;

    // --- CATEGORY: GLOBAL NEWS ---
    m3uFile += `#EXTINF:-1 tvg-id="BBCWorldNews.uk" tvg-name="BBC World News" tvg-logo="https://i.imgur.com/vRzO7v9.png" group-title="Global News",BBC World News (UK)\n`;
    m3uFile += `https://vs-hls-push-uk-live.akamaized.net/x=4/i=bbc_world_news_hd.m3u8\n\n`;

    m3uFile += `#EXTINF:-1 tvg-id="SkyNews.uk" tvg-name="Sky News" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/e/e3/Sky_News_logo_2024.svg" group-title="Global News",Sky News Live (UK)\n`;
    m3uFile += `https://skynews-skynewshd-live.akamaized.net/hls/live/2042730/skynewshd/master.m3u8\n\n`;

    m3uFile += `#EXTINF:-1 tvg-id="ABCNews.us" tvg-name="ABC News Live" tvg-logo="https://i.imgur.com/XG1u6hO.png" group-title="Global News",ABC News Live (USA)\n`;
    m3uFile += `https://content.uplynk.com/channel/3324f246e5a143f7abedb075bda8b16c.m3u8\n\n`;

    m3uFile += `#EXTINF:-1 tvg-id="DWEnglish.de" tvg-name="DW English" tvg-logo="https://i.imgur.com/u0fV3gC.png" group-title="Global News",Deutsche Welle (Germany)\n`;
    m3uFile += `https://dwamdstream102.akamaized.net/hls/live/2015530/dwamdstream102/index.m3u8\n\n`;

    // --- CATEGORY: ENTERTAINMENT & LIFESTYLE ---
    m3uFile += `#EXTINF:-1 tvg-id="RedBullTV.at" tvg-name="Red Bull TV" tvg-logo="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_TV_logo.svg/1200px-Red_Bull_TV_logo.svg.png" group-title="Entertainment",Red Bull TV (Global)\n`;
    m3uFile += `https://rbmn-live.akamaized.net/hls/live/590964/global/master.m3u8\n\n`;

    m3uFile += `#EXTINF:-1 tvg-id="NASA.us" tvg-name="NASA TV" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" group-title="Documentaries",NASA Live HD (USA)\n`;
    m3uFile += `https://ntvpublic-live.akamaized.net/hls/live/2007033/ntvpublic/master.m3u8\n\n`;

    // --- CATEGORY: CLASSIC VIDEO ON DEMAND (BONUS MOVIE!) ---
    m3uFile += `#EXTINF:-1 tvg-id="night_living_dead_1968" tvg-name="Night of the Living Dead" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/03/Night_of_the_Living_Dead_poster.jpg" group-title="VOD - Horror Classics",Night of the Living Dead (1968)\n`;
    m3uFile += `https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4\n\n`;

    // 5. Stream the raw compiled playlist text directly back to the TV application layout
    return new Response(m3uFile, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-mpegurl',
        'Cache-Control': 'no-store, max-age=0, must-revalidate', // Guarantees instant roster changes on refresh
      },
    });

  } catch (err) {
    console.error('Playlist compilation crash:', err);
    return new Response('Fatal server compilation error.', { status: 500 });
  }
}