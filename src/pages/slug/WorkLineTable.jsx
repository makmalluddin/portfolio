const months = [
  "DESEMBER 2025",
  "JANUARI 2026",
  "FEBRUARI 2026",
  "MARET 2026",
  "APRIL 2026",
  "MEI 2026",
  "JUNI 2026",
];

const timelineData = [
  {
    id: "01",
    task: "Perencanaan Arsitektur & Arsitektur Database",
    // 7 bulan x 4 minggu = 28 kolom minggu
    weeks: [
      true, true, true, false, // Des 2025
      false, false, false, false, // Jan 2026
      false, false, false, false, // Feb 2026
      false, false, false, false, // Mar 2026
      false, false, false, false, // Apr 2026
      false, false, false, false, // Mei 2026
      false, false, false, false, // Jun 2026
    ],
  },
  {
    id: "02",
    task: "Desain Antarmuka & Wireframing UI/UX",
    weeks: [
      false, true, true, true,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
    ],
  },
  {
    id: "03",
    task: "Pengembangan Core Backend & RESTful API",
    weeks: [
      false, false, false, true,
      true, true, true, true,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
    ],
  },
  {
    id: "04",
    task: "Pengembangan Frontend & Integrasi State Management",
    weeks: [
      false, false, false, false,
      false, false, true, true,
      true, true, true, true,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
    ],
  },
  {
    id: "05",
    task: "Integrasi Sistem, Fitur Real-time & Modul Tambahan",
    weeks: [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      true, true, true, true,
      true, true, false, false,
      false, false, false, false,
      false, false, false, false,
    ],
  },
  {
    id: "06",
    task: "Pengujian Sistem (QA, Unit Test & User Acceptance)",
    weeks: [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, true, true,
      true, true, false, false,
      false, false, false, false,
    ],
  },
  {
    id: "07",
    task: "Deployment Server, Optimalisasi & Dokumentasi",
    weeks: [
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, true, true,
      true, true, true, true,
    ],
  },
];

function WorkTimelineTable() {
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
            {months.map((month, idx) => (
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
            {months.map((_, mIdx) =>
              [1, 2, 3, 4].map((wNum) => (
                <th
                  key={`${mIdx}-${wNum}`}
                  className="p-2 2- border-r border-border-muted font-normal text-xs last:border-r-0"
                >
                  M{wNum}
                </th>
              ))
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-border-muted">
          {timelineData.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-bg-surface/30 transition-colors h-10"
            >
              <td className="p-3 border-r border-border-muted text-center text-text-muted font-mono">
                {row.id}
              </td>
              <td className="p-3 border-r border-border-muted font-inter font-medium text-text-secondary">
                {row.task}
              </td>
              {row.weeks.map((active, wIdx) => (
                <td
                  key={wIdx}
                  className="p-0 border-r border-border-muted text-center last:border-r-0 h-full"
                >
                  <div
                    className={`w-full h-full min-h-10 transition-colors ${
                      active ? "bg-green-blue-1" : "bg-transparent"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkTimelineTable;   