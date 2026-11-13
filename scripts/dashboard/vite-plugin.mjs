import {
  collectionKeys,
  collections,
  getCollection,
} from "./collections.mjs";
import {
  backupAll,
  backupCollection,
  listAssets,
  listBackups,
  readAllCollections,
  readCollection,
  saveUpload,
  writeCollection,
} from "./storage.mjs";
import { integrityWarnings, validateWithIntegrity } from "./validate.mjs";

const API_PREFIX = "/__dashboard/api";
const DASHBOARD_PATH = "/input/dashboard";
const MAX_BODY_BYTES = 10 * 1024 * 1024;

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const LOOPBACK_ADDRESSES = new Set([
  "127.0.0.1",
  "::1",
  "::ffff:127.0.0.1",
  "::ffff:7f00:1",
]);
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function httpError(status, code, message, details = []) {
  return Object.assign(new Error(message), { status, code, details });
}

function sendJson(res, status, payload) {
  if (res.writableEnded) return;

  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function sendOk(res, data, extra = {}) {
  sendJson(res, 200, { ok: true, data, ...extra });
}

function sendError(res, error) {
  sendJson(res, error.status ?? 500, {
    ok: false,
    error: error.code ?? "INTERNAL_ERROR",
    message: error.message,
    details: error.details ?? [],
  });
}

function hostnameFromHeader(hostHeader) {
  try {
    return new URL(`http://${hostHeader}`).hostname.replace(/^\[|\]$/g, "");
  } catch {
    return "";
  }
}

function assertLocalRequest(req) {
  if (!LOOPBACK_HOSTNAMES.has(hostnameFromHeader(req.headers.host))) {
    throw httpError(
      403,
      "FORBIDDEN_HOST",
      "Dashboard hanya dapat diakses melalui localhost."
    );
  }

  if (!LOOPBACK_ADDRESSES.has(req.socket.remoteAddress ?? "")) {
    throw httpError(
      403,
      "FORBIDDEN_REMOTE",
      "Dashboard hanya menerima koneksi dari mesin lokal."
    );
  }
}

function assertDashboardHeaders(req) {
  if (req.headers["x-portfolio-dashboard"] !== "1") {
    throw httpError(
      403,
      "MISSING_DASHBOARD_HEADER",
      "Header X-Portfolio-Dashboard: 1 wajib dikirim."
    );
  }

  const origin = req.headers.origin;

  if (!origin) {
    if (SAFE_METHODS.has(req.method ?? "GET")) return;
    throw httpError(
      403,
      "MISSING_ORIGIN",
      "Request yang mengubah data wajib menyertakan header Origin."
    );
  }

  let originHost;

  try {
    originHost = new URL(origin).host;
  } catch {
    throw httpError(403, "INVALID_ORIGIN", "Header Origin tidak valid.");
  }

  if (originHost !== req.headers.host) {
    throw httpError(
      403,
      "INVALID_ORIGIN",
      "Origin request tidak sama dengan host dev server."
    );
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const contentType = (req.headers["content-type"] ?? "").toLowerCase();

    if (!contentType.includes("application/json")) {
      req.resume();
      reject(
        httpError(
          415,
          "UNSUPPORTED_MEDIA_TYPE",
          "Gunakan Content-Type: application/json."
        )
      );
      return;
    }

    const chunks = [];
    let size = 0;
    let settled = false;

    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    req.on("data", (chunk) => {
      if (settled) return;

      size += chunk.length;

      if (size > MAX_BODY_BYTES) {
        fail(httpError(413, "BODY_TOO_LARGE", "Body request terlalu besar."));
        req.resume();
        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => {
      if (settled) return;
      settled = true;

      if (size === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(httpError(400, "INVALID_JSON", "Body bukan JSON valid."));
      }
    });

    req.on("error", (error) => {
      fail(httpError(400, "REQUEST_ERROR", error.message));
    });
  });
}

function requireCollectionKey(key) {
  if (!getCollection(key)) {
    throw httpError(
      404,
      "COLLECTION_NOT_FOUND",
      `Koleksi tidak dikenal: ${key}`
    );
  }

  return key;
}

async function handleRequest(req, res, url) {
  assertLocalRequest(req);
  assertDashboardHeaders(req);

  const method = req.method ?? "GET";
  const segments = url.pathname
    .slice(API_PREFIX.length)
    .split("/")
    .filter(Boolean);

  if (method === "GET" && segments[0] === "snapshot" && segments.length === 1) {
    sendOk(res, await readAllCollections());
    return;
  }

  if (method === "GET" && segments[0] === "health" && segments.length === 1) {
    sendOk(res, {
      plugin: "portfolio-dashboard",
      collections: collectionKeys.length,
    });
    return;
  }

  if (segments[0] === "collections") {
    if (method === "GET" && segments.length === 1) {
      const snapshot = await readAllCollections();
      const data = collectionKeys.map((key) => {
        const value = snapshot[key];
        let count = 0;

        if (Array.isArray(value)) count = value.length;
        else if (value) count = 1;

        return {
          key,
          label: collections[key].label,
          kind: collections[key].kind,
          count,
        };
      });

      sendOk(res, data);
      return;
    }

    const key = requireCollectionKey(segments[1]);

    if (method === "GET" && segments.length === 2) {
      const [{ data, mtime }, snapshot] = await Promise.all([
        readCollection(key),
        readAllCollections(),
      ]);
      const warnings = (await integrityWarnings(snapshot)).filter((warning) =>
        warning.path.startsWith(key)
      );

      sendOk(res, data, { mtime, warnings });
      return;
    }

    if (method === "PUT" && segments.length === 2) {
      const body = await readJsonBody(req);

      if (!Object.hasOwn(body, "data")) {
        throw httpError(
          400,
          "MISSING_DATA",
          "Body wajib berisi properti 'data'."
        );
      }

      const snapshot = await readAllCollections();
      const result = await validateWithIntegrity(key, body.data, snapshot);

      if (result.errors.length > 0) {
        sendJson(res, 422, {
          ok: false,
          error: "VALIDATION_ERROR",
          message: "Data belum valid dan tidak disimpan.",
          details: result.errors,
          warnings: result.warnings,
        });
        return;
      }

      const { mtime } = await writeCollection(key, body.data);
      sendOk(res, body.data, { mtime, warnings: result.warnings });
      return;
    }

    throw httpError(
      405,
      "METHOD_NOT_ALLOWED",
      `Method ${method} tidak didukung untuk ${url.pathname}.`
    );
  }

  if (method === "POST" && segments[0] === "validate" && segments.length === 1) {
    const body = await readJsonBody(req);
    const key = requireCollectionKey(body.key);

    if (!Object.hasOwn(body, "data")) {
      throw httpError(
        400,
        "MISSING_DATA",
        "Body wajib berisi properti 'data'."
      );
    }

    const snapshot = await readAllCollections();
    const result = await validateWithIntegrity(key, body.data, snapshot);

    sendOk(res, result);
    return;
  }

  if (method === "POST" && segments[0] === "backup" && segments.length === 1) {
    const body = await readJsonBody(req);

    if (body.key) {
      const key = requireCollectionKey(body.key);
      const file = await backupCollection(key);
      sendOk(res, { key, file });
      return;
    }

    sendOk(res, await backupAll());
    return;
  }

  if (method === "GET" && segments[0] === "backups" && segments.length === 1) {
    sendOk(res, await listBackups());
    return;
  }

  if (method === "POST" && segments[0] === "upload" && segments.length === 1) {
    const body = await readJsonBody(req);
    const key = requireCollectionKey(body.key);
    const result = await saveUpload({
      collectionKey: key,
      slug: body.slug,
      filename: body.filename,
      dataUrl: body.dataUrl,
    });

    sendOk(res, result);
    return;
  }

  if (method === "GET" && segments[0] === "assets" && segments.length === 1) {
    sendOk(res, await listAssets());
    return;
  }

  if (method === "GET" && segments[0] === "warnings" && segments.length === 1) {
    sendOk(res, await integrityWarnings(await readAllCollections()));
    return;
  }

  throw httpError(
    404,
    "NOT_FOUND",
    `Endpoint dashboard tidak ditemukan: ${method} ${url.pathname}`
  );
}

/**
 * Plugin dev-only:
 * - menyajikan API lokal di /__dashboard/api
 * - mengarahkan /input/dashboard ke entry HTML dashboard
 */
export default function dashboardApiPlugin() {
  return {
    name: "portfolio-dashboard",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let url;

        try {
          url = new URL(
            req.url ?? "/",
            `http://${req.headers.host ?? "localhost"}`
          );
        } catch {
          next();
          return;
        }

        if (
          url.pathname === DASHBOARD_PATH ||
          url.pathname === `${DASHBOARD_PATH}/`
        ) {
          req.url = `${DASHBOARD_PATH}/index.html${url.search}`;
          next();
          return;
        }

        if (!url.pathname.startsWith(API_PREFIX)) {
          next();
          return;
        }

        handleRequest(req, res, url).catch((error) => {
          if (res.writableEnded) return;

          if (error.status) {
            sendError(res, error);
            return;
          }

          server.config.logger.error(
            `[dashboard] ${error.stack ?? error.message}`
          );
          sendError(
            res,
            httpError(
              500,
              "INTERNAL_ERROR",
              "Terjadi kesalahan di server dashboard."
            )
          );
        });
      });
    },
  };
}
