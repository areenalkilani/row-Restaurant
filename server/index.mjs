import "dotenv/config";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const port = Number(process.env.PORT || 3001);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required to start the PostgreSQL API.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});

await pool.query(await readFile(path.join(root, "server", "schema.sql"), "utf8"));

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  return JSON.parse(body || "{}");
}

function unwrapState(value) {
  if (!value || typeof value !== "object") return { data: value, revision: 0 };
  const { _rowRevision, ...data } = value;
  return { data, revision: Number(_rowRevision) || 0 };
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") {
      response.writeHead(204, { "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*", "Access-Control-Allow-Headers": "Content-Type" });
      return response.end();
    }

    if (request.url === "/api/health") return sendJson(response, 200, { ok: true });

    if (request.url === "/api/state" && request.method === "GET") {
      const result = await pool.query("SELECT data FROM restaurant_state WHERE id = 1");
      return sendJson(response, 200, unwrapState(result.rows[0]?.data || null).data);
    }

    if (request.url === "/api/state" && request.method === "PUT") {
      const data = await readBody(request);
      const revision = Number(request.headers["x-state-revision"] || 0) || Date.now();
      const result = await pool.query(
        "INSERT INTO restaurant_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW() WHERE COALESCE((restaurant_state.data->>'_rowRevision')::bigint, 0) <= $2 RETURNING id",
        [JSON.stringify({ ...data, _rowRevision: revision }), revision],
      );
      if (result.rowCount === 0) return sendJson(response, 409, { error: "A newer state is already saved" });
      return sendJson(response, 200, { ok: true });
    }

    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
    const staticPath = pathname === "/" ? "/index.html" : pathname;
    const filePath = path.join(root, "dist", staticPath);
    if (existsSync(filePath)) {
      const content = await readFile(filePath);
      response.writeHead(200);
      return response.end(content);
    }

    if (existsSync(path.join(root, "dist", "index.html"))) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return response.end(await readFile(path.join(root, "dist", "index.html")));
    }

    response.writeHead(404);
    response.end("Not found");
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "تعذر الاتصال بقاعدة البيانات" });
  }
});

server.listen(port, "0.0.0.0", () => console.log(`PostgreSQL API listening on http://localhost:${port}`));