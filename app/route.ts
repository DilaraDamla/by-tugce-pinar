import {renderSite} from '@/lib/render-site';
import {readContent} from '@/lib/server';
export const dynamic='force-dynamic';
export async function GET(){return new Response(renderSite((await readContent()).data),{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()'}});}
