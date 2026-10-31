import { collections } from "./collections.mjs";
import { iconKeys } from "../../src/data/iconKeys.js";
import { colorVariants } from "../../src/data/colorVariants.js";
import { assetExists } from "./storage.mjs";

const iconKeySet = new Set(iconKeys);
const colorKeys = new Set(Object.keys(colorVariants));
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imageExtensionPattern = /\.(webp|png|jpe?g|svg|avif|gif)$/i;

function createResult() {
  return { errors: [], warnings: [] };
}

function addError(result, path, message) {
  result.errors.push({ path, message });
}

function addWarning(result, path, message) {
  result.warnings.push({ path, message });
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function requireString(result, value, path) {
  if (!isNonEmptyString(value)) {
    addError(result, path, "Wajib diisi dan harus berupa teks.");
    return false;
  }
  return true;
}

function requireSlug(result, value, path) {
  if (!requireString(result, value, path)) return;
  if (!slugPattern.test(value)) {
    addError(
      result,
      path,
      "Slug hanya boleh huruf kecil, angka, dan tanda hubung (contoh: corporate-website-revamp)."
    );
  }
}

function requireArray(result, value, path) {
  if (!Array.isArray(value)) {
    addError(result, path, "Harus berupa array.");
    return [];
  }
  return value;
}

function requireObject(result, value, path) {
  if (!isObject(value)) {
    addError(result, path, "Harus berupa object.");
    return {};
  }
  return value;
}

function requireIcon(result, value, path) {
  if (!isNonEmptyString(value) || !iconKeySet.has(value)) {
    addError(
      result,
      path,
      `Ikon tidak dikenal. Pilih salah satu: ${iconKeys.join(", ")}.`
    );
  }
}

function requireColor(result, value, path) {
  if (!isNonEmptyString(value) || !colorKeys.has(value)) {
    addError(
      result,
      path,
      `Warna tidak dikenal. Pilih salah satu: ${[...colorKeys].join(", ")}.`
    );
  }
}

function requireStringArray(result, value, path) {
  const items = requireArray(result, value, path);
  items.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      addError(result, `${path}.${index}`, "Harus berupa teks yang tidak kosong.");
    }
  });
}

async function requireAsset(result, value, path, { image = true } = {}) {
  if (!requireString(result, value, path)) return;

  if (/^(https?:|data:|blob:)/.test(value)) return;

  if (!value.startsWith("src/assets/")) {
    addWarning(
      result,
      path,
      "Path aset lokal sebaiknya diawali 'src/assets/'. Saat build, path ini tidak akan ter-resolve."
    );
    return;
  }

  if (image && !imageExtensionPattern.test(value)) {
    addWarning(result, path, "Ekstensi file bukan gambar yang didukung.");
  }

  if (!(await assetExists(value))) {
    addWarning(result, path, `File aset tidak ditemukan: ${value}`);
  }
}

function requireUnique(result, items, field, label) {
  const seen = new Map();

  items.forEach((item, index) => {
    if (!isObject(item)) return;
    const value = item[field];
    if (value === undefined || value === null || value === "") return;

    const key = String(value);
    if (seen.has(key)) {
      addError(
        result,
        `${label}.${index}.${field}`,
        `${field} duplikat dengan item ke-${seen.get(key) + 1}.`
      );
    } else {
      seen.set(key, index);
    }
  });
}

async function validateHero(result, data) {
  const hero = requireObject(result, data, "");

  [
    "location",
    "titleLine1",
    "titleLine2",
    "description",
    "statsTagline",
    "avatar",
    "cvUrl",
    "worksHref",
  ].forEach((field) => requireString(result, hero[field], field));

  await requireAsset(result, hero.avatar, "avatar", { image: true });
  await requireAsset(result, hero.cvUrl, "cvUrl", { image: false });

  const stats = requireArray(result, hero.stats, "stats");
  stats.forEach((item, index) => {
    const path = `stats.${index}`;
    if (!isObject(item)) {
      addError(result, path, "Harus berupa object.");
      return;
    }
    ["id", "value", "unit", "label"].forEach((field) =>
      requireString(result, item[field], `${path}.${field}`)
    );
  });
}

