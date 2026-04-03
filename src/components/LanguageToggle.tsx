import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.button
      onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-secondary)' }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        top: 'clamp(130px, 25vh, 170px)',
        right: 'clamp(12px, 4vw, 30px)',
        zIndex: 1000,
        width: 'clamp(40px, 7vw, 50px)',
        height: 'clamp(40px, 7vw, 50px)',
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--accent-secondary)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--accent-secondary)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}
    >
      <Languages size={20} />
      <div style={{ fontSize: '0.6rem', fontWeight: 'bold', marginTop: '2px' }}>
        {lang.toUpperCase()}
      </div>
      
      {/* HUD Active Indicator */}
      <motion.div
        layoutId="lang-indicator"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'var(--accent-secondary)'
        }}
      />
      
      <div style={{ position: 'absolute', top: '-15px', right: '-15px', fontSize: '0.5rem', opacity: 0.4, transform: 'rotate(45deg)' }}>
        SYS_LOCALE
      </div>
    </motion.button>
  );
}
