import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Home, BookOpen, User, FileText, Mail, ExternalLink,
  Download, ArrowLeft, Code2, BarChart2, Palette,
  Send, Menu, X, ChevronRight, TrendingUp, Award, Calendar,
  MapPin, Phone,
} from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
type Section = 'home' | 'case-studies' | 'detail' | 'about' | 'resume' | 'contact';
type Category = 'programmer' | 'analis' | 'desainer' | 'all';

interface MetricRow { label: string; before: string; after: string; improvement: string; }
interface ArchRow { component: string; tech: string; desc: string; }
interface TimelineEntry { period: string; company: string; role: string; bullets: string[]; accent: string; }

interface PortfolioItem {
  id: string; slug: string; title: string; subtitle: string; year: string;
  description: string; image: string; tech: string[]; link?: string;
  achievement?: string; accent: string; category: Exclude<Category, 'all'>;
  role?: string; team?: string; problem?: string[]; rationale?: string;
  solution?: string[]; architecture?: ArchRow[]; metrics?: MetricRow[];
  codeSnippet?: { lang: string; code: string }; learnings?: string[];
}

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const items: PortfolioItem[] = [
  {
    id: 'PROG-01', slug: 'hybrid-microservices', category: 'programmer',
    title: 'Hybrid Microservices Migration', subtitle: 'Kalanara Group Indonesia',
    year: '2025 – Present', image: '/assets/bg/bg_portfolio.png',
    tech: ['Golang', 'Python', 'Docker', 'Kubernetes', 'NATS', 'gRPC'],
    link: '#', achievement: '400% Throughput ↑', accent: '#00f2fe',
    role: 'Full Stack Developer & Lead Architect',
    team: '4–6 orang (lintas fungsi)',
    description: 'Memimpin migrasi dari Laravel monolith ke hybrid microservices menggunakan strangler pattern. gRPC & NATS untuk inter-service communication. Hasil: throughput order naik 400%, downtime turun 83%.',
    problem: [
      'Kinerja rendah: monolit tidak mampu menangani high-throughput inventory & order saat jam sibuk.',
      'Deployment 30 menit dan sering downtime produksi.',
      'Horizontal scaling sulit dan mahal pada arsitektur monolit.',
      'Kodebase besar menyulitkan pengembangan fitur baru (high coupling).',
    ],
    rationale: 'Mengapa Golang? Performa tinggi dan native concurrency ideal untuk high-throughput services. Mengapa gRPC vs REST? Binary protocol, latensi lebih rendah, dan strongly-typed contract. Mengapa Strangler Pattern? Migrasi bertahap meminimalkan risiko bisnis — sistem lama dan baru berjalan paralel hingga monolit sepenuhnya digantikan.',
    solution: [
      'Migrasi bertahap (strangler pattern): Laravel tetap berjalan sementara service baru dibangun.',
      'gRPC synchronous antara Order ↔ Inventory Service dengan latensi ~45ms.',
      'NATS sebagai event bus pub/sub: Analytics & layanan lain bereaksi tanpa coupling langsung.',
      'Kubernetes: auto-scaling, rolling deploy, zero-downtime update.',
      'GitHub Actions CI/CD: build → test → staging → production otomatis.',
    ],
    architecture: [
      { component: 'Inventory Service', tech: 'Golang', desc: 'Manajemen stok, tracking warehouse, high-throughput read/write.' },
      { component: 'Order Service', tech: 'Golang', desc: 'Pemrosesan pesanan, validasi stok, pembuatan invoice.' },
      { component: 'Analytics Service', tech: 'Python', desc: 'Rekonsiliasi keuangan, laporan penjualan, crawling data eksternal.' },
      { component: 'NATS Event Bus', tech: 'NATS', desc: 'Komunikasi asinkron pub/sub antar-layanan.' },
      { component: 'Kubernetes Ingress', tech: 'K8s + SSL/TLS', desc: 'API gateway, load balancing, SSL termination.' },
    ],
    metrics: [
      { label: 'Deployment Downtime', before: '30 menit', after: '< 5 menit', improvement: '↓ 83%' },
      { label: 'Sistem Uptime', before: '~95%', after: '99.9%', improvement: '↑ 4.9%' },
      { label: 'Throughput Order', before: '~100 req/s', after: '~500 req/s', improvement: '↑ 400%' },
      { label: 'API Response Time', before: '~200 ms', after: '~45 ms', improvement: '↓ 77%' },
    ],
    codeSnippet: { lang: 'protobuf',
      code: `syntax = "proto3";
service InventoryService {
  rpc GetStock (StockRequest) returns (StockResponse);
  rpc UpdateStock (UpdateReq) returns (UpdateRes);
}
message StockRequest { string product_id = 1; }
message StockResponse {
  string product_id = 1;
  int32 quantity    = 2;
  string warehouse  = 3;
}`,
    },
    learnings: [
      'Distributed tracing (Jaeger) sebaiknya diimplementasikan di awal, bukan setelah masalah muncul.',
      'Schema registry untuk NATS payload sangat membantu event versioning.',
      'K8s resource limits perlu di-tune berdasarkan profil traffic aktual.',
    ],
  },
  {
    id: 'PROG-02', slug: 'knowledge-management-system', category: 'programmer',
    title: 'Knowledge Management System', subtitle: 'Enterprise Internal — Greenfield',
    year: '2025', image: '/assets/projects/kms.png',
    tech: ['Golang', 'Python', 'Next.js', 'PostgreSQL', 'Redis', 'NATS'],
    link: '#', achievement: '< 500ms Access Time', accent: '#39ff14',
    role: 'Full Stack Engineer & Architect (End-to-End)',
    team: '2 orang (arsitek + 1 frontend)',
    description: 'Merancang arsitektur microservices + event-driven dari nol. PostgreSQL FTS + Redis caching menghasilkan akses < 500ms dan akurasi pencarian 95% untuk 10.000+ dokumen.',
    problem: [
      'Ribuan dokumen internal (PDF, Word, Excel) tersebar tanpa mesin pencari terpusat.',
      'Pencarian manual memakan 5–10 detik per query.',
      'Tidak ada sistem klasifikasi atau tagging terstruktur.',
    ],
    rationale: 'Mengapa PostgreSQL FTS vs Elasticsearch? Untuk 10K dokumen, overhead ES tidak sepadan — tsvector sudah sangat powerful. Mengapa NATS vs Kafka? Footprint lebih kecil, latensi lebih rendah, cukup untuk skala internal.',
    solution: [
      'PostgreSQL Full-Text Search: tsvector + tsquery + indeks GIN untuk query < 50ms.',
      'Redis Cache-Aside: hasil query yang sering diakses di-cache dengan TTL dinamis.',
      'Python Crawler Service: crawling periodik + publish event ke NATS.',
      'Next.js SSR: SEO optimal dan TTFB rendah.',
    ],
    architecture: [
      { component: 'API Gateway', tech: 'Golang (REST + gRPC)', desc: 'Routing request ke layanan terkait.' },
      { component: 'Document Service', tech: 'Golang', desc: 'CRUD dokumen, metadata retrieval.' },
      { component: 'Crawler Service', tech: 'Python', desc: 'Web crawling periodik + ekstraksi konten.' },
      { component: 'Cache Layer', tech: 'Redis', desc: 'Cache-Aside untuk query FTS yang sering diakses.' },
      { component: 'Event Bus', tech: 'NATS', desc: 'Komunikasi asinkron antar-layanan.' },
    ],
    metrics: [
      { label: 'Waktu Akses Dokumen', before: '~5 detik', after: '< 500 ms', improvement: '↓ 90%' },
      { label: 'Akurasi Pencarian', before: '60% (manual)', after: '95%', improvement: '↑ 35%' },
      { label: 'Dokumen Terindeks', before: '0', after: '10.000+', improvement: '—' },
    ],
    codeSnippet: { lang: 'sql',
      code: `-- GIN Index for FTS
CREATE INDEX idx_fts ON documents
  USING GIN(to_tsvector('indonesian', content));

-- Ranked Search
SELECT title, ts_rank(fts, q) AS rank
FROM documents,
     to_tsquery('indonesian', 'golang & microservices') q
WHERE to_tsvector('indonesian', content) @@ q
ORDER BY rank DESC LIMIT 10;`,
    },
    learnings: [
      'Cache invalidation perlu strategi explicit, bukan hanya TTL.',
      'NLP pipeline Bahasa Indonesia butuh corpus yang lebih spesifik.',
    ],
  },
  {
    id: 'PROG-03', slug: 'digital-office-kemenhub', category: 'programmer',
    title: 'Digital Office — Presensi Nasional', subtitle: 'Kementerian Perhubungan RI',
    year: '2025', image: '/assets/projects/presensi.png',
    tech: ['Laravel', 'PostgreSQL', 'Redis', 'Docker'],
    link: 'https://digitaloffice.kemenhub.go.id/', achievement: '10.000+ Active Users', accent: '#00f2fe',
    role: 'Web Developer — Modul Attendance', team: 'Tim Pusdatin Kemenhub',
    description: 'Pengembangan backend sistem presensi nasional untuk 10.000+ pegawai. Mengatasi lonjakan trafik jam sibuk dengan connection pooling, Redis caching, dan materialized view.',
    problem: [
      'Lonjakan trafik ekstrem di jam masuk (07:30–08:30) dan pulang (16:00–17:00).',
      'Kebutuhan laporan presensi real-time untuk HR di seluruh unit nasional.',
    ],
    solution: [
      'Indeks database pada user_id, date, status untuk high concurrency.',
      'Laravel Queue + Redis: notifikasi asinkron non-blocking.',
      'Database connection pooling untuk mengurangi overhead.',
      'Materialized view PostgreSQL untuk laporan real-time pre-computed.',
    ],
    metrics: [
      { label: 'API Response Time', before: '> 2 detik', after: '< 200 ms', improvement: '↓ 90%' },
      { label: 'Beban Admin HR', before: '100% Manual', after: '30% Manual', improvement: '↓ 70%' },
      { label: 'Skala Pengguna', before: 'Manual/Kertas', after: '10.000+', improvement: 'Nasional' },
    ],
  },
  {
    id: 'PROG-04', slug: 'reactive-pos', category: 'programmer',
    title: 'Reactive POS Enterprise', subtitle: 'Reactive Incorporated',
    year: '2024–2025', image: '/assets/projects/pos.png',
    tech: ['Node.js', 'React Native', 'Next.js', 'MySQL', 'Express'],
    link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
    achievement: 'Productivity ↑ 35% · Latency ↓ 76%', accent: '#ff00de',
    role: 'Technical Lead', team: '6 orang (3 squad: Backend, Frontend, Mobile)',
    description: 'Technical Lead untuk 6 engineer. Restrukturisasi arsitektur POS enterprise, menurunkan API response time 76% ke ~120ms, rekonsiliasi dipercepat 50%.',
    problem: [
      'Tidak ada standar arsitektur — inkonsistensi antar squad.',
      'API ~500ms menghambat transaksi kasir saat ramai.',
      'Rekonsiliasi akhir hari 2+ jam karena query tidak teroptimasi.',
    ],
    solution: [
      'Restrukturisasi 3 squad dengan standar coding & code review wajib.',
      'Optimasi query MySQL + composite index pada tabel transaksi & produk.',
      'React Native offline-first: transaksi tetap jalan tanpa internet.',
      'Background job async untuk rekonsiliasi non-blocking.',
    ],
    architecture: [
      { component: 'Backend API', tech: 'Node.js + Express', desc: 'REST API dengan JWT auth + rate limiting.' },
      { component: 'Mobile Kasir', tech: 'React Native', desc: 'Offline-first dengan SQLite sync.' },
      { component: 'Dashboard Web', tech: 'Next.js', desc: 'Laporan multi-cabang real-time.' },
      { component: 'Database', tech: 'MySQL', desc: 'Composite index pada tabel transaksi & produk.' },
    ],
    metrics: [
      { label: 'Produktivitas Tim', before: 'Baseline', after: '+35%', improvement: '↑ 35%' },
      { label: 'API Response Time', before: '~500 ms', after: '~120 ms', improvement: '↓ 76%' },
      { label: 'Proses Rekonsiliasi', before: '2+ jam', after: '1 jam', improvement: '↓ 50%' },
    ],
    learnings: [
      'Technical debt harus ditangani inkremental, bukan big bang refactoring.',
      'Standar coding + code review culture berdampak lebih besar daripada tools baru.',
    ],
  },
  {
    id: 'PROG-05', slug: 'hospital-information-system', category: 'programmer',
    title: 'Hospital Information System', subtitle: 'RS Mitra Medika',
    year: '2025', image: '/assets/projects/his.png',
    tech: ['Laravel', 'React.js', 'Vue.js', 'Flutter', 'MySQL'],
    link: '#', achievement: '30% Faster Patient Queue', accent: '#39ff14',
    role: 'Full Stack Developer', description: 'Sistem Patient Registration & Queue digital memangkas waktu tunggu 30%. Terintegrasi 60+ modul HIS dan mobile Flutter untuk monitoring real-time.',
    solution: [
      'Antrian digital menggantikan kertas — pasien monitor posisi real-time.',
      'Integrasi 60+ modul: Rawat Jalan, IGD, Farmasi, Laboratorium, Keuangan.',
      'Mobile Flutter: monitoring antrian & jadwal dokter dari smartphone.',
    ],
    metrics: [
      { label: 'Waktu Tunggu Pasien', before: 'Baseline (kertas)', after: '–30%', improvement: '↓ 30%' },
      { label: 'Modul Terintegrasi', before: '0', after: '60+ modul', improvement: '—' },
    ],
  },
  {
    id: 'PROG-06', slug: 'logbook-control-room', category: 'programmer',
    title: 'Logbook Smart Control Room', subtitle: 'Industrial Operations',
    year: '2023', image: '/assets/projects/logbook.png',
    tech: ['Laravel', 'Inertia.js', 'React', 'PostgreSQL', 'Docker'],
    link: '#', achievement: '🥈 Silver Award — Kalimantan', accent: '#fbbf24',
    role: 'Full Stack Developer & Architect',
    description: 'Digitalisasi log operasional industri kritis dari berbasis kertas ke sistem real-time. Dashboard monitoring seal dan status operasional. Silver Award & Top 3 Kalimantan.',
    solution: [
      'Dashboard Smart Control Room: monitoring seal dan status operasional live.',
      'Notifikasi anomali otomatis ke supervisor via alert system.',
      'Docker deployment di lingkungan industri untuk portabilitas.',
    ],
    metrics: [
      { label: 'Log Operasional', before: 'Manual (Kertas)', after: 'Real-time Digital', improvement: '—' },
      { label: 'Penghargaan', before: '—', after: 'Silver Award', improvement: '🥈 Top 3' },
    ],
  },
  {
    id: 'ANAL-01', slug: 'kmeans-cosine', category: 'analis',
    title: 'K-Means & Cosine Similarity', subtitle: 'Skripsi S1 — Data Mining',
    year: '2023', image: '/assets/bg/bg_education.png',
    tech: ['Python', 'Scikit-learn', 'NLTK', 'Pandas', 'Matplotlib'],
    achievement: 'GPA 3.51 · UNTAN 2023', accent: '#00f2fe',
    description: 'Penelitian implementasi K-Means Clustering dan Cosine Similarity untuk klasifikasi dan rekomendasi topik skripsi berdasarkan kesesuaian konten.',
  },
  {
    id: 'ANAL-02', slug: 'flood-zone-prediction', category: 'analis',
    title: 'Flood Zone Prediction Model', subtitle: 'Geospatial Analysis — SIBeBan',
    year: '2023', image: '/assets/bg/bg_portfolio.png',
    tech: ['PostGIS', 'Python', 'QGIS', 'BMKG API', 'GeoJSON'],
    achievement: 'Real-Time Flood Risk Mapping', accent: '#39ff14',
    description: 'Pemodelan risiko banjir berbasis data curah hujan historis, ketinggian DEM, dan aliran sungai untuk menghasilkan peta risiko dinamis.',
  },
  {
    id: 'ANAL-03', slug: 'hospital-workflow', category: 'analis',
    title: 'Hospital Workflow Analysis', subtitle: 'Requirements Engineering — HIS',
    year: '2025', image: '/assets/projects/his.png',
    tech: ['BPMN', 'UML', 'ERD', 'Business Analysis', 'Figma'],
    achievement: '60+ Module Systems Analysis', accent: '#ff00de',
    description: 'Analisis mendalam proses bisnis rumah sakit untuk merancang arsitektur HIS 60+ modul. Stakeholder interviews, BPMN, dan UML modeling.',
  },
  {
    id: 'ANAL-04', slug: 'team-performance', category: 'analis',
    title: 'Team Performance Analytics', subtitle: 'Technical Lead — Reactive Inc.',
    year: '2024–2025', image: '/assets/bg/bg_experience.png',
    tech: ['Sprint Analytics', 'KPI Tracking', 'Agile Metrics', 'Jira', 'SonarQube'],
    achievement: 'Leading 4–6 Developer Team', accent: '#00f2fe',
    description: 'Analisis kinerja tim 4–6 developer: velocity sprint, code quality metrics, dan bottleneck identification untuk meningkatkan efisiensi pengembangan.',
  },
  {
    id: 'DES-01', slug: 'borneo-digital-rimba', category: 'desainer',
    title: 'Borneo Digital Rimba', subtitle: 'Personal Portfolio — Cyberpunk Dayak',
    year: '2025', image: '/assets/bg/bg_hero.png',
    tech: ['Figma', 'Astro', 'React', 'Three.js', 'Framer Motion'],
    link: '/', achievement: 'Custom Dayak Motifs · Cinematic UX', accent: '#00f2fe',
    description: 'Portofolio personal bertema "Borneo Digital Rimba" — memadukan estetika cyberpunk dengan motif budaya Dayak Kalimantan. 3D Three.js background, Framer Motion.',
  },
  {
    id: 'DES-02', slug: 'reactive-pos-ui', category: 'desainer',
    title: 'Reactive POS Interface', subtitle: 'Enterprise UI/UX Design',
    year: '2024', image: '/assets/projects/pos.png',
    tech: ['Figma', 'React', 'TailwindCSS', 'Chart.js', 'UX Research'],
    link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
    achievement: 'Enterprise POS UX · Multi-Branch', accent: '#ff00de',
    description: 'Desain UI/UX POS enterprise: dashboard multi-cabang, manajemen produk, laporan penjualan, dan warehouse. Fokus pada efisiensi alur kerja kasir.',
  },
  {
    id: 'DES-03', slug: 'hospital-dashboard-ui', category: 'desainer',
    title: 'Hospital Dashboard UI', subtitle: 'Healthcare Interface Design',
    year: '2025', image: '/assets/projects/his.png',
    tech: ['Figma', 'React', 'Inertia.js', 'UI Kit', 'Accessibility'],
    achievement: 'Medical Grade UX · 60+ Modules', accent: '#39ff14',
    description: 'Dashboard medis untuk 60+ modul HIS: Rawat Jalan, IGD triage, farmasi, laporan keuangan. Prioritas aksesibilitas dan efisiensi tenaga medis.',
  },
];