async function validateProjects(result, data) {
  const projects = requireArray(result, data, "projects");
  requireUnique(result, projects, "id", "projects");
  requireUnique(result, projects, "slug", "projects");

  for (const [index, project] of projects.entries()) {
    const path = `projects.${index}`;
    if (!isObject(project)) {
      addError(result, path, "Harus berupa object.");
      continue;
    }

    ["id", "number", "category", "title", "highlightTitle", "description"].forEach(
      (field) => requireString(result, project[field], `${path}.${field}`)
    );
    requireSlug(result, project.slug, `${path}.slug`);
    if (project.related !== undefined) {
      requireString(result, project.related, `${path}.related`);
    }
    requireColor(result, project.accentColor, `${path}.accentColor`);
    await requireAsset(result, project.image, `${path}.image`);
    requireStringArray(result, project.highlightTags, `${path}.highlightTags`);
    requireStringArray(result, project.tags, `${path}.tags`);
  }
}

async function validateExperiences(result, data) {
  const experiences = requireArray(result, data, "experiences");
  requireUnique(result, experiences, "id", "experiences");
  requireUnique(result, experiences, "slug", "experiences");

  experiences.forEach((experience, index) => {
    const path = `experiences.${index}`;
    if (!isObject(experience)) {
      addError(result, path, "Harus berupa object.");
      return;
    }

    ["id", "period", "role", "company", "type", "description"].forEach((field) =>
      requireString(result, experience[field], `${path}.${field}`)
    );
    requireSlug(result, experience.slug, `${path}.slug`);
  });
}

async function validateSkills(result, data) {
  const skills = requireArray(result, data, "skills");
  requireUnique(result, skills, "id", "skills");

  for (const [index, skill] of skills.entries()) {
    const path = `skills.${index}`;
    if (!isObject(skill)) {
      addError(result, path, "Harus berupa object.");
      continue;
    }

    requireString(result, skill.id, `${path}.id`);
    requireString(result, skill.category, `${path}.category`);
    requireIcon(result, skill.categoryIcon, `${path}.categoryIcon`);

    const tools = requireArray(result, skill.tools, `${path}.tools`);
    for (const [toolIndex, tool] of tools.entries()) {
      const toolPath = `${path}.tools.${toolIndex}`;
      if (!isObject(tool)) {
        addError(result, toolPath, "Harus berupa object.");
        continue;
      }
      requireString(result, tool.name, `${toolPath}.name`);
      await requireAsset(result, tool.iconUrl, `${toolPath}.iconUrl`);
    }
  }
}

async function validateCertifications(result, data) {
  const certifications = requireArray(result, data, "certifications");
  requireUnique(result, certifications, "id", "certifications");

  certifications.forEach((certification, index) => {
    const path = `certifications.${index}`;
    if (!isObject(certification)) {
      addError(result, path, "Harus berupa object.");
      return;
    }

    ["id", "title", "issuer", "type", "duration"].forEach((field) =>
      requireString(result, certification[field], `${path}.${field}`)
    );

    const metadata = requireArray(
      result,
      certification.metadata,
      `${path}.metadata`
    );
    metadata.forEach((item, metaIndex) => {
      const metaPath = `${path}.metadata.${metaIndex}`;
      if (!isObject(item)) {
        addError(result, metaPath, "Harus berupa object.");
        return;
      }
      requireString(result, item.label, `${metaPath}.label`);
      requireString(result, item.value, `${metaPath}.value`);
    });
  });
}

async function validateCertificationGallery(result, data) {
  const certifications = requireArray(result, data, "certifications");
  requireUnique(result, certifications, "id", "certifications");

  for (const [index, certification] of certifications.entries()) {
    const path = `certifications.${index}`;
    if (!isObject(certification)) {
      addError(result, path, "Harus berupa object.");
      continue;
    }

    ["id", "title", "type", "issueYear", "expiryYear", "credentialUrl"].forEach(
      (field) => requireString(result, certification[field], `${path}.${field}`)
    );
    await requireAsset(result, certification.image, `${path}.image`);
  }
}

async function validateFooter(result, data) {
  const footer = requireObject(result, data, "");
  const cta = requireObject(result, footer.cta, "cta");

  [
    "titleLine1",
    "titleLine2",
    "titleHighlight",
    "description",
    "buttonText",
    "buttonHref",
  ].forEach((field) => requireString(result, cta[field], `cta.${field}`));

  const directLinks = requireArray(result, footer.directLinks, "directLinks");
  directLinks.forEach((link, index) => {
    const path = `directLinks.${index}`;
    if (!isObject(link)) {
      addError(result, path, "Harus berupa object.");
      return;
    }
    ["id", "label", "href"].forEach((field) =>
      requireString(result, link[field], `${path}.${field}`)
    );
  });

  const exploreLinks = requireArray(result, footer.exploreLinks, "exploreLinks");
  exploreLinks.forEach((link, index) => {
    const path = `exploreLinks.${index}`;
    if (!isObject(link)) {
      addError(result, path, "Harus berupa object.");
      return;
    }
    ["id", "label", "path"].forEach((field) =>
      requireString(result, link[field], `${path}.${field}`)
    );
  });

  const socialLinks = requireArray(result, footer.socialLinks, "socialLinks");
  socialLinks.forEach((link, index) => {
    const path = `socialLinks.${index}`;
    if (!isObject(link)) {
      addError(result, path, "Harus berupa object.");
      return;
    }
    ["id", "label", "href"].forEach((field) =>
      requireString(result, link[field], `${path}.${field}`)
    );
  });

  const copyright = requireObject(result, footer.copyright, "copyright");
  requireString(result, copyright.name, "copyright.name");
  requireString(result, copyright.year, "copyright.year");
}

