import React from 'react';
import { motion } from 'framer-motion';
import { DayakMotifs } from './DayakMotifs';

export default function HeroSkills() {
  const skills = [
    { name: 'REACT / NEXT.JS', level: 90, color: 'var(--accent-color)', id: '᚛ ARC-01 ᚜' },
    { name: 'THREE.JS / WEBGL', level: 85, color: 'var(--accent-secondary)', id: '᚛ VIZ-02 ᚜' },
    { name: 'ASTRO / SSG', level: 95, color: 'var(--accent-tertiary)', id: '᚛ STR-03 ᚜' },
    { name: 'FRAMER / MOTION', level: 92, color: 'var(--accent-color)', id: '᚛ DYN-04 ᚜' }
  ];

  return (
    <div className="hud-panel neon-border" style={{ 
      padding: '5rem 4rem', 
      maxWidth: '950px', 
      width: '100%', 
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="scan-line" style={{ animationDelay: '1s', animationDuration: '6s' }} />

      <div className="hud-tag" style={{ position: 'absolute', top: '25px', left: '40px', borderLeft: '2px solid var(--accent-tertiary)', paddingLeft: '10px' }}>
        FORGE_LOAD: 100% // ANCESTRAL_LOGIC_SYNC // {new Date().getFullYear()}
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', opacity: 0.3 }}>
         <DayakMotifs.Hornbill />
      </div>
      
      <h2 className="section-title" style={{ fontSize: '4rem', marginBottom: '4rem', color: 'var(--accent-tertiary)' }}>
        Heritage Forge
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        {skills.map((skill, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            style={{ 
              padding: '2rem 1.5rem', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'left',
              position: 'relative',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)'
            }}
          >
            {/* Corner Accents for Module */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: `2px solid ${skill.color}`, borderLeft: `2px solid ${skill.color}` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: `2px solid ${skill.color}`, borderRight: `2px solid ${skill.color}` }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <span className="tribal-text" style={{ fontSize: '1.1rem', color: skill.color, fontWeight: 'bold', letterSpacing: '2px' }}>{skill.name}</span>
              <span className="hud-tag" style={{ fontSize: '0.6rem', color: 'var(--text-color)', opacity: 0.4 }}>{skill.id}</span>
            </div>
            
            <div className="energy-bar-container">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 2, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                className="energy-bar-fill"
                style={{ background: skill.color, color: skill.color }}
              />
            </div>

            <div style={{ 
              marginTop: '1rem', 
              fontSize: '0.7rem', 
              fontFamily: 'var(--font-mono)', 
              color: skill.color, 
              opacity: 0.6,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>SYNC_LEVEL: {skill.level}%</span>
              <span>STABLE</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="hud-tag" style={{ 
        marginTop: '5rem', 
        opacity: 0.2,
        fontSize: '0.6rem',
        letterSpacing: '5px'
      }}>
        CRAFTED_IN_RIMBA // ALL_RELICS_ACTIVE_00 // SYSTEM_OPTIMIZED
      </div>
    </div>
  );
}
