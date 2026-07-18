import React from 'react';
import { motion } from 'framer-motion';
import type { PortfolioItem } from './types';

interface PortfolioFooterProps {
  items: PortfolioItem[];
  idx: number;
  setIdx: (idx: number | ((i: number) => number)) => void;
  setDir: (dir: 1 | -1) => void;
  catMeta: { color: string; label: string; icon: React.ReactNode };
}

export function PortfolioFooter({ items, idx, setIdx, setDir, catMeta }: PortfolioFooterProps) {
  return (
    <footer style={{
      position: 'relative', zIndex: 100,
      padding: '0 clamp(16px, 5vw, 60px)',
      height: 'clamp(60px, 8vh, 80px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      background: 'rgba(2,6,23,0.8)',
      flexWrap: 'wrap', gap: '20px',
    }}>
      {/* Progress Dots */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            whileHover={{ scale: 1.5 }}
            style={{
              width: i === idx ? '40px' : '10px',
              height: '4px',
              borderRadius: '2px',
              background: i === idx ? catMeta.color : 'rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              boxShadow: i === idx ? `0 0 15px ${catMeta.color}` : 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
      </div>

      {/* Info & Navigation Hint */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', fontWeight: 700 }}>NAVIGATION_HELPER::</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['←', '→'].map(k => (
              <div key={k} style={{ padding: '2px 6px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', borderRadius: '3px' }}>{k}</div>
            ))}
          </div>
        </div>

        <div style={{
          fontSize: '0.9rem', color: catMeta.color,
          fontWeight: 900, letterSpacing: '4px',
          fontFamily: 'var(--font-mono)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ opacity: 0.4 }}>VIEWING_OBJECT::</span>
          {String(idx + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
        </div>
      </div>

      {/* Core System Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '3px', fontWeight: 700 }}>
          RIMBA_ARCHIVE_CORE_V4.3 // DEEP_FILES
        </span>
      </div>
    </footer>
  );
}
