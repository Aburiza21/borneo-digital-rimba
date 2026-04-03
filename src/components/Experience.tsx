import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Activity, Briefcase, Calendar, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';

interface ExperienceProps {
  activeStep?: number;
}

const experiences = [
  {
    id: '᚛ XP-MEDIKA-01 ᚜',
    year: '2025 — PRESENT',
    duration: { id: 'Aktif Saat Ini', en: 'Currently Active' },
    role: { id: 'IT Staff', en: 'IT Staff' },
    company: 'RS MITRA MEDIKA',
    companyFull: 'RS Mitra Medika (PT Hexa Daya Medika)',
    desc: {
      id: 'Memimpin pengembangan aplikasi internal full-stack untuk mengotomasi proses operasional rumah sakit. Bertanggung jawab atas infrastruktur IT, jaringan, server, dan sistem secara menyeluruh.',
      en: 'Leading internal full-stack application development to automate hospital operational processes. Responsible for complete IT infrastructure, networking, servers, and systems.',
    },
    highlights: [
      { id: 'Pengembang sistem HIS dengan 60+ modul', en: 'HIS system developer with 60+ modules' },
      { id: 'Integrasi SATUSEHAT (Kemenkes)', en: 'SATUSEHAT Integration (Ministry of Health)' },
      { id: 'Pengelolaan infrastruktur IT & jaringan', en: 'IT infrastructure & network management' },
      { id: 'Supervisor teknis tim developer internal', en: 'Technical supervisor for internal dev team' },
    ],
    tech: ['Laravel', 'React', 'Inertia', 'SQLite', 'Docker', 'Linux'],
    theme: 'var(--accent-color)',
    status: 'LIVE',
  },
  {
    id: '᚛ XP-REACTIVE-02 ᚜',
    year: '2024 — 2025',
    duration: { id: '±1 Tahun', en: '±1 Year' },
    role: { id: 'Technical Lead', en: 'Technical Lead' },
    company: 'REACTIVE INC.',
    companyFull: 'Reactive Incorporated (PT Sepakat Digital)',
    desc: {
      id: 'Memimpin dan memberdayakan tim produksi melalui analisis kinerja rutin. Merancang arsitektur dan pondasi teknis untuk berbagai proyek baru serta mengelola siklus hidup proyek secara end-to-end.',
      en: 'Leading and empowering production teams through routine performance reviews. Designed architecture and technical foundations for new projects, managing end-to-end project lifecycles.',
    },
    highlights: [
      { id: 'Perancangan arsitektur sistem enterprise', en: 'Enterprise system architecture design' },
      { id: 'Memimpin tim 4–6 developer', en: 'Leading team of 4–6 developers' },
      { id: 'Manajemen sprint & code review', en: 'Sprint management & code review' },
      { id: 'Pengiriman 3 proyek enterprise besar', en: 'Delivered 3 major enterprise projects' },
    ],
    tech: ['Laravel', 'React', 'Node.js', 'Postgres', 'Docker', 'Scrum'],
    theme: 'var(--accent-tertiary)',
    status: 'COMPLETED',
  },
];

