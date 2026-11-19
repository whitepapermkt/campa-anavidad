// Cliente mínimo de Upstash Redis por REST (sin dependencias).
// Vercel agrega las variables al conectar la base desde Storage → Upstash.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  if (!URL_ || !TOKEN) throw new Error("Falta conectar la base de datos (Upstash) al proyecto en Vercel.");
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

module.exports = { redis };
