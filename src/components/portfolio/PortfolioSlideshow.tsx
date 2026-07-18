import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import type { Category, PortfolioItem } from './types';

interface PortfolioSlideshowProps {
  cat: Category;
  idx: number;
  dir: 1 | -1;
  item: PortfolioItem;
  catMeta: { color: string; label: string; icon: React.ReactNode };
  setShowDetail: (show: boolean) => void;
}

const slideVariants = {
  enter: (d: number) => ({
    x: d * 150,
    opacity: 0,
    filter: 'blur(20px) brightness(2)',
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  },
  exit: (d: number) => ({
    x: d * -150,
    opacity: 0,
    filter: 'blur(20px) brightness(0.5)',
    scale: 1.05,
    transition: { duration: 0.5 }
  }),
};

export function PortfolioSlideshow({ cat, idx, dir, item, catMeta, setShowDetail }: PortfolioSlideshowProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={`${cat}-${idx}`}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
          className="slideshow-grid"
        >
          {/* Left: Premium Image Panel */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              overflow: 'hidden', border: `1px solid ${item.accent}40`,
              background: '#000',
              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
              boxShadow: `0 30px 100px -30px ${item.accent}50, 0 0 0 1px ${item.accent}20`
            }}>
              <motion.img
                initial={{ scale: 1.1, filter: 'blur(10px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2 }}
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />

              {/* HUD Overlays */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 3px)', pointerEvents: 'none' }} />
              <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', left: 0, width: '100%', height: '4px', background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`, opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '15px', left: '15px', width: '40px', height: '40px', borderTop: `3px solid ${item.accent}`, borderLeft: `3px solid ${item.accent}`, opacity: 0.6 }} />
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '40px', height: '40px', borderBottom: `3px solid ${item.accent}`, borderRight: `3px solid ${item.accent}`, opacity: 0.6 }} />

              <div style={{
                position: 'absolute', top: '24px', left: '24px',
                padding: '5px 12px', background: 'rgba(0,0,0,0.85)',
                border: `1px solid ${item.accent}60`,
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: item.accent, backdropFilter: 'blur(12px)',
                letterSpacing: '2px', fontWeight: 900,
              }}>
                RELIC_ID::{item.id}
              </div>

              {item.achievement && (
                <div style={{
                  position: 'absolute', bottom: '30px', left: '24px',
                  padding: '8px 16px', background: 'rgba(2,6,23,0.9)',
                  borderLeft: `4px solid ${item.accent}`,
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>STATUS::RESOLVED</div>
                  <div style={{ fontSize: '0.75rem', color: item.accent, fontWeight: 900, letterSpacing: '1px' }}>{item.achievement.toUpperCase()}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Info Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.8rem, 2vh, 1.8rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: catMeta.color,
                padding: '4px 15px',
                border: `1px solid ${catMeta.color}40`,
                background: `${catMeta.color}10`,
                fontSize: '0.7rem', fontWeight: 900, letterSpacing: '3px'
              }}>
                {catMeta.icon} {item.id}
              </div>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${item.accent}40, transparent)` }} />
            </div>

            <div>
              <h2 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 950,
                lineHeight: 0.9,
                letterSpacing: '-2px',
                textTransform: 'uppercase',
                color: 'var(--text-color)',
                margin: 0,
                filter: `drop-shadow(0 0 20px ${item.accent}30)`
              }}>
                {item.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '0.6rem' }}>
                <div style={{ width: '40px', height: '2px', background: item.accent }} />
                <span style={{ fontSize: '0.75rem', color: item.accent, letterSpacing: '0.25em', fontWeight: 800 }}>{item.subtitle}</span>
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: '1.2rem', borderLeft: `2px solid ${item.accent}20` }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 300,
                margin: 0,
                maxWidth: '600px'
              }}>
                {item.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {item.tech.map((t, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  padding: '3px 10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 700
                }}>{t}</span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {/* Detail Button – always visible */}
              <motion.button
                onClick={() => setShowDetail(true)}
                whileHover={{ scale: 1.05, x: 5, background: `${item.accent}25` }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '0.8rem 1.6rem',
                  border: `1px solid ${item.accent}80`,
                  background: `${item.accent}15`,
                  color: item.accent,
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  width: 'fit-content', cursor: 'pointer',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  transition: 'all 0.3s'
                }}
              >
                <FileText size={14} /> STUDI_KASUS
              </motion.button>

              {/* External Link Button */}
              {item.link && item.link !== '#' && (
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5, background: `${item.accent}20` }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '0.8rem 1.6rem',
                    border: `1px solid ${item.accent}40`,
                    background: `${item.accent}08`,
                    color: item.accent,
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900,
                    letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none',
                    width: 'fit-content',
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    transition: 'all 0.3s'
                  }}
                >
                  <ExternalLink size={14} /> DEPLOY_ACCESS
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
