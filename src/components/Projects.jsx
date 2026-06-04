import data from '../data/portfolioData.json';
import { FiGithub, FiChevronRight, FiZap } from 'react-icons/fi';
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

/* ── Featured (full-width) card for the flagship project ── */
const FeaturedCard = ({ project, visible }) => {
  const scale = scaleMeta[project.projectNo];
  return (
    <div
      className={`card card-featured reveal${visible ? ' in-view' : ''}`}
      style={{ padding: '32px 36px', position: 'relative' }}
    >
      {/* Gradient top bar */}
      <div style={{
        position: 'absolute', insetInline: 0, top: 0, height: 3,
        background: 'linear-gradient(90deg, #3b82f6, #6366f1, #a78bfa)',
        borderRadius: '14px 14px 0 0',
      }} />

      {/* Badges row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <span className="badge-flagship">🏆 Flagship Project</span>
        {scale && (
          <span className="badge-scale" style={{
            color: scale.color, background: scale.bg, border: `1px solid ${scale.border}`,
          }}>
            {scale.label}
          </span>
        )}
      </div>

      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6, lineHeight: 1.35 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#60a5fa', marginBottom: 26 }}>
        {project.tagline}
      </p>

      {/* Highlights in 2-col grid on wide screens */}
      {project.highlights && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px 28px',
          marginBottom: 28,
        }}>
          {project.highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, lineHeight: 1.65, color: '#94a3b8' }}>
              <FiChevronRight size={14} color="#6366f1" style={{ marginTop: 4, flexShrink: 0 }} />
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      {project.techStack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {project.techStack.map(tech => {
            const { icon: Icon, color: iconColor } = getTechIcon(tech);
            return (
              <span key={tech} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Icon color={iconColor} size={12} />{tech}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <FiGithub size={14} /> Source Code
          </a>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#475569' }}>
          <FiZap size={13} color="#fbbf24" />
          Government-deployed · Contact for a live walkthrough
        </span>
      </div>
    </div>
  );
};

/* ── Regular card for other projects ── */
const ProjectCard = ({ project, visible, delay }) => {
  const scale = scaleMeta[project.projectNo];
  return (
    <div
      className={`card reveal${visible ? ' in-view' : ''}`}
      style={{
        display: 'flex', flexDirection: 'column', height: '100%', alignSelf: 'stretch',
        padding: '24px', transitionDelay: `${delay}s`,
      }}
    >
      {/* Hover top bar */}
      <div style={{
        position: 'absolute', insetInline: 0, top: 0, height: 2,
        background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
        borderRadius: '14px 14px 0 0', opacity: 0, transition: 'opacity 0.25s',
      }}
        onMouseEnter={e => e.target.style.opacity = 1}
      />

      {/* Scale badge */}
      {scale && (
        <span className="badge-scale" style={{
          color: scale.color, background: scale.bg, border: `1px solid ${scale.border}`,
          marginBottom: 14, alignSelf: 'flex-start',
        }}>
          {scale.label}
        </span>
      )}

      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0', marginBottom: 6, lineHeight: 1.4 }}>
        {project.title}
      </h3>
      <p style={{ fontSize: 13, fontWeight: 500, color: '#60a5fa', marginBottom: 20 }}>
        {project.tagline}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul style={{ flex: '1 1 auto', listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {project.highlights.map((h, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.65, color: '#94a3b8' }}>
              <FiChevronRight size={13} color="#6366f1" style={{ marginTop: 4, flexShrink: 0 }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {project.techStack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {project.techStack.map(tech => {
            const { icon: Icon, color: iconColor } = getTechIcon(tech);
            return (
              <span key={tech} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.66rem' }}>
                <Icon color={iconColor} size={11} />{tech}
              </span>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <FiGithub size={14} /> Source Code
          </a>
        )}
      </div>
    </div>
  );
};

/* ── Section ── */
const Projects = () => {
  const { projects } = data;
  const [ref, inView] = useInView();

  const featured = projects.find(p => p.projectNo === 3);
  const others   = projects.filter(p => p.projectNo !== 3)
                            .sort((a, b) => a.projectNo - b.projectNo);

  return (
    <section id="projects" className="section-pt section-pb">
      <span style={eyebrow}>Case Studies</span>
      <h2 style={sectionTitle}>Engineering Projects</h2>

      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Regular cards first (C³ and Engineering College Insights) */}
        <div className="grid-projects">
          {others.map((project, i) => (
            <ProjectCard
              key={project.projectNo}
              project={project}
              visible={inView}
              delay={i * 0.13}
            />
          ))}
        </div>

        {/* Flagship TNEA card featured at the bottom */}
        {featured && (
          <FeaturedCard project={featured} visible={inView} />
        )}
      </div>

      <hr className="section-divider" style={{ marginTop: 40 }} />
    </section>
  );
};

export default Projects;
