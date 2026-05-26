import data from '../data/portfolioData.json';
import { FiBriefcase, FiMapPin, FiChevronRight } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };
const durationBadge = { fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 8, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc', whiteSpace: 'nowrap', flexShrink: 0 };

const Experience = () => {
  const { experience } = data;
  return (
    <section id="experience" className="section-pt section-pb">
      <span style={eyebrow}>Career</span>
      <h2 style={sectionTitle}>Work Experience</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {experience.map(exp => (
          <div key={exp.id} className="card card-accent" style={{ padding: '24px', paddingLeft: '32px' }}>
            <div className="card-row" style={{ marginBottom: 20 }}>
              {/* Header */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(59,130,246,0.1)', color: '#60a5fa',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><FiBriefcase size={16} /></span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#e2e8f0', lineHeight: 1.3 }}>
                    {exp.role}
                  </h3>
                </div>

                <div style={{ paddingLeft: 44 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#60a5fa', marginBottom: 6 }}>
                    {exp.company}
                  </p>
                  
                  {exp.location && (
                    <p style={{ fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiMapPin size={12} /> {exp.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div style={{ paddingLeft: 44 }}>
                 <span style={durationBadge}>{exp.duration}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ paddingLeft: 44 }}>
              {exp.summary && (
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#e2e8f0', fontWeight: 500, marginBottom: 16 }}>
                      {exp.summary}
                  </p>
              )}
              
              {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {exp.highlights.map((highlight, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, lineHeight: 1.6, color: '#94a3b8' }}>
                              <FiChevronRight size={14} color="#6366f1" style={{ marginTop: 4, flexShrink: 0 }} />
                              <span>{highlight}</span>
                          </li>
                      ))}
                  </ul>
              )}

              {/* Tech stack pills */}
              {exp.techStack && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {exp.techStack.map(tech => {
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
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Experience;
