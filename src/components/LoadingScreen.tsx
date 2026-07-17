import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayakMotifs } from './DayakMotifs';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const PHASES = [
  { pct: 0, msg: 'BOOT_SEQUENCE_INITIALIZNG', sub: 'Memuat inti sistem Borneo Matrix...', subEn: 'Loading Borneo Matrix system core...' },
  { pct: 18, msg: 'NEURAL_PATHWAYS_CALIBRATING', sub: 'Mengkalibrasi jalur neural leluhur...', subEn: 'Calibrating ancestral neural pathways...' },
  { pct: 36, msg: 'DAYAK_CIPHER_DECRYPTING', sub: 'Mendekripsi sandi Dayak kuno...', subEn: 'Decrypting ancient Dayak ciphers...' },
  { pct: 52, msg: 'RAINFOREST_NODES_SYNCING', sub: 'Menyinkronkan simpul rimba digital...', subEn: 'Syncing digital rainforest nodes...' },
  { pct: 68, msg: 'ANCESTRAL_DATA_RESTORING', sub: 'Memulihkan arsip data leluhur...', subEn: 'Restoring ancestral data archives...' },
  { pct: 82, msg: 'CIVILIZATION_REASSEMBLING', sub: 'Menyusun ulang peradaban digital...', subEn: 'Reassembling the digital civilization...' },
  { pct: 94, msg: 'SYSTEM_INTEGRITY_VERIFIED', sub: 'Verifikasi integritas sistem selesai...', subEn: 'System integrity verification complete...' },
  { pct: 100, msg: 'RIMBA_ONLINE // SIAP_BERTEMPUR', sub: 'Peradaban telah dipulihkan. Selamat datang.', subEn: 'Civilization restored. Welcome back.' },
];

// Random binary string generator
function randomBin(len: number) {
  return Array.from({ length: len }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [binLines, setBinLines] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef<number>(0);
  const DURATION = 3200; // ms total

  // Animate progress
  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const raw = Math.min(elapsed / DURATION, 1);
      // Ease-out expo
      const eased = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      const pct = Math.floor(eased * 100);
      setProgress(pct);

      // Update phase
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (pct >= PHASES[i].pct) { setPhaseIdx(i); break; }
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 700);
        }, 600);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Regenerate binary rain lines
  useEffect(() => {
    const gen = () => setBinLines(Array.from({ length: 14 }, () => randomBin(40)));
    gen();
    const id = setInterval(gen, 140);
    return () => clearInterval(id);
  }, []);

  // Occasional glitch
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const phase = PHASES[phaseIdx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
          style={{
            position: 'fixed', inset: 0,
            background: 'radial-gradient(ellipse at 60% 40%, rgba(0,15,30,1) 0%, rgba(2,6,23,1) 100%)',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            overflow: 'hidden',
          }}
        >
          {/* CRT Scanlines */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, transparent 1px, transparent 3px)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* Binary rain */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            padding: '20px', gap: '6px', opacity: 0.06, pointerEvents: 'none', zIndex: 0,
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-color)',
            letterSpacing: '4px', overflow: 'hidden',
          }}>
            {binLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          {/* Corner accents */}
          {[
            { top: 20, left: 20, deg: 0 },
            { top: 20, right: 20, deg: 90 },
            { bottom: 20, right: 20, deg: 180 },
            { bottom: 20, left: 20, deg: 270 },
          ].map((pos, i) => {
            const { deg, ...rest } = pos;
            return (
              <div key={i} style={{ position: 'absolute', opacity: 0.3, color: 'var(--accent-color)', transform: `rotate(${deg}deg)`, ...rest } as React.CSSProperties}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M0 40 L0 0 L40 0" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            );
          })}

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '700px', width: '100%', padding: '0 2rem' }}>

            {/* Rotating Dayak seal */}
            <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', color: 'var(--accent-color)', opacity: 0.2 }}
              >
                <DayakMotifs.AncientSeal size={200} />
              </motion.div>

              {/* Counter ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  width: '140px', height: '140px',
                  border: '1px dashed rgba(0,242,254,0.2)',
                  borderRadius: '50%',
                }}
              />

              {/* Pulse rings */}
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.6, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
                  style={{ position: 'absolute', width: '80px', height: '80px', border: '1.5px solid var(--accent-color)', borderRadius: '50%' }}
                />
              ))}

              {/* Central percent */}
              <motion.div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'var(--accent-color)',
                  textShadow: '0 0 30px var(--accent-color)',
                  fontFamily: 'var(--font-header)',
                  ...(glitch ? { filter: 'hue-rotate(90deg) blur(1px)', transform: 'translateX(-2px)' } : {}),
                }}
              >
                {progress}
              </motion.div>
            </div>

            {/* MENYUSUN ULANG PERADABAN header */}
            <motion.div
              animate={glitch ? { x: [-2, 2, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] } : { x: 0 }}
              transition={{ duration: 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <h1 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                fontWeight: 950,
                letterSpacing: 'clamp(2px, 1vw, 6px)',
                textTransform: 'uppercase',
                background: 'linear-gradient(to right, #fff, var(--accent-color))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                textShadow: 'none',
                filter: 'drop-shadow(0 0 20px rgba(0,242,254,0.3))',
                lineHeight: 1.1,
              }}>
                LOADING
              </h1>
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <motion.span
                  key={phaseIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: '0.6rem', color: 'var(--accent-color)', letterSpacing: '2px', fontWeight: 700 }}
                >
                  {phase.msg}
                </motion.span>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                  {progress}%
                </span>
              </div>

              {/* Track */}
              <div style={{
                width: '100%', height: '3px',
                background: 'rgba(255,255,255,0.06)',
                position: 'relative', overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, var(--accent-color), var(--accent-tertiary))`,
                    boxShadow: '0 0 12px var(--accent-color)',
                    width: `${progress}%`,
                    transition: 'width 0.15s linear',
                  }}
                />
                {/* Shimmer */}
                <motion.div
                  animate={{ left: ['-40px', '110%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', top: 0, width: '40px', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Phase sub-text */}
              <motion.div
                key={`sub-${phaseIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                style={{ fontSize: '0.62rem', color: 'var(--text-color)', letterSpacing: '1px' }}
              >
                &gt; {phase.sub}
              </motion.div>
            </div>

            {/* Done flash */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    color: 'var(--accent-tertiary)',
                    fontWeight: 700,
                    letterSpacing: '4px',
                    fontSize: '0.75rem',
                    textShadow: '0 0 20px var(--accent-tertiary)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-tertiary)', boxShadow: '0 0 10px var(--accent-tertiary)', display: 'inline-block' }}
                  />
                  CIVILIZATION_RESTORED // SYSTEM_ONLINE
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom HUD */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '3px',
            fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', zIndex: 2,
          }}>
            MATRIX_NODE_05 // ABU-RIZA-001 // V4.2.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
