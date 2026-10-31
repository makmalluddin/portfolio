import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useDashboardData, useToast } from "../context";
import { collectionGroups, collectionSchemas } from "../schema";
import { formatBytes, formatTime } from "../utils";
import { ValidationPanel } from "./ValidationPanel";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "./fields/shared";

const websiteLinks = [
  { label: "Home", href: "/" },
  { label: "Proyek", href: "/#projects" },
  { label: "Pengalaman", href: "/#experiences" },
  { label: "Sertifikasi", href: "/certifications" },
];

export function Overview() {
  const { collections, warnings, assets, loading, refresh } = useDashboardData();
  const { pushToast } = useToast();
  const [backups, setBackups] = useState([]);

  const loadBackups = useCallback(async () => {
    try {
      setBackups(await api.listBackups());
    } catch {
      setBackups([]);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    api
      .listBackups()
      .then((list) => {
        if (!cancelled) setBackups(list);
      })
      .catch(() => {
        if (!cancelled) setBackups([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const counts = new Map(
    (collections ?? []).map((collection) => [collection.key, collection.count])
  );

  const totalItems = Object.values(collectionSchemas)
    .filter((schema) => schema.kind === "array")
    .reduce((total, schema) => total + (counts.get(schema.key) ?? 0), 0);

  const contentGroups = collectionGroups.filter(
    (group) => group.label !== "Ringkasan" && group.label !== "Referensi"
  );

  const summary = [
    { label: "Item konten", value: totalItems, note: "di semua koleksi" },
    { label: "Aset gambar", value: assets.length, note: "di src/assets" },
    { label: "Peringatan", value: warnings.length, note: "integritas data" },
    { label: "Backup", value: backups.length, note: "file lokal" },
  ];

  const reload = async () => {
    await Promise.all([refresh(), loadBackups()]);
    pushToast("Data dashboard dimuat ulang.");
  };

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8982]">
            Ringkasan
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#17171a]">
            Overview konten
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6d6c65]">
            Semua data di bawah ini dibaca langsung dari file JSON di{" "}
            <code className="rounded bg-[#e9e8e4] px-1.5 py-0.5 text-xs">
              src/data/content
            </code>
            . Perubahan disimpan ke file proyek dan tetap bisa di-commit ke Git.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={secondaryButtonClass}
            onClick={reload}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Muat ulang"}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={primaryButtonClass}
          >
            Buka website ↗
          </a>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[#deddd8] bg-white px-4 py-3"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a8982]">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-[#17171a]">
              {item.value}
            </p>
            <p className="text-xs text-[#9a9993]">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {contentGroups.map((group) => (
            <section key={group.label}>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d6c65]">
                  {group.label}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.items.map((key) => {
                  const schema = collectionSchemas[key];
                  if (!schema) return null;
                  const count = counts.get(key) ?? 0;

                  return (
                    <Link
                      key={key}
                      to={`/collections/${key}`}
                      className="group rounded-xl border border-[#deddd8] bg-white p-4 transition hover:border-[#17171a]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#17171a]">
                            {schema.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-[#8a8982]">
                            {schema.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-[#f1f1ed] px-2 py-0.5 text-[11px] font-medium text-[#6d6c65]">
                          {count}
                        </span>
                      </div>
                      <p className="mt-3 text-xs font-medium text-[#1659c4] opacity-0 transition group-hover:opacity-100">
                        Kelola →
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#deddd8] bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d6c65]">
              Validasi & integritas
            </h2>
            <div className="mt-3">
              <ValidationPanel warnings={warnings} />
            </div>
          </section>

          <section className="rounded-xl border border-[#deddd8] bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d6c65]">
              Buka halaman
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {websiteLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-[#e3e2dd] px-2.5 py-2 text-xs font-medium text-[#3c3c3a] transition hover:border-[#17171a]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
            <div className="mt-3 border-t border-[#e3e2dd] pt-3">
              <Link
                to="/reference/colors"
                className="block rounded-md px-1 py-1 text-xs text-[#1659c4] hover:underline"
              >
                Lihat palet warna →
              </Link>
              <Link
                to="/reference/icons"
                className="block rounded-md px-1 py-1 text-xs text-[#1659c4] hover:underline"
              >
                Lihat daftar ikon →
              </Link>
            </div>
          </section>

          <section className="rounded-xl border border-[#deddd8] bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d6c65]">
                Backup terakhir
              </h2>
              <button
                type="button"
                onClick={loadBackups}
                className="text-[11px] font-medium text-[#1659c4] hover:underline"
              >
                Refresh
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {backups.length === 0 ? (
                <li className="text-xs text-[#8a8982]">Belum ada backup.</li>
              ) : null}
              {backups.slice(0, 5).map((backup) => (
                <li
                  key={backup.file}
                  className="flex items-start justify-between gap-2 border-b border-[#f0efeb] pb-2 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-[#3c3c3a]">
                      {backup.key}
                    </p>
                    <p className="text-[11px] text-[#8a8982]">
                      {formatTime(backup.mtime)} · {formatBytes(backup.size)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-[#9a9993]">
              Tersimpan di <code>.dashboard/backups</code> dan tidak masuk Git.
            </p>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
            <p className="font-semibold uppercase tracking-[0.12em]">
              Catatan lokal
            </p>
            <p className="mt-2">
              Dashboard hanya aktif saat <code>npm run dev</code>. Halaman dan API
              ini tidak ikut ke build produksi.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
