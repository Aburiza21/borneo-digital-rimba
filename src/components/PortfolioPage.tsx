import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Code2, BarChart2, Palette, X, Home } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';

/* ─── Data ─── */
type Category = 'programmer' | 'analis' | 'desainer';

interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  achievement?: string;
  accent: string;
}

const data: Record<Category, PortfolioItem[]> = {
  programmer: [
    {
      id: 'PROG-01',
      title: 'Hospital Information System',
      subtitle: 'Enterprise Healthcare Platform',
      year: '2025 — Present',
      description: 'Platform terintegrasi untuk manajemen rumah sakit lengkap mencakup 60+ modul: Rawat Jalan, IGD, Farmasi, Keuangan, dan integrasi SATUSEHAT Kemenkes RI. Dibangun sebagai Technical Lead sekaligus pengembang utama.',
      image: '/assets/projects/his.png',
      tech: ['Laravel', 'Inertia.js', 'React', 'SQLite', 'Docker', 'SATUSEHAT API'],
      link: '#',
      achievement: '60+ Modules · SATUSEHAT Integrated',
      accent: 'var(--accent-color)',
    },
    {
      id: 'PROG-02',
      title: 'Reactive POS',
      subtitle: 'Multi-Branch Enterprise POS',
      year: '2024',
      description: 'Aplikasi kasir enterprise berbasis web mendukung operasional multi-cabang dengan manajemen gudang terpusat, laporan real-time, dan control panel administrator. Mengurangi waktu proses order hingga 50%.',
      image: '/assets/projects/pos.png',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
      link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
      achievement: '50% Faster Order Processing',
      accent: 'var(--accent-tertiary)',
    },
    {
      id: 'PROG-03',
      title: 'Logbook Control Room',
      subtitle: 'Industrial Operations System',
      year: '2023',
      description: 'Sistem operasional terpusat untuk industri kritis menggantikan proses manual dengan digitalisasi pencatatan real-time, manajemen shift, dan dashboard monitoring. Meraih Silver Award INOVASI.',
      image: '/assets/projects/logbook.png',
      tech: ['Laravel', 'Inertia.js', 'React', 'PostgreSQL', 'Docker'],
      link: '#',
      achievement: '🥈 Silver Award · Top 3 Best Presentation',
      accent: 'var(--accent-secondary)',
    },
    {
      id: 'PROG-04',
      title: 'SIBeBan — GIS Flood System',
      subtitle: 'Geospatial Web Platform',
      year: '2023',
      description: 'Platform GIS berbasis web untuk memantau dan memprediksi wilayah rawan banjir secara real-time di Kabupaten Sintang menggunakan data BMKG dan analisis spasial PostGIS.',
      image: '/assets/projects/gis.png',
      tech: ['Python', 'React', 'Leaflet.js', 'PostGIS', 'FastAPI'],
      link: 'https://github.com/Aburiza41/SIBeBan',
      achievement: 'Flood Early Warning · Sintang District',
      accent: 'var(--accent-color)',
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
      id: 'DES-02',
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
    {
      id: 'DES-03',
      title: 'Hospital Dashboard UI',
      subtitle: 'Healthcare Interface Design',
      year: '2025',
      description: 'Desain dashboard medis untuk 60+ modul HIS: antarmuka Rawat Jalan, IGD triage, manajemen farmasi, dan laporan keuangan. Prioritas aksesibilitas, kejelasan informasi, dan efisiensi tenaga medis.',
      image: '/assets/projects/his.png',
      tech: ['Figma', 'React', 'Inertia.js', 'UI Kit', 'Accessibility'],
      achievement: 'Medical Grade UX · 60+ Modules',
      accent: 'var(--accent-secondary)',
    },
  ],
};

const categories: { key: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'programmer', label: 'PROGRAMMER',  icon: <Code2 size={16} />,    color: 'var(--accent-color)' },
  { key: 'analis',     label: 'ANALIS',      icon: <BarChart2 size={16} />, color: 'var(--accent-secondary)' },
  { key: 'desainer',   label: 'DESAINER',    icon: <Palette size={16} />,  color: 'var(--accent-tertiary)' },
];

