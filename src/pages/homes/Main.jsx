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
      <div id="projects">
        <Projects />
      </div>
      <div id="experiences">
        <Experience />
      </div>
      <div id="skills">
        <Skill />
      </div>
      <div id="certifications">
        <Certification />
      </div>
    </div>
  )
}

export default Main
