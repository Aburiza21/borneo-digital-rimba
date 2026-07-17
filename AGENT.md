# Instruksi Agen (Agent Rules)

Agen AI harus mematuhi ketentuan berikut saat membantu mengembangkan proyek ini:

## 1. Analisis & Perencanaan
- Pahami konteks proyek sebelum menulis kode. Cek `src/styles/global.css` untuk melihat variabel global atau gaya yang sudah ada.
- Jangan terburu-buru menghapus atau merombak (refactor) komponen besar (terutama animasi atau 3D) tanpa memastikan tidak ada efek samping.

## 2. Penulisan & Eksekusi Kode
- Selalu pisahkan antara kode UI presentasional dengan logika efek/animasi jika komponen menjadi terlalu besar.
- Jika mengedit elemen `React`, pastikan efek `useEffect` membersihkan (cleanup) timer, interval, atau listener untuk mencegah kebocoran memori (memory leaks).
- Fokus pada estetika tingkat tinggi (High-End Aesthetics). Jangan berikan desain UI dasar atau MVP. Setiap elemen baru harus terlihat "premium" dan mengikuti tema Cyber-Jungle Digital.

## 3. Format Respons
- Saat membuat atau mengedit file, berikan penjelasan singkat mengenai perubahan apa saja yang dibuat.
- Selalu gunakan blok perubahan (diff) yang efisien, hindari menulis ulang keseluruhan isi file kecuali diperlukan.

## 4. Kriteria Penyelesaian
Sebelum menganggap tugas selesai, pastikan agen memeriksa:
- Apakah komponen berjalan mulus tanpa error di console?
- Apakah tema warna dan font (`Orbitron`, `Poppins`, dll.) selaras dengan `global.css`?
- Apakah antarmuka responsif di ukuran mobile (lebar layar kecil)?