const timeline: TimelineEntry[] = [
  {
    period: 'Des 2025 – Sekarang', company: 'Kalanara Group Indonesia',
    role: 'Full Stack Developer & Lead Architect', accent: '#00f2fe',
    bullets: [
      'Memimpin migrasi monolit Laravel → Hybrid Microservices (Golang + Python)',
      'Merancang inter-service communication via gRPC & NATS event bus',
      'Orkestrasi Docker + Kubernetes dengan CI/CD GitHub Actions',
      'Hasil: throughput ↑ 400%, deployment downtime ↓ 83%',
    ],
  },
  {
    period: '2025', company: 'RS Mitra Medika',
    role: 'Full Stack Developer — HIS', accent: '#39ff14',
    bullets: [
      'Membangun HIS dengan 60+ modul terintegrasi (Rawat Jalan, IGD, Farmasi)',
      'Mobile Flutter untuk monitoring antrian & jadwal dokter real-time',
      'Memangkas waktu tunggu pasien sebesar 30%',
    ],
  },
  {
    period: '2025', company: 'Kementerian Perhubungan RI (Pusdatin)',
    role: 'Web Developer — Modul Attendance', accent: '#00f2fe',
    bullets: [
      'Backend presensi nasional untuk 10.000+ pegawai Kemenhub',
      'Redis caching + materialized view untuk menangani peak hour',
      'API response time dari >2 detik menjadi <200ms',
    ],
  },
  {
    period: '2024 – 2025', company: 'Reactive Incorporated',
    role: 'Technical Lead', accent: '#ff00de',
    bullets: [
      'Memimpin tim 6 engineer (3 squad: Backend, Frontend, Mobile)',
      'Restrukturisasi arsitektur POS + standar coding & review wajib',
      'Produktivitas tim ↑ 35%, API response time ↓ 76%',
    ],
  },
  {
    period: '2023', company: 'Proyek Industri — Logbook Smart Control Room',
    role: 'Full Stack Developer & Architect', accent: '#fbbf24',
    bullets: [
      'Digitalisasi log operasional industri kritis menjadi real-time',
      'Dashboard monitoring seal dan status operasional live',
      '🥈 Silver Award & Top 3 Best Presentation se-Kalimantan',
    ],
  },
];

