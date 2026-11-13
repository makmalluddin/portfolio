# PRD — Dashboard Konten Portfolio (Local Dev)

**Proyek:** `cp-port/portofolio`
**Stack saat ini:** React 19 + Vite 8 + Tailwind CSS v4 + React Router 6
**Status:** Draft rencana (belum diimplementasikan)
**Tanggal:** 30 Oktober 2026
**Target URL dashboard:** `http://localhost:5173/input/dashboard` (hanya mode development)

---

## 1. Ringkasan

Saat ini seluruh konten website di-hardcode di `src/data/*.jsx`, dan gambar disimpan di `src/assets/`. Untuk mengubah konten, pemilik harus mengedit file JavaScript secara manual.

Rencana ini mengusulkan **dashboard lokal sederhana** yang:

1. Menampilkan daftar seluruh konten yang saat ini ada di `src/data`.
2. Memungkinkan tambah / ubah / hapus / urutkan konten tersebut lewat form.
3. Memungkinkan upload dan pemilihan gambar di `src/assets`.
4. Menyimpan perubahan langsung ke file proyek (JSON + aset), sehingga tetap bisa di-commit ke Git.
5. Hanya tersedia di `localhost:5173/input/dashboard` dan **tidak ikut ke build produksi**.

Karena website adalah aplikasi statis tanpa backend, dashboard memerlukan **Vite dev-server plugin** sebagai API lokal untuk menulis file. Browser tidak bisa menulis langsung ke `src/data` atau `src/assets`.

---

## 2. Tujuan & Non-Tujuan

### 2.1 Tujuan

- Menghilangkan kebutuhan edit manual file `.jsx` untuk konten rutin.
- Menyediakan satu tempat untuk melihat dan mengelola semua konten.
- Menjaga struktur data dan tampilan website tetap sama setelah migrasi.
- Menyediakan validasi dasar agar data tidak merusak halaman (mis. slug duplikat, referensi detail hilang).
- Menyediakan backup otomatis sebelum setiap penyimpanan.
- Tetap ringan: tanpa database, tanpa login, tanpa layanan eksternal.

### 2.2 Non-Tujuan (fase 1)

- Tidak untuk produksi / hosting publik.
- Tidak multi-user, tidak ada autentikasi.
- Tidak ada rich text editor (konten tetap teks biasa).
- Tidak mengelola teks yang masih hardcoded di komponen (judul section, Navbar, timeline, dll.).
- Tidak ada versioning/undo bawaan selain backup file dan Git.
- Tidak mengubah desain website.
- Tidak mengelola deployment.

---

## 3. Audit Data Saat Ini

### 3.1 Ringkasan file data

| File | Export | Tipe | Dipakai oleh |
|---|---|---|---|
| `src/data/heroData.jsx` | `heroData` | object | Section Hero |
| `src/data/projectData.jsx` | `projectData` | array | Section Projects + related project di detail pengalaman |
| `src/data/experienceData.jsx` | `experiencesData` | array | Section Experience |
| `src/data/skillData.jsx` | `skillData` | array | Section Skill |
| `src/data/certificationData.jsx` | `certificationData` | array | Section Certification (home) |
| `src/data/footerData.jsx` | `footerData` | object | Footer |
| `src/data/colorVariants.jsx` | `colorVariants` | object map | ProjectCard & ProjectDetailSlug |
| `src/data/skill/skillPageData.jsx` | `galleryCertifications` | array | Halaman `/certifications` |
| `src/data/slug/project/corporateData.jsx` | `corporateData` | object | Halaman `/projects/:slug` |
| `src/data/slug/project/combineData.jsx` | `combineData` | array | Wrapper detail proyek |
| `src/data/slug/experience/webdevData.jsx` | `webdevData` | object | Halaman `/experience/:slug` |
| `src/data/slug/experience/combineData.jsx` | `expDetailData` | array | Wrapper detail pengalaman |

Data yang **tidak** ada di `src/data` tetapi tampil di website:

| Lokasi | Konten hardcoded |
|---|---|
| `src/components/hero/HeroCard.jsx` | Foto avatar (`src/assets/avatar.webp`), tombol "DOWNLOAD CV" dan "MY WORKS" (tanpa href), teks "Apa" |
| `src/pages/Navbar.jsx` | Link navigasi, link GitHub/Email/LinkedIn, logo "UDIN" |
| `src/pages/Footer.jsx` | Teks "UDIN", deskripsi singkat, label "JELAJAHI LAGI", "TERHUBUNG", "All Rights Reserved." |
| `src/pages/homes/*.jsx` | Judul section ("Profesional & Non-Formal.", "01 / PROJEK", dll.) |
| `src/pages/slug/WorkLineTable.jsx` | `months` dan `timelineData` (Gantt chart pekerjaan) |
| `src/pages/slug/ProjectDetailSlug.jsx` | Judul section ("Tentang Projek.", "Galeri Projek", label "SCREENSHOT", dll.) |
| `src/pages/slug/ExperienceDetailSlug.jsx` | Judul section ("Detail Pengalaman.", "Alat dan Teknologi.", dll.) |
| `src/pages/homes/subpages/CertificationPage.jsx` | Judul halaman daftar sertifikat |

### 3.2 Detail per file dan lokasi tampil

#### A. `heroData.jsx`

```js
{
  location,        // title bar MainFrame di HeroCard
  titleLine1,      // H1 baris 1
  titleLine2,      // H1 baris 2 (warna blue-2)
  description,     // paragraf deskripsi
  statsTagline,    // teks "Apa {statsTagline}" pada baris statistik
  stats: [{ id, value, unit, label }]  // 3 kotak statistik
}
```

Tampil di: **Section Hero** (`src/components/hero/HeroCard.jsx`) — halaman utama.

Catatan: `avatar`, tombol CV/Works, dan warna/tipografi tidak termasuk data.

