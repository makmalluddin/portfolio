import { Link } from "react-router-dom"
import Button from "../utils/Button"
function Navbar() {
  return (
    <header className="flex justify-between text-xs font-mono font-light h-12 border-b border-border-muted">
      <div className="flex">
        <Link to={'#'} className="flex h-full items-center px-5 border-r border-border-muted">
          Udin
        </Link>

        <ul className="list-none flex gap-8 px-5 items-center border-r border-border-muted">
          <li>
            PROJEK
          </li>
          <li>
            PENGALAMAN
          </li>
          <li>
            KEAHLIAN
          </li>
        </ul>
      </div>
      <div className="flex">
        <ul className="flex list-none">
          <li className="flex px-5 items-center h-full border-l border-border-muted">
            <Link to={'https://github.com/makmalluddin'} target="_blank">Github</Link>
          </li>
          <li className="flex px-5 items-center h-full border-l border-border-muted">
            <Link to={'mailto:makmalluddin123@gmail.com'} target="_blank">Email</Link>
          </li>
          <li className="flex px-5 items-center h-full border-l border-border-muted">
            <Link to={'www.linkedin.com/in/makmalluddin'} target="_blank">Linkedin</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