const techStack = [
  { cat: 'Backend', icon: '🖥️', skills: [{ n: 'Golang', v: 95 }, { n: 'Python', v: 90 }, { n: 'Node.js', v: 85 }, { n: 'Laravel', v: 88 }] },
  { cat: 'Frontend', icon: '🌐', skills: [{ n: 'React.js', v: 92 }, { n: 'Next.js', v: 88 }, { n: 'TypeScript', v: 87 }, { n: 'Vue.js', v: 80 }] },
  { cat: 'Mobile', icon: '📱', skills: [{ n: 'React Native', v: 82 }, { n: 'Flutter', v: 78 }] },
  { cat: 'Database & Cache', icon: '🗄️', skills: [{ n: 'PostgreSQL', v: 90 }, { n: 'MySQL', v: 88 }, { n: 'Redis', v: 85 }] },
  { cat: 'DevOps', icon: '☁️', skills: [{ n: 'Docker', v: 90 }, { n: 'Kubernetes', v: 82 }, { n: 'GitHub Actions', v: 88 }] },
  { cat: 'Protocols', icon: '🔌', skills: [{ n: 'gRPC', v: 85 }, { n: 'NATS', v: 82 }, { n: 'REST API', v: 95 }] },
];

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function Tag({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
      padding: '3px 9px', border: `1px solid ${accent ?? 'rgba(255,255,255,0.15)'}`,
      color: accent ?? 'rgba(255,255,255,0.5)', borderRadius: '3px',
      background: accent ? `${accent}12` : 'transparent',
    }}>{children}</span>
  );
}

