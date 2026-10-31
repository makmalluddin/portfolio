import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  useDashboardData,
  useDirty,
  useToast,
} from "../context";
import { collectionGroups, collectionSchemas } from "../schema";

function pathFor(item) {
  if (item === "overview") return "/";
  if (item === "colors" || item === "icons") return `/reference/${item}`;
  return `/collections/${item}`;
}

function labelFor(item) {
  if (item === "overview") return "Overview";
  if (item === "colors") return "Palet warna";
  if (item === "icons") return "Daftar ikon";
  return collectionSchemas[item]?.label ?? item;
}

function Sidebar({ onNavigate }) {
  const { collections } = useDashboardData();
  const { confirmLeave } = useDirty();

  const counts = new Map(
    (collections ?? []).map((collection) => [collection.key, collection.count])
  );

  return (
    <div className="flex h-full flex-col bg-[#17171a] text-[#ececea]">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d8d88]">
          Portfolio CMS
        </p>
        <p className="mt-1 text-lg font-semibold tracking-tight">Dashboard</p>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          Dev only
        </p>
      </div>

      <nav className="dash-scroll flex-1 overflow-y-auto px-3 py-4">
        {collectionGroups.map((group) => (
          <section key={group.label} className="mb-5">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77776f]">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const count = counts.get(item);

                return (
                  <NavLink
                    key={item}
                    to={pathFor(item)}
                    end={item === "overview"}
                    onClick={(event) => {
                      if (!confirmLeave()) {
                        event.preventDefault();
                        return;
                      }
                      onNavigate?.();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-[13px] transition ${
                        isActive
                          ? "bg-white text-[#17171a] font-semibold"
                          : "text-[#c9c9c2] hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <span className="truncate">{labelFor(item)}</span>
                    {typeof count === "number" ? (
                      <span className="rounded-full bg-black/10 px-1.5 text-[10px] text-current opacity-70">
                        {count}
                      </span>
                    ) : null}
                  </NavLink>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-3 text-[11px] leading-relaxed text-[#8d8d88]">
        <p>localhost:5173</p>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-[#c9c9c2] underline decoration-white/20 underline-offset-2 hover:text-white"
        >
          Buka website →
        </a>
      </div>
    </div>
  );
}

function ToastStack() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm shadow-lg ${
            toast.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          <p className="flex-1 leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-xs opacity-60 hover:opacity-100"
            aria-label="Tutup notifikasi"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export function Layout() {
  const { error, refresh, loading } = useDashboardData();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f3f1] lg:flex">
      <aside className="hidden w-[260px] shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">
        <Sidebar />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[260px] shadow-2xl">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#deddd8] bg-[#f3f3f1]/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            className="rounded-md border border-[#d7d6d1] bg-white px-3 py-1.5 text-sm"
            onClick={() => setMobileOpen(true)}
          >
            ☰ Menu
          </button>
          <p className="text-sm font-semibold">Dashboard</p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-[#1659c4] underline"
          >
            Website
          </a>
        </div>

        {error ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={refresh}
              className="rounded border border-red-300 bg-white px-2.5 py-1 text-xs font-medium"
            >
              Coba lagi
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="h-0.5 w-full overflow-hidden bg-[#e3e2dd]">
            <div className="h-full w-1/3 animate-pulse bg-[#17171a]" />
          </div>
        ) : null}

        <main className="pb-16">
          <Outlet />
        </main>
      </div>

      <ToastStack />
    </div>
  );
}
