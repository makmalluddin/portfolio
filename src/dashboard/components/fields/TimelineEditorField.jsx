import React from "react";
import { FieldFrame } from "./FieldFrame";
import { fieldError } from "./shared";
import { Plus, Trash2 } from "lucide-react";

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Singkat nama bulan jika panjang > 4 karakter
const getMonthShort = (monthName) => {
  return monthName.length > 4 ? monthName.substring(0, 3) : monthName;
};

export function TimelineEditorField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);

  const data = value || {
    startMonth: 1,
    startYear: new Date().getFullYear(),
    durationMonths: 12,
    tasks: []
  };
  const tasks = data.tasks || [];
  const startMonth = data.startMonth || 1;
  const startYear = data.startYear || new Date().getFullYear();
  const durationMonths = data.durationMonths || 12;

  const updateData = (updates) => {
    onChange({ ...data, ...updates });
  };

  const updateTasks = (newTasks) => {
    updateData({ tasks: newTasks });
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
    updateTasks(tasks.filter((t) => t.id !== taskId));
  };

  const updateTaskName = (taskId, name) => {
    updateTasks(tasks.map((t) => (t.id === taskId ? { ...t, name } : t)));
  };

  const toggleAllocation = (taskId, monthIdx, weekIdx) => {
    const key = `${monthIdx}-M${weekIdx + 1}`;
    updateTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          const newAllocation = { ...t.allocation };
          newAllocation[key] = !newAllocation[key];
          return { ...t, allocation: newAllocation };
        }
        return t;
      })
    );
  };

  // Generate month headers dengan actual dates
  const getMonthHeader = (monthIdx) => {
    let totalMonths = (startMonth - 1) + monthIdx;
    let displayMonth = totalMonths % 12;
    let displayYear = startYear + Math.floor(totalMonths / 12);
    return `${getMonthShort(MONTH_NAMES[displayMonth])} ${displayYear}`;
  };

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <div className="mb-4 flex gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#6d6c65]">Bulan Mulai</label>
          <select
            value={startMonth}
            onChange={(e) => updateData({ startMonth: parseInt(e.target.value) })}
            className="rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-sm"
          >
            {MONTH_NAMES.map((month, idx) => (
              <option key={idx} value={idx + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#6d6c65]">Tahun Mulai</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => updateData({ startYear: parseInt(e.target.value) })}
            min="2000"
            max="2100"
            className="rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-sm w-24"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#6d6c65]">Durasi (Bulan)</label>
          <input
            type="number"
            value={durationMonths}
            onChange={(e) => updateData({ durationMonths: Math.max(1, parseInt(e.target.value) || 1) })}
            min="1"
            max="60"
            className="rounded border border-[#d7d6d1] bg-white px-2.5 py-1.5 text-sm w-24"
          />
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-[#d7d6d1] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-[#e3e2dd] bg-[#fafaf8]">
                <th className="sticky left-0 z-10 border-r border-[#e3e2dd] bg-[#fafaf8] p-2 font-semibold text-[#6d6c65] min-w-30">
                  Task Name
                </th>
                {Array.from({ length: durationMonths }).map((_, mIdx) => (
                  <th
                    key={mIdx}
                    colSpan={4}
                    className="border-r border-[#e3e2dd] p-1 text-center font-semibold text-[#6d6c65] text-[10px]"
                  >
                    {getMonthHeader(mIdx)}
                  </th>
                ))}
                <th className="p-2"></th>
              </tr>
              <tr className="border-b border-[#e3e2dd] bg-[#fafaf8]">
                <th className="sticky left-0 z-10 border-r border-[#e3e2dd] bg-[#fafaf8]"></th>
                {Array.from({ length: durationMonths }).map((_, mIdx) =>
                  Array.from({ length: 4 }).map((_, wIdx) => (
                    <th
                      key={`${mIdx}-${wIdx}`}
                      className="border-r border-[#e3e2dd] p-0.5 text-center text-[9px] font-normal text-[#8a8982] min-w-[18px]"
                    >
                      {wIdx + 1}
                    </th>
                  ))
                )}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-[#f1f1ed] last:border-0 hover:bg-[#fafaf8]">
                  <td className="sticky left-0 z-10 border-r border-[#e3e2dd] bg-white p-1.5 group-hover:bg-[#fafaf8]">
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => updateTaskName(task.id, e.target.value)}
                      className="w-full rounded border-transparent bg-transparent px-1 py-0.5 text-[11px] focus:border-[#d7d6d1] focus:bg-white focus:outline-none"
                      placeholder="Nama task..."
                    />
                  </td>
                  {Array.from({ length: durationMonths }).map((_, mIdx) =>
                    Array.from({ length: 4 }).map((_, wIdx) => {
                      const key = `${mIdx}-M${wIdx + 1}`;
                      const isActive = task.allocation?.[key];
                      return (
                        <td
                          key={key}
                          onClick={() => toggleAllocation(task.id, mIdx, wIdx)}
                          className={`cursor-pointer border-r border-[#f1f1ed] p-0 transition-colors ${isActive ? "bg-[#17171a]" : "hover:bg-[#f1f1ed]"
                            }`}
                        >
                          <div className="h-5 w-full"></div>
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
                    colSpan={50}
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
