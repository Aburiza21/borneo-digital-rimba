import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Category } from './portfolio/types';
import { data, categories } from './portfolio/data';
import { PortfolioHeader } from './portfolio/PortfolioHeader';
import { PortfolioSlideshow } from './portfolio/PortfolioSlideshow';
import { DetailModal } from './portfolio/DetailModal';
import { PortfolioFooter } from './portfolio/PortfolioFooter';

export default function PortfolioPage() {
  const [cat, setCat] = useState<Category>('programmer');
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [showDetail, setShowDetail] = useState(false);

  const items = data[cat];
  const item = items[idx];
  const catMeta = categories.find(c => c.key === cat)!;

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setIdx(i => (i + d + items.length) % items.length);
  }, [items.length]);

  const switchCat = (c: Category) => {
    setCat(c);
    setIdx(0);
    setDir(1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(ellipse at 60% 30%, rgba(0,15,30,1) 0%, rgba(2,6,23,1) 100%)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-mono)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* CRT scanlines */}
      <div style={{ position: 'fixed', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* Ambient background scene image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            mixBlendMode: 'screen', pointerEvents: 'none',
            maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)'
          }}
        />
      </AnimatePresence>

      {/* Digital Grid & Particles */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none', zIndex: 1, opacity: 0.4 }} />

      {/* Ambient glows */}
      <motion.div
        key={cat}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: 'fixed', top: '-10%', right: '-5%',
          width: '900px', height: '900px',
          background: `radial-gradient(circle, ${catMeta.color} 0%, transparent 70%)`,
          filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Premium HUD Header ── */}
      <PortfolioHeader cat={cat} switchCat={switchCat} items={items} idx={idx} setIdx={setIdx} setDir={setDir} />

      {/* ── Main Workspace ── */}
      <main style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 clamp(16px, 5vw, 60px)',
        overflow: 'hidden',
      }}>
        {/* Side Arrows */}
        <motion.button
          onClick={() => go(-1)}
          whileHover={{ scale: 1.1, x: -5, background: `${catMeta.color}25` }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', left: 'clamp(12px, 3vw, 40px)', zIndex: 50,
            width: '50px', height: '50px',
            border: `1px solid ${catMeta.color}40`, background: `${catMeta.color}15`,
            backdropFilter: 'blur(20px)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: catMeta.color, cursor: 'pointer',
            boxShadow: `0 0 20px ${catMeta.color}15`
          }}
        >
          <ChevronLeft size={28} />
        </motion.button>

        {/* ── Slideshow ── */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} className="portfolio-main-layout">

          {/* Central Viewer Area */}
          <PortfolioSlideshow
            cat={cat}
            idx={idx}
            dir={dir}
            item={item}
            catMeta={catMeta}
            setShowDetail={setShowDetail}
          />
        </div>

        {/* Next Arrow */}
        <motion.button
          onClick={() => go(1)}
          whileHover={{ scale: 1.1, x: 5, background: `${catMeta.color}25` }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', right: 'clamp(12px, 3vw, 40px)', zIndex: 50,
            width: '50px', height: '50px',
            border: `1px solid ${catMeta.color}40`, background: `${catMeta.color}15`,
            backdropFilter: 'blur(20px)', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: catMeta.color, cursor: 'pointer',
            boxShadow: `0 0 20px ${catMeta.color}15`
          }}
        >
          <ChevronRight size={28} />
        </motion.button>
      </main>

      {/* ── Bottom HUD Footer ── */}
      <PortfolioFooter
        items={items}
        idx={idx}
        setIdx={setIdx}
        setDir={setDir}
        catMeta={catMeta}
      />

      {/* Mobile Optimization Style Injector */}
      <style>{`
        @media (max-width: 1400px) {
          .portfolio-sidebar {
            display: none !important;
          }
          .portfolio-main-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) {
          .slideshow-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            max-width: 700px !important;
          }
          .slideshow-grid > div:first-child {
            order: 2;
          }
          .slideshow-grid > div:last-child {
            order: 1;
            text-align: center;
            align-items: center;
          }
          .slideshow-grid p {
            margin: 0 auto !important;
            border-left: none !important;
            padding-left: 0 !important;
            text-align: center;
          }
          .slideshow-grid div {
            justify-content: center;
          }
        }
      `}</style>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <DetailModal
            item={item}
            accentColor={item.accent.startsWith('var') ? catMeta.color : item.accent}
            onClose={() => setShowDetail(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
