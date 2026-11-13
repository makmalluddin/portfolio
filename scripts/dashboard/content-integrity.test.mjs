import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src/data/content");

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, name), "utf8"));
}

const projectCards = readJson("projects.json");
const projectDetails = readJson("project-details.json");
const experienceFiles = [
  "experiences-professional.json",
  "experiences-freelance.json",
  "experiences-volunteer.json",
  "experiences-bootcamp.json",
];
const experienceCards = experienceFiles.flatMap((file) => readJson(file));
const experienceDetails = readJson("experience-details.json");

function duplicates(values) {
  return values.filter((value, index) => value && values.indexOf(value) !== index);
}

function assertLocalAssets(items, getPaths, label) {
  for (const item of items) {
    for (const assetPath of getPaths(item)) {
      if (!assetPath || /^(https?:|data:|blob:)/.test(assetPath)) continue;

      const filePath = path.join(process.cwd(), assetPath.replace(/^\/+/, ""));
      assert.ok(
        fs.existsSync(filePath),
        `${label} "${item.slug}" merujuk aset yang tidak ada: ${assetPath}`
      );
    }
  }
}

test("setiap kartu proyek punya halaman detail dan sebaliknya", () => {
  const cardSlugs = new Set(projectCards.map((item) => item.slug));
  const detailSlugs = new Set(projectDetails.map((item) => item.slug));

  for (const slug of cardSlugs) {
    assert.ok(detailSlugs.has(slug), `Proyek "${slug}" tidak punya halaman detail`);
  }

  for (const slug of detailSlugs) {
    assert.ok(cardSlugs.has(slug), `Detail proyek "${slug}" tidak punya kartu`);
  }
});

test("setiap kartu pengalaman punya halaman detail dan sebaliknya", () => {
  const cardSlugs = new Set(experienceCards.map((item) => item.slug));
  const detailSlugs = new Set(experienceDetails.map((item) => item.slug));

  for (const slug of cardSlugs) {
    assert.ok(detailSlugs.has(slug), `Pengalaman "${slug}" tidak punya halaman detail`);
  }

  for (const slug of detailSlugs) {
    assert.ok(cardSlugs.has(slug), `Detail pengalaman "${slug}" tidak punya kartu`);
  }
});

test("tidak ada id atau slug duplikat", () => {
  for (const [label, items] of [
    ["proyek", projectCards],
    ["detail proyek", projectDetails],
    ["detail pengalaman", experienceDetails],
  ]) {
    assert.deepEqual(duplicates(items.map((item) => item.id)), [], `id ${label} duplikat`);
  }

  // Id kartu pengalaman hanya unik per kategori (dikelola terpisah di dashboard).
  for (const file of experienceFiles) {
    const items = readJson(file);
    assert.deepEqual(duplicates(items.map((item) => item.id)), [], `id duplikat di ${file}`);
  }

  for (const [label, items] of [
    ["proyek", projectCards],
    ["detail proyek", projectDetails],
    ["pengalaman", experienceCards],
    ["detail pengalaman", experienceDetails],
  ]) {
    assert.deepEqual(duplicates(items.map((item) => item.slug)), [], `slug ${label} duplikat`);
  }
});

test("field wajib kartu proyek terisi", () => {
  const required = ["id", "number", "title", "slug", "category", "description", "image"];

  for (const project of projectCards) {
    for (const key of required) {
      assert.ok(
        project[key] !== undefined && project[key] !== null && project[key] !== "",
        `Proyek "${project.slug ?? project.id}" kekurangan field "${key}"`
      );
    }
  }
});

test("semua aset gambar lokal yang dirujuk benar-benar ada", () => {
  assertLocalAssets(projectCards, (item) => [item.image], "proyek");

  assertLocalAssets(
    projectDetails,
    (item) => [item.heroImage, ...(item.galery ?? []).map((gallery) => gallery.image)],
    "detail proyek"
  );

  assertLocalAssets(experienceCards, (item) => [item.logo], "pengalaman");

  assertLocalAssets(
    experienceDetails,
    (item) => [item.logo, ...(item.galery ?? []).map((gallery) => gallery.image)],
    "detail pengalaman"
  );
});