#### B. `projectData.jsx`

```js
{
  id,             // React key
  slug,           // target link /projects/:slug
  related,        // key relasi ke experience (relatedProjectKey)
  number,         // badge nomor "01"
  category,       // caption kategori, mis. "LANDING PAGE"
  title,          // judul kartu
  highlightTitle, // bagian judul berwarna
  description,    // deskripsi kartu
  image,          // gambar kartu (import ESM)
  highlightTags,  // tag berwarna
  tags,           // tag netral
  accentColor     // key dari colorVariants
}
```

Tampil di:

1. **Section Projects** (`src/pages/homes/Projects.jsx`) → `ProjectCard`:
   nomor, kategori, gambar, judul + highlight, deskripsi, tag, warna aksen, link detail.
2. **Section "04 / PROJEK DIKERJAKAN"** di halaman detail pengalaman
   (`src/pages/slug/ExperienceDetailSlug.jsx`), difilter dengan `related === relatedProjectKey`.

Catatan penting:

- Kartu proyek mengarah ke `/projects/:slug`, tetapi isi halaman detail diambil dari **`combineData`**, bukan dari `projectData`. Kedua slug harus cocok.
- Saat ini ada 5 entri, tetapi 4 di antaranya duplikat (`aerosea-monitoring` muncul 3x, `id` dobel), dan semua memakai gambar placeholder `xquisite.webp`.
- Hanya slug `corporate-website-revamp` yang punya data detail. Klik proyek lain → `/404`.

#### C. `experienceData.jsx`

```js
{
  id,          // React key
  slug,        // target link /experience/:slug
  period,      // periode, mis. "DEC 2025 - JUNE 2026"
  role,        // jabatan
  company,     // perusahaan
  type,        // badge, mis. INTERNSHIP / FREELANCE
  description  // ringkasan
}
```

Tampil di: **Section Experience** (`src/pages/homes/Experience.jsx`) → `ExperienceCard`.
Kartu mengarah ke `/experience/:slug`, tetapi data detail ada di `expDetailData`.
Hanya `web-developer-sg8` yang punya detail; `freelance-video-editor` → `/404`.

#### D. `skillData.jsx`

```js
{
  id,            // React key
  category,      // nama kategori
  CategoryIcon,  // komponen ikon lucide (bukan data serializable)
  tools: [{ name, iconUrl }] // nama tool + URL ikon eksternal
}
```

Tampil di: **Section Skill** (`src/pages/homes/Skill.jsx`) → `SkillCard`:
ikon kategori, nama kategori, grid nama + ikon tool.

Catatan: `CategoryIcon` adalah komponen React, sehingga tidak bisa diedit sebagai teks/JSON apa adanya. Perlu peta `iconKey → komponen`. `iconUrl` memakai URL `devicons.io` yang kemungkinan tidak valid karena CDN yang dimuat hanya CSS.

#### E. `certificationData.jsx`

```js
{
  id,        // React key
  title,     // judul sertifikat
  issuer,    // penerbit
  type,      // badge tipe
  slug,      // saat ini tidak dipakai
  duration,  // teks durasi
  metadata: [{ label, value }] // saat ini tidak ditampilkan
}
```

Tampil di: **Section Certification** (home) → `CertificationCard`:
nomor urut, judul, penerbit, durasi, tipe. Seluruh kartu mengarah ke `/certifications`.
`slug` dan `metadata` saat ini tidak dipakai.

#### F. `footerData.jsx`

```js
{
  cta: { titleLine1, titleLine2, titleHighlight, description, buttonText, buttonHref },
  directLinks: [{ id, label, href, copyText, isExternal }],
  exploreLinks: [{ id, label, path }],
  socialLinks: [{ id, label, href }],
  copyright: { name, year }
}
```

Tampil di: **Footer** (`src/pages/Footer.jsx`):

- CTA besar + tombol email.
- Baris email/WhatsApp + tombol salin (`CopyButton`).
- Kolom "JELAJAHI LAGI" (`exploreLinks`).
- Kolom "TERHUBUNG" (`socialLinks`).
- Copyright.

Catatan: `exploreLinks` memakai `#profile` dan `#skills`; section `#profile` tidak ada (section hero ber-id `hero`), jadi anchor `Profile` tidak berfungsi.

#### G. `colorVariants.jsx`

```js
{
  "blue-1": { text, bg, border, hex },
  ... 8 varian
}
```

Bukan konten teks, melainkan **palet aksen**. Dipakai oleh:

- `ProjectCard` → `project.accentColor`
- `ProjectDetailSlug` → `project.colorVariantKey`

Dashboard cukup menyediakan dropdown pilihan varian; tidak perlu mengedit palet pada fase 1.

#### H. `skill/skillPageData.jsx` → `galleryCertifications`

```js
{
  id,
  title,
  type,
  issueYear,
  expiryYear,
  duration,
  image,          // import ESM
  credentialUrl
}
```

Tampil di: **Halaman `/certifications`** (`CertificationPage` → `CertificationGallery`):
carousel gambar, judul, tipe, link kredensial, tahun terbit/berakhir, durasi.

Catatan: folder `skill/` menyesatkan; data ini bukan data skill.

#### I. `slug/project/corporateData.jsx`

```js
{
  slug,              // kunci route
  categoryTitle,     // label atas
  titlePrefix,       // judul sebelum kata berwarna
  highlightedWord,   // kata berwarna
  titleSuffix,       // judul setelah kata berwarna
  colorVariantKey,   // key colorVariants
  description,       // paragraf deskripsi
  repoUrl,           // tombol REPOSITORI
  liveDemoUrl,       // tombol LIVE DEMO
  heroImage,         // screenshot utama
  metaData: [{ id, key: <icon>, value }],
  contexts: [{ id, title, description }],
  galery: [{ id, image, caption }]
}
```

