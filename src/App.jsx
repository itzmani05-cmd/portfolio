import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import GithubStats from './components/GithubStats';
import Footer from './components/Footer';

const CONTAINER = {
  maxWidth: '1600px',
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
          <About />
          <Projects />
          <Experience />
          <Education />
          <Certificates />
          <Skills />
          <GithubStats />
        </div>
      </main>

      <Footer container={CONTAINER} />
    </div>
  );
}

export default App;
