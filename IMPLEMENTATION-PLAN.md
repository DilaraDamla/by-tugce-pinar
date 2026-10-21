# By Tuğçe Pınar — inceleme ve uygulama planı

## Mevcut durum ve öncelikler

Statik HTML, studio.css ve app.js; derleme, TypeScript, paket yöneticisi, sunucu API'si, kimlik doğrulama ve veritabanı yok. Lenis, Motion ve Lucide yerel dosyalardan yükleniyor. Eski styles.css aktif sayfada kullanılmıyor; bu aşamada geçmiş tasarım kaynağı olarak korunuyor.

P1: Görünen marka adı brief ile uyuşmuyor. Randevu CTA'ları seçilmiş uygulama ve danışan bilgilerini sıfırlıyor. Form yalnız tarayıcı doğrulamasına dayanıyor; geçmiş tarih için açıklayıcı hata yok. WhatsApp geçişi gönderim veya kesin rezervasyon değildir.

P2: Mobil görünümde 5–10px metinler okunabilirliği düşürüyor. Tarih, saat ve mesaj özeti için erişilebilir açıklamalar güçlendirilmeli. Gereksiz iletişim alanları eklenmemeli: WhatsApp üzerinden görüşüldüğünden telefon tekrar istenmeyecek.

P3: Güncel adres, saatler, ücretler, hizmet kapsamı, fotoğraf kullanım izinleri ve iptal şartları işletme tarafından doğrulanmalı. Mevcut görsel dosyaları ve kaynak bağlantıları korunacak. Sahte yorum, takvim ve yönetici paneli eklenmeyecek.

## Yönetim sistemi: uygulanmadan önce önerilen mimari

Mevcut statik siteye sunucu API'si ve ilişkisel veritabanı eklenmesi gerekir. Sağlayıcı seçimi ve işletme politikası onayından sonra uygulanmalıdır. Şu an bu altyapı kurulmuş değildir.

- services: id, name, active, duration_minutes, price_minor, currency, updated_at. Doğrulanmayan süre/fiyat NULL.
- customers: id, display_name, phone_encrypted, created_at. İletişim verileri yalnız yetkili personel erişiminde.
- requests: id, customer_id, service_id, client_type, preferred_start, timezone, note, status, idempotency_key UNIQUE, created_at, updated_at. Durum: pending, confirmed, cancelled, completed.
- appointments: id, request_id UNIQUE, service_id, starts_at, ends_at, staff_id. Onaylanan aktif aralıklar için veritabanı düzeyinde çakışma engeli; sunucuda transaction ile onay.
- business_hours ve closures: haftalık saatler, yerel saat dilimi Europe/Istanbul, istisna günleri.
- staff_users ve audit_events: rol, kullanıcı, işlem zamanı, hedef kayıt; hassas notlar loga yazılmaz.

Yönetici girişi güvenilir kimlik sağlayıcısı ve MFA ile; HttpOnly/Secure/SameSite oturum çerezi; rol kontrolü her API işleminde. Anonim istemci müşteri veya talep listesi okuyamaz. Herkese açık hizmet API'si müşteri bilgisi içermez. Oluşturma uç noktasında şema doğrulama, oran sınırı ve idempotency anahtarı; onay/iptalde yetki, CSRF ve çakışma kontrolü gerekir. API veya DB anahtarı tarayıcıya aktarılmaz.

Önce bekleyen talepler ve onay/iptal; sonra çalışma saatleri ve takvim; en son müşteri geçmişi ve içerik düzenleme. Bildirim ancak kayıt transaction'ı tamamlandıktan sonra kuyrukla iletilir; aynı bildirim tekrar gönderilmez. Randevu talebi yanıtı açıkça pending döner; onay ayrı işlem olur.

## Yayına hazırlık için işletmeden gerekenler

Güncel ad/adres/saat/hizmet/ücret ve iptal koşulları, müşteri görsel izinleri, veri sorumlusu ve saklama süreleri. KVKK aydınlatması ve varsa ayrı açık rıza gereksinimleri hukuk uzmanıyla belirlenmeli; mevcut açıklama hukuki metin yerine geçmez. Pazarlama izni randevu talebine bağlanmaz. Analitik/çerez eklenirse amaç ve rıza gereksinimi ayrıca değerlendirilir. Sağlık verisi serbest metinle toplanmaz.
