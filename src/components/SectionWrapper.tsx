import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  bgImage?: string;
  bgMask?: string;
  bgOpacity?: number;
  bgPosition?: string;
  glow?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export default function SectionWrapper({
  children,
  bgImage,
  bgMask,
  bgOpacity = 0.09,
  bgPosition = 'center',
  glow,
  containerStyle,
  contentStyle,
}: SectionWrapperProps) {
  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 4vw, 2.5rem) clamp(1rem, 6vw, 6rem)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      ...containerStyle
    }}>
      {/* ── Ambient Background Layer ── */}
      {glow}

      {/* ── Section Background Image ── */}
      {bgImage && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: bgPosition, 
          opacity: bgOpacity, 
          mixBlendMode: 'screen', 
          pointerEvents: 'none', 
          maskImage: bgMask, 
          WebkitMaskImage: bgMask 
        }} />
      )}

      {/* ── Main Content Wrapper ── */}
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        ...contentStyle
      }}>
        {children}
      </div>
    </div>
  );
}
