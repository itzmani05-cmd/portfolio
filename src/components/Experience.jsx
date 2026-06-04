import data from '../data/portfolioData.json';
import { FiBriefcase, FiMapPin, FiChevronRight, FiCalendar } from 'react-icons/fi';
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

/* Bold the numbers/percentages inside highlight text */
const HighlightText = ({ text }) => {
  const parts = text.split(/(\d[\d,+]*[\+\%]?(?:\s*\+)?(?:\s*colleges?|\s*seats?|\s*institutions?)?)/gi);
  return (
    <>
      {parts.map((part, i) =>
        /\d/.test(part)
          ? <strong key={i} style={{ color: '#e2e8f0', fontWeight: 700 }}>{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
};

const Experience = () => {
  const { experience } = data;
  const [ref, inView] = useInView();

  return (
    <section id="experience" className="section-pt section-pb">
      <span style={eyebrow}>Career</span>
      <h2 style={sectionTitle}>Work Experience</h2>

      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {experience.map((exp, i) => (
          <div
            key={exp.id}
            className={`reveal${inView ? ' in-view' : ''}`}
            style={{ transitionDelay: `${i * 0.13}s` }}
          >
            <div
              className="card"
              style={{ padding: '28px 28px 28px 32px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Flagship gold left bar (replaces standard blue) */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: 'linear-gradient(to bottom, #fbbf24, #f59e0b)',
                borderRadius: '3px 0 0 3px',
              }} />

              {/* Top gradient shine */}
              <div style={{
                position: 'absolute', insetInline: 0, top: 0, height: 2,
                background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 30%, transparent 70%)',
                opacity: 0.6,
                borderRadius: '14px 14px 0 0',
              }} />

              {/* Header row */}
              <div className="card-row" style={{ marginBottom: 20 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    {/* Icon */}
                    <span style={{
                      width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                      background: 'rgba(251,191,36,0.1)', color: '#fbbf24',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FiBriefcase size={16} />
                    </span>

                    {/* Role */}
                    <h3 style={{ fontSize: 19, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3 }}>
                      {exp.role}
                    </h3>

                    {/* Flagship badge */}
                    <span className="badge-flagship">🏆 Flagship</span>
                  </div>

                  {/* Company + location */}
                  <div style={{ paddingLeft: 44 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#fbbf24', marginBottom: 5 }}>
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <FiMapPin size={12} /> {exp.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Duration badge */}
                <div style={{ paddingLeft: 44, flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 600, padding: '6px 14px',
                    borderRadius: 8, background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.22)', color: '#fbbf24',
                    whiteSpace: 'nowrap',
                  }}>
                    <FiCalendar size={12} /> {exp.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ paddingLeft: 44 }}>
                {exp.summary && (
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#e2e8f0', fontWeight: 500, marginBottom: 18 }}>
                    {exp.summary}
                  </p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, lineHeight: 1.7, color: '#94a3b8' }}>
                        <FiChevronRight size={14} color="#fbbf24" style={{ marginTop: 4, flexShrink: 0 }} />
                        <HighlightText text={h} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech stack */}
                {exp.techStack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {exp.techStack.map(tech => {
                      const { icon: Icon, color: iconColor } = getTechIcon(tech);
                      return (
                        <span key={tech} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Icon color={iconColor} size={12} />{tech}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Experience;
