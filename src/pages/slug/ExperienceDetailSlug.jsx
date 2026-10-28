import MainFrame from "@/src/components/MainFrame"
import sg8_logo from "@/src/assets/sg8_logo.webp"
import { Calendar, Clock, BriefcaseBusiness, MapPin } from "lucide-react"
import WorkTimelineTable from "./WorkLineTable"

function ExperienceDetailSlug() {
  const metaData = [
    { id: 1, icon: <Calendar size={14} />, value: "2026" },
    { id: 2, icon: <Clock size={14} />, value: "6 Bulan" },
    { id: 3, icon: <BriefcaseBusiness size={14} />, value: "Internship" },
    { id: 4, icon: <MapPin size={14} />, value: "Jakarta" },
  ]

  const detailPengalaman = [
    { id: 1, icon: <Calendar size={14} />, title: "Latar Belakang", description: "Ini contoh deskripsi dan tanggung jawab" },
    { id: 2, icon: <Clock size={14} />, title: "Tujuan", description: "Ini contoh deskripsi dan tanggung jawab" },
    { id: 3, icon: <BriefcaseBusiness size={14} />, title: "Tanggung Jawab", description: "Ini contoh deskripsi dan tanggung jawab" },
    { id: 4, icon: <MapPin size={14} />, title: "Kontribusi", description: "Ini contoh deskripsi dan tanggung jawab" },
    { id: 5, icon: <MapPin size={14} />, title: "Tantangan & Solusi", description: "Ini contoh deskripsi dan tanggung jawab" },
    { id: 6, icon: <MapPin size={14} />, title: "Hasil & Dampak", description: "Ini contoh deskripsi dan tanggung jawab" },
  ]

  const teknologi = [
    { id: 1, type: "Alat Pengembangan", tools: "Visual Studio Code, Git, GitHub, Postman, Figma, Canva, Notion" },
    { id: 2, type: "Frontend", tools: "Javascript, Next.js, React.js, Tailwind CSS" },
    { id: 3, type: "Backend", tools: "PHP, Laravel, REST API" }
  ]
  return (
    <div>
      <MainFrame
        title={
          <p className="font-mono font-medium text-sm">
            <span className="uppercase text-sm">Web developer sg8-group</span>
          </p>
        }
      >
        <div className="flex flex-col px-8 py-16 items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={sg8_logo}
              alt="SG8 Group"
              className="border border-border-muted size-20 object-contain rounded-sm"
            />

            <p className="font-mono text-sm tracking-tight">
              PT DWITUNGGAL JAYA PRATAMA MAJU (SG8 GROUP)
            </p>
          </div>
          <h2 className="font-bold text-6xl scale-y-90 ">
            Web <span className="text-green-blue-1">Developer</span>.
          </h2>
          <p className="max-w-xl text-center">
            Ini adalah contoh caption yang akan menjelaskan tanggung jawab dan peran secara general saya selama menjadi web developer di sg8
            group
          </p>
          <div className="flex divide-x border border-border-muted divide-border-muted">
            {metaData.map((item) => (
              <span key={item.id} className="flex gap-1 items-center justify-center px-4 py-2 text-text-secondary">
                <span className="text-text-muted/70">{item.icon}</span>
                <span>{item.value}</span>
              </span>
            ))}
          </div>
        </div>
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            01 / ALUR PEKERJAAN
          </p>
        }
      >
        <WorkTimelineTable />
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            02 / KONTEKS
          </p>
        }
      >
        <h3 className="px-8 py-16 font-bold text-5xl scale-y-90">
          Detail <span className="text-green-blue-1">Pengalaman</span>.
        </h3>

        <div className="grid grid-cols-3 divide-x divide-y divide-border-muted -mr-px -mb-px">
          {detailPengalaman.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 px-8 py-8">
              <div className="flex w-full justify-between items-end">
                <span className="border border-border-muted p-2 text-green-blue-1/80">{item.icon}</span>
                <span className="font-mono text-text-muted text-xs">0{item.id}</span>
              </div>
              <h4 className="font-bold text-xl">{item.title}</h4>
              <p className="text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            03 / TEKNOLOGI
          </p>
        }
      >
        {teknologi.map((item) => (
          <div className="flex px-8 py-6 items-center justify-start">
            <span className="font-mono text-sm text-text-muted w-20">
              0{item.id}
            </span>

            <div className="flex gap-16">
              <span className="text-text-secondary text-xl min-w-48">
                {item.type}
              </span>
              <span className="font-inter text-text-secondary text-lg tracking-wider">
                {item.tools}
              </span>
            </div>

          </div>
        ))}
      </MainFrame>

      <MainFrame
        title={
          <p className="font-mono text-text-muted text-sm">
            04 / PROJEK
          </p>
        }
      >
        <div className="px-8 py-16">
          ini contoh
        </div>
      </MainFrame>
    </div>
  )
}

export default ExperienceDetailSlug
