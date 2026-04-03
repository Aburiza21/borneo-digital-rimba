import React from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Award, ChevronRight, Layers } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';

interface PortfolioProps {
  activeStep?: number;
}

const projects = [
  {
    id: '᚛ LOG-SMART-01 ᚜',
    title: { id: 'Logbook (Control Room)', en: 'Logbook (Control Room)' },
    category: { id: 'Full Stack & Industrial', en: 'Full Stack & Industrial' },
    image: '/assets/projects/logbook.png',
    link: '#',
    tech: ['Laravel', 'Inertia', 'React', 'Postgres', 'Docker'],
    achievement: { id: 'Silver Award & Top 3 Presentasi Terbaik', en: 'Silver Award & Top 3 Best Presentation' },
    accent: 'var(--accent-tertiary)',
    desc: {
      id: 'Sistem operasional terpusat untuk industri kritis dengan reliabilitas tinggi. Mendigitalisasi pencatatan operasional secara real-time.',
      en: 'Centralized operational system for critical industry with high reliability. Digitalizing operational logging with real-time visibility.'
    }
  },
  {
    id: '᚛ POS-REACTIVE-02 ᚜',
    title: { id: 'Reactive POS', en: 'Reactive POS' },
    category: { id: 'Enterprise Solutions', en: 'Enterprise Solutions' },
    image: '/assets/projects/pos.png',
    link: 'https://rbpkasir-lite.rumahbelajarprinting.com/',
    tech: ['React', 'Node.js', 'Express', 'Postgres', 'Docker'],
    achievement: { id: 'Reduksi waktu proses order hingga 50%', en: 'Reduced order process time by 50%' },
    accent: 'var(--accent-color)',
    desc: {
      id: 'Aplikasi kasir enterprise berbasis web yang mendukung operasional multi-cabang dengan manajemen gudang terpusat.',
      en: 'Web-based enterprise POS supporting multi-branch operations with centralized warehouse management.'
    }
  },
  {
    id: '᚛ GIS-FLOOD-03 ᚜',
    title: { id: 'SIBeBan (GIS)', en: 'SIBeBan (GIS)' },
    category: { id: 'Geospatial & Analytics', en: 'Geospatial & Analytics' },
    image: '/assets/projects/gis.png',
    link: 'https://github.com/Aburiza41/SIBeBan',
    tech: ['Python', 'React', 'Leaflet', 'PostGIS'],
    achievement: { id: 'Peringatan dini banjir — Sintang', en: 'Flood early warning for Sintang District' },
    accent: 'var(--accent-secondary)',
    desc: {
      id: 'Platform GIS berbasis web untuk memantau dan memprediksi wilayah rawan banjir secara real-time.',
      en: 'Web-based GIS platform to monitor and predict flood-prone areas in real-time with data analysis.'
    }
  },
  {
    id: '᚛ HIS-INTEGRA-04 ᚜',
    title: { id: 'Hospital Info System', en: 'Hospital Info System' },
    category: { id: 'Healthcare Tech', en: 'Healthcare Tech' },
    image: '/assets/projects/his.png',
    link: '#',
    tech: ['Laravel', 'Inertia', 'React', 'SQLite', 'Docker'],
    achievement: { id: '60+ Modul & Integrasi SATUSEHAT', en: '60+ Modules & SATUSEHAT Integration' },
    accent: 'var(--accent-color)',
    desc: {
      id: 'Platform terintegrasi untuk manajemen rumah sakit lengkap — Rawat Jalan, IGD, Farmasi, Keuangan.',
      en: 'Integrated platform for complete hospital management — Outpatient, ER, Pharmacy, Finance.'
    }
  },
];

