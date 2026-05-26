import data from '../data/portfolioData.json';
import { FiLayout, FiDatabase, FiTerminal, FiLayers, FiCode } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };

const categoryIcons = {
  "Programming Languages": FiTerminal,
  "Frontend & Mobile": FiLayout,
  "Backend & Cloud": FiLayers,
  "Database & ORM": FiDatabase,
  "Tools": FiCode
};

const categoryColors = {
  "Programming Languages": { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  "Frontend & Mobile": { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa' },
  "Backend & Cloud": { bg: 'rgba(16,185,129,0.1)', color: '#34d399' },
  "Database & ORM": { bg: 'rgba(139,92,246,0.1)', color: '#a78bfa' },
  "Tools": { bg: 'rgba(236,72,153,0.1)', color: '#f472b6' }
};

const getColor = (cat) => categoryColors[cat] || categoryColors["Tools"];
const getIcon = (cat) => categoryIcons[cat] || FiCode;

const Skills = () => {
  const { skills } = data;
  return (
    <section id="skills" className="section-pt section-pb">
      <span style={eyebrow}>Expertise</span>
      <h2 style={sectionTitle}>Skills &amp; Tools</h2>

      <div className="grid-skills" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {Object.entries(skills).map(([category, items]) => {
          const color = getColor(category);
          const Icon = getIcon(category);

          return (
            <div key={category} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: color.bg, color: color.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={18} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{category}</h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {items.map(skill => {
                  const { icon: TechIcon, color: iconColor } = getTechIcon(skill);
                  return (
                    <span key={skill} className="skill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <TechIcon color={iconColor} size={14} />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Skills;
