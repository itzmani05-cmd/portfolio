import data from '../data/portfolioData.json';
import { FiGithub, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };

const ProjectCard = ({ project }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
    <div style={{
      position: 'absolute', insetInline: 0, top: 0, height: 2,
      background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
      borderRadius: '14px 14px 0 0', opacity: 0,
      transition: 'opacity 0.25s',
    }} onMouseEnter={e => e.target.style.opacity = 1} />

    <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: '#3b82f6', marginBottom: 12, display: 'block' }}>
      PROJ-{String(project.projectNo).padStart(2, '0')}
    </span>

    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', marginBottom: 6, lineHeight: 1.4 }}>
      {project.title}
    </h3>
    
    <p style={{ fontSize: 13, fontWeight: 500, color: '#60a5fa', marginBottom: 20 }}>
        {project.tagline}
    </p>

    {project.highlights && project.highlights.length > 0 && (
      <ul style={{ flexGrow: 1, listStyle: 'none', padding: 0, margin: 0, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {project.highlights.map((highlight, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, lineHeight: 1.6, color: '#94a3b8' }}>
                  <FiChevronRight size={14} color="#6366f1" style={{ marginTop: 4, flexShrink: 0 }} />
                  <span>{highlight}</span>
              </li>
          ))}
      </ul>
    )}

    {project.techStack && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {project.techStack.map(tech => {
          const { icon: Icon, color: iconColor } = getTechIcon(tech);
          return (
            <span key={tech} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon color={iconColor} size={12} />
              {tech}
            </span>
          );
        })}
      </div>
    )}

    <div style={{ display: 'flex', gap: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        ><FiGithub size={14} /> Source Code</a>
      )}
      {project.liveDemoLink && (
        <a href={project.liveDemoLink} target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
          onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
        ><FiExternalLink size={14} /> Live Deployment</a>
      )}
    </div>
  </div>
);

const Projects = () => {
  const { projects } = data;
  return (
    <section id="projects" className="section-pt section-pb">
      <span style={eyebrow}>Case Studies</span>
      <h2 style={sectionTitle}>Engineering Projects</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map(project => (
          <ProjectCard key={project.projectNo} project={project} />
        ))}
      </div>
      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Projects;
