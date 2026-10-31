export function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function nextId(items, prefix = "item") {
  let max = 0;

  for (const item of items ?? []) {
    const numeric = Number.parseInt(item?.id, 10);
    if (Number.isFinite(numeric) && String(numeric) === String(item.id)) {
      max = Math.max(max, numeric);
    }
  }

  if (max > 0) return String(max + 1);

  return `${prefix}-${(items?.length ?? 0) + 1}`;
}

export function uniqueSlug(base, items, ignoreIndex = -1) {
  const used = new Set(
    (items ?? [])
      .map((item, index) => (index === ignoreIndex ? null : item?.slug))
      .filter(Boolean)
  );

  const seed = slugify(base) || "item";
  let candidate = seed;
  let counter = 2;

  while (used.has(candidate)) {
    candidate = `${seed}-${counter}`;
    counter += 1;
  }

  return candidate;
}

export function isExternalUrl(value) {
  return /^(https?:|data:|blob:|mailto:|tel:)/i.test(String(value ?? ""));
}

export function assetUrl(path) {
  if (!path) return "";
  const value = String(path);

  if (isExternalUrl(value) || value.startsWith("/")) {
    return value;
  }

  return `/${encodeURI(value.replace(/^\/+/, ""))}`;
}

export function extensionOf(path) {
  const match = String(path ?? "").match(/\.([a-z0-9]+)(?:\?.*)?$/i);
  return match ? match[1].toLowerCase() : "";
}

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function formatTime(timestamp) {
  if (!timestamp) return "-";

  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch {
    return "-";
  }
}

export function countByKey(items, key) {
  return (items ?? []).reduce((accumulator, item) => {
    const value = item?.[key];
    if (value === undefined || value === null || value === "") return accumulator;
    accumulator[String(value)] = (accumulator[String(value)] ?? 0) + 1;
    return accumulator;
  }, {});
}
