import Button from "@/src/utils/Button"
import MainFrame from "@/src/components/MainFrame"
import Projects from "./Projects"
import Experience from "./Experience"
import Skill from "./Skill"
import Certification from "./Certification"
import Hero from "./Hero"

function Main() {
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
