import React from 'react';
import { Code2, BarChart2, Palette } from 'lucide-react';
import type { Category, PortfolioItem } from './types';

export const data: Record<Category, PortfolioItem[]> = {
  programmer: [
    {
      id: 'PROG-01',
      title: 'Digital Office Kemenhub RI',
      subtitle: 'Portal Layanan & Data Sekretariat Jenderal',
      year: '2024–Present',
      description: 'Pengembangan portal layanan dan data Sekretariat Jenderal Kementerian Perhubungan RI. Mengintegrasikan presensi digital nasional 10.000+ pegawai, persuratan dinas, modul Single Sign-On (SSO), serta arsitektur backend berkapasitas tinggi untuk seluruh satuan kerja di Indonesia.',
      image: '/assets/projects/digitaloffice.png',
      tech: ['Laravel', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'SSO'],
      link: 'https://digitaloffice.kemenhub.go.id/',
      achievement: '10.000+ Active Users · Enterprise GovTech',
      accent: 'var(--accent-color)',
      role: 'Full Stack & Backend Developer',
      team: 'Tim Pusdatin Kemenhub RI',
      problem: [
        'Kebutuhan integrasi terpusat seluruh modul administrasi perkantoran dan presensi untuk 10.000+ pegawai Kemenhub di seluruh Indonesia.',
        'Lonjakan trafik ekstrem pada jam-jam sibuk presensi (07:00–08:30 & 16:00–17:30) yang membutuhkan latensi di bawah 200ms.',
        'Kebutuhan sistem autentikasi tunggal (SSO) dan pelaporan data kehadiran real-time yang akurat dan aman.',
      ],
      solution: [
        'Arsitektur backend Laravel dengan connection pooling PostgreSQL dan Redis multi-layer caching untuk menangani lonjakan konkurensi.',
        'Integrasi Single Sign-On (SSO) Kemenhub dan antrian asinkron (Laravel Queue) untuk notifikasi serta pemrosesan data presensi massal.',
        'Desain skema database terindeks dan materialized view untuk analitik pelaporan instan tanpa membebani tabel transaksional.',
        'Containerisasi Docker dan implementasi Kubernetes untuk menjamin auto-scaling dan ketersediaan sistem 99.9%.',
      ],
      architecture: [
        { component: 'Core Service & API', tech: 'Laravel / PHP', desc: 'Layanan administrasi perkantoran, manajemen dokumen dinas, dan REST API presensi.' },
        { component: 'Database & Cache', tech: 'PostgreSQL + Redis', desc: 'Penyimpanan transaksi kehadiran terindeks dan caching respon jam sibuk.' },
        { component: 'SSO & Identity', tech: 'OAuth2 / SAML', desc: 'Autentikasi terpusat untuk seluruh aparatur dan unit kerja Kemenhub.' },
        { component: 'Orchestration', tech: 'Docker & Kubernetes', desc: 'Clustering kontainer dengan auto-healing dan load balancing.' },
      ],
      metrics: [
        { label: 'Pengguna Aktif', before: 'Manual / Parsial', after: '10.000+ Pegawai', improvement: 'Terpusat' },
        { label: 'API Response Time', before: '> 2.0 detik', after: '< 200 ms', improvement: '↓ 90%' },
        { label: 'Efisiensi Administrasi', before: 'Manual Kertas', after: '100% Digital', improvement: '↑ 85%' },
        { label: 'Sistem Uptime', before: '~95%', after: '99.9%', improvement: 'Tinggi' },
      ],
      codeSnippet: {
        lang: 'php',
        code: `// High-concurrency Redis cached attendance check
public function recordAttendance(AttendanceRequest $request): JsonResponse
{
    $userId = auth()->id();
    $cacheKey = "attendance:lock:{$userId}:" . now()->toDateString();
    
    return Cache::lock($cacheKey, 10)->get(function () use ($request, $userId) {
        $record = $this->attendanceService->process(
            $userId, 
            $request->validated()
        );
        ProcessAttendanceLog::dispatch($record)->onQueue('high');
        return response()->json(['status' => 'success', 'data' => $record]);
    });
}`,
      },
    },
    {
      id: 'PROG-02',
      title: 'Atase Perhubungan Kuala Lumpur',
      subtitle: 'Virtual Office KBRI Kuala Lumpur — Kemenhub RI',
      year: '2024–2025',
      description: 'Platform Virtual Office dan portal diplomasi resmi Atase Perhubungan RI di KBRI Kuala Lumpur, Malaysia. Memfasilitasi koordinasi konektivitas transportasi antar-negara (darat, laut, udara), kerja sama bilateral sektor perhubungan Indonesia–Malaysia, serta media center terpadu.',
      image: '/assets/projects/athubkl.png',
      tech: ['PHP', 'TailwindCSS', 'MySQL', 'REST API', 'Cloudflare'],
      link: 'https://athubkl.kemenhub.go.id/atase-perhubungan/',
      achievement: 'Official Diplomatic Portal · Bilateral Transportation',
      accent: 'var(--accent-secondary)',
      role: 'Full Stack Web Developer & UI Engineer',
      team: 'Atase Perhubungan RI Kuala Lumpur',
      problem: [
        'Kebutuhan platform digital resmi untuk memfasilitasi transparansi regulasi dan konektivitas sektor transportasi bilateral RI–Malaysia.',
        'Belum tersedianya portal terpadu yang memadukan profil diplomasi, modul Virtual Office pelayanan masyarakat, dan media publikasi.',
        'Aksesibilitas lintas batas negara yang memerlukan kecepatan loading tinggi dan perlindungan keamanan siber andal.',
      ],
      solution: [
        'Membangun sistem Virtual Office interaktif dengan navigasi terstruktur: Profil, Konektivitas, Kerja Sama, Pelayanan, dan Media Center.',
        'Implementasi antarmuka modern yang responsif dan ramah pengguna dengan integrasi aset visual diplomatik resmi.',
        'Integrasi Cloudflare CDN dan lapisan WAF untuk mengoptimalkan latensi akses pengguna dari Indonesia dan Malaysia serta menangkal serangan web.',
        'Sistem manajemen konten dinamis untuk pembaruan cepat siaran pers, regulasi perhubungan, dan pengumuman bilateral.',
      ],
      architecture: [
        { component: 'Diplomatic Portal', tech: 'Web Application Engine', desc: 'Penyajian profil perwakilan diplomasi, direktori regulasi, dan arsip siaran pers.' },
        { component: 'Virtual Office Desk', tech: 'Custom Module & API', desc: 'Layanan terpadu permohonan informasi dan layanan perhubungan luar negeri.' },
        { component: 'Edge Acceleration', tech: 'Cloudflare CDN & WAF', desc: 'Caching aset statis antar wilayah geografis dan mitigasi DDoS.' },
      ],
      metrics: [
        { label: 'Aksesibilitas Informasi', before: 'Terbatas / Offline', after: 'Virtual Office 24/7', improvement: 'Live Online' },
        { label: 'Kecepatan Akses ID-MY', before: '~3.5 detik', after: '< 1.1 detik', improvement: '↓ 68%' },
        { label: 'Transparansi Layanan', before: 'Konvensional', after: 'Digital Terpadu', improvement: '100% Online' },
      ],
      codeSnippet: {
        lang: 'javascript',
        code: `// Fast navigation & content filtering for diplomatic connectivity archive
export async function getConnectivityData(category, country = 'MY') {
  const res = await fetch(\`/api/v1/connectivity?cat=\${category}&country=\${country}\`, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
  });
  if (!res.ok) throw new Error('Failed to fetch diplomatic data');
  return res.json();
}`,
      },
    },
    {
      id: 'PROG-03',
      title: 'PT Pelayanan Energi Batam',
      subtitle: 'Danantara Indonesia · PLN Batam Subsidiary',
      year: '2024–2025',
      description: 'Website korporasi modern untuk PT Pelayanan Energi Batam (anak usaha PT PLN Batam di bawah naungan ekosistem Danantara Indonesia). Mengusung tema "Energi Untuk Negeri" dengan fitur bilingual (ID/EN), profil keandalan pasokan energi listrik, portofolio pembangkit, dan tata kelola korporasi.',
      image: '/assets/projects/danantara_peb.png',
      tech: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
      link: 'https://new.peb.co.id/',
      achievement: 'National Energy Infrastructure Portal · Bilingual Support',
      accent: 'var(--accent-color)',
      role: 'Frontend & UI/UX Developer',
      team: 'Digital Innovation Team — PEB / PLN Batam',
      problem: [
        'Kebutuhan representasi digital korporat energi berstandar internasional yang mencerminkan modernitas, transparansi, dan keandalan sistem ketenagalistrikan.',
        'Kebutuhan fitur bilingual penuh (Bahasa Indonesia & Bahasa Inggris) untuk melayani investor industri dan mitra bisnis internasional di kawasan Batam.',
        'Presentasi portofolio teknis pembangkit, galeri inovasi energi terbarukan, dan tata kelola perusahaan (GCG) yang dinamis dan informatif.',
      ],
      solution: [
        'Perancangan antarmuka korporasi modern dengan mode gelap/terang, tipografi tajam, dan micro-interactions berestetika industri energi.',
        'Sistem alih bahasa terintegrasi (i18n ID/EN) yang responsif dan menjaga state konteks tanpa reload halaman.',
        'Optimasi performa frontend dengan code splitting, kompresi aset gambar pembangkit, dan skor performa Lighthouse 90+.',
        'Komponen modular yang memudahkan pembaruan laporan berkala, struktur organisasi, dan galeri proyek.',
      ],
      architecture: [
        { component: 'Corporate Frontend', tech: 'Next.js & React', desc: 'Single-Page / SSR interface berkecepatan tinggi dengan routing bilingual.' },
        { component: 'Animation Suite', tech: 'Framer Motion & CSS', desc: 'Transisi visual halus untuk hero showcase, slider portofolio, dan interaksi header.' },
        { component: 'Media Pipeline', tech: 'Next Image & WebP', desc: 'Pengoptimalan otomatis aset foto pembangkit listrik dan diagram energi.' },
      ],
      metrics: [
        { label: 'Lighthouse Performance', before: '58 / 100', after: '94 / 100', improvement: '↑ 62%' },
        { label: 'First Contentful Paint', before: '2.8 detik', after: '0.8 detik', improvement: '↓ 71%' },
        { label: 'Dukungan Bahasa', before: '1 Bahasa', after: 'Bilingual (ID/EN)', improvement: 'Global Ready' },
      ],
      codeSnippet: {
        lang: 'typescript',
        code: `// Multi-language context provider for seamless corporate switching
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<'id' | 'en'>('id');
  
  const toggleLocale = (nextLocale: 'id' | 'en') => {
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    localStorage.setItem('peb_lang', nextLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};`,
      },
    },
    {
      id: 'PROG-04',
      title: 'Hulu Nautika Khatulistiwa',
      subtitle: 'Creative Agency & Social Media Workspace',
      year: '2024–2025',
      description: 'Platform agensi kreatif dan workspace media sosial interaktif "Branding Tidak Perlu Mahal dan Susah". Memamerkan portofolio visual pembuatan konten Instagram, TikTok, Facebook, desain identitas logo, company profile korporat, hingga produksi video reels komersial berkonversi tinggi.',
      image: '/assets/projects/hulunautika.png',
      tech: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion', 'Lucide'],
      link: 'https://hulunautika.com/',
      achievement: 'Creative Digital Studio · Interactive Showcase',
      accent: 'var(--accent-tertiary)',
      role: 'Full Stack Creative Developer',
      team: 'Hulu Nautika Khatulistiwa Creative Studio',
      problem: [
        'Pelaku UMKM dan brand membutuhkan akses mudah ke solusi branding visual profesional tanpa hambatan komunikasi birokratis.',
        'Kebutuhan etalase portofolio dinamis yang mampu menampilkan ragam format karya (Reels video, Feeds, Desain Logo, Company Profile) secara estetik.',
        'Optimalisasi alur konversi pengunjung agar dapat langsung terhubung ke konsultasi cepat.',
      ],
      solution: [
        'Perancangan layout split interaktif bertema neon workspace dengan estetika modern yang mencerminkan kreativitas agensi.',
        'Sistem navigasi portofolio berbasis kategori visual dengan preview interaktif untuk setiap lini layanan kreatif.',
        'Penerapan animasi transisi halus dengan Framer Motion untuk pengalaman browsing yang atraktif.',
        'Integrasi tombol pemesanan langsung dan floating quick-chat untuk meningkatkan laju konversi calon klien.',
      ],
      architecture: [
        { component: 'Showcase Interface', tech: 'Next.js & React', desc: 'Portofolio visual interaktif dengan galeri proyek dan filter layanan.' },
        { component: 'Motion & FX', tech: 'Framer Motion', desc: 'Efek pencahayaan neon, hero slider kreatif, dan mikro-interaksi tombol.' },
        { component: 'Quick Inquiry Action', tech: 'Action Trigger & WhatsApp API', desc: 'Menghubungkan pengunjung langsung ke tim konsultasi secara instan.' },
      ],
      metrics: [
        { label: 'Konversi Klien', before: 'DM Manual', after: 'Portal Terpusat', improvement: '↑ 140%' },
        { label: 'Rata-Rata Sesi Kunjungan', before: '1.2 menit', after: '3.8 menit', improvement: '↑ 216%' },
        { label: 'Desain Responsif', before: 'Desktop-only', after: 'Mobile & Tablet Fluid', improvement: '100% Responsif' },
      ],
      codeSnippet: {
        lang: 'typescript',
        code: `// Dynamic category tab animation for creative service showcase
export const ServiceFilter = ({ active, onSelect }: Props) => {
  const services = ['Sosial Media', 'Desain Logo', 'Company Profile', 'Reels'];
  return (
    <div className="flex flex-col gap-3 font-mono tracking-wider">
      {services.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={\`text-left transition-all duration-300 \${active === item ? 'text-cyan-400 pl-4 border-l-2 border-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'}\`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
};`,
      },
    },
    {
      id: 'PROG-05',
      title: 'Hybrid Microservices',
      subtitle: 'Kalanara Group Enterprise',
      year: '2025–Present',
      description: 'Memimpin migrasi arsitektur monolit ke hybrid microservices dengan strangler pattern. Menggunakan gRPC & NATS untuk komunikasi antar-layanan. Hasil: throughput order meningkat 400% dan deployment downtime turun 83%.',
      image: '/assets/bg/bg_portfolio.png',
      tech: ['Golang', 'Python', 'Docker', 'Kubernetes', 'NATS', 'gRPC'],
      link: '#',
      achievement: '400% Throughput Increase',
      accent: 'var(--accent-color)',
      role: 'Lead Architect & Full Stack Developer',
      team: '4–6 orang (lintas fungsi)',
      problem: [
        'Kinerja Rendah: Sistem tidak mampu menangani lonjakan permintaan (high-throughput) untuk inventory dan order pada jam sibuk.',
        'Deployment Lama: Proses deployment memakan waktu hingga 30 menit dan sering menyebabkan downtime.',
        'Skalabilitas Terbatas: Arsitektur monolit membuat horizontal scaling menjadi sulit dan mahal.',
        'Kesulitan Maintenance: Kode yang semakin besar menyulitkan pengembangan fitur baru.',
      ],
      solution: [
        'Migrasi bertahap (strangler pattern) dari monolit Laravel ke Hybrid Microservices.',
        'gRPC (Synchronous) untuk komunikasi real-time latensi rendah antar Order ↔ Inventory Service.',
        'NATS (Asynchronous / Event-Driven) sebagai event bus pub/sub untuk Analytics & notifikasi.',
        'Containerisasi Docker + orkestrasi Kubernetes dengan auto-scaling dan high availability.',
        'CI/CD Pipeline GitHub Actions: build, test, dan deploy otomatis ke staging/production.',
      ],
      architecture: [
        { component: 'Inventory Service', tech: 'Golang', desc: 'Manajemen stok barang, tracking warehouse, high-throughput read/write.' },
        { component: 'Order Service', tech: 'Golang', desc: 'Pemrosesan pesanan, validasi stok, pembuatan invoice.' },
        { component: 'Analytics Service', tech: 'Python', desc: 'Rekonsiliasi keuangan, laporan penjualan, crawling data eksternal.' },
        { component: 'Legacy Laravel', tech: 'PHP (Laravel)', desc: 'Modul lama yang masih dalam proses migrasi (strangler pattern).' },
        { component: 'NATS Event Bus', tech: 'NATS', desc: 'Komunikasi asinkron antar-layanan (pub/sub).' },
        { component: 'Kubernetes Ingress', tech: 'K8s + SSL/TLS', desc: 'API gateway, SSL termination, routing ke microservices.' },
      ],
      metrics: [
        { label: 'Deployment Downtime', before: '30 menit', after: '< 5 menit', improvement: '↓ 83%' },
        { label: 'Sistem Uptime', before: '~95%', after: '99.9%', improvement: '↑ 4.9%' },
        { label: 'Throughput Order', before: '~100 req/s', after: '~500 req/s', improvement: '↑ 400%' },
        { label: 'API Response Time', before: '~200 ms', after: '~45 ms (gRPC)', improvement: '↓ 77%' },
      ],
    },
    {
      id: 'PROG-06',
      title: 'Knowledge Management System',
      subtitle: 'Enterprise Solutions',
      year: '2025',
      description: 'Merancang arsitektur microservices dan event-driven dari nol. Implementasi full-text search PostgreSQL dan caching Redis menghasilkan waktu akses < 500ms dan akurasi pencarian 95% untuk ribuan dokumen.',
      image: '/assets/projects/kms.png',
      tech: ['Golang', 'Python', 'Next.js', 'PostgreSQL', 'Redis', 'NATS'],
      link: '#',
      achievement: '< 500ms Access Time',
      accent: 'var(--accent-tertiary)',
      role: 'Full Stack Engineer & Architect',
      team: '2 orang (arsitek + 1 frontend)',
      problem: [
        'Ribuan dokumen internal (PDF, Word, Excel, HTML) tersebar di berbagai sistem tanpa mesin pencari terpusat.',
        'Proses pencarian manual memakan waktu 5–10 detik per query.',
        'Tidak ada sistem klasifikasi atau tagging yang terstruktur.',
      ],
      solution: [
        'Sistem dirancang dari nol dengan pendekatan event-driven microservices.',
        'Full-Text Search: PostgreSQL dengan tsvector + tsquery dan indeks GIN.',
        'Caching Redis dengan strategi Cache-Aside untuk query yang sering diakses.',
        'Crawler Service (Python) menjalankan web crawling periodik dan mempublikasikan event ke NATS.',
      ],
      metrics: [
        { label: 'Waktu Akses Dokumen', before: '~5 detik', after: '< 500 ms', improvement: '↓ 90%' },
        { label: 'Akurasi Pencarian', before: '60% (manual)', after: '95%', improvement: '↑ 35%' },
        { label: 'Dokumen Terindeks', before: '0', after: '10.000+', improvement: '—' },
      ],
    },
    {
      id: 'PROG-07',
      title: 'Reactive POS',
      subtitle: 'Multi-Branch Enterprise POS',
      year: '2024–2025',
      description: 'Technical Lead untuk 6 orang. Mengarahkan restrukturisasi tim dan arsitektur, menurunkan API response time sebesar 76% (~120ms) dan mempercepat transaksi besar hingga 50%.',
      image: '/assets/projects/pos.png',
      tech: ['Node.js', 'React Native', 'Next.js', 'MySQL', 'Express'],
      link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
      achievement: 'Latency ↓ 76% · Multi-Branch',
      accent: 'var(--accent-secondary)',
      role: 'Technical Lead',
      team: '6 orang (3 squad: Backend, Frontend, Mobile)',
      solution: [
        'Restrukturisasi tim ke 3 squad terfokus dengan standar coding yang jelas.',
        'Optimasi query MySQL dan penggunaan indeks pada tabel transaksi & produk.',
        'Implementasi offline-first pada React Native untuk transaksi kasir tanpa internet.',
      ],
      metrics: [
        { label: 'Produktivitas Tim', before: 'Baseline', after: '+35%', improvement: '↑ 35%' },
        { label: 'API Response Time', before: '~500 ms', after: '~120 ms', improvement: '↓ 76%' },
      ],
    },
    {
      id: 'PROG-08',
      title: 'Hospital Information System',
      subtitle: 'RS Mitra Medika',
      year: '2025',
      description: 'Pengembangan sistem Patient Registration & Queue yang memangkas waktu tunggu pasien hingga 30%. Terintegrasi penuh dengan 60+ modul rumah sakit dan aplikasi mobile Flutter.',
      image: '/assets/projects/his.png',
      tech: ['Laravel', 'React.js', 'Vue.js', 'Flutter', 'MySQL'],
      link: '#',
      achievement: '30% Faster Patient Queue',
      accent: 'var(--accent-color)',
      role: 'Full Stack Developer',
      team: 'Tim Pengembang RS Mitra Medika',
      solution: [
        'Sistem Patient Registration & Queue digital menggantikan antrian kertas.',
        'Integrasi penuh dengan 60+ modul: Rawat Jalan, IGD, Farmasi, Keuangan.',
        'Aplikasi mobile Flutter untuk memonitor antrian dan jadwal dokter.',
      ],
      metrics: [
        { label: 'Waktu Tunggu Pasien', before: 'Baseline (kertas)', after: '-30%', improvement: '↓ 30%' },
        { label: 'Modul Terintegrasi', before: '0', after: '60+ modul', improvement: '—' },
      ],
    },
    {
      id: 'PROG-09',
      title: 'Logbook Control Room',
      subtitle: 'Industrial Operations System',
      year: '2023',
      description: 'Sistem operasional terpusat (Smart Control Room) untuk industri kritis yang mendigitalisasi log operasional dan memberikan visibilitas real-time. Memenangkan penghargaan tingkat regional.',
      image: '/assets/projects/logbook.png',
      tech: ['Laravel', 'Inertia.js', 'React', 'PostgreSQL', 'Docker'],
      link: '#',
      achievement: '🥈 Silver Award in Kalimantan',
      accent: 'var(--accent-secondary)',
      role: 'Full Stack Developer & System Architect',
      solution: [
        'Digitalisasi log operasional yang sebelumnya berbasis kertas menjadi sistem real-time.',
        'Dashboard Smart Control Room dengan monitoring seal dan status operasional live.',
        'Notifikasi anomali otomatis ke supervisor via sistem alert.',
      ],
      metrics: [
        { label: 'Log Operasional', before: 'Manual (Kertas)', after: 'Real-time Digital', improvement: '—' },
        { label: 'Penghargaan', before: '—', after: 'Silver Award', improvement: '🥈 Top 3 Kalimantan' },
      ],
    },
  ],
  analis: [
    {
      id: 'ANAL-01',
      title: 'K-Means & Cosine Similarity',
      subtitle: 'Skripsi S1 — Data Mining',
      year: '2023',
      description: 'Penelitian ilmiah implementasi metode K-Means Clustering dan Cosine Similarity untuk klasifikasi dan rekomendasi topik skripsi berdasarkan kesesuaian konten. IPK 3.51 — Predikat Memuaskan.',
      image: '/assets/bg/bg_education.png',
      tech: ['Python', 'Scikit-learn', 'NLTK', 'Pandas', 'Matplotlib'],
      achievement: 'GPA 3.51 · UNTAN 2023',
      accent: 'var(--accent-color)',
    },
    {
      id: 'ANAL-02',
      title: 'Flood Zone Prediction Model',
      subtitle: 'Geospatial Data Analysis — SIBeBan',
      year: '2023',
      description: 'Pemodelan analisis risiko banjir berbasis data curah hujan historis, ketinggian DEM, dan aliran sungai menggunakan PostGIS dan Python untuk menghasilkan peta risiko dinamis.',
      image: '/assets/bg/bg_portfolio.png',
      tech: ['PostGIS', 'Python', 'QGIS', 'BMKG API', 'GeoJSON'],
      achievement: 'Real-Time Flood Risk Mapping',
      accent: 'var(--accent-secondary)',
    },
    {
      id: 'ANAL-03',
      title: 'Hospital Workflow Analysis',
      subtitle: 'Requirements Engineering — HIS',
      year: '2025',
      description: 'Analisis mendalam proses bisnis rumah sakit (Rawat Jalan, IGD, Farmasi, Keuangan) untuk merancang arsitektur sistem HIS 60+ modul. Melibatkan wawancara stakeholder, dokumentasi alur kerja, dan pemodelan BPMN.',
      image: '/assets/projects/his.png',
      tech: ['BPMN', 'UML', 'ERD', 'Business Analysis', 'Figma'],
      achievement: '60+ Module Systems Analysis',
      accent: 'var(--accent-tertiary)',
    },
    {
      id: 'ANAL-04',
      title: 'Team Performance Analytics',
      subtitle: 'Technical Lead — Reactive Inc.',
      year: '2024–2025',
      description: 'Analisis kinerja rutin tim produksi di Reactive Inc. mencakup velocity sprint, code quality metrics, dan bottleneck identification untuk meningkatkan efisiensi tim pengembang 4–6 orang.',
      image: '/assets/bg/bg_experience.png',
      tech: ['Sprint Analytics', 'KPI Tracking', 'Agile Metrics', 'Jira', 'SonarQube'],
      achievement: 'Leading 4–6 Developer Team',
      accent: 'var(--accent-color)',
    },
  ],
  desainer: [
    {
      id: 'DES-01',
      title: 'Hulu Nautika Khatulistiwa',
      subtitle: 'Creative Studio & Social Media Workspace UI',
      year: '2024–2025',
      description: 'Desain antarmuka platform agensi kreatif dan workspace media sosial interaktif. Memadukan layout split sinematik, glowing neon elements, tipografi tegas, dan galeri portofolio visual untuk Reels, Desain Logo, Company Profile, dan Feeds.',
      image: '/assets/projects/hulunautika.png',
      tech: ['Figma', 'Next.js', 'TailwindCSS', 'Framer Motion', 'UI/UX Design'],
      link: 'https://hulunautika.com/',
      achievement: 'Creative Studio UI · Neon Workspace Aesthetic',
      accent: 'var(--accent-tertiary)',
    },
    {
      id: 'DES-02',
      title: 'PT Pelayanan Energi Batam',
      subtitle: 'Corporate Energy & Bilingual Portal UX',
      year: '2024–2025',
      description: 'Desain antarmuka korporasi energi nasional (Danantara / PLN Batam) dengan estetika "Energi Untuk Negeri". Menampilkan tema dark mode modern, tata letak bilingual (ID/EN), kartu portofolio pembangkit, dan visualisasi data infrastruktur kelistrikan.',
      image: '/assets/projects/danantara_peb.png',
      tech: ['Figma', 'React', 'TailwindCSS', 'Bilingual UI', 'Design System'],
      link: 'https://new.peb.co.id/',
      achievement: 'National Corporate UX · Dual Language Interface',
      accent: 'var(--accent-color)',
    },
    {
      id: 'DES-03',
      title: 'Digital Office Kemenhub RI',
      subtitle: 'GovTech Portal & Administration Design System',
      year: '2024–2025',
      description: 'Desain antarmuka sistem administrasi perkantoran Sekretariat Jenderal Kementerian Perhubungan RI. Dirancang dengan prinsip kejelasan visual, kemudahan akses modul presensi dan layanan data bagi 10.000+ pegawai aparatur sipil negara.',
      image: '/assets/projects/digitaloffice.png',
      tech: ['Figma', 'UI Kit', 'TailwindCSS', 'Accessibility (a11y)', 'GovTech UX'],
      link: 'https://digitaloffice.kemenhub.go.id/',
      achievement: '10.000+ Users Scalable GovTech UX',
      accent: 'var(--accent-secondary)',
    },
    {
      id: 'DES-04',
      title: 'Atase Perhubungan Kuala Lumpur',
      subtitle: 'Diplomatic Virtual Office UI Design',
      year: '2024–2025',
      description: 'Desain antarmuka portal diplomasi perhubungan dan Virtual Office KBRI Kuala Lumpur. Mengedepankan identitas kenegaraan resmi, keteraturan navigasi konektivitas antar-negara, dan aksesibilitas dokumen bilateral.',
      image: '/assets/projects/athubkl.png',
      tech: ['Figma', 'TailwindCSS', 'Information Architecture', 'Responsive UX'],
      link: 'https://athubkl.kemenhub.go.id/atase-perhubungan/',
      achievement: 'Diplomatic Portal Design · Cross-Border Usability',
      accent: 'var(--accent-color)',
    },
    {
      id: 'DES-05',
      title: 'Borneo Digital Rimba',
      subtitle: 'Portofolio Pribadi — Cyberpunk Dayak',
      year: '2025',
      description: 'Desain UI/UX portofolio personal bertema "Borneo Digital Rimba" — memadukan estetika cyberpunk dengan motif budaya Dayak Kalimantan. Full-page scrolljacked, 3D Three.js background, animasi Framer Motion.',
      image: '/assets/bg/bg_hero.png',
      tech: ['Figma', 'Astro', 'React', 'Three.js', 'Framer Motion', 'CSS Art'],
      link: '/',
      achievement: 'Custom Dayak Motifs · Cinematic UX',
      accent: 'var(--accent-color)',
    },
    {
      id: 'DES-06',
      title: 'Reactive POS Interface',
      subtitle: 'Enterprise UI/UX Design',
      year: '2024',
      description: 'Desain antarmuka aplikasi kasir enterprise: dashboard multi-branch, manajemen produk, laporan penjualan, dan sistem warehouse. Fokus pada efisiensi alur kerja kasir dan readability data.',
      image: '/assets/projects/pos.png',
      tech: ['Figma', 'React', 'TailwindCSS', 'Chart.js', 'UX Research'],
      link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
      achievement: 'Enterprise POS UX · Multi-Branch',
      accent: 'var(--accent-tertiary)',
    },
  ],
};

export const categories: { key: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'programmer', label: 'PROGRAMMER', icon: <Code2 size={16} />, color: 'var(--accent-color)' },
  { key: 'analis', label: 'ANALIS', icon: <BarChart2 size={16} />, color: 'var(--accent-secondary)' },
  { key: 'desainer', label: 'DESAINER', icon: <Palette size={16} />, color: 'var(--accent-tertiary)' },
];
