import {BRAND} from '@/lib/brand';
export function GET(){return new Response(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${BRAND.canonical}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain'}});}
