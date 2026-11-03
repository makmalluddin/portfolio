const MONTHS = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

const WEEKS = ["M1", "M2", "M3", "M4"];

function WorkTimelineTable({ timeline, colorVariantKey }) {
  const tasks = timeline?.tasks || [];
  const colorClass = colorVariantKey ? `bg-${colorVariantKey}` : "bg-green-blue-1";

  if (!tasks.length) {
    return (
      <div className="rounded-lg border border-border-muted p-4 text-center text-text-muted">
        Belum ada data timeline.
      </div>
    );
  }

  const getCellActive = (allocation, monthIdx, week) => {
    const key = `${monthIdx}-${week}`;
    return allocation?.[key] || false;
  };

  return (
    <div className="w-full overflow-x-auto border border-border-muted">
      <table className="w-full text-left font-mono text-xs border-collapse">
        <thead>
          <tr className="border-b border-border-muted bg-bg-surface/50 text-text-secondary">
            <th className="p-2 w-12 border-r border-border-muted text-center shrink-0">
              NO
            </th>
            <th className="p-3 border-r border-border-muted min-w-72">
              TAHAP PEKERJAAN
            </th>
            {MONTHS.map((month, idx) => (
              <th
                key={idx}
                colSpan={4}
                className="p-3 border-r border-border-muted text-center tracking-wider min-w-28 last:border-r-0"
              >
                {month}
              </th>
            ))}
          </tr>

          <tr className="border-b border-border-muted text-center text-text-muted">
            <th className="border-r border-border-muted"></th>
            <th className="border-r border-border-muted"></th>
            {MONTHS.map((_, mIdx) =>
              WEEKS.map((week) => (
                <th
                  key={`${mIdx}-${week}`}
                  className="p-2 border-r border-border-muted font-normal text-xs last:border-r-0"
                >
                  {week}
                </th>
              ))
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border-muted">
          {tasks.map((task, idx) => (
            <tr
              key={task.id}
              className="hover:bg-bg-surface/30 transition-colors h-10"
            >
              <td className="p-3 border-r border-border-muted text-center text-text-muted font-mono">
                {String(idx + 1).padStart(2, "0")}
              </td>
              <td className="p-3 border-r border-border-muted font-inter font-medium text-text-secondary">
                {task.name}
              </td>
              {MONTHS.map((_, monthIdx) =>
                WEEKS.map((week) => {
                  const active = getCellActive(task.allocation, monthIdx, week);
                  return (
                    <td
                      key={`${monthIdx}-${week}`}
                      className="p-0 border-r border-border-muted text-center last:border-r-0 h-full"
                    >
                      <div
                        className={`w-full h-full min-h-10 transition-colors ${
                          active ? colorClass : "bg-transparent"
                        }`}
                      />
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkTimelineTable;
