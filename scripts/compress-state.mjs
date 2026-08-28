import "dotenv/config";
import pg from "pg";
import sharp from "sharp";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});

function isDataImage(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}

async function compressImage(value) {
  const input = Buffer.from(value.split(",", 2)[1], "base64");
  const output = await sharp(input)
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  return `data:image/jpeg;base64,${output.toString("base64")}`;
}

try {
  const result = await pool.query("SELECT data FROM restaurant_state WHERE id = 1");
  if (!result.rows[0]) throw new Error("restaurant_state is empty");

  const state = result.rows[0].data;
  let compressed = 0;
  for (const collection of [state.categories, state.products]) {
    for (const item of collection || []) {
      if (isDataImage(item.image)) {
        item.image = await compressImage(item.image);
        compressed += 1;
      }
    }
  }
  if (isDataImage(state.banner?.imageUrl)) state.banner.imageUrl = await compressImage(state.banner.imageUrl);
  if (isDataImage(state.storeSettings?.logoUrl)) state.storeSettings.logoUrl = await compressImage(state.storeSettings.logoUrl);

  await pool.query("UPDATE restaurant_state SET data = $1::jsonb, updated_at = NOW() WHERE id = 1", [JSON.stringify(state)]);
  console.log(`Compressed ${compressed} database images.`);
} finally {
  await pool.end();
}