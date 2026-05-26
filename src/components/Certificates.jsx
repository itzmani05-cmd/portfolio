import data from '../data/portfolioData.json';
import { FiAward } from 'react-icons/fi';

const eyebrow = { fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#3b82f6', marginBottom: 10, display: 'block' };
const sectionTitle = { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 32, lineHeight: 1.2 };

const Certificates = () => {
  const { certificates } = data;
  if (!certificates?.length) return null;

  return (
    <section id="certificates" className="section-pt section-pb">
      <span style={eyebrow}>Credentials</span>
      <h2 style={sectionTitle}>Certificates</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {certificates.map(cert => (
          <div key={cert.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: 'rgba(245,158,11,0.1)', color: '#fbbf24',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FiAward size={18} />
            </span>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3 }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
                Issued by {cert.issuer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default Certificates;
