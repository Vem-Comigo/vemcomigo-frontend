import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import { Achievements } from "./components/Achievements";
import { Locations } from "./components/Locations";
import { Partnerships } from "./components/Partnerships";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutProject/>
      <Achievements/>
      <Locations/>
      <Partnerships/>
    </div>
  );
}

export default App;
