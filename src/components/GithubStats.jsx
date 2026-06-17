import data from '../data/portfolioData.json';
import { FiGitCommit, FiAward, FiBook, FiExternalLink } from 'react-icons/fi';
import { FaFire, FaGithub } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

/* ─── Constants ─────────────────────────────────────────── */
const LEVEL_COLORS = [
  'rgba(255,255,255,0.04)',   // 0 – no contribution
  'rgba(16,185,129,0.22)',    // 1 – low
  'rgba(16,185,129,0.45)',    // 2 – medium
  'rgba(16,185,129,0.70)',    // 3 – high
  '#10b981',                  // 4 – very high
];
const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ─── Build week-grid from flat contributions array ─────── */
const buildGrid = (contributions) => {
  if (!contributions?.length) return [];

  /* Sort ascending */
  const sorted = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date));

  /* Anchor to the Sunday on or before the first date */
  const firstDate = new Date(sorted[0].date);
  const startSunday = new Date(firstDate);
  startSunday.setDate(firstDate.getDate() - firstDate.getDay());

  /* Map date-string → {count, level} */
  const byDate = {};
  sorted.forEach(c => { byDate[c.date] = { count: c.count, level: c.level }; });

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const weeks = [];
  let cursor = new Date(startSunday);

  while (cursor <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(cursor);
      if (dayDate > today) {
        week.push(null);
      } else {
        const key = dayDate.toISOString().slice(0, 10);
        const info = byDate[key] || { count: 0, level: 0 };
        week.push({ level: info.level, count: info.count, date: dayDate.toDateString() });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
};

/* ─── Animated counter ───────────────────────────────────── */
const AnimatedCounter = ({ end, suffix = '', color = '#f1f5f9', started }) => {
  const [count, setCount]  = useState(0);
  const rafRef = useRef(null);
  const t0Ref  = useRef(null);
  const DURATION = 1600;
  const ease = t => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    if (!started) return;
    t0Ref.current = null;
    const tick = ts => {
      if (!t0Ref.current) t0Ref.current = ts;
      const p = Math.min((ts - t0Ref.current) / DURATION, 1);
      setCount(Math.floor(ease(p) * end));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(end);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, end]);

  return (
    <span style={{
      fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', fontWeight: 900,
      color, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
    }}>
      {count}{suffix}
    </span>
  );
};

