import data from '../data/portfolioData.json';
import { FiLayout, FiDatabase, FiTerminal, FiLayers, FiCode } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';
import { Player } from '@lottiefiles/react-lottie-player';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };

const categoryMeta = {
  "Programming Languages": {
    icon: FiTerminal,
    color: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
    skills: ["JavaScript", "Python", "Java", "C"],
  },
  "Frontend & Mobile": {
    icon: FiLayout,
    color: { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa' },
    skills: ["React JS", "React Native", "HTML & CSS", "Tailwind CSS", "Ant Design"],
  },
  "Backend & Cloud": {
    icon: FiLayers,
    color: { bg: 'rgba(16,185,129,0.1)', color: '#34d399' },
    skills: ["Node JS", "Express JS", "Nest JS", "AWS EC2", "AWS S3", "NGINX"],
  },
  "Database & ORM": {
    icon: FiDatabase,
    color: { bg: 'rgba(139,92,246,0.1)', color: '#a78bfa' },
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Supabase", "Prisma"],
  },
  "Tools": {
    icon: FiCode,
    color: { bg: 'rgba(236,72,153,0.1)', color: '#f472b6' },
    skills: ["Git & GitHub", "VS Code", "Postman", "Figma", "npm"],
  },
};

/* ── Section ── */
const Skills = () => {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section-pt section-pb">
      <span style={eyebrow}>Expertise</span>

      {/* Heading row with rocket sticker on the right */}
      <div style={{ position: 'relative', marginBottom: 0 }}>
        <h2 style={sectionTitle}>Skills &amp; Tools</h2>

        {/* 🚀 Rocket sticker — top right above grid */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -10,
          width: 130,
          height: 130,
          pointerEvents: 'none',
          zIndex: 5,
        }}>
          <Player
            autoplay
            loop
            src="/skills-rocket.json"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Skills grid — with extra right padding so rocket doesn't overlap last card */}
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
          position: 'relative',
        }}
      >
        {Object.entries(categoryMeta).map(([category, meta], i) => {
          const Icon = meta.icon;
          const c = meta.color;

          return (
            <div
              key={category}
              className={`reveal${inView ? ' in-view' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="card" style={{ padding: '24px', height: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: c.bg, color: c.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{category}</h3>
                </div>

                {/* Skill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {meta.skills.map(name => {
                    const { icon: SkillIcon, color: iconColor } = getTechIcon(name);
                    return (
                      <span
                        key={name}
                        className="skill-badge"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                      >
                        <SkillIcon color={iconColor} size={13} />
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🧑‍💻 Display man sticker — bottom right after grid */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: -20,
        marginRight: -10,
        pointerEvents: 'none',
      }}>
        <Player
          autoplay
          loop
          src="/skills-man.json"
          style={{ width: 160, height: 160 }}
        />
      </div>

      <hr className="section-divider" style={{ marginTop: 8 }} />
    </section>
  );
};

export default Skills;
