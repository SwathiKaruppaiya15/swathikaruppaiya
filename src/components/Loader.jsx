import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const bootLines = [
  '> Initializing runtime environment...',
  '> Loading distributed systems core...',
  '> Connecting to Redis cluster...',
  '> Spawning WebSocket handlers...',
  '> System ready.',
];

export default function Loader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#050508' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-2">
              swathi.dev
            </div>
            <div
              className="text-4xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {'<SK />'}
            </div>
          </motion.div>

          {/* Terminal */}
          <div className="terminal-window w-full max-w-md mx-4">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#ef4444' }} />
              <div className="terminal-dot" style={{ background: '#f59e0b' }} />
              <div className="terminal-dot" style={{ background: '#22c55e' }} />
              <span className="font-mono text-xs text-gray-500 ml-2">system-boot</span>
            </div>
            <div className="terminal-body min-h-[140px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`terminal-${i === lines.length - 1 && i === bootLines.length - 1 ? 'success' : 'output'}`}
                >
                  {line}
                </motion.div>
              ))}
              {lines.length < bootLines.length && (
                <span className="terminal-cursor" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md mx-4 mt-6">
            <div className="flex justify-between font-mono text-xs text-gray-600 mb-2">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
