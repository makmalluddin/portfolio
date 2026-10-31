import { useEffect, useRef, useState } from "react";
import { api } from "../../api";
import { useToast } from "../../context";
import { assetUrl, extensionOf, formatBytes } from "../../utils";
import { FieldFrame } from "./FieldFrame";
import {
  fieldError,
  inputClass,
  inputErrorClass,
  secondaryButtonClass,
  tinyButtonClass,
} from "./shared";

const IMAGE_EXTENSIONS = ["webp", "png", "jpg", "jpeg", "svg", "avif", "gif"];

function isImageAsset(path) {
  const extension = extensionOf(path);
  return !extension || IMAGE_EXTENSIONS.includes(extension);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsDataURL(file);
  });
}

export function AssetPicker({
  open,
  title = "Pilih aset",
  assets,
  extensions,
  onClose,
  onSelect,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    document.body.classList.add("dash-modal-open");
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("dash-modal-open");
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = (assets ?? []).filter((asset) => {
    if (extensions && !extensions.includes(asset.extension)) return false;
    if (!normalizedQuery) return true;
    return asset.path.toLowerCase().includes(normalizedQuery);
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-[#e3e2dd] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#17171a]">{title}</h2>
            <p className="text-xs text-[#8a8982]">
              {filtered.length} aset tersedia
            </p>
          </div>
          <button type="button" className={tinyButtonClass} onClick={onClose} title="Tutup">
            ×
          </button>
        </div>

        <div className="border-b border-[#e3e2dd] px-5 py-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama file..."
            className={inputClass}
            autoFocus
          />
        </div>

        <div className="dash-scroll grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3 md:grid-cols-4">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-md border border-dashed border-[#d7d6d1] px-4 py-10 text-center text-sm text-[#8a8982]">
              Tidak ada aset yang cocok.
            </p>
          ) : null}

          {filtered.map((asset) => {
            const previewable = IMAGE_EXTENSIONS.includes(asset.extension);

            return (
              <button
                key={asset.path}
                type="button"
                onClick={() => {
                  onSelect(asset.path);
                  onClose();
                }}
                className="group overflow-hidden rounded-lg border border-[#e3e2dd] bg-white text-left transition hover:border-[#17171a]"
              >
                <div className="flex h-24 items-center justify-center overflow-hidden bg-[#f3f3ef]">
                  {previewable ? (
                    <img
                      src={assetUrl(asset.path)}
                      alt=""
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <span className="rounded bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6d6c65]">
                      {asset.extension}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-[11px] font-medium text-[#3c3c3a]" title={asset.path}>
                    {asset.path.split("/").pop()}
                  </p>
                  <p className="text-[10px] text-[#9a9993]">{formatBytes(asset.size)}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end border-t border-[#e3e2dd] px-5 py-3">
          <button type="button" className={secondaryButtonClass} onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export function ImageField({ field, value, onChange, path, errors, context }) {
  const id = path.join(".");
  const error = fieldError(errors, id);
  const { pushToast } = useToast();
  const fileInputRef = useRef(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [brokenValue, setBrokenValue] = useState(null);
  const fileMode = field.accept === "file";
  const previewable = Boolean(value) && !fileMode && isImageAsset(value);
  const broken = Boolean(value) && brokenValue === value;

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      pushToast("Ukuran gambar maksimum 5 MB.", "error");
      return;
    }

    setUploading(true);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const result = await api.upload({
        key: context.collectionKey,
        slug: context.uploadSlug ?? "asset",
        filename: file.name,
        dataUrl,
      });

      onChange(result.path);
      await context.refreshAssets?.();
      pushToast(`Gambar diunggah: ${result.path.split("/").pop()}`);
    } catch (uploadError) {
      pushToast(uploadError.message, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FieldFrame
      id={id}
      label={field.label}
      help={
        field.help ??
        (fileMode
          ? "Pilih PDF dari aset atau tempel URL."
          : "Upload gambar, pilih dari aset, atau tempel path/URL.")
      }
      error={error}
    >
      <div className="space-y-2">
        <div className="flex min-h-28 items-center justify-center overflow-hidden rounded-md border border-[#e3e2dd] bg-[#f3f3ef] p-2">
          {!value ? (
            <span className="text-xs text-[#9a9993]">Belum ada file dipilih</span>
          ) : null}

          {value && previewable && !broken ? (
            <img
              src={assetUrl(value)}
              alt=""
              className="max-h-48 w-full object-contain"
              onError={() => setBrokenValue(value)}
            />
          ) : null}

          {value && previewable && broken ? (
            <span className="text-xs text-red-500">Preview gambar gagal dimuat.</span>
          ) : null}

          {value && !previewable ? (
            <a
              href={assetUrl(value)}
              target="_blank"
              rel="noreferrer"
              className="max-w-full truncate rounded bg-white px-3 py-2 text-xs font-medium text-[#1659c4] underline"
            >
              Buka file: {String(value).split("/").pop()}
            </a>
          ) : null}
        </div>

        <input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="src/assets/... atau https://..."
          className={`${inputClass} ${error ? inputErrorClass : ""}`}
        />

        <div className="flex flex-wrap gap-2">
          {!fileMode ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".webp,.png,.jpg,.jpeg,.svg,.avif,.gif,image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <button
                type="button"
                className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Mengunggah..." : "Upload gambar"}
              </button>
            </>
          ) : null}

          <button
            type="button"
            className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
            onClick={() => setPickerOpen(true)}
          >
            Pilih dari aset
          </button>

          {value ? (
            <button
              type="button"
              className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs text-red-600`}
              onClick={() => onChange("")}
            >
              Hapus
            </button>
          ) : null}
        </div>
      </div>

      {pickerOpen ? (
        <AssetPicker
          open
          title={fileMode ? "Pilih file PDF" : "Pilih gambar"}
          assets={context.assets}
          extensions={fileMode ? ["pdf"] : IMAGE_EXTENSIONS}
          onClose={() => setPickerOpen(false)}
          onSelect={onChange}
        />
      ) : null}
    </FieldFrame>
  );
}
