import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Crosshair, Cpu, Database, CheckCircle, ExternalLink, Network, Globe, History, Activity, Briefcase, Calendar, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import SectionWrapper from './SectionWrapper';

interface ExperienceProps {
  activeStep?: number;
}

const experiences = [
  {
    id: '᚛ XP-KALANARA-01 ᚜',
    year: 'DES 2025 — PRESENT',
    duration: { id: 'Aktif Saat Ini', en: 'Currently Active' },
    role: { id: 'Full Stack Developer', en: 'Full Stack Developer' },
    company: 'KALANARA GROUP',
    companyFull: 'PT Kalanara Group Indonesia',
    desc: {
      id: 'Merancang dan mengembangkan aplikasi untuk meningkatkan efisiensi operasional. Memberikan dukungan teknis kepada pengguna dan menyiapkan infrastruktur teknis sebagai fondasi awal proyek.',
      en: 'Designing and developing applications to improve operational efficiency. Providing technical support to users and preparing technical infrastructure as the initial project foundation.',
    },
    highlights: [
      { id: 'Pengembangan & troubleshooting aplikasi', en: 'Application development & troubleshooting' },
      { id: 'Dukungan teknis responsif', en: 'Responsive technical support' },
      { id: 'Persiapan infrastruktur awal proyek', en: 'Initial project infrastructure setup' },
      { id: 'Manajemen proyek mandiri/tim', en: 'Independent/team project management' },
    ],
    tech: ['Laravel', 'React', 'PostgreSQL', 'Next.js', 'Golang', 'Python', 'Docker', 'CI/CD', 'SSH/Linux', 'Vector DB', 'Indexing', 'gRPC', 'NATS', 'Swagger', 'AI Integration', 'SSO'],
    theme: 'var(--accent-color)',
    status: 'LIVE',
  },
  {
    id: '᚛ XP-MEDIKA-02 ᚜',
    year: 'MAR 2025 — DES 2025',
    duration: { id: '10 Bulan', en: '10 Months' },
    role: { id: 'IT Staff', en: 'IT Staff' },
    company: 'RS MITRA MEDIKA',
    companyFull: 'RS Mitra Medika (PT Hexa Daya Medika)',
    desc: {
      id: 'Memimpin pengembangan aplikasi internal full-stack untuk mengotomasi proses operasional rumah sakit. Bertanggung jawab atas pemeliharaan dan peningkatan infrastruktur IT secara menyeluruh.',
      en: 'Leading internal full-stack application development to automate hospital operational processes. Responsible for comprehensive IT infrastructure maintenance and improvement.',
    },
    highlights: [
      { id: 'Otomatisasi proses operasional RS', en: 'Hospital operational automation' },
      { id: 'Troubleshooting & maintenance infrastruktur', en: 'Infrastructure troubleshooting & maintenance' },
      { id: 'Pengelolaan sistem, jaringan & hardware', en: 'System, network & hardware management' },
      { id: 'Penyusunan dokumentasi teknis', en: 'Technical documentation preparation' },
    ],
    tech: ['Laravel', 'React', 'Flutter', '.NET', 'IT Support', 'On-Premise Server', 'ISO 27000', 'SSL', 'Windows', 'TCP/IP', 'Troubleshooting', 'VMware ESXi', 'Mikrotik', 'VPN', 'Helpdesk'],
    theme: 'var(--accent-tertiary)',
    status: 'COMPLETED',
  },
  {
    id: '᚛ XP-REACTIVE-03 ᚜',
    year: 'JUN 2024 — JAN 2025',
    duration: { id: '8 Bulan', en: '8 Months' },
    role: { id: 'Technical Lead', en: 'Technical Lead' },
    company: 'REACTIVE INC.',
    companyFull: 'Reactive Incorporated (PT Sepakat Digital)',
    desc: {
      id: 'Memimpin tim produksi melalui analisis kinerja rutin untuk meningkatkan efisiensi. Merancang arsitektur dan pondasi teknis untuk proyek baru serta mengelola siklus hidup proyek end-to-end.',
      en: 'Leading production teams through routine performance analysis to improve efficiency. Designed architecture and technical foundations for new projects, managing end-to-end project lifecycles.',
    },
    highlights: [
      { id: 'Peningkatan produktivitas tim', en: 'Team productivity improvement' },
      { id: 'Perancangan arsitektur sistem baru', en: 'New system architecture design' },
      { id: 'Manajemen siklus proyek end-to-end', en: 'End-to-end project lifecycle management' },
      { id: 'Pemenuhan standar kualitas & waktu', en: 'Quality & timeline standard fulfillment' },
    ],
    tech: ['Laravel', 'React', 'MySQL', 'DevOps', 'JavaScript', 'jQuery', 'Bootstrap', 'Tailwind CSS'],
    theme: 'var(--accent-secondary)',
    status: 'COMPLETED',
  },
  {
    id: '᚛ XP-IMPACH-04 ᚜',
    year: 'MAR 2024 — JUN 2024',
    duration: { id: '4 Bulan', en: '4 Months' },
    role: { id: 'Backend Developer', en: 'Backend Developer' },
    company: 'IMPACH SOLUSI',
    companyFull: 'Impach Solusi Digital (PT Solusi Digital)',
    desc: {
      id: 'Merancang dan mengembangkan REST-API andal berkinerja tinggi untuk aplikasi multi-platform. Membangun struktur database efisien dengan menerapkan monitoring ketat dan kontrol kualitas.',
      en: 'Designed and developed highly reliable REST APIs for multi-platform applications. Built efficient database structures by applying strict monitoring and quality controls.',
    },
    highlights: [
      { id: 'Pengembangan REST-API multi-platform', en: 'Multi-platform REST-API development' },
      { id: 'Optimasi database & struktur data', en: 'Database & data structure optimization' },
      { id: 'Implementasi keamanan & privasi data', en: 'Data security & privacy implementation' },
      { id: 'Peningkatan sistem berkelanjutan', en: 'Continuous system improvement' },
    ],
    tech: ['Laravel', 'CodeIgniter', 'PHP', 'MySQL', 'REST API'],
    theme: 'var(--accent-color)',
    status: 'COMPLETED',
  },
];

