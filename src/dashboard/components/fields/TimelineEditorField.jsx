import React, { useMemo } from "react";
import { FieldFrame } from "./FieldFrame";
import { fieldError } from "./shared";
import { Plus, Trash2 } from "lucide-react";
import {
  MAX_WEEKS,
  clampWeeks,
  addMonth,
  getVisibleWeeks,
  hasAllocationBeyondWeek,
  isWeekAllocated,
  normalizeTimeline,
  removeMonthFromTimeline,
  setMonthWeeks,
  setWeekAllocation,
} from "../../../utils/timeline";

const WEEK_OPTIONS = Array.from({ length: MAX_WEEKS }).map((_, index) => index + 1);

export function TimelineEditorField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  const data = useMemo(() => normalizeTimeline(value), [value]);
  const months = data.months;
  const tasks = data.tasks;
  const totalWeeks = months.reduce((total, month) => total + month.weeks, 0);

  const updateData = (updates) => {
    onChange({ ...data, ...updates });
  };

  const updateTasks = (newTasks) => {
    updateData({ tasks: newTasks });
  };

  const handleAddMonth = () => {
    updateData({ months: addMonth(months) });
  };

  const handleRemoveMonth = (month) => {
    const label = month.label || "Bulan Baru";

    if (
      !window.confirm(
        `Hapus kolom bulan "${label}"? Alokasi task pada bulan ini ikut terhapus.`
      )
    ) {
      return;
    }

    updateData(removeMonthFromTimeline(data, month.id));
  };

  const updateMonthLabel = (monthId, label) => {
    updateData({
      months: months.map((month) =>
        month.id === monthId ? { ...month, label } : month
      ),
    });
  };

  const updateMonthWeeks = (month, nextValue) => {
    const nextWeeks = clampWeeks(nextValue);

    if (
      nextWeeks < month.weeks &&
      hasAllocationBeyondWeek(tasks, month.id, nextWeeks)
    ) {
      const confirmed = window.confirm(
        `Ada alokasi aktif di minggu ${nextWeeks + 1}-${month.weeks}. ` +
          "Kurangi jumlah grid dan hapus alokasi tersebut?"
      );

      if (!confirmed) return;
    }

    updateData(setMonthWeeks(data, month.id, nextWeeks));
  };

  const addTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: "Task Baru",
      allocation: {},
    };
    updateTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    updateTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTaskName = (taskId, name) => {
    updateTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, name } : task))
    );
  };

  const toggleAllocation = (taskId, monthId, week) => {
    updateTasks(
      tasks.map((task) => {
        if (task.id !== taskId) return task;

        return setWeekAllocation(
          task,
          monthId,
          week,
          !isWeekAllocated(task, monthId, week)
        );
      })
    );
  };

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <div className="mb-4 overflow-hidden rounded-md border border-[#d7d6d1] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#e3e2dd] bg-[#fafaf8] px-3 py-2">
          <div>
            <p className="text-xs font-semibold text-[#3c3c3a]">Kolom Bulan</p>
            <p className="text-[11px] text-[#8a8982]">
              Tambah bulan sendiri, atur label dan jumlah grid minggu (1-4).
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddMonth}
            className="flex shrink-0 items-center gap-1.5 rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#17171a] shadow-sm hover:bg-[#f1f1ed]"
          >
            <Plus size={12} />
            Tambah Bulan
          </button>
        </div>

        {months.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-[#8a8982]">
            Belum ada kolom bulan. Klik Tambah Bulan untuk mulai.
          </p>
        ) : (
          <div className="divide-y divide-[#f1f1ed]">
            {months.map((month, index) => (
              <div
                key={month.id}
                className="flex flex-wrap items-center gap-2 px-3 py-2"
              >
                <span className="w-5 shrink-0 font-mono text-[10px] text-[#9a9993]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <input
                  type="text"
                  value={month.label}
                  onChange={(event) =>
                    updateMonthLabel(month.id, event.target.value)
                  }
                  placeholder="mis. Nov 2026"
                  className="min-w-40 flex-1 rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#17171a]"
                />
                <label className="flex items-center gap-1.5 text-[11px] text-[#6d6c65]">
                  Grid
                  <select
                    value={month.weeks}
                    onChange={(event) =>
                      updateMonthWeeks(month, event.target.value)
                    }
                    className="rounded border border-[#d7d6d1] bg-white px-2 py-1.5 text-xs"
                  >
                    {WEEK_OPTIONS.map((weekCount) => (
                      <option key={weekCount} value={weekCount}>
                        {weekCount} minggu
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveMonth(month)}
                  title="Hapus bulan"
                  className="rounded p-1.5 text-[#8a8982] hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden rounded-md border border-[#d7d6d1] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-[#e3e2dd] bg-[#fafaf8]">
                <th
                  rowSpan={months.length > 0 ? 2 : 1}
                  className="sticky left-0 z-10 min-w-[120px] border-r border-[#e3e2dd] bg-[#fafaf8] p-2 font-semibold text-[#6d6c65]"
                >
                  Task Name
                </th>
                {months.map((month) => (
                  <th
                    key={month.id}
                    colSpan={month.weeks}
                    className="border-r border-[#e3e2dd] p-1 text-center font-semibold text-[#6d6c65] text-[10px]"
                  >
                    {month.label || "Bulan Baru"}
                  </th>
                ))}
                <th rowSpan={months.length > 0 ? 2 : 1} className="p-2"></th>
              </tr>
              {months.length > 0 && (
                <tr className="border-b border-[#e3e2dd] bg-[#fafaf8]">
                  {months.flatMap((month) =>
                    getVisibleWeeks(month).map((week) => (
                      <th
                        key={`${month.id}-${week}`}
                        className="border-r border-[#e3e2dd] p-0.5 text-center text-[9px] font-normal text-[#8a8982] min-w-[18px]"
                      >
                        {week.slice(1)}
                      </th>
                    ))
                  )}
                </tr>
              )}
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#f1f1ed] last:border-0 hover:bg-[#fafaf8]"
                >
                  <td className="sticky left-0 z-10 border-r border-[#e3e2dd] bg-white p-1.5 group-hover:bg-[#fafaf8]">
                    <input
                      type="text"
                      value={task.name}
                      onChange={(event) =>
                        updateTaskName(task.id, event.target.value)
                      }
                      className="w-full rounded border-transparent bg-transparent px-1 py-0.5 text-[11px] focus:border-[#d7d6d1] focus:bg-white focus:outline-none"
                      placeholder="Nama task..."
                    />
                  </td>
                  {months.flatMap((month) =>
                    getVisibleWeeks(month).map((week) => {
                      const isActive = isWeekAllocated(task, month.id, week);

                      return (
                        <td
                          key={`${month.id}-${week}`}
                          onClick={() =>
                            toggleAllocation(task.id, month.id, week)
                          }
                          className={`cursor-pointer border-r border-[#f1f1ed] p-0 transition-colors ${
                            isActive ? "bg-[#17171a]" : "hover:bg-[#f1f1ed]"
                          }`}
                        >
                          <div className="h-5 w-full min-w-[18px]"></div>
                        </td>
                      );
                    })
                  )}
                  <td className="p-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeTask(task.id)}
                      className="rounded p-1 text-[#8a8982] hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan={2 + totalWeeks}
                    className="p-8 text-center text-xs text-[#8a8982]"
                  >
                    Belum ada task. Klik tombol di bawah untuk menambah.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#e3e2dd] bg-[#fafaf8] p-2">
          <button
            type="button"
            onClick={addTask}
            className="flex items-center gap-1.5 rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#17171a] shadow-sm hover:bg-[#f1f1ed]"
          >
            <Plus size={12} />
            Tambah Task
          </button>
        </div>
      </div>
    </FieldFrame>
  );
}
