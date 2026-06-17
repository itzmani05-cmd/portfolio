import { useState } from 'react';
import Navbar         from './components/Navbar';
import About          from './components/About';
import ImpactBar      from './components/ImpactBar';
import Experience     from './components/Experience';
import Projects       from './components/Projects';
import Skills         from './components/Skills';
import GithubStats    from './components/GithubStats';
import Education      from './components/Education';
import Certificates   from './components/Certificates';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import ScrollToTop    from './components/ScrollToTop';
import CinematicIntro from './components/CinematicIntro';

const CONTAINER = {
  maxWidth: '1440px',
  marginLeft:  'auto',
  marginRight: 'auto',
  paddingLeft:  '1.5rem',
  paddingRight: '1.5rem',
  width: '100%',
  boxSizing: 'border-box',
};

export { CONTAINER };

function App() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <div style={{ background: '#060b14', minHeight: '100vh', position: 'relative' }}>
      {/* Cinematic intro — plays once, then reveals portfolio */}
      <CinematicIntro onDone={() => setIntroVisible(false)} />
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />

      <Navbar container={CONTAINER} />

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* 1. Hero — full viewport width, manages its own container */}
        <About container={CONTAINER} />

        <div style={CONTAINER}>
          {/* 2. Impact numbers */}
          <ImpactBar />

          {/* 3. Experience */}
          <Experience />

          {/* 4. Projects */}
          <Projects />

          {/* 5. Skills */}
          <Skills />

          {/* 6. GitHub activity */}
          <GithubStats />

          {/* 7. Education */}
          <Education />

          {/* 8. Certificates */}
          <Certificates />

          {/* 9. Contact */}
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
