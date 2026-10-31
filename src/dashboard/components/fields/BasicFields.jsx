import { colorVariants } from "../../../data/colorVariants";
import { iconKeys } from "../../../data/iconKeys";
import { slugify, uniqueSlug } from "../../utils";
import { FieldFrame } from "./FieldFrame";
import {
  fieldError,
  inputClass,
  inputErrorClass,
  secondaryButtonClass,
  tinyButtonClass,
} from "./shared";

function inputClasses(error) {
  return `${inputClass} ${error ? inputErrorClass : ""}`;
}

export function TextField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <input
        id={id}
        type="text"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder ?? ""}
        className={inputClasses(error)}
      />
    </FieldFrame>
  );
}

export function TextAreaField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <textarea
        id={id}
        rows={field.rows ?? 4}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder ?? ""}
        className={`${inputClasses(error)} resize-y leading-relaxed`}
      />
    </FieldFrame>
  );
}

export function SelectField({ field, value, onChange, path, errors, context }) {
  const id = path.join(".");
  const error = fieldError(errors, id);
  const relationValues = field.optionsKey
    ? context.relations?.[field.optionsKey] ?? []
    : [];
  const options = (field.options ?? relationValues).map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  if (value && !options.some((option) => option.value === value)) {
    options.unshift({ value, label: `${value} (tidak ditemukan)` });
  }

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses(error)}
      >
        <option value="">— Tidak ada —</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

export function SlugField({ field, value, onChange, path, errors, context }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  const generate = () => {
    const source = context.item?.[field.sourceKey] ?? "";
    const base = slugify(source) || slugify(value);
    onChange(uniqueSlug(base, context.items ?? [], context.itemIndex ?? -1));
  };

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <div className="flex gap-2">
        <input
          id={id}
          type="text"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder="contoh: corporate-website-revamp"
          className={inputClasses(error)}
        />
        <button
          type="button"
          onClick={generate}
          className={`${secondaryButtonClass} shrink-0 px-2.5 py-2 text-xs`}
          title={`Buat slug dari ${field.sourceKey ?? "judul"}`}
        >
          Generate
        </button>
      </div>
    </FieldFrame>
  );
}

export function IconField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  return (
    <FieldFrame
      id={id}
      label={field.label}
      help={field.help ?? "Pilih dari registry ikon dashboard."}
      error={error}
    >
      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses(error)}
      >
        <option value="">— Pilih ikon —</option>
        {iconKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

export function ColorField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);
  const known = Boolean(colorVariants[value]);

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(colorVariants).map(([key, variant]) => {
          const selected = key === value;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs transition ${
                selected
                  ? "border-[#17171a] bg-[#f1f1ed] font-semibold text-[#17171a]"
                  : "border-[#d7d6d1] bg-white text-[#55554f] hover:border-[#b6b5ae]"
              }`}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: variant.hex }}
              />
              <span className="min-w-0">
                <span className="block truncate">{key}</span>
                <span className="block text-[10px] font-normal text-[#8a8982]">
                  {variant.hex}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {!known && value ? (
        <p className="mt-1 text-xs text-amber-600">
          Warna "{value}" tidak ada di colorVariants.
        </p>
      ) : null}
    </FieldFrame>
  );
}

export function BooleanField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  return (
    <div className="flex flex-col justify-end">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2 rounded-md border border-[#d7d6d1] bg-white px-3 py-2 text-sm text-[#3c3c3a]"
      >
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-[#17171a]"
        />
        {field.label}
      </label>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error.message}</p>
      ) : null}
    </div>
  );
}

export function StringListField({ field, value, onChange, path, errors }) {
  const list = Array.isArray(value) ? value : [];
  const pathString = path.join(".");

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = list.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <FieldFrame label={field.label} help={field.help}>
      <div className="space-y-2">
        {list.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#d7d6d1] px-3 py-3 text-xs text-[#8a8982]">
            Belum ada item.
          </p>
        ) : null}

        {list.map((item, index) => {
          const error = fieldError(errors, `${pathString}.${index}`);

          return (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item ?? ""}
                onChange={(event) => {
                  const next = list.slice();
                  next[index] = event.target.value;
                  onChange(next);
                }}
                className={inputClasses(error)}
                placeholder={field.placeholder ?? ""}
              />
              <button
                type="button"
                className={tinyButtonClass}
                onClick={() => move(index, -1)}
                disabled={index === 0}
                title="Naik"
              >
                ↑
              </button>
              <button
                type="button"
                className={tinyButtonClass}
                onClick={() => move(index, 1)}
                disabled={index === list.length - 1}
                title="Turun"
              >
                ↓
              </button>
              <button
                type="button"
                className={`${tinyButtonClass} text-red-500`}
                onClick={() => onChange(list.filter((_, i) => i !== index))}
                title="Hapus"
              >
                ×
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
          onClick={() => onChange([...list, ""])}
        >
          + {field.addLabel ?? "Tambah item"}
        </button>
      </div>
    </FieldFrame>
  );
}

export function GroupSection({ title, children }) {
  return (
    <section className="rounded-lg border border-[#d7d6d1] bg-[#fafaf8] p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6d6c65]">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}
