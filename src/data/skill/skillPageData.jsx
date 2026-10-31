import certifications from "../content/certification-gallery.json";
import { asset } from "../assetResolver";

export const galleryCertifications = certifications.map((certification) => ({
  ...certification,
  image: asset(certification.image),
}));
