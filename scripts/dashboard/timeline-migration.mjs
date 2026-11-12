import { pathToFileURL } from "node:url";
import { readCollection, writeCollection } from "./storage.mjs";
import { normalizeTimeline } from "../../src/utils/timeline.js";
import { validateCollection } from "./validate.mjs";

const COLLECTION_KEY = "experience-details";

export function migrateExperienceDetails(data) {
  if (!Array.isArray(data)) {
    return { data, changed: 0 };
  }

  let changed = 0;

  const migrated = data.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      !item.timeline ||
      typeof item.timeline !== "object"
    ) {
      return item;
    }

    const timeline = normalizeTimeline(item.timeline);

    if (JSON.stringify(timeline) === JSON.stringify(item.timeline)) {
      return item;
    }

    changed += 1;
    return { ...item, timeline };
  });

  return { data: migrated, changed };
}

async function run() {
  const { data } = await readCollection(COLLECTION_KEY);
  const { data: migrated, changed } = migrateExperienceDetails(data);

  if (changed === 0) {
    console.log("Tidak ada timeline lama yang perlu dimigrasi.");
    return;
  }

  const validation = await validateCollection(COLLECTION_KEY, migrated);

  if (validation.errors.length > 0) {
    console.error("Migrasi dibatalkan karena data hasil migrasi tidak valid:");
    validation.errors.forEach((error) => {
      console.error(`- ${error.path}: ${error.message}`);
    });
    process.exitCode = 1;
    return;
  }

  await writeCollection(COLLECTION_KEY, migrated);
  console.log(
    `${changed} timeline dimigrasi ke format months/tasks. Backup dibuat otomatis di .dashboard/backups/${COLLECTION_KEY}.`
  );
}

const isDirectRun =
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url;

if (isDirectRun) {
  run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
