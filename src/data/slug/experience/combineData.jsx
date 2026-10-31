import experienceDetails from "../../content/experience-details.json";
import { asset } from "../../assetResolver";
import { getIcon } from "../../icons";

export const expDetailData = experienceDetails.map((experience) => ({
  ...experience,
  logo: asset(experience.logo),
  metaData: experience.metaData.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
  })),
  detailPengalaman: experience.detailPengalaman.map((item) => ({
    ...item,
    icon: getIcon(item.icon),
  })),
}));
