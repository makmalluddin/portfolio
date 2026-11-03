import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FieldFrame } from "./FieldFrame";
import { fieldError, inputClass, secondaryButtonClass, tinyButtonClass } from "./shared";

const MONTHS = [
  { name: "Januari", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Februari", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Maret", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "April", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Mei", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Juni", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Juli", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Agustus", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "September", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Oktober", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "November", weeks: ["M1", "M2", "M3", "M4"] },
  { name: "Desember", weeks: ["M1", "M2", "M3", "M4"] },
];

function TimelineCell({ value, onChange, monthIdx, week }) {
  const cellKey = `${monthIdx}-${week}`;
  const cellValue = value?.[cellKey] ?? false;

  return (
    <button
      type="button"
      onClick={() =>
        onChange({
          ...value,
          [cellKey]: !cellValue,
        })
      }
      className={`h-8 w-full border transition ${
        cellValue
          ? "border-[#17171a] bg-[#17171a] text-white"
          : "border-[#d7d6d1] bg-white hover:border-[#b6b5ae]"
      }`}
      title={`${MONTHS[monthIdx].name} ${week}`}
    >
      {cellValue ? "✓" : ""}
    </button>
  );
}

export function TimelineEditorField({ field, value, onChange, path, errors }) {
  const id = path.join(".");
  const error = fieldError(errors, id);
  const data = value || { tasks: [] };
  const [tasks, setTasks] = useState(data.tasks || []);
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      name: newTaskName,
      allocation: {},
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    onChange({ tasks: updatedTasks });
    setNewTaskName("");
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    onChange({ tasks: updatedTasks });
  };

  const updateTaskAllocation = (taskId, allocation) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, allocation } : t
    );
    setTasks(updatedTasks);
    onChange({ tasks: updatedTasks });
  };

  const columns = useMemo(() => {
    const cols = [
      {
        id: "taskName",
        header: "Task",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 min-w-48">
            <span className="flex-1 text-sm font-medium">{row.original.name}</span>
            <button
              type="button"
              onClick={() => removeTask(row.original.id)}
              className={`${tinyButtonClass} text-red-500`}
            >
              ×
            </button>
          </div>
        ),
      },
    ];

    MONTHS.forEach((month, monthIdx) => {
      month.weeks.forEach((week) => {
        cols.push({
          id: `${monthIdx}-${week}`,
          header: monthIdx === 0 ? week : null,
          cell: ({ row }) => (
            <TimelineCell
              value={row.original.allocation}
              onChange={(newAllocation) =>
                updateTaskAllocation(row.original.id, newAllocation)
              }
              monthIdx={monthIdx}
              week={week}
            />
          ),
        });
      });
    });

    return cols;
  }, []);

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <FieldFrame id={id} label={field.label} help={field.help} error={error}>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#d7d6d1] px-3 py-3 text-xs text-[#8a8982]">
            Belum ada task. Tambahkan task untuk memulai timeline.
          </p>
        ) : (
          <div className="overflow-x-auto border border-[#d7d6d1] rounded-md">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-[#fafaf8] border-b border-[#d7d6d1]">
                <tr>
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-2 py-2 text-left font-semibold text-[#6d6c65]"
                        style={{
                          width: header.id === "taskName" ? "auto" : "32px",
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))
                  )}
                </tr>
                <tr className="border-b border-[#d7d6d1]">
                  <td colSpan={1}></td>
                  {MONTHS.map((month, monthIdx) => (
                    <td
                      key={monthIdx}
                      colSpan={4}
                      className="px-2 py-2 text-center font-semibold text-[#17171a] bg-[#f1f1ed]"
                    >
                      {month.name}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#d7d6d1] hover:bg-[#fafaf8]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-1.5 py-1.5"
                        style={{
                          width: cell.column.id === "taskName" ? "auto" : "32px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Nama task baru..."
            className={`${inputClass} flex-1 text-sm`}
          />
          <button
            type="button"
            onClick={addTask}
            className={`${secondaryButtonClass} px-2.5 py-2 text-xs shrink-0`}
          >
            + Tambah
          </button>
        </div>
      </div>
    </FieldFrame>
  );
}
