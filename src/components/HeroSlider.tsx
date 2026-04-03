import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import HeroIntro from './HeroIntro';
import HeroAbout from './HeroAbout';
import HeroSkills from './HeroSkills';

interface HeroSliderProps {
  activeStep?: number;
}

export default function HeroSlider({ activeStep = 0 }: HeroSliderProps) {
  const slides = [
    <HeroIntro key="slide-1" />,
    <HeroAbout key="slide-2" />,
    <HeroSkills key="slide-3" />
  ];

  const direction = 1; // Simplified for master control

  const variants: Variants = {
    initial: {
      y: 50,
      opacity: 0,
      scale: 0.98,
    },
    active: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          variants={variants}
          initial="initial"
          animate="active"
          exit="exit"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          {slides[activeStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
