import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Award, ExternalLink, ChevronRight, FileText, CheckCircle2, GraduationCap, BookOpen, Star } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import SectionWrapper from './SectionWrapper';

interface EducationProps {
  activeStep?: number;
}

const educationData = [
  {
    id: '᚛ EDU-UNTAN-01 ᚜',
    year: '2016 – 2023',
    degree: { id: 'Teknik Informatika', en: 'Informatics Engineering' },
    school: 'UNIVERSITAS TANJUNGPURA',
    schoolShort: 'UNTAN',
    level: { id: 'Sarjana (S1)', en: 'Bachelor\'s Degree (S1)' },
    gpa: '3.51 / 4.00',
    gpaRaw: 3.51,
    thesis: {
      id: 'Implementasi Metode K-Means Clustering & Cosine Similarity untuk pengklasifikasian data skripsi.',
      en: 'Implementation of K-Means Clustering & Cosine Similarity for academic thesis data classification.',
    },
    url: 'https://jurnal.untan.ac.id/index.php/JUARA/article/view/73974',
    highlights: [
      { id: 'IPK 3,51 / 4,00', en: 'GPA 3.51 / 4.00' },
      { id: 'Lulus dengan Predikat Memuaskan', en: 'Graduated with Honors' },
      { id: 'Fokus: Data Mining & Machine Learning', en: 'Focus: Data Mining & Machine Learning' },
    ],
    color: 'var(--accent-color)',
    status: 'SYNCHRONIZED',
  },
  {
    id: '᚛ EDU-AMALIYAH-02 ᚜',
    year: '2014 – 2016',
    degree: { id: 'Teknik Komputer & Jaringan', en: 'Computer & Network Engineering' },
    school: 'SMK AMALIYAH',
    schoolShort: 'SMK',
    level: { id: 'Sekolah Menengah Kejuruan', en: 'Vocational High School' },
    gpa: '—',
    gpaRaw: 0,
    thesis: {
      id: 'Pendidikan Menengah Kejuruan dengan fokus pada infrastruktur IT, jaringan komputer, dan troubleshooting sistem.',
      en: 'Vocational education focused on IT infrastructure, computer networking, and system troubleshooting.',
    },
    highlights: [
      { id: 'Fokus: Infrastruktur IT', en: 'Focus: IT Infrastructure' },
      { id: 'Jaringan Komputer', en: 'Computer Networking' },
      { id: 'Fondasi Karir Teknologi', en: 'Technology Career Foundation' },
    ],
    color: 'var(--accent-secondary)',
    status: 'OPTIMIZED',
  },
];

