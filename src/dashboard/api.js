const API_BASE = "/__dashboard/api";

export class ApiError extends Error {
  constructor(message, { status = 0, code = "REQUEST_FAILED", details = [], warnings = [] } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.warnings = warnings;
  }
}

async function request(path, { method = "GET", body } = {}) {
  const headers = { "X-Portfolio-Dashboard": "1" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    throw new ApiError(
      "Tidak bisa menghubungi API dashboard. Pastikan dev server berjalan.",
      { code: "NETWORK_ERROR", details: [{ path: "", message: error.message }] }
    );
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    throw new ApiError("Respons API bukan JSON yang valid.", {
      status: response.status,
      code: "INVALID_RESPONSE",
    });
  }

  if (!response.ok || payload?.ok === false) {
    throw new ApiError(payload?.message ?? "Request dashboard gagal.", {
      status: response.status,
      code: payload?.error ?? "REQUEST_FAILED",
      details: payload?.details ?? [],
      warnings: payload?.warnings ?? [],
    });
  }

  return payload;
}

export const api = {
  health() {
    return request("/health");
  },

  async listCollections() {
    const response = await request("/collections");
    return response.data;
  },

  async snapshot() {
    const response = await request("/snapshot");
    return response.data;
  },

  async getCollection(key) {
    const response = await request(`/collections/${encodeURIComponent(key)}`);
    return {
      data: response.data,
      mtime: response.mtime,
      warnings: response.warnings ?? [],
    };
  },

  async saveCollection(key, data) {
    const response = await request(`/collections/${encodeURIComponent(key)}`, {
      method: "PUT",
      body: { data },
    });

    return {
      data: response.data,
      mtime: response.mtime,
      warnings: response.warnings ?? [],
    };
  },

  async validate(key, data) {
    const response = await request("/validate", {
      method: "POST",
      body: { key, data },
    });

    return response.data;
  },

  async warnings() {
    const response = await request("/warnings");
    return response.data;
  },

  async listBackups() {
    const response = await request("/backups");
    return response.data;
  },

  async backup(key) {
    const response = await request("/backup", {
      method: "POST",
      body: key ? { key } : {},
    });

    return response.data;
  },

  async listAssets() {
    const response = await request("/assets");
    return response.data;
  },

  async upload({ key, slug, filename, dataUrl }) {
    const response = await request("/upload", {
      method: "POST",
      body: { key, slug, filename, dataUrl },
    });

    return response.data;
  },
};
