import {admin,json,readContent,readDraft} from '@/lib/server';
export const dynamic='force-dynamic';
export async function GET(){if(!await admin())return json({error:'Yetkiniz yok.'},403);return new Response(JSON.stringify({exportedAt:new Date().toISOString(),published:await readContent(),draft:await readDraft()},null,2),{headers:{'Content-Type':'application/json','Content-Disposition':'attachment; filename="studio-content-backup.json"','Cache-Control':'no-store'}});}
