import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';

export default function GlobalNav() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'hero', label: { id: 'BERANDA', en: 'INTRO' }, technical: 'DATA_STREAM_01' },
    { id: 'about', label: { id: 'TENTANG', en: 'ABOUT' }, technical: 'IDENTITY_NODE_02' },
    { id: 'experience', label: { id: 'PENGALAMAN', en: 'EXPERIENCE' }, technical: 'EVOLUTION_LOGS_03' },
    { id: 'education', label: { id: 'PENDIDIKAN', en: 'EDUCATION' }, technical: 'HISTORY_LAYER_04' },
    { id: 'services', label: { id: 'KEAHLIAN', en: 'CAPABILITIES' }, technical: 'CAPABILITY_SYNC_05' },
    { id: 'portfolio', label: { id: 'PORTOFOLIO', en: 'PORTFOLIO' }, technical: 'RELIQUARY_ARCHIVE_06' },
    { id: 'contact', label: { id: 'KONTAK', en: 'CONTACT' }, technical: 'UPLINK_TERMINAL_07' }
  ];

  const scrollTo = (id: string) => {
    window.dispatchEvent(new CustomEvent('nav-section', { detail: id }));
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-color)' }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          top: 'clamp(65px, 12vh, 100px)',
          right: 'clamp(12px, 4vw, 30px)',
          zIndex: 1000,
          width: 'clamp(40px, 8vw, 50px)',
          height: 'clamp(40px, 8vw, 50px)',
          background: 'var(--overlay-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--accent-color)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--accent-color)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'open' : 'closed'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
        <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', opacity: 0.5, color: 'var(--text-color)', whiteSpace: 'nowrap' }}>
          {isOpen ? 'SYS_CLOSE' : 'SYS_MENU'}
        </div>
      </motion.button>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: 'min(400px, 100vw)',
              height: '100dvh',
              background: 'var(--overlay-bg)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid var(--border-color)',
              zIndex: 999,
              padding: 'clamp(80px, 15vh, 120px) clamp(16px, 5vw, 40px) clamp(20px, 4vh, 40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              overflowY: 'auto'
            }}
          >
            {/* Background Motif */}
            <div style={{ position: 'absolute', bottom: '40px', right: '40px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
              <DayakMotifs.AsoLarge />
            </div>

            <div className="hud-tag" style={{ marginBottom: '1.5rem' }}>NAVIGATION_ARRAY // RIMBA_PROTOCOL</div>

            {sections.map((sec, idx) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => scrollTo(sec.id)}
                style={{
                  padding: 'clamp(0.8rem, 3vw, 1.5rem)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.01)',
                  transition: 'all 0.3s'
                }}
                whileHover={{ 
                  background: 'rgba(0, 242, 254, 0.05)',
                  borderColor: 'var(--accent-color)',
                  x: -10 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-color)', opacity: 0.6 }}>{sec.technical}</div>
                    <div style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', fontWeight: 900, fontFamily: 'var(--font-header)', color: 'var(--text-color)' }}>{t('label', sec.label)}</div>
                  </div>
                  <ChevronRight size={20} color="var(--accent-color)" opacity={0.4} />
                </div>
                
                {/* Visual Accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-color)', opacity: 0.1 }} />
              </motion.div>
            ))}

            <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.3 }} className="hud-tag">
              CORE_SYSTEMV_4.2.0 // BY_RMB_OPERATIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Mask */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.5)',
              zIndex: 998,
              cursor: 'pointer'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
