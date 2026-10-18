import Button from "@/src/components/Button"
import MainFrame from "@/src/components/MainFrame"

function Main() {
  return (
    <div className="flex flex-col bg-bg-primary">
      <MainFrame
        title={
          <p className="font-mono font-extralight">
            Developer - Based Tangerang, Indonesia
          </p>
        }
        content={
          <div className="grid grid-cols-2 py-10">
            <div className="flex flex-col gap-4">
              <h1 className="flex flex-col font-bold text-4xl tracking-normal">
                <span>Build Systems & Deliver Solutions.</span>
                <span className="text-blue-2">Fullstack Web Developer.</span>
              </h1>

              <p className="max-w-xl text-lg">
                Saya Muhammad Akmalluddin seorang Fullstack Developer dengan pengalaman 1 tahun membangun sistem end-to-end.
                Fokus saya adalah menganalisa problem untuk membangun sistem yang tepat dan dapat menjadi solusi terhadap
                kebutuhan bisnis.
              </p>

              <div className="flex gap-4 text-xs font-mono tracking-wide">
                <Button className="bg-black text-white p-3 px-8">DOWNLOAD CV</Button>
                <Button className="p-3 px-8 border border-border-muted">MY WORKS</Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <h2>
                Fullstack Web Developer
              </h2>
            </div>
          </div>

        }
      />
      <MainFrame
        title={
          <h2 className="font-mono">
            01 / Projects
          </h2>
        }
        content={
          <h2>
            <div className="w-full border-b border-border-muted"></div>
          </h2>
        } />

    </div>
  )
}

export default Main
