import React from 'react';
import { motion } from 'framer-motion';

export default function RowingAnimation({ size = 150, color = 'var(--accent-color)' }: { size?: number, color?: string }) {
  return (
    <div style={{ width: size, height: size * 0.6, position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Boat Bobbing Motion */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          {/* Canoe (Perahu) */}
          <path 
            d="M20 80C40 90 160 90 180 80C170 100 30 100 20 80Z" 
            fill={color} 
            opacity="0.8" 
          />
          
          {/* Rower Body */}
          <motion.path
            d="M95 80L90 60L100 45L110 60L105 80H95Z"
            fill={color}
            animate={{ rotate: [-2, 5, -2] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ transformOrigin: 'bottom center' }}
          />
          <circle cx="100" cy="40" r="6" fill={color} />

          {/* Paddle & Arms Motion */}
          <motion.g
            animate={{ 
              rotate: [-20, 45, -20],
              x: [-5, 5, -5],
              y: [0, 5, 0]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ transformOrigin: '100px 60px' }}
          >
            {/* Paddle Shaft */}
            <rect x="98" y="45" width="2" height="60" fill={color} opacity="0.6" rx="1" />
            {/* Paddle Blade */}
            <path d="M90 105L108 105L104 120L94 120L90 105Z" fill={color} />
          </motion.g>
        </motion.g>

        {/* Ripples beneath the boat */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${60 + i * 30} 105 Q 100 115 ${140 - i * 30} 105`}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: [0, 0.4, 0], scaleX: [0.8, 1.2, 0.8], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, delay: i * 1, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
