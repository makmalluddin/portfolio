import fs from "node:fs";
import path from "node:path";

const DIST = "dist";
const INDEX = path.join(DIST, "index.html");
const ASSETS = path.join(DIST, "assets");
const HERO_DATA = path.join("src/data/content/hero.json");

let html = fs.readFileSync(INDEX, "utf8");

function injectHeroPreload() {
  if (!fs.existsSync(HERO_DATA) || !fs.existsSync(ASSETS)) return;

  const hero = JSON.parse(fs.readFileSync(HERO_DATA, "utf8"));
  const avatar = String(hero.avatar ?? "");

  if (!avatar.startsWith("src/assets/")) return;

  const ext = path.extname(avatar);
  const stem = path.basename(avatar, ext);
  const match = fs
    .readdirSync(ASSETS)
    .find(
      (file) =>
        file.startsWith(`${stem}-`) &&
        path.extname(file).toLowerCase() === ext.toLowerCase()
    );

  if (!match) {
    console.warn(`[postbuild] Aset hero tidak ditemukan untuk ${avatar}`);
    return;
  }

  // Base path diambil dari tag script utama agar tetap benar bila base berubah.
  const baseMatch = html.match(/src="([^"]*?)assets\/index-[^"]+\.js"/);
  const base = baseMatch ? baseMatch[1] : "/";
  const href = `${base}assets/${match}`;

  if (html.includes(href)) return;

  html = html.replace(
    "</head>",
    `    <link rel="preload" as="image" href="${href}" fetchpriority="high" />\n  </head>`
  );

  console.log(`[postbuild] Preload hero: ${href}`);
}

injectHeroPreload();

fs.writeFileSync(INDEX, html);
fs.copyFileSync(INDEX, path.join(DIST, "404.html"));