Tampil di: **`/projects/:slug`** (`ProjectDetailSlug`):
header judul + deskripsi + tombol + meta, screenshot utama, 4 blok konteks, galeri gambar.
`combineData` membungkus object ini menjadi array untuk pencarian slug.

Catatan: isi `contexts` dan caption galeri masih teks placeholder; `liveDemoUrl` = `"#"`.

#### J. `slug/experience/webdevData.jsx`

```js
{
  id,                 // React key
  slug,               // kunci route
  relatedProjectKey,  // filter projectData.related
  role,               // jabatan
  companyName,        // nama perusahaan
  logo,               // logo (import ESM)
  caption,            // paragraf pembuka
  metaData: [{ id, icon: <icon>, value }],
  detailPengalaman: [{ id, icon: <icon>, title, description }],
  teknologi: [{ id, type, tools }]
}
```

Tampil di: **`/experience/:slug`** (`ExperienceDetailSlug`):

- Hero: logo, nama perusahaan, role (kata pertama hitam, sisanya hijau), caption, meta.
- Section 01: `WorkTimelineTable` (**hardcoded**, bukan dari file ini).
- Section 02: grid `detailPengalaman`.
- Section 03: baris `teknologi`.
- Section 04: kartu proyek dari `projectData` yang `related === relatedProjectKey`.

`combineData` di `slug/experience/combineData.jsx` membungkus object ini menjadi array.

Catatan: isi caption/deskripsi masih placeholder; `role + relatedProjectKey` ditampilkan di title bar sehingga muncul "Web Developer sg8-group".

### 3.3 Peta aset yang direferensikan data

| Aset | Dipakai oleh |
|---|---|
| `src/assets/myself/certifications/xquisite.webp` | `projectData.image` (semua entri, placeholder) |
| `src/assets/Project/corporateRevamp.webp` | `corporateData.heroImage`, `galery`, `galleryCertifications` |
| `src/assets/Project/bnsp.webp` | `corporateData.galery`, `galleryCertifications` |
| `src/assets/sg8_logo.webp` | `webdevData.logo` |
| `src/assets/avatar.webp` | hardcoded di `HeroCard` |

Aset lain (folder `logos/`, `footer/`, `myself/experience/*`, `myself/projects/*`, `myself/avatar.png`, CV PDF) belum direferensikan oleh data.

### 3.4 Masalah data yang perlu diketahui dashboard

1. **Duplikasi proyek** dan `id` ganda di `projectData`.
2. **Slug tanpa halaman detail** (`aerosea-monitoring`, `freelance-video-editor`) → 404.
3. **Gambar placeholder** dipakai berulang.
4. **Field tidak terpakai**: `certificationData.slug`, `certificationData.metadata`.
5. **Konten placeholder** di data detail proyek dan pengalaman.
6. **Anchor footer** `#profile` tidak valid.
7. **Tombol Hero** tanpa href; CV tersedia tapi tidak terhubung.
8. **Ikon skill** memakai URL eksternal yang berisiko mati.
9. **Teks hardcoded** di banyak komponen tidak tercakup dashboard fase 1.

---

## 4. Ruang Lingkup Dashboard

### 4.1 In Scope (fase 1)

| Modul | Kemampuan |
|---|---|
| Hero | Edit teks, statistik, foto avatar, link CV, link "My Works" |
| Projects (home) | CRUD, urutkan, upload gambar, tag repeater, pilih aksen, pilih relasi experience |
| Experiences (home) | CRUD, urutkan |
| Skills | CRUD kategori, pilih ikon kategori, CRUD tools, URL/upload ikon tool |
| Certifications (home) | CRUD, metadata repeater |
| Certification Gallery (`/certifications`) | CRUD, upload gambar, link kredensial |
| Footer | Edit CTA, direct links, explore links, social links, copyright |
| Project Details | CRUD per slug, meta repeater, icon picker, context repeater, gallery repeater + upload |
| Experience Details | CRUD per slug, logo upload, meta repeater, detail repeater, teknologi repeater |
| Validasi & integritas | Cek slug duplikat, referensi detail, warna, gambar, field wajib |
| Backup | Backup otomatis sebelum simpan |
| Aset | Upload, daftar, pilih gambar yang sudah ada |

### 4.2 Out of Scope (fase 1)

- Navbar links & branding.
- Judul section, label, dan teks hardcoded lainnya.
- `WorkLineTable` (timeline Gantt).
- Palet `colorVariants` (hanya dipilih, tidak diedit).
- Pengaturan SEO, favicon, meta tag.
- Kompresi/konversi gambar otomatis (bisa fase 2).
- Preview real-time embedded (fase 2).
- Undo/redo.
- Autentikasi.
- Deployment/publish.

---

## 5. Keputusan Arsitektur

### 5.1 Ringkasan keputusan

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Sumber kebenaran data | **JSON** di `src/data/content/` | Mudah dibaca/ditulis dashboard; validasi terpusat; tidak perlu parsing JSX |
| Kompatibilitas halaman | **Wrapper `.jsx` tetap ada** | Halaman tidak perlu diubah; impor nama export lama tetap |
| Data non-serializable | **Icon key + registry** | Komponen React tidak bisa disimpan di JSON |
| Gambar | **Path string + resolver `import.meta.glob`** | Tetap di `src/assets`, ikut ter-bundle saat build |
| Dashboard | **Entry Vite terpisah** di `input/dashboard/` | Tidak ikut build produksi; terisolasi dari UI utama |
| API tulis file | **Vite dev-server plugin** | Tidak perlu backend terpisah; hanya aktif saat `vite dev` |
| Format simpan | **PUT seluruh koleksi** | Paling sederhana; urutan/CRUD ditangani di memori |
| Navigasi dashboard | **HashRouter / tab** | Tidak perlu rewrite route tambahan |
| Validasi | **Zod schema bersama** | Satu definisi untuk UI dan server |

### 5.2 Mengapa perlu Vite plugin

