import skills from "./content/skills.json";
import { getIcon } from "./icons";

export const skillData = skills.map((skill) => ({
  ...skill,
  CategoryIcon: getIcon(skill.categoryIcon),
}));
