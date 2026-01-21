import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Contact from "@/components/Contact";
import Dock from "@/components/Dock";

export default function Home() {
  return (
    <main className="relative pb-32">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Hackathons />
      <Contact />
      <Dock />
    </main>
  );
}
