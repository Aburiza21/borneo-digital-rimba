import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Dayak Motifs as Textures ---
function useDayakTextures() {
  return useMemo(() => {
    const textures: Record<string, THREE.CanvasTexture> = {};
    const motifs = {
      aso: `<svg width="128" height="128" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 95V5H95M15 85V15H85" stroke="white" stroke-width="2" /></svg>`,
      hornbill: `<svg width="128" height="128" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 48C12 48 16 28 32 28C48 28 52 48 52 48M32 8V28" stroke="white" stroke-width="2" /></svg>`,
      seal: `<svg width="128" height="128" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="10" stroke="white" stroke-width="1" stroke-dasharray="4 4" /><path d="M30 30L70 70M70 30L30 70" stroke="white" stroke-width="2" opacity="0.3" /></svg>`
    };

    Object.entries(motifs).forEach(([key, svg]) => {
      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 256, 256);
          const tex = new THREE.CanvasTexture(canvas);
          tex.needsUpdate = true;
          textures[key] = tex;
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
    });
    return textures;
  }, []);
}

function GhostMotifs() {
  const groupRef = useRef<any>(null);
  const textures = useDayakTextures();
  const count = 10;

  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 80, -40],
      rotation: [0, 0, Math.random() * Math.PI],
      size: 15 + Math.random() * 20,
      textureKey: ['aso', 'hornbill', 'seal'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 2;
        groupRef.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.05) * 5;
    }
  });

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <mesh key={i} position={d.position as any} rotation={d.rotation as any}>
          <planeGeometry args={[d.size, d.size]} />
          <meshBasicMaterial map={textures[d.textureKey]} transparent opacity={0.03} depthWrite={false} color="#fff" />
        </mesh>
      ))}
    </group>
  );
}

function DayakGlyphs({ section }: { section: string }) {
  const glyphsRef = useRef<any>(null);
  const count = 25; 
  const textures = useDayakTextures();
  const textureKeys = ['aso', 'hornbill', 'seal'];

  const glyphData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        size: 1.5 + Math.random() * 3,
        speed: 0.1 + Math.random() * 0.2,
        textureKey: textureKeys[Math.floor(Math.random() * textureKeys.length)]
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (glyphsRef.current) {
        glyphsRef.current.children.forEach((child: any, i: number) => {
            child.position.y += Math.sin(time * glyphData[i].speed + i) * 0.005;
            child.rotation.z += 0.003;
        });
    }
  });

  const getColor = () => {
    switch (section) {
        case 'education': return '#fbbf24';
        case 'experience': return '#39ff14';
        case 'portfolio': return '#ff00de';
        default: return '#00f2fe';
    }
  };

  return (
    <group ref={glyphsRef}>
      {glyphData.map((d, i) => (
        <React.Suspense key={i} fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={d.position as any} rotation={d.rotation as any}>
              <planeGeometry args={[d.size, d.size]} />
              <MeshWobbleMaterial 
                map={textures[d.textureKey]}
                color={getColor()} 
                transparent 
                opacity={0.3} 
                factor={0.4}
                speed={1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </Float>
        </React.Suspense>
      ))}
    </group>
  );
}

// --- Liquid Background Layer ---
function BackgroundLayer({ section, theme }: { section: string, theme: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const texturePath = useMemo(() => {
    const paths: Record<string, string> = {
      education: '/assets/backgrounds/education.png',
      experience: '/assets/backgrounds/experience.png',
      portfolio: '/assets/backgrounds/portfolio.png',
      services: '/assets/backgrounds/hero.png',
      contact: '/assets/backgrounds/education.png',
      hero: '/assets/backgrounds/hero.png'
    };
    return paths[section] || paths.hero;
  }, [section]);

  const texture = useLoader(THREE.TextureLoader, texturePath);

  useFrame((state) => {
    if (meshRef.current) {
        const distortFactor = 0.2 + Math.abs(state.mouse.x) * 0.1;
        // @ts-ignore
        meshRef.current.material.distort = THREE.MathUtils.lerp(meshRef.current.material.distort, distortFactor, 0.05);
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.mouse.x * 3, 0.05);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.mouse.y * 2, 0.05);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.mouse.x * 0.15, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[110, 70, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial 
        map={texture} 
        transparent 
        opacity={theme === 'dark' ? 0.45 : 0.3} 
        distort={0.25} 
        speed={1.5} 
        depthWrite={false} 
        fog={false}
      />
    </mesh>
  );
}

// --- Magnetic Forest Particles ---
function DigitalForest({ section }: { section: string }) {
  const pointsRef = useRef<any>(null);
  const count = 5000;

  const getColor = () => {
    switch (section) {
      case 'education': return '#fbbf24';
      case 'experience': return '#39ff14';
      case 'portfolio': return '#ff00de';
      default: return '#00f2fe';
    }
  };

  const initialPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const mouse = new THREE.Vector3(state.mouse.x * 25, state.mouse.y * 20, 0);

      for (let i = 0; i < count; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];
        const z = initialPositions[i * 3 + 2];

        const particlePos = new THREE.Vector3(x, y, z);
        const dist = mouse.distanceTo(particlePos);
        
        if (dist < 6) {
          const force = (6 - dist) / 6;
          const dir = particlePos.clone().sub(mouse).normalize();
          particlePos.add(dir.multiplyScalar(force * 1.5));
        }

        positions[i * 3] = THREE.MathUtils.lerp(positions[i * 3], particlePos.x, 0.08);
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], particlePos.y, 0.08);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={initialPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={getColor()}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ThreeCanvas() {
  const [section, setSection] = useState('hero');
  const [theme, setTheme] = useState('dark');
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-section') {
            setSection(document.body.getAttribute('data-section') || 'hero');
            setGlitch(true);
            setTimeout(() => setGlitch(false), 300);
        }
        if (mutation.attributeName === 'data-theme') {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
        if (mutation.attributeName === 'data-progress') {
            setProgress(parseFloat(document.body.getAttribute('data-progress') || '0'));
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    observer.observe(document.documentElement, { attributes: true });

    setSection(document.body.getAttribute('data-section') || 'hero');
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    setProgress(parseFloat(document.body.getAttribute('data-progress') || '0'));
    
    return () => observer.disconnect();
  }, []);

  const bgColor = theme === 'dark' ? '#010409' : '#f1f5f9';

  return (
    <div className={`three-canvas-wrapper ${glitch ? 'glitch-active' : ''}`} style={{ 
        background: bgColor, 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        transition: 'background 0.8s ease'
    }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <SceneUpdater progress={progress} bgColor={bgColor} theme={theme} />
        
        <React.Suspense fallback={null}>
          <GhostMotifs />
          <BackgroundLayer section={section} theme={theme} />
          <DayakGlyphs section={section} />
          <DigitalForest section={section} />
          <ambientLight intensity={theme === 'dark' ? 0.4 : 1} />
          <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 0.5 : 1} />
        </React.Suspense>
      </Canvas>
      <div className="video-overlay" />
    </div>
  );
}

function SceneUpdater({ progress, bgColor, theme }: { progress: number, bgColor: string, theme: string }) {
  useFrame((state) => {
    state.camera.fov = THREE.MathUtils.lerp(60, 48, progress);
    state.camera.updateProjectionMatrix();
  });
  
  return <fog attach="fog" args={[bgColor, 5, 45]} />;
}

