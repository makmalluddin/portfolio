import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { socialIconKeys } from "./socialIconKeys";

/**
 * Registry ikon media sosial yang boleh dipakai di data Navbar.
 * JSON hanya menyimpan key (string), wrapper yang mengubahnya menjadi komponen.
 * Tambahkan key baru di socialIconKeys.js dan di sini secara bersamaan.
 */
export const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  x: FaXTwitter,
  youtube: FaYoutube,
  facebook: FaFacebook,
  globe: FaGlobe,
};

export function getSocialIcon(key) {
  return socialIconMap[key] ?? FaGlobe;
}

if (import.meta.env?.DEV) {
  const missing = socialIconKeys.filter((key) => !socialIconMap[key]);
  if (missing.length > 0) {
    console.warn(
      `[socialIcons] key belum terdaftar di socialIconMap: ${missing.join(", ")}`
    );
  }
}
