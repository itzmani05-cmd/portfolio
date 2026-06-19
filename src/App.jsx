import {
  About,
  Certificates,
  Contact,
  Education,
  Experience,
  Footer,
  GithubStats,
  ImpactBar,
  Navbar,
  Projects,
  ScrollToTop,
  Skills,
} from './components';
import { appShell, mainContent, pageContainer } from './config/layout';

const portfolioSections = [
  ImpactBar,
  Experience,
  Projects,
  Skills,
  GithubStats,
  Education,
  Certificates,
  Contact,
];

function App() {
  return (
    <div style={appShell}>
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />

      <Navbar container={pageContainer} />

      <main style={mainContent}>
        <About />
        <div style={pageContainer}>
          {portfolioSections.map((Section) => (
            <Section key={Section.name} />
          ))}
        </div>
      </main>

      <Footer container={pageContainer} />
      <ScrollToTop />
    </div>
  );
}

export default App;
