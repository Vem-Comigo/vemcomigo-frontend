import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import { Achievements } from "./components/Achievements";
import { Locations } from "./components/Locations";
import { Partnerships } from "./components/Partnerships";
import { ActionsProjects } from "./components/ActionsProjects";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutProject/>
      <Achievements/>
      <Locations/>
      <Partnerships/>
      <ActionsProjects/>
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
