// POST /api/crear  → guarda los datos de una tarjeta y devuelve un código corto.
// Cuerpo JSON: { clave, p, d, m, a }  (para, de, mensaje, enlace de activación)
// Requiere la variable de entorno CLAVE_EQUIPO para que solo el equipo pueda crear links.
const crypto = require("crypto");
const { redis } = require("./_redis");

const ALFABETO = "23456789abcdefghjkmnpqrstuvwxyz"; // sin 0/o, 1/l/i para que no se confundan
const LARGO = 6;                                     // 6 caracteres: no choca con /crear ni otras rutas
const VIGENCIA = 60 * 60 * 24 * 400;                 // ~13 meses

function codigo() {
  const bytes = crypto.randomBytes(LARGO);
  let c = "";
  for (let i = 0; i < LARGO; i++) c += ALFABETO[bytes[i] % ALFABETO.length];
  return c;
}
function limpio(v, max) {
  return String(v || "").replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
function activacionValida(v) {
  try { const u = new URL(v); return u.protocol === "https:" && /(^|\.)(whitepaper\.mx|substack\.com)$/.test(u.hostname); }
  catch (e) { return false; }
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Usa POST." });

  const esperada = process.env.CLAVE_EQUIPO;
  if (!esperada) return res.status(500).json({ error: "Falta configurar CLAVE_EQUIPO en Vercel." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const a = Buffer.from(String(body.clave || "")), b = Buffer.from(esperada);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ error: "Clave incorrecta." });

  const datos = { p: limpio(body.p, 40), d: limpio(body.d, 40), m: limpio(body.m, 280) };
  if (body.a && activacionValida(body.a)) datos.a = String(body.a).slice(0, 500);
  if (!datos.p) return res.status(400).json({ error: "Falta el nombre de quien recibe." });

  try {
    for (let intento = 0; intento < 5; intento++) {
      const c = codigo();
      const ok = await redis(["SET", "g:" + c, JSON.stringify(datos), "NX", "EX", String(VIGENCIA)]);
      if (ok === "OK") {
        const host = req.headers["x-forwarded-host"] || req.headers.host;
        return res.status(200).json({ codigo: c, url: `https://${host}/${c}` });
      }
    }
    return res.status(500).json({ error: "No se pudo generar un código. Intenta de nuevo." });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
