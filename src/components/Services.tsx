import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Smartphone, GitMerge, Server, Headset, ChevronRight, Activity, Zap, Code2, Layout, CheckCircle2 } from 'lucide-react';
import { DayakMotifs } from './DayakMotifs';
import { useLanguage } from './LanguageContext';
import SectionWrapper from './SectionWrapper';

interface ServicesProps {
  activeStep?: number;
}

const servicesData = [
  {
    id: 'CAP-FS-01',
    icon: Code2,
    title: { id: 'Full Stack Engineering', en: 'Full Stack Engineering' },
    description: {
      id: 'Membangun aplikasi utuh dari antarmuka pengguna hingga sistem arsitektur belakang yang skalabel dan efisien.',
      en: 'Building complete applications from user interfaces to scalable and efficient backend system architectures.',
    },
    skills: ['Laravel', 'Next.js', 'React', 'Node.js', 'API Design', 'System Architecture'],
    metrics: [
      { label: { id: 'Pengalaman', en: 'Experience' }, value: '4+ th' },
      { label: { id: 'Proyek Selesai', en: 'Projects' }, value: '20+' },
      { label: { id: 'Solusi End-to-End', en: 'E2E Solutions' }, value: '100%' },
    ],
    color: 'var(--accent-color)',
  },
  {
    id: 'CAP-BE-02',
    icon: Server,
    title: { id: 'Backend Development', en: 'Backend Development' },
    description: {
      id: 'Pengembangan logika server, pengolahan database kompleks, RESTful API, dan optimasi query dengan performa tinggi.',
      en: 'Server logic development, complex database processing, RESTful APIs, and high-performance query optimization.',
    },
    skills: ['Golang', 'Python', 'PostgreSQL', 'MySQL', 'gRPC', 'Vector DB'],
    metrics: [
      { label: { id: 'Query Optimation', en: 'Query Opt' }, value: '99%' },
      { label: { id: 'API Endpoints', en: 'API Endpoints' }, value: '250+' },
      { label: { id: 'Keamanan Data', en: 'Data Security' }, value: 'ISO' },
    ],
    color: 'var(--accent-tertiary)',
  },
  {
    id: 'CAP-FE-03',
    icon: Layout,
    title: { id: 'Frontend Development', en: 'Frontend Development' },
    description: {
      id: 'Pembuatan antarmuka pengguna interaktif, responsif, dan estetis dengan framework modern dan styling terkini.',
      en: 'Creating interactive, responsive, and aesthetic user interfaces with modern frameworks and the latest styling.',
    },
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'JavaScript / TypeScript', 'jQuery'],
    metrics: [
      { label: { id: 'Responsivitas', en: 'Responsive' }, value: '100%' },
      { label: { id: 'UI/UX Fokus', en: 'UI/UX Focus' }, value: 'High' },
      { label: { id: 'Performa Layar', en: 'Screen Perf' }, value: 'A+' },
    ],
    color: 'var(--accent-secondary)',
  },
  {
    id: 'CAP-MOB-04',
    icon: Smartphone,
    title: { id: 'Mobile Development', en: 'Mobile Development' },
    description: {
      id: 'Pengembangan aplikasi mobile cross-platform yang native-like, performa mulus, dan integrasi API yang lancar.',
      en: 'Development of cross-platform mobile applications with native-like smooth performance and seamless API integration.',
    },
    skills: ['Flutter', 'React Native', 'Dart', 'State Management', 'Mobile UI/UX', 'API Integration'],
    metrics: [
      { label: { id: 'Cross-Platform', en: 'Cross-Platform' }, value: 'Yes' },
      { label: { id: 'Aplikasi Rilis', en: 'Apps Released' }, value: '4+' },
      { label: { id: 'Native Feel', en: 'Native Feel' }, value: '98%' },
    ],
    color: 'var(--accent-color)',
  },
  {
    id: 'CAP-DEV-05',
    icon: Activity,
    title: { id: 'DevOps & Server', en: 'DevOps & Server' },
    description: {
      id: 'Otomatisasi deployment, manajemen kontainer, konfigurasi server on-premise, serta integrasi CI/CD pipelines.',
      en: 'Deployment automation, container management, on-premise server configuration, and CI/CD pipeline integration.',
    },
    skills: ['Docker', 'CI/CD', 'Linux / SSH', 'VMware ESXi', 'Nginx', 'Server Config'],
    metrics: [
      { label: { id: 'Uptime Sistem', en: 'System Uptime' }, value: '99.9%' },
      { label: { id: 'Pipeline CI/CD', en: 'CI/CD Pipelines' }, value: '15+' },
      { label: { id: 'Server Dikelola', en: 'Servers Managed' }, value: '10+' },
    ],
    color: 'var(--accent-tertiary)',
  },
  {
    id: 'CAP-ITS-06',
    icon: Headset,
    title: { id: 'IT Support / Staff', en: 'IT Support & Hardware' },
    description: {
      id: 'Pemeliharaan perangkat keras, jaringan komputer, penyelesaian masalah teknis tingkat lanjut, dan operasional harian.',
      en: 'Hardware maintenance, computer networking, advanced technical troubleshooting, and daily operations.',
    },
    skills: ['Troubleshooting', 'Networking / TCP/IP', 'Mikrotik', 'Hardware Repair', 'Helpdesk', 'Technical Docs'],
    metrics: [
      { label: { id: 'Kasus Selesai', en: 'Cases Solved' }, value: '1K+' },
      { label: { id: 'Respon Teknis', en: 'Tech Response' }, value: 'Fast' },
      { label: { id: 'Kepuasan User', en: 'User Satisfaction' }, value: '98%' },
    ],
    color: 'var(--accent-secondary)',
  },
];

