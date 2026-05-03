import { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'framer-motion';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import SystemDesign from './components/SystemDesign';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  useHotkeys('ctrl+k, meta+k', (e) => {
    e.preventDefault();
    setCmdOpen(prev => !prev);
  });

  return (
    <>
      <Cursor />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar onOpenCmd={() => setCmdOpen(true)} />

          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <SystemDesign />
            <Terminal />
            <Contact />
          </main>

          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
        </motion.div>
      )}
    </>
  );
}