Website berjalan di browser dan hanya bisa membaca data hasil build. Untuk menyimpan perubahan ke `src/data` dan `src/assets`, dibutuhkan proses Node di sisi dev server. Vite menyediakan `configureServer` untuk menambah middleware HTTP. Middleware ini:

- Hanya aktif saat `command === 'serve'` (dev).
- Tidak ada saat `vite build`.
- Menulis file secara atomik + backup.
- Melayani dashboard pada `/input/dashboard`.

### 5.3 Mengapa JSON + wrapper

File `.jsx` saat ini berisi import gambar dan elemen React (ikon). Dashboard tidak mungkin mengedit JSX dengan aman (butuh parser/AST). Dengan memisahkan:

- **JSON** = konten murni yang bisa diedit.
- **Wrapper `.jsx`** = "adapter" yang mengubah path gambar menjadi URL dan icon key menjadi komponen.

Maka halaman cukup mengimpor wrapper lama, dan dashboard hanya menyentuh JSON.

---

## 6. Struktur File Target

### 6.1 File baru

```text
input/
  dashboard/
    index.html                 # entry HTML dashboard (dev-only)

src/
  dashboard/
    main.jsx                   # bootstrap dashboard
    App.jsx                    # layout + navigasi
    api.js                     # fetch wrapper ke /__dashboard/api
    collections.js             # metadata + zod schema koleksi (dipakai server & UI)
    components/
      Layout.jsx
      Sidebar.jsx
      CollectionList.jsx
      EditorShell.jsx
      ValidationPanel.jsx
      fields/
        TextField.jsx
        TextAreaField.jsx
        ImageField.jsx
        IconField.jsx
        ColorField.jsx
        SelectField.jsx
        Repeater.jsx
    screens/
      Overview.jsx
      HeroEditor.jsx
      ProjectsEditor.jsx
      ExperiencesEditor.jsx
      SkillsEditor.jsx
      CertificationsEditor.jsx
      CertificationGalleryEditor.jsx
      FooterEditor.jsx
      ProjectDetailsEditor.jsx
      ExperienceDetailsEditor.jsx

scripts/
  dashboard/
    vite-plugin.mjs           # plugin Vite: API + rewrite /input/dashboard
    storage.mjs               # baca/tulis JSON, backup, upload, sanitasi path
    validate.mjs              # validasi server-side

src/data/
  content/
    hero.json
    projects.json
    experiences.json
    skills.json
    certifications.json
    certification-gallery.json
    footer.json
    project-details.json
    experience-details.json
  icons.jsx                    # registry iconKey -> komponen lucide
  assetResolver.js             # path -> URL via import.meta.glob
```

### 6.2 File lama yang berubah / dihapus

| File lama | Perlakuan |
|---|---|
| `src/data/heroData.jsx` | Jadi wrapper `import hero from './content/hero.json'`; tambah resolver avatar |
| `src/data/projectData.jsx` | Wrapper yang map `image` lewat `asset()` |
| `src/data/experienceData.jsx` | Wrapper langsung export JSON |
| `src/data/skillData.jsx` | Wrapper yang map `categoryIcon` → `CategoryIcon` |
| `src/data/certificationData.jsx` | Wrapper langsung export JSON |
| `src/data/footerData.jsx` | Wrapper langsung export JSON |
| `src/data/skill/skillPageData.jsx` | Wrapper yang map `image` |
| `src/data/slug/project/corporateData.jsx` | Diganti oleh `content/project-details.json`; file lama dihapus |
| `src/data/slug/project/combineData.jsx` | Menjadi adapter `project-details.json` (map ikon + gambar) |
| `src/data/slug/experience/webdevData.jsx` | Diganti oleh `content/experience-details.json`; file lama dihapus |
| `src/data/slug/experience/combineData.jsx` | Menjadi adapter `experience-details.json` |
| `src/data/colorVariants.jsx` | Tetap kode (referensi dashboard) |
| `vite.config.js` | Tambah plugin dashboard |
| `package.json` | Tambah dependency `zod` (opsional tapi direkomendasikan) |

### 6.3 Prinsip penamaan

- Path gambar di JSON: path relatif root proyek, format POSIX, mis. `src/assets/Project/corporateRevamp.webp`.
- Upload baru: `src/assets/uploads/<collection>/<slug>-<timestamp>.<ext>`.
- Icon di JSON: string key dari registry, mis. `"calendar"`, `"code"`.
- ID baru: `crypto.randomUUID()`.
- Slug: dibuat dari judul, huruf kecil, spasi → `-`, karakter non-alfabet dibuang.

---

## 7. Skema Data Target

Contoh skema ringkas. Semua field yang saat ini dipakai halaman dipertahankan namanya agar wrapper tidak perlu mengubah komponen.

### 7.1 `hero.json`

```json
{
  "location": "DEVELOPER - TANGERANG, INDONESIA",
  "titleLine1": "Build Systems.",
  "titleLine2": "Deliver Solutions.",
  "description": "...",
  "statsTagline": "yang saya lakukan?",
  "avatar": "src/assets/avatar.webp",
  "cvUrl": "src/assets/myself/cv/CV_Muhammad_Akmalluddin.pdf",
  "worksHref": "/#projects",
  "stats": [
    { "id": "1", "value": "1", "unit": "tahun", "label": "Pengalaman Kerja" }
  ]
}
```

> `avatar`, `cvUrl`, `worksHref` adalah tambahan agar konten Hero bisa dikelola penuh. `HeroCard` perlu sedikit disesuaikan untuk memakai field ini (tetap dengan fallback).

### 7.2 `projects.json`

```json
[
  {
    "id": "uuid",
    "slug": "corporate-website-revamp",
    "related": "sg8-group",
    "number": "01",
    "category": "LANDING PAGE",
    "title": "Corporate Website",
    "highlightTitle": "Revamp",
    "description": "...",
    "image": "src/assets/Project/corporateRevamp.webp",
    "highlightTags": ["Website Development", "Live Demo"],
    "tags": ["React.js"],
    "accentColor": "blue-1"
  }
]
```

