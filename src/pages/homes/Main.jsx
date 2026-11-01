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
      <Projects />
      <Experience />
      <Skill />
      <Certification />
    </div>
  )
}

export default Main
