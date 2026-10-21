# BY TUĞÇE AKMAN — yönetim ve geri dönüş

`/admin` için native ChatGPT girişi ve sunucu `ADMIN_EMAILS` izin listesi gerekir. Gerçek işletme hesabı hazır olduğunda yalnız yetkili işletmeci tarafından bu listeye eklenir. Müşteri sitesi herkese açıktır; yönetim API'leri bağımsız olarak sunucuda yetki denetler. İstemciye gizli anahtar gönderilmez.

## Günlük kullanım

Yeni hizmet ekleyin/silin; hizmet metinlerini, fiyat/süre notlarını, kategorilerin ad/sıra/görünürlüğünü, fotoğrafları, Instagram röportajlarını, sayfa metinlerini ve iletişimi düzenleyin. En az bir hizmet etkin kalmalıdır. Profil portresi hizmet galerisinden ayrıdır.

1. İzinli fotoğrafı yükleyin; JPG/PNG/WebP, en fazla 8 MB. Kırpma oranı, yakınlık ve yatay/dikey konumu seçin; sunucu kırpılmış sonucu kaydeder. Tam kaynak R2’ye kaydedilmez.
2. Fotoğraf/video için izin ve taslak/yayında durumunu seçin.
3. Taslağı kaydedin. Bu işlem canlı siteyi değiştirmez.
4. Hazır olduğunda Yayınla düğmesini kullanın. Önceki yayın içerik geçmişine kaydedilir.
5. İki yönetici aynı taslağı değiştirirse eski revizyon reddedilir; yeni sürümü yükleyip değişiklikleri birleştirin.

Yüklenen dosya yayınlanan içerikte kullanılana kadar `/media` üzerinden açılamaz. Paneldeki önizleme yetki gerektirir. Yayından kaldırılan dosya doğrudan müşteriye sunulmaz. Eski kaynak ekran görüntüleri aktif statik dosyalardan çıkarılmıştır; geçmiş Git commit'lerinden silme ayrı bir çalışmadır.

## Veriler ve yedek

D1: yayımlanan içerik, ayrı taslak, revizyon, içerik geçmişi ve önceki talep arşivi. R2: yeni yüklemeler. Talep arşivi korunmuştur. Müşteri WhatsApp formu sunucuya kayıt yapmaz; WhatsApp mesajlarını otomatik içe aktarmaz.

Genel bakıştan JSON yedeği indirin. Önceki içerik sürümünü geri almak onu taslağa yükler; kontrol edip ayrıca yayınlayın. Uygulama kodu değişikliği için önceki kaydedilmiş Sites sürümü yeniden yayınlanabilir. Kaynak dosya ve yayın sürümünü birlikte eşleştirin. Yeni migration'lar eklemelidir; müşteri tablolarını düşürmeyin. D1/R2 verilerinin işletimsel yedeği, içerik JSON yedeğinden ayrıdır; veri kurtarmadan önce platform yedeğini alın.

## Yayın

Sites kaynak yardımcısı kesin kaynak durumunu commit/push eder ve build arşivini üretir. PUBLIC site için `save_site_version` ardından `deploy_site_version` kullanın. Yeni alan adı kimlik doğrulama atlatması olarak kullanılmaz. GitHub Pages, herkese açık yayın içeriğini `live-site.js` ile aynı D1 kaynağından alır; yönetim Sites adresinde kalır. API yalnız yayımlanmış içerik döndürür, yazma yetkisi vermez. GitHub origin izni yalnız `https://dilaradamla.github.io` içindir. Bağlantı kesilirse son statik yayın görünümü açık bir güncellik notuyla gösterilir. JavaScript kapalı okuyucular statik yayın anını görür.

KVKK bilgilendirmesi, veri sorumlusu bilgileri, saklama süreleri, üçüncü taraf WhatsApp/Instagram/Google Fonts aktarımı ve gerekli izinler işletme/hukuk danışmanı tarafından değerlendirilmelidir. Otomatik hukuki uygunluk garantisi verilmez.

SSS ve sayfa içerikleri “Sayfalar ve SSS”, SEO/OG alanları “SEO ve paylaşım”, ayrı telefon/WhatsApp/e-posta/adres/il/ilçe/harita/saat alanları “İşletme ayarları” bölümündedir. Boş iletişim alanları müşteride gizlenir. Hizmet silerken fotoğraflar diğer hizmete taşınır; fotoğraf dosyası ve geçmiş kayıtlar korunur.
