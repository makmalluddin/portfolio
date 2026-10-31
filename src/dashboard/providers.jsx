import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api } from "./api";
import { DataContext, DirtyContext, ToastContext } from "./context";

function uniqueValues(items) {
  return [...new Set((items ?? []).filter(Boolean))].sort((a, b) =>
    String(a).localeCompare(String(b))
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const pushToast = useCallback(
    (message, type = "success") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((current) => [...current, { id, message, type }]);
      const timer = setTimeout(() => dismissToast(id), 4200);
      timers.current.set(id, timer);
      return id;
    },
    [dismissToast]
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      for (const timer of activeTimers.values()) clearTimeout(timer);
      activeTimers.clear();
    };
  }, []);

  const value = useMemo(
    () => ({ toasts, pushToast, dismissToast }),
    [toasts, pushToast, dismissToast]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function DirtyProvider({ children }) {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return undefined;

    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const confirmLeave = useCallback(() => {
    if (!dirty) return true;

    return window.confirm(
      "Ada perubahan yang belum disimpan. Yakin ingin meninggalkan halaman ini?"
    );
  }, [dirty]);

  const value = useMemo(
    () => ({ dirty, setDirty, confirmLeave }),
    [dirty, confirmLeave]
  );

  return <DirtyContext.Provider value={value}>{children}</DirtyContext.Provider>;
}

export function DataProvider({ children }) {
  const [collections, setCollections] = useState([]);
  const [snapshot, setSnapshot] = useState({});
  const [assets, setAssets] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshAssets = useCallback(async () => {
    try {
      setAssets(await api.listAssets());
    } catch (requestError) {
      setError(requestError.message);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [collectionList, nextSnapshot, nextAssets, nextWarnings] =
        await Promise.all([
          api.listCollections(),
          api.snapshot(),
          api.listAssets(),
          api.warnings(),
        ]);

      setCollections(collectionList);
      setSnapshot(nextSnapshot);
      setAssets(nextAssets);
      setWarnings(nextWarnings);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const relations = useMemo(() => {
    const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
    const experienceDetails = Array.isArray(snapshot["experience-details"])
      ? snapshot["experience-details"]
      : [];

    return {
      relatedProjectKeys: uniqueValues(
        experienceDetails.map((item) => item.relatedProjectKey)
      ),
      projectRelatedKeys: uniqueValues(projects.map((item) => item.related)),
      projectSlugs: uniqueValues(projects.map((item) => item.slug)),
      experienceSlugs: uniqueValues(
        (Array.isArray(snapshot.experiences) ? snapshot.experiences : []).map(
          (item) => item.slug
        )
      ),
    };
  }, [snapshot]);

  const value = useMemo(
    () => ({
      collections,
      snapshot,
      assets,
      warnings,
      relations,
      loading,
      error,
      refresh,
      refreshAssets,
      setError,
    }),
    [
      collections,
      snapshot,
      assets,
      warnings,
      relations,
      loading,
      error,
      refresh,
      refreshAssets,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
