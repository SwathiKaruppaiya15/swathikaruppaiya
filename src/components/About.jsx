import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats, timeline, personalInfo } from '../data/portfolio';
import { useEffect, useState } from 'react';

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <div className="section-label">01 — About</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#f0f0f5' }}>
            Engineering at the{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              system level
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            {/* College badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={0}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
              >
                🎓 {personalInfo.degree}
              </span>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
                style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}
              >
                📍 {personalInfo.location}
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={1}
              className="space-y-5 mb-10"
            >
              {[
                "I'm a backend engineer who thinks in systems. Pursuing B.Tech in Computer Science & Business Systems at KIT, Coimbatore — my work lives at the intersection of real-time communication, distributed state management, and scalable API design.",
                "I don't just write APIs — I design the infrastructure behind them. From WebSocket room management with STOMP to microservices orchestrated behind an API Gateway, I focus on the hard engineering problems.",
                "My approach: understand the failure modes first, then design for them. Every system I build handles the edge cases — concurrent mutations, billing cycle edge cases, and isolated code execution.",
              ].map((text, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: '#8b8b9e' }}>
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Focus areas */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={2}
              className="grid grid-cols-1 gap-3"
            >
              {[
                { label: 'Real-time Architecture',  desc: 'WebSocket (STOMP/SockJS), room-scoped topics, live collaboration' },
                { label: 'Microservices Design',    desc: 'API Gateway, independent services, JWT across boundaries' },
                { label: 'Automated Backend Logic', desc: 'Spring Scheduler, billing engines, cron-driven workflows' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-lg glass glass-hover"
                >
                  <div
                    className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }}
                  />
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: '#f0f0f5' }}>
                      {item.label}
                    </div>
                    <div className="text-xs" style={{ color: '#8b8b9e' }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats + Timeline */}
          <div>
            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={2}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl glass gradient-border"
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                  <div className="font-semibold text-sm mt-2 mb-1" style={{ color: '#f0f0f5' }}>
                    {stat.label}
                  </div>
                  <div className="text-xs font-mono" style={{ color: '#4a4a5e' }}>
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={3}
            >
              <div className="font-mono text-xs mb-4" style={{ color: '#4a4a5e' }}>
                // growth timeline
              </div>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ background: 'linear-gradient(180deg, #6366f1, transparent)' }}
                />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 pl-10 relative"
                    >
                      {/* Dot */}
                      <div
                        className="absolute left-2 top-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                        style={{
                          background: i === timeline.length - 1 ? '#6366f1' : 'rgba(99,102,241,0.2)',
                          border: '1px solid rgba(99,102,241,0.4)',
                        }}
                      >
                        {i === timeline.length - 1 && (
                          <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs" style={{ color: '#6366f1' }}>
                            {item.year}
                          </span>
                          <span className="font-semibold text-sm" style={{ color: '#f0f0f5' }}>
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: '#8b8b9e' }}>
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
