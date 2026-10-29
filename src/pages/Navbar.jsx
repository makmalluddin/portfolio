import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-primary w-full border-b border-border-muted text-xs font-mono font-light h-12">
      <div className="flex justify-between h-full">
        <div className="hidden md:flex h-full">
          <Link
            to={"/"}
            className="flex h-full items-center px-5 font-semibold text-text-secondary text-lg scale-y-80"
          >
            UDIN
          </Link>

          <ul className="list-none flex gap-8 px-5 items-center border-x border-border-muted tracking-wider text-xs font-mono font-medium text-text-muted">
            <li>
              <a href="#projects" className="hover:text-text-primary transition-colors">
                PROJEK
              </a>
            </li>
            <li>
              <a href="#experiences" className="hover:text-text-primary transition-colors">
                PENGALAMAN
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-text-primary transition-colors">
                KEAHLIAN
              </a>
            </li>
            <li>
              <a href="#certifications" className="hover:text-text-primary transition-colors">
                SERTIFIKASI
              </a>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex h-full">
          <ul className="flex list-none h-full">
            <li className="flex px-5 items-center h-full border-l border-border-muted">
              <Link to={"https://github.com/makmalluddin"} target="_blank">
                Github
              </Link>
            </li>
            <li className="flex px-5 items-center h-full border-l border-border-muted">
              <Link to={"mailto:makmalluddin123@gmail.com"} target="_blank">
                Email
              </Link>
            </li>
            <li className="flex px-5 items-center h-full border-l border-border-muted">
              <Link to={"https://www.linkedin.com/in/makmalluddin"} target="_blank">
                Linkedin
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden w-full h-full justify-between items-center">
          <Link
            to={"/"}
            className="flex h-full items-center border-r border-border-muted px-5 font-semibold text-text-secondary text-lg"
          >
            <span className="scale-y-80">
              UDIN
            </span>
          </Link>

          <div className="flex h-full">
            <a
              href="https://github.com/makmalluddin"
              target="_blank"
              className="flex items-center justify-center h-full w-12 border-l border-border-muted text-text-primary hover:bg-bg-surface/50 transition-colors"
              aria-label="Github"
            >
              <img
                src="https://devicons.io/devicons/font/github-icon.svg"
                className="size-4"
              />
            </a>

            <button
              onClick={toggleMenu}
              className="flex items-center justify-center h-full w-12 border-l border-border-muted text-text-primary hover:bg-bg-surface/50 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden flex flex-col bg-bg-primary border-y border-border-muted font-mono text-xs tracking-wider font-medium text-text-muted">
          <ul className="flex flex-col list-none">
            <li>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                PROJEK
              </a>
            </li>
            <li>
              <a
                href="#experiences"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                PENGALAMAN
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                KEAHLIAN
              </a>
            </li>
            <li>
              <a
                href="#certifications"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                SERTIFIKASI
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
