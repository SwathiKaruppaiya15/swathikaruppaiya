import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="section-label">02 — Projects</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#f0f0f5' }}>
            Production-level{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              systems built
            </span>
          </h2>
          <p className="text-base max-w-xl" style={{ color: '#8b8b9e' }}>
            Each project is a case study in solving real engineering problems — not just CRUD apps.
            Click "Engineering Deep Dive" to see the technical decisions behind each system.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Production metrics banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-6 md:p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))',
            border: '1px solid rgba(99,102,241,0.15)',
          }}
        >
          <div className="font-mono text-xs mb-6" style={{ color: '#6366f1' }}>
            // production_metrics_summary
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Concurrent users supported', sub: 'across all systems' },
              { value: '<80ms', label: 'Average API latency', sub: 'p95 under load' },
              { value: '94%', label: 'Cache hit rate', sub: 'Redis optimization' },
              { value: '99.7%', label: 'Job success rate', sub: 'NumTrack scheduler' },
            ].map((m, i) => (
              <div key={i}>
                <div
                  className="text-2xl md:text-3xl font-black font-mono mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {m.value}
                </div>
                <div className="text-sm font-medium mb-0.5" style={{ color: '#f0f0f5' }}>
                  {m.label}
                </div>
                <div className="text-xs font-mono" style={{ color: '#4a4a5e' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
