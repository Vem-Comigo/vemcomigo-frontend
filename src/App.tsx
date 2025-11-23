import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutProject } from "./components/aboutproject";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutProject/>
    </div>
  );
}

export default App;
