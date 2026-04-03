import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Users, Zap, ChevronRight, CheckCircle2, Code2 } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';

interface ServicesProps {
  activeStep?: number;
}

const servicesData = [
  {
    id: 'CAP-LEA-01',
    icon: Users,
    title: { id: 'Leadership & Arsitektur', en: 'Leadership & Architecture' },
    description: {
      id: 'Memastikan integritas teknis melalui kepemimpinan tim, manajemen proyek Agile, dan perancangan arsitektur sistem yang robust dan scalable.',
      en: 'Ensuring technical integrity through team leadership, Agile project management, and designing robust, scalable system architectures.',
    },
    skills: ['Team Leadership', 'Agile / Scrum', 'System Design', 'Code Review', 'Tech Mentoring', 'Sprint Planning'],
    metrics: [
      { label: { id: 'Tim Dipimpin', en: 'Teams Led' }, value: '3+' },
      { label: { id: 'Proyek Agile', en: 'Agile Projects' }, value: '6+' },
      { label: { id: 'Anggota Tim', en: 'Team Members' }, value: '10+' },
    ],
    color: 'var(--accent-tertiary)',
  },
  {
    id: 'CAP-FS-02',
    icon: Terminal,
    title: { id: 'Full Stack Engineering', en: 'Full Stack Engineering' },
    description: {
      id: 'Membangun solusi end-to-end menggunakan Laravel, Node.js, React, dan Next.js dengan fokus pada performa, skalabilitas, dan pengalaman pengguna optimal.',
      en: 'Crafting end-to-end solutions using Laravel, Node.js, React, and Next.js with focus on performance, scalability, and optimal user experience.',
    },
    skills: ['Laravel', 'React / Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'REST / GraphQL'],
    metrics: [
      { label: { id: 'Tahun Pengalaman', en: 'Years Experience' }, value: '4+' },
      { label: { id: 'Aplikasi Dibangun', en: 'Apps Built' }, value: '20+' },
      { label: { id: 'Baris Kode', en: 'Lines of Code' }, value: '100K+' },
    ],
    color: 'var(--accent-color)',
  },
  {
    id: 'CAP-SYS-03',
    icon: Cpu,
    title: { id: 'Sistem Spesialis', en: 'Specialized Systems' },
    description: {
      id: 'Integrasi sistem GIS berbasis Leaflet/PostGIS, implementasi DevOps dengan Docker, serta pengelolaan infrastruktur IT dan dukungan teknis enterprise.',
      en: 'GIS system integration with Leaflet/PostGIS, DevOps implementation with Docker, and enterprise IT infrastructure management and technical support.',
    },
    skills: ['GIS / Leaflet', 'PostGIS', 'Docker', 'Linux Server', 'CI/CD', 'System Integration'],
    metrics: [
      { label: { id: 'Sistem GIS', en: 'GIS Systems' }, value: '2' },
      { label: { id: 'Server Dikelola', en: 'Servers Managed' }, value: '5+' },
      { label: { id: 'Integrasi API', en: 'API Integrations' }, value: '15+' },
    ],
    color: 'var(--accent-secondary)',
  },
];

export default function Services({ activeStep = 0 }: ServicesProps) {
  const { t } = useLanguage();

  const svc = servicesData[activeStep] ?? servicesData[0];
  const Icon = svc.icon;

  const labels = {
    heading: { id: 'INTI_OPERASIONAL_NEURAL', en: 'NEURAL_OPERATIONAL_CORE' },
    title: { id: 'Node Kemampuan', en: 'Capabilities Matrix' },
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as any },
  });

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 4vw, 2.5rem) clamp(1rem, 6vw, 6rem)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          position: 'absolute',
          top: '-10%', right: '10%',
          width: '700px', height: '700px',
          background: `radial-gradient(circle, ${svc.color} 0%, transparent 65%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Section background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/bg/bg_services.png)', backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.08, mixBlendMode: 'screen', pointerEvents: 'none', maskImage: 'linear-gradient(to left, black 0%, rgba(0,0,0,0.4) 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 0%, rgba(0,0,0,0.4) 55%, transparent 100%)' }} />

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr clamp(280px, 38%, 500px)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ──────────── LEFT: Active Capability Spotlight ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.8rem)' }}>

          {/* Section header */}
          <motion.div {...fadeUp(0)}>
            <div className="tribal-heading" style={{ marginBottom: '0.4rem' }}>
              {t('heading', labels.heading)}
            </div>
            <h2 className="section-title" style={{
              color: svc.color,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              margin: 0,
              transition: 'color 0.5s ease',
              textShadow: `0 0 30px ${svc.color}50`,
            }}>
              {t('title', labels.title)}
            </h2>
          </motion.div>

          {/* Active capability detail — crossfade on step change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
              {/* Icon + ID row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{
                  width: 'clamp(52px, 7vw, 80px)',
                  height: 'clamp(52px, 7vw, 80px)',
                  background: `${svc.color}15`,
                  border: `1px solid ${svc.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: svc.color,
                  boxShadow: `0 0 25px ${svc.color}25`,
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  flexShrink: 0,
                }}>
                  <Icon size={28} />
                </div>
                <div className="hud-tag" style={{ color: svc.color, fontSize: '0.65rem' }}>
                  {svc.id} // CAPABILITY_NODE_ACTIVE
                </div>
              </div>

              {/* Capability title */}
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                fontWeight: 950,
                lineHeight: 0.88,
                letterSpacing: 'clamp(-1px, -0.3vw, -3px)',
                textTransform: 'uppercase',
                color: 'var(--text-color)',
                margin: 0,
                filter: `drop-shadow(0 0 20px ${svc.color}30)`,
              }}>
                {t('title', svc.title)}
              </h3>

              {/* Separator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '2px', background: svc.color, flexShrink: 0 }} />
                <div style={{ flex: 1, height: '1px', background: `${svc.color}20` }} />
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                lineHeight: 1.85,
                color: 'var(--text-color)',
                opacity: 0.72,
                fontWeight: 300,
                margin: 0,
                borderLeft: `2px solid ${svc.color}30`,
                paddingLeft: '1.2rem',
                maxWidth: '620px',
              }}>
                {t('description', svc.description)}
              </p>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {svc.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ borderColor: svc.color, color: svc.color }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                      padding: '4px 12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.5px',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    <CheckCircle2 size={9} color={svc.color} />
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Metrics row */}
              <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 1.5rem)', flexWrap: 'wrap' }}>
                {svc.metrics.map((m, i) => (
                  <div key={i} style={{
                    flex: '1 1 90px',
                    padding: 'clamp(0.7rem, 1.5vw, 1rem)',
                    border: `1px solid ${svc.color}25`,
                    background: `${svc.color}07`,
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      fontWeight: 900,
                      color: svc.color,
                      textShadow: `0 0 15px ${svc.color}60`,
                      lineHeight: 1,
                    }}>
                      {m.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '1px',
                      marginTop: '0.3rem',
                      textTransform: 'uppercase',
                    }}>
                      {t('label', m.label)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ──────────── RIGHT: Capability Cards Stack ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {servicesData.map((s, i) => {
            const isActive = activeStep === i;
            const SIcon = s.icon;
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1 : 0.98,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  border: `1px solid ${isActive ? s.color + '55' : 'rgba(255,255,255,0.05)'}`,
                  background: isActive ? `${s.color}0a` : 'rgba(2, 6, 23, 0.6)',
                  backdropFilter: 'blur(10px)',
                  padding: isActive ? 'clamp(1rem, 2.5vw, 1.8rem)' : 'clamp(0.7rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.4rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.45s ease',
                  clipPath: isActive
                    ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                    : 'none',
                  boxShadow: isActive ? `0 0 40px -15px ${s.color}` : 'none',
                }}
              >
                {/* Scan line on active */}
                {isActive && <div className="scan-line" style={{ animationDuration: '5s', opacity: 0.1 }} />}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Icon bubble */}
                  <div style={{
                    width: isActive ? 'clamp(44px, 5vw, 56px)' : '36px',
                    height: isActive ? 'clamp(44px, 5vw, 56px)' : '36px',
                    background: isActive ? s.color : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#020617' : s.color,
                    flexShrink: 0,
                    transition: 'all 0.4s',
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    boxShadow: isActive ? `0 0 20px ${s.color}60` : 'none',
                  }}>
                    <SIcon size={isActive ? 22 : 16} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: s.color,
                      opacity: isActive ? 0.7 : 0.4,
                      letterSpacing: '1.5px',
                      marginBottom: '2px',
                    }}>
                      {s.id}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: isActive ? 'clamp(1rem, 2vw, 1.4rem)' : 'clamp(0.85rem, 1.5vw, 1.05rem)',
                      fontWeight: 800,
                      color: 'var(--text-color)',
                      letterSpacing: '-0.5px',
                      transition: 'all 0.4s',
                    }}>
                      {t('title', s.title)}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={18} color={s.color} />
                  </motion.div>
                </div>

                {/* Expanded content on active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: '1rem',
                        paddingTop: '0.9rem',
                        borderTop: `1px solid ${s.color}20`,
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <Zap size={13} color={s.color} fill={s.color} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: s.color,
                          fontWeight: 700,
                          letterSpacing: '2px',
                          opacity: 0.85,
                        }}>
                          ACCESS_GRANTED // ENGINE_READY
                        </span>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}`, display: 'inline-block', marginLeft: 'auto' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '3px', height: '100%',
                  background: s.color,
                  opacity: isActive ? 0.8 : 0.1,
                  transition: 'opacity 0.4s',
                }} />
              </motion.div>
            );
          })}

          {/* Dayak motif watermark */}
          <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.1, marginTop: '0.5rem', color: svc.color }}>
            <DayakMotifs.AncientSeal size={80} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
