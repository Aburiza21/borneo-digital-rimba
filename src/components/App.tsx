import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Sun, Moon, Menu, X, ChevronRight, Archive, Activity } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import SectionIndicator from './SectionIndicator';
import ScrollController from './ScrollController';
import LoadingScreen from './LoadingScreen';
import { DayakMotifs } from './DayakMotifs';

/* ─── Theme Toggle (inline, no fixed positioning) ─── */
function ThemeBtn() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);
  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setIsDark(!isDark);
  };
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${isDark ? 'var(--accent-color)' : 'var(--accent-secondary)'}` }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Theme"
      style={{
        width: '44px', height: '44px',
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isDark ? 'var(--accent-color)' : 'var(--accent-secondary)'}`,
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: isDark ? 'var(--accent-color)' : 'var(--accent-secondary)',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={isDark ? 'd' : 'l'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Language Toggle (inline, no fixed positioning) ─── */
function LangBtn() {
  const { lang, setLang } = useLanguage();
  return (
    <motion.button
      onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-secondary)' }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Language"
      style={{
        width: '44px', height: '44px',
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--accent-secondary)',
        borderRadius: '10px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--accent-secondary)',
        flexShrink: 0,
        overflow: 'hidden',
        gap: '1px',
      }}
    >
      <Languages size={16} />
      <span style={{ fontSize: '0.5rem', fontFamily: 'var(--font-mono)', fontWeight: 700, lineHeight: 1 }}>
        {lang.toUpperCase()}
      </span>
    </motion.button>
  );
}

/* ─── Global Nav (inline, no fixed positioning) ─── */
function NavBtn() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'hero',       label: { id: 'BERANDA',    en: 'INTRO'        }, tech: 'DATA_STREAM_01'       },
    { id: 'about',      label: { id: 'TENTANG',    en: 'ABOUT'        }, tech: 'IDENTITY_NODE_02'     },
    { id: 'experience', label: { id: 'PENGALAMAN', en: 'EXPERIENCE'   }, tech: 'EVOLUTION_LOGS_03'    },
    { id: 'education',  label: { id: 'PENDIDIKAN', en: 'EDUCATION'    }, tech: 'HISTORY_LAYER_04'     },
    { id: 'services',   label: { id: 'KEAHLIAN',  en: 'CAPABILITIES' }, tech: 'CAPABILITY_SYNC_05'   },
    { id: 'portfolio',  label: { id: 'PORTOFOLIO', en: 'PORTFOLIO'    }, tech: 'RELIQUARY_ARCHIVE_06' },
    { id: 'contact',    label: { id: 'KONTAK',     en: 'CONTACT'      }, tech: 'UPLINK_TERMINAL_07'   },
  ];

  const scrollTo = (id: string) => {
    window.dispatchEvent(new CustomEvent('nav-section', { detail: id }));
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-color)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Navigation Menu"
        style={{
          width: '44px', height: '44px',
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-color)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--accent-color)',
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={isOpen ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 997, cursor: 'pointer' }}
            />
            {/* Nav panel */}
            <motion.div
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as any }}
              style={{
                position: 'fixed', top: 0, right: 0,
                width: 'min(420px, 100vw)', height: '100dvh',
                background: 'var(--overlay-bg)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid var(--border-color)',
                zIndex: 998,
                padding: 'clamp(80px, 14vh, 110px) clamp(16px, 5vw, 40px) 40px',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                overflowY: 'auto',
              }}
            >
              <div style={{ position: 'absolute', bottom: '30px', right: '30px', opacity: 0.05 }}>
                <DayakMotifs.AsoLarge />
              </div>

              <div className="hud-tag" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                NAVIGATION_ARRAY // RIMBA_PROTOCOL
              </div>

              {sections.map((sec, idx) => (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => scrollTo(sec.id)}
                  whileHover={{ x: -8, background: 'rgba(0, 242, 254, 0.05)', borderColor: 'var(--accent-color)' }}
                  style={{
                    padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 3vw, 1.5rem)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(255,255,255,0.01)',
                    transition: 'all 0.25s',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)', opacity: 0.55, marginBottom: '2px' }}>{sec.tech}</div>
                    <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', fontWeight: 900, fontFamily: 'var(--font-header)', color: 'var(--text-color)' }}>
                      {t('label', sec.label)}
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--accent-color)" opacity={0.35} />
                </motion.div>
              ))}

              <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.2, paddingTop: '1rem' }} className="hud-tag">
                CORE_SYS_V4.2 // RMB_OPERATIVE
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function RightToolbar() {
  return (
    <div style={{
      position: 'fixed',
      top: 'clamp(14px, 3vh, 28px)',
      right: 'clamp(12px, 3vw, 28px)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
    }}>
      <ThemeBtn />
      <NavBtn />
      <LangBtn />
      {/* Separator */}
      <div style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      {/* Portfolio page link */}
      <motion.a
        href="/portfolio"
        title="Portfolio Archive"
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-secondary)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Portfolio Archive"
        style={{
          width: '44px', height: '44px',
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-secondary)',
          borderRadius: '10px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-secondary)',
          flexShrink: 0, gap: '1px',
          textDecoration: 'none',
        }}
      >
        <Archive size={16} />
        <span style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', fontWeight: 700, lineHeight: 1, letterSpacing: '0.5px' }}>PORT</span>
      </motion.a>

      {/* Career Timeline link */}
      <motion.a
        href="/timeline"
        title="Career Timeline"
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-color)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Career Timeline"
        style={{
          width: '44px', height: '44px',
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-color)',
          borderRadius: '10px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-color)',
          flexShrink: 0, gap: '1px',
          textDecoration: 'none',
        }}
      >
        <Activity size={16} />
        <span style={{ fontSize: '0.45rem', fontFamily: 'var(--font-mono)', fontWeight: 700, lineHeight: 1, letterSpacing: '0.5px' }}>TIME</span>
      </motion.a>
    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [rebooting, setRebooting] = useState(false);

  // Listen for reboot signal from Contact section
  useEffect(() => {
    const onReboot = () => setRebooting(true);
    window.addEventListener('rimba-reboot', onReboot);
    return () => window.removeEventListener('rimba-reboot', onReboot);
  }, []);

  return (
    <LanguageProvider>
      {/* Initial page load screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Reboot screen — reloads when animation finishes */}
      {rebooting && <LoadingScreen onComplete={() => window.location.reload()} />}

      <RightToolbar />
      <SectionIndicator />
      <main>
        <ScrollController />
      </main>
    </LanguageProvider>
  );
}
