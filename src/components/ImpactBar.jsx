import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const metrics = [
  { end: 500,  suffix: '+',  label: 'Engineering Colleges\nServed',     color: '#34d399', glow: 'rgba(16,185,129,0.15)'  },
  { end: 100,  suffix: '+',  label: 'Active Students\non EdTech App',   color: '#a78bfa', glow: 'rgba(139,92,246,0.15)' },
  { end: 2,    suffix: '',   label: 'Full-Stack Products\nShipped Solo', color: '#fbbf24', glow: 'rgba(251,191,36,0.15)' },
];

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const Counter = ({ end, suffix, color, started }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const duration = 2000;

  useEffect(() => {
    if (!started) return;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, end]);

  return (
    <span style={{
      display: 'block',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 900,
      color,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.02em',
    }}>
      {count}{suffix}
    </span>
  );
};

const ImpactBar = () => {
  const [ref, inView] = useInView(0.1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  return (
    <section aria-label="Impact metrics" style={{ padding: '0 0 8px' }}>
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          background: 'rgba(255,255,255,0.018)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top glow accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, #3b82f6, #6366f1, #a78bfa, #34d399)',
          opacity: 0.7,
        }} />

        {/* Radial glow bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% -10%, rgba(59,130,246,0.07) 0%, transparent 65%)',
        }} />

        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '36px 20px',
              gap: 10,
              borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              position: 'relative',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = m.glow}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Counter end={m.end} suffix={m.suffix} color={m.color} started={started} />
            <span style={{
              fontSize: 12, color: '#64748b', lineHeight: 1.5,
              whiteSpace: 'pre-line', maxWidth: 120, fontWeight: 500,
            }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <hr className="section-divider" style={{ marginTop: 40 }} />
    </section>
  );
};

export default ImpactBar;
