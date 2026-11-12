export const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const MIN_WEEKS = 1;
export const MAX_WEEKS = 4;
export const WEEK_KEYS = ["M1", "M2", "M3", "M4"];

// Singkat nama bulan jika panjang > 4 karakter
export function getMonthShort(monthName) {
  return monthName.length > 4 ? monthName.substring(0, 3) : monthName;
}

export function clampWeeks(value) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) return MAX_WEEKS;

  return Math.min(MAX_WEEKS, Math.max(MIN_WEEKS, parsed));
}

export function getVisibleWeeks(month) {
  return WEEK_KEYS.slice(0, clampWeeks(month?.weeks));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeMonthLabel(label, index) {
  return typeof label === "string" ? label : `Bulan ${index + 1}`;
}

function ensureUniqueMonthId(id, used) {
  const base = typeof id === "string" && id.trim() ? id.trim() : "month";
  let candidate = base;
  let suffix = 2;

  while (used.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  used.add(candidate);
  return candidate;
}

function buildLegacyMonths(timeline) {
  const startMonth = Math.min(
    12,
    Math.max(1, Number.parseInt(timeline?.startMonth, 10) || 1)
  );
  const startYear = Number.parseInt(timeline?.startYear, 10) || new Date().getFullYear();
  const duration = Math.min(
    60,
    Math.max(1, Number.parseInt(timeline?.durationMonths, 10) || 12)
  );

  return Array.from({ length: duration }, (_, index) => {
    const totalMonths = startMonth - 1 + index;
    const displayMonth = ((totalMonths % 12) + 12) % 12;
    const displayYear = startYear + Math.floor(totalMonths / 12);

    return {
      id: `month-${index + 1}`,
      label: `${getMonthShort(MONTH_NAMES[displayMonth])} ${displayYear}`,
      weeks: MAX_WEEKS,
    };
  });
}

function normalizeMonths(rawMonths) {
  const used = new Set();

  return rawMonths.map((month, index) => {
    const source = isObject(month) ? month : {};

    return {
      id: ensureUniqueMonthId(source.id ?? `month-${index + 1}`, used),
      label: normalizeMonthLabel(source.label, index),
      weeks: clampWeeks(source.weeks),
    };
  });
}

function normalizeAllocation(allocation, months) {
  const source = isObject(allocation) ? allocation : {};
  const result = {};

  months.forEach((month, monthIndex) => {
    const monthAllocation = isObject(source[month.id]) ? source[month.id] : null;
    const next = {};

    WEEK_KEYS.forEach((week) => {
      if (monthAllocation && monthAllocation[week] !== undefined) {
        next[week] = Boolean(monthAllocation[week]);
        return;
      }

      // Kompatibilitas data lama: key berbentuk "<index>-M1".
      const legacyKey = `${monthIndex}-${week}`;
      if (source[legacyKey] !== undefined) {
        next[week] = Boolean(source[legacyKey]);
      }
    });

    if (Object.keys(next).length > 0) {
      result[month.id] = next;
    }
  });

  return result;
}

export function normalizeTimeline(timeline) {
  const source = isObject(timeline) ? timeline : {};
  const hasLegacyFields =
    source.startMonth !== undefined ||
    source.startYear !== undefined ||
    source.durationMonths !== undefined;

  let months = [];

  if (Array.isArray(source.months)) {
    months = normalizeMonths(source.months);
  } else if (hasLegacyFields) {
    months = buildLegacyMonths(source);
  }

  const tasks = Array.isArray(source.tasks)
    ? source.tasks.map((task) => {
        const taskSource = isObject(task) ? task : {};

        return {
          ...taskSource,
          allocation: normalizeAllocation(taskSource.allocation, months),
        };
      })
    : [];

  return { months, tasks };
}

export function nextMonthId(months = []) {
  const list = Array.isArray(months) ? months : [];
  const used = new Set(list.map((month) => month?.id).filter(Boolean));
  let counter = list.length + 1;
  let candidate = `month-${counter}`;

  while (used.has(candidate)) {
    counter += 1;
    candidate = `month-${counter}`;
  }

  return candidate;
}

export function addMonth(months = [], label) {
  const list = Array.isArray(months) ? months : [];

  return [
    ...list,
    {
      id: nextMonthId(list),
      label: label ?? `Bulan ${list.length + 1}`,
      weeks: MAX_WEEKS,
    },
  ];
}

export function removeMonth(months = [], monthId) {
  return (Array.isArray(months) ? months : []).filter(
    (month) => month?.id !== monthId
  );
}

export function removeMonthFromTimeline(timeline, monthId) {
  const source = isObject(timeline) ? timeline : {};
  const tasks = (Array.isArray(source.tasks) ? source.tasks : []).map((task) => {
    const allocation = isObject(task?.allocation) ? task.allocation : {};

    if (!(monthId in allocation)) return task;

    const nextAllocation = { ...allocation };
    delete nextAllocation[monthId];

    return { ...task, allocation: nextAllocation };
  });

  return {
    ...source,
    months: removeMonth(source.months, monthId),
    tasks,
  };
}

export function hasAllocationBeyondWeek(tasks = [], monthId, weeks) {
  const limit = clampWeeks(weeks);

  return (Array.isArray(tasks) ? tasks : []).some((task) =>
    WEEK_KEYS.slice(limit).some(
      (week) => Boolean(task?.allocation?.[monthId]?.[week])
    )
  );
}

export function setMonthWeeks(timeline, monthId, weeks) {
  const source = isObject(timeline) ? timeline : {};
  const nextWeeks = clampWeeks(weeks);

  const months = (Array.isArray(source.months) ? source.months : []).map(
    (month) => (month?.id === monthId ? { ...month, weeks: nextWeeks } : month)
  );

  const tasks = (Array.isArray(source.tasks) ? source.tasks : []).map((task) => {
    const monthAllocation = task?.allocation?.[monthId];

    if (!isObject(monthAllocation)) return task;

    const nextAllocation = {};

    WEEK_KEYS.slice(0, nextWeeks).forEach((week) => {
      if (monthAllocation[week] !== undefined) {
        nextAllocation[week] = monthAllocation[week];
      }
    });

    return {
      ...task,
      allocation: {
        ...task.allocation,
        [monthId]: nextAllocation,
      },
    };
  });

  return { ...source, months, tasks };
}

export function setWeekAllocation(task, monthId, week, value) {
  const allocation = isObject(task?.allocation) ? task.allocation : {};
  const monthAllocation = isObject(allocation[monthId])
    ? allocation[monthId]
    : {};

  return {
    ...task,
    allocation: {
      ...allocation,
      [monthId]: {
        ...monthAllocation,
        [week]: Boolean(value),
      },
    },
  };
}

export function isWeekAllocated(task, monthId, week) {
  return Boolean(task?.allocation?.[monthId]?.[week]);
}