export default function Education({ activeStep = 0 }: EducationProps) {
  const { t } = useLanguage();

  const edu = educationData[activeStep] ?? educationData[0];



  return (
    <SectionWrapper
      bgImage="/assets/bg/bg_education.png"
      bgMask="radial-gradient(ellipse 75% 80% at 50% 50%, black 20%, transparent 100%)"
      glow={
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ repeat: Infinity, duration: 5 }}
          style={{
            position: 'absolute',
            bottom: '-20%', left: '5%',
            width: '650px', height: '650px',
            background: `radial-gradient(circle, ${edu.color} 0%, transparent 65%)`,
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

        {/* ──────────── LEFT: Active Education Spotlight ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.8rem)' }}>


          {/* Active education detail — crossfade on step change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
              {/* ID badge + year + status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div className="hud-tag" style={{
                  border: `1px solid ${edu.color}50`,
                  background: `${edu.color}0d`,
                  color: edu.color, fontSize: '0.58rem',
                }}>
                  {edu.id}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <Calendar size={10} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px' }}>{edu.year}</span>
                </div>
                <div className="hud-tag" style={{ color: edu.color, opacity: 0.5, fontSize: '0.58rem' }}>
                  {edu.status}
                </div>
              </div>

              {/* Degree name */}
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                fontWeight: 950,
                lineHeight: 0.88,
                letterSpacing: 'clamp(-1px, -0.3vw, -3px)',
                textTransform: 'uppercase',
                color: 'var(--text-color)',
                margin: 0,
                filter: `drop-shadow(0 0 20px ${edu.color}30)`,
              }}>
                {t('degree', edu.degree)}
              </h3>

              {/* School + level */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ width: '36px', height: '2px', background: edu.color, flexShrink: 0 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={14} color={edu.color} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.65rem, 1.4vw, 0.88rem)',
                    color: edu.color,
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                  }}>
                    {edu.school}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '1px',
                }}>
                  // {t('level', edu.level)}
                </span>
              </div>

              {/* GPA bar — only for university */}
              {edu.gpaRaw > 0 && (
                <div style={{ maxWidth: '480px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={12} color={edu.color} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>GRADE_POINT_AVERAGE</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-header)', fontSize: '1.1rem', fontWeight: 900, color: edu.color, textShadow: `0 0 12px ${edu.color}` }}>{edu.gpa}</span>
                  </div>
                  <div className="energy-bar-container">
                    <motion.div
                      className="energy-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(edu.gpaRaw / 4) * 100}%` }}
                      transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                      style={{ background: edu.color, color: edu.color }}
                    />
                  </div>
                </div>
              )}

              {/* Highlights list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {edu.highlights.map((hl, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: edu.color, boxShadow: `0 0 8px ${edu.color}`, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.5px',
                    }}>
                      {t('hl', hl)}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Thesis / description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.88rem, 1.5vw, 1.1rem)',
                lineHeight: 1.85,
                color: 'var(--text-color)',
                opacity: 0.65,
                fontWeight: 300,
                margin: 0,
                borderLeft: `2px solid ${edu.color}30`,
                paddingLeft: '1.2rem',
                maxWidth: '620px',
              }}>
                {t('thesis', edu.thesis)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ──────────── RIGHT: Neural Timeline ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}
        >
          {/* Vertical neural path */}
          <div style={{
            position: 'absolute',
            left: '21px',
            top: '28px',
            bottom: '28px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--accent-color), var(--accent-secondary))',
            opacity: 0.2,
            zIndex: 0,
          }} />

          {educationData.map((e, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={i}
                animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.98 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'relative',
                  paddingLeft: '56px',
                  paddingBottom: i < educationData.length - 1 ? 'clamp(1.5rem, 3vh, 2.5rem)' : 0,
                }}
              >
                {/* Node dot */}
                <motion.div
                  animate={{
                    scale: isActive ? [1, 1.4, 1] : 1,
                    boxShadow: isActive ? `0 0 20px ${e.color}, 0 0 40px ${e.color}40` : 'none',
                  }}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '26px',
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    background: isActive ? e.color : 'rgba(255,255,255,0.1)',
                    border: `2px solid ${isActive ? e.color : 'rgba(255,255,255,0.15)'}`,
                    zIndex: 2,
                    transition: 'all 0.4s',
                  }}
                />

                {/* Card */}
                <div style={{
                  border: `1px solid ${isActive ? e.color + '55' : 'rgba(255,255,255,0.05)'}`,
                  background: isActive ? `${e.color}08` : 'rgba(2, 6, 23, 0.6)',
                  backdropFilter: 'blur(12px)',
                  padding: isActive ? 'clamp(1rem, 2.5vw, 1.8rem)' : 'clamp(0.7rem, 1.8vw, 1.1rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.45s ease',
                  clipPath: isActive
                    ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                    : 'none',
                  boxShadow: isActive ? `0 0 40px -15px ${e.color}` : 'none',
                }}>
                  {isActive && <div className="scan-line" style={{ animationDuration: '6s', opacity: 0.1 }} />}

                  {/* Corner accent */}
                  {isActive && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.25, color: e.color }}>
                      <DayakMotifs.AsoCorner size={28} />
                    </div>
                  )}

                  {/* ID tag */}
                  <div className="hud-tag" style={{
                    fontSize: '0.55rem',
                    color: e.color,
                    opacity: isActive ? 0.7 : 0.4,
                    marginBottom: '0.5rem',
                  }}>
                    {e.id}
                  </div>

                  {/* Degree name */}
                  <div style={{
                    fontFamily: 'var(--font-header)',
                    fontSize: isActive ? 'clamp(1rem, 2vw, 1.4rem)' : 'clamp(0.85rem, 1.5vw, 1.05rem)',
                    fontWeight: 800,
                    color: 'var(--text-color)',
                    marginBottom: '0.3rem',
                    lineHeight: 1.1,
                    transition: 'all 0.4s',
                  }}>
                    {t('degree', e.degree)}
                  </div>

                  {/* School + year */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: e.color,
                      opacity: isActive ? 0.8 : 0.5,
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                    }}>
                      {e.schoolShort}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>
                      {e.year}
                    </span>
                  </div>

                  {/* Expanded footer on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginTop: '0.9rem',
                          paddingTop: '0.75rem',
                          borderTop: `1px solid ${e.color}20`,
                          display: 'flex', alignItems: 'center', gap: '8px',
                        }}>
                          <Award size={12} color={e.color} />
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6rem',
                            color: e.color,
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            opacity: 0.85,
                          }}>
                            {e.status} // DATA_VERIFIED
                          </span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            style={{ width: '5px', height: '5px', borderRadius: '50%', background: e.color, boxShadow: `0 0 8px ${e.color}`, display: 'inline-block', marginLeft: 'auto' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Left accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '3px', height: '100%',
                    background: e.color,
                    opacity: isActive ? 0.8 : 0.1,
                    transition: 'opacity 0.4s',
                  }} />

                  {/* Chevron on active */}
                  {isActive && (
                    <motion.div
                      style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)' }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronRight size={16} color={e.color} opacity={0.5} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* External Link (Journal/Portfolio) if exists */}
          <AnimatePresence>
            {edu.url && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)', paddingLeft: '56px', overflow: 'hidden' }}
              >
                <div className="hud-tag" style={{ opacity: 0.4, fontSize: '0.58rem', marginBottom: '0.6rem', letterSpacing: '2px' }}>
                  EXTERNAL_LINK // PUBLICATION
                </div>
                <motion.a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5, backgroundColor: `${edu.color}15` }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '12px',
                    padding: '0.75rem 1.2rem',
                    border: `1px solid ${edu.color}50`,
                    background: `${edu.color}0a`,
                    color: edu.color,
                    textDecoration: 'none',
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <BookOpen size={18} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1px' }}>
                      {t('view_journal', { id: 'LIHAT JURNAL', en: 'VIEW JOURNAL' })}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', opacity: 0.7, letterSpacing: '1px' }}>
                      ACCESS_PUBLICATION →
                    </span>
                  </div>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom: Dayak watermark */}
          <div style={{
            marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
            display: 'flex', flexDirection: 'column', gap: '0.7rem',
            paddingLeft: '56px',
          }}>
            {/* Mandau divider */}
            <div style={{ opacity: 0.3 }}>
              <DayakMotifs.MandauDivider color={edu.color} />
            </div>
            <div className="hud-tag" style={{ opacity: 0.25, fontSize: '0.58rem', letterSpacing: '2px' }}>
              BORNEO_MATRIX // EDUCATION_ARCHIVE_COMPLETE
            </div>
          </div>
        </motion.div>
    </SectionWrapper>
  );
}
