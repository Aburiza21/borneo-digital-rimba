import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${isDark ? 'var(--accent-color)' : 'var(--accent-secondary)'}` }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        top: 'clamp(12px, 3vh, 30px)',
        right: 'clamp(12px, 4vw, 30px)',
        zIndex: 100,
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'var(--accent-color)' : 'var(--accent-secondary)'}`,
        borderRadius: '12px',
        width: 'clamp(40px, 7vw, 50px)',
        height: 'clamp(40px, 7vw, 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: isDark ? 'var(--accent-color)' : 'var(--accent-secondary)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
        transition: 'all 0.3s ease'
      }}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </AnimatePresence>
      <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', opacity: 0.5, color: 'var(--text-color)' }}>
        {isDark ? 'SYS_LIGHT' : 'SYS_DARK'}
      </div>
    </motion.button>
  );
}
