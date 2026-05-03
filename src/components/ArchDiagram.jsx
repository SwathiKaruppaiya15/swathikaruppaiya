import { motion } from 'framer-motion';

export default function ArchDiagram({ nodes, flows }) {
  // Simple linear flow diagram
  return (
    <div className="p-4 rounded-xl overflow-x-auto" style={{ background: 'rgba(0,0,0,0.3)' }}>
      <div className="font-mono text-xs mb-3" style={{ color: '#4a4a5e' }}>
        // architecture flow
      </div>

      {/* Nodes row */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="arch-node"
              style={{
                background: node.color,
                border: `1px solid ${node.border}`,
                color: '#f0f0f5',
              }}
            >
              {node.label}
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="flex items-center" style={{ color: '#4a4a5e' }}>
                <svg width="24" height="12" viewBox="0 0 24 12">
                  <line x1="0" y1="6" x2="18" y2="6" stroke="rgba(99,102,241,0.4)" strokeWidth="1" strokeDasharray="3 2" />
                  <polygon points="18,3 24,6 18,9" fill="rgba(99,102,241,0.4)" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Flow labels */}
      <div className="space-y-2">
        {flows.map(([from, to, label], i) => {
          const fromNode = nodes.find(n => n.id === from);
          const toNode = nodes.find(n => n.id === to);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 text-xs font-mono"
            >
              <span style={{ color: fromNode?.border || '#6366f1' }}>{fromNode?.label}</span>
              <span style={{ color: '#4a4a5e' }}>──▶</span>
              <span style={{ color: toNode?.border || '#8b5cf6' }}>{toNode?.label}</span>
              <span style={{ color: '#4a4a5e' }}>// {label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
