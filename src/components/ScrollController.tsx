import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroIntro from './HeroIntro';
import Education from './Education';
import Experience from './Experience';
import Services from './Services';
import Portfolio from './Portfolio';
import Contact from './Contact';

const SECTIONS = [
  { id: 'hero', steps: 1, Component: HeroIntro },
  { id: 'experience', steps: 4, Component: Experience },
  { id: 'education', steps: 2, Component: Education },
  { id: 'services', steps: 6, Component: Services },
  { id: 'portfolio', steps: 4, Component: Portfolio },
  { id: 'contact', steps: 2, Component: Contact },
];

export default function ScrollController() {
  const [globalStep, setGlobalStep] = useState(0);
  const lastWheelTime = useRef(0);
  const totalSteps = SECTIONS.reduce((acc, s) => acc + s.steps, 0);

  // Touch tracking refs
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastTouchTime = useRef(0);

  // Wheel handling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;
      const isDown = e.deltaY > 0;
      setGlobalStep((prev) => {
        if (isDown && prev < totalSteps - 1) { lastWheelTime.current = now; return prev + 1; }
        if (!isDown && prev > 0) { lastWheelTime.current = now; return prev - 1; }
        return prev;
      });
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [totalSteps]);

  // Touch swipe handling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const now = Date.now();
      if (now - lastTouchTime.current < 900) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = touchStartX.current! - e.changedTouches[0].clientX;
      if (Math.abs(deltaY) < 40 || Math.abs(deltaY) < Math.abs(deltaX)) {
        touchStartY.current = null;
        return;
      }
      const isDown = deltaY > 0;
      setGlobalStep((prev) => {
        if (isDown && prev < totalSteps - 1) { lastTouchTime.current = now; return prev + 1; }
        if (!isDown && prev > 0) { lastTouchTime.current = now; return prev - 1; }
        return prev;
      });
      touchStartY.current = null;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalSteps]);

  // Global Navigation Listener
  useEffect(() => {
    const handleNav = (e: any) => {
      const sectionId = e.detail;
      let startStep = 0;
      for (const s of SECTIONS) {
        if (s.id === sectionId) { setGlobalStep(startStep); break; }
        startStep += s.steps;
      }
    };
    window.addEventListener('nav-section', handleNav);
    return () => window.removeEventListener('nav-section', handleNav);
  }, []);

  // Determine current section and its internal step
  let currentSecIdx = 0;
  let accumulatedSteps = 0;
  for (let i = 0; i < SECTIONS.length; i++) {
    if (globalStep < accumulatedSteps + SECTIONS[i].steps) { currentSecIdx = i; break; }
    accumulatedSteps += SECTIONS[i].steps;
  }
  const currentSection = SECTIONS[currentSecIdx];
  const internalStep = globalStep - accumulatedSteps;

  // Live Clock State
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  // Sync with body data-section and progress
  useEffect(() => {
    document.body.setAttribute('data-section', currentSection.id);
    const progress = (globalStep / (totalSteps - 1)).toFixed(3);
    document.body.setAttribute('data-progress', progress);
  }, [currentSection.id, globalStep, totalSteps]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(30px)', y: 20 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(30px)', y: -20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <currentSection.Component activeStep={internalStep} />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Shutter Overlay */}
      <AnimatePresence>
        {currentSection.id && (
          <motion.div
            key={`shutter-${currentSection.id}`}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              background: 'var(--bg-color)',
              transformOrigin: 'top', zIndex: 2000, pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Global HUD Status — responsive via CSS classes */}
      <div
        className="hud-status-bar"
        style={{
          position: 'fixed', bottom: '30px', right: '40px',
          pointerEvents: 'none', fontFamily: 'var(--font-mono)',
          textAlign: 'right', color: 'var(--text-color)', zIndex: 1000
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '30px', justifyContent: 'flex-end' }}>
          <motion.div
            className="hud-clock"
            style={{
              fontSize: '6rem', fontWeight: 900,
              lineHeight: 0.8, color: 'var(--accent-color)',
              fontFamily: 'var(--font-header)',
              textShadow: '0 0 40px var(--accent-color)'
            }}
          >
            {hours}:{minutes}
          </motion.div>
        </div>
        <div className="hud-sys-text" style={{ marginTop: '10px', fontSize: '0.8rem', letterSpacing: '4px', opacity: 0.4 }}>
          SYS_SYNC: <span style={{ color: 'var(--accent-color)' }}>OK</span> // RIMBA_STREAM_LAYER // ST:{globalStep + 1}
        </div>
      </div>
    </div>
  );
}
