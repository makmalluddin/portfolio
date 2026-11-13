import MainFrame from "../components/MainFrame"

function NotFound() {
  return (
    <MainFrame>
      <div className="font-mono font-bold text-red-1 text-xl flex items-center justify-center w-full min-h-[calc(100dvh-20rem)]">
        404 - Maaf Page Tidak Tersedia
      </div>
    </MainFrame>
  )
}

export default NotFound
