import hero from "./content/hero.json";
import { asset } from "./assetResolver";

export const heroData = {
  ...hero,
  avatar: asset(hero.avatar),
  cvUrl: asset(hero.cvUrl),
};
