import { experienceCategoryIdByCollectionKey } from "../data/experienceCategoryCollections";
import { socialIconKeys } from "../data/socialIconKeys";
import { nextId } from "./utils";

const text = (key, label, extra = {}) => ({ key, label, type: "text", ...extra });
const textarea = (key, label, extra = {}) => ({
  key,
  label,
  type: "textarea",
  rows: 4,
  ...extra,
});
const image = (key, label, extra = {}) => ({ key, label, type: "image", ...extra });
const icon = (key, label, extra = {}) => ({ key, label, type: "icon", ...extra });
const color = (key, label, extra = {}) => ({ key, label, type: "color", ...extra });
const tags = (key, label, extra = {}) => ({
  key,
  label,
  type: "string-list",
  addLabel: "Tambah item",
  ...extra,
});

const idField = (extra = {}) =>
  text("id", "ID", {
    help: "Dibuat otomatis, boleh diubah manual.",
    ...extra,
  });

const repeater = (key, label, fields, { createItem, itemLabel, addLabel, ...extra }) => ({
  key,
  label,
  type: "repeater",
  fields,
  createItem,
  itemLabel,
  addLabel: addLabel ?? "Tambah item",
  ...extra,
});

const metaRepeater = (key = "metaData", label = "Metadata") =>
  repeater(
    key,
    label,
    [
      idField(),
      icon("icon", "Ikon"),
      text("value", "Nilai"),
    ],
    {
      itemLabel: (item, index) => item.value || `Metadata ${index + 1}`,
      createItem: (items) => ({ id: nextId(items, "meta"), icon: "calendar", value: "" }),
    }
  );

export const collectionGroups = [
  {
    label: "Ringkasan",
    items: ["overview"],
  },
  {
    label: "Konten Utama",
    items: ["hero", "projects", "experiences", "skills", "certifications"],
  },
  {
    label: "Pengalaman (Categories)",
    items: ["experience-categories", "experiences-professional", "experiences-freelance", "experiences-volunteer", "experiences-bootcamp"],
  },
  {
    label: "Halaman Detail",
    items: ["project-details", "experience-details", "certification-gallery"],
  },
  {
    label: "Global",
    items: ["navbar", "footer"],
  },
  {
    label: "Referensi",
    items: ["colors", "icons"],
  },
];

