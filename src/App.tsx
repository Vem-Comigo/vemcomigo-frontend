import "@n8n/chat/style.css";

import { Header } from "./components/header";
import Hero from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import { Achievements } from "./components/Achievements";
import { Locations } from "./components/Locations";
import { Partnerships } from "./components/Partnerships";
import { ActionsProjects } from "./components/ActionsProjects";
import { ContactSection } from "./components/ContactSection";
import "./components/ChatCard.css";
import { Footer } from "./components/Footer";
import { N8NChat } from "./components/N8NChat";
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <N8NChat />
      <Header />
      <Hero />
      <AboutProject />
      <Achievements />
      <Locations />
      <Partnerships />
      <ActionsProjects />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
