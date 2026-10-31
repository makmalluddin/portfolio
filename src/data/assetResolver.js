import avatar from "@/src/assets/avatar.webp";
import cv from "@/src/assets/myself/cv/CV_Muhammad_Akmalluddin.pdf";
import xquisite from "@/src/assets/myself/certifications/xquisite.webp";
import corporateRevamp from "@/src/assets/Project/corporateRevamp.webp";
import bnsp from "@/src/assets/Project/bnsp.webp";
import sg8Logo from "@/src/assets/sg8_logo.webp";

/**
 * Aset yang saat ini direferensikan oleh konten.
 * Impor eksplisit supaya aset yang tidak dipakai tidak ikut ter-bundle.
 * Tambahkan entri di sini ketika memakai aset baru yang sudah ada.
 */
const staticAssets = {
  "src/assets/avatar.webp": avatar,
  "src/assets/myself/cv/CV_Muhammad_Akmalluddin.pdf": cv,
  "src/assets/myself/certifications/xquisite.webp": xquisite,
  "src/assets/Project/corporateRevamp.webp": corporateRevamp,
  "src/assets/Project/bnsp.webp": bnsp,
  "src/assets/sg8_logo.webp": sg8Logo,
};

/**
 * Gambar hasil upload dashboard disimpan di src/assets/uploads.
 * Glob dibatasi ke folder ini agar build tetap ramping.
 */
const uploadedModules = import.meta.glob(
  "/src/assets/uploads/**/*.{webp,png,jpg,jpeg,svg,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/**
 * Mengubah path relatif aset (mis. "src/assets/foo.webp") menjadi URL
 * yang bisa dipakai browser, baik saat dev maupun setelah build.
 * URL eksternal / data URI dikembalikan apa adanya.
 */
export function asset(path) {
  if (!path) return "";

  if (/^(https?:|data:|blob:)/.test(path)) {
    return path;
  }

  const normalized = "/" + path.replace(/^\/+/, "");

  return (
    staticAssets[path] ??
    uploadedModules[normalized] ??
    (path.startsWith("src/assets/") ? normalized : path)
  );
}
