import { MonitorSmartphone, Server, Wrench } from "lucide-react";
import {
  RiNextjsLine,
  RiReactjsLine,
  RiTailwindCssLine,
  RiNodejsLine,
} from "react-icons/ri";
import { FaLaravel } from "react-icons/fa6";
import { SiPostgresql, SiDocker, SiGit, SiNeovim } from "react-icons/si";

export const skillData = [
  {
    id: "1",
    category: "Frontend",
    CategoryIcon: MonitorSmartphone,
    tools: [
      { name: "Next.js", Icon: RiNextjsLine },
      { name: "React.js", Icon: RiReactjsLine },
      { name: "Tailwind CSS", Icon: RiTailwindCssLine },
    ],
  },
  {
    id: "2",
    category: "Backend",
    CategoryIcon: Server,
    tools: [
      { name: "Node.js", Icon: RiNodejsLine },
      { name: "Laravel", Icon: FaLaravel },
      { name: "PostgreSQL", Icon: SiPostgresql },
    ],
  },
  {
    id: "3",
    category: "Tools & Env",
    CategoryIcon: Wrench,
    tools: [
      { name: "Docker", Icon: SiDocker },
      { name: "Git", Icon: SiGit },
      { name: "Neovim", Icon: SiNeovim },
    ],
  },
];