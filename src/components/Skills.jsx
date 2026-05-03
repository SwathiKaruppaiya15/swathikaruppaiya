import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, radarSkills } from '../data/portfolio';

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#d1d5db' }}>
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color: '#6366f1' }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: `${level}%` }}
        />
      </div>
    </motion.div>
  );
}

function RadarChart({ skills }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 100;
  const levels = 4;

  const angleStep = (2 * Math.PI) / skills.length;
  const getPoint = (i, radius) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const radius = (r * (l + 1)) / levels;
    return skills.map((_, i) => {
      const p = getPoint(i, radius);
      return `${p.x},${p.y}`;
    }).join(' ');
  });

  const dataPoints = skills.map((s, i) => {
    const radius = (s.value / 100) * r;
    const p = getPoint(i, radius);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridPolygons.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(99,102,241,0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Axes */}
      {skills.map((_, i) => {
        const p = getPoint(i, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(99,102,241,0.15)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <motion.polygon
        points={dataPoints}
        fill="rgba(99,102,241,0.15)"
        stroke="rgba(99,102,241,0.6)"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data points */}
      {skills.map((s, i) => {
        const radius = (s.value / 100) * r;
        const p = getPoint(i, radius);
        return (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#6366f1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
        );
      })}

      {/* Labels */}
      {skills.map((s, i) => {
        const p = getPoint(i, r + 20);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="radar-label"
            fontSize="10"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}

const layers = [
  { key: 'backend', label: 'Backend', color: '#6366f1', icon: '⚙️' },
  { key: 'database', label: 'Database', color: '#22d3ee', icon: '🗄️' },
  { key: 'devops', label: 'DevOps', color: '#f59e0b', icon: '🚀' },
  { key: 'concepts', label: 'Concepts', color: '#8b5cf6', icon: '🧠' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLayer, setActiveLayer] = useState('backend');

  const activeData = layers.find(l => l.key === activeLayer);

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">03 — Skills</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#f0f0f5' }}>
            Technical{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              stack
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Layer tabs + skill bars */}
          <div>
            {/* Layer selector */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {layers.map((layer) => (
                <motion.button
                  key={layer.key}
                  onClick={() => setActiveLayer(layer.key)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: activeLayer === layer.key ? `${layer.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activeLayer === layer.key ? layer.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    color: activeLayer === layer.key ? layer.color : '#8b8b9e',
                  }}
                >
                  <span>{layer.icon}</span>
                  {layer.label}
                </motion.button>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="font-mono text-xs mb-4" style={{ color: '#4a4a5e' }}>
                // {activeLayer}_layer
              </div>
              {skills[activeLayer].map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.08}
                />
              ))}
            </motion.div>

            {/* System layers visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 space-y-2"
            >
              <div className="font-mono text-xs mb-4" style={{ color: '#4a4a5e' }}>
                // system_layers
              </div>
              {[
                { label: 'Application Layer', items: ['Spring Boot', 'REST APIs', 'WebSockets'], color: '#6366f1' },
                { label: 'Caching Layer', items: ['Redis', 'Pub/Sub', 'Distributed Locks'], color: '#ef4444' },
                { label: 'Persistence Layer', items: ['PostgreSQL', 'JPA/Hibernate', 'Migrations'], color: '#22d3ee' },
                { label: 'Infrastructure Layer', items: ['Docker', 'AWS', 'CI/CD'], color: '#f59e0b' },
              ].map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: `${layer.color}06`, border: `1px solid ${layer.color}15` }}
                >
                  <div
                    className="w-1 h-8 rounded-full flex-shrink-0"
                    style={{ background: layer.color }}
                  />
                  <div>
                    <div className="text-xs font-semibold mb-1" style={{ color: layer.color }}>
                      {layer.label}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {layer.items.map(item => (
                        <span key={item} className="text-xs font-mono" style={{ color: '#8b8b9e' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Radar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="font-mono text-xs mb-6 self-start" style={{ color: '#4a4a5e' }}>
              // competency_radar
            </div>
            <div
              className="p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <RadarChart skills={radarSkills} />
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
              {radarSkills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#6366f1' }} />
                  <span className="text-xs font-mono" style={{ color: '#8b8b9e' }}>
                    {s.label}
                  </span>
                  <span className="text-xs font-mono ml-auto" style={{ color: '#6366f1' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