### 7.3 `experiences.json`

```json
[
  {
    "id": "uuid",
    "slug": "web-developer-sg8",
    "period": "DEC 2025 - JUNE 2026",
    "role": "Web Developer",
    "company": "PT Dwitunggal Jaya Pratama Maju (SG8 Group)",
    "type": "INTERNSHIP",
    "description": "..."
  }
]
```

### 7.4 `skills.json`

```json
[
  {
    "id": "uuid",
    "category": "Frontend Dev.",
    "categoryIcon": "monitor-smartphone",
    "tools": [
      { "name": "React", "iconUrl": "https://devicons.io/devicons/icons/react.svg" }
    ]
  }
]
```

Wrapper memetakan `categoryIcon` → `CategoryIcon` lewat `icons.jsx`. Nama field baru `categoryIcon`; wrapper yang menambahkan `CategoryIcon` agar `SkillCard` tidak berubah.

### 7.5 `certifications.json`

```json
[
  {
    "id": "uuid",
    "title": "...",
    "issuer": "...",
    "type": "PELATIHAN",
    "slug": "certifications",
    "duration": "...",
    "metadata": [{ "label": "WAKTU", "value": "..." }]
  }
]
```

### 7.6 `certification-gallery.json`

```json
[
  {
    "id": "uuid",
    "title": "Frontend Development",
    "type": "SERTIFIKAT",
    "issueYear": "Desember 2024",
    "expiryYear": "Desember 2027",
    "duration": "-",
    "image": "src/assets/Project/bnsp.webp",
    "credentialUrl": "https://..."
  }
]
```

### 7.7 `footer.json`

```json
{
  "cta": { "titleLine1": "...", "titleLine2": "...", "titleHighlight": "...", "description": "...", "buttonText": "...", "buttonHref": "mailto:..." },
  "directLinks": [{ "id": "email", "label": "...", "href": "...", "copyText": "...", "isExternal": false }],
  "exploreLinks": [{ "id": "1", "label": "Profile", "path": "#hero" }],
  "socialLinks": [{ "id": "1", "label": "Linkedin", "href": "..." }],
  "copyright": { "name": "...", "year": "2026" }
}
```

### 7.8 `project-details.json`

Array dari object yang sebelumnya ada di `corporateData.jsx`:

```json
[
  {
    "id": "uuid",
    "slug": "corporate-website-revamp",
    "categoryTitle": "...",
    "titlePrefix": "...",
    "highlightedWord": "...",
    "titleSuffix": "...",
    "colorVariantKey": "blue-1",
    "description": "...",
    "repoUrl": "...",
    "liveDemoUrl": "#",
    "heroImage": "src/assets/Project/corporateRevamp.webp",
    "metaData": [{ "id": "1", "icon": "user", "value": "Fullstack Developer" }],
    "contexts": [{ "id": "01", "title": "...", "description": "..." }],
    "galery": [{ "id": "1", "image": "...", "caption": "..." }]
  }
]
```

Wrapper `combineData.jsx` memetakan `icon` → elemen React dan `heroImage`/`image` → URL, lalu mengekspor `combineData`. Komponen `ProjectDetailSlug` tetap membaca `metaData[].key`, jadi wrapper harus mengisi `key`, atau komponen disesuaikan ke `icon` (pilih salah satu; disarankan wrapper memetakan `icon` → `key` agar komponen tidak berubah).

### 7.9 `experience-details.json`

```json
[
  {
    "id": "uuid",
    "slug": "web-developer-sg8",
    "relatedProjectKey": "sg8-group",
    "role": "Web Developer",
    "companyName": "...",
    "logo": "src/assets/sg8_logo.webp",
    "caption": "...",
    "metaData": [{ "id": "1", "icon": "calendar", "value": "2026" }],
    "detailPengalaman": [{ "id": "1", "icon": "calendar", "title": "...", "description": "..." }],
    "teknologi": [{ "id": "1", "type": "Frontend", "tools": "..." }]
  }
]
```

Wrapper `expDetailData` memetakan ikon + logo, dan mengekspor array.

### 7.10 Icon registry (`src/data/icons.jsx`)

Daftar terkurasi (bukan seluruh lucide) agar picker sederhana dan bundle terkendali:

| Key | Komponen |
|---|---|
| `calendar` | `Calendar` |
| `clock` | `Clock` |
| `briefcase` | `BriefcaseBusiness` |
| `map-pin` | `MapPin` |
| `user` | `User` |
| `check` | `Check` |
| `calendar-days` | `CalendarDays` |
| `users` | `Users` |
| `code` | `Code2` |
| `monitor-smartphone` | `MonitorSmartphone` |
| `server` | `Server` |
| `database` | `Database` |
| `wrench` | `Wrench` |

Dashboard menampilkan dropdown/grid ikon dari daftar ini. Jika key tidak dikenal, wrapper memakai fallback (mis. `Circle`).

### 7.11 Asset resolver (`src/data/assetResolver.js`)

```js
const modules = import.meta.glob('/src/assets/**/*.{webp,png,jpg,jpeg,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function asset(path) {
  if (!path) return '';
  const key = '/' + path.replace(/^\/+/, '');
  return modules[key] ?? path;
}
```

Catatan:

- Saat dev, file baru di `src/assets` akan terdeteksi watcher Vite. Jika URL belum berubah, lakukan reload browser.
- Saat build, glob membaca semua file yang ada, jadi gambar hasil upload ikut ter-bundle.
- Path eksternal (`https://...`) dikembalikan apa adanya.

---

## 8. Desain Dashboard

### 8.1 Entry & routing