export default function Services({ activeStep = 0 }: ServicesProps) {
  const { t } = useLanguage();

  const svc = servicesData[activeStep] ?? servicesData[0];
  const Icon = svc.icon;



  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as any },
  });

  return (
    <SectionWrapper
      bgImage="/assets/bg/bg_services.png"
      bgPosition="center right"
      bgMask="linear-gradient(to left, black 0%, rgba(0,0,0,0.4) 55%, transparent 100%)"
      glow={
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ repeat: Infinity, duration: 5 }}
          style={{
            position: 'absolute',
            top: '-10%', right: '10%',
            width: '700px', height: '700px',
            background: `radial-gradient(circle, ${svc.color} 0%, transparent 65%)`,
            filter: 'blur(100px)',
            pointerEvents: 'none', zIndex: 0,
            transition: 'background 0.8s ease',
          }}
        />
      }
      contentStyle={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(280px, 38%, 500px)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }}
    >

        {/* ──────────── LEFT: Active Capability Spotlight ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vh, 1.8rem)' }}>



          {/* Active capability detail — crossfade on step change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as any }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
              {/* Icon + ID row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{
                  width: 'clamp(52px, 7vw, 80px)',
                  height: 'clamp(52px, 7vw, 80px)',
                  background: `${svc.color}15`,
                  border: `1px solid ${svc.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: svc.color,
                  boxShadow: `0 0 25px ${svc.color}25`,
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  flexShrink: 0,
                }}>
                  <Icon size={28} />
                </div>
                <div className="hud-tag" style={{ color: svc.color, fontSize: '0.65rem' }}>
                  {svc.id} // CAPABILITY_NODE_ACTIVE
                </div>
              </div>

              {/* Capability title */}
              <h3 style={{
                fontFamily: 'var(--font-header)',
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                fontWeight: 950,
                lineHeight: 0.88,
                letterSpacing: 'clamp(-1px, -0.3vw, -3px)',
                textTransform: 'uppercase',
                color: 'var(--text-color)',
                margin: 0,
                filter: `drop-shadow(0 0 20px ${svc.color}30)`,
              }}>
                {t('title', svc.title)}
              </h3>

              {/* Separator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '2px', background: svc.color, flexShrink: 0 }} />
                <div style={{ flex: 1, height: '1px', background: `${svc.color}20` }} />
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
                lineHeight: 1.85,
                color: 'var(--text-color)',
                opacity: 0.72,
                fontWeight: 300,
                margin: 0,
                borderLeft: `2px solid ${svc.color}30`,
                paddingLeft: '1.2rem',
                maxWidth: '620px',
              }}>
                {t('description', svc.description)}
              </p>

              {/* Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {svc.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ borderColor: svc.color, color: svc.color }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                      padding: '4px 12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.02)',
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.5px',
                      cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    <CheckCircle2 size={9} color={svc.color} />
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Metrics row */}
              <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 1.5rem)', flexWrap: 'wrap' }}>
                {svc.metrics.map((m, i) => (
                  <div key={i} style={{
                    flex: '1 1 90px',
                    padding: 'clamp(0.7rem, 1.5vw, 1rem)',
                    border: `1px solid ${svc.color}25`,
                    background: `${svc.color}07`,
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      fontWeight: 900,
                      color: svc.color,
                      textShadow: `0 0 15px ${svc.color}60`,
                      lineHeight: 1,
                    }}>
                      {m.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '1px',
                      marginTop: '0.3rem',
                      textTransform: 'uppercase',
                    }}>
                      {t('label', m.label)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ──────────── RIGHT: Capability Cards Stack ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {servicesData.map((s, i) => {
            const isActive = activeStep === i;
            const SIcon = s.icon;
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1 : 0.98,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  border: `1px solid ${isActive ? s.color + '55' : 'rgba(255,255,255,0.05)'}`,
                  background: isActive ? `${s.color}0a` : 'rgba(2, 6, 23, 0.6)',
                  backdropFilter: 'blur(10px)',
                  padding: isActive ? 'clamp(1rem, 2.5vw, 1.8rem)' : 'clamp(0.7rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.4rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.45s ease',
                  clipPath: isActive
                    ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                    : 'none',
                  boxShadow: isActive ? `0 0 40px -15px ${s.color}` : 'none',
                }}
              >
                {/* Scan line on active */}
                {isActive && <div className="scan-line" style={{ animationDuration: '5s', opacity: 0.1 }} />}

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Icon bubble */}
                  <div style={{
                    width: isActive ? 'clamp(44px, 5vw, 56px)' : '36px',
                    height: isActive ? 'clamp(44px, 5vw, 56px)' : '36px',
                    background: isActive ? s.color : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#020617' : s.color,
                    flexShrink: 0,
                    transition: 'all 0.4s',
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    boxShadow: isActive ? `0 0 20px ${s.color}60` : 'none',
                  }}>
                    <SIcon size={isActive ? 22 : 16} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: s.color,
                      opacity: isActive ? 0.7 : 0.4,
                      letterSpacing: '1.5px',
                      marginBottom: '2px',
                    }}>
                      {s.id}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: isActive ? 'clamp(1rem, 2vw, 1.4rem)' : 'clamp(0.85rem, 1.5vw, 1.05rem)',
                      fontWeight: 800,
                      color: 'var(--text-color)',
                      letterSpacing: '-0.5px',
                      transition: 'all 0.4s',
                    }}>
                      {t('title', s.title)}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={18} color={s.color} />
                  </motion.div>
                </div>

                {/* Expanded content on active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: '1rem',
                        paddingTop: '0.9rem',
                        borderTop: `1px solid ${s.color}20`,
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <Zap size={13} color={s.color} fill={s.color} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: s.color,
                          fontWeight: 700,
                          letterSpacing: '2px',
                          opacity: 0.85,
                        }}>
                          ACCESS_GRANTED // ENGINE_READY
                        </span>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}`, display: 'inline-block', marginLeft: 'auto' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '3px', height: '100%',
                  background: s.color,
                  opacity: isActive ? 0.8 : 0.1,
                  transition: 'opacity 0.4s',
                }} />
              </motion.div>
            );
          })}

          {/* Dayak motif watermark */}
          <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.1, marginTop: '0.5rem', color: svc.color }}>
            <DayakMotifs.AncientSeal size={80} />
          </div>
        </motion.div>
    </SectionWrapper>
  );
}
