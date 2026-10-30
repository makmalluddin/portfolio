import { Link } from "react-router-dom";
import MainFrame from "@/src/components/MainFrame";
import DirectLinkButton from "@/src/utils/DirectLinkButton";
import { footerData } from "@/src/data/footerData";
import { Mail } from "lucide-react";

function Footer() {
  const { cta, directLinks, exploreLinks, socialLinks, copyright } = footerData;

  return (
    <MainFrame className="md:px-8">
      <div className="flex flex-col items-center justify-center py-16 md:py-24 gap-6">
        <h3 className="flex flex-col items-center text-text-primary text-4xl md:text-5xl scale-y-90 origin-bottom font-bold font-heading text-center">
          <span>{cta.titleLine1}</span>
          <p className="flex gap-2 text-text-primary">
            <span>{cta.titleLine2}</span>
            <span className="text-blue-1">{cta.titleHighlight}</span>
          </p>
        </h3>
        <p className="max-w-lg text-center text-text-secondary text-sm md:text-base">
          {cta.description}
        </p>
        <Link
          to={cta.buttonHref}
          className="flex items-center justify-center gap-2 p-4 font-mono font-medium tracking-wider text-white bg-black transition-all duration-300 hover:bg-black/80 active:scale-95"
        >
          <Mail className="size-4" />
          <span className="text-xs tracking-wider">{cta.buttonText}</span>
        </Link>
      </div>

      <div className="grid grid-rows-3 divide-y md:flex md:flex-row md:divide-y-0 md:divide-x divide-border-muted border-border-muted">
        <div className="flex flex-col w-full md:max-w-xl items-start justify-center px-4 md:pr-24 pt-8 md:pt-4 pb-8 md:pb-16 gap-2">
          <p className="text-text-primary text-3xl font-extrabold origin-bottom-left scale-y-90 scale-x-120">
            UDIN
          </p>
          <p className="text-sm md:text-base">
            Menikmati proses belajar, berolahraga, serta bermain game pixel dan mmorpg.
          </p>

          <div className="flex flex-col w-full pt-4">
            {directLinks.map((item) => (
              <DirectLinkButton
                key={item.id}
                label={item.label}
                href={item.href}
                copyText={item.copyText}
                isExternal={item.isExternal}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col px-4 md:pl-8 md:pr-24 py-8 gap-4">
          <p className="font-mono text-xs tracking-wider">JELAJAHI LAGI</p>
          <div className="flex flex-col gap-2">
            {exploreLinks.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col px-4 md:pl-8 md:pr-24 py-8 gap-4">
          <p className="font-mono text-xs tracking-wider">TERHUBUNG</p>
          <div className="flex flex-col gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block flex-1"></div>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-between items-center py-4 gap-2 border-border-muted text-xs font-mono text-text-muted">
        <p>© {copyright.year} {copyright.name}</p>
        <p>All Rights Reserved.</p>
      </div>
    </MainFrame>
  );
}

export default Footer;
