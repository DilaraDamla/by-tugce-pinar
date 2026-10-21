import {readContent} from '@/lib/server';
import {publicContent} from '@/lib/content';
import {renderSite} from '@/lib/render-site';
import {BRAND} from '@/lib/brand';
export const dynamic='force-dynamic';
const customerOrigin='https://dilaradamla.github.io';
export async function GET(req:Request){const origin=req.headers.get('origin');if(origin&&origin!==customerOrigin&&origin!==BRAND.canonical)return new Response(null,{status:403});const live=await readContent();const content=publicContent(live.data);const canonical=origin===customerOrigin?'https://dilaradamla.github.io/by-tugce-pinar':BRAND.canonical;const html=renderSite(content,canonical).replaceAll('="/media/','="'+BRAND.canonical+'/media/');const safeContent=JSON.parse(JSON.stringify(content).replaceAll('"/media/','"'+BRAND.canonical+'/media/'));return Response.json({html,content:safeContent,brand:{name:content.settings.brand,canonical},revision:live.revision},{headers:{'Cache-Control':'no-store','Access-Control-Allow-Origin':customerOrigin,'Vary':'Origin','X-Content-Type-Options':'nosniff'}});}
