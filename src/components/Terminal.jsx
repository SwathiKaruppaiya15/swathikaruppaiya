import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { terminalCommands } from '../data/portfolio';

function TerminalLine({ cmd, output, delay }) {
  const [showOutput, setShowOutput] = useState(false);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(cmd.slice(0, i + 1));
        i++;
        if (i >= cmd.length) {
          clearInterval(interval);
          setTimeout(() => setShowOutput(true), 200);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [cmd, delay]);

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <span className="terminal-prompt">swathi@dev</span>
        <span style={{ color: '#4a4a5e' }}>:</span>
        <span style={{ color: '#22d3ee' }}>~</span>
        <span style={{ color: '#4a4a5e' }}>$</span>
        <span className="terminal-cmd">{typed}</span>
        {typed.length < cmd.length && <span className="terminal-cursor" />}
      </div>
      {showOutput && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="terminal-output pl-4 whitespace-pre-line"
        >
          {output}
        </motion.div>
      )}
    </div>
  );
}

export default function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-label">05 — Terminal</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#f0f0f5' }}>
            Live{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              system
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="terminal-window max-w-3xl"
        >
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#ef4444' }} />
            <div className="terminal-dot" style={{ background: '#f59e0b' }} />
            <div className="terminal-dot" style={{ background: '#22c55e' }} />
            <span className="font-mono text-xs ml-2" style={{ color: '#4a4a5e' }}>
              swathi@dev — bash
            </span>
          </div>
          <div className="terminal-body">
            {started && terminalCommands.map((item, i) => (
              <TerminalLine
                key={i}
                cmd={item.cmd}
                output={item.output}
                delay={i * 1200}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
