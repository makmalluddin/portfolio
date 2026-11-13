import test from "node:test";
import assert from "node:assert/strict";
import {
  addMonth,
  hasAllocationBeyondWeek,
  isWeekAllocated,
  nextMonthId,
  normalizeTimeline,
  removeMonthFromTimeline,
  setMonthWeeks,
  setWeekAllocation,
} from "../../src/utils/timeline.js";

test("normalizeTimeline mengubah data lama menjadi months dan allocation baru", () => {
  const timeline = {
    startMonth: 11,
    startYear: 2026,
    durationMonths: 3,
    tasks: [
      {
        id: "task-1",
        name: "Training",
        allocation: {
          "0-M1": true,
          "1-M2": true,
        },
      },
    ],
  };

  const result = normalizeTimeline(timeline);

  assert.equal(result.months.length, 3);
  assert.deepEqual(
    result.months.map((month) => month.label),
    ["Nov 2026", "Des 2026", "Jan 2027"]
  );
  assert.deepEqual(
    result.months.map((month) => month.weeks),
    [4, 4, 4]
  );
  assert.deepEqual(result.tasks[0].allocation, {
    "month-1": { M1: true },
    "month-2": { M2: true },
  });
  assert.equal("startMonth" in result, false);
  assert.equal("startYear" in result, false);
  assert.equal("durationMonths" in result, false);
});

test("normalizeTimeline mempertahankan data bentuk baru", () => {
  const result = normalizeTimeline({
    months: [
      { id: "month-a", label: "Nov 2026", weeks: 2 },
      { id: "month-b", label: "Des 2026", weeks: 3 },
    ],
    tasks: [
      {
        id: "task-1",
        name: "Rilis",
        allocation: {
          "month-a": { M1: true, M2: false },
          "month-b": { M1: true },
        },
      },
    ],
  });

  assert.deepEqual(result.months, [
    { id: "month-a", label: "Nov 2026", weeks: 2 },
    { id: "month-b", label: "Des 2026", weeks: 3 },
  ]);
  assert.deepEqual(result.tasks[0].allocation, {
    "month-a": { M1: true, M2: false },
    "month-b": { M1: true },
  });
});

test("normalizeTimeline memberi weeks default 4 dan label fallback", () => {
  const result = normalizeTimeline({
    months: [{ id: "month-a" }],
    tasks: [],
  });

  assert.equal(result.months[0].weeks, 4);
  assert.equal(result.months[0].label, "Bulan 1");
});

test("normalizeTimeline merapikan id bulan yang duplikat", () => {
  const result = normalizeTimeline({
    months: [
      { id: "month-1", label: "Satu" },
      { id: "month-1", label: "Dua" },
    ],
    tasks: [],
  });

  assert.deepEqual(
    result.months.map((month) => month.id),
    ["month-1", "month-1-2"]
  );
});

test("normalizeTimeline tidak menggenerate bulan lama jika months sudah array kosong", () => {
  const result = normalizeTimeline({
    months: [],
    startMonth: 1,
    startYear: 2026,
    durationMonths: 12,
    tasks: [],
  });

  assert.deepEqual(result.months, []);
});

test("normalizeTimeline aman untuk timeline kosong atau null", () => {
  assert.deepEqual(normalizeTimeline(null), { months: [], tasks: [] });
  assert.deepEqual(normalizeTimeline(undefined), { months: [], tasks: [] });
  assert.deepEqual(normalizeTimeline({}), { months: [], tasks: [] });
  assert.deepEqual(normalizeTimeline({ tasks: [] }), {
    months: [],
    tasks: [],
  });
});

test("nextMonthId menghasilkan id yang unik", () => {
  assert.equal(nextMonthId([]), "month-1");
  assert.equal(nextMonthId([{ id: "month-1" }]), "month-2");
  assert.equal(
    nextMonthId([{ id: "month-1" }, { id: "month-3" }]),
    "month-4"
  );
});

test("addMonth menambah bulan dengan default 4 minggu", () => {
  const months = [{ id: "month-1", label: "Nov 2026", weeks: 2 }];
  const result = addMonth(months);

  assert.equal(result.length, 2);
  assert.equal(result[1].id, "month-2");
  assert.equal(result[1].label, "Bulan 2");
  assert.equal(result[1].weeks, 4);
});

test("removeMonthFromTimeline hanya menghapus allocation bulan terkait", () => {
  const timeline = {
    months: [
      { id: "month-1", label: "Nov 2026", weeks: 4 },
      { id: "month-2", label: "Des 2026", weeks: 4 },
    ],
    tasks: [
      {
        id: "task-1",
        name: "Training",
        allocation: {
          "month-1": { M1: true },
          "month-2": { M2: true },
        },
      },
    ],
  };

  const result = removeMonthFromTimeline(timeline, "month-1");

  assert.deepEqual(
    result.months.map((month) => month.id),
    ["month-2"]
  );
  assert.deepEqual(result.tasks[0].allocation, {
    "month-2": { M2: true },
  });
});

test("hasAllocationBeyondWeek mendeteksi alokasi di minggu yang akan dihapus", () => {
  const tasks = [
    {
      id: "task-1",
      allocation: {
        "month-1": { M1: true, M3: true },
      },
    },
  ];

  assert.equal(hasAllocationBeyondWeek(tasks, "month-1", 2), true);
  assert.equal(hasAllocationBeyondWeek(tasks, "month-1", 3), false);
  assert.equal(hasAllocationBeyondWeek(tasks, "month-2", 2), false);
});

test("setMonthWeeks memangkas allocation di luar jumlah grid baru", () => {
  const timeline = {
    months: [
      { id: "month-1", label: "Nov 2026", weeks: 4 },
      { id: "month-2", label: "Des 2026", weeks: 4 },
    ],
    tasks: [
      {
        id: "task-1",
        name: "Training",
        allocation: {
          "month-1": { M1: true, M2: false, M3: true, M4: false },
          "month-2": { M1: true },
        },
      },
    ],
  };

  const result = setMonthWeeks(timeline, "month-1", 2);

  assert.equal(result.months[0].weeks, 2);
  assert.deepEqual(result.tasks[0].allocation["month-1"], {
    M1: true,
    M2: false,
  });
  assert.deepEqual(result.tasks[0].allocation["month-2"], { M1: true });
});

test("setMonthWeeks membatasi nilai ke 1-4", () => {
  const timeline = {
    months: [{ id: "month-1", label: "Nov 2026", weeks: 4 }],
    tasks: [],
  };

  assert.equal(setMonthWeeks(timeline, "month-1", 0).months[0].weeks, 1);
  assert.equal(setMonthWeeks(timeline, "month-1", 9).months[0].weeks, 4);
});

test("setWeekAllocation tidak memutasi task lama", () => {
  const task = {
    id: "task-1",
    name: "Training",
    allocation: {
      "month-1": { M1: true },
    },
  };

  const result = setWeekAllocation(task, "month-1", "M2", true);

  assert.deepEqual(task.allocation, {
    "month-1": { M1: true },
  });
  assert.deepEqual(result.allocation, {
    "month-1": { M1: true, M2: true },
  });
  assert.equal(isWeekAllocated(result, "month-1", "M2"), true);
  assert.equal(isWeekAllocated(result, "month-1", "M3"), false);
});