- HTML: `input/dashboard/index.html`
- Script: `<script type="module" src="/src/dashboard/main.jsx"></script>`
- URL: `http://localhost:5173/input/dashboard`
  - Vite plugin melakukan rewrite `/input/dashboard` dan `/input/dashboard/` → `/input/dashboard/index.html`.
- Navigasi internal memakai `HashRouter` (mis. `#/projects`) agar tidak perlu rewrite route tambahan.
- `input/dashboard` **tidak** ditambahkan ke `build.rollupOptions.input`, sehingga `vite build` tetap hanya membuat website utama.

### 8.2 Information architecture

```text
/input/dashboard
├── Overview
│   ├── jumlah item per koleksi
│   ├── daftar masalah integritas
│   └── link cepat ke halaman website
├── Konten Utama
│   ├── Hero
│   ├── Proyek (home)
│   ├── Pengalaman (home)
│   ├── Keahlian
│   └── Sertifikasi (home)
├── Halaman Detail
│   ├── Detail Proyek
│   ├── Detail Pengalaman
│   └── Galeri Sertifikasi
├── Global
│   └── Footer
└── Referensi
    ├── Palet warna (read-only)
    └── Daftar ikon (read-only)
```

### 8.3 Layout

- **Sidebar kiri** (240–280px): menu modul, badge jumlah item, indikator "DEV ONLY".
- **Topbar**: judul modul, tombol "Buka Website", tombol "Simpan", status perubahan ("Tersimpan"/"Belum disimpan"), tombol "Backup".
- **Area utama** dua kolom:
  - Kiri: daftar item (untuk koleksi array) dengan tombol tambah, pencarian, urutkan naik/turun, duplikat, hapus.
  - Kanan: form editor item terpilih.
- **Panel validasi** di bawah/samping: error dan warning.
- Untuk koleksi object (Hero, Footer): hanya form.

### 8.4 Perilaku form umum

- **Auto-slug**: toggle; saat judul berubah dan toggle aktif, slug diperbarui otomatis. Slug bisa diedit manual dengan validasi unik.
- **Repeater**: tambah/hapus/urutkan item array (stats, tags, tools, meta, contexts, galery, directLinks, dll.).
- **ImageField**: preview, tombol "Upload", tombol "Pilih dari aset", tombol "Hapus". Upload mengirim base64 ke API.
- **IconField**: grid ikon terkurasi + pencarian.
- **ColorField**: swatch dari `colorVariants`, menampilkan hex.
- **SelectField**: relasi (`related`, `relatedProjectKey`), warna, tipe.
- **TextAreaField**: deskripsi/caption, tanpa markdown.
- **Perubahan belum disimpan**: guard `beforeunload` + konfirmasi saat pindah modul.
- **Simpan**: validasi client → PUT → toast sukses/gagal → perbarui state `mtime`.
- **Hapus**: dialog konfirmasi, tidak bisa di-undo kecuali backup.
- **Duplikat**: salin item dengan slug baru + id baru + suffix "(Copy)".
- **Urutan**: tombol naik/turun (fase 1). Drag-and-drop opsional fase 2.
- **Preview**: tombol membuka halaman terkait di tab baru (hard reload).

### 8.5 Form per modul

#### Hero
Field: `location`, `titleLine1`, `titleLine2`, `description`, `statsTagline`, `avatar` (image), `cvUrl` (file/URL), `worksHref`, repeater `stats` (value, unit, label).

#### Projects (home)
Daftar + form: `number`, `category`, `title`, `highlightTitle`, `description`, `slug`, `related` (dropdown experience), `accentColor`, `image`, repeater `highlightTags`, repeater `tags`.

Peringatan: slug harus ada di Detail Proyek; `related` harus cocok dengan `relatedProjectKey` di Detail Pengalaman.

#### Experiences (home)
Daftar + form: `period`, `role`, `company`, `type` (dropdown/free text), `description`, `slug`.

Peringatan: slug harus ada di Detail Pengalaman.

#### Skills
Daftar kategori + form: `category`, `categoryIcon` (icon picker), repeater `tools` (`name`, `iconUrl` + tombol upload opsional).

#### Certifications (home)
Daftar + form: `title`, `issuer`, `type`, `duration`, repeater `metadata` (`label`, `value`).
Catatan: `slug` dipertahankan untuk kompatibilitas meski tidak dipakai.

#### Certification Gallery
Daftar + form: `title`, `type`, `issueYear`, `expiryYear`, `duration`, `image`, `credentialUrl`.

#### Footer
Form: CTA (6 field), repeater `directLinks`, repeater `exploreLinks`, repeater `socialLinks`, `copyright` (`name`, `year`).

#### Project Details
Daftar berdasarkan `slug` + form: `categoryTitle`, `titlePrefix`, `highlightedWord`, `titleSuffix`, `colorVariantKey`, `description`, `repoUrl`, `liveDemoUrl`, `heroImage`, repeater `metaData` (icon picker + value), repeater `contexts` (title, description), repeater `galery` (image + caption).

#### Experience Details
Daftar berdasarkan `slug` + form: `relatedProjectKey`, `role`, `companyName`, `logo`, `caption`, repeater `metaData` (icon + value), repeater `detailPengalaman` (icon + title + description), repeater `teknologi` (type + tools).

#### Overview / Integritas
Menampilkan warning:

- Slug duplikat dalam satu koleksi.
- Proyek tanpa detail / detail tanpa proyek.
- Pengalaman tanpa detail / detail tanpa pengalaman.
- `accentColor`/`colorVariantKey` tidak ada di `colorVariants`.
- `related` tidak cocok dengan `relatedProjectKey`.
- Path gambar tidak ditemukan di aset.
- Field wajib kosong.
- ID duplikat.

---

## 9. API Lokal

Base URL: `/__dashboard/api`

