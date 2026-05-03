import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconArrowUpRight } from '@tabler/icons-react';
import { personalInfo } from '../data/portfolio';

const contacts = [
  {
    icon: IconMail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#6366f1',
    desc: 'Best for opportunities',
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    value: 'github.com/SwathiKaruppaiya15',
    href: personalInfo.github,
    color: '#f0f0f5',
    desc: 'See my code',
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/swathi-karuppaiya',
    href: personalInfo.linkedin,
    color: '#0ea5e9',
    desc: 'Professional network',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center">06 — Contact</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#f0f0f5' }}>
            Let's build something{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              real
            </span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#8b8b9e' }}>
            Open to backend engineering roles, distributed systems challenges, and
            interesting technical conversations.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
          {contacts.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group p-6 rounded-xl flex flex-col gap-4 transition-all"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${contact.color}40`;
                e.currentTarget.style.background = `${contact.color}06`;
                e.currentTarget.style.boxShadow = `0 10px 40px ${contact.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${contact.color}15`, border: `1px solid ${contact.color}25` }}
                >
                  <contact.icon size={18} style={{ color: contact.color }} />
                </div>
                <IconArrowUpRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: contact.color }}
                />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1" style={{ color: '#f0f0f5' }}>
                  {contact.label}
                </div>
                <div className="font-mono text-xs mb-1" style={{ color: contact.color }}>
                  {contact.value}
                </div>
                <div className="text-xs" style={{ color: '#4a4a5e' }}>
                  {contact.desc}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '2rem' }}
        >
          <div className="font-mono text-xs mb-2" style={{ color: '#4a4a5e' }}>
            // built with React + Framer Motion + Tailwind
          </div>
          <div className="text-xs" style={{ color: '#4a4a5e' }}>
            © 2025 Swathi Karuppaiya · Designed & engineered from scratch
          </div>
        </motion.div>
      </div>
    </section>
  );
}
