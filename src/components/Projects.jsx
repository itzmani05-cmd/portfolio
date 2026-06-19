import data from '../data/portfolioData.json';
import { FiChevronRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';

const eyebrow = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block',
};
const sectionTitle = {
  fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em',
  color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2,
};

const scaleMeta = {
  3: { label: '200K+ Seats · 500+ Colleges', color: '#60a5fa', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  1: { label: '100+ Students · 6+ Admins',   color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
  2: { label: '500+ Colleges · Full Analytics', color: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)' },
};

const accentColors = {
  1: { line: '#34d399', glow: 'rgba(16,185,129,0.15)', num: '#34d399' },
  2: { line: '#a78bfa', glow: 'rgba(139,92,246,0.15)', num: '#a78bfa' },
  3: { line: '#60a5fa', glow: 'rgba(59,130,246,0.15)', num: '#60a5fa' },
};

const ProjectRow = ({ project, visible, delay, index }) => {
  const scale  = scaleMeta[project.projectNo];
  const accent = accentColors[project.projectNo] || accentColors[1];

  return (
    <div
      className={`reveal${visible ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        className="card"
        style={{
          padding: '28px 32px',
          position: 'relative',
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(to bottom, ${accent.line}, transparent)`,
          borderRadius: '14px 0 0 14px',
        }} />

        <div style={{
          flexShrink: 0,
          width: 48, height: 48,
          borderRadius: 13,
          background: accent.glow,
          border: `1px solid ${accent.line}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', fontWeight: 900,
          color: accent.num,
          marginTop: 2,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3, margin: 0 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 13, fontWeight: 500, color: accent.line, marginTop: 4, marginBottom: 0 }}>
                {project.tagline}
              </p>
            </div>

            {scale && (
              <span style={{
                flexShrink: 0,
                fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
                color: scale.color, background: scale.bg, border: `1px solid ${scale.border}`,
                whiteSpace: 'nowrap',
              }}>
                {scale.label}
              </span>
            )}
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.65, color: '#94a3b8' }}>
                  <FiChevronRight size={13} color={accent.line} style={{ marginTop: 4, flexShrink: 0 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
            paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techStack && project.techStack.map(tech => {
                const { icon: Icon, color: iconColor } = getTechIcon(tech);
                return (
                  <span key={tech} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.67rem' }}>
                    <Icon color={iconColor} size={11} />{tech}
                  </span>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >
                  <FiGithub size={14} /> Source Code
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: accent.line, textDecoration: 'none', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FiExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { projects } = data;
  const [ref, inView] = useInView();

  const sorted = [...projects].sort((a, b) => a.projectNo - b.projectNo);

  return (
    <section id="projects" className="section-pt section-pb">
      <span style={eyebrow}>Case Studies</span>
      <h2 style={sectionTitle}>Engineering Projects</h2>

      <div style={{ position: 'relative' }}>

        

        <div
          ref={ref}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {sorted.map((project, i) => (
            <ProjectRow
              key={project.projectNo}
              project={project}
              visible={inView}
              delay={i * 0.12}
              index={i}
            />
          ))}
        </div>
      </div>

      <hr className="section-divider" style={{ marginTop: 40 }} />
    </section>
  );
};

export default Projects;

