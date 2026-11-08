export const collections = {
  hero: {
    label: "Hero",
    kind: "object",
    file: "src/data/content/hero.json",
  },
  projects: {
    label: "Proyek (Home)",
    kind: "array",
    file: "src/data/content/projects.json",
  },
  experiences: {
    label: "Pengalaman (Home)",
    kind: "array",
    file: "src/data/content/experiences.json",
  },
  "experience-categories": {
    label: "Kategori Pengalaman",
    kind: "array",
    file: "src/data/content/experience-categories.json",
  },
  "experiences-professional": {
    label: "Pengalaman - Professional",
    kind: "array",
    file: "src/data/content/experiences-professional.json",
  },
  "experiences-freelance": {
    label: "Pengalaman - Freelance",
    kind: "array",
    file: "src/data/content/experiences-freelance.json",
  },
  "experiences-volunteer": {
    label: "Pengalaman - Volunteer",
    kind: "array",
    file: "src/data/content/experiences-volunteer.json",
  },
  "experiences-bootcamp": {
    label: "Pengalaman - Bootcamp",
    kind: "array",
    file: "src/data/content/experiences-bootcamp.json",
  },
  skills: {
    label: "Keahlian",
    kind: "array",
    file: "src/data/content/skills.json",
  },
  certifications: {
    label: "Sertifikasi (Home)",
    kind: "array",
    file: "src/data/content/certifications.json",
  },
  "certification-gallery": {
    label: "Galeri Sertifikasi",
    kind: "array",
    file: "src/data/content/certification-gallery.json",
  },
  footer: {
    label: "Footer",
    kind: "object",
    file: "src/data/content/footer.json",
  },
  "project-details": {
    label: "Detail Proyek",
    kind: "array",
    file: "src/data/content/project-details.json",
  },
  "experience-details": {
    label: "Detail Pengalaman",
    kind: "array",
    file: "src/data/content/experience-details.json",
  },
};

export const collectionKeys = Object.keys(collections);

export function getCollection(key) {
  return collections[key];
}
