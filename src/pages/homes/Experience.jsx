import MainFrame from "@/src/components/MainFrame"

function Experience() {
  return (
    <div>
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            02 / <span className="text-text-secondary font-medium">PENGALAMAN</span>
          </p>
        }
      >
        <div className="py-12 px-8 flex flex-col gap-2">
          <h3 className="text-5xl font-bold scale-y-90">Profesional & Non-Formal</h3>
          <p className="text-md">
            Pengalaman kerja, freelance, kerja sukarela, & bootcamp.
          </p>
        </div>
        <div>
          ini konten 2
        </div>
      </MainFrame>
    </div>
  )
}

export default Experience
