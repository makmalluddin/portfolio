import projectDetails from "../../content/project-details.json";
import { asset } from "../../assetResolver";
import { getIcon } from "../../icons";

export const combineData = projectDetails.map((project) => ({
  ...project,
  heroImage: asset(project.heroImage),
  metaData: project.metaData.map((item) => ({
    ...item,
    key: getIcon(item.icon),
  })),
  galery: project.galery.map((item) => ({
    ...item,
    image: asset(item.image),
  })),
}));
