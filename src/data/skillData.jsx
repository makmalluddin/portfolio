import { MonitorSmartphone, Server, Database, Wrench, Code2 } from "lucide-react";

export const skillData = [
  {
    id: "1",
    category: "Prog. Languages",
    CategoryIcon: Code2,
    tools: [
      { name: "JavaScript", iconUrl: "https://devicons.io/devicons/icons/javascript.svg" },
      { name: "Python", iconUrl: "https://devicons.io/devicons/icons/python.svg" },
      { name: "Java", iconUrl: "https://devicons.io/devicons/icons/java.svg" },
      { name: "C++", iconUrl: "https://devicons.io/devicons/icons/c-plusplus.svg" },
    ],
  },
  {
    id: "2",
    category: "Frontend Dev.",
    CategoryIcon: MonitorSmartphone,
    tools: [
      { name: "React", iconUrl: "https://devicons.io/devicons/icons/react.svg" },
      { name: "Next.js", iconUrl: "https://devicons.io/devicons/icons/nextjs-icon.svg" },
      { name: "Tailwind CSS", iconUrl: "https://devicons.io/devicons/icons/tailwind-icon.svg" },
      { name: "HTML5", iconUrl: "https://devicons.io/devicons/icons/html-5.svg" },
      { name: "CSS3", iconUrl: "https://devicons.io/devicons/icons/css-3.svg" },
    ],
  },
  {
    id: "3",
    category: "Backend Dev.",
    CategoryIcon: Server,
    tools: [
      { name: "Node.js", iconUrl: "https://devicons.io/devicons/icons/nodejs-icon.svg" },
      { name: "Laravel", iconUrl: "https://devicons.io/devicons/icons/laravel.svg" },
      { name: "Spring Boot", iconUrl: "https://devicons.io/devicons/icons/spring-icon.svg" },
    ],
  },
  {
    id: "4",
    category: "Databases",
    CategoryIcon: Database,
    tools: [
      { name: "PostgreSQL", iconUrl: "https://devicons.io/devicons/icons/postgresql.svg" },
      { name: "MySQL", iconUrl: "https://devicons.io/devicons/icons/mysql.svg" },
      { name: "MongoDB", iconUrl: "https://devicons.io/devicons/icons/mongodb-icon.svg" },
    ],
  },
  {
    id: "5",
    category: "Dev. Tools & Environments",
    CategoryIcon: Wrench,
    tools: [
      { name: "Git", iconUrl: "https://devicons.io/devicons/icons/git-icon.svg" },
      { name: "Docker", iconUrl: "https://devicons.io/devicons/icons/docker-icon.svg" },
      { name: "GitHub Actions", iconUrl: "https://devicons.io/devicons/icons/github-icon.svg" },
      { name: "Linux", iconUrl: "https://devicons.io/devicons/icons/linux-tux.svg" }
    ],
  },
];
