import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import type { PortfolioItem } from './types';
import { DayakMotifs } from '../DayakMotifs';

interface PortfolioSidebarProps {
  items: PortfolioItem[];
  idx: number;
  setIdx: (idx: number | ((i: number) => number)) => void;
  setDir: (dir: 1 | -1) => void;
  catMeta: { color: string; label: string; icon: React.ReactNode };
}

export function PortfolioSidebar({ items, idx, setIdx, setDir, catMeta }: PortfolioSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${catMeta.color}` }}
        whileTap={{ scale: 0.9 }}
        aria-label="Portfolio Menu"
        style={{
          width: '44px', height: '44px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${catMeta.color}80`,
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: catMeta.color,
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
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 997, cursor: 'pointer' }}
            />
            <motion.div
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as any }}
              style={{
                position: 'fixed', top: 0, right: 0,
                width: 'min(420px, 100vw)', height: '100dvh',
                background: 'rgba(2,6,23,0.95)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                zIndex: 998,
                padding: 'clamp(80px, 14vh, 110px) clamp(16px, 5vw, 40px) 40px',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                overflowY: 'auto',
                textAlign: 'left'
              }}
            >
              <div style={{ position: 'absolute', bottom: '30px', right: '30px', opacity: 0.05 }}>
                <DayakMotifs.AsoLarge />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: catMeta.color, borderRadius: '50%', boxShadow: `0 0 10px ${catMeta.color}` }} />
                  <span style={{ fontSize: '0.55rem', color: catMeta.color, opacity: 0.8, letterSpacing: '4px', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>DATA_INDEX::V4.2</span>
                </div>
                <div style={{ width: '100%', height: '1px', background: `linear-gradient(90deg, ${catMeta.color}80, transparent)` }} />
              </div>

              {items.map((it, i) => {
                const isActive = i === idx;
                return (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      setDir(i > idx ? 1 : -1);
                      setIdx(i);
                      setIsOpen(false);
                    }}
                    whileHover={{ x: -8, background: 'rgba(255,255,255, 0.05)', borderColor: catMeta.color }}
                    style={{
                      padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1rem, 3vw, 1.5rem)',
                      border: isActive ? `1px solid ${catMeta.color}40` : '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: isActive ? `${catMeta.color}10` : 'rgba(255,255,255,0.01)',
                      transition: 'all 0.25s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: catMeta.color, opacity: 0.75, marginBottom: '2px', fontWeight: 900 }}>{it.id}</div>
                      <div style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', fontWeight: 900, fontFamily: 'var(--font-header)', color: 'var(--text-color)' }}>
                        {it.title}
                      </div>
                    </div>
                    {isActive ? (
                      <motion.div layoutId="node-arrow">
                        <ChevronRight size={18} color={catMeta.color} />
                      </motion.div>
                    ) : (
                      <ChevronRight size={18} color={catMeta.color} opacity={0.35} />
                    )}
                  </motion.div>
                );
              })}

              <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.2, paddingTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                TERMINUS::END_LOG
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
