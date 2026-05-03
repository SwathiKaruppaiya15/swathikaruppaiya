import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconTerminal2, IconCommand } from '@tabler/icons-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'System Design', href: '#system-design' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              SK
            </div>
            <span className="font-mono text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
              swathi.dev
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors animated-underline"
                style={{ color: active === link.href ? '#6366f1' : '#8b8b9e' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f0f0f5'}
                onMouseLeave={(e) => e.currentTarget.style.color = active === link.href ? '#6366f1' : '#8b8b9e'}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Command palette trigger */}
            <motion.button
              onClick={onOpenCmd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8b8b9e',
              }}
            >
              <IconCommand size={12} />
              <span>Ctrl K</span>
            </motion.button>

            {/* Available badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}>
              <div className="pulse-dot" style={{ width: 6, height: 6 }} />
              Available
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: '#8b8b9e' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="w-5 flex flex-col gap-1">
                <span className="block h-px bg-current transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : '' }} />
                <span className="block h-px bg-current transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
                <span className="block h-px bg-current transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : '' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(5,5,8,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: '#8b8b9e' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
