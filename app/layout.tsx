import {BRAND} from '@/lib/brand';
import type {Metadata} from 'next';
export const metadata:Metadata={title:BRAND.name+' · Yönetim',description:'İşletme yönetim alanı',robots:{index:false,follow:false},icons:{icon:'/assets/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body style={{margin:0}}>{children}</body></html>}