/* ─── Component ─── */
export default function PortfolioPage() {
  const [cat, setCat] = useState<Category>('programmer');
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const items = data[cat];
  const item = items[idx];
  const catMeta = categories.find(c => c.key === cat)!;

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setIdx(i => (i + d + items.length) % items.length);
  }, [items.length]);

  const switchCat = (c: Category) => {
    setCat(c);
    setIdx(0);
    setDir(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d * 150,
      opacity: 0,
      filter: 'blur(20px) brightness(2)',
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px) brightness(1)',
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: (d: number) => ({
      x: d * -150,
      opacity: 0,
      filter: 'blur(20px) brightness(0.5)',
      scale: 1.05,
      transition: { duration: 0.5 }
    }),
  };

  return (
    <div style={{
      width: '100vw', 
      height: '100vh',
      background: 'radial-gradient(ellipse at 60% 30%, rgba(0,15,30,1) 0%, rgba(2,6,23,1) 100%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-mono)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* CRT scanlines */}
      <div style={{ position: 'fixed', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* Ambient background scene image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            mixBlendMode: 'screen', pointerEvents: 'none',
            maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)'
          }}
        />
      </AnimatePresence>

      {/* Digital Grid & Particles */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none', zIndex: 1, opacity: 0.4 }} />
      
      {/* Ambient glows */}
      <motion.div
        key={cat}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: 'fixed', top: '-10%', right: '-5%',
          width: '900px', height: '900px',
          background: `radial-gradient(circle, ${catMeta.color} 0%, transparent 70%)`,
          filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Premium HUD Header ── */}
      <header style={{
        position: 'relative', zIndex: 100,
        padding: '0 clamp(16px, 5vw, 60px)',
        height: 'clamp(70px, 10vh, 90px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(30px)',
        background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.8) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '20px'
      }}>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '1px', background: `linear-gradient(90deg, transparent, ${catMeta.color}, transparent)`, zIndex: 101 }}
        />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{ color: catMeta.color, filter: `drop-shadow(0 0 10px ${catMeta.color}40)` }}
          >
            <DayakMotifs.AsoCorner size={36} />
          </motion.div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.45rem', color: catMeta.color, fontWeight: 900, letterSpacing: '4px', fontFamily: 'var(--font-mono)' }}>NODE::ARCHIVE_VIEWER</span>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-tertiary)', boxShadow: '0 0 5px var(--accent-tertiary)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', fontWeight: 950, color: 'var(--text-color)', margin: 0, letterSpacing: '2px', lineHeight: 1.1 }}>
              RELIKUI <span style={{ color: catMeta.color }}>DIGITAL</span>
            </h1>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex', gap: '6px', padding: '4px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          alignItems: 'center'
        }}>
          {categories.map(c => (
            <motion.button
              key={c.key}
              onClick={() => switchCat(c.key)}
              whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '8px 18px',
                border: 'none',
                background: cat === c.key ? `${c.color}20` : 'transparent',
                color: cat === c.key ? c.color : 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px',
                cursor: 'pointer', borderRadius: '8px', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: cat === c.key ? `inset 0 0 12px ${c.color}20` : 'none',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {c.icon} {c.label}
              {cat === c.key && (
                <motion.div layoutId="cat-tab-glow" style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: c.color, boxShadow: `0 0 10px ${c.color}` }} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Back Button */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, background: 'var(--accent-color)20', borderColor: 'var(--accent-color)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '10px 20px',
            border: '1px solid var(--accent-color)40',
            background: 'var(--accent-color)10',
            color: 'var(--accent-color)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800,
            letterSpacing: '2px', borderRadius: '8px', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 4px 15px var(--accent-color)20'
          }}
        >
          <Home size={14} /> BERANDA
        </motion.a>
      </header>

      {/* ── Main Workspace ── */}
      <main style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 clamp(16px, 5vw, 60px)',
        overflow: 'hidden',
      }}>

        {/* Side Arrows */}
        <motion.button
          onClick={() => go(-1)}
          whileHover={{ scale: 1.1, x: -5, background: `${catMeta.color}25` }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', left: 'clamp(12px, 3vw, 40px)', zIndex: 50,
            width: '50px', height: '50px',
            border: `1px solid ${catMeta.color}40`, background: `${catMeta.color}15`,
            backdropFilter: 'blur(20px)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: catMeta.color, cursor: 'pointer',
            boxShadow: `0 0 20px ${catMeta.color}15`
          }}
        >
          <ChevronLeft size={28} />
        </motion.button>

        {/* ── Slideshow + Sidebar Grid ── */}
        <div style={{
          width: '100%',
          maxWidth: '1600px',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 280px',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'center',
        }} className="portfolio-main-layout">

          {/* Central Viewer Area */}
          <div style={{ position: 'relative', width: '100%' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`${cat}-${idx}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(1.5rem, 4vw, 4rem)',
                  alignItems: 'center',
                }}
                className="slideshow-grid"
              >
                {/* Left: Premium Image Panel */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                  <div style={{
                    position: 'relative', width: '100%', height: '100%', 
                    overflow: 'hidden', border: `1px solid ${item.accent}40`, 
                    background: '#000',
                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                    boxShadow: `0 30px 100px -30px ${item.accent}50, 0 0 0 1px ${item.accent}20`
                  }}>
                    <motion.img 
                      initial={{ scale: 1.1, filter: 'blur(10px)' }}
                      animate={{ scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 1.2 }}
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                    />
                    
                    {/* HUD Overlays */}
                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 3px)', pointerEvents: 'none' }} />
                    <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', left: 0, width: '100%', height: '4px', background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`, opacity: 0.6 }} />
                    <div style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderTop: `3px solid ${item.accent}`, borderLeft: `3px solid ${item.accent}`, opacity: 0.6 }} />
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '40px', height: '40px', borderBottom: `3px solid ${item.accent}`, borderRight: `3px solid ${item.accent}`, opacity: 0.6 }} />
                    
                    <div style={{
                      position: 'absolute', top: '24px', left: '24px', 
                      padding: '5px 12px', background: 'rgba(0,0,0,0.85)', 
                      border: `1px solid ${item.accent}60`, 
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', 
                      color: item.accent, backdropFilter: 'blur(12px)', 
                      letterSpacing: '2px', fontWeight: 900,
                    }}>
                      RELIC_ID::{item.id}
                    </div>

                    {item.achievement && (
                      <div style={{
                        position: 'absolute', bottom: '30px', left: '24px',
                        padding: '8px 16px', background: 'rgba(2,6,23,0.9)',
                        borderLeft: `4px solid ${item.accent}`,
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>STATUS::RESOLVED</div>
                        <div style={{ fontSize: '0.75rem', color: item.accent, fontWeight: 900, letterSpacing: '1px' }}>{item.achievement.toUpperCase()}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Info Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.8rem, 2vh, 1.8rem)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', 
                      color: catMeta.color, 
                      padding: '4px 15px', 
                      border: `1px solid ${catMeta.color}40`, 
                      background: `${catMeta.color}10`, 
                      fontSize: '0.7rem', fontWeight: 900, letterSpacing: '3px'
                    }}>
                      {catMeta.icon} {item.id}
                    </div>
                    <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${item.accent}40, transparent)` }} />
                  </div>

                  <div>
                    <h2 style={{ 
                      fontFamily: 'var(--font-header)', 
                      fontSize: 'clamp(2rem, 5vw, 4rem)', 
                      fontWeight: 950, 
                      lineHeight: 0.9, 
                      letterSpacing: '-2px', 
                      textTransform: 'uppercase', 
                      color: 'var(--text-color)', 
                      margin: 0, 
                      filter: `drop-shadow(0 0 20px ${item.accent}30)` 
                    }}>
                      {item.title}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '0.6rem' }}>
                      <div style={{ width: '40px', height: '2px', background: item.accent }} />
                      <span style={{ fontSize: '0.75rem', color: item.accent, letterSpacing: '0.25em', fontWeight: 800 }}>{item.subtitle}</span>
                    </div>
                  </div>

                  <div style={{ position: 'relative', paddingLeft: '1.2rem', borderLeft: `2px solid ${item.accent}20` }}>
                    <p style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', 
                      lineHeight: 1.75, 
                      color: 'rgba(255,255,255,0.7)', 
                      fontWeight: 300, 
                      margin: 0, 
                      maxWidth: '600px' 
                    }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.tech.map((t, i) => (
                      <span key={i} style={{ 
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', 
                        padding: '3px 10px', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: 'rgba(255,255,255,0.4)', 
                        fontWeight: 700
                      }}>{t}</span>
                    ))}
                  </div>

                  {item.link && item.link !== '#' && (
                    <motion.a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      whileHover={{ scale: 1.05, x: 5, background: `${item.accent}20` }} 
                      style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '10px', 
                        padding: '0.8rem 1.6rem', 
                        border: `1px solid ${item.accent}80`, 
                        background: `${item.accent}10`, 
                        color: item.accent, 
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, 
                        letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', 
                        width: 'fit-content', 
                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)', 
                        transition: 'all 0.3s'
                      }}
                    >
                      <ExternalLink size={14} /> DEPLOY_ACCESS
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Side Project Index (Data Sidebar) ── */}
          <aside className="portfolio-sidebar" style={{ 
            height: 'fit-content', 
            borderLeft: '1px solid rgba(255,255,255,0.08)', 
            paddingLeft: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', background: catMeta.color, borderRadius: '50%', boxShadow: `0 0 10px ${catMeta.color}` }} />
                <span style={{ fontSize: '0.55rem', color: catMeta.color, opacity: 0.8, letterSpacing: '4px', fontWeight: 900 }}>DATA_INDEX::V4.2</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: `linear-gradient(90deg, ${catMeta.color}80, transparent)` }} />
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
              {/* Vertical Rail */}
              <div style={{ position: 'absolute', left: '-12px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255,255,255,0.04)' }} />

              {items.map((it, i) => {
                const isActive = i === idx;
                return (
                  <motion.button
                    key={it.id}
                    onClick={() => {
                        setDir(i > idx ? 1 : -1);
                        setIdx(i);
                    }}
                    whileHover={{ x: 8 }}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: '4px',
                      background: 'none', border: 'none', padding: '8px 0',
                      cursor: 'pointer', textAlign: 'left',
                      position: 'relative',
                      opacity: isActive ? 1 : 0.25,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Node Dot */}
                    <div style={{ 
                        position: 'absolute', left: '-16px', top: '12px', 
                        width: '10px', height: '10px', borderRadius: '50%', 
                        background: isActive ? catMeta.color : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${isActive ? 'transparent' : 'rgba(2,6,23,1)'}`,
                        boxShadow: isActive ? `0 0 15px ${catMeta.color}` : 'none',
                        zIndex: 2,
                        transition: 'all 0.4s'
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', 
                          color: isActive ? catMeta.color : 'rgba(255,255,255,0.4)',
                          fontWeight: 900, letterSpacing: '1px'
                        }}>
                          {it.id}
                        </span>
                        {isActive && (
                            <motion.div layoutId="node-arrow">
                                <ChevronRight size={10} color={catMeta.color} />
                            </motion.div>
                        )}
                    </div>
                    <span style={{ 
                      fontFamily: 'var(--font-header)', fontSize: '0.85rem', 
                      color: isActive ? 'var(--text-color)' : 'rgba(255,255,255,0.2)',
                      fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                      maxWidth: '190px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {it.title}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.1 }}>
              <div style={{ width: '40px', height: '2px', background: 'white' }} />
              <span style={{ fontSize: '0.45rem', letterSpacing: '2px', fontWeight: 700 }}>TERMINUS::END_LOG</span>
            </div>
          </aside>
        </div>

        {/* Next Arrow */}
        <motion.button
          onClick={() => go(1)}
          whileHover={{ scale: 1.1, x: 5, background: `${catMeta.color}25` }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', right: 'clamp(12px, 3vw, 40px)', zIndex: 50,
            width: '50px', height: '50px',
            border: `1px solid ${catMeta.color}40`, background: `${catMeta.color}15`,
            backdropFilter: 'blur(20px)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: catMeta.color, cursor: 'pointer',
            boxShadow: `0 0 20px ${catMeta.color}15`
          }}
        >
          <ChevronRight size={28} />
        </motion.button>
      </main>

      {/* ── Bottom HUD Footer ── */}
      <footer style={{
        position: 'relative', zIndex: 100,
        padding: '0 clamp(16px, 5vw, 60px)',
        height: 'clamp(60px, 8vh, 80px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(2,6,23,0.8)',
        flexWrap: 'wrap', gap: '20px',
      }}>
        {/* Progress Dots */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {items.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              whileHover={{ scale: 1.5 }}
              style={{
                width: i === idx ? '40px' : '10px',
                height: '4px',
                borderRadius: '2px',
                background: i === idx ? catMeta.color : 'rgba(255,255,255,0.1)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                boxShadow: i === idx ? `0 0 15px ${catMeta.color}` : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>

        {/* Info & Navigation Hint */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', fontWeight: 700 }}>NAVIGATION_HELPER::</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['←', '→'].map(k => (
                <div key={k} style={{ padding: '2px 6px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', borderRadius: '3px' }}>{k}</div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            fontSize: '0.9rem', color: catMeta.color, 
            fontWeight: 900, letterSpacing: '4px', 
            fontFamily: 'var(--font-mono)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ opacity: 0.4 }}>VIEWING_OBJECT::</span>
            {String(idx + 1).padStart(2,'0')}/{String(items.length).padStart(2,'0')}
          </div>
        </div>

        {/* Core System Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
           <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '3px', fontWeight: 700 }}>
             RIMBA_ARCHIVE_CORE_V4.3 // DEEP_FILES
           </span>
        </div>
      </footer>

      {/* Mobile Optimization Style Injector */}
      <style>{`
        @media (max-width: 1400px) {
          .portfolio-sidebar {
            display: none !important;
          }
          .portfolio-main-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) {
          .slideshow-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            max-width: 700px !important;
          }
          .slideshow-grid > div:first-child {
            order: 2;
          }
          .slideshow-grid > div:last-child {
            order: 1;
            text-align: center;
            align-items: center;
          }
          .slideshow-grid p {
            margin: 0 auto !important;
            border-left: none !important;
            padding-left: 0 !important;
            text-align: center;
          }
          .slideshow-grid div {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
