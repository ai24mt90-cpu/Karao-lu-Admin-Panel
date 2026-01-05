# Netlify Deployment Guide - Admin Panel

## Netlify'da Deployment Adımları

### 1. Netlify'a Giriş Yapın
- https://app.netlify.com adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Yeni Site Ekleyin
- "Add new site" → "Import an existing project" seçin
- GitHub repository'nizi seçin
- `admin-panel` klasörünü seçin

### 3. Build Ayarları
Netlify otomatik olarak `netlify.toml` dosyasını algılayacak, ancak manuel olarak kontrol edin:

```
Build command: npm run build
Publish directory: out
```

### 4. Environment Variables Ekleyin
Site Settings → Environment Variables bölümünden şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Deploy Edin
- "Deploy site" butonuna tıklayın
- Build tamamlanana kadar bekleyin (yaklaşık 2-3 dakika)

### 6. Custom Domain (Opsiyonel)
- Site settings → Domain management
- Custom domain ekleyebilirsiniz

## 404 Hatası Çözümü

### Neden 404 Hatası Alıyordunuz?
- Next.js client-side routing kullanıyor
- Netlify, `/projeler` gibi bir URL'e direkt gittiğinizde sunucuda bu dosyayı arıyordu
- Ancak bu bir SPA (Single Page Application), tüm routing client-side

### Çözüm
`netlify.toml` dosyasındaki redirect kuralı:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Bu kural, tüm istekleri `index.html`'e yönlendiriyor ve Next.js routing'in devreye girmesini sağlıyor.

## Test Checklist

Deployment sonrası test edin:

- [ ] Ana sayfa açılıyor mu? (Dashboard)
- [ ] Login sayfası çalışıyor mu?
- [ ] Direkt `/projeler` URL'ine gittiğinizde 404 almıyor musunuz?
- [ ] Sayfayı yenilediğinizde (F5) 404 almıyor musunuz?
- [ ] Supabase authentication çalışıyor mu?
- [ ] Tüm admin sayfaları (Projeler, Yönetim Kurulu, SSS, vb.) açılıyor mu?
- [ ] Modal'lar açılıyor mu?
- [ ] Resim yükleme çalışıyor mu?

## Sorun Giderme

### Build Hatası Alırsanız
1. Netlify build logs'u kontrol edin
2. Yerel build'in başarılı olduğundan emin olun: `npm run build`
3. Environment variables'ın doğru girildiğinden emin olun

### 404 Hala Devam Ediyorsa
1. `netlify.toml` dosyasının root dizinde olduğundan emin olun
2. Netlify'da "Deploys" → "Trigger deploy" → "Clear cache and deploy" deneyin
3. Build settings'de publish directory'nin `out` olduğundan emin olun

### Supabase Bağlantı Hatası
1. Environment variables'ı kontrol edin
2. Supabase URL ve Anon Key'in doğru olduğundan emin olun
3. Supabase dashboard'da "Authentication" → "URL Configuration" bölümünde Netlify domain'inizi ekleyin

## Notlar

- Her commit'te otomatik deploy olacak
- Preview deployments branch'ler için otomatik oluşturulacak
- Production URL: `https://your-site-name.netlify.app`
- Build süresi: ~2-3 dakika
