import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateCollection } from "./validate.mjs";
import { migrateExperienceDetails } from "./timeline-migration.mjs";

const DATA_FILE = new URL(
  "../../src/data/content/experience-details.json",
  import.meta.url
);

function loadExperienceDetails() {
  return JSON.parse(readFileSync(DATA_FILE, "utf8"));
}

function findIndexWithMonths(items, count = 2) {
  return items.findIndex(
    (item) => (item?.timeline?.months?.length ?? 0) >= count
  );
}

test("migrasi data asli menghasilkan bentuk months/tasks", () => {
  const original = loadExperienceDetails();
  const { data } = migrateExperienceDetails(original);

  data.forEach((item) => {
    if (!item.timeline) return;

    assert.ok(Array.isArray(item.timeline.months));
    assert.ok(item.timeline.months.length > 0);
    assert.equal("startMonth" in item.timeline, false);
    assert.equal("startYear" in item.timeline, false);
    assert.equal("durationMonths" in item.timeline, false);
    item.timeline.months.forEach((month) => {
      assert.equal(typeof month.id, "string");
      assert.equal(typeof month.label, "string");
      assert.ok(month.weeks >= 1 && month.weeks <= 4);
    });
  });
});

test("migrasi mengubah timeline bentuk lama", () => {
  const original = [
    {
      id: "1",
      timeline: {
        startMonth: 11,
        startYear: 2026,
        durationMonths: 2,
        tasks: [
          {
            id: "task-1",
            name: "Training",
            allocation: { "0-M1": true, "1-M2": true },
          },
        ],
      },
    },
  ];

  const { data, changed } = migrateExperienceDetails(original);

  assert.equal(changed, 1);
  assert.deepEqual(
    data[0].timeline.months.map((month) => month.label),
    ["Nov 2026", "Des 2026"]
  );
  assert.deepEqual(data[0].timeline.tasks[0].allocation, {
    "month-1": { M1: true },
    "month-2": { M2: true },
  });
});

test("migrasi bersifat idempotent", () => {
  const original = loadExperienceDetails();
  const first = migrateExperienceDetails(original);
  const second = migrateExperienceDetails(first.data);

  assert.equal(second.changed, 0);
  assert.deepEqual(second.data, first.data);
});

test("data hasil migrasi lolos validasi", async () => {
  const original = loadExperienceDetails();
  const { data } = migrateExperienceDetails(original);
  const result = await validateCollection("experience-details", data);

  assert.deepEqual(result.errors, []);
});

test("validator menolak jumlah minggu di luar 1-4", async () => {
  const original = loadExperienceDetails();
  const { data } = migrateExperienceDetails(original);
  const index = findIndexWithMonths(data);
  assert.notEqual(index, -1);

  const invalidZero = structuredClone(data);
  invalidZero[index].timeline.months[0].weeks = 0;
  const zeroResult = await validateCollection("experience-details", invalidZero);
  assert.ok(
    zeroResult.errors.some((error) =>
      error.path.endsWith(".timeline.months.0.weeks")
    )
  );

  const invalidFive = structuredClone(data);
  invalidFive[index].timeline.months[0].weeks = 5;
  const fiveResult = await validateCollection("experience-details", invalidFive);
  assert.ok(
    fiveResult.errors.some((error) =>
      error.path.endsWith(".timeline.months.0.weeks")
    )
  );
});

test("validator menolak months yang bukan array", async () => {
  const original = loadExperienceDetails();
  const { data } = migrateExperienceDetails(original);
  const index = findIndexWithMonths(data);
  assert.notEqual(index, -1);

  const invalid = structuredClone(data);
  invalid[index].timeline.months = {};

  const result = await validateCollection("experience-details", invalid);

  assert.ok(
    result.errors.some((error) =>
      error.path.endsWith(".timeline.months")
    )
  );
});

test("validator menolak id bulan duplikat", async () => {
  const original = loadExperienceDetails();
  const { data } = migrateExperienceDetails(original);
  const index = findIndexWithMonths(data);
  assert.notEqual(index, -1);

  const invalid = structuredClone(data);
  invalid[index].timeline.months[1].id =
    invalid[index].timeline.months[0].id;

  const result = await validateCollection("experience-details", invalid);

  assert.ok(
    result.errors.some((error) =>
      error.path.endsWith(".timeline.months.1.id")
    )
  );
});