export default function Portfolio({ activeStep = 0 }: PortfolioProps) {
  const { t } = useLanguage();

  const labels = {
    heading: { id: 'ARSIP_SEJARAH_DATA', en: 'HISTORICAL_ARCHIVE' },
    title: { id: 'Relikui Digital', en: 'Digital Relics' },
    access: { id: 'AKSES_DATA', en: 'RECOVER_ACCESS' },
  };

  const proj = projects[activeStep] ?? projects[0];

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(1rem, 4vw, 2.5rem) clamp(1rem, 6vw, 6rem)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Ambient Accent Glow ── */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          position: 'absolute',
          bottom: '-20%', left: '20%',
          width: '700px', height: '700px',
          background: `radial-gradient(circle, ${proj.accent} 0%, transparent 65%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Section background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/bg/bg_portfolio.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'screen', pointerEvents: 'none', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 60%, black 15%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 60%, black 15%, transparent 100%)' }} />

      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 2rem)' }}>

        {/* ── Compact Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="tribal-heading" style={{ marginBottom: '0.3rem' }}>{t('heading', labels.heading)}</div>
            <h2 className="section-title" style={{
              color: proj.accent,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              margin: 0,
              transition: 'color 0.5s ease',
              textShadow: `0 0 30px ${proj.accent}50`,
            }}>
              {t('title', labels.title)}
            </h2>
          </div>

          {/* Project index pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {projects.map((p, i) => (
              <div
                key={i}
                style={{
                  width: activeStep === i ? '48px' : '12px',
                  height: '3px',
                  background: activeStep === i ? p.accent : 'rgba(255,255,255,0.12)',
                  borderRadius: '2px',
                  transition: 'all 0.5s ease',
                  boxShadow: activeStep === i ? `0 0 12px ${p.accent}` : 'none',
                }}
              />
            ))}
            <span className="hud-tag" style={{ opacity: 0.4, fontSize: '0.6rem', marginLeft: '0.5rem' }}>
              {String(activeStep + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 44%, 600px) 1fr',
          gap: 'clamp(1.5rem, 4vw, 4rem)',
          alignItems: 'center',
        }}>

          {/* ───── LEFT: Image Panel ───── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${activeStep}`}
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(20px)' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ position: 'relative' }}
            >
              <TiltImage proj={proj} />

              {/* Project list sidebar below image */}
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {projects.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '0.5rem 0.75rem',
                      border: `1px solid ${activeStep === i ? p.accent + '50' : 'rgba(255,255,255,0.04)'}`,
                      background: activeStep === i ? `${p.accent}0a` : 'transparent',
                      transition: 'all 0.4s',
                      cursor: 'default',
                    }}
                  >
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: activeStep === i ? p.accent : 'rgba(255,255,255,0.15)', flexShrink: 0, boxShadow: activeStep === i ? `0 0 8px ${p.accent}` : 'none', transition: 'all 0.4s' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: activeStep === i ? 'var(--text-color)' : 'rgba(255,255,255,0.25)', letterSpacing: '1px', fontWeight: activeStep === i ? 700 : 400, transition: 'all 0.4s' }}>
                      {t('title', p.title)}
                    </span>
                    {activeStep === i && <ChevronRight size={12} color={p.accent} style={{ marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ───── RIGHT: Project Detail ───── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`detail-${activeStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.9rem, 2vh, 1.5rem)' }}
            >
              {/* ID + Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="hud-tag" style={{
                  border: `1px solid ${proj.accent}50`,
                  background: `${proj.accent}0d`,
                  color: proj.accent,
                  fontSize: '0.58rem',
                }}>
                  {proj.id}
                </div>
                <div style={{ height: '1px', flex: 1, background: `${proj.accent}25` }} />
                <span className="hud-tag" style={{ fontSize: '0.65rem', opacity: 0.5, letterSpacing: '2px' }}>
                  {t('category', proj.category)}
                </span>
              </div>

              {/* Project title */}
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                fontWeight: 950,
                lineHeight: 0.9,
                letterSpacing: 'clamp(-1px, -0.3vw, -3px)',
                textTransform: 'uppercase',
                color: 'var(--text-color)',
                margin: 0,
                filter: `drop-shadow(0 0 20px ${proj.accent}40)`,
              }}>
                {t('title', proj.title)}
              </h3>

              {/* Achievement badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '0.5rem 1rem',
                border: `1px solid ${proj.accent}30`,
                background: `${proj.accent}08`,
                width: 'fit-content',
                maxWidth: '100%',
              }}>
                <Award size={14} color={proj.accent} style={{ flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)',
                  color: proj.accent,
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}>
                  {t('achievement', proj.achievement)}
                </span>
              </div>

              {/* Divider */}
              <div style={{ opacity: 0.4, maxWidth: '380px' }}>
                <DayakMotifs.MandauDivider color={proj.accent} />
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.88rem, 1.5vw, 1.15rem)',
                lineHeight: 1.85,
                color: 'var(--text-color)',
                opacity: 0.72,
                fontWeight: 300,
                margin: 0,
                borderLeft: `2px solid ${proj.accent}30`,
                paddingLeft: '1.2rem',
                maxWidth: '600px',
              }}>
                {t('desc', proj.desc)}
              </p>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '0.25rem' }}>
                  <Layers size={12} color={proj.accent} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: proj.accent, opacity: 0.6, letterSpacing: '1px' }}>STACK</span>
                </div>
                {proj.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ borderColor: proj.accent, color: proj.accent }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.58rem, 1vw, 0.7rem)',
                      padding: '3px 10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.5px',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href={proj.link === '#' ? undefined : proj.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: proj.link !== '#' ? 1.03 : 1 }}
                whileTap={{ scale: proj.link !== '#' ? 0.97 : 1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 2rem)',
                  border: `1px solid ${proj.accent}50`,
                  background: `${proj.accent}10`,
                  color: proj.accent,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: proj.link !== '#' ? 'pointer' : 'not-allowed',
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  opacity: proj.link !== '#' ? 1 : 0.4,
                  width: 'fit-content',
                  transition: 'all 0.25s',
                }}
              >
                <ExternalLink size={15} />
                {t('access', { id: 'AKSES_DATA', en: 'RECOVER ACCESS' })}
              </motion.a>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

/* ── Tilt image card ── */
function TiltImage({ proj }: { proj: typeof projects[0] }) {
  const { t } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 120, damping: 22 });
  const my = useSpring(y, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(my, [-100, 100], [8, -8]);
  const rotateY = useTransform(mx, [-100, 100], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '16/10',
        overflow: 'hidden',
        border: `1px solid ${proj.accent}30`,
        background: '#000',
        boxShadow: `0 30px 80px -20px ${proj.accent}40, 0 0 0 1px ${proj.accent}15`,
      }}>
        {/* Image */}
        <motion.img
          src={proj.image}
          alt={t('title', proj.title)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, userSelect: 'none' }}
          whileHover={{ scale: 1.06, opacity: 0.9 }}
          transition={{ duration: 0.6 }}
        />

        {/* CRT scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
        }} />

        {/* Horizontal scan bar */}
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', left: 0, width: '100%', height: '3px',
            background: `linear-gradient(90deg, transparent, ${proj.accent}, transparent)`,
            opacity: 0.5,
            boxShadow: `0 0 20px ${proj.accent}`,
            zIndex: 2,
          }}
        />

        {/* Top-left project ID */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: proj.accent,
          background: 'rgba(0,0,0,0.7)',
          border: `1px solid ${proj.accent}40`,
          padding: '3px 8px',
          letterSpacing: '1px',
          backdropFilter: 'blur(10px)',
        }}>
          {proj.id}
        </div>

        {/* Bottom-right category */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(0,0,0,0.65)',
          padding: '3px 8px',
          backdropFilter: 'blur(10px)',
          letterSpacing: '1px',
        }}>
          {t('category', proj.category)}
        </div>

        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: `2px solid ${proj.accent}`, borderLeft: `2px solid ${proj.accent}` }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: `2px solid ${proj.accent}`, borderRight: `2px solid ${proj.accent}` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: `2px solid ${proj.accent}`, borderLeft: `2px solid ${proj.accent}` }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: `2px solid ${proj.accent}`, borderRight: `2px solid ${proj.accent}` }} />
      </div>
    </motion.div>
  );
}
