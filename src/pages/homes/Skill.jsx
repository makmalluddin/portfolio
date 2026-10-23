import MainFrame from "@/src/components/MainFrame"
import { LucideMonitor, MonitorSmartphone } from "lucide-react"
import { RiNextjsLine, RiReactjsLine } from "react-icons/ri";

function Skill() {
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          03 / <span className="text-text-secondary font-medium">KEAHLIAN</span>
        </p>
      }
    >
      <div className="grid grid-cols-3 px-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 py-8">
            <div className="border border-border-muted p-2"><MonitorSmartphone className="size-6 text-text-secondary" /></div>
            <p className="text-text-primary font-medium text-2xl scale-y-90">Frontend</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <RiNextjsLine className="size-8 text-text-secondary" />
              <p>Next.js</p>
            </div>
            <div>
              <RiReactjsLine className="size-8 text-text-secondary" />
              <p>React.js</p>
            </div>
          </div>
        </div>

        <div>
          asdasd
        </div>

        <div>
          asdasd
        </div>
      </div>
    </MainFrame>
  )
}

export default Skill
