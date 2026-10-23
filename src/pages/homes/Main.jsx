import Button from "@/src/components/Button"
import MainFrame from "@/src/components/MainFrame"
import avatar from "../../assets/myself/avatar.webp"
import Projects from "../projects/Projects"
import Experience from "./Experience"

function Main() {
  return (
    <div className="flex flex-col bg-bg-primary">
      <MainFrame
        title={
          <p className="font-mono text-sm font-medium">
            DEVELOPER - TANGERANG, INDONESIA
          </p>
        }
        className="py-2 px-8"
      >
        <div className="grid grid-cols-2 py-10">
          <div className="flex flex-col gap-4">
            <h1 className="flex flex-col font-bold text-5xl tracking-normal">
              <span>Build Systems.</span>
              <span className="text-blue-2">Deliver Solutions.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed font-inter">
              Fullstack Web Developer dengan pengalaman 1 tahun membangun sistem end-to-end.
              Fokus dalam menganalisa problem untuk membangun sistem yang tepat dan dapat menjadi solusi terhadap
              kebutuhan bisnis.
            </p>

            <div className="flex gap-4 text-xs font-mono tracking-widest">
              <Button className="bg-black text-white p-3 px-8">DOWNLOAD CV</Button>
              <Button className="p-3 px-8 border border-border-muted">MY WORKS</Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-72 w-56 border border-border-muted">

            </div>
          </div>
        </div>
      </MainFrame>

      <MainFrame>
        <div className="grid grid-cols-4 divide-x divide-border-muted">
          <div className="flex items-center justify-start py-2 px-8 gap-1 text-text-muted">
            <span className="text-2xl text-red-1">Apa </span> yang saya lakukan?
          </div>

          <div className="flex flex-col items-start justify-center py-8 px-8">
            <p className="font-heading font-bold text-2xl text-text-secondary">1 <span className="text-xl">tahun</span></p>
            <p>Pengalaman Kerja</p>
          </div>

          <div className="flex flex-col items-start justify-center py-8 px-8">
            <p className="font-heading font-bold text-2xl text-text-secondary">5+ <span className="text-xl">projek</span></p>
            <p>Korporat dan Freelance</p>
          </div>

          <div className="flex flex-col items-start justify-center py-8 px-8">
            <p className="font-heading font-bold text-2xl text-text-secondary">4+ <span className="text-xl">bahasa</span></p>
            <p>Bahasa Pemrograman</p>
          </div>
        </div>
      </MainFrame>

      <Projects />
      <Experience />

      <div className="py-20">

      </div>
    </div>
  )
}

export default Main
