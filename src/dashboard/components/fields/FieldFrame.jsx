export function FieldFrame({
  id,
  label,
  help,
  error,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6d6c65]"
      >
        {label}
      </label>
      {children}
      {help && !error ? (
        <p className="mt-1 text-xs leading-relaxed text-[#8a8982]">{help}</p>
      ) : null}
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error.message}</p>
      ) : null}
    </div>
  );
}
