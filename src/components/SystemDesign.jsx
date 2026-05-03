import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { systemDesigns } from '../data/portfolio';

function DesignDiagram({ design, active }) {
  const nodeColors = [
    'rgba(99,102,241,0.2)',
    'rgba(139,92,246,0.2)',
    'rgba(34,211,238,0.2)',
    'rgba(245,158,11,0.2)',
    'rgba(34,197,94,0.2)',
  ];
  const nodeBorders = [
    'rgba(99,102,241,0.5)',
    'rgba(139,92,246,0.5)',
    'rgba(34,211,238,0.5)',
    'rgba(245,158,11,0.5)',
    'rgba(34,197,94,0.5)',
  ];

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Flow diagram */}
          <div
            className="p-6 rounded-xl mb-6"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="font-mono text-xs mb-4" style={{ color: '#4a4a5e' }}>
              // architecture_diagram
            </div>

            {/* Nodes in a flow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {design.nodes.map((node, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-2 rounded-lg text-xs font-mono font-medium"
                    style={{
                      background: nodeColors[i % nodeColors.length],
                      border: `1px solid ${nodeBorders[i % nodeBorders.length]}`,
                      color: '#f0f0f5',
                    }}
                  >
                    {node}
                  </motion.div>
                  {i < design.nodes.length - 1 && (
                    <div className="relative overflow-hidden" style={{ width: 32, height: 12 }}>
                      <svg width="32" height="12" viewBox="0 0 32 12">
                        <line x1="0" y1="6" x2="24" y2="6" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3 2">
                          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
                        </line>
                        <polygon points="24,3 32,6 24,9" fill="rgba(99,102,241,0.4)" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key insight */}
            <div
              className="p-4 rounded-lg"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}
            >
              <div className="font-mono text-xs mb-2" style={{ color: '#6366f1' }}>
                // key_insight
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8b8b9e' }}>
                {design.insight}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SystemDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeDesign, setActiveDesign] = useState(0);

  return (
    <section id="system-design" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label">04 — System Design</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#f0f0f5' }}>
            How I{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              think
            </span>
          </h2>
          <p className="text-base max-w-xl" style={{ color: '#8b8b9e' }}>
            System design isn't just diagrams — it's understanding trade-offs, failure modes, and
            why each architectural decision was made.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Design selector */}
          <div className="space-y-3">
            {systemDesigns.map((design, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveDesign(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="w-full text-left p-4 rounded-xl transition-all"
                style={{
                  background: activeDesign === i ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeDesign === i ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)'}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: activeDesign === i ? '#6366f1' : '#4a4a5e' }}
                  />
                  <span
                    className="font-semibold text-sm"
                    style={{ color: activeDesign === i ? '#f0f0f5' : '#8b8b9e' }}
                  >
                    {design.title}
                  </span>
                </div>
                <p className="text-xs pl-5" style={{ color: '#4a4a5e' }}>
                  {design.description}
                </p>
              </motion.button>
            ))}

            {/* "How I think" callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl mt-6"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}
            >
              <div className="font-mono text-xs mb-2" style={{ color: '#8b5cf6' }}>
                // design_philosophy
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#8b8b9e' }}>
                Design for failure first. Every system I build assumes the network will partition,
                services will crash, and users will do unexpected things.
              </p>
            </motion.div>
          </div>

          {/* Right: Active design */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f0f0f5' }}>
                {systemDesigns[activeDesign].title}
              </h3>
              <p className="text-sm" style={{ color: '#8b8b9e' }}>
                {systemDesigns[activeDesign].description}
              </p>
            </div>
            <DesignDiagram design={systemDesigns[activeDesign]} active={true} key={activeDesign} />

            {/* Trade-offs section */}
            <motion.div
              key={`tradeoffs-${activeDesign}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { label: 'Scalability', value: 'Horizontal', icon: '↗' },
                { label: 'Consistency', value: 'Eventual', icon: '⟳' },
                { label: 'Availability', value: '99.9%', icon: '✓' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg text-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="text-xl mb-1" style={{ color: '#6366f1' }}>{item.icon}</div>
                  <div className="font-mono text-xs mb-1" style={{ color: '#4a4a5e' }}>{item.label}</div>
                  <div className="font-semibold text-sm" style={{ color: '#f0f0f5' }}>{item.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
