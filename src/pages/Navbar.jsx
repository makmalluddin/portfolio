import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon } from "lucide-react";
import { navbarData } from "@/src/data/navbarData";
import { getSocialIcon } from "@/src/data/socialIcons";
import { scrollToElement, scrollToTop } from "@/src/lib/smoothScroll";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { brandName, socialLinks } = navbarData;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  const handleExploreClick = (e, path) => {
    if (path.includes("#")) {
      const [basePath, hash] = path.split("#");
      if (window.location.pathname === basePath || basePath === "/") {
        e.preventDefault();
        if (window.location.pathname !== "/") {
          navigate("/");
        }
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            scrollToElement(element);
          }
        }, 100);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-primary w-full border-b border-border-muted text-xs font-mono font-light h-12">
      <div className="flex justify-between h-full">
        <div className="hidden md:flex h-full">
          <Link
            to={"/"}
            className="flex h-full items-center px-5 font-semibold text-text-secondary text-lg scale-y-80"
            onClick={handleLogoClick}
          >
            {brandName}
          </Link>

          <ul className="list-none flex gap-8 px-5 items-center border-x border-border-muted tracking-wider text-xs font-mono font-medium text-text-muted">
            <li>
              <button
                onClick={(e) => handleExploreClick(e, "/#projects")}
                className="cursor-pointer hover:text-text-primary transition-colors"
              >
                PROJEK
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleExploreClick(e, "/#experiences")}
                className="cursor-pointer hover:text-text-primary transition-colors"
              >
                PENGALAMAN
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleExploreClick(e, "/#skills")}
                className="cursor-pointer hover:text-text-primary transition-colors"
              >
                KEAHLIAN
              </button>
            </li>
            <li>
              <button
                onClick={(e) => handleExploreClick(e, "/#certifications")}
                className="cursor-pointer hover:text-text-primary transition-colors"
              >
                SERTIFIKASI
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex h-full">
          <ul className="flex list-none h-full">
            {socialLinks.map((item) => (
              <li
                key={item.id}
                className="flex px-5 items-center h-full border-l border-border-muted"
              >
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden w-full h-full justify-between items-center">
          <Link
            to={"/"}
            className="flex h-full items-center border-r border-border-muted px-5 font-semibold text-text-secondary text-lg"
            onClick={handleLogoClick}
          >
            <span className="scale-y-80">
              {brandName}
            </span>
          </Link>

          <div className="flex h-full">
            {socialLinks.slice(0, 1).map((item) => {
              const Icon = getSocialIcon(item.icon);

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer flex items-center justify-center h-full w-12 border-l border-border-muted text-text-primary hover:bg-bg-surface/50 transition-colors"
                  aria-label={item.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}

            <button
              onClick={toggleMenu}
              className="cursor-pointer flex items-center justify-center h-full w-12 border-l border-border-muted text-text-primary hover:bg-bg-surface/50 transition-colors"
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
              <button
                onClick={(e) => {
                  handleExploreClick(e, "/#projects");
                  setIsOpen(false);
                }}
                className="cursor-pointer block w-full text-left px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                PROJEK
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  handleExploreClick(e, "/#experiences");
                  setIsOpen(false);
                }}
                className="cursor-pointer block w-full text-left px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                PENGALAMAN
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  handleExploreClick(e, "/#skills");
                  setIsOpen(false);
                }}
                className="cursor-pointer block w-full text-left px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                KEAHLIAN
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  handleExploreClick(e, "/#certifications");
                  setIsOpen(false);
                }}
                className="cursor-pointer block w-full text-left px-5 py-3 hover:bg-bg-surface/50 transition-colors"
              >
                SERTIFIKASI
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
