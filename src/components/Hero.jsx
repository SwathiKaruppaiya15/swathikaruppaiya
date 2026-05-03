import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import NetworkBackground from './NetworkBackground';
import { personalInfo } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToDesigns = () => {
    document.querySelector('#system-design')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Network canvas */}
      <NetworkBackground />

      {/* Gradient orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          top: '10%',
          left: '20%',
          animation: 'orbFloat1 8s ease-in-out infinite',
        }}
      />
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          animation: 'orbFloat2 10s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 30px); }
        }
      `}</style>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{
              background: 'rgba(34,211,238,0.06)',
              border: '1px solid rgba(34,211,238,0.15)',
              color: '#22d3ee',
            }}
          >
            <div className="pulse-dot" style={{ width: 6, height: 6 }} />
            Open to opportunities · Backend Engineering
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
        >
          <span style={{ color: '#f0f0f5' }}>I build </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            real-time,
          </span>
          <br />
          <span style={{ color: '#f0f0f5' }}>scalable backend</span>
          <br />
          <span style={{ color: '#f0f0f5' }}>systems.</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="font-mono text-sm" style={{ color: '#4a4a5e' }}>
            {'>'}{' '}
          </span>
          <span className="font-mono text-lg md:text-xl font-medium" style={{ color: '#8b8b9e' }}>
            Specializing in{' '}
          </span>
          <TypeAnimation
            sequence={[
              'Real-time systems', 2000,
              'Distributed architecture', 2000,
              'High-performance APIs', 2000,
              'Concurrent systems', 2000,
              'Scalable backends', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-mono text-lg md:text-xl font-semibold"
            style={{ color: '#6366f1' }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          style={{ color: '#8b8b9e' }}
        >
          Backend engineer obsessed with concurrency, distributed systems, and
          building infrastructure that scales. Java · Spring Boot · Redis · WebSockets · Docker.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={scrollToProjects}
            className="btn-primary relative z-10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>→</span>
          </motion.button>
          <motion.button
            onClick={scrollToDesigns}
            className="btn-secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View System Designs
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: IconBrandGithub, href: personalInfo.github, label: 'GitHub' },
            { icon: IconBrandLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: IconMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8b8b9e',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                e.currentTarget.style.color = '#6366f1';
                e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#8b8b9e';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
      >
        <span className="font-mono text-xs" style={{ color: '#4a4a5e' }}>scroll</span>
        <IconArrowDown size={14} style={{ color: '#4a4a5e' }} />
      </motion.div>
    </section>
  );
}
