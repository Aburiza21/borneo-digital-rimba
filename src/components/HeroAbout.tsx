import React from 'react';
import { motion } from 'framer-motion';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import { Download, FileText, Award, Code2, Cpu, Users, Layers } from 'lucide-react';

export default function HeroAbout() {
  const { t } = useLanguage();

  const content = {
    title: { id: 'Sang Arsitek', en: 'The Architect' },
    subtitle: { id: 'CLASSIFIED // ARCHIVE_DATA_042', en: 'CLASSIFIED // ARCHIVE_DATA_042' },
    role: { id: 'Technical Lead & Full Stack Engineer', en: 'Technical Lead & Full Stack Engineer' },
    bio: {
      id: 'Full-Stack Developer berpengalaman lebih dari 4 tahun dengan rekam jejak sebagai Technical Lead. Ahli dalam memimpin pengembangan solusi yang robust, efisien, dan berorientasi pada pengalaman pengguna — dari arsitektur sistem hingga implementasi end-to-end.',
      en: 'Full-Stack Developer with over 4 years of experience and a proven track record as a Technical Lead. Expert in leading the development of robust, efficient, and user-centric solutions — from system architecture to end-to-end implementation.'
    },
    cv: { id: 'UNDUH CV', en: 'DOWNLOAD CV' },
    portfolio: { id: 'PORTOFOLIO PDF', en: 'PORTFOLIO PDF' },
    cert: { id: 'SERTIFIKAT BNSP', en: 'BNSP CERTIFICATE' }
  };

  const competencies = [
    { icon: <Code2 size={18} />, label: { id: 'Full Stack Engineering', en: 'Full Stack Engineering' }, pct: 92, color: 'var(--accent-color)' },
    { icon: <Users size={18} />, label: { id: 'Technical Leadership', en: 'Technical Leadership' }, pct: 88, color: 'var(--accent-tertiary)' },
    { icon: <Layers size={18} />, label: { id: 'System Architecture', en: 'System Architecture' }, pct: 85, color: 'var(--accent-secondary)' },
    { icon: <Cpu size={18} />, label: { id: 'DevOps & Infra', en: 'DevOps & Infra' }, pct: 78, color: 'var(--accent-color)' },
  ];

  const creds = [
    { label: t('cv', content.cv), file: '/assets/cv.pdf', accent: 'var(--accent-color)', icon: <Download size={14} /> },
    { label: t('portfolio', content.portfolio), file: '/assets/portfolio.pdf', accent: 'var(--accent-secondary)', icon: <FileText size={14} /> },
    { label: t('cert', content.cert), file: '/assets/certificate.pdf', accent: 'var(--accent-tertiary)', icon: <Award size={14} /> },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as any }
  });

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 4vw, 3rem) clamp(1rem, 6vw, 6rem)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/bg/bg_about.png)', backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.1, mixBlendMode: 'screen', pointerEvents: 'none', maskImage: 'linear-gradient(to left, black 0%, rgba(0,0,0,0.5) 40%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to left, black 0%, rgba(0,0,0,0.5) 40%, transparent 80%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,6,23,0.85) 25%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        display: 'grid',
        gridTemplateColumns: '1fr clamp(280px, 40%, 560px)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }}>

        {/* ──────────── LEFT: Identity & Bio ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2.5vh, 2rem)' }}>
          
          {/* Archive tag */}
          <motion.div {...fadeUp(0)}>
            <div className="hud-tag" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              borderLeft: '3px solid var(--accent-secondary)',
              paddingLeft: '1rem', color: 'var(--accent-secondary)', opacity: 0.8
            }}>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-secondary)', display: 'inline-block' }}
              />
              {t('subtitle', content.subtitle)}
            </div>
          </motion.div>

          {/* Big title */}
          <motion.div {...fadeUp(0.08)}>
            <h1 style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 950,
              lineHeight: 0.88,
              letterSpacing: 'clamp(-2px, -0.4vw, -4px)',
              textTransform: 'uppercase',
              margin: 0,
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.7) 50%, var(--accent-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px rgba(255, 0, 222, 0.2))',
            }}>
              {t('title', content.title)}
            </h1>
          </motion.div>

          {/* Role subtitle */}
          <motion.div {...fadeUp(0.15)} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '36px', height: '2px', background: 'var(--accent-secondary)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.4vw, 0.9rem)',
              color: 'var(--accent-secondary)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              opacity: 0.9
            }}>
              {t('role', content.role)}
            </span>
          </motion.div>

          {/* Dayak divider */}
          <motion.div {...fadeUp(0.2)} style={{ opacity: 0.4, maxWidth: '400px' }}>
            <DayakMotifs.MandauDivider color="var(--accent-secondary)" />
          </motion.div>

          {/* Bio paragraph */}
          <motion.p {...fadeUp(0.25)} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
            lineHeight: 1.9,
            color: 'var(--text-color)',
            opacity: 0.75,
            fontWeight: 300,
            margin: 0,
            maxWidth: '680px',
          }}>
            {t('bio', content.bio)}
          </motion.p>

          {/* Competency bars */}
          <motion.div {...fadeUp(0.32)} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '560px' }}>
            {competencies.map((comp, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: comp.color }}>
                    {comp.icon}
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--text-color)',
                      opacity: 0.8
                    }}>
                      {t('label', comp.label)}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: comp.color,
                    fontWeight: 700
                  }}>
                    {comp.pct}%
                  </span>
                </div>
                <div className="energy-bar-container">
                  <motion.div
                    className="energy-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] as any }}
                    style={{ background: comp.color, color: comp.color }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ──────────── RIGHT: HUD Panel ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2.5vh, 1.8rem)' }}
        >
          {/* Identity data card */}
          <div className="hud-panel neon-border" style={{
            padding: 'clamp(1.2rem, 2.5vw, 2rem)',
            background: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="scan-line" style={{ animationDuration: '8s', opacity: 0.15 }} />

            {/* Corner decoration */}
            <div style={{ position: 'absolute', top: '15px', right: '15px', opacity: 0.2, color: 'var(--accent-secondary)' }}>
              <DayakMotifs.AsoCorner size={40} />
            </div>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', opacity: 0.2, color: 'var(--accent-secondary)', transform: 'rotate(180deg)' }}>
              <DayakMotifs.AsoCorner size={40} />
            </div>

            <div className="hud-tag" style={{
              color: 'var(--accent-secondary)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              paddingBottom: '0.75rem',
              marginBottom: '1.2rem'
            }}>
              AGENT_PROFILE // IDENTITY_NODE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'AGENT_ID', value: 'ABU-RIZA-001' },
                { key: 'DESIGNATION', value: 'FULL_STACK_OPS' },
                { key: 'AUTHORITY_LEVEL', value: 'TECHNICAL_LEAD' },
                { key: 'BASE_COORD', value: 'PONTIANAK, BORNEO' },
                { key: 'UPTIME_LOG', value: '4+ TAHUN // 1460+ DAYS' },
                { key: 'CLEARANCE', value: 'BNSP_CERTIFIED ✓' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  paddingBottom: i < 5 ? '0.75rem' : 0,
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.58rem, 1vw, 0.68rem)',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '1px',
                    flexShrink: 0
                  }}>
                    {row.key}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.62rem, 1vw, 0.72rem)',
                    color: 'var(--text-color)',
                    fontWeight: 600,
                    textAlign: 'right',
                    letterSpacing: '0.5px'
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Background hologram thumbnail */}
          <div style={{
            position: 'relative',
            height: 'clamp(120px, 18vh, 180px)',
            overflow: 'hidden',
            border: '1px solid rgba(255,0,222,0.15)',
            background: 'rgba(0,0,0,0.4)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/cyberpunk_longhouse_ancient_hologram_1775244225044.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.25,
              filter: 'saturate(0.5) hue-rotate(200deg)',
              mixBlendMode: 'screen'
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, transparent 1px, transparent 3px)',
            }} />
            <motion.div
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', top: 0, width: '2px', height: '100%',
                background: 'var(--accent-secondary)', opacity: 0.5,
                boxShadow: '0 0 15px var(--accent-secondary)'
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ opacity: 0.15, color: 'var(--accent-secondary)' }}>
                <DayakMotifs.AncientSeal size={100} />
              </div>
            </div>
            <div className="hud-tag" style={{
              position: 'absolute', bottom: '10px', left: '12px',
              fontSize: '0.58rem', color: 'var(--accent-secondary)', opacity: 0.6
            }}>
              RIMBA_HOLOGRAM_STREAM // ACCESS_GRANTED
            </div>
          </div>

          {/* Credential download buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <div className="hud-tag" style={{
              marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5
            }}>
              <span style={{ width: '5px', height: '5px', background: 'var(--accent-color)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-color)', display: 'inline-block' }} />
              CREDENTIALS_UPLINK // ACCESS_GRANTED
            </div>
            {creds.map((btn, i) => (
              <motion.a
                key={i}
                href={btn.file}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6, opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: 'clamp(0.6rem, 1.2vw, 0.85rem) clamp(1rem, 2vw, 1.4rem)',
                  border: `1px solid ${btn.accent}30`,
                  background: `${btn.accent}08`,
                  color: btn.accent,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  opacity: 0.85
                }}
              >
                {btn.icon}
                {btn.label}
                <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '0.65rem' }}>→</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