/* ─── Section ────────────────────────────────────────────── */
const GithubStats = () => {
  const { githubStats, contact } = data;
  const [ref, inView] = useInView(0.1);
  const [started,  setStarted]  = useState(false);
  const [repoCount, setRepoCount] = useState(Number(githubStats?.totalRepositories) || 0);
  const [tooltip,  setTooltip]  = useState(null);
  const [heatmap,  setHeatmap]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  /* Trigger counters */
  useEffect(() => { if (inView && !started) setStarted(true); }, [inView, started]);

  /* Fetch real contribution data */
  useEffect(() => {
    const username = contact.github.split('/').filter(Boolean).pop();
    if (!username) { setLoading(false); return; }

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(d => {
        if (d.contributions) setHeatmap(buildGrid(d.contributions));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [contact.github]);

  /* Also fetch live repo count */
  useEffect(() => {
    const username = contact.github.split('/').filter(Boolean).pop();
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(d => { if (d.public_repos !== undefined) setRepoCount(d.public_repos); })
      .catch(() => {});
  }, [contact.github]);

  if (!githubStats) return null;

  /* Month labels from the grid */
  const monthLabels = [];
  let lastMonth = -1;
  heatmap.forEach((week, wi) => {
    const first = week.find(d => d !== null);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) { monthLabels.push({ label: MONTHS[m], wi }); lastMonth = m; }
  });

  const STATS = [
    { label: 'Contributions', value: Number(githubStats.totalContributions), suffix: '+',     sub: githubStats.totalRange,   color: '#60a5fa', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.22)',  icon: FiGitCommit },
    { label: 'Current Streak', value: Number(githubStats.currentStreak),     suffix: ' days', sub: githubStats.currentDate,  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', icon: FaFire      },
    { label: 'Longest Streak', value: Number(githubStats.longestStreak),     suffix: ' days', sub: githubStats.longestRange, color: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)', icon: FiAward     },
    { label: 'Repositories',   value: repoCount,                             suffix: '',      sub: 'Public & private',       color: '#c084fc', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.22)', icon: FiBook      },
  ];

  return (
    <section id="github" className="section-pt section-pb">
      {/* Heading */}
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' }}>
        Open Source
      </span>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 8, lineHeight: 1.2 }}>
        GitHub Activity
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 36, maxWidth: 520 }}>
        A snapshot of my commit history, contribution streaks, and open-source work.
      </p>

      {/* ── Stat Cards ── */}
      <div
        ref={ref}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 32 }}
      >
        {STATS.map(({ label, value, suffix, sub, color, bg, border, icon: Icon }, i) => (
          <div
            key={label}
            className={`card reveal${inView ? ' in-view' : ''}`}
            style={{
              background: bg, border: `1px solid ${border}`,
              padding: '24px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4,
              transitionDelay: `${i * 0.09}s`,
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 11, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, border: `1px solid ${border}` }}>
              <Icon size={20} />
            </div>
            <AnimatedCounter end={value} suffix={suffix} color={color} started={started} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 4 }}>
              {label}
            </span>
            <span style={{ fontSize: 11, color: '#475569' }}>{sub}</span>
          </div>
        ))}
      </div>

      {/* ── Heatmap ── */}
      <div
        className={`card reveal${inView ? ' in-view' : ''}`}
        style={{ padding: '24px 28px', overflowX: 'auto', transitionDelay: '0.38s' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Contribution Activity</h3>
          <div style={{
            fontSize: 11, color: '#64748b', background: 'rgba(255,255,255,0.04)',
            padding: '4px 12px', borderRadius: 6, minWidth: 150, textAlign: 'center',
          }}>
            {tooltip
              ? <span style={{ color: '#94a3b8' }}>{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''} · {tooltip.date}</span>
              : <span>Hover a cell</span>
            }
          </div>
        </div>

        {loading ? (
          /* Loading skeleton — full width */
          <div style={{ display: 'flex', gap: 2, width: '100%' }}>
            {Array.from({ length: 53 }).map((_, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <div key={di} style={{ width: '100%', height: 11, borderRadius: 2, background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${(wi + di) * 0.02}s` }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Full-width wrapper */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              {/* Month labels — percentage-positioned relative to grid */}
              <div style={{ position: 'relative', height: 16, marginBottom: 4, paddingLeft: 28, width: '100%' }}>
                {monthLabels.map(({ label, wi }) => (
                  <span
                    key={`${label}-${wi}`}
                    style={{
                      position: 'absolute',
                      left: `calc(28px + ${(wi / Math.max(heatmap.length, 1)) * 100}% * ((100% - 28px) / 100%))`,
                      fontSize: 10, color: '#475569', fontWeight: 600,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Day labels + grid */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', width: '100%' }}>
                {/* Day labels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                  {DAY_LABELS.map((d, i) => (
                    <span key={d} style={{ fontSize: 9, color: '#334155', height: 11, lineHeight: '11px', width: 24, textAlign: 'right' }}>
                      {i % 2 === 1 ? d : ''}
                    </span>
                  ))}
                </div>

                {/* Weeks grid — each column stretches to fill */}
                <div style={{ display: 'flex', gap: 2, flex: 1, width: '100%' }}>
                  {heatmap.map((week, wi) => (
                    <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                      {week.map((day, di) => (
                        <div
                          key={di}
                          onMouseEnter={() => day && setTooltip(day)}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            width: '100%', height: 11, borderRadius: 2,
                            background: day ? LEVEL_COLORS[day.level] : 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            transition: 'transform 0.1s, filter 0.1s',
                            cursor: day?.count > 0 ? 'pointer' : 'default',
                          }}
                          onMouseOver={e => { if (day?.level > 0) { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.filter = 'brightness(1.5)'; } }}
                          onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 12, justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 10, color: '#334155', marginRight: 2 }}>Less</span>
                {LEVEL_COLORS.map((bg, i) => (
                  <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: bg, border: '1px solid rgba(255,255,255,0.06)' }} />
                ))}
                <span style={{ fontSize: 10, color: '#334155', marginLeft: 2 }}>More</span>
              </div>

            </div>{/* end full-width wrapper */}
          </>
        )}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
            color: '#e2e8f0', fontSize: 14, fontWeight: 600, textDecoration: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
        >
          <FaGithub size={16} /> View GitHub Profile <FiExternalLink size={13} />
        </a>
      </div>

      <hr className="section-divider" style={{ marginTop: 40 }} />
    </section>
  );
};

export default GithubStats;