| Method | Path | Body | Fungsi |
|---|---|---|---|
| GET | `/health` | - | Cek plugin aktif |
| GET | `/collections` | - | Daftar koleksi + jumlah item |
| GET | `/collections/:key` | - | Baca data + `mtime` |
| PUT | `/collections/:key` | `{ data }` | Validasi, backup, tulis atomik |
| POST | `/backup` | `{ key? }` | Backup manual |
| GET | `/backups` | - | Daftar backup |
| POST | `/upload` | `{ filename, dataUrl }` | Simpan gambar ke `src/assets/uploads` |
| GET | `/assets` | - | Daftar gambar di `src/assets` |
| POST | `/validate` | `{ key, data }` | Validasi tanpa menyimpan |

### 9.1 Format respons

Sukses:

```json
{ "ok": true, "data": { ... }, "mtime": 1730000000000 }
```

Gagal:

```json
{ "ok": false, "error": "VALIDATION_ERROR", "details": [{ "path": "projects.3.slug", "message": "Slug duplikat" }] }
```

### 9.2 Aturan penyimpanan

1. Validasi schema (`zod`) + aturan integritas.
2. Buat backup: `.dashboard/backups/<key>/<ISO-timestamp>.json`.
3. Tulis ke file sementara: `<file>.tmp`.
4. `fs.rename` ke file asli (atomic di filesystem yang sama).
5. Format JSON 2 spasi + newline di akhir.
6. Simpan maksimum 20 backup per koleksi (hapus terlama).

### 9.3 Upload

- Input: JSON `{ filename, dataUrl }` (base64), bukan multipart, agar tanpa dependency tambahan.
- Validasi: ekstensi `webp|png|jpg|jpeg|avif|svg`, ukuran maksimum 5 MB.
- Nama file: `<slug>-<timestamp>.<ext>`, disanitasi.
- Lokasi: `src/assets/uploads/<collection>/`.
- Respons: `{ ok: true, path: "src/assets/uploads/projects/..." }`.
- File yang sudah ada tidak ditimpa; selalu nama baru.
- Jika `dataUrl` bukan gambar valid → 400.

### 9.4 Keamanan

- Plugin hanya `apply: 'serve'`; tidak ada di build.
- Tolak request jika `hostname` bukan `localhost`/`127.0.0.1`/`::1`.
- Cek header `Origin` harus sama dengan origin dev server.
- Wajib `Content-Type: application/json` dan header `X-Portfolio-Dashboard: 1`.
- Sanitasi path: hanya boleh menulis di `src/data/content/` dan `src/assets/uploads/`.
- Tolak path traversal (`..`, path absolut).
- Jangan jalankan `vite --host 0.0.0.0` saat memakai dashboard.
- Tidak ada autentikasi; dashboard adalah alat lokal single-user.

---

## 10. Alur Simpan & Tampilan Website

```text
Browser dashboard
  └─ PUT /__dashboard/api/collections/projects
       └─ Vite plugin
            ├─ validasi
            ├─ backup
            ├─ tulis src/data/content/projects.json
            └─ Vite watcher mendeteksi perubahan
                 └─ website tab reload / HMR
                      └─ wrapper membaca JSON baru
                           └─ halaman menampilkan data baru
```

- Dashboard **tidak mengimpor** file JSON secara langsung; semua lewat API. Dengan begitu HMR yang dipicu perubahan JSON tidak mereload dashboard.
- Setelah simpan, dashboard menampilkan toast dan tombol "Muat ulang website" (opsional) atau pengguna membuka tab website dan melakukan refresh.
- Jika upload gambar baru tidak langsung muncul, lakukan hard refresh; jika tetap tidak, restart `vite dev`.

---

## 11. Fase Implementasi

### Fase 0 — Keputusan & Persiapan (0,5 hari)

- Konfirmasi keputusan pada bagian 14.
- Buat branch kerja, mis. `feat/content-dashboard`.
- Pastikan working tree bersih.
- Tambah dependency `zod` (opsional).
- Siapkan `.gitignore` untuk `.dashboard/` (backup lokal).

**Deliverable:** daftar keputusan disetujui.

### Fase 1 — Migrasi Data ke JSON + Adapter (1–1,5 hari)

- Buat `src/data/content/*.json` dari data lama.
- Pindahkan `corporateData` dan `webdevData` menjadi array di `project-details.json` / `experience-details.json`.
- Buat `src/data/icons.jsx` dan `src/data/assetResolver.js`.
- Ubah wrapper `.jsx` agar mengekspor data hasil map.
- Hapus file detail lama setelah wrapper baru berfungsi.
- Sesuaikan `HeroCard` untuk avatar/CV/works dari data (dengan fallback).
- Tidak mengubah tampilan.

**Acceptance:**
- `npm run dev` dan `npm run build` sukses.
- Semua halaman tampil sama seperti sebelumnya.
- Tidak ada import yang rusak.

### Fase 2 — Vite Plugin & API (1 hari)

- Buat `scripts/dashboard/vite-plugin.mjs` dan `storage.mjs`.
- Implementasi endpoint health, collections, get, put, backup, upload, assets, validate.
- Implementasi validasi schema + integritas.
- Implementasi rewrite `/input/dashboard`.
- Daftarkan plugin di `vite.config.js`.
- Uji dengan `curl`.

**Acceptance:**
- GET/PUT mengembalikan JSON benar.
- File berubah dan backup terbentuk.
- Request dari origin/host lain ditolak.
- `vite build` tidak menyertakan plugin/dashboard.

### Fase 3 — Shell Dashboard (0,5–1 hari)

- `input/dashboard/index.html`, `src/dashboard/main.jsx`, `App.jsx`, layout, sidebar, HashRouter.
- `api.js`, `collections.js`, hook `useCollection` sederhana.
- Halaman Overview + status validasi.
- Entry dev-only terverifikasi.

**Acceptance:**
- `/input/dashboard` bisa dibuka.
- Navigasi antar modul berfungsi.
- Data dari API tampil.

