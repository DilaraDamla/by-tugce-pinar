# Tırnak yakın görünümü ve röportaj slayt düzeni

## Son durum: Instagram oturumu erişilebilir oldu

Kullanıcı oturumunu açtıktan sonra profil yeniden yüklendi ve girişli görünüm doğrulandı. Üç gerçek röportaj klibi, gönderi ve video görüntüsü incelenerek eklendi:

- Eski kaş uygulamaları üzerine: https://www.instagram.com/bytugcepinar/reel/DUOSIQliNaA/ — kullanıcının sağladığı ekran görüntüsündeki aynı röportaj.
- Cilt bakımı üzerine sohbet: https://www.instagram.com/bytugcepinar/reel/DUVMR_diLBU/
- Yüzde ilk dikkati çeken nedir?: https://www.instagram.com/bytugcepinar/reel/DYRiAFtIQt5/

Bu güncelleme aşağıdaki önceki “URL listesi boş / oturum bekleniyor” durumunu geçersiz kılar. Videoların tamamı indirilmedi; resmi Instagram oynatıcıları tıklamayla yüklenir. Her kartta video görüntüsünden alınmış gerçek kapak ve kaynak gönderi bağlantısı vardır. Slaytlar otomatik ilerlemez; oklar, klavye ve mobil kaydırma desteklenir. İzleyicinin Instagram/çerez ayarına bağlı erişim koşulları devam eder.

Tarayıcıda üç slayt ve 1/3 → 2/3 → 3/3 sayaçları doğrulandı. İkinci kartın iframe'i yüklendi, Instagram'ın Oynat kontrolü görüldü ve tıklandı. Gerçek medya boyunca sesli izleme testi yapılmadı. Sonraki slayta geçince eski iframe sayısı sıfıra düştü; son kartta ileri düğmesi kapandı. Kaynaklar doğrudan gönderilere gidiyor. Klinik iddialar site metnine tavsiye olarak aktarılmadı.

Tırnak fotoğrafının telefon arayüzü/boşlukları ImageGen ile kaldırılıp netleştirilmiş sürümü `dist/assets/tirnak-net.webp` içine kaydedildi (1021×1540, yaklaşık 193 KB). Orijinal dosya korunur. Randevu kartı ve hizmet fotoğrafı tırnaklara yakın odaklanır; galeri dikey formatta büyük gösterir. Fotoğrafı büyüt düğmesi native dialog açar. İşlenmiş sürüm olduğu ve orijinal ekran görüntüsü bağlantısı büyük pencerede belirtilir.

Yerleşik ImageGen istemi: “Precise photo restoration and cropping, edit the supplied screenshot, NOT a new nail design. Remove only phone status bar at top and black empty outer screen margins at bottom; crop to actual photograph. Preserve the original French manicure photo exactly including all fingers, nail shapes, length, skin tone, pale pink/white polish, the circular before inset in bottom right and the complete TUĞÇE AKMAN Güzellik Merkezi watermark. Do not redesign nails, do not alter results, do not remove watermark, do not add text. Mild faithful deblurring and higher-resolution photographic clarity, clear original edges and natural texture, no retouching or changed anatomy. Output a tight portrait of the original full photo, ready for a website gallery, with no phone UI or black borders.”

Video-qa.js için kaydırılabilir slayt düzeni, önceki/sonraki düğmeleri, sayı göstergesi, klavye okları ve CSS scroll-snap eklendi. Slayt değiştiğinde önceki iframe kaldırılır; görünmeyen videonun sesi sürmez. Otomatik oynatma yok. URL listesi henüz boş: bu özellik gerçek kliplerle etkinleşmiş veya oynatımı doğrulanmış değildir. Mevcut profil bağlantılı bölüm görünür kalır.

Kullanıcı Instagram'a giriş yaptığını söyledi. Erişilebilir tarayıcı envanterinde sadece Codex IAB ve MCP Apps vardı; IAB'de açılan profil hâlâ “Giriş Yap / Kaydol” gösterdi. Oturumun hangi tarayıcıda olduğu asenkron soruldu; erişilebilir Instagram sekmesi görünür bırakıldı. Başka tarayıcı oturumuna veya gizli API'lere erişim denenmedi. Video URL'leri uydurulmadı.

Doğrulama: 320/390/768/1440px belge taşması yok, bozuk görsel sayısı sıfır; büyük fotoğraf penceresi açma/kapatma ve yeni dosya kaynağı test edildi. Test edilen tarayıcı hata günlüğü boştu. `python validate.py` 74 referans ve etiket kontrolleri için geçti. `node --check dist/video-qa.js` geçti. Slayt kontrolleri gerçek videolarla ve fiziksel dokunmatik cihazda henüz test edilemedi.