export default function Experience({ activeStep = 0 }: ExperienceProps) {
  const { t } = useLanguage();

  const exp = experiences[activeStep] ?? experiences[0];

  const labels = {
    heading: { id: 'LOG_EVOLUSI_LELUHUR', en: 'LIFECYCLE_ANCESTRAL_DATA' },
    title: { id: 'Log Evolusi', en: 'Evolution Logs' },
  };

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
        animate={{ opacity: [0.05, 0.13, 0.05] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          position: 'absolute',
          top: '-10%', right: '5%',
          width: '700px', height: '700px',
          background: `radial-gradient(circle, ${exp.theme} 0%, transparent 65%)`,
          filter: 'blur(100px)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Section background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/bg/bg_experience.png)', backgroundSize: 'cover', backgroundPosition: 'center left', opacity: 0.09, mixBlendMode: 'screen', pointerEvents: 'none', maskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr clamp(260px, 36%, 480px)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ──────────── LEFT: Active Experience Spotlight ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.8rem)' }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="tribal-heading" style={{ marginBottom: '0.4rem' }}>
              {t('heading', labels.heading)}
            </div>
            <h2 className="section-title" style={{
              color: exp.theme,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              margin: 0,
              display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
              transition: 'color 0.5s ease',
              textShadow: `0 0 30px ${exp.theme}50`,
            }}>
              <History size={36} />
              {t('title', labels.title)}
            </h2>
          </motion.div>

          {/* Crossfade experience detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
              {/* ID + Year + Status row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div className="hud-tag" style={{
                  border: `1px solid ${exp.theme}50`,
                  background: `${exp.theme}0d`,
                  color: exp.theme, fontSize: '0.58rem',
                }}>
                  {exp.id}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                  <Calendar size={10} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>{exp.year}</span>
                </div>
                <motion.div
                  animate={{ opacity: exp.status === 'LIVE' ? [0.6, 1, 0.6] : 1 }}
                  transition={{ repeat: exp.status === 'LIVE' ? Infinity : 0, duration: 1.4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '3px 10px',
                    border: `1px solid ${exp.theme}40`,
                    background: `${exp.theme}0a`,
                  }}
                >
                  {exp.status === 'LIVE' && (
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: exp.theme, boxShadow: `0 0 8px ${exp.theme}`, display: 'inline-block' }} />
                  )}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: exp.theme, fontWeight: 700, letterSpacing: '1.5px' }}>
                    {exp.status}
                  </span>
                </motion.div>
              </div>

              {/* Role title */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  fontWeight: 950,
                  lineHeight: 0.85,
                  letterSpacing: 'clamp(-2px, -0.4vw, -4px)',
                  textTransform: 'uppercase',
                  color: 'var(--text-color)',
                  margin: 0,
                  filter: `drop-shadow(0 0 25px ${exp.theme}30)`,
                }}>
                  {t('role', exp.role)}
                </h3>

                {/* Company + separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '36px', height: '2px', background: exp.theme, flexShrink: 0 }} />
                  <Briefcase size={14} color={exp.theme} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
                    color: exp.theme,
                    letterSpacing: '0.15em',
                    fontWeight: 700,
                  }}>
                    {exp.companyFull}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.88rem, 1.5vw, 1.1rem)',
                lineHeight: 1.85,
                color: 'var(--text-color)',
                opacity: 0.68,
                fontWeight: 300,
                margin: 0,
                borderLeft: `2px solid ${exp.theme}30`,
                paddingLeft: '1.2rem',
                maxWidth: '620px',
              }}>
                {t('desc', exp.desc)}
              </p>

              {/* Highlight bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {exp.highlights.map((hl, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}
                  >
                    <CheckCircle2 size={13} color={exp.theme} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
                      color: 'rgba(255,255,255,0.62)',
                      letterSpacing: '0.3px',
                      lineHeight: 1.5,
                    }}>
                      {t('hl', hl)}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {exp.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ borderColor: exp.theme, color: exp.theme }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      padding: '3px 12px',
                      border: '1px solid rgba(255,255,255,0.09)',
                      background: 'rgba(255,255,255,0.02)',
                      color: 'rgba(255,255,255,0.44)',
                      letterSpacing: '0.5px',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Live stream indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Activity size={16} color={exp.theme} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: exp.theme,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  opacity: 0.75,
                }}>
                  {exp.status === 'LIVE' ? 'EVOLUTION_ACTIVE // LOG_STREAM: LIVE' : 'EVOLUTION_COMPLETE // LOG_ARCHIVED'}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ──────────── RIGHT: Experience Timeline + BNSP ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {/* Neural path */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: '21px',
              top: '28px', bottom: '28px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-color), var(--accent-tertiary))',
              opacity: 0.2, zIndex: 0,
            }} />

            {experiences.map((e, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={i}
                  animate={{ opacity: isActive ? 1 : 0.32, scale: isActive ? 1 : 0.98 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'relative',
                    paddingLeft: '56px',
                    paddingBottom: i < experiences.length - 1 ? 'clamp(1.5rem, 3vh, 2rem)' : 0,
                  }}
                >
                  {/* Pulse node */}
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.45, 1] : 1,
                      boxShadow: isActive ? `0 0 20px ${e.theme}, 0 0 40px ${e.theme}40` : 'none',
                    }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                    style={{
                      position: 'absolute', left: '12px', top: '28px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: isActive ? e.theme : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${isActive ? e.theme : 'rgba(255,255,255,0.12)'}`,
                      zIndex: 2, transition: 'all 0.4s',
                    }}
                  />

                  {/* Card */}
                  <div style={{
                    border: `1px solid ${isActive ? e.theme + '55' : 'rgba(255,255,255,0.05)'}`,
                    background: isActive ? `${e.theme}09` : 'rgba(2, 6, 23, 0.6)',
                    backdropFilter: 'blur(12px)',
                    padding: isActive ? 'clamp(1rem, 2.5vw, 1.8rem)' : 'clamp(0.7rem, 1.8vw, 1.1rem)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.45s ease',
                    clipPath: isActive ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' : 'none',
                    boxShadow: isActive ? `0 0 40px -15px ${e.theme}` : 'none',
                  }}>
                    {isActive && <div className="scan-line" style={{ animationDuration: '5s', opacity: 0.1 }} />}

                    {isActive && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.2, color: e.theme }}>
                        <DayakMotifs.AsoCorner size={28} />
                      </div>
                    )}

                    {/* ID tag */}
                    <div className="hud-tag" style={{ fontSize: '0.54rem', color: e.theme, opacity: isActive ? 0.7 : 0.35, marginBottom: '0.4rem' }}>
                      {e.id}
                    </div>

                    {/* Role */}
                    <div style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: isActive ? 'clamp(1rem, 2vw, 1.4rem)' : 'clamp(0.85rem, 1.5vw, 1.05rem)',
                      fontWeight: 800,
                      color: 'var(--text-color)',
                      lineHeight: 1.1, marginBottom: '0.3rem',
                      transition: 'all 0.4s',
                    }}>
                      {t('role', e.role)}
                    </div>

                    {/* Company + year */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: e.theme, opacity: isActive ? 0.85 : 0.45, fontWeight: 700, letterSpacing: '0.5px' }}>
                        {e.company}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)' }}>
                        {e.year}
                      </span>
                    </div>

                    {/* Expanded footer */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ marginTop: '0.85rem', paddingTop: '0.7rem', borderTop: `1px solid ${e.theme}20`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck size={12} color={e.theme} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.59rem', color: e.theme, fontWeight: 700, letterSpacing: '1.5px', opacity: 0.85 }}>
                              {e.status} // LOG_VERIFIED
                            </span>
                            {e.status === 'LIVE' && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                style={{ width: '5px', height: '5px', borderRadius: '50%', background: e.theme, boxShadow: `0 0 8px ${e.theme}`, display: 'inline-block', marginLeft: 'auto' }}
                              />
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Left accent bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: e.theme, opacity: isActive ? 0.8 : 0.1, transition: 'opacity 0.4s' }} />

                    {isActive && (
                      <motion.div
                        style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)' }}
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronRight size={16} color={e.theme} opacity={0.5} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* BNSP Certificate Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', paddingLeft: '56px' }}
          >
            <div className="hud-tag" style={{ opacity: 0.4, fontSize: '0.58rem', marginBottom: '0.6rem', letterSpacing: '2px' }}>
              AUTHORITY_STATUS
            </div>
            <motion.div
              animate={{ boxShadow: ['0 0 8px var(--accent-tertiary)30', '0 0 25px var(--accent-tertiary)60', '0 0 8px var(--accent-tertiary)30'] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '0.75rem 1.2rem',
                border: '1px solid rgba(57,255,20,0.5)',
                background: 'rgba(57,255,20,0.05)',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              <DayakMotifs.AncientSeal size={22} color="var(--accent-tertiary)" />
              <div>
                <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', fontWeight: 900, color: 'var(--accent-tertiary)', letterSpacing: '2px' }}>
                  BNSP CERTIFIED
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
                  NATIONAL_CERTIFICATION // VERIFIED
                </div>
              </div>
            </motion.div>

            {/* Divider below */}
            <div style={{ marginTop: '1.2rem', opacity: 0.25 }}>
              <DayakMotifs.MandauDivider color="var(--accent-tertiary)" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
