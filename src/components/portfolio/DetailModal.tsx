import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { PortfolioItem } from './types';

interface DetailModalProps {
  item: PortfolioItem;
  accentColor: string;
  onClose: () => void;
}

export function DetailModal({ item, accentColor, onClose }: DetailModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(2,6,23,0.6)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer'
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 999,
          width: '100%', maxWidth: '780px',
          background: 'rgba(6, 12, 28, 0.98)',
          borderLeft: `1px solid ${accentColor}40`,
          boxShadow: `-30px 0 80px rgba(0,0,0,0.6), -10px 0 30px ${accentColor}10`,
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
          fontFamily: 'var(--font-body)',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, background: `${accentColor}30`, x: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', top: '24px', left: '24px',
            width: '40px', height: '40px', borderRadius: '10px',
            border: `1px solid ${accentColor}40`,
            background: `${accentColor}10`,
            color: accentColor, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </motion.button>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: accentColor, letterSpacing: '3px', fontWeight: 900 }}>STUDI KASUS ::</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>{item.id}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-color)', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>{item.title}</h2>
          <p style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '1px', marginTop: '0.4rem' }}>{item.subtitle} — {item.year}</p>
          {(item.role || item.team) && (
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {item.role && <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}><span style={{ color: accentColor, fontWeight: 700 }}>Peran:</span> {item.role}</span>}
              {item.team && <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}><span style={{ color: accentColor, fontWeight: 700 }}>Tim:</span> {item.team}</span>}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${accentColor}60, transparent)`, marginBottom: '2rem' }} />

        {/* Problem Section */}
        {item.problem && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// MASALAH & LATAR BELAKANG</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {item.problem.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <span style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0, marginTop: '3px' }}>✗ {String(i + 1).padStart(2, '0')}</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Solution Section */}
        {item.solution && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// SOLUSI & PENDEKATAN</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {item.solution.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  <span style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0, marginTop: '3px' }}>✓ {String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Architecture Table */}
        {item.architecture && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// ARSITEKTUR LAYANAN</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${accentColor}40` }}>
                    {['Komponen', 'Teknologi', 'Tanggung Jawab'].map(h => (
                      <th key={h} style={{ padding: '0.6rem 1rem', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: accentColor, letterSpacing: '2px', fontWeight: 900, textTransform: 'uppercase', background: `${accentColor}10` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.architecture.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.7rem 1rem', fontWeight: 700, color: 'var(--text-color)' }}>{row.component}</td>
                      <td style={{ padding: '0.7rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: accentColor }}>{row.tech}</td>
                      <td style={{ padding: '0.7rem 1rem', color: 'rgba(255,255,255,0.6)' }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Metrics Table */}
        {item.metrics && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// HASIL & DAMPAK BISNIS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {item.metrics.map((m, i) => (
                <div key={i} style={{ padding: '1rem', background: `${accentColor}08`, border: `1px solid ${accentColor}25`, borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>{m.label}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{m.before}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-color)' }}>{m.after}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 900, color: accentColor, whiteSpace: 'nowrap' }}>{m.improvement}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code Snippet */}
        {item.codeSnippet && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// KODE IMPLEMENTASI ({item.codeSnippet.lang.toUpperCase()})</h3>
            <pre style={{ background: '#0d1117', border: `1px solid ${accentColor}30`, borderRadius: '8px', padding: '1.2rem', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.7, color: '#c9d1d9', margin: 0 }}>{item.codeSnippet.code}</pre>
          </section>
        )}

        {/* Tech Stack */}
        <section>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>// TECH STACK</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {item.tech.map((t, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '5px 14px', border: `1px solid ${accentColor}50`, color: accentColor, borderRadius: '4px', fontWeight: 700, background: `${accentColor}10` }}>{t}</span>
            ))}
          </div>
        </section>
      </motion.div>
    </>
  );
}
