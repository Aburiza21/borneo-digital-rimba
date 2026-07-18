import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { DayakMotifs } from '../DayakMotifs';
import type { Category, PortfolioItem } from './types';
import { categories } from './data';
import { PortfolioSidebar } from './PortfolioSidebar';

interface PortfolioHeaderProps {
  cat: Category;
  switchCat: (c: Category) => void;
  items: PortfolioItem[];
  idx: number;
  setIdx: (idx: number | ((i: number) => number)) => void;
  setDir: (dir: 1 | -1) => void;
}

export function PortfolioHeader({ cat, switchCat, items, idx, setIdx, setDir }: PortfolioHeaderProps) {
  const catMeta = categories.find(c => c.key === cat)!;

  return (
    <header style={{
      position: 'relative', zIndex: 100,
      margin: 'clamp(15px, 3vh, 30px) auto 0',
      width: 'calc(100% - clamp(30px, 5vw, 60px))',
      maxWidth: '1600px',
      height: 'clamp(60px, 8vh, 70px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(30px)',
      background: 'rgba(2,6,23,0.65)',
      boxShadow: `0 10px 40px -10px ${catMeta.color}20`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(10px, 2vw, 25px)',
      gap: '10px'
    }}>
      {/* Top ambient glow line */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: -1, left: 0, width: '40%', height: '1px', background: `linear-gradient(90deg, transparent, ${catMeta.color}, transparent)`, zIndex: 101 }}
      />

      {/* Left: Brand */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 4 }}
          style={{ color: catMeta.color, filter: `drop-shadow(0 0 8px ${catMeta.color}60)` }}
        >
          <DayakMotifs.AsoCorner size={28} />
        </motion.div>

        {/* Hide text on very small screens */}
        <div className="header-brand-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.45rem', color: catMeta.color, fontWeight: 900, letterSpacing: '3px', fontFamily: 'var(--font-mono)' }}>NODE::ARCHIVE</span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: catMeta.color, boxShadow: `0 0 5px ${catMeta.color}` }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', fontWeight: 900, color: 'var(--text-color)', margin: 0, letterSpacing: '1px', lineHeight: 1 }}>
            PORTOFOLIO
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
        <div style={{
          display: 'flex', gap: '4px', padding: '5px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '14px',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
        }}>
          {categories.map(c => {
            const isActive = cat === c.key;
            return (
              <motion.button
                key={c.key}
                onClick={() => switchCat(c.key)}
                whileHover={!isActive ? { background: 'rgba(255,255,255,0.06)' } : {}}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  padding: '8px clamp(12px, 2vw, 20px)',
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? c.color : 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1.5px',
                  cursor: 'pointer', borderRadius: '10px', transition: 'color 0.3s',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  zIndex: 1
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg"
                    style={{
                      position: 'absolute', inset: 0,
                      background: `${c.color}15`,
                      border: `1px solid ${c.color}40`,
                      borderRadius: '10px',
                      boxShadow: `0 0 15px ${c.color}20`,
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{ filter: isActive ? `drop-shadow(0 0 5px ${c.color}80)` : 'none' }}>
                  {c.icon}
                </span>
                <span className="tab-label">{c.label}</span>
              </motion.button>
            )
          })}
        </div>
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, background: `${catMeta.color}15`, borderColor: catMeta.color }}
          whileTap={{ scale: 0.95 }}
          style={{
            height: '44px',
            padding: '0 16px',
            border: `1px solid ${catMeta.color}40`,
            background: 'rgba(255,255,255,0.03)',
            color: catMeta.color,
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800,
            letterSpacing: '2px', borderRadius: '10px', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: `0 4px 15px ${catMeta.color}10`
          }}
        >
          <Home size={14} /> <span className="back-text">BERANDA</span>
        </motion.a>

        <PortfolioSidebar
          items={items}
          idx={idx}
          setIdx={setIdx}
          setDir={setDir}
          catMeta={catMeta}
        />
      </div>

      <style>{`
        @media (max-width: 850px) {
          .header-brand-text { display: none !important; }
          .back-text { display: none !important; }
        }
        @media (max-width: 600px) {
          .tab-label { display: none !important; }
        }
      `}</style>
    </header>
  );
}