function Divider({ accent }: { accent?: string }) {
  return (
    <div style={{
      height: '1px', margin: '2rem 0',
      background: `linear-gradient(90deg, ${accent ?? 'rgba(255,255,255,0.1)'}, transparent)`,
    }} />
  );
}

function SkillBar({ name, level, accent }: { name: string; level: number; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: accent }}>{level}%</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ height: '100%', background: accent, boxShadow: `0 0 6px ${accent}` }}
        />
      </div>
    </div>
  );
}

function StatCounter({ value, suffix = '', label, accent }: { value: number; suffix?: string; label: string; accent: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = value / 60;
    const t = setInterval(() => { n += step; if (n >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(n)); }, 16);
    return () => clearInterval(t);
  }, [inView, value]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: accent, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginTop: '0.5rem' }}>{label}</div>
    </div>
  );
}

const pageVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

/* ══════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════ */
const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'HOME', icon: <Home size={11} /> },
  { id: 'case-studies', label: 'CASE STUDIES', icon: <BookOpen size={11} /> },
  { id: 'about', label: 'ABOUT', icon: <User size={11} /> },
  { id: 'resume', label: 'RESUME', icon: <FileText size={11} /> },
  { id: 'contact', label: 'CONTACT', icon: <Mail size={11} /> },
];

