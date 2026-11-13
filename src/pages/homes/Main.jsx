import { useEffect } from "react"
import { useLocation } from 'react-router-dom'
import Projects from "./Projects"
import Experience from "./Experience"
import Skill from "./Skill"
import Certification from "./Certification"
import Hero from "./Hero"

function Main() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col">
      <Hero />
      <div id="projects" className="scroll-mt-12">
        <Projects />
      </div>
      <div id="experiences" className="scroll-mt-12">
        <Experience />
      </div>
      <div id="skills" className="scroll-mt-12">
        <Skill />
      </div>
      <div id="certifications" className="scroll-mt-12">
        <Certification />
      </div>
    </div>
  )
}

export default Main
