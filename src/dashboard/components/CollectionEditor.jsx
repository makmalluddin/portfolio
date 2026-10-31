import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import {
  useDashboardData,
  useDirty,
  useToast,
} from "../context";
import { getSchema } from "../schema";
import {
  deepClone,
  formatTime,
  nextId,
  slugify,
  uniqueSlug,
} from "../utils";
import { ValidationPanel } from "./ValidationPanel";
import { FieldRenderer } from "./fields/FieldRenderer";
import {
  dangerButtonClass,
  isWideField,
  primaryButtonClass,
  secondaryButtonClass,
  tinyButtonClass,
} from "./fields/shared";

function duplicateRecord(item, list, schema) {
  const clone = deepClone(item);

  if ("id" in clone) clone.id = nextId(list, schema.key);

  if (clone.slug) clone.slug = uniqueSlug(`${clone.slug}-copy`, list);

  const labelKey = ["title", "category", "role", "label", "categoryTitle"].find(
    (key) => clone[key]
  );

  if (labelKey) clone[labelKey] = `${clone[labelKey]} (Copy)`;

  return clone;
}

export function CollectionEditor() {
  const { key } = useParams();
  const schema = getSchema(key);
  const {
    assets,
    relations,
    refresh,
    refreshAssets,
    setError: setGlobalError,
  } = useDashboardData();
  const { pushToast } = useToast();
  const { setDirty } = useDirty();

  const [data, setData] = useState(null);
  const [original, setOriginal] = useState(null);
  const [mtime, setMtime] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const dirty = useMemo(
    () => Boolean(data) && JSON.stringify(data) !== JSON.stringify(original),
    [data, original]
  );

  useEffect(() => {
    setDirty(dirty);
    return () => setDirty(false);
  }, [dirty, setDirty]);

  useEffect(() => {
    if (!schema) return undefined;

    let cancelled = false;
    setLoading(true);
    setLoadError("");
    setErrors([]);
    setQuery("");
    setSelectedIndex(0);

    api
      .getCollection(key)
      .then((result) => {
        if (cancelled) return;
        setData(result.data);
        setOriginal(deepClone(result.data));
        setMtime(result.mtime);
        setWarnings(result.warnings ?? []);
      })
      .catch((requestError) => {
        if (cancelled) return;
        setLoadError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key, reloadToken, schema]);

  if (!schema) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold">Koleksi tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[#6d6c65]">
          Modul "{key}" tidak terdaftar di dashboard.
        </p>
        <Link to="/" className={`${primaryButtonClass} mt-5`}>
          Kembali ke Overview
        </Link>
      </div>
    );
  }

  const isArray = schema.kind === "array";
  const currentItem = isArray ? data?.[selectedIndex] : data;

  const updateRecord = (patch) => {
    if (isArray) {
      setData((current) =>
        (current ?? []).map((item, index) =>
          index === selectedIndex ? { ...item, ...patch } : item
        )
      );
    } else {
      setData((current) => ({ ...(current ?? {}), ...patch }));
    }
  };

  const addItem = () => {
    const item = schema.createItem(data ?? []);
    const next = [...(data ?? []), item];
    setData(next);
    setSelectedIndex(next.length - 1);
    setQuery("");
  };

  const duplicateItem = () => {
    if (!currentItem) return;
    const clone = duplicateRecord(currentItem, data, schema);
    const next = [
      ...data.slice(0, selectedIndex + 1),
      clone,
      ...data.slice(selectedIndex + 1),
    ];
    setData(next);
    setSelectedIndex(selectedIndex + 1);
  };

  const removeItem = () => {
    if (!currentItem) return;
    const label = schema.itemLabel?.(currentItem, selectedIndex) ?? "item ini";
    if (!window.confirm(`Hapus "${label}"? Tindakan ini tidak bisa di-undo.`)) {
      return;
    }

    const next = data.filter((_, index) => index !== selectedIndex);
    setData(next);
    setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.length - 1)));
  };

  const moveItem = (direction) => {
    const target = selectedIndex + direction;
    if (!data || target < 0 || target >= data.length) return;
    const next = data.slice();
    [next[selectedIndex], next[target]] = [next[target], next[selectedIndex]];
    setData(next);
    setSelectedIndex(target);
  };

  const save = async () => {
    if (!dirty || saving) return;

    setSaving(true);
    setGlobalError("");

    try {
      const result = await api.saveCollection(key, data);
      setOriginal(deepClone(data));
      setMtime(result.mtime);
      setWarnings(result.warnings ?? []);
      setErrors([]);
      pushToast("Perubahan tersimpan ke file JSON.");
      await refresh();
    } catch (requestError) {
      setErrors(requestError.details ?? []);
      if (requestError.warnings?.length) setWarnings(requestError.warnings);
      pushToast(requestError.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const validate = async () => {
    try {
      const result = await api.validate(key, data);
      setErrors(result.errors ?? []);
      setWarnings(result.warnings ?? []);
      pushToast(
        result.errors?.length
          ? `Ditemukan ${result.errors.length} error.`
          : "Validasi lolos.",
        result.errors?.length ? "error" : "success"
      );
    } catch (requestError) {
      pushToast(requestError.message, "error");
    }
  };

  const backup = async () => {
    try {
      await api.backup(key);
      pushToast("Backup koleksi dibuat.");
      await refresh();
    } catch (requestError) {
      pushToast(requestError.message, "error");
    }
  };

  const reload = async () => {
    if (
      dirty &&
      !window.confirm("Muat ulang dari file akan membuang perubahan. Lanjutkan?")
    ) {
      return;
    }

    setReloadToken((token) => token + 1);
    await refreshAssets();
  };

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="h-7 w-48 animate-pulse rounded bg-[#e3e2dd]" />
        <div className="mt-6 h-64 animate-pulse rounded-xl bg-[#e9e8e4]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold">Gagal memuat koleksi</h1>
        <p className="mt-2 text-sm text-red-600">{loadError}</p>
        <button
          type="button"
          className={`${primaryButtonClass} mt-5`}
          onClick={() => setReloadToken((token) => token + 1)}
        >
          Coba lagi
        </button>
      </div>
    );
  }

  const items = Array.isArray(data) ? data : [];
  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      normalizedQuery
        ? JSON.stringify(item).toLowerCase().includes(normalizedQuery)
        : true
    );

  const fieldContext = {
    collectionKey: key,
    item: currentItem,
    items,
    itemIndex: selectedIndex,
    assets,
    relations,
    refreshAssets,
    uploadSlug: currentItem?.slug || currentItem?.category || key,
  };

  const pathPrefix = isArray ? [key, selectedIndex] : [];

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8982]">
            {isArray ? "Koleksi" : "Halaman"} / {schema.label}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#17171a]">
            {schema.label}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6d6c65]">
            {schema.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#8a8982]">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium ${
                dirty
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  dirty ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
              {dirty ? "Belum disimpan" : "Tersimpan"}
            </span>
            {mtime ? <span>Terakhir diubah: {formatTime(mtime)}</span> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className={secondaryButtonClass} onClick={validate}>
            Validasi
          </button>
          <button type="button" className={secondaryButtonClass} onClick={backup}>
            Backup
          </button>
          <button type="button" className={secondaryButtonClass} onClick={reload}>
            Muat ulang
          </button>
          <button
            type="button"
            className={primaryButtonClass}
            onClick={save}
            disabled={!dirty || saving}
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </header>

      <div
        className={
          isArray
            ? "grid grid-cols-1 gap-5 xl:grid-cols-[320px_minmax(0,1fr)]"
            : "grid grid-cols-1 gap-5"
        }
      >
        {isArray ? (
          <aside className="rounded-xl border border-[#deddd8] bg-white">
            <div className="border-b border-[#e3e2dd] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6d6c65]">
                  Daftar item
                </p>
                <span className="rounded-full bg-[#f1f1ed] px-2 py-0.5 text-[11px] text-[#6d6c65]">
                  {items.length}
                </span>
              </div>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari item..."
                className="mt-2 w-full rounded-md border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#17171a]"
              />
              <button
                type="button"
                className={`${primaryButtonClass} mt-2 w-full py-1.5 text-xs`}
                onClick={addItem}
              >
                + Tambah {schema.label}
              </button>
            </div>

            <div className="dash-scroll max-h-[calc(100vh-260px)] overflow-y-auto p-2">
              {visibleItems.length === 0 ? (
                <p className="px-3 py-8 text-center text-xs text-[#8a8982]">
                  Tidak ada item yang cocok.
                </p>
              ) : null}

              {visibleItems.map(({ item, index }) => {
                const selected = index === selectedIndex;
                const label = schema.itemLabel?.(item, index) ?? `Item ${index + 1}`;
                const subtitle = schema.itemSubtitle?.(item) ?? "";

                return (
                  <button
                    key={item.id ?? `${slugify(label)}-${index}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`mb-1 w-full rounded-md border px-3 py-2 text-left transition ${
                      selected
                        ? "border-[#17171a] bg-[#f1f1ed]"
                        : "border-transparent hover:border-[#deddd8] hover:bg-[#fafaf8]"
                    }`}
                  >
                    <span className="flex items-start gap-2">
                      <span className="mt-0.5 w-5 shrink-0 text-[10px] font-mono text-[#9a9993]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-[#2c2c31]">
                          {label}
                        </span>
                        {subtitle ? (
                          <span className="mt-0.5 block truncate text-[11px] text-[#8a8982]">
                            {subtitle}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        ) : null}

        <section className="min-w-0 rounded-xl border border-[#deddd8] bg-white">
          {isArray && !currentItem ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#3c3c3a]">
                Belum ada item di koleksi ini.
              </p>
              <p className="mt-1 text-xs text-[#8a8982]">
                Tambahkan item pertama untuk mulai mengedit.
              </p>
              <button
                type="button"
                className={`${primaryButtonClass} mt-4`}
                onClick={addItem}
              >
                + Tambah {schema.label}
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 border-b border-[#e3e2dd] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-[#17171a]">
                    {isArray
                      ? schema.itemLabel?.(currentItem, selectedIndex) ??
                        "Edit item"
                      : schema.label}
                  </h2>
                  {isArray && schema.itemSubtitle?.(currentItem) ? (
                    <p className="mt-0.5 truncate text-xs text-[#8a8982]">
                      {schema.itemSubtitle(currentItem)}
                    </p>
                  ) : null}
                </div>

                {isArray ? (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      className={tinyButtonClass}
                      onClick={() => moveItem(-1)}
                      disabled={selectedIndex === 0}
                      title="Naik"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className={tinyButtonClass}
                      onClick={() => moveItem(1)}
                      disabled={selectedIndex === items.length - 1}
                      title="Turun"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className={tinyButtonClass}
                      onClick={duplicateItem}
                      title="Duplikat"
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      className={`${tinyButtonClass} text-red-500`}
                      onClick={removeItem}
                      title="Hapus"
                    >
                      ×
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                {schema.fields.map((field) => (
                  <div
                    key={field.key}
                    className={isWideField(field) ? "md:col-span-2" : ""}
                  >
                    <FieldRenderer
                      field={field}
                      value={
                        isArray
                          ? currentItem?.[field.key]
                          : data?.[field.key]
                      }
                      onChange={(nextValue) =>
                        updateRecord({ [field.key]: nextValue })
                      }
                      path={[...pathPrefix, field.key]}
                      errors={errors}
                      context={fieldContext}
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e3e2dd] px-4 py-4">
                <ValidationPanel errors={errors} warnings={warnings} />
              </div>

              {isArray ? (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e3e2dd] px-4 py-3">
                  <p className="text-xs text-[#8a8982]">
                    Item {selectedIndex + 1} dari {items.length}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
                      onClick={duplicateItem}
                    >
                      Duplikat item
                    </button>
                    <button
                      type="button"
                      className={`${dangerButtonClass} px-2.5 py-1.5 text-xs`}
                      onClick={removeItem}
                    >
                      Hapus item
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
