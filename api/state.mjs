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

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") return response.status(204).end();
  if (!process.env.DATABASE_URL) return response.status(500).json({ error: "DATABASE_URL is not configured" });

  try {
    await ensureTable();

    if (request.method === "GET") {
      const result = await pool.query("SELECT data FROM restaurant_state WHERE id = 1");
      return response.status(200).json(result.rows[0]?.data || null);
    }

    if (request.method === "PUT") {
      await pool.query(
        "INSERT INTO restaurant_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()",
        [JSON.stringify(request.body)],
      );
      return response.status(200).json({ ok: true });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database request failed", error);
    return response.status(500).json({ error: "تعذر الاتصال بقاعدة البيانات" });
  }
}