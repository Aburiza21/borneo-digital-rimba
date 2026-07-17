import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import SectionWrapper from './SectionWrapper';
import { Terminal, Cpu, Database, Zap, Shield, MapPin, Clock, Mail, MessageSquare, X, Code2, Users, Layers, Download, FileText, Award, ShieldCheck, FileCheck2 } from 'lucide-react';

export default function HeroIntro() {
  const { t } = useLanguage();
  const [showContactModal, setShowContactModal] = useState(false);

  const content = {
    tag: { id: '᚛ SYSTEM_INIT_V4.2 ᚜', en: '᚛ SYSTEM_INIT_V4.2 ᚜' },
    role: { id: 'Full Stack Developer', en: 'Full Stack Developer' },
    welcome: {
      id: 'Full-Stack Developer dengan 4+ tahun pengalaman dan rekam jejak sebagai Technical Lead. Ahli dalam merancang arsitektur yang robust dan membangun solusi end-to-end yang scalable. Terbiasa memimpin tim lintas disiplin untuk mengubah konsep teknis menjadi produk yang mendorong pertumbuhan bisnis dan pengalaman pengguna yang luar biasa.',
      en: 'Full-Stack Developer with 4+ years of experience and a proven track record as a Technical Lead. Expert in designing robust architectures and building scalable end-to-end solutions. Accustomed to leading cross-functional teams to transform technical concepts into products that drive business growth and exceptional user experiences.'
    },
    location: { id: 'PONTIANAK, INDONESIA', en: 'PONTIANAK, INDONESIA' },
    cv: { id: 'UNDUH CV', en: 'DOWNLOAD CV' },
    portfolio: { id: 'PORTOFOLIO PDF', en: 'PORTFOLIO PDF' },
    cert: { id: 'SERTIFIKAT BNSP', en: 'BNSP CERTIFICATE' }
  };

  const competencies = [
    { icon: <Code2 size={16} />, label: { id: 'Full Stack Engineering', en: 'Full Stack Engineering' }, pct: 92, color: 'var(--accent-color)' },
    { icon: <Users size={16} />, label: { id: 'Technical Leadership', en: 'Technical Leadership' }, pct: 88, color: 'var(--accent-tertiary)' },
    { icon: <Layers size={16} />, label: { id: 'System Architecture', en: 'System Architecture' }, pct: 85, color: 'var(--accent-secondary)' },
    { icon: <Cpu size={16} />, label: { id: 'DevOps & Infra', en: 'DevOps & Infra' }, pct: 78, color: 'var(--accent-color)' },
  ];

  const creds = [
    { label: t('cv', content.cv), file: '/assets/cv.pdf', accent: 'var(--accent-color)', icon: <Download size={14} /> },
    { label: t('portfolio', content.portfolio), file: '/assets/portfolio.pdf', accent: 'var(--accent-secondary)', icon: <FileText size={14} /> },
    { label: t('cert', content.cert), file: '/assets/certificate.pdf', accent: 'var(--accent-tertiary)', icon: <Award size={14} /> },
  ];

  const stats = [
    { label: { id: 'PENGALAMAN', en: 'EXPERIENCE' }, value: '4+', unit: { id: 'TH', en: 'YRS' }, color: 'var(--accent-tertiary)' },
    { label: { id: 'PROYEK', en: 'PROJECTS' }, value: '12+', unit: { id: 'SELESAI', en: 'DONE' }, color: 'var(--accent-color)' },
    { label: { id: 'SERTIFIKAT', en: 'CERTIFIED' }, value: 'BNSP', unit: { id: 'NASIONAL', en: 'NATIONAL' }, color: 'var(--accent-secondary)' },
  ];

  const containerVariant = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <>
      <SectionWrapper
        bgImage="/assets/bg/bg_hero.png"
      bgPosition="center top"
      bgOpacity={0.12}
      bgMask="radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%)"
      glow={
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,242,254,0.04) 0%, transparent 50%, rgba(2,6,23,0.7) 100%)',
          pointerEvents: 'none',
        }} />
      }
      contentStyle={{
        width: '100%',
        maxWidth: '1400px',
      }}
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'clamp(200px, 38%, 520px) 1fr',
          gap: 'clamp(1.5rem, 4vw, 5rem)',
          alignItems: 'center',
        }}
      >
        {/* ──────────────────── LEFT: Profile Visual ──────────────────── */}
        <motion.div variants={itemVariant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

          {/* Profile image with U-Shape HUD elements */}
          <div style={{ position: 'relative', width: 'clamp(180px, 28vw, 400px)', height: 'clamp(180px, 28vw, 400px)' }}>

            {/* Outer rotating Dayak seal - Scaled for U-Shape footprint */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 'clamp(-30px, -4vw, -60px)',
                opacity: 0.2,
                color: 'var(--accent-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <DayakMotifs.AncientSeal size={520} />
            </motion.div>

            {/* Counter-rotating inner ring - U-Shape Silhouette */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: 'clamp(-10px, -2vw, -22px)',
                border: '1.2px dashed rgba(0, 242, 254, 0.2)',
                borderRadius: '25px 25px 50% 50%'
              }}
            />

            {/* Neural pulse rings - U-Shape Aura */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 0.15, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
                style={{
                  position: 'absolute', inset: 0,
                  border: '1.5px solid var(--accent-color)',
                  borderRadius: '25px 25px 50% 50%',
                  pointerEvents: 'none'
                }}
              />
            ))}

            {/* Profile image container (The Bubble) */}
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '25px 25px 50% 50%',
              border: '2.5px solid rgba(0, 242, 254, 0.35)',
              padding: '10px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 80px -20px var(--accent-color)40, inset 0 0 40px rgba(0,242,254,0.08)',
              position: 'relative'
            }}>

              {/* Top Bracket HUD Ornament */}
              <div style={{ position: 'absolute', top: '-15px', left: '10%', right: '10%', height: '4px', background: 'var(--accent-color)40', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                <div style={{ position: 'absolute', top: '-2px', left: '20%', right: '20%', height: '8px', border: '1px solid var(--accent-color)60', borderTop: 'none', borderRadius: '0 0 8px 8px' }} />
              </div>

              {/* Corner Aso Ornaments */}
              <div style={{ position: 'absolute', top: '-10px', left: '-10px', color: 'var(--accent-color)80' }}>
                <DayakMotifs.AsoCorner size={32} />
              </div>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', color: 'var(--accent-color)80', transform: 'scaleX(-1)' }}>
                <DayakMotifs.AsoCorner size={32} />
              </div>

              {/* Inner Profile Image Panel - U-Shape */}
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '18px 18px 50% 50%',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
              }}>
                <img
                  src="/assets/profile.jpg"
                  alt="Abu Riza"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%', // Adjusted for high-tech framing
                    filter: 'contrast(1.08) brightness(1.05) saturate(1.15) sepia(0.05)'
                  }}
                />

                {/* HUD Overlay Scanline on Image */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,242,254,0.05) 1px, transparent 1px)', backgroundSize: '100% 4px', pointerEvents: 'none', opacity: 0.4 }} />
              </div>

              {/* Status badge - Shifted for U-Shape alignment */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  right: '-10%',
                  background: 'rgba(2, 6, 23, 0.95)',
                  border: '1px solid var(--accent-tertiary)',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-tertiary)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px var(--accent-tertiary)30',
                  whiteSpace: 'nowrap',
                  fontWeight: 900,
                  letterSpacing: '2px'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-tertiary)', boxShadow: '0 0 10px var(--accent-tertiary)' }} />
                OPEN_TO_WORK
              </motion.div>
            </div>

            {/* BIOM_SYNC HUD (Relocated slightly) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '20%', left: '-25%',
                background: 'rgba(2, 6, 23, 0.9)',
                border: '1px solid var(--accent-color)60',
                padding: '8px 14px', borderRadius: '8px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                zIndex: 10
              }}
              className="hud-tag"
            >
              <div style={{ color: 'var(--accent-color)', fontSize: '0.55rem', letterSpacing: '2px', fontWeight: 900, opacity: 0.7 }}>BIOM_SYNC</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 950, color: 'var(--text-color)', fontFamily: 'var(--font-header)' }}>98.4%</div>
            </motion.div>
          </div>

          {/* Location & uptime chips */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: <MapPin size={12} />, text: 'PONTIANAK, INDONESIA', color: 'var(--accent-color)' },
            ].map((chip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '20px',
                border: `1px solid ${chip.color}`,
                background: `${chip.color}12`,
                color: chip.color,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '1px',
                fontWeight: 700
              }}>
                {chip.icon} {chip.text}
              </div>
            ))}
          </div>

          {/* Energy Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '320px', marginTop: '0.5rem' }}>
            <div className="hud-tag" style={{ opacity: 0.5, marginBottom: '0.2rem', textAlign: 'center' }}>SYSTEM_DIAGNOSTICS // SKILLS</div>
            {competencies.map((comp, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: comp.color }}>
                    {comp.icon}
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-color)', opacity: 0.8 }}>
                      {t('label', comp.label)}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: comp.color, fontWeight: 700 }}>
                    {comp.pct}%
                  </span>
                </div>
                <div className="energy-bar-container" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    className="energy-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] as any }}
                    style={{ background: comp.color, color: comp.color, height: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dayak divider */}
          <div style={{ width: '100%', maxWidth: '320px', opacity: 0.5 }}>
            <DayakMotifs.MandauDivider color="var(--accent-color)" />
          </div>
        </motion.div>

        {/* ──────────────────── RIGHT: Content ──────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 2rem)' }}>

          {/* System tag */}
          <motion.div variants={itemVariant}>
            <div className="hud-tag" style={{
              color: 'var(--accent-color)',
              letterSpacing: '6px',
              opacity: 0.7,
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)', display: 'inline-block' }}
              />
              {t('tag', content.tag)}
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariant}>
            <h1 style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 0.88,
              fontWeight: 950,
              letterSpacing: 'clamp(-2px, -0.4vw, -5px)',
              textTransform: 'uppercase',
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.85) 40%, var(--accent-color) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.25))',
              margin: 0,
            }}>
              ABU<span style={{ color: 'var(--text-color)' }}>RIZA</span>
            </h1>
          </motion.div>

          {/* Role line */}
          <motion.div variants={itemVariant} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '2px', background: 'var(--accent-tertiary)' }} />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.5vw, 0.95rem)',
              color: 'var(--accent-tertiary)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              margin: 0
            }}>
              {t('role', content.role)}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariant}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
              lineHeight: 1.85,
              color: 'var(--text-color)',
              opacity: 0.75,
              fontWeight: 300,
              margin: 0,
              maxWidth: '900px',
              borderLeft: '2px solid rgba(0,242,254,0.2)',
              paddingLeft: '1.25rem'
            }}>
              {t('welcome', content.welcome)}
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div variants={itemVariant} style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 1.5rem)', flexWrap: 'wrap' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                flex: '1 1 auto',
                minWidth: '90px',
                padding: 'clamp(0.8rem, 1.5vw, 1.2rem)',
                border: `1px solid ${stat.color}30`,
                background: `${stat.color}08`,
                position: 'relative',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: stat.color,
                  opacity: 0.7,
                  letterSpacing: '2px',
                  marginBottom: '0.4rem'
                }}>
                  {t('label', stat.label)}
                </div>
                <div style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  fontWeight: 900,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}60`,
                  lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--text-color)',
                  opacity: 0.4,
                  letterSpacing: '1px',
                  marginTop: '0.2rem'
                }}>
                  {t('unit', stat.unit)}
                </div>
                {/* Corner accent */}
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderLeft: `1px solid ${stat.color}`, borderTop: `1px solid ${stat.color}`, transform: 'rotate(180deg)' }} />
              </div>
            ))}
          </motion.div>

          {/* Tech stack HUD bar */}
          <motion.div variants={itemVariant}>
            <div style={{
              padding: 'clamp(0.7rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem)',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
              alignItems: 'center'
            }}>
              <span className="hud-tag" style={{ opacity: 0.4, marginRight: '0.5rem', whiteSpace: 'nowrap' }}>STACK://</span>
              {['Golang', 'Java', '.Net', 'Python', 'PHP', 'Javascript', 'Typescript', 'CSS', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'CI/CD'].map((tech, i) => (
                <motion.span
                  key={i}
                  whileHover={{ color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '3px 10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '1px',
                    cursor: 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Creds & Contact Buttons */}
          <motion.div variants={itemVariant} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem', maxWidth: '500px' }}>
            <div className="hud-tag" style={{ opacity: 0.5, marginBottom: '0.2rem' }}>CREDENTIALS_UPLINK // ACCESS_GRANTED</div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
              {creds.map((btn, i) => (
                <motion.a
                  key={i}
                  href={btn.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: '1 1 calc(50% - 0.35rem)',
                    minWidth: '160px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '0.65rem 1rem',
                    border: `1px solid ${btn.accent}30`,
                    background: `${btn.accent}08`,
                    color: btn.accent,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    opacity: 0.85
                  }}
                >
                  {btn.icon}
                  {btn.label}
                  <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '0.6rem' }}>→</span>
                </motion.a>
              ))}

              <motion.button
                onClick={() => setShowContactModal(true)}
                style={{
                  flex: '1 1 calc(50% - 0.35rem)',
                  minWidth: '160px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.65rem 1rem',
                  border: `1px solid var(--accent-tertiary)`,
                  background: 'var(--accent-tertiary)',
                  color: '#000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  transition: 'all 0.2s'
                }}
                whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={14} /> {t('contact', { id: 'HUBUNGI SAYA', en: 'CONNECT NODE' })}
              </motion.button>
            </div>
          </motion.div>

          {/* System status footer */}
          <motion.div variants={itemVariant}>
            <div className="hud-tag" style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              opacity: 0.35, fontSize: '0.6rem', flexWrap: 'wrap'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Database size={10} /> {t('location', content.location)}
              </span>
              <span>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={10} /> UPTIME: 8760h
              </span>
              <span>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={10} /> NEURAL_CORE: ACTIVE
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              className="hud-panel"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'rgba(2, 6, 23, 0.98)',
                padding: '3rem 2.5rem',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
                minWidth: '350px',
                position: 'relative',
                boxShadow: '0 0 50px rgba(0, 242, 254, 0.2)'
              }}
            >
              <div className="scan-line" style={{ height: '2px', opacity: 0.5 }} />

              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', width: '15px', height: '15px', borderTop: '2px solid var(--accent-color)', borderLeft: '2px solid var(--accent-color)' }} />
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '15px', height: '15px', borderBottom: '2px solid var(--accent-color)', borderRight: '2px solid var(--accent-color)' }} />

              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'rgba(0, 242, 254, 0.1)', border: '1px solid var(--accent-color)',
                  color: 'var(--accent-color)', cursor: 'pointer',
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '6px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'var(--accent-color)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = '0 0 20px var(--accent-color)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)'; e.currentTarget.style.color = 'var(--accent-color)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <X size={20} />
              </button>

              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                <div className="hud-tag" style={{ color: 'var(--accent-color)', letterSpacing: '4px' }}>SYS_COMMS_UPLINK</div>
                <h3 style={{ fontFamily: 'var(--font-header)', margin: 0, color: 'var(--text-color)', fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {t('contact_method', { id: 'Pilih Jalur', en: 'Select Channel' })}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
                <motion.a
                  href="https://wa.me/628989825205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button"
                  style={{ '--accent-color': '#25D366', justifyContent: 'center', padding: '1.2rem', fontSize: '0.95rem' } as any}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare size={20} /> WHATSAPP
                </motion.a>

                <motion.a
                  href="mailto:aburiza.21@gmail.com"
                  className="cyber-button"
                  style={{ '--accent-color': '#ea4335', justifyContent: 'center', padding: '1.2rem', fontSize: '0.95rem' } as any}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={20} /> EMAIL
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
