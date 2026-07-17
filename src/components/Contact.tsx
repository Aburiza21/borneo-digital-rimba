import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, RefreshCcw, ShieldCheck, Radio, Send, Zap } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import SectionWrapper from './SectionWrapper';

const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ContactProps {
  activeStep?: number;
}

export default function Contact({ activeStep = 0 }: ContactProps) {
  const { t } = useLanguage();

  const content = {
    tag: { id: 'COMM_UPLINK_INITIALIZING', en: 'COMM_UPLINK_INITIALIZING' },
    title: { id: 'Mari Berkolaborasi', en: 'Let\'s Collaborate' },
    desc: {
      id: 'Dengan pengalaman lintas disiplin dari Full Stack Engineering hingga infrastruktur DevOps dan IT Support, saya siap membantu merealisasikan dan mengoptimalkan sistem digital Anda. Mari diskusikan inovasi Anda selanjutnya.',
      en: 'With cross-disciplinary experience from Full Stack Engineering to DevOps infrastructure and IT Support, I am ready to help realize and optimize your digital systems. Let\'s discuss your next innovation.',
    },
    secure: { id: 'SALURAN_AMAN // AES-256', en: 'AES-256_SECURE_CHANNEL' },
    reboot: { id: 'BOOT_ULANG_KE_ATAS', en: 'REBOOT_SYSTEM_TOP' },
  };

  const socials = [
    { icon: <GitHubIcon size={22} />, label: 'GITHUB', url: 'https://github.com/Aburiza21', color: 'var(--accent-color)' },
    { icon: <LinkedInIcon size={22} />, label: 'LINKEDIN', url: 'https://linkedin.com/in/abu-riza-02a31625a', color: 'var(--accent-secondary)' },
    { icon: <MessageSquare size={22} />, label: 'WHATSAPP', url: 'https://wa.me/628989825205', color: 'var(--accent-tertiary)' },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as any },
  });

  return (
    <SectionWrapper
      bgImage="/assets/bg/bg_contact.png"
      bgOpacity={0.1}
      bgPosition="center bottom"
      bgMask="radial-gradient(ellipse 85% 85% at 50% 55%, black 10%, transparent 100%)"
      glow={
        <motion.div
          animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 'min(900px, 100vw)',
            height: 'min(900px, 100vw)',
            background: 'radial-gradient(circle, var(--accent-tertiary) 0%, transparent 65%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      }
      contentStyle={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(300px, 44%, 620px)',
        gap: 'clamp(2rem, 5vw, 7rem)',
        alignItems: 'center',
      }}
    >

        {/* ────── LEFT: Title + Description ────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.2rem, 2.5vh, 2rem)' }}>

          {/* System tag */}
          <motion.div {...fadeUp(0)}>
            <div className="hud-tag" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              color: 'var(--accent-tertiary)', opacity: 0.75,
            }}>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-tertiary)', boxShadow: '0 0 10px var(--accent-tertiary)', display: 'inline-block' }}
              />
              {t('tag', content.tag)}
            </div>
          </motion.div>

          {/* BIG title */}
          <motion.div {...fadeUp(0.08)}>
            <h1 style={{
              fontFamily: 'var(--font-header)',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              fontWeight: 950,
              lineHeight: 1.1,
              letterSpacing: 'clamp(-1px, -0.2vw, -2px)',
              textTransform: 'uppercase',
              margin: 0,
              background: 'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.7) 45%, var(--accent-tertiary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(57, 255, 20, 0.2))',
            }}>
              {t('title', content.title)}
            </h1>
          </motion.div>



          {/* Dayak divider */}
          <motion.div {...fadeUp(0.2)} style={{ opacity: 0.35, maxWidth: '420px' }}>
            <DayakMotifs.MandauDivider color="var(--accent-tertiary)" />
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.26)} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)',
            lineHeight: 1.9,
            color: 'var(--text-color)',
            opacity: 0.7,
            fontWeight: 300,
            margin: 0,
            maxWidth: '580px',
            borderLeft: '2px solid rgba(57,255,20,0.25)',
            paddingLeft: '1.2rem',
          }}>
            {t('desc', content.desc)}
          </motion.p>

          {/* Decorative motifs */}
          <motion.div {...fadeUp(0.32)} style={{ display: 'flex', gap: '3rem', opacity: 0.12, marginTop: '0.5rem' }}>
            <DayakMotifs.Hornbill size={70} color="var(--accent-tertiary)" />
            <DayakMotifs.Hornbill size={70} color="var(--accent-color)" />
          </motion.div>
        </div>

        {/* ────── RIGHT: Contact HUD Panel ────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)' }}
        >

          {/* Step 0: Pre-contact teaser → step 1: full contact revealed */}
          <div className="hud-panel neon-border" style={{
            padding: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            background: 'rgba(2, 6, 23, 0.88)',
            backdropFilter: 'blur(24px)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(57,255,20,0.3)',
            boxShadow: '0 0 60px -20px var(--accent-tertiary)',
          }}>
            <div className="scan-line" style={{ animationDuration: '6s', opacity: 0.12 }} />

            {/* Corner Dayak motifs */}
            <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.18, color: 'var(--accent-tertiary)' }}>
              <DayakMotifs.AsoCorner size={35} />
            </div>
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', opacity: 0.18, color: 'var(--accent-tertiary)', transform: 'rotate(180deg)' }}>
              <DayakMotifs.AsoCorner size={35} />
            </div>

            {/* Secure channel badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <ShieldCheck size={13} color="var(--accent-tertiary)" />
              <span className="hud-tag" style={{ color: 'var(--accent-tertiary)', fontSize: '0.6rem' }}>
                {t('secure', content.secure)}
              </span>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Radio size={11} color="var(--accent-tertiary)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--accent-tertiary)' }}>LIVE</span>
              </motion.div>
            </div>

            {/* Email link — always visible, brightens on step 1 */}
            <motion.div
              animate={{ opacity: activeStep === 0 ? 0.45 : 1 }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
              <div className="hud-tag" style={{ marginBottom: '0.6rem', opacity: 0.5, fontSize: '0.6rem' }}>
                PRIMARY_UPLINK
              </div>
              <a
                href="mailto:aburiza.21@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: 'clamp(0.8rem, 1.8vw, 1.1rem) clamp(1rem, 2vw, 1.4rem)',
                  border: '1px solid rgba(57,255,20,0.35)',
                  background: 'rgba(57,255,20,0.06)',
                  color: 'var(--accent-tertiary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  transition: 'all 0.3s',
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(57,255,20,0.14)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(57,255,20,0.2)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(57,255,20,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Mail size={18} />
                aburiza.21@gmail.com
                <Send size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </a>
            </motion.div>

            {/* Social links — revealed on step 1 */}
            <AnimatePresence>
              <motion.div
                animate={{ opacity: activeStep === 1 ? 1 : 0.2, y: activeStep === 1 ? 0 : 10 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
              >
                <div className="hud-tag" style={{ marginBottom: '0.8rem', opacity: 0.5, fontSize: '0.6rem' }}>
                  SECONDARY_UPLINKS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {socials.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8, opacity: 1 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: 'clamp(0.65rem, 1.4vw, 0.9rem) clamp(0.8rem, 1.8vw, 1.2rem)',
                        border: `1px solid ${s.color}22`,
                        background: `${s.color}08`,
                        color: s.color,
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        transition: 'all 0.2s',
                        opacity: 0.8,
                        clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                      }}
                    >
                      {s.icon}
                      {s.label}
                      <span style={{ marginLeft: 'auto', opacity: 0.35, fontSize: '0.65rem' }}>→</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Reboot button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep === 1 ? 0.4 : 0 }}
            whileHover={{ opacity: 1, scale: 1.04 }}
            onClick={() => window.dispatchEvent(new CustomEvent('rimba-reboot'))}
            style={{
              alignSelf: 'center',
              background: 'none',
              border: 'none',
              color: 'var(--accent-tertiary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              pointerEvents: activeStep === 1 ? 'all' : 'none',
              transition: 'opacity 0.3s',
            }}
          >
            <RefreshCcw size={14} />
            {t('reboot', content.reboot)}
          </motion.button>
        </motion.div>
    </SectionWrapper>
  );
}
