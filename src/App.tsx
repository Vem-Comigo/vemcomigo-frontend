import { Header } from "./components/header";
import Hero from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import {
  Approach,
  TeacherTraining,
  Communities,
  SchoolInvitation,
  FrequentlyAsked,
} from "./components/InstitutionalSections";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { useSectionReveal } from "./lib/useSectionReveal";

export default function App() {
  useSectionReveal();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <AboutProject />
        <Approach />
        <TeacherTraining />
        <Communities />
        <SchoolInvitation />
        <FrequentlyAsked />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
