export function ValidationPanel({ errors = [], warnings = [] }) {
  const hasIssues = errors.length > 0 || warnings.length > 0;

  if (!hasIssues) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        Tidak ada error atau peringatan validasi.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errors.length > 0 ? (
        <section className="rounded-lg border border-red-200 bg-red-50">
          <header className="border-b border-red-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700">
            {errors.length} error — data belum bisa disimpan
          </header>
          <ul className="dash-scroll max-h-52 space-y-2 overflow-y-auto px-4 py-3">
            {errors.map((error, index) => (
              <li key={`${error.path}-${index}`} className="text-xs leading-relaxed text-red-700">
                {error.path ? (
                  <code className="mr-2 rounded bg-red-100 px-1.5 py-0.5 font-mono text-[10px]">
                    {error.path}
                  </code>
                ) : null}
                {error.message}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {warnings.length > 0 ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50">
          <header className="border-b border-amber-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
            {warnings.length} peringatan
          </header>
          <ul className="dash-scroll max-h-52 space-y-2 overflow-y-auto px-4 py-3">
            {warnings.map((warning, index) => (
              <li
                key={`${warning.path}-${index}`}
                className="text-xs leading-relaxed text-amber-800"
              >
                {warning.path ? (
                  <code className="mr-2 rounded bg-amber-100 px-1.5 py-0.5 font-mono text-[10px]">
                    {warning.path}
                  </code>
                ) : null}
                {warning.message}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
