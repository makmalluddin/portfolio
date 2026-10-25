import { Link } from "react-router-dom";
import MainFrame from "../components/MainFrame";
import CopyButton from "../utils/CopyButton";
import { ArrowRight, Mail } from "lucide-react";
import Button from "../utils/Button";

function Footer() {
  return (
    <MainFrame className="px-8">
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <h3 className="flex flex-col items-center text-text-primary text-5xl scale-y-90 font-bold font-heading">
          <span>Ini Header</span>
          <p className="flex gap-2 text-text-primary">
            <span>Teks </span>
            <span className="text-blue-1">Utama </span>
          </p>
        </h3>
        <p>
          Ini adalah teks pelengkap
        </p>
        <Link

          className="flex items-center justify-center gap-2 p-4 font-mono font-medium tracking-wider text-white bg-black"
        >
          <Mail className="size-4" />
          <span className="text-xs tracking-wider">MARI BERDISKUSI</span>
        </Link>
      </div>
      <div className="flex divide-x divide-border-muted">
        <div className="flex flex-col max-w-xl items-start justify-center pr-24 pt-4 pb-16 gap-2">
          <p className="text-text-primary text-3xl font-extrabold origin-bottom-left scale-y-90 scale-x-120">
            UDIN
          </p>

          <p>
            Menikmati proses belajar, hobi olahraga dan bermain game pixel, mmorpg, dan kompetitif.
          </p>

          <div className="flex flex-col w-full">
            <div className="flex w-full gap-2 text-text-muted pt-4 justify-between">
              <Link
                to={'mailto:makmalluddin123@gmail.com'}
                className="group flex gap-2 font-mono font-medium tracking-wider items-center transition-colors duration-300 hover:text-text-primary"
              >
                <span>MAKMALLUDDIN123@GMAIL.COM</span>
                <ArrowRight className="size-4 rotate-305 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <CopyButton textToCopy="makmalluddin123@gmail.com"></CopyButton>
            </div>

            <div className="flex w-full gap-2 text-text-muted justify-between">
              <Link
                to={'https://wa.me/+6285159594771'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-2 font-mono font-medium tracking-wider items-center transition-colors duration-300 hover:text-text-primary"
              >
                <span>+6285159594771</span>
                <ArrowRight className="size-4 rotate-305 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <CopyButton textToCopy="makmalluddin123@gmail.com"></CopyButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col pl-8 pr-24 py-8 gap-4">
          <p className="font-mono text-xs tracking-wider">JELAJAHI LAGI</p>
          <div className="flex flex-col gap-2">
            <p>Profile</p>
            <p>Projek</p>
            <p>Pengalaman</p>
            <p>Keahlian</p>
          </div>
        </div>

        <div className="flex flex-col pl-8 pr-24 py-8 gap-4">
          <p className="font-mono text-xs tracking-wider">TERHUBUNG</p>
          <div className="flex flex-col gap-2">
            <p>Linkedin</p>
            <p>Whatsapp</p>
            <p>Github</p>
            <p></p>
          </div>
        </div>

        <div>
        </div>
      </div>

      <div className="flex w-full justify-between py-4">
        <p>© 2026 Muhammad Akmalluddin</p>
        <p>All Rights Reserved.</p>
      </div>
    </MainFrame>
  );
}

export default Footer;
