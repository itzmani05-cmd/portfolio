import data from '../data/portfolioData.json';
import { FiGitCommit, FiAward, FiBook } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const GithubStats = () => {
  const { githubStats, contact } = data;
  const [repoCount, setRepoCount] = useState(githubStats?.totalRepositories || 0);

  useEffect(() => {
    // Extract username from github link
    const githubUsername = contact.github.split('/').filter(Boolean).pop();
    if (githubUsername) {
      fetch(`https://api.github.com/users/${githubUsername}`)
        .then(res => res.json())
        .then(data => {
          if (data.public_repos !== undefined) {
            setRepoCount(data.public_repos);
          }
        })
        .catch(err => console.error("Failed to fetch github stats", err));
    }
  }, [contact.github]);

  if (!githubStats) return null;

  return (
    <section id="github" className="section-pt section-pb">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Open Source
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f1f5f9', marginBottom: 16 }}>
          GitHub Contributions
        </h2>
        <p style={{ fontSize: 15, color: '#94a3b8', maxWidth: 500, margin: '0 auto' }}>
          A snapshot of my recent activity, streaks, and open-source projects.
        </p>
      </div>

      {/* Grid of 4 cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20
      }}>

        {/* Card 1: Total Contributions */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 20px' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <FiGitCommit size={24} />
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>
            {githubStats.totalContributions}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Total Contributions
          </span>
          <span style={{ fontSize: 11, color: '#64748b' }}>
            {githubStats.totalRange}
          </span>
        </div>

        {/* Card 2: Current Streak */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 20px', borderTop: '2px solid rgba(245, 158, 11, 0.5)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <FaFire size={24} />
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b', marginBottom: 4 }}>
            {githubStats.currentStreak}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Current Streak
          </span>
          <span style={{ fontSize: 11, color: '#64748b' }}>
            {githubStats.currentDate}
          </span>
        </div>

        {/* Card 3: Longest Streak */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 20px' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <FiAward size={24} />
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>
            {githubStats.longestStreak}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Longest Streak
          </span>
          <span style={{ fontSize: 11, color: '#64748b' }}>
            {githubStats.longestRange}
          </span>
        </div>

        {/* Card 4: Total Repositories */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 20px' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <FiBook size={24} />
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>
            {repoCount}
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Total Repositories
          </span>
          <span style={{ fontSize: 11, color: '#64748b' }}>
            Public & Private
          </span>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <a href={contact.github} target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
          borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#e2e8f0', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
          Explore GitHub Profile
        </a>
      </div>

      <hr className="section-divider" style={{ marginTop: 32 }} />
    </section>
  );
};

export default GithubStats;
