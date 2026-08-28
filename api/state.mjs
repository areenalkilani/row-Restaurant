import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
  max: 1,
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS restaurant_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

function unwrapState(value) {
  if (!value || typeof value !== "object") return { data: value, revision: 0 };
  const { _rowRevision, ...data } = value;
  return { data, revision: Number(_rowRevision) || 0 };
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") return response.status(204).end();
  if (!process.env.DATABASE_URL) return response.status(500).json({ error: "DATABASE_URL is not configured" });

  try {
    await ensureTable();

    if (request.method === "GET") {
      const result = await pool.query("SELECT data FROM restaurant_state WHERE id = 1");
        const current = unwrapState(result.rows[0]?.data || null);
        response.setHeader("X-State-Revision", String(current.revision));
        return response.status(200).json(current.data);
    }

    if (request.method === "PUT") {
      const incomingRevision = Number(request.headers["x-state-revision"] || 0) || Date.now();
      const state = { ...request.body, _rowRevision: incomingRevision };
      const result = await pool.query(
        "INSERT INTO restaurant_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW() WHERE COALESCE((restaurant_state.data->>'_rowRevision')::bigint, 0) <= $2 RETURNING id",
        [JSON.stringify(state), incomingRevision],
      );
      if (result.rowCount === 0) return response.status(409).json({ error: "A newer state is already saved" });
      return response.status(200).json({ ok: true });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database request failed", error);
    return response.status(500).json({ error: "تعذر الاتصال بقاعدة البيانات" });
  }
}