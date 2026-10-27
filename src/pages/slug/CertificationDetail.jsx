import MainFrame from "@/src/components/MainFrame"
import Button from "@/src/utils/Button"
import corporateRevamp from "@/src/assets/Project/corporateRevamp.webp"
import { User, Check, UserGroup, CalendarDays, Users } from 'lucide-react'

function CertificationDetail() {
  const metaData = [
    { "id": 1, "key": <User size={16} />, "value": "Fullstack Developer" },
    { "id": 2, "key": <Check size={16} />, "value": "Selesai" },
    { "id": 3, "key": <CalendarDays size={16} />, "value": "6 Bulan" },
    { "id": 4, "key": <Users size={16} />, "value": "4 Orang" },
  ]
  return (
    <MainFrame
      title={
        <p className="font-mono tracking-wide text-sm">
          <span className="text-text-secondary font-medium">CORPORATE WEBSITE REVAMP</span>
        </p>
      }
    >
      <div className="flex flex-col mx-auto max-w-4xl items-center justify-center py-20 gap-6">
        <h2 className="text-6xl text-text-primary scale-y-90 origin-bottom font-bold text-center leading-16">
          Corporate Website Revamp With <span className="text-blue-1"> Custom </span>CMS.
        </h2>
        <p className="text-center max-w-xl text-lg">
          Ini adalah aplikasi yang saya buat sebagai pembaruan landing page perusahaan lengkap dengan custom CMS untuk
          manage berbagai konten yang ditampilkan di landing page.
        </p>
        <div className="flex gap-4 mt-2">
          <Button type={'light'} href={'https://github.com/makmalluddin?tab=repositories'}>REPOSITORI</Button>
          <Button >LIVE DEMO</Button>
        </div>
        <div className="flex border divide-x border-border-muted divide-border-muted">
          {metaData.map((item) => (
            <div className="flex p-2 h-10 items-center justify-center text-text-muted/70 gap-2">
              <span>{item.key}</span>
              <span className="uppercase text-xs tracking-wider font-medium font-mono text-text-muted">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="flex w-full justify-between px-8 py-3 font-mono tracking-wide text-xs text-text-muted font-light">
        <span>ANTARMUKA PROFESIONAL</span>
        <span>SCREENSHOT</span>
      </p>
      <img
        src={corporateRevamp}
        alt="Revamp Website"
      />

    </MainFrame>
  )
}

export default CertificationDetail