function NavBar({ current, onNav }: { current: Section; onNav: (s: Section) => void }) {
  const [open, setOpen] = useState(false);
  const active = current === 'detail' ? 'case-studies' : current;
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '58px',
        background: 'rgba(1,4,9,0.88)', backdropFilter: 'blur(30px) saturate(180%)',
        borderBottom: '1px solid rgba(0,242,254,0.2)',
        boxShadow: '0 1px 30px rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        width: '100%',
      }}>
        {/* Brand */}
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}>
          <div style={{ color: 'var(--accent-color)', filter: 'drop-shadow(0 0 6px var(--accent-color))' }}>
            <DayakMotifs.AsoCorner size={30} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.42rem', color: 'var(--accent-color)', letterSpacing: '4px' }}>BORNEO.DIGITAL.RIMBA</div>
            <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-color)', letterSpacing: '2px', lineHeight: 1 }}>ABU RIZA</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="spa-nav-desktop" style={{ display: 'flex', gap: '2px' }}>
          {NAV_ITEMS.map(it => (
            <motion.button key={it.id} onClick={() => onNav(it.id)}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 14px',
                background: active === it.id ? 'rgba(0,242,254,0.1)' : 'transparent',
                border: 'none', borderRadius: '6px', cursor: 'pointer', position: 'relative',
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 800,
                letterSpacing: '1.5px', color: active === it.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.25s',
              }}>
              {it.icon} {it.label}
              {active === it.id && (
                <motion.div layoutId="nav-pill"
                  style={{ position: 'absolute', bottom: 3, left: '15%', right: '15%', height: '2px', background: 'var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)', borderRadius: '1px' }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '2px' }} className="spa-nav-desktop">
            ← MAIN SITE
          </a>
          <button className="spa-nav-mobile" onClick={() => setOpen(o => !o)}
            style={{ background: 'none', border: '1px solid rgba(0,242,254,0.3)', color: 'var(--accent-color)', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'none' }}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: '58px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(1,4,9,0.97)', borderBottom: '1px solid rgba(0,242,254,0.1)',
              padding: '1rem', display: 'flex', flexDirection: 'column', gap: '4px',
            }}>
            {NAV_ITEMS.map(it => (
              <button key={it.id} onClick={() => { onNav(it.id); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
                  background: active === it.id ? 'rgba(0,242,254,0.1)' : 'transparent',
                  border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
                  color: active === it.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)',
                }}>
                {it.icon} {it.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .spa-nav-desktop { display: none !important; }
          .spa-nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════ */
function HomePage({ onNav, onDetail }: { onNav: (s: Section) => void; onDetail: (item: PortfolioItem) => void }) {
  const featured = items.filter(i => ['PROG-01', 'PROG-02', 'PROG-04'].includes(i.id));
  return (
    <div style={{ overflowY: 'auto', height: '100%', paddingTop: '58px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(2rem, 8vw, 6rem)', textAlign: 'center', position: 'relative',
        width: '100%',
      }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-color)', letterSpacing: '5px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--accent-color)' }} />
            FULL STACK ENGINEER & TECHNICAL LEAD
            <div style={{ width: '30px', height: '1px', background: 'var(--accent-color)' }} />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-4px', color: 'var(--text-color)', marginBottom: '1.5rem' }}>
            ABU<br /><span style={{ color: 'var(--accent-color)', textShadow: '0 0 40px var(--accent-color)' }}>RIZA</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            "Building Scalable, Resilient, and High-Performance Systems"
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button onClick={() => onNav('case-studies')} whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-color)40' }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2rem', background: 'var(--accent-color)', color: '#010409',
                border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900,
                letterSpacing: '2px', cursor: 'pointer', borderRadius: '8px',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}>
              VIEW CASE STUDIES →
            </motion.button>
            <motion.a href="/print" target="_blank" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2rem', border: '1px solid rgba(0,242,254,0.4)', color: 'var(--accent-color)',
                background: 'rgba(0,242,254,0.08)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900,
                letterSpacing: '2px', cursor: 'pointer', borderRadius: '8px', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}>
              <Download size={14} /> DOWNLOAD CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}>
          <ChevronRight size={20} style={{ transform: 'rotate(90deg)', color: 'var(--accent-color)' }} />
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 4rem)', borderTop: '1px solid rgba(0,242,254,0.08)', borderBottom: '1px solid rgba(0,242,254,0.08)', background: 'rgba(1,4,9,0.6)', backdropFilter: 'blur(20px)', width: '100%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '3rem' }}>
          <StatCounter value={83} suffix="%" label="DEPLOYMENT DOWNTIME ↓" accent="var(--accent-color)" />
          <StatCounter value={10} suffix="K+" label="DAILY ACTIVE USERS" accent="var(--accent-tertiary)" />
          <StatCounter value={400} suffix="%" label="THROUGHPUT INCREASE ↑" accent="var(--accent-secondary)" />
          <StatCounter value={6} suffix="" label="ENGINEERS LED" accent="var(--accent-color)" />
          <StatCounter value={4} suffix="+" label="YEARS EXPERIENCE" accent="var(--accent-tertiary)" />
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 5rem)', width: '100%' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '4px' }}>FEATURED_PROJECTS::TOP_3</div>
              <h2 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-color)', margin: '0.4rem 0 0', letterSpacing: '1px' }}>PROYEK UNGGULAN</h2>
            </div>
            <motion.button onClick={() => onNav('case-studies')} whileHover={{ x: 5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', cursor: 'pointer' }}>
              LIHAT SEMUA <ChevronRight size={14} />
            </motion.button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featured.map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i} onClick={() => onDetail(item)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECT CARD (shared)
══════════════════════════════════════════════════════ */
function ProjectCard({ item, index, onClick }: { item: PortfolioItem; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6, boxShadow: `0 20px 60px ${item.accent}20` }}
      onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{
        background: 'rgba(1,4,9,0.65)', border: `1px solid ${item.accent}30`,
        backdropFilter: 'blur(20px) saturate(150%)',
        borderRadius: '12px', overflow: 'hidden', height: '100%',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>
        {/* Image */}
        <div style={{ height: '160px', overflow: 'hidden', position: 'relative', background: '#000' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(1,4,9,0.9), transparent)` }} />
          <div style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: item.accent, fontWeight: 900, letterSpacing: '2px' }}>{item.id}</div>
          {item.achievement && (
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', fontSize: '0.7rem', fontWeight: 700, color: item.accent, fontFamily: 'var(--font-mono)' }}>
              {item.achievement}
            </div>
          )}
        </div>
        {/* Body */}
        <div style={{ padding: '1.2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '0.4rem' }}>{item.year}</div>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', color: 'var(--text-color)', letterSpacing: '0.5px', marginBottom: '0.3rem', textTransform: 'uppercase' }}>{item.title}</h3>
          <div style={{ fontSize: '0.78rem', color: item.accent, fontFamily: 'var(--font-mono)', marginBottom: '0.8rem' }}>{item.subtitle}</div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '1rem' }}>{item.description.slice(0, 120)}...</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {item.tech.slice(0, 4).map(t => <Tag key={t} accent={item.accent}>{t}</Tag>)}
          </div>
          <motion.div whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1rem', color: item.accent, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '2px' }}>
            VIEW DETAILS <ChevronRight size={12} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   CASE STUDIES PAGE
══════════════════════════════════════════════════════ */
const catMeta: Record<Category, { label: string; icon: React.ReactNode; color: string }> = {
  all: { label: 'ALL', icon: <TrendingUp size={12} />, color: 'var(--accent-color)' },
  programmer: { label: 'PROGRAMMER', icon: <Code2 size={12} />, color: 'var(--accent-color)' },
  analis: { label: 'ANALIS', icon: <BarChart2 size={12} />, color: 'var(--accent-secondary)' },
  desainer: { label: 'DESAINER', icon: <Palette size={12} />, color: 'var(--accent-tertiary)' },
};

function CaseStudiesPage({ onDetail }: { onDetail: (item: PortfolioItem) => void }) {
  const [filter, setFilter] = useState<Category>('all');
  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);
  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: 'calc(58px + 2rem) clamp(1.5rem, 6vw, 5rem) 4rem', width: '100%' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '4px', marginBottom: '0.5rem' }}>ARCHIVE::CASE_STUDIES</div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-color)', letterSpacing: '-1px', marginBottom: '0.5rem' }}>CASE STUDIES</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {items.length} proyek tersedia • Klik untuk melihat detail teknis lengkap
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {(['all', 'programmer', 'analis', 'desainer'] as Category[]).map(cat => {
            const m = catMeta[cat];
            return (
              <motion.button key={cat} onClick={() => setFilter(cat)} whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px',
                  background: filter === cat ? `${m.color}20` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${filter === cat ? m.color : 'rgba(255,255,255,0.08)'}`,
                  color: filter === cat ? m.color : 'rgba(255,255,255,0.35)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '2px',
                  cursor: 'pointer', borderRadius: '8px', transition: 'all 0.3s',
                }}>
                {m.icon} {m.label}
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                <ProjectCard item={item} index={i} onClick={() => onDetail(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CASE STUDY DETAIL PAGE
══════════════════════════════════════════════════════ */
function CaseStudyDetailPage({ item, onBack }: { item: PortfolioItem; onBack: () => void }) {
  const ac = item.accent;
  return (
    <div style={{ overflowY: 'auto', height: '100%', paddingTop: '58px', width: '100%' }}>
      {/* Hero Band */}
      <div style={{ background: `linear-gradient(135deg, rgba(1,4,9,0.92) 0%, ${ac}18 100%)`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${ac}30`, padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 6vw, 5rem)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.button onClick={onBack} whileHover={{ x: -4 }} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>
            <ArrowLeft size={12} /> BACK TO CASE STUDIES
          </motion.button>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: ac, letterSpacing: '4px', marginBottom: '0.5rem' }}>STUDI KASUS :: {item.id}</div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--text-color)', letterSpacing: '-1px', marginBottom: '0.4rem' }}>{item.title}</h1>
          <div style={{ color: ac, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '1rem' }}>{item.subtitle} — {item.year}</div>
          {(item.role || item.team) && (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.2rem' }}>
              {item.role && <span><span style={{ color: ac }}>Peran: </span>{item.role}</span>}
              {item.team && <span><span style={{ color: ac }}>Tim: </span>{item.team}</span>}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {item.tech.map(t => <Tag key={t} accent={ac}>{t}</Tag>)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 5rem)' }}>

        {/* Problem */}
        {item.problem && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 01. THE CHALLENGE</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {item.problem.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  <span style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, flexShrink: 0, marginTop: '3px' }}>✗ {String(i + 1).padStart(2, '0')}</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Rationale */}
        {item.rationale && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 02. STRATEGIC RATIONALE</h2>
              <div style={{ padding: '1.2rem 1.5rem', background: `${ac}08`, border: `1px solid ${ac}25`, borderLeft: `3px solid ${ac}`, borderRadius: '0 8px 8px 0', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                {item.rationale}
              </div>
            </section>
          </>
        )}

        {/* Solution */}
        {item.solution && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 03. THE SOLUTION</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {item.solution.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                    <span style={{ color: ac, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, flexShrink: 0, marginTop: '3px' }}>✓ {String(i + 1).padStart(2, '0')}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* Architecture */}
        {item.architecture && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 04. ARSITEKTUR LAYANAN</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: `${ac}10`, borderBottom: `1px solid ${ac}30` }}>
                      {['Komponen', 'Teknologi', 'Tanggung Jawab'].map(h => (
                        <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: ac, letterSpacing: '2px', textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.architecture.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-color)' }}>{row.component}</td>
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: ac }}>{row.tech}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.55)' }}>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* Code Snippet */}
        {item.codeSnippet && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 05. IMPLEMENTATION HIGHLIGHT — {item.codeSnippet.lang.toUpperCase()}</h2>
              <pre style={{ background: '#0d1117', border: `1px solid ${ac}25`, borderRadius: '8px', padding: '1.5rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.8, color: '#c9d1d9', margin: 0 }}>
                {item.codeSnippet.code}
              </pre>
            </section>
          </>
        )}

        {/* Metrics */}
        {item.metrics && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>// 06. RESULTS & IMPACT</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem' }}>
                {item.metrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    style={{ padding: '1.2rem', background: `${ac}08`, border: `1px solid ${ac}20`, borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>{m.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginBottom: '2px' }}>{m.before}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-color)', marginBottom: '4px' }}>{m.after}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 900, color: ac }}>{m.improvement}</div>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Learnings */}
        {item.learnings && (
          <>
            <Divider accent={ac} />
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: ac, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// 07. KEY LEARNINGS</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {item.learnings.map((l, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    <span style={{ color: '#fbbf24', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, flexShrink: 0, marginTop: '3px' }}>💡</span>
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {item.link && item.link !== '#' && (
          <motion.a href={item.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0.9rem 2rem', border: `1px solid ${ac}60`, background: `${ac}12`, color: ac, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', textDecoration: 'none', borderRadius: '8px' }}>
            <ExternalLink size={14} /> VIEW LIVE PROJECT
          </motion.a>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: 'calc(58px + 2rem) clamp(1.5rem, 6vw, 5rem) 4rem', width: '100%' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '4px', marginBottom: '0.5rem' }}>ABOUT::ABU_RIZA</div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-color)', letterSpacing: '-1px', marginBottom: '2.5rem' }}>TENTANG SAYA</h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(280px, 40%, 400px) 1fr', gap: '4rem', alignItems: 'start' }} className="about-grid">
          {/* Left: Bio */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid var(--accent-color)', background: 'linear-gradient(135deg, #010409, #0a1628)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 30px var(--accent-color)30' }}>
              <DayakMotifs.AsoCorner size={60} color="var(--accent-color)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', color: 'var(--text-color)', marginBottom: '0.3rem' }}>ABU RIZA</h2>
            <p style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>Full Stack Engineer & Technical Lead</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              Full-Stack Engineer dengan pengalaman lebih dari <strong style={{ color: 'var(--text-color)' }}>4 tahun</strong> membangun sistem skala enterprise, dengan rekam jejak sebagai <strong style={{ color: 'var(--text-color)' }}>Technical Lead</strong> yang bertanggung jawab pada desain arsitektur, koordinasi tim, dan delivery produk.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Filosofi saya: setiap keputusan arsitektur harus dilandasi tiga pilar — <strong style={{ color: 'var(--accent-color)' }}>Scalability</strong>, <strong style={{ color: 'var(--accent-tertiary)' }}>Reliability</strong>, dan <strong style={{ color: 'var(--accent-secondary)' }}>Observability</strong>.
            </p>

            {/* Info */}
            {[
              { icon: <MapPin size={13} />, text: 'Pontianak, Kalimantan Barat' },
              { icon: <Award size={13} />, text: 'S.Kom — Sistem Informasi, UNTAN (IPK 3.51)' },
              { icon: <Calendar size={13} />, text: 'BNSP Programmer Certified · 2020–2023' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                <span style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </motion.div>

          {/* Right: Tech Stack */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            {techStack.map((group, gi) => (
              <div key={gi} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1rem' }}>{group.icon}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800 }}>{group.cat}</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>
                {group.skills.map((s, si) => (
                  <SkillBar key={si} name={s.n} level={s.v}
                    accent={gi % 3 === 0 ? 'var(--accent-color)' : gi % 3 === 1 ? 'var(--accent-tertiary)' : 'var(--accent-secondary)'}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RESUME PAGE
══════════════════════════════════════════════════════ */
function ResumePage() {
  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: 'calc(58px + 2rem) clamp(1.5rem, 6vw, 5rem) 4rem', width: '100%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '4px', marginBottom: '0.5rem' }}>CAREER::TIMELINE</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-color)', letterSpacing: '-1px', margin: 0 }}>RESUME</h1>
            <a href="/print" target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'var(--accent-color)', color: '#010409', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', textDecoration: 'none', borderRadius: '8px', boxShadow: '0 4px 20px var(--accent-color)40' }}>
              <Download size={14} /> DOWNLOAD PDF
            </a>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '3rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-color)', letterSpacing: '3px', marginBottom: '0.5rem' }}>PENDIDIKAN</div>
            <div style={{ fontWeight: 700, color: 'var(--text-color)', marginBottom: '2px' }}>S.Kom — Sistem Informasi</div>
            <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Universitas Tanjungpura (UNTAN) · 2019–2023</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginTop: '4px' }}>IPK 3.51 / 4.00 · Predikat Memuaskan · Skripsi: K-Means & Cosine Similarity</div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical rail */}
          <div style={{ position: 'absolute', left: 0, top: '8px', bottom: '8px', width: '2px', background: 'rgba(255,255,255,0.06)' }} />

          {timeline.map((entry, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
              style={{ position: 'relative', marginBottom: '2.5rem' }}>
              {/* Dot */}
              <div style={{ position: 'absolute', left: '-2.5rem', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: entry.accent, boxShadow: `0 0 12px ${entry.accent}` }} />

              <div style={{ padding: '1.2rem 1.5rem', background: `${entry.accent}08`, border: `1px solid ${entry.accent}20`, borderRadius: '10px', borderLeft: `3px solid ${entry.accent}` }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: entry.accent, letterSpacing: '2px', fontWeight: 800 }}>{entry.period}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px' }}>{entry.company}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', color: 'var(--text-color)', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>{entry.role}</div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {entry.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: 'flex', gap: '0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                      <span style={{ color: entry.accent, flexShrink: 0 }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════ */
function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'var(--text-color)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.3s',
  } as React.CSSProperties;
  const socials = [
    { icon: '⌥', label: 'GITHUB', url: 'https://github.com/Aburiza21', accent: 'var(--accent-color)', desc: 'github.com/Aburiza21' },
    { icon: '🔗', label: 'LINKEDIN', url: 'https://linkedin.com/in/abu-riza-02a31625a', accent: 'var(--accent-secondary)', desc: 'in/abu-riza-02a31625a' },
    { icon: '💬', label: 'WHATSAPP', url: 'https://wa.me/628989825205', accent: 'var(--accent-tertiary)', desc: '+62 898 982 5205' },
    { icon: '📧', label: 'EMAIL', url: 'mailto:aburiza.21@gmail.com', accent: 'var(--accent-color)', desc: 'aburiza.21@gmail.com' },
  ];
  return (
    <div style={{ overflowY: 'auto', height: '100%', padding: 'calc(58px + 2rem) clamp(1.5rem, 6vw, 5rem) 4rem', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '4px', marginBottom: '0.5rem' }}>COMM_UPLINK::INITIALIZING</div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text-color)', letterSpacing: '-1px', marginBottom: '0.5rem' }}>MARI BERKOLABORASI</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '3rem', maxWidth: '500px' }}>Tersedia untuk diskusi proyek, peluang karier, atau sekadar bertukar pikiran tentang arsitektur sistem.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">
          {/* Social Links */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '1.5rem' }}>SALURAN KOMUNIKASI</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {socials.map((s, i) => (
                <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 8, background: `${s.accent}12` }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem',
                    border: `1px solid ${s.accent}30`, borderRadius: '10px', textDecoration: 'none',
                    background: `${s.accent}06`, transition: 'background 0.3s',
                  }}>
                  <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: s.accent, letterSpacing: '3px', fontWeight: 800 }}>{s.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginTop: '2px' }}>{s.desc}</div>
                  </div>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', color: s.accent, opacity: 0.5 }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', marginBottom: '1.5rem' }}>KIRIM PESAN</div>
            <form action={`mailto:aburiza.21@gmail.com?subject=Pesan dari ${name}&body=${msg}`} method="GET"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '6px' }}>NAMA</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama Anda" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '6px' }}>EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@domain.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '6px' }}>PESAN</label>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={4} placeholder="Tuliskan pesan Anda di sini..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.9rem', background: 'var(--accent-color)', color: '#010409', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', cursor: 'pointer', borderRadius: '8px' }}>
                <Send size={14} /> KIRIM PESAN
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN SPA
══════════════════════════════════════════════════════ */
export default function PortfolioSPA() {
  const [section, setSection] = useState<Section>('home');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const navigate = useCallback((s: Section) => {
    setSection(s);
    if (s !== 'detail') setSelectedItem(null);
  }, []);

  const openDetail = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setSection('detail');
  }, []);

  const goBackFromDetail = useCallback(() => {
    setSection('case-studies');
    setSelectedItem(null);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <NavBar current={section} onNav={navigate} />

      {/* Page Content */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div key={section} variants={pageVariants} initial="enter" animate="center" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            {section === 'home' && <HomePage onNav={navigate} onDetail={openDetail} />}
            {section === 'case-studies' && <CaseStudiesPage onDetail={openDetail} />}
            {section === 'detail' && selectedItem && <CaseStudyDetailPage item={selectedItem} onBack={goBackFromDetail} />}
            {section === 'about' && <AboutPage />}
            {section === 'resume' && <ResumePage />}
            {section === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