async function validateProjectDetails(result, data) {
  const projects = requireArray(result, data, "project-details");
  requireUnique(result, projects, "id", "project-details");
  requireUnique(result, projects, "slug", "project-details");

  for (const [index, project] of projects.entries()) {
    const path = `project-details.${index}`;
    if (!isObject(project)) {
      addError(result, path, "Harus berupa object.");
      continue;
    }

    [
      "id",
      "categoryTitle",
      "titlePrefix",
      "highlightedWord",
      "titleSuffix",
      "description",
      "repoUrl",
      "liveDemoUrl",
    ].forEach((field) => requireString(result, project[field], `${path}.${field}`));

    requireSlug(result, project.slug, `${path}.slug`);
    requireColor(result, project.colorVariantKey, `${path}.colorVariantKey`);
    await requireAsset(result, project.heroImage, `${path}.heroImage`);

    const metaData = requireArray(result, project.metaData, `${path}.metaData`);
    metaData.forEach((item, metaIndex) => {
      const metaPath = `${path}.metaData.${metaIndex}`;
      if (!isObject(item)) {
        addError(result, metaPath, "Harus berupa object.");
        return;
      }
      requireString(result, item.id, `${metaPath}.id`);
      requireString(result, item.value, `${metaPath}.value`);
      requireIcon(result, item.icon, `${metaPath}.icon`);
    });

    const contexts = requireArray(result, project.contexts, `${path}.contexts`);
    contexts.forEach((item, contextIndex) => {
      const contextPath = `${path}.contexts.${contextIndex}`;
      if (!isObject(item)) {
        addError(result, contextPath, "Harus berupa object.");
        return;
      }
      ["id", "title", "description"].forEach((field) =>
        requireString(result, item[field], `${contextPath}.${field}`)
      );
    });

    const gallery = requireArray(result, project.galery, `${path}.galery`);
    for (const [galleryIndex, item] of gallery.entries()) {
      const galleryPath = `${path}.galery.${galleryIndex}`;
      if (!isObject(item)) {
        addError(result, galleryPath, "Harus berupa object.");
        continue;
      }
      requireString(result, item.id, `${galleryPath}.id`);
      requireString(result, item.caption, `${galleryPath}.caption`);
      await requireAsset(result, item.image, `${galleryPath}.image`);
    }
  }
}

async function validateExperienceDetails(result, data) {
  const experiences = requireArray(result, data, "experience-details");
  requireUnique(result, experiences, "id", "experience-details");
  requireUnique(result, experiences, "slug", "experience-details");

  for (const [index, experience] of experiences.entries()) {
    const path = `experience-details.${index}`;
    if (!isObject(experience)) {
      addError(result, path, "Harus berupa object.");
      continue;
    }

    [
      "id",
      "role",
      "companyName",
      "caption",
      "relatedProjectKey",
    ].forEach((field) =>
      requireString(result, experience[field], `${path}.${field}`)
    );

    requireSlug(result, experience.slug, `${path}.slug`);
    await requireAsset(result, experience.logo, `${path}.logo`);

    const metaData = requireArray(result, experience.metaData, `${path}.metaData`);
    metaData.forEach((item, metaIndex) => {
      const metaPath = `${path}.metaData.${metaIndex}`;
      if (!isObject(item)) {
        addError(result, metaPath, "Harus berupa object.");
        return;
      }
      requireString(result, item.id, `${metaPath}.id`);
      requireString(result, item.value, `${metaPath}.value`);
      requireIcon(result, item.icon, `${metaPath}.icon`);
    });

    const details = requireArray(
      result,
      experience.detailPengalaman,
      `${path}.detailPengalaman`
    );
    details.forEach((item, detailIndex) => {
      const detailPath = `${path}.detailPengalaman.${detailIndex}`;
      if (!isObject(item)) {
        addError(result, detailPath, "Harus berupa object.");
        return;
      }
      ["id", "title", "description"].forEach((field) =>
        requireString(result, item[field], `${detailPath}.${field}`)
      );
      requireIcon(result, item.icon, `${detailPath}.icon`);
    });

    const technology = requireArray(
      result,
      experience.teknologi,
      `${path}.teknologi`
    );
    technology.forEach((item, technologyIndex) => {
      const technologyPath = `${path}.teknologi.${technologyIndex}`;
      if (!isObject(item)) {
        addError(result, technologyPath, "Harus berupa object.");
        return;
      }
      requireString(result, item.id, `${technologyPath}.id`);
      requireString(result, item.type, `${technologyPath}.type`);
      requireString(result, item.tools, `${technologyPath}.tools`);
    });
  }
}

