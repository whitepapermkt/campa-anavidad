// GET /:codigo  (vía rewrite en vercel.json → /api/r?c=codigo)
// Busca la tarjeta y abre la landing con sus datos. Si el código no existe, abre la landing genérica.
const { redis } = require("./_redis");

module.exports = async (req, res) => {
  const c = String((req.query && req.query.c) || "").toLowerCase();
  let destino = "/";
  if (/^[2-9a-z]{6}$/.test(c)) {
    try {
      const raw = await redis(["GET", "g:" + c]);
      if (raw) {
        const datos = JSON.parse(raw);
        const q = new URLSearchParams();
        for (const k of ["p", "d", "m", "a"]) if (datos[k]) q.set(k, datos[k]);
        q.set("g", c); // id del regalo para medir y para el loop de referidos
        destino = "/?" + q.toString();
      }
    } catch (e) { /* si la base falla, al menos abre la landing */ }
  }
  res.setHeader("Cache-Control", "no-store");
  res.statusCode = 302;
  res.setHeader("Location", destino);
  res.end();
};
