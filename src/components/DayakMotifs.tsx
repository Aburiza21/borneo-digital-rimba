import React from 'react';

/**
 * Tribal Motifs inspired by Borneo Dayak Art (Aso Dragon, Hornbill, etc.)
 * These are high-detail geometric SVG paths for use as HUD ornaments.
 */
export const DayakMotifs = {
  AsoCorner: ({ size = 100, color }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path d="M5 95V5H95M15 85V15H85M25 75V25H75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 10C30 10 30 30 10 30M90 10C70 10 70 30 90 30" stroke="currentColor" strokeWidth="1" />
      <path d="M5 5L20 20M95 5L80 20" stroke="currentColor" strokeWidth="2" />
      <circle cx="5" cy="5" r="3" fill="currentColor" />
      <circle cx="95" cy="5" r="3" fill="currentColor" />
    </svg>
  ),

  AsoLarge: ({ color }: { color?: string }) => (
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path d="M20 100C20 100 60 20 100 20C140 20 180 100 180 100" stroke="currentColor" strokeWidth="3" />
      <path d="M60 60C60 60 80 40 100 40C120 40 140 60 140 60" stroke="currentColor" strokeWidth="2" />
      <path d="M100 20V40M100 60V100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M40 80L60 60M160 80L140 60" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="50" r="8" stroke="currentColor" />
    </svg>
  ),

  Hornbill: ({ size = 60, color }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path d="M12 48C12 48 16 28 32 28C48 28 52 48 52 48" stroke="currentColor" strokeWidth="2" />
      <path d="M32 8V28" stroke="currentColor" strokeWidth="2" />
      <path d="M24 16L32 8L40 16" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="28" r="4" stroke="currentColor" />
      <path d="M10 54H54" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  ),

  MandauDivider: ({ color }: { color?: string }) => (
    <svg width="100%" height="24" viewBox="0 0 400 24" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path d="M0 12H400" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M180 12L200 4L220 12L200 20L180 12Z" fill="currentColor" />
      <path d="M150 12H170M230 12H250" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),

  TribalLattice: ({ color }: { color?: string }) => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <path d="M10 10L90 90M90 10L10 90" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    </svg>
  ),
  AncientSeal: ({ size = 80, color }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
      <rect x="10" y="10" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M30 30L70 70M70 30L30 70" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <text x="50" y="55" fontSize="12" fontFamily="serif" textAnchor="middle" fill="currentColor" opacity="0.5">RMBA</text>
    </svg>
  )
};
