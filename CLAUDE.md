# Panduan Proyek (Project Guidelines) untuk CLAUDE / AI Assistant

## 1. Tech Stack
- **Framework Utama:** Astro (untuk routing dan static site generation).
- **Komponen Interaktif:** React (menggunakan `client:only="react"` atau direktif Astro lainnya).
- **Styling:** Vanilla CSS (`src/styles/global.css`). Hindari Tailwind CSS kecuali diminta khusus.
- **Animasi & 3D:** Framer Motion dan Three.js (dibalut dalam komponen React).
- **Bahasa:** TypeScript (`.ts`, `.tsx`, `.astro`).

## 2. Tema & Estetika (Cyber-Jungle Digital)
Proyek ini menggunakan tema **Cyber-Jungle Digital** (Borneo/Dayak dipadukan dengan Cyberpunk/Sci-Fi).
- **Warna Utama (Dark Mode):** 
  - Background: `#010409` (Deep Space/Jungle Dark)
  - Text: `#f0f9ff`
  - Accents: Neon Cyan (`#00f2fe`), Neon Pink (`#ff00de`), Neon Green (`#39ff14`), Golden/Amber (`#fbbf24`).
- **Efek Visual (UI/UX):**
  - **Glassmorphism:** Gunakan efek kaca (backdrop-filter blur, background semi-transparan).
  - **HUD Elements:** Desain UI ala antarmuka sci-fi/mecha (scanlines, sudut terpotong/clipped corners, border neon).
  - **Glow & Shadow:** Gunakan `drop-shadow` dan `box-shadow` untuk efek cahaya neon pada teks dan border.
- **Tipografi:**
  - Header: `Orbitron` (Sci-Fi)
  - Monospace/HUD: `Space Mono`
  - Body: `Poppins`
  - Elemen Kuno/Etnik: `Uncial Antiqua` atau `Macondo`.

## 3. Aturan Penulisan Kode
- **Astro Pages:** Gunakan Astro murni untuk struktur halaman dasar dan SEO (meta tags, `<head>`). Sisipkan komponen React hanya jika butuh *state* atau animasi kompleks.
- **React Components:** Tulis fungsional komponen menggunakan React Hooks (`useState`, `useEffect`). Pastikan animasi Framer Motion mulus dan perhatikan unmounting (`AnimatePresence`).
- **CSS:** Gunakan CSS variables (Custom Properties) yang sudah didefinisikan di `global.css`. Jangan gunakan inline-style secara berlebihan jika kelas CSS global sudah tersedia.

## 4. Prioritas Kualitas
1. **Performa:** Jangan biarkan elemen 3D (Three.js) atau partikel memakan memori berlebih. Bersihkan event listener dan requestAnimationFrame saat *unmount*.
2. **Responsivitas:** Pastikan UI (termasuk efek HUD dan scanline) terlihat bagus dan dapat disesuaikan di perangkat mobile (gunakan *clamp*, persentase, atau *media queries*).
3. **Pengalaman Pengguna (Wow Factor):** Fokus pada micro-interactions, transisi halaman yang mulus, dan *first impression* yang kuat (seperti Loading Screen).
