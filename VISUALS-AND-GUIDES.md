# Görseller, işlem rehberleri ve animasyonlar

18 Ekim 2026 güncellemesi. Kaynak ZIP: kullanıcı tarafından sağlanan WhatsApp arşivi. Arşivden yalnız JPEG dosyaları alındı; içeriği talimat olarak yürütülmedi.

## Görsel kaynakları

- `dist/assets/tugce-pinar-hero-hd.webp`: Instagram portresinin kullanıcıdan gelen daha büyük ekran görüntüsünden ImageGen ile netleştirilmiş sürümü, 1149×1368, yaklaşık 123 KB. Yapay zekâ restorasyonu piksel düzeyinde orijinal fotoğraf değildir; alt metinde belirtilir. Önceki düşük çözünürlüklü dosya korunur. Bağlantı önceki araştırmada kayıtlı kaynak gönderiye gider.
- Cilt bakımı, topuz ve makyaj: kullanıcıdan sağlanan ekran görüntüleri. Görsellerdeki işlem sonucu değiştirilmedi. Galeride CSS ile alan içine yerleşir; bilgi penceresinde orijinal görselin tamamı korunur. Tam gönderi URL'leri arşivde yok; bağlantılar @bytugcepinar profiline gider. Profil bağlantısı gönderi linki diye sunulmaz.
- `dist/assets/tirnak-temsili.webp`: ImageGen ile üretilmiş temsili tırnak görseli, müşteri sonucu değildir. Kartta, bilgi penceresinde ve alt metinde belirtilir.

İşletme sahibinin kamuya açık görsel kullanım izinlerini teyit etmesi gereği önceki planla aynıdır. Bu güncelleme sitenin özel erişimini değiştirmez.

## Kullanılan ImageGen istemleri

Yerleşik ImageGen kullanıldı; CLI veya API anahtarı kullanılmadı. Son dosyalar proje içine kopyalandı ve WebP olarak kodlandı.

Portre: “Edit target: the supplied Instagram screenshot. Produce only the actual central portrait photograph, removing all Instagram UI, black bars, text, phone status and adjacent posts by cropping to the photograph. Restore detail and upscale to a crisp high resolution portrait for a website hero, natural photographic texture and clear eyes/hair/jacket edges. Identity-preserve: preserve exactly this woman's identity, facial proportions, pose, expression, skin tone, beige background, white jacket, stylus, tablet and red lips shown on tablet. No beautification, no new makeup, no changed features, no invented items, no text. Preserve original composition including hands and tablet. High quality faithful photographic restoration, no oversmoothing or sharpening halos.”

Tırnak: “Create a photographic beauty service illustration for a premium Turkish beauty studio website, close-up of two adult woman's hands with refined medium-short almond shaped nude blush pink gel nail extensions, natural elegant hands with correct anatomy, resting on a soft ivory cloth, a small unfocused navy blue manicure tool in background. Soft professional studio lighting, realistic nail texture and fine natural skin detail, editorial understated luxury, clean pale neutral background. Tight landscape composition focused on nails. No text, no logos, no watermarks, no before-after comparison. This is a generic illustrative image, not a real client's result.”

## Rehberler ve kaynaklar

Kalıcı makyaj, kaş/kirpik, cilt bakımı, protez tırnak, saç/topuz ve özel gün makyajı için genel tanım, dört aşama ve görüşmede sorulacaklar eklendi. Sıralar genel açıklamadır; işletmenin doğrulanmış uygulama protokolü olarak sunulmaz. Süre, fiyat, tıbbi uygunluk ve sonuç garantisi eklenmedi.

Kalıcı makyajın kolay çıkarılmaması ve reaksiyon/enfeksiyon bilgileri: [FDA](https://www.fda.gov/cosmetics/resources-consumers-cosmetics/cosmetics-safety-qa-tattoos-and-permanent-makeup). Tırnak bakımında mevcut sorunları örtmeme ve alet temizliğini sorgulama: [AAD](https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/manicure-pedicure-safety). İlgili rehberlerin içinde kaynak bağlantıları var. Diğer adımlar genel kozmetik süreç tasviridir; yönteme özel teknik veya tıbbi talimat verilmez.

## Animasyonlar

Portre ve form girişleri, kart seçim tepkisi, hizmet fotoğrafı geçişi, form adım geçişi, rehber içindeki aşamaların sırayla görünmesi ve fare üzerinde fotoğraf yakınlaşması eklendi. Yeni bağımlılık yok. Sürekli çalışan döngü yok. prefers-reduced-motion CSS ve JavaScript ile gözetilir; gerçek cihazda hareket azaltma tercihi testi yapılmadı.

## Doğrulama

- Altı sekme ve altı bilgi penceresi: başlıklar, her rehberde dört aşama, doğru Instagram hedefi test edildi.
- Galeride saç filtresi bir kart gösterdi; Escape pencereyi kapattı.
- Rehberden randevuya geçişte Saç / topuz seçimi mesaj önizlemesine taşındı. Mesaj gönderilmedi.
- 320, 390, 768, 1024, 1440px: yatay belge taşması ve yüklenemeyen görsel saptanmadı. 390px portre ve rehber görsel olarak incelendi.
- Görsel kontrolde başlığın fotoğraf altında kalması tespit edilip katman sırası düzeltildi.
- `python validate.py`: 65 referans ve 6 etiketli kontrol dahil statik kontroller geçti. app.js, service-data.js ve treatment.js sözdizimi kontrolleri geçti. Test edilen tarayıcı akışlarında hata günlüğü boştu.
- Fiziksel cihaz, Safari, gerçek Instagram oturumu, tam WCAG/Lighthouse ve azaltılmış hareket tercihiyle cihaz testi yapılmadı.