const validators = {
  hero: validateHero,
  projects: validateProjects,
  experiences: validateExperiences,
  skills: validateSkills,
  certifications: validateCertifications,
  "certification-gallery": validateCertificationGallery,
  footer: validateFooter,
  "project-details": validateProjectDetails,
  "experience-details": validateExperienceDetails,
};

export async function validateCollection(key, data) {
  const result = createResult();
  const validator = validators[key];

  if (!collections[key] || !validator) {
    addError(result, "", `Koleksi tidak dikenal: ${key}`);
    return result;
  }

  if (data === undefined) {
    addError(result, "", "Data wajib dikirim.");
    return result;
  }

  await validator(result, data);
  return result;
}

export async function integrityWarnings(snapshot) {
  const result = createResult();

  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const projectDetails = Array.isArray(snapshot["project-details"])
    ? snapshot["project-details"]
    : [];
  const experiences = Array.isArray(snapshot.experiences)
    ? snapshot.experiences
    : [];
  const experienceDetails = Array.isArray(snapshot["experience-details"])
    ? snapshot["experience-details"]
    : [];

  const projectSlugs = new Set(
    projects.map((project) => project?.slug).filter(Boolean)
  );
  const detailSlugs = new Set(
    projectDetails.map((detail) => detail?.slug).filter(Boolean)
  );
  const experienceSlugs = new Set(
    experiences.map((experience) => experience?.slug).filter(Boolean)
  );
  const experienceDetailSlugs = new Set(
    experienceDetails.map((detail) => detail?.slug).filter(Boolean)
  );
  const relatedKeys = new Set(
    experienceDetails
      .map((detail) => detail?.relatedProjectKey)
      .filter(Boolean)
  );

  projects.forEach((project, index) => {
    if (!detailSlugs.has(project.slug)) {
      addWarning(
        result,
        `projects.${index}.slug`,
        `Proyek "${project.slug}" belum punya halaman detail dan akan mengarah ke 404.`
      );
    }

    if (project.related && !relatedKeys.has(project.related)) {
      addWarning(
        result,
        `projects.${index}.related`,
        `Relasi "${project.related}" belum punya detail pengalaman dengan relatedProjectKey yang sama.`
      );
    }
  });

  experiences.forEach((experience, index) => {
    if (!experienceDetailSlugs.has(experience.slug)) {
      addWarning(
        result,
        `experiences.${index}.slug`,
        `Pengalaman "${experience.slug}" belum punya halaman detail dan akan mengarah ke 404.`
      );
    }
  });

  projectDetails.forEach((detail, index) => {
    if (!projectSlugs.has(detail.slug)) {
      addWarning(
        result,
        `project-details.${index}.slug`,
        `Detail proyek "${detail.slug}" tidak punya kartu proyek di halaman utama.`
      );
    }
  });

  experienceDetails.forEach((detail, index) => {
    if (!experienceSlugs.has(detail.slug)) {
      addWarning(
        result,
        `experience-details.${index}.slug`,
        `Detail pengalaman "${detail.slug}" tidak punya kartu pengalaman di halaman utama.`
      );
    }
  });

  if (snapshot.footer && Array.isArray(snapshot.footer.exploreLinks)) {
    snapshot.footer.exploreLinks.forEach((link, index) => {
      if (typeof link?.path === "string" && link.path.startsWith("#")) {
        const anchor = link.path.slice(1);
        if (!["hero", "projects", "experiences", "skills", "certifications"].includes(anchor)) {
          addWarning(
            result,
            `footer.exploreLinks.${index}.path`,
            `Anchor "${link.path}" tidak cocok dengan section mana pun.`
          );
        }
      }
    });
  }

  return result.warnings;
}

export async function validateWithIntegrity(key, data, snapshot) {
  const structural = await validateCollection(key, data);
  const nextSnapshot = { ...snapshot, [key]: data };
  const integrity = await integrityWarnings(nextSnapshot);

  return {
    errors: structural.errors,
    warnings: [...structural.warnings, ...integrity],
  };
}
