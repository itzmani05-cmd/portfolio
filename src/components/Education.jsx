import data from '../data/portfolioData.json';
import { FiBookOpen } from 'react-icons/fi';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };
const yearBadge = { fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 8, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc', whiteSpace: 'nowrap', flexShrink: 0 };

const Education = () => {
  const { education } = data;
  return (
    <section id="education" className="section-pt section-pb">
      <span style={eyebrow}>Background</span>
      <h2 style={sectionTitle}>Education</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {education.map(edu => (
          <div key={edu.id} className="card card-accent">
            <div className="card-row" style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><FiBookOpen size={16} /></span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.35 }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>{edu.institution}</p>
                  {edu.cgpa && (
                    <p style={{ fontSize: 12, marginTop: 5, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#64748b' }}>CGPA</span>
                      <span style={{
                        fontSize: 12, fontWeight: 700, color: '#a5b4fc',
                        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)',
                        padding: '2px 8px', borderRadius: 6,
                      }}>{edu.cgpa}</span>
                    </p>
                  )}
                </div>
              </div>
              <span style={yearBadge}>{edu.year}</span>
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Education;
