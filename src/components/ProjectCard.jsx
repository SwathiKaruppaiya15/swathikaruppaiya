import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconExternalLink, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import ArchDiagram from './ArchDiagram';

const stackColors = {
  Java: '#f59e0b',
  'Spring Boot': '#22c55e',
  WebSocket: '#6366f1',
  STOMP: '#8b5cf6',
  Redis: '#ef4444',
  Docker: '#22d3ee',
  PostgreSQL: '#3b82f6',
  React: '#61dafb',
  Redisson: '#ef4444',
  Quartz: '#f59e0b',
  'Spring Batch': '#22c55e',
  MongoDB: '#22c55e',
  AWS: '#f59e0b',
};

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="project-card rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div
        className="p-6 md:p-8"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: `linear-gradient(135deg, ${project.color}08, transparent)`,
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
              />
              <span className="font-mono text-xs" style={{ color: project.color }}>
                {project.status}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2" style={{ color: '#f0f0f5' }}>
              {project.name}
            </h3>
            <p className="text-sm" style={{ color: '#8b8b9e' }}>
              {project.tagline}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#8b8b9e' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f0f5'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8b8b9e'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <IconBrandGithub size={16} />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#8b8b9e' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f0f5'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8b8b9e'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <IconExternalLink size={16} />
            </motion.a>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-mono font-medium"
              style={{
                background: `${stackColors[tech] || '#6366f1'}15`,
                border: `1px solid ${stackColors[tech] || '#6366f1'}30`,
                color: stackColors[tech] || '#6366f1',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        {/* Problem statement */}
        <div className="mb-6">
          <div className="font-mono text-xs mb-2" style={{ color: '#6366f1' }}>
            // problem_statement
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#8b8b9e' }}>
            {project.problem}
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="mb-6">
          <div className="font-mono text-xs mb-3" style={{ color: '#6366f1' }}>
            // system_architecture
          </div>
          <ArchDiagram nodes={project.architecture} flows={project.flows} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {project.metrics.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-3 rounded-lg text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="text-xl font-black font-mono mb-1"
                style={{ color: project.color }}
              >
                {m.value}
              </div>
              <div className="text-xs" style={{ color: '#4a4a5e' }}>
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable: Challenges + Solutions */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium transition-colors w-full"
          style={{ color: '#6366f1' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#818cf8'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
        >
          {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          {expanded ? 'Hide' : 'Show'} Engineering Deep Dive
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenges */}
                <div>
                  <div className="font-mono text-xs mb-3" style={{ color: '#ef4444' }}>
                    // engineering_challenges
                  </div>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: '#8b8b9e' }}
                      >
                        <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                        {c}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <div className="font-mono text-xs mb-3" style={{ color: '#22d3ee' }}>
                    // solutions_implemented
                  </div>
                  <div className="space-y-3">
                    {project.solutions.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: '#8b8b9e' }}
                      >
                        <span style={{ color: '#22d3ee', flexShrink: 0 }}>✓</span>
                        {s}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
