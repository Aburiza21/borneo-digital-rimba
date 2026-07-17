import React, { useState, useEffect } from 'react';
import * as Framer from 'framer-motion';
import { useLanguage } from './LanguageContext';
import RowingAnimation from './RowingAnimation';

export default function SectionIndicator() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: { id: 'Beranda', en: 'Intro' } },
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
        paddingLeft: '30px',
        gap: '3.5rem',
        userSelect: 'none'
      }}>

      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        const number = (idx + 1).toString().padStart(2, '0');

        return (
          <Framer.motion.a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('nav-section', { detail: section.id }));
            }}
            initial="rest"
            whileHover="hover"
            animate={isActive ? "active" : "rest"}
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
            <Framer.motion.span
              variants={{
                rest: { opacity: 0.4, color: 'var(--text-color)' },
                hover: { opacity: 0.8, color: 'var(--accent-color)' },
                active: { opacity: 1, color: 'var(--accent-color)' }
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                width: '30px',
                textAlign: 'left',
                fontWeight: 'bold'
              }}
            >
              {number}
            </Framer.motion.span>

            {/* Label */}
            <Framer.motion.span
              variants={{
                rest: { opacity: 0.4, x: -10, color: 'var(--text-color)' },
                hover: { opacity: 0.8, x: -5, color: 'var(--accent-color)' },
                active: { opacity: 1, x: 0, color: 'var(--accent-color)' }
              }}
              transition={{ duration: 0.2 }}
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
          </Framer.motion.a>
        );
      })}
    </div>
  );
}
