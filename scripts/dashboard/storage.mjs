import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { collectionKeys, getCollection } from "./collections.mjs";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const CONTENT_DIR = path.join(ROOT, "src/data/content");
export const ASSET_DIR = path.join(ROOT, "src/assets");
export const UPLOAD_DIR = path.join(ASSET_DIR, "uploads");
export const BACKUP_DIR = path.join(ROOT, ".dashboard/backups");

const MAX_BACKUPS_PER_COLLECTION = 20;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const IMAGE_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "svg", "avif", "gif"];
const ASSET_EXTENSIONS = [...IMAGE_EXTENSIONS, "pdf"];

const MIME_TO_EXT = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "image/gif": "gif",
};

function collectionFile(key) {
  const collection = getCollection(key);

  if (!collection) {
    throw Object.assign(new Error(`Koleksi tidak dikenal: ${key}`), {
      status: 404,
      code: "COLLECTION_NOT_FOUND",
    });
  }

  const file = path.resolve(ROOT, collection.file);

  if (!file.startsWith(CONTENT_DIR + path.sep)) {
    throw Object.assign(new Error("Path koleksi tidak valid"), {
      status: 400,
      code: "INVALID_COLLECTION_PATH",
    });
  }

  return file;
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export async function readCollection(key) {
  const file = collectionFile(key);
  const [raw, stat] = await Promise.all([
    fs.readFile(file, "utf8"),
    fs.stat(file),
  ]);

  return {
    data: JSON.parse(raw),
    mtime: stat.mtimeMs,
  };
}

export async function readAllCollections() {
  const entries = await Promise.all(
    collectionKeys.map(async (key) => {
      try {
        const { data } = await readCollection(key);
        return [key, data];
      } catch (error) {
        return [key, null];
      }
    })
  );

  return Object.fromEntries(entries);
}

export async function backupCollection(key) {
  const file = collectionFile(key);

  try {
    await fs.access(file);
  } catch {
    return null;
  }

  const raw = await fs.readFile(file, "utf8");
  const backupDir = path.join(BACKUP_DIR, key);
  await fs.mkdir(backupDir, { recursive: true });

  const backupFile = path.join(backupDir, `${timestamp()}.json`);
  await fs.writeFile(backupFile, raw, "utf8");

  const files = (await fs.readdir(backupDir))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .reverse();

  const staleFiles = files.slice(MAX_BACKUPS_PER_COLLECTION);
  await Promise.all(
    staleFiles.map((name) =>
      fs.rm(path.join(backupDir, name), { force: true })
    )
  );

  return toPosix(path.relative(ROOT, backupFile));
}

export async function backupAll() {
  const results = await Promise.all(
    collectionKeys.map(async (key) => ({
      key,
      file: await backupCollection(key),
    }))
  );

  return results.filter((item) => item.file);
}

export async function listBackups() {
  const backups = [];

  for (const key of collectionKeys) {
    const backupDir = path.join(BACKUP_DIR, key);

    try {
      const names = await fs.readdir(backupDir);

      for (const name of names) {
        if (!name.endsWith(".json")) continue;
        const absolutePath = path.join(backupDir, name);
        const stat = await fs.stat(absolutePath);
        backups.push({
          key,
          file: toPosix(path.relative(ROOT, absolutePath)),
          size: stat.size,
          mtime: stat.mtimeMs,
        });
      }
    } catch {
      // Koleksi belum punya backup.
    }
  }

  return backups.sort((a, b) => b.mtime - a.mtime);
}

export async function writeCollection(key, data) {
  const file = collectionFile(key);
  await backupCollection(key);

  const tempFile = `${file}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  const json = `${JSON.stringify(data, null, 2)}\n`;

  await fs.writeFile(tempFile, json, "utf8");
  await fs.rename(tempFile, file);

  const stat = await fs.stat(file);

  return { mtime: stat.mtimeMs };
}

export async function assetExists(assetPath) {
  if (!assetPath || typeof assetPath !== "string") return false;
  if (/^(https?:|data:|blob:)/.test(assetPath)) return true;
  if (!assetPath.startsWith("src/assets/")) return false;

  const absolutePath = path.resolve(ROOT, assetPath);

  if (!absolutePath.startsWith(ASSET_DIR + path.sep)) return false;

  try {
    const stat = await fs.stat(absolutePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

export async function listAssets() {
  const assets = [];

  async function walk(directory) {
    let entries;

    try {
      entries = await fs.readdir(directory, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;

      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      const extension = path.extname(entry.name).slice(1).toLowerCase();
      if (!ASSET_EXTENSIONS.includes(extension)) continue;

      const stat = await fs.stat(absolutePath);
      assets.push({
        path: toPosix(path.relative(ROOT, absolutePath)),
        extension,
        size: stat.size,
        mtime: stat.mtimeMs,
      });
    }
  }

  await walk(ASSET_DIR);

  return assets.sort((a, b) => a.path.localeCompare(b.path));
}

function sanitizeSegment(value, fallback) {
  const result = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return result || fallback;
}

export async function saveUpload({ collectionKey, slug, filename, dataUrl }) {
  const collection = getCollection(collectionKey);

  if (!collection) {
    throw Object.assign(new Error(`Koleksi tidak dikenal: ${collectionKey}`), {
      status: 404,
      code: "COLLECTION_NOT_FOUND",
    });
  }

  if (!/^data:image\/[a-z0-9.+-]+;base64,/.test(dataUrl ?? "")) {
    throw Object.assign(new Error("File harus berupa data URL gambar"), {
      status: 400,
      code: "INVALID_DATA_URL",
    });
  }

  const match = dataUrl.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);

  if (!match) {
    throw Object.assign(new Error("Format data URL tidak valid"), {
      status: 400,
      code: "INVALID_DATA_URL",
    });
  }

  const mime = match[1].toLowerCase();
  const extension = MIME_TO_EXT[mime];

  if (!extension) {
    throw Object.assign(
      new Error(`Tipe gambar tidak didukung: ${mime}`),
      { status: 400, code: "UNSUPPORTED_IMAGE_TYPE" }
    );
  }

  const sourceExtension = path.extname(filename ?? "").slice(1).toLowerCase();
  if (sourceExtension && !IMAGE_EXTENSIONS.includes(sourceExtension)) {
    throw Object.assign(
      new Error(`Ekstensi file tidak didukung: ${sourceExtension}`),
      { status: 400, code: "UNSUPPORTED_FILE_EXTENSION" }
    );
  }

  const buffer = Buffer.from(match[2], "base64");

  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw Object.assign(
      new Error("Ukuran gambar maksimum 5 MB"),
      { status: 413, code: "UPLOAD_TOO_LARGE" }
    );
  }

  const folder = sanitizeSegment(collectionKey, "misc");
  const baseName = sanitizeSegment(slug || filename || "asset", "asset");
  const uploadFolder = path.join(UPLOAD_DIR, folder);
  await fs.mkdir(uploadFolder, { recursive: true });

  const fileName = `${baseName}-${timestamp()}-${crypto
    .randomBytes(3)
    .toString("hex")}.${extension}`;
  const absolutePath = path.join(uploadFolder, fileName);

  await fs.writeFile(absolutePath, buffer);

  const relativePath = toPosix(path.relative(ROOT, absolutePath));

  return {
    path: relativePath,
    url: `/${relativePath}`,
    size: buffer.length,
    mime,
  };
}