export const collectionSchemas = {
  hero: {
    key: "hero",
    label: "Hero",
    kind: "object",
    description: "Bagian pembuka: sapaan, deskripsi, avatar, CV, dan statistik.",
    fields: [
      text("location", "Lokasi"),
      text("titleLine1", "Judul baris 1"),
      text("titleLine2", "Judul baris 2"),
      textarea("description", "Deskripsi", { rows: 5 }),
      text("statsTagline", "Tagline statistik"),
      image("avatar", "Avatar", { accept: "image" }),
      {
        key: "cvUrl",
        label: "File CV",
        type: "file",
        accept: "file",
        help: "Pilih PDF dari aset atau tempel URL.",
      },
      text("worksHref", "Link tombol My Works"),
      repeater(
        "stats",
        "Statistik",
        [
          idField(),
          text("value", "Nilai"),
          text("unit", "Satuan"),
          text("label", "Label"),
        ],
        {
          itemLabel: (item, index) => item.label || `Statistik ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "stat"),
            value: "",
            unit: "",
            label: "",
          }),
        }
      ),
    ],
  },

  projects: {
    key: "projects",
    label: "Proyek",
    kind: "array",
    description: "Kartu proyek di halaman utama. Slug harus punya halaman detail.",
    itemLabel: (item) =>
      [item.number, item.title, item.highlightTitle].filter(Boolean).join(" ") ||
      item.slug ||
      "Proyek baru",
    itemSubtitle: (item) => [item.category, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "project"),
      slug: "",
      number: String((items?.length ?? 0) + 1).padStart(2, "0"),
      category: "",
      title: "",
      highlightTitle: "",
      description: "",
      image: "",
      highlightTags: [],
      tags: [],
      accentColor: "blue-1",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "title",
        help: "Dipakai di URL /projects/:slug.",
      }),
      text("number", "Nomor"),
      text("category", "Kategori"),
      text("title", "Judul"),
      text("highlightTitle", "Judul sorotan"),
      textarea("description", "Deskripsi"),
      image("image", "Gambar kartu"),
      tags("highlightTags", "Highlight tags"),
      tags("tags", "Tags"),
      color("accentColor", "Warna aksen"),
    ],
  },

  experiences: {
    key: "experiences",
    label: "Pengalaman",
    kind: "array",
    description: "Kartu pengalaman kerja di halaman utama.",
    itemLabel: (item) => item.role || item.slug || "Pengalaman baru",
    itemSubtitle: (item) => [item.company, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "experience"),
      slug: "",
      period: "",
      role: "",
      company: "",
      type: "INTERNSHIP",
      description: "",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Dipakai di URL /experience/:slug.",
      }),
      text("period", "Periode"),
      text("role", "Peran"),
      text("company", "Perusahaan"),
      text("type", "Tipe"),
      textarea("description", "Deskripsi"),
    ],
  },

  "experience-categories": {
    key: "experience-categories",
    label: "Kategori Pengalaman",
    kind: "array",
    description: "Daftar kategori pengalaman (Professional, Freelance, Volunteer, Bootcamp, dll).",
    itemLabel: (item) => item.label || "Kategori baru",
    itemSubtitle: (item) => item.id,
    createItem: (items) => ({
      id: nextId(items, "cat"),
      label: "",
    }),
    fields: [
      idField(),
      text("label", "Nama kategori", {
        help: "Contoh: Professional, Freelance, Volunteer, Bootcamp",
      }),
    ],
  },

  "experiences-professional": {
    key: "experiences-professional",
    label: "Pengalaman - Professional",
    kind: "array",
    description: "Pengalaman kerja profesional, full-time, contract.",
    itemLabel: (item) => item.role || item.slug || "Pengalaman baru",
    itemSubtitle: (item) => [item.company, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "exp"),
      slug: "",
      period: "",
      role: "",
      company: "",
      type: "CONTRACT",
      description: "",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Dipakai di URL /experience/:slug.",
      }),
      text("period", "Periode"),
      text("role", "Peran"),
      text("company", "Perusahaan"),
      text("type", "Tipe"),
      textarea("description", "Deskripsi"),
    ],
  },

  "experiences-freelance": {
    key: "experiences-freelance",
    label: "Pengalaman - Freelance",
    kind: "array",
    description: "Proyek freelance, part-time, remote.",
    itemLabel: (item) => item.role || item.slug || "Pengalaman baru",
    itemSubtitle: (item) => [item.company, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "exp"),
      slug: "",
      period: "",
      role: "",
      company: "",
      type: "FREELANCE",
      description: "",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Dipakai di URL /experience/:slug.",
      }),
      text("period", "Periode"),
      text("role", "Peran"),
      text("company", "Perusahaan"),
      text("type", "Tipe"),
      textarea("description", "Deskripsi"),
    ],
  },

  "experiences-volunteer": {
    key: "experiences-volunteer",
    label: "Pengalaman - Volunteer",
    kind: "array",
    description: "Pengalaman volunteer, NGO, community work.",
    itemLabel: (item) => item.role || item.slug || "Pengalaman baru",
    itemSubtitle: (item) => [item.company, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "exp"),
      slug: "",
      period: "",
      role: "",
      company: "",
      type: "VOLUNTEER",
      description: "",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Dipakai di URL /experience/:slug.",
      }),
      text("period", "Periode"),
      text("role", "Peran"),
      text("company", "Perusahaan"),
      text("type", "Tipe"),
      textarea("description", "Deskripsi"),
    ],
  },

  "experiences-bootcamp": {
    key: "experiences-bootcamp",
    label: "Pengalaman - Bootcamp",
    kind: "array",
    description: "Program bootcamp, intensive training, courses.",
    itemLabel: (item) => item.role || item.slug || "Pengalaman baru",
    itemSubtitle: (item) => [item.company, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "exp"),
      slug: "",
      period: "",
      role: "",
      company: "",
      type: "BOOTCAMP",
      description: "",
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Dipakai di URL /experience/:slug.",
      }),
      text("period", "Periode"),
      text("role", "Peran"),
      text("company", "Perusahaan"),
      text("type", "Tipe"),
      textarea("description", "Deskripsi"),
    ],
  },

  skills: {
    key: "skills",
    label: "Keahlian",
    kind: "array",
    description: "Kategori keahlian dan daftar tools di dalamnya.",
    itemLabel: (item) => item.category || "Kategori baru",
    itemSubtitle: (item) => `${item.tools?.length ?? 0} tools`,
    createItem: (items) => ({
      id: nextId(items, "skill"),
      category: "",
      categoryIcon: "code",
      tools: [],
    }),
    fields: [
      idField(),
      text("category", "Kategori"),
      icon("categoryIcon", "Ikon kategori"),
      repeater(
        "tools",
        "Tools",
        [
          text("name", "Nama"),
          image("iconUrl", "Ikon / URL", {
            accept: "image",
            help: "Boleh path aset lokal atau URL eksternal.",
          }),
        ],
        {
          itemLabel: (item, index) => item.name || `Tool ${index + 1}`,
          createItem: () => ({ name: "", iconUrl: "" }),
        }
      ),
    ],
  },

  certifications: {
    key: "certifications",
    label: "Sertifikasi",
    kind: "array",
    description: "Kartu sertifikasi dan pelatihan di halaman utama.",
    itemLabel: (item) => item.title || "Sertifikasi baru",
    itemSubtitle: (item) => [item.issuer, item.type].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "cert"),
      title: "",
      issuer: "",
      type: "SERTIFIKAT",
      slug: "certifications",
      duration: "",
      metadata: [],
    }),
    fields: [
      idField(),
      text("title", "Judul"),
      text("issuer", "Penerbit"),
      text("type", "Tipe"),
      text("slug", "Slug", {
        help: "Dipertahankan untuk kompatibilitas data lama.",
      }),
      text("duration", "Durasi / keterangan"),
      repeater(
        "metadata",
        "Metadata",
        [text("label", "Label"), text("value", "Nilai")],
        {
          itemLabel: (item, index) => item.label || `Metadata ${index + 1}`,
          createItem: () => ({ label: "", value: "" }),
        }
      ),
    ],
  },

  "certification-gallery": {
    key: "certification-gallery",
    label: "Galeri Sertifikasi",
    kind: "array",
    description: "Item galeri di halaman /certifications.",
    itemLabel: (item) => item.title || "Sertifikat baru",
    itemSubtitle: (item) => [item.type, item.issueYear].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "cert"),
      title: "",
      type: "SERTIFIKAT",
      issueYear: "",
      expiryYear: "",
      duration: "-",
      image: "",
      credentialUrl: "",
    }),
    fields: [
      idField(),
      text("title", "Judul"),
      text("type", "Tipe"),
      text("issueYear", "Tahun terbit"),
      text("expiryYear", "Berlaku hingga"),
      text("duration", "Durasi"),
      image("image", "Gambar sertifikat"),
      text("credentialUrl", "URL kredensial"),
    ],
  },

  navbar: {
    key: "navbar",
    label: "Navbar",
    kind: "object",
    description: "Nama brand dan tautan media sosial di navigasi atas.",
    fields: [
      text("brandName", "Nama brand"),
      repeater(
        "socialLinks",
        "Media sosial",
        [
          text("id", "ID"),
          text("label", "Label"),
          text("href", "Link"),
          icon("icon", "Ikon", { options: socialIconKeys }),
        ],
        {
          itemLabel: (item, index) => item.label || `Sosial ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "social"),
            label: "",
            href: "",
            icon: "globe",
          }),
        }
      ),
    ],
  },

  footer: {
    key: "footer",
    label: "Footer",
    kind: "object",
    description: "CTA, kontak langsung, tautan navigasi, sosial, dan copyright.",
    fields: [
      {
        key: "cta",
        label: "CTA",
        type: "group",
        fields: [
          text("titleLine1", "Judul baris 1"),
          text("titleLine2", "Judul baris 2"),
          text("titleHighlight", "Judul sorotan"),
          textarea("description", "Deskripsi"),
          text("buttonText", "Teks tombol"),
          text("buttonHref", "Link tombol"),
        ],
      },
      repeater(
        "directLinks",
        "Kontak langsung",
        [
          text("id", "ID"),
          text("label", "Label"),
          text("href", "Link"),
          text("copyText", "Teks salin"),
          { key: "isExternal", label: "Link eksternal", type: "boolean" },
        ],
        {
          itemLabel: (item, index) => item.label || `Kontak ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "link"),
            label: "",
            href: "",
            copyText: "",
            isExternal: false,
          }),
        }
      ),
      repeater(
        "exploreLinks",
        "Tautan jelajahi",
        [text("id", "ID"), text("label", "Label"), text("path", "Path / anchor")],
        {
          itemLabel: (item, index) => item.label || `Tautan ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "link"),
            label: "",
            path: "",
          }),
        }
      ),
      repeater(
        "socialLinks",
        "Media sosial",
        [text("id", "ID"), text("label", "Label"), text("href", "Link")],
        {
          itemLabel: (item, index) => item.label || `Sosial ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "social"),
            label: "",
            href: "",
          }),
        }
      ),
      {
        key: "copyright",
        label: "Copyright",
        type: "group",
        fields: [text("name", "Nama"), text("year", "Tahun")],
      },
    ],
  },

  "project-details": {
    key: "project-details",
    label: "Detail Proyek",
    kind: "array",
    description: "Isi halaman /projects/:slug.",
    itemLabel: (item) => item.categoryTitle || item.slug || "Detail baru",
    itemSubtitle: (item) => item.slug,
    createItem: (items) => ({
      id: nextId(items, "detail"),
      slug: "",
      categoryTitle: "",
      titlePrefix: "",
      highlightedWord: "",
      titleSuffix: "",
      colorVariantKey: "blue-1",
      description: "",
      repoUrl: "",
      liveDemoUrl: "",
      heroImage: "",
      metaData: [],
      contexts: [],
      galery: [],
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "categoryTitle",
        help: "Harus sama dengan slug kartu proyek.",
      }),
      text("categoryTitle", "Judul kategori"),
      text("titlePrefix", "Awalan judul"),
      text("highlightedWord", "Kata sorotan"),
      text("titleSuffix", "Akhiran judul"),
      color("colorVariantKey", "Warna aksen"),
      textarea("description", "Deskripsi"),
      text("repoUrl", "URL repository", {
        help: "Boleh dikosongkan jika proyek tidak punya repository publik.",
      }),
      text("liveDemoUrl", "URL live demo", {
        help: "Boleh dikosongkan jika proyek belum punya live demo.",
      }),
      image("heroImage", "Gambar utama"),
      metaRepeater(),
      repeater(
        "contexts",
        "Konteks",
        [idField(), text("title", "Judul"), textarea("description", "Deskripsi")],
        {
          itemLabel: (item, index) => item.title || `Konteks ${index + 1}`,
          createItem: (items) => ({
            id: String(items.length + 1).padStart(2, "0"),
            title: "",
            description: "",
          }),
        }
      ),
      repeater(
        "galery",
        "Galeri",
        [idField(), image("image", "Gambar"), text("caption", "Caption")],
        {
          itemLabel: (item, index) => item.caption || `Gambar ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "galery"),
            image: "",
            caption: "",
          }),
        }
      ),
    ],
  },

  "experience-details": {
    key: "experience-details",
    label: "Detail Pengalaman",
    kind: "array",
    description: "Isi halaman /experience/:slug.",
    itemLabel: (item) => item.role || item.slug || "Detail baru",
    itemSubtitle: (item) => [item.companyName, item.slug].filter(Boolean).join(" · "),
    createItem: (items) => ({
      id: nextId(items, "detail"),
      slug: "",
      relatedProjectKeys: [],
      colorVariantKey: "green-blue-1",
      role: "",
      companyName: "",
      logo: "",
      caption: "",
      metaData: [],
      detailPengalaman: [],
      teknologi: [],
      galery: [],
      timeline: {
        months: [],
        tasks: [],
      },
    }),
    fields: [
      idField(),
      text("slug", "Slug", {
        type: "slug",
        sourceKey: "role",
        help: "Harus sama dengan slug kartu pengalaman.",
      }),
      {
        key: "relatedProjectKeys",
        label: "Relasi proyek (multi-select)",
        type: "project-multiselect",
        help: "Pilih beberapa proyek yang terkait dengan pengalaman ini.",
      },
      color("colorVariantKey", "Warna aksen"),
      text("role", "Peran"),
      text("companyName", "Nama perusahaan"),
      image("logo", "Logo perusahaan"),
      textarea("caption", "Caption"),
      metaRepeater(),
      {
        key: "timeline",
        label: "Timeline Pekerjaan",
        type: "timeline-editor",
        help: "Tambah kolom bulan sendiri, atur label dan jumlah grid minggu (1-4) per bulan. Kosongkan untuk menyembunyikan section timeline.",
      },
      repeater(
        "detailPengalaman",
        "Detail pengalaman",
        [
          idField(),
          icon("icon", "Ikon"),
          text("title", "Judul"),
          textarea("description", "Deskripsi"),
        ],
        {
          itemLabel: (item, index) => item.title || `Detail ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "detail"),
            icon: "calendar",
            title: "",
            description: "",
          }),
        }
      ),
      repeater(
        "teknologi",
        "Teknologi",
        [idField(), text("type", "Tipe"), text("tools", "Tools")],
        {
          itemLabel: (item, index) => item.type || `Teknologi ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "tech"),
            type: "",
            tools: "",
          }),
        }
      ),
      repeater(
        "galery",
        "Galeri",
        [idField(), image("image", "Gambar"), text("caption", "Caption")],
        {
          itemLabel: (item, index) => item.caption || `Gambar ${index + 1}`,
          createItem: (items) => ({
            id: nextId(items, "galery"),
            image: "",
            caption: "",
          }),
        }
      ),
    ],
  },
};

export function getSchema(key) {
  return collectionSchemas[key];
}

export function collectionLabel(key, categories = []) {
  const categoryId = experienceCategoryIdByCollectionKey[key];

  if (categoryId) {
    const category = categories.find(
      (item) => String(item?.id) === String(categoryId)
    );

    if (category?.label) return `Pengalaman - ${category.label}`;
  }

  return collectionSchemas[key]?.label ?? key;
}