export default function Experience({ activeStep = 0 }: ExperienceProps) {
  const { t } = useLanguage();

  const exp = experiences[activeStep] ?? experiences[0];



  return (
    <SectionWrapper
      bgImage="/assets/bg/bg_experience.png"
      bgPosition="center left"
      bgMask="linear-gradient(to right, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
      glow={
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
      }
      contentStyle={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(260px, 36%, 480px)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }}
    >

        {/* ──────────── LEFT: Active Experience Spotlight ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.8rem)' }}>


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

          {/* Company Redirect Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', paddingLeft: '56px' }}
          >
            <div className="hud-tag" style={{ opacity: 0.4, fontSize: '0.58rem', marginBottom: '0.6rem', letterSpacing: '2px' }}>
              EXTERNAL_LINK // {exp.company}
            </div>
            <motion.a
              href={`https://www.google.com/search?q=${encodeURIComponent(exp.companyFull)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 5, backgroundColor: `${exp.theme}15` }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '0.75rem 1.2rem',
                border: `1px solid ${exp.theme}50`,
                background: `${exp.theme}0a`,
                color: exp.theme,
                textDecoration: 'none',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Briefcase size={18} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1px' }}>
                  {t('visit_company', { id: 'PROFIL PERUSAHAAN', en: 'COMPANY PROFILE' })}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', opacity: 0.7, letterSpacing: '1px' }}>
                  REDIRECT_UPLINK →
                </span>
              </div>
            </motion.a>

            {/* Divider below */}
            <div style={{ marginTop: '1.2rem', opacity: 0.25 }}>
              <DayakMotifs.MandauDivider color={exp.theme} />
            </div>
          </motion.div>
        </motion.div>
    </SectionWrapper>
  );
}
