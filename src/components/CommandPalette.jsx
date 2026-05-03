import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSearch, IconArrowRight, IconBrandGithub, IconMail, IconCode, IconServer, IconDatabase } from '@tabler/icons-react';

const commands = [
  {
    group: 'Navigation',
    items: [
      { label: 'Go to About', icon: IconServer, action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Go to Projects', icon: IconCode, action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Go to Skills', icon: IconDatabase, action: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Go to System Design', icon: IconServer, action: () => document.querySelector('#system-design')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Go to Contact', icon: IconMail, action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
    ],
  },
  {
    group: 'Projects',
    items: [
      { label: 'CollabCode — Real-time editor', icon: IconCode, action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'SneakCart — Auction system', icon: IconCode, action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'NumTrack — Job scheduler', icon: IconCode, action: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
    ],
  },
  {
    group: 'Links',
    items: [
      { label: 'Open GitHub', icon: IconBrandGithub, action: () => window.open('https://github.com/SwathiKaruppaiya15', '_blank') },
      { label: 'Send Email', icon: IconMail, action: () => window.open('mailto:thesde.swathi1215@gmail.com') },
    ],
  },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(g => g.items.length > 0);

  const allItems = filtered.flatMap(g => g.items);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, allItems.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && allItems[selected]) {
        allItems[selected].action();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, allItems, selected, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="cmd-palette mx-4"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <IconSearch size={16} style={{ color: '#4a4a5e', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent outline-none text-sm font-mono"
                style={{ color: '#f0f0f5' }}
              />
              <kbd
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#4a4a5e', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-sm" style={{ color: '#4a4a5e' }}>
                  No commands found
                </div>
              ) : (
                filtered.map((group) => (
                  <div key={group.group}>
                    <div
                      className="px-4 py-2 font-mono text-xs uppercase tracking-widest"
                      style={{ color: '#4a4a5e' }}
                    >
                      {group.group}
                    </div>
                    {group.items.map((item, i) => {
                      const globalIdx = allItems.indexOf(item);
                      return (
                        <button
                          key={i}
                          onClick={() => { item.action(); onClose(); }}
                          onMouseEnter={() => setSelected(globalIdx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                          style={{
                            background: selected === globalIdx ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: selected === globalIdx ? '#f0f0f5' : '#8b8b9e',
                          }}
                        >
                          <item.icon size={15} style={{ flexShrink: 0 }} />
                          <span className="flex-1 text-left">{item.label}</span>
                          {selected === globalIdx && (
                            <IconArrowRight size={14} style={{ color: '#6366f1' }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center gap-4 px-4 py-2 font-mono text-xs"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: '#4a4a5e' }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
