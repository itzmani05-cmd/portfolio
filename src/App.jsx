import Navbar      from './components/Navbar';
import About       from './components/About';
import ImpactBar   from './components/ImpactBar';
import Experience  from './components/Experience';
import Projects    from './components/Projects';
import Skills      from './components/Skills';
import GithubStats from './components/GithubStats';
import Education   from './components/Education';
import Certificates from './components/Certificates';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const CONTAINER = {
  maxWidth: '1100px',
  marginLeft:  'auto',
  marginRight: 'auto',
  paddingLeft:  '2rem',
  paddingRight: '2rem',
  width: '100%',
  boxSizing: 'border-box',
};

export { CONTAINER };

function App() {
  return (
    <div style={{ background: '#060b14', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />

      <Navbar container={CONTAINER} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <div style={CONTAINER}>
          {/* 1. Hero */}
          <About />

          {/* 2. Impact numbers — the "proof" bar right after the hero */}
          <ImpactBar />

          {/* 3. Experience first — strongest differentiator */}
          <Experience />

          {/* 4. Projects */}
          <Projects />

          {/* 5. Skills with animated bars */}
          <Skills />

          {/* 6. GitHub activity + heatmap */}
          <GithubStats />

          {/* 7. Education */}
          <Education />

          {/* 8. Certificates */}
          <Certificates />

          {/* 9. Contact — always end with a clear call to action */}
          <Contact />
        </div>
      </main>

      <Footer container={CONTAINER} />

      {/* Floating scroll-to-top */}
      <ScrollToTop />
    </div>
  );
}

export default App;
