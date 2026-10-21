import {env} from 'cloudflare:workers';
import {admin,bytes,json,writeAllowed} from '@/lib/server';
import {cropPng} from '@/lib/crop-image';
export const dynamic='force-dynamic';
export async function POST(req:Request){if(!await admin()||!writeAllowed(req))return json({error:'Yetkiniz yok.'},403);try{const raw=req.headers.get('x-image-crop');if(!raw||raw.length>200)return json({error:'Önce kırpma alanını belirleyin.'},400);const result=cropPng(await bytes(req,8000000),JSON.parse(raw));if(!env.BUCKET)throw Error('Depolama hazır değil.');const key='crop-'+crypto.randomUUID()+'.png';await env.BUCKET.put(key,result.data,{httpMetadata:{contentType:'image/png'},customMetadata:{cropVersion:'1',width:String(result.width),height:String(result.height)}});return json({url:'/media/'+key,width:result.width,height:result.height});}catch(e){return json({error:e instanceof Error?e.message:'Görsel hazırlanamadı.'},400);}}
