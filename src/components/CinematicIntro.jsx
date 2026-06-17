import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Cinematic script lines with timing ────────────────────── */
const LINES = [
  { text: 'CODE.',            delay: 800,  dur: 900,  size: 'xl',  color: '#f8fafc' },
  { text: 'SHIP.',            delay: 1900, dur: 900,  size: 'xl',  color: '#f8fafc' },
  { text: 'REPEAT.',          delay: 3000, dur: 1000, size: 'xl',  color: '#f59e0b' },
  { text: 'MANIKANDAN',       delay: 4500, dur: 1400, size: 'name',color: '#ffffff' },
  { text: 'FULL STACK DEVELOPER', delay: 6100, dur: 1200, size: 'sub', color: '#f59e0b' },
  { text: 'BUILDING SYSTEMS THAT SCALE', delay: 7500, dur: 1400, size: 'tag', color: '#94a3b8' },
];

const FADE_OUT_START = 9800;   // ms — start fading the intro
const INTRO_DONE    = 11000;   // ms — intro fully gone

/* ── Particle class ─────────────────────────────────────────── */
class Particle {
  constructor(w, h) { this.reset(w, h); }
  reset(w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.r  = Math.random() * 1.6 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.a  = Math.random();
    this.da = (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1);
    this.color = Math.random() < 0.2 ? '#f59e0b' : '#7dd3fc';
  }
  update(w, h) {
    this.x += this.vx; this.y += this.vy;
    this.a  = Math.max(0, Math.min(1, this.a + this.da));
    if (this.a <= 0 || this.a >= 1) this.da = -this.da;
    if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.a * 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

/* ── Light streak class ─────────────────────────────────────── */
class Streak {
  constructor(w, h) { this.reset(w, h); }
  reset(w, h) {
    this.x = -200;
    this.y = Math.random() * h;
    this.len = Math.random() * 220 + 80;
    this.speed = Math.random() * 5 + 3;
    this.a = Math.random() * 0.25 + 0.05;
    this.w = h;
  }
  update(w, h) {
    this.x += this.speed;
    if (this.x > w + 200) this.reset(w, h);
  }
  draw(ctx) {
    const grad = ctx.createLinearGradient(this.x - this.len, this.y, this.x, this.y);
    grad.addColorStop(0, 'rgba(245,158,11,0)');
    grad.addColorStop(0.6, `rgba(245,158,11,${this.a})`);
    grad.addColorStop(1, 'rgba(245,158,11,0)');
    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    ctx.moveTo(this.x - this.len, this.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

const CinematicIntro = ({ onDone }) => {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const startRef   = useRef(null);
  const [visible, setVisible]   = useState(true);
  const [opacity, setOpacity]   = useState(1);
  const [activeLines, setActive] = useState([]);
  const [skipped, setSkipped]   = useState(false);

  /* ── Canvas animation loop ────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // Build particles & streaks
    const particles = Array.from({ length: 160 }, () => new Particle(W(), H()));
    const streaks   = Array.from({ length: 6  }, () => new Streak(W(), H()));

    let zoom = 1;

    const loop = () => {
      ctx.clearRect(0, 0, W(), H());

      // Dark background
      ctx.fillStyle = '#040810';
      ctx.fillRect(0, 0, W(), H());

      // Ambient radial glow — centre
      const gCentre = ctx.createRadialGradient(W()/2, H()/2, 0, W()/2, H()/2, W() * 0.55);
      gCentre.addColorStop(0, 'rgba(59,130,246,0.09)');
      gCentre.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gCentre;
      ctx.fillRect(0, 0, W(), H());

      // Amber glow — bottom right
      const gAmber = ctx.createRadialGradient(W()*0.8, H()*0.75, 0, W()*0.8, H()*0.75, W()*0.4);
      gAmber.addColorStop(0, 'rgba(245,158,11,0.07)');
      gAmber.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gAmber;
      ctx.fillRect(0, 0, W(), H());

      // Particles
      particles.forEach(p => { p.update(W(), H()); p.draw(ctx); });

      // Streaks
      streaks.forEach(s => { s.update(W(), H()); s.draw(ctx); });

      // Slow camera zoom effect — draw a scaling rect overlay
      zoom = Math.min(zoom + 0.00015, 1.06);
      ctx.save();
      const cx = W() / 2, cy = H() / 2;
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-cx, -cy);
      ctx.restore();

      // Letterbox bars (cinematic top & bottom)
      const barH = Math.min(H() * 0.09, 70);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W(), barH);
      ctx.fillRect(0, H() - barH, W(), barH);

      // Subtle vignette
      const vig = ctx.createRadialGradient(W()/2, H()/2, H()*0.3, W()/2, H()/2, H()*0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W(), H());

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Text reveal timing ───────────────────────────────────── */
  useEffect(() => {
    if (skipped) return;
    const timers = [];
    startRef.current = Date.now();

    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setActive(prev => [...prev, i]);
      }, line.delay));
    });

    timers.push(setTimeout(() => {
      setOpacity(0);
    }, FADE_OUT_START));

    timers.push(setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, INTRO_DONE));

    return () => timers.forEach(clearTimeout);
  }, [skipped, onDone]);

  /* ── Skip handler ─────────────────────────────────────────── */
  const skip = useCallback(() => {
    setSkipped(true);
    setOpacity(0);
    setTimeout(() => { setVisible(false); onDone?.(); }, 600);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      id="cinematic-intro"
      style={{
        position:   'fixed',
        inset:       0,
        zIndex:      9999,
        background:  '#060b14',
        opacity,
        transition: `opacity ${skipped ? 0.6 : 1.2}s ease`,
        cursor:      'pointer',
      }}
      onClick={skip}
    >

      {/* Canvas layer */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Text overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 0, pointerEvents: 'none',
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        {LINES.map((line, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div
              className={`ci-line ci-line--${line.size} ${activeLines.includes(i) ? 'ci-line--visible' : ''}`}
              style={{ color: line.color }}
            >
              {line.text}
            </div>
            {i === 2 && (
              <div
                className={`ci-divider${activeLines.includes(2) ? ' ci-divider--visible' : ''}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom skip hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.28)',
        fontFamily: 'Inter, sans-serif',
        pointerEvents: 'none',
        textTransform: 'uppercase',
        animation: 'fadeIn 2s ease 1.5s both',
      }}>
        tap anywhere to skip
      </div>

      {/* Scan-line overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default CinematicIntro;