### Fase 4 — Editor Koleksi Sederhana (1–1,5 hari)

- Hero, Footer, Experiences, Skills, Certifications, Certification Gallery.
- Komponen field reusable + repeater.
- Simpan/validasi/toast.

**Acceptance:**
- CRUD dan urutan tersimpan ke JSON.
- Perubahan tampil di website.

### Fase 5 — Editor Proyek & Detail (1–1,5 hari)

- Projects, Project Details, Experience Details.
- Image upload + asset picker.
- Relasi `related` / `relatedProjectKey`, color picker, icon picker.
- Peringatan integritas.

**Acceptance:**
- Proyek baru bisa dibuat lengkap dengan detail.
- Upload gambar berfungsi dan tampil.
- Relasi antar koleksi valid.

### Fase 6 — Polish & QA (0,5–1 hari)

- Unsaved changes guard, pencarian, duplikat, hapus dengan konfirmasi.
- Error handling dan empty states.
- Update README bagian dashboard.
- Uji seluruh acceptance criteria.
- Lint & build.

**Estimasi total:** 5–7 hari kerja (single developer).

---

## 12. Acceptance Criteria

1. Dashboard hanya dapat diakses di `http://localhost:5173/input/dashboard` saat `npm run dev`.
2. `npm run build` tidak menghasilkan halaman/API dashboard.
3. Semua koleksi pada bagian 4.1 dapat dibaca dan disimpan.
4. Perubahan JSON langsung tercermin di website setelah reload/HMR.
5. Upload gambar tersimpan di `src/assets/uploads` dan dapat dipakai di semua field gambar.
6. Validasi menolak data yang merusak struktur (tipe salah, field wajib kosong, slug duplikat).
7. Integritas referensi ditampilkan sebagai warning (minimal).
8. Backup otomatis dibuat sebelum setiap penyimpanan.
9. Website tetap tampil identik setelah migrasi data.
10. `npm run lint` dan `npm run build` lulus.
11. Tidak ada data yang hilang saat migrasi (dibandingkan sebelum/sesudah).
12. Dokumentasi cara pakai tersedia.

---

## 13. Testing

### Manual

- Buka dashboard, edit tiap modul, simpan, cek halaman terkait.
- Upload gambar baru, ganti gambar, hapus referensi.
- Buat proyek baru + detail baru, cek link `/projects/:slug`.
- Buat pengalaman baru + detail baru, cek terkait proyek.
- Ubah slug, cek link lama (harus diperingatkan).
- Hapus item, cek halaman tidak error.
- Matikan dev server, dashboard menampilkan error koneksi.
- Buka dashboard dari host lain (jika `--host`), pastikan ditolak.

### Otomatis (opsional fase 2)

- Unit test validator (`vitest`).
- Test API plugin dengan `curl`/supertest.
- Snapshot JSON sebelum/sesudah migrasi.

---

## 14. Keputusan yang Perlu Disetujui

| # | Pertanyaan | Rekomendasi |
|---|---|---|
| 1 | Format sumber data | **JSON + wrapper `.jsx`** (bukan generate JSX) |
| 2 | Lokasi dashboard | **Entry terpisah** `input/dashboard`, bukan route di `App.jsx` |
| 3 | Data duplikat proyek | **Bersihkan saat migrasi** (sisakan 1 entri per proyek) atau pertahankan sementara? Rekomendasi: bersihkan setelah konfirmasi konten |
| 4 | Hero avatar/CV/works | **Masukkan ke `hero.json`** agar bisa diedit |
| 5 | Ikon | **Registry terkurasi** (bukan seluruh lucide) |
| 6 | Gambar tool skill | Tetap URL eksternal + opsi upload? Rekomendasi: dukung keduanya |
| 7 | Konversi gambar ke WebP | **Tidak** di fase 1 |
| 8 | Backup | **Otomatis** sebelum simpan, folder `.dashboard/` di-ignore Git |
| 9 | Auth | **Tidak ada**; amankan dengan host/origin check |
| 10 | Timeline `WorkLineTable` | **Tidak** dikelola di fase 1 (fase 2 jika diperlukan) |

---

## 15. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Migrasi JSON merusak import | Website rusak | Wrapper mempertahankan nama export; uji build; commit terpisah |
| Data hilang saat edit | Konten hilang | Backup otomatis + Git; konfirmasi hapus |
| Gambar baru tidak muncul | Konten tidak tampil | Resolver glob; reload; dokumentasi restart |
| Path traversal / tulis file sembarang | Keamanan lokal | Sanitasi path, allowlist direktori, origin check |
| Dashboard ikut build produksi | Bocor ke publik | Entry terpisah + plugin `apply: 'serve'` |
| Icon tidak bisa diserialisasi | Data tidak konsisten | Registry key + fallback |
| Slug berubah memutus link | 404 | Peringatan + daftar referensi sebelum simpan |
| Duplikasi data lama | Konten membingungkan | Pembersihan terkonfirmasi saat migrasi |
| Perubahan JSON memicu reload dashboard | Kehilangan input | Dashboard fetch via API, tidak import JSON |

---

## 16. Definisi Selesai (DoD)

- Semua fase 1–6 selesai dan acceptance criteria terpenuhi.
- PRD ini diperbarui jika ada perubahan keputusan.
- README memuat cara menjalankan dashboard.
- Tidak ada file dashboard/API di output `dist`.
- Perubahan di-commit di branch fitur dan siap digabung.

---

## 17. Fase 2 (Opsional, di luar PRD ini)

- Editor teks hardcoded (Navbar, judul section, timeline).
- Drag-and-drop urutan.
- Preview embedded / split view.
- Kompresi & konversi gambar otomatis (sharp).
- Undo/redo dan riwayat versi.
- Autentikasi token sederhana.
- Manajemen palet warna.
- Import/export seluruh konten.
- Dukungan multi-bahasa.
