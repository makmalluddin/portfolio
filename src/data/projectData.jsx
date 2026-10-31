import projects from "./content/projects.json";
import { asset } from "./assetResolver";

export const projectData = projects.map((project) => ({
  ...project,
  image: asset(project.image),
}));
