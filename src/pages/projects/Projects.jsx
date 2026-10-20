import MainFrame from "@/src/components/MainFrame"
import xquisite from "@/src/assets/myself/certifications/xquisite.webp"

function Projects() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          01 / <span className="text-text-secondary font-medium">PROJEK</span>
        </p>
      }
      content={
        <div className="grid grid-cols-3 divide-x">
          <div className="flex flex-col items-center py-2">
            <div className="w-full flex justify-between items-center text-text-muted text-sm px-4">
              <p className="caption bg-green-1 p-1">01</p>
              <p className="caption text-text-muted">LANDING PAGE</p>
            </div>

            <div className="py-2">
              <img src={xquisite} className="w-full aspect-video object-cover" />
            </div>

            <div className="flex items-start justify-start">
              <h3 className="font-heading text-2xl">Corporate Website</h3>
            </div>
          </div>

          <div className="flex items-center justify-center">
            ini contoh 1
          </div>
          <div>
            ini contoh 1
          </div>
        </div>
      }
    />
  )
}

export default Projects
