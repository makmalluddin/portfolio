import { deepClone, nextId, slugify, uniqueSlug } from "../../utils";
import { isWideField, secondaryButtonClass, tinyButtonClass } from "./shared";

function duplicateItem(item, list, key) {
  const clone = deepClone(item);

  if ("id" in clone) {
    clone.id = nextId(list, key);
  }

  if (clone.slug) {
    clone.slug = uniqueSlug(`${clone.slug}-copy`, list);
  }

  const labelKey = ["title", "label", "name", "caption", "category", "type"].find(
    (candidate) => clone[candidate]
  );

  if (labelKey) {
    clone[labelKey] = `${clone[labelKey]} (Copy)`;
  }

  return clone;
}

export function RepeaterField({
  field,
  value,
  onChange,
  path,
  errors,
  context,
  renderField,
}) {
  const list = Array.isArray(value) ? value : [];
  const pathString = path.join(".");

  const updateAt = (index, patch) => {
    onChange(list.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = list.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index) => {
    const label = field.itemLabel?.(list[index], index) ?? `Item ${index + 1}`;
    if (!window.confirm(`Hapus "${label}"?`)) return;
    onChange(list.filter((_, itemIndex) => itemIndex !== index));
  };

  const duplicate = (index) => {
    const clone = duplicateItem(list[index], list, field.key);
    const next = [...list.slice(0, index + 1), clone, ...list.slice(index + 1)];
    onChange(next);
  };

  const add = () => {
    const item = field.createItem
      ? field.createItem(list)
      : { id: String(list.length + 1) };
    onChange([...list, item]);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6d6c65]">
            {field.label}
          </p>
          <p className="text-xs text-[#8a8982]">{list.length} item</p>
        </div>
        <button
          type="button"
          className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`}
          onClick={add}
        >
          + {field.addLabel ?? "Tambah item"}
        </button>
      </div>

      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#d7d6d1] px-4 py-6 text-center text-xs text-[#8a8982]">
            Belum ada item. Klik tombol tambah untuk mulai.
          </p>
        ) : null}

        {list.map((item, index) => {
          const title = field.itemLabel?.(item, index) ?? `Item ${index + 1}`;
          const itemContext = {
            ...context,
            item,
            items: list,
            itemIndex: index,
          };

          return (
            <div
              key={item.id ?? `${slugify(title)}-${index}`}
              className="overflow-hidden rounded-lg border border-[#d7d6d1] bg-white"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#e3e2dd] bg-[#fafaf8] px-3 py-2">
                <p className="truncate text-xs font-semibold text-[#3c3c3a]">{title}</p>
                <div className="flex shrink-0 items-center gap-1">
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
                    className={tinyButtonClass}
                    onClick={() => duplicate(index)}
                    title="Duplikat"
                  >
                    ⧉
                  </button>
                  <button
                    type="button"
                    className={`${tinyButtonClass} text-red-500`}
                    onClick={() => remove(index)}
                    title="Hapus"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2">
                {field.fields.map((subField) => (
                  <div
                    key={subField.key}
                    className={isWideField(subField) ? "md:col-span-2" : ""}
                  >
                    {renderField({
                      field: subField,
                      value: item?.[subField.key],
                      onChange: (nextValue) =>
                        updateAt(index, { [subField.key]: nextValue }),
                      path: [...path, index, subField.key],
                      errors,
                      context: itemContext,
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {field.help ? (
        <p className="mt-1 text-xs leading-relaxed text-[#8a8982]">{field.help}</p>
      ) : null}

      {errors?.some((error) => error.path.startsWith(`${pathString}.`)) ? (
        <p className="mt-1 text-xs text-red-600">
          Beberapa item memiliki kesalahan validasi. Lihat panel validasi.
        </p>
      ) : null}
    </div>
  );
}
