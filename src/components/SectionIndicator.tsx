import React, { useState, useEffect } from 'react';
import * as Framer from 'framer-motion';
import { useLanguage } from './LanguageContext';
import RowingAnimation from './RowingAnimation';

export default function SectionIndicator() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: { id: 'Beranda', en: 'Intro' } },
    { id: 'about', label: { id: 'Tentang', en: 'About' } },
    { id: 'experience', label: { id: 'Pengalaman', en: 'Experience' } },
    { id: 'education', label: { id: 'Pendidikan', en: 'Education' } },
    { id: 'services', label: { id: 'Keahlian', en: 'Capabilities' } },
    { id: 'portfolio', label: { id: 'Portofolio', en: 'Portfolio' } },
    { id: 'contact', label: { id: 'Kontak', en: 'Contact' } }
  ];

  const [progress, setProgress] = useState(0);
  const springProgress = Framer.useSpring(progress, { stiffness: 50, damping: 20 });
  const boatY = Framer.useTransform(springProgress, [0, 1], [780, 20]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-section') {
            const newSection = document.body.getAttribute('data-section');
            if (newSection) setActiveSection(newSection);
          }
          if (mutation.attributeName === 'data-progress') {
            const newProgress = parseFloat(document.body.getAttribute('data-progress') || '0');
            setProgress(newProgress);
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    const initialSection = document.body.getAttribute('data-section');
    if (initialSection) setActiveSection(initialSection);
    
    const initialProgress = parseFloat(document.body.getAttribute('data-progress') || '0');
    setProgress(initialProgress);

    return () => observer.disconnect();
  }, []);

  const Tree = ({ y, x, scale = 1, opacity = 0.3 }: { y: string, x: string, scale?: number, opacity?: number }) => (
    <Framer.motion.g
      initial={{ rotate: -2 }}
      animate={{ rotate: 2 }}
      transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut", repeatType: "reverse" }}
      style={{ transformOrigin: `${x} ${y}` }}
    >
      <path
        d={`M${parseInt(x) - 10} ${parseInt(y)} L${x} ${parseInt(y) - 30} L${parseInt(x) + 10} ${parseInt(y)} Z`}
        fill="var(--accent-color)"
        opacity={opacity * 0.4}
      />
      <path
        d={`M${parseInt(x) - 15} ${parseInt(y) + 10} L${x} ${parseInt(y) - 20} L${parseInt(x) + 15} ${parseInt(y) + 10} Z`}
        fill="var(--accent-color)"
        opacity={opacity * 0.6}
      />
      <rect x={parseInt(x) - 2} y={parseInt(y) + 10} width="4" height="15" fill="var(--accent-color)" opacity={opacity} />
    </Framer.motion.g>
  );

  return (
    <div
      className="section-indicator-hidden"
      style={{ 
        position: 'fixed', 
        left: '0', 
        top: '0', 
        height: '100vh',
        width: '180px',
        zIndex: 1000, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingLeft: '65px',
        gap: '3.5rem',
        userSelect: 'none'
      }}>

      {/* Kapuas River & Rimba Foliage: Full-Height SVG */}
      <div style={{ 
        position: 'absolute', 
        left: '0', 
        top: '0', 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        opacity: 0.3
      }}>
        <svg width="100%" height="100%" viewBox="0 0 180 800" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Static Trees along the banks */}
          <Tree x="40" y="50" scale={0.8} opacity={0.2} />
          <Tree x="140" y="150" scale={1.2} opacity={0.4} />
          <Tree x="30" y="300" scale={1} opacity={0.3} />
          <Tree x="150" y="450" scale={0.9} opacity={0.2} />
          <Tree x="45" y="600" scale={1.1} opacity={0.5} />
          <Tree x="130" y="750" scale={0.8} opacity={0.3} />

          {/* Line 1: Short (Left) */}
          <Framer.motion.path
            d="M50 0C60 100 40 200 50 300C60 400 40 500 50 600C60 700 40 800 50 900"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
            animate={{ strokeDashoffset: [0, -120] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            style={{ strokeDasharray: "15, 45" }}
          />

          {/* Line 2: Long (Center - Main River) */}
          <Framer.motion.path
            d="M70 0C85 100 55 200 70 300C85 400 55 500 70 600C85 700 55 800 70 900"
            stroke="var(--accent-color)"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={{ strokeDasharray: "30, 20" }}
          />
          {/* Main River Glow */}
          <path
            d="M70 0C85 100 55 200 70 300C85 400 55 500 70 600C85 700 55 800 70 900"
            stroke="var(--accent-color)"
            strokeWidth="15"
            strokeLinecap="round"
            opacity="0.15"
            style={{ filter: 'blur(12px)' }}
          />

          {/* Line 3: Short (Right) */}
          <Framer.motion.path
            d="M90 0C100 100 80 200 90 300C100 400 80 500 90 600C100 700 80 800 90 900"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
            animate={{ strokeDashoffset: [0, -140] }}
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
            style={{ strokeDasharray: "15, 60" }}
          />

          {/* Scrolling Rowing Boat Indicator: Moving Hilir to Hulu (Bottom to Top) */}
          <Framer.motion.g
            style={{ 
              x: 15, 
              y: boatY
            }}
          >
            <RowingAnimation size={100} color="var(--accent-color)" />
          </Framer.motion.g>
        </svg>
      </div>

      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        const number = (idx + 1).toString().padStart(2, '0');
        
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('nav-section', { detail: section.id }));
            }}
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {/* Numbering */}
            <span style={{
               fontFamily: 'var(--font-mono)',
               fontSize: '0.9rem',
               color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
               opacity: isActive ? 1 : 0.4,
               width: '30px',
               textAlign: 'right',
               fontWeight: 'bold'
            }}>
              {number}
            </span>

            {/* River Node (Dot) */}
            <Framer.motion.div
              animate={{
                scale: isActive ? 1.6 : 1,
                backgroundColor: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                opacity: isActive ? 1 : 0.15,
                boxShadow: isActive ? '0 0 40px var(--accent-color)' : 'none'
              }}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                zIndex: 2,
                border: isActive ? '3px solid #fff' : 'none',
                cursor: 'pointer'
              }}
            />

            {/* Label */}
            <Framer.motion.span
              animate={{
                opacity: isActive ? 1 : 0.4,
                x: isActive ? 0 : -10,
                color: isActive ? 'var(--accent-color)' : 'var(--text-color)'
              }}
              style={{
                fontSize: '1rem',
                fontWeight: '900',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                whiteSpace: 'nowrap'
              }}
            >
              {t('label', section.label)}
            </Framer.motion.span>
          </a>
        );
      })}
    </div>
  );
}
