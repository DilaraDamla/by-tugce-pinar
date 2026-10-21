# BY TUĞÇE AKMAN

Müşteri sitesi: https://by-tugce-akman.dilaradamla222.chatgpt.site/
Yönetim: aynı alan adında `/admin`. GitHub Pages müşteri arayüzünü sunar; `live-site.js`, aynı D1 yayınını `/api/public/site` üzerinden alır. Backend ve yönetim ayrı güvenli sunucudadır.

Altı kategoride düzenlenebilir hizmetler, izinli çalışma portfolyosu, dokuz Instagram röportajı ve WhatsApp mesaj taslağı üzerinden randevu talebi. Kesin randevu işletme onayıyla oluşur. WhatsApp talepleri otomatik olarak veritabanına aktarılmaz.

## Yönetim

Yerel/native ChatGPT kimliği ve sunucudaki `ADMIN_EMAILS` izin listesi gerekir. Örnek e-posta veya paylaşılan şifre yoktur. Taslağı kaydetmek yayını değiştirmez; ayrı Yayınla düğmesi kullanılır. İçerik geçmişi ve JSON yedeği vardır. Görseller yalnız yayınlanmış içerikte referans verildiğinde müşteriye açılır.

## Geliştirme ve doğrulama

Node >=22.13. Sites kurulum/derleme yardımcılarını kullanın. Gizli değerleri yerel `.dev.vars` veya sunucu ortamında tutun; Git'e eklemeyin. Yeni şemalar `npm run db:generate` ile üretilir. Önizleme öncesi bekleyen SQL migration dosyalarını yerel D1'e uygulayın. Üretim yayınında Sites migration yönetimini kullanın.

- `node node_modules/eslint/bin/eslint.js .`
- `node node_modules/typescript/bin/tsc --noEmit`
- `node tests/validation.mjs`
- `node tests/integration.mjs` (yalnız yerel önizleme, port 5173, yerel yetkili test kimliği)
- `node scripts/run-framework.mjs build`

Ayrıntılar: [ADMIN.md](ADMIN.md), [FINAL-2026-10-21.md](FINAL-2026-10-21.md). Müşteri kayıtları, çalışma zamanı anahtarları ve kaynak ekran görüntüsü yedekleri bu depoya eklenmez.

Yeni fotoğraf yüklemeleri panelde kırpma önizlemesinden geçer. Sunucu yalnız seçilen alanı PNG olarak yeniden kodlar ve R2’ye kaydeder; kaynak dosyayı saklamaz. Mevcut statik fotoğraf/kapaklar fiziksel kırpılmış WebP türevleridir. Her yerde aynı kırpılmış dosya kullanılır.
