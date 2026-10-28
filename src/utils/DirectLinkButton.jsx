import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopyButton from "../utils/CopyButton";

function DirectLinkButton({ label, href, copyText, isExternal }) {
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex w-full gap-2 text-text-muted justify-between items-center">
      <Link
        to={href}
        {...linkProps}
        className="group text-xs md:text-lg flex gap-2 font-mono font-medium tracking-wider items-center transition-colors duration-300 hover:text-text-primary"
      >
        <span>{label}</span>
        <ArrowRight className="size-4 rotate-305 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>

      {copyText && (<CopyButton textToCopy={copyText} />)}
    </div>
  );
}

export default DirectLinkButton;
