import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, GraduationCap, Award, Code2,
  Calendar, ChevronRight, Home, MapPin, ExternalLink, Archive
} from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';

/* ─── Types ─── */
type EventType = 'work' | 'education' | 'achievement' | 'project';

interface TimelineEvent {
  id: string;
  type: EventType;
  year: string;
  duration?: string;
  title: string;
  organization: string;
  location?: string;
  description: string;
  highlights?: string[];
  tech?: string[];
  link?: string;
  accent: string;
  isMilestone?: boolean;
}

/* ─── Data ─── */
const events: TimelineEvent[] = [
  {
    id: 'TL-2025A',
    type: 'work',
    year: '2025',
    duration: 'Present',
    title: 'IT Staff',
    organization: 'RS Mitra Medika (PT Hexa Daya Medika)',
    location: 'Pontianak, Kalimantan Barat',
    description: 'Memimpin pengembangan aplikasi internal full-stack untuk mengotomasi proses operasional rumah sakit. Bertanggung jawab atas seluruh infrastruktur IT, jaringan, server, dan sistem.',
    highlights: [
      'Membangun Hospital Information System (HIS) dengan 60+ modul',
      'Integrasi SATUSEHAT — Kementerian Kesehatan RI',
      'Pengelolaan infrastruktur IT & jaringan seluruh rumah sakit',
      'Supervisor teknis tim developer internal',
    ],
    tech: ['Laravel', 'Inertia.js', 'React', 'SQLite', 'Docker', 'SATUSEHAT API'],
    accent: 'var(--accent-color)',
    isMilestone: true,
  },
  {
    id: 'TL-2024A',
    type: 'work',
    year: '2024',
    duration: '2025',
    title: 'Technical Lead',
    organization: 'Reactive Incorporated (PT Sepakat Digital)',
    location: 'Pontianak, Kalimantan Barat',
    description: 'Memimpin dan memberdayakan tim produksi melalui analisis kinerja rutin. Merancang arsitektur dan pondasi teknis untuk berbagai proyek baru serta mengelola siklus hidup proyek end-to-end.',
    highlights: [
      'Memimpin tim 4–6 developer dalam 3 proyek enterprise',
      'Merancang arsitektur sistem untuk 3 platform baru',
      'Sprint management, code review, & mentoring',
      'Pengiriman tepat waktu dengan Zero critical bugs',
    ],
    tech: ['Laravel', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Scrum'],
    accent: 'var(--accent-tertiary)',
    isMilestone: true,
  },
  {
    id: 'TL-2024B',
    type: 'project',
    year: '2024',
    title: 'Reactive POS — Enterprise Kasir',
    organization: 'Reactive Incorporated',
    description: 'Membangun aplikasi kasir enterprise berbasis web multi-cabang dengan manajemen gudang terpusat, laporan real-time, dan control panel administrator.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
    accent: 'var(--accent-tertiary)',
  },
  {
    id: 'TL-2023A',
    type: 'achievement',
    year: '2023',
    title: '🥈 Silver Award — Inovasi Industri',
    organization: 'Logbook Control Room Project',
    description: 'Meraih Silver Award dari kompetisi inovasi internal atas pengembangan sistem Logbook Control Room yang berhasil mendigitalisasi proses operasional industri kritis, sekaligus masuk Top 3 Best Presentation.',
    accent: '#FFD700',
    isMilestone: true,
  },
  {
    id: 'TL-2023B',
    type: 'education',
    year: '2023',
    title: 'Sarjana Teknik Informatika',
    organization: 'Universitas Tanjungpura (UNTAN)',
    location: 'Pontianak, Kalimantan Barat',
    description: 'Lulus dengan predikat Memuaskan. Skripsi membahas implementasi metode K-Means Clustering dan Cosine Similarity untuk klasifikasi dan rekomendasi topik skripsi.',
    highlights: [
      'IPK 3.51 / 4.00 — Predikat Memuaskan',
      'Skripsi: K-Means Clustering & Cosine Similarity',
      'Fokus: Data Mining & Machine Learning',
    ],
    tech: ['Python', 'Scikit-learn', 'NLTK', 'Pandas'],
    accent: 'var(--accent-color)',
    isMilestone: true,
  },
  {
    id: 'TL-2023C',
    type: 'project',
    year: '2023',
    title: 'SIBeBan — Sistem Informasi Bencana Banjir',
    organization: 'Universitas Tanjungpura',
    location: 'Sintang, Kalimantan Barat',
    description: 'Platform GIS berbasis web untuk pemantauan dan prediksi wilayah rawan banjir real-time di Kabupaten Sintang menggunakan data BMKG dan analisis spasial PostGIS.',
    tech: ['Python', 'React', 'Leaflet.js', 'PostGIS', 'FastAPI'],
    link: 'https://github.com/Aburiza41/SIBeBan',
    accent: 'var(--accent-secondary)',
  },
  {
    id: 'TL-2023D',
    type: 'project',
    year: '2023',
    title: 'Logbook Control Room',
    organization: 'Reactive Incorporated',
    description: 'Sistem digitalisasi catatan operasional control room industri kritis mencakup manajemen shift, notifikasi real-time, dan dashboard monitoring multi-unit.',
    tech: ['Laravel', 'Inertia.js', 'React', 'PostgreSQL', 'Docker'],
    accent: 'var(--accent-color)',
  },
  {
    id: 'TL-2022A',
    type: 'achievement',
    year: '2023',
    title: 'BNSP Certified — Teknisi Komputer',
    organization: 'Badan Nasional Sertifikasi Profesi',
    location: 'Indonesia',
    description: 'Memperoleh sertifikasi nasional BNSP sebagai Teknisi Komputer, memvalidasi kompetensi profesional di bidang IT support dan pengelolaan sistem komputer.',
    accent: 'var(--accent-tertiary)',
    isMilestone: true,
  },
  {
    id: 'TL-2016A',
    type: 'education',
    year: '2016',
    duration: '2023',
    title: 'S1 Teknik Informatika',
    organization: 'Universitas Tanjungpura (UNTAN)',
    location: 'Pontianak, Kalimantan Barat',
    description: 'Menempuh pendidikan sarjana selama 7 tahun dengan fokus pada rekayasa perangkat lunak, sistem informasi, dan ilmu data. Aktif dalam pengembangan proyek akademik dan kolaborasi industri.',
    accent: 'var(--accent-color)',
  },
  {
    id: 'TL-2014A',
    type: 'education',
    year: '2014',
    duration: '2016',
    title: 'Teknik Komputer & Jaringan',
    organization: 'SMK Amaliyah',
    location: 'Kalimantan Barat',
    description: 'Pendidikan menengah kejuruan dengan fokus pada infrastruktur IT, jaringan komputer, dan troubleshooting sistem. Fondasi karir dalam teknologi informasi.',
    highlights: [
      'Keahlian jaringan komputer & troubleshooting',
      'Fondasi IT infrastructure & sistem operasi',
      'Awal perjalanan karir teknologi',
    ],
    accent: 'var(--accent-secondary)',
    isMilestone: true,
  },
];

const typeConfig: Record<EventType, { icon: React.ReactNode; label: string }> = {
  work: { icon: <Briefcase size={16} />, label: 'KARIR' },
  education: { icon: <GraduationCap size={16} />, label: 'PENDIDIKAN' },
  achievement: { icon: <Award size={16} />, label: 'PENCAPAIAN' },
  project: { icon: <Code2 size={16} />, label: 'PROYEK' },
};

/* ─── Card Component ─── */
function TimelineCard({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[event.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      style={{
        border: `1px solid ${event.isMilestone ? event.accent + '60' : 'rgba(255,255,255,0.08)'}`,
        background: event.isMilestone ? `${event.accent}0a` : 'rgba(2,6,23,0.7)',
        backdropFilter: 'blur(20px)',
        padding: 'clamp(1.2rem, 3vw, 2.2rem)',
        position: 'relative',
        overflow: 'hidden',
        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
        boxShadow: event.isMilestone ? `0 20px 60px -20px ${event.accent}40, inset 0 0 20px ${event.accent}10` : '0 10px 40px -20px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={() => setExpanded(e => !e)}
      whileHover={{ y: -5, borderColor: event.accent + '80' }}
    >
      {/* HUD scanning effect */}
      <div className="scan-line" style={{ animationDuration: event.isMilestone ? '4s' : '8s', opacity: event.isMilestone ? 0.12 : 0.04 }} />

      {/* Decorative corner brackets */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: `2px solid ${event.accent}`, borderLeft: `2px solid ${event.accent}`, opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: `2px solid ${event.accent}`, borderRight: `2px solid ${event.accent}`, opacity: 0.3, pointerEvents: 'none' }} />

      {/* Dayak Aso on corner for milestones */}
      {event.isMilestone && (
        <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.25, color: event.accent, filter: 'drop-shadow(0 0 10px currentColor)' }}>
          <DayakMotifs.AsoCorner size={28} />
        </div>
      )}

      {/* Top Metadata Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '3px 12px',
          border: `1px solid ${event.accent}50`,
          background: `${event.accent}15`,
          color: event.accent,
          fontSize: '0.6rem', fontWeight: 800, letterSpacing: '2px',
          fontFamily: 'var(--font-mono)',
          textShadow: `0 0 10px ${event.accent}50`
        }}>
          {cfg.icon} {cfg.label}
        </div>

        {event.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            <MapPin size={10} color={event.accent} opacity={0.6} /> {event.location.toUpperCase()}
          </div>
        )}

        <div style={{ marginLeft: 'auto', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
          VERIFIED_NODE::{event.id}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-header)',
          fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
          fontWeight: 950,
          color: 'var(--text-color)',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-1px',
          textTransform: 'uppercase',
          filter: event.isMilestone ? `drop-shadow(0 0 15px ${event.accent}30)` : 'none'
        }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
          <div style={{ width: '40px', height: '2px', background: event.accent, opacity: 0.6 }} />
          <span style={{
            fontSize: '0.8rem',
            color: event.accent,
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            letterSpacing: '2px',
            opacity: 0.9
          }}>
            {event.organization}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 300,
          margin: 0,
          maxWidth: '90%'
        }}>
          {event.description}
        </p>
      </div>

      {/* Expanded Area */}
      {(event.highlights || event.tech || event.link) && (
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          style={{ overflow: 'hidden' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            {event.highlights && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {event.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: event.accent, marginTop: '7px', flexShrink: 0, boxShadow: `0 0 10px ${event.accent}` }} />
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {event.tech && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {event.tech.map((t, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '3px 10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '1px'
                  }}>{t}</span>
                ))}
              </div>
            )}

            {event.link && (
              <motion.a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ x: 5 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: event.accent,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem', fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                <ExternalLink size={12} /> BUKA PROYEK
              </motion.a>
            )}
          </div>
        </motion.div>
      )}

      {/* Expand/Collapse Footer */}
      {(event.highlights || event.tech) && (
        <div style={{
          marginTop: '1.2rem',
          display: 'flex', alignItems: 'center', gap: '8px',
          borderTop: '1px solid rgba(255,255,255,0.03)',
          paddingTop: '0.8rem'
        }}>
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronRight size={14} color={event.accent} />
          </motion.div>
          <span style={{
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '2px',
            fontWeight: 700
          }}>
            {expanded ? 'SYSTEM.COLLAPSE' : 'SYSTEM.EXPAND_METRICS'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)', marginLeft: '10px' }} />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function TimelinePage() {
  const [filter, setFilter] = useState<EventType | 'all'>('all');

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

  const filters: { key: EventType | 'all'; label: string; color: string }[] = [
    { key: 'all', label: 'SEMUA', color: 'rgba(255,255,255,0.5)' },
    { key: 'work', label: 'KARIR', color: 'var(--accent-color)' },
    { key: 'education', label: 'PENDIDIKAN', color: 'var(--accent-secondary)' },
    { key: 'project', label: 'PROYEK', color: 'var(--accent-color)' },
    { key: 'achievement', label: 'PENCAPAIAN', color: '#FFD700' },
  ];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 40% 20%, rgba(0,15,30,1) 0%, rgba(2,6,23,1) 100%)',
      fontFamily: 'var(--font-mono)',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    }}>
      {/* CRT scanlines */}
      <div style={{ position: 'fixed', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* Ambient backgrounds */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(/assets/bg/bg_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'screen', pointerEvents: 'none', maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 100%)' }} />

      {/* Ambient glows */}
      <motion.div animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ repeat: Infinity, duration: 6 }} style={{ position: 'fixed', top: '-20%', left: '-5%', width: '800px', height: '800px', background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 65%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div animate={{ opacity: [0.04, 0.09, 0.04] }} transition={{ repeat: Infinity, duration: 8, delay: 2 }} style={{ position: 'fixed', bottom: '-20%', right: '-5%', width: '700px', height: '700px', background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 65%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Premium HUD Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '0 clamp(16px, 5vw, 60px)',
        height: 'clamp(70px, 10vh, 90px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(30px)',
        background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.8) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {/* Animated scanning bar at the very top of header */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)', zIndex: 101 }}
        />

        {/* Brand Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{ color: 'var(--accent-color)', filter: 'drop-shadow(0 0 8px var(--accent-color)40)' }}
          >
            <DayakMotifs.AsoCorner size={36} />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.45rem', color: 'var(--accent-color)', fontWeight: 900, letterSpacing: '3px', fontFamily: 'var(--font-mono)' }}>NODE::MASTER_RECORDS</span>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-tertiary)', boxShadow: '0 0 5px var(--accent-tertiary)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', fontWeight: 950, color: 'var(--text-color)', margin: 0, letterSpacing: '2px', lineHeight: 1.1 }}>
              TIMELINE <span style={{ color: 'var(--accent-color)' }}>KARIR</span>
            </h1>
          </div>
        </div>

        {/* Filter Tabs - Redesigned as Central HUD Control */}
        <div style={{
          display: 'flex', gap: '6px', padding: '4px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          alignItems: 'center'
        }}>
          {filters.map(f => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '6px 14px',
                border: 'none',
                background: filter === f.key ? `${f.color}20` : 'transparent',
                color: filter === f.key ? f.color : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px',
                cursor: 'pointer', borderRadius: '8px', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: filter === f.key ? `inset 0 0 10px ${f.color}20` : 'none',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {filter === f.key && (
                <motion.div layoutId="tab-glow" style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: f.color, boxShadow: `0 0 10px ${f.color}` }} />
              )}
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Action Buttons & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status Indicator */}
          <div style={{ display: 'none', flexDirection: 'column', alignItems: 'flex-end', marginRight: '10px' }} className="desktop-only-flex">
            <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>NEURAL_LINK::STABLE</span>
            <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '50%', height: '100%', background: 'var(--accent-tertiary)' }} />
            </div>
          </div>

          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05, background: 'var(--accent-secondary)20', borderColor: 'var(--accent-secondary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(2,6,23,0.6)',
              color: 'var(--accent-secondary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 800,
              letterSpacing: '2px', borderRadius: '8px', transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            <Archive size={14} /> PORTFOLIO
          </motion.a>

          <motion.a
            href="/"
            whileHover={{ scale: 1.05, background: 'var(--accent-color)20', borderColor: 'var(--accent-color)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '10px 16px',
              border: '1px solid var(--accent-color)40',
              background: 'var(--accent-color)10',
              color: 'var(--accent-color)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 800,
              letterSpacing: '2px', borderRadius: '8px', transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 15px var(--accent-color)20'
            }}
          >
            <Home size={14} /> BERANDA
          </motion.a>
        </div>
      </header>

      {/* Background digital grid overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none', zIndex: 1, opacity: 0.5
      }} />

      {/* ── Timeline Content ── */}
      <div style={{ maxWidth: '1250px', margin: '0 auto', padding: 'clamp(3rem, 7vh, 5rem) clamp(1rem, 5vw, 3rem) 8rem', position: 'relative', zIndex: 5 }}>

        {/* Section subtitle */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vh, 6rem)' }}>
          <div className="tribal-heading" style={{ justifyContent: 'center', marginBottom: '0.8rem', letterSpacing: '0.4em' }}>LOG_EVOLUSI_LELUHUR // CHRONOLOGICAL_ARCHIVE</div>
          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-2px', textTransform: 'uppercase', margin: '0 0 1rem', lineHeight: 1 }}>
            NARASI <span style={{ color: 'var(--accent-color)' }}>EKSISTENSI</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
            Arsip digital perjalanan karir dan pendidikan dari <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>2014</span> hingga <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>sekarang</span>. Setiap simpul mewakili evolusi kapabilitas dan pengalaman.
          </p>
        </motion.div>

        {/* Desktop two-column timeline */}
        <div style={{ position: 'relative' }}>

          {/* Center vertical line - Complex animated design */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            {/* Background track */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
            {/* Gradient core */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--accent-color) 5%, var(--accent-secondary) 40%, var(--accent-tertiary) 70%, var(--accent-color) 95%, transparent)', opacity: 0.3, borderRadius: '4px' }} />
            {/* Animated pulse tracker */}
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: '-2px', width: '8px', height: '120px', background: 'linear-gradient(to bottom, transparent, var(--accent-color), transparent)', filter: 'blur(4px)', opacity: 0.6 }}
            />
          </div>

          {/* Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }} className="timeline-container">
            {filtered.map((event, idx) => {
              const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
              const cfg = typeConfig[event.type];

              return (
                <div key={event.id} className="timeline-row">

                  {/* Left slot */}
                  <div className="side-slot left-slot">
                    {side === 'left' ? <TimelineCard event={event} side="left" /> : <div />}
                  </div>

                  {/* Center node */}
                  <div className="center-node">
                    {/* Year badge */}
                    <div style={{ padding: '4px 10px', background: 'rgba(2,6,23,0.95)', border: `1px solid ${event.accent}80`, color: event.accent, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: `0 0 20px ${event.accent}20` }}>
                      {event.year}{event.duration ? `\n➔ ${event.duration}` : ''}
                    </div>
                    {/* Node dot with relative glow */}
                    <div style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: event.accent, filter: 'blur(8px)', opacity: 0.4 }}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{ position: 'relative', width: event.isMilestone ? '18px' : '14px', height: event.isMilestone ? '18px' : '14px', borderRadius: '50%', background: event.accent, border: `3px solid rgba(2,6,23,1)`, zIndex: 10, boxShadow: `0 0 15px ${event.accent}` }}
                      />
                    </div>
                    {/* Type icon indicator */}
                    <div style={{ fontSize: '0.6rem', color: event.accent, opacity: 0.5, fontWeight: 900 }}>
                      [ {cfg.label.slice(0, 3)} ]
                    </div>
                  </div>

                  {/* Right slot */}
                  <div className="side-slot right-slot">
                    {side === 'right' ? <TimelineCard event={event} side="right" /> : <div />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* End node */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '3rem' }}
          >
            <div style={{ opacity: 0.3, color: 'var(--accent-color)' }}>
              <DayakMotifs.AncientSeal size={60} />
            </div>
            <div className="hud-tag" style={{ opacity: 0.3, fontSize: '0.55rem', letterSpacing: '3px', textAlign: 'center' }}>
              EVOLUTION_LOG_COMPLETE // RIMBA_ARCHIVE_V4.2
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive Styles Overlay */}
      <style>{`
        .timeline-row {
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          align-items: center;
          gap: 0;
          position: relative;
        }
        .center-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 2;
          position: relative;
        }
        .left-slot { padding-right: clamp(1rem, 4vw, 3rem); text-align: right; }
        .right-slot { padding-left: clamp(1rem, 4vw, 3rem); }

        @media (max-width: 900px) {
          .timeline-row {
            grid-template-columns: 80px 1fr;
            gap: 0;
          }
          .center-node {
            grid-column: 1;
          }
          .side-slot {
            grid-column: 2;
            padding-left: 1.5rem !important;
            padding-right: 0 !important;
            text-align: left !important;
          }
          .left-slot:empty, .right-slot:empty { display: none; }
          .timeline-container { gap: 3rem !important; }
        }

        @media (max-width: 500px) {
          .timeline-row { grid-template-columns: 60px 1fr; }
          .side-slot { padding-left: 0.8rem !important; }
        }
      `}</style>
    </div>
  );
}
