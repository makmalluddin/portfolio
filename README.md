# Portofolio

Repositori portofolio pribadi.

## Dashboard konten (khusus development)

Dashboard lokal untuk melihat, menambah, mengubah, menghapus, mengurutkan, dan mengunggah aset konten. Dashboard hanya tersedia saat dev server berjalan dan tidak ikut ke build produksi.

1. Jalankan dev server:

   ```bash
   npm run dev
   ```

2. Buka `http://localhost:5173/input/dashboard`.

3. Pilih koleksi di sidebar, edit data, lalu klik **Simpan**. Perubahan langsung ditulis ke file JSON di `src/data/content/` dan tampil di website melalui HMR.

### Yang bisa dikelola

- Hero, proyek, pengalaman, keahlian, sertifikasi, dan galeri sertifikasi.
- Detail proyek dan detail pengalaman, termasuk relasi antar koleksi.
- Footer, kontak, tautan, dan media sosial.
- Gambar: unggah ke `src/assets/uploads/<koleksi>/`, pilih dari aset yang ada, atau tempel path/URL.
- Referensi palet warna dan ikon yang boleh dipakai.

### Catatan

- File aset lokal disimpan sebagai path `src/assets/...` di JSON. Jangan memindahkan atau menghapus file yang masih dipakai.
- Setiap penyimpanan membuat backup di `.dashboard/backups/` (diabaikan Git, maksimal 20 backup per koleksi).
- Tombol **Validasi** memeriksa struktur data dan integritas relasi sebelum disimpan.
- API dashboard berada di `/__dashboard/api` dan hanya menerima request dari localhost dengan header `X-Portfolio-Dashboard: 1`.
- Jangan menjalankan dashboard di server publik.
