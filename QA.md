# Validation — 18 October 2026, revised personal brand

## Brief uygulaması — yeni doğrulama

- Marka: görünen içerik, başlık, açıklama ve WhatsApp taslağı By Tuğçe Pınar olarak düzeltildi. Mevcut Site adresi korundu.
- 320, 390, 768, 1024 ve 1440px: tarayıcıda document genişliği viewport'u aşmadı; bozuk görsel sayısı sıfır. 390px üst bölüm görsel olarak incelendi. Fiziksel cihaz/klavye testi yapılmadı.
- Cilt bakımı seçimi, ikinci adım özeti, isteğe bağlı ad/not ve adımlar arası veri koruma test edildi.
- Geçmiş tarih ile gönderim denemesi engellendi; tarih alanına bağlı Türkçe hata görüldü. Bu test WhatsApp açmadı ve mesaj göndermedi.
- Mevcut danışan / devam seansı mesajı, tarih tercihi ve konum isteğinde tarih gizleme test edildi.
- Mesaj kopyalama başarı bildirimi ve mobil menüde Çalışmalar bağlantısından sonra kapanma doğrulandı. Test edilen akışlarda tarayıcı hata günlüğü boştu.
- `python validate.py`: 46 referans, 6 etiketli kontrol, benzersiz ID, tek H1, görsel alt metinleri ve JSON-LD kontrolü geçti.
- `node --check dist/app.js` geçti. Build/typecheck komutu yok: proje statik ve TypeScript kullanmıyor. Eski otomatik test altyapısı bulunmuyor; validate.py eklendi.
- Gerçek WhatsApp gönderimi, harici uygulama dönüşü, engellenmiş pencere, Clipboard API reddi, tüm klavye/ekran okuyucu senaryoları, Safari, Lighthouse/Core Web Vitals ve tam kontrast/WCAG denetimi yapılmadı. Tam üretime hazır veya WCAG uyumlu olduğu iddia edilmiyor.
- Gerçek takvim, API, veri saklama, yönetici kimlik doğrulaması ve bildirimler hâlâ yok. Mimari ve işletme onayı gereken bilgiler IMPLEMENTATION-PLAN.md içinde.

- Layout measured at 320, 390, 768, 1024 and 1440px: no document horizontal overflow. Mobile hero visually inspected at 390px.
- All four service tabs tested: panel, numbering, ARIA state and service-specific booking update.
- New and returning client message previews tested, including continuation, rescheduling and location inquiry.
- Location request hides/disables date and time controls.
- Mobile menu closes on selecting Works; URL target becomes #calismalar.
- Three portfolio images loaded and visually inspected; contain preserves grids and watermarks.
- JavaScript syntax check passed; browser error log empty during tested flows.
- WhatsApp final send not performed. No business was contacted or reservation made.
- Instagram profile publicly verified; individual posts may require login.
- Audience remains owner-private. Exact address, hours, services and prices need owner confirmation.
- Physical-device testing, complete WCAG review and Lighthouse audit not performed.

## Studio navigation revision

Replaced editorial landing with fixed navy sidebar, compact appointment workspace, numbered guidance and dark portfolio archive. A single inline inquiry form remains the primary entry point.

## Management panel verification — 19 October 2026

- TypeScript check passed.
- Six validation checks passed: retained content, executable title markup rejection, external image rejection, Instagram domain validation, explicit inquiry consent, status allowlist.
- Local integration passed: anonymous admin access blocked, cross-origin writes blocked, content persistence and visitor page propagation, stale revision conflict, spoofed upload rejection, request retry deduplication, status update and deletion.
- Mobile browser: native local sign-in, six service editors, image library, save confirmation, visitor service content, gallery and nine video slides, explicit inquiry fields verified.
- Local test data remains separate from production. Production starts with the retained website content and no synthetic requests.
