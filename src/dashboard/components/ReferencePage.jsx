import { Link, useParams } from "react-router-dom";
import { colorVariants } from "../../data/colorVariants";
import { getIcon } from "../../data/icons";
import { iconKeys } from "../../data/iconKeys";
import { primaryButtonClass } from "./fields/shared";

export function ReferencePage() {
  const { kind } = useParams();
  const isColors = kind === "colors";
  const isIcons = kind === "icons";

  if (!isColors && !isIcons) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold">Referensi tidak ditemukan</h1>
        <Link to="/" className={`${primaryButtonClass} mt-5`}>
          Kembali ke Overview
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8982]">
          Referensi / Read only
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#17171a]">
          {isColors ? "Palet warna" : "Daftar ikon"}
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6d6c65]">
          {isColors
            ? "Nilai yang boleh dipakai pada field accentColor dan colorVariantKey."
            : "Key ikon yang boleh dipakai pada field ikon. Tambah key baru lewat src/data/iconKeys.js dan src/data/icons.jsx."}
        </p>
      </header>

      {isColors ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(colorVariants).map(([key, variant]) => (
            <div
              key={key}
              className="overflow-hidden rounded-xl border border-[#deddd8] bg-white"
            >
              <div
                className="h-20 w-full"
                style={{ backgroundColor: variant.hex }}
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-[#17171a]">{key}</p>
                <p className="mt-0.5 font-mono text-xs text-[#8a8982]">
                  {variant.hex}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#9a9993]">
                  text: {variant.text}
                  <br />
                  bg: {variant.bg}
                  <br />
                  border: {variant.border}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {iconKeys.map((key) => {
            const Icon = getIcon(key);

            return (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-[#deddd8] bg-white px-3 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f1f1ed] text-[#17171a]">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <code className="truncate text-xs text-[#3c3c3a]">{key}</code>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
