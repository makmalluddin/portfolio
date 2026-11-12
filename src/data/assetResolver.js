
/**
 * Semua gambar lokal di src/assets ikut di-glob agar path yang dipilih
 * lewat dashboard (CMS) selalu ter-resolve, baik saat dev maupun build.
 * File non-gambar (mis. PDF) tetap memakai impor eksplisit di staticAssets.
 */
const localImageModules = import.meta.glob(
  "/src/assets/**/*.{webp,png,jpg,jpeg,svg,avif,gif}",
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
    localImageModules[normalized] ??
    (path.startsWith("src/assets/") ? normalized : path)
  );
}
