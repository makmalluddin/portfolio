export const inputClass =
  "w-full rounded-md border border-[#d7d6d1] bg-white px-3 py-2 text-sm text-[#17171a] outline-none transition placeholder:text-[#9a9993] focus:border-[#17171a] focus:ring-2 focus:ring-black/5";

export const inputErrorClass =
  "border-red-400 focus:border-red-500 focus:ring-red-100";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#17171a] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#2c2c31] disabled:cursor-not-allowed disabled:opacity-40";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#d7d6d1] bg-white px-3.5 py-2 text-sm font-medium text-[#3c3c3a] transition hover:border-[#b6b5ae] hover:bg-[#f7f7f5] disabled:cursor-not-allowed disabled:opacity-40";

export const dangerButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3.5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40";

export const tinyButtonClass =
  "inline-flex h-7 w-7 items-center justify-center rounded border border-[#d7d6d1] bg-white text-xs text-[#55554f] transition hover:border-[#b6b5ae] hover:bg-[#f3f3ef] disabled:cursor-not-allowed disabled:opacity-30";

export function fieldError(errors, path) {
  return (errors ?? []).find((error) => error.path === path);
}

export function isWideField(field) {
  return ["textarea", "repeater", "string-list", "image", "file", "group"].includes(
    field.type
  );
}

export function itemTitle(item, index, fallback = "Item") {
  if (!item) return `${fallback} ${index + 1}`;

  return (
    item.title ||
    item.label ||
    item.category ||
    item.role ||
    item.name ||
    item.type ||
    item.slug ||
    `${fallback} ${index + 1}`
  );
}
