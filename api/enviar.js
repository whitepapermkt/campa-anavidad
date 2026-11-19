// POST /api/enviar → manda el correo del sobre a quien recibe el regalo, vía Resend.
// Cuerpo JSON: { clave, correo, url, p, d }
// Variables en Vercel: RESEND_API_KEY (obligatoria), CLAVE_EQUIPO (obligatoria),
// REMITENTE (opcional, por omisión "Whitepaper <regalos@whitepaper.mx>").
const crypto = require("crypto");
const { correoHTML, correoTexto } = require("./_correo");

function limpio(v, max) {
  return String(v || "").replace(/[\u0000-\u001f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Usa POST." });

  const esperada = process.env.CLAVE_EQUIPO, apiKey = process.env.RESEND_API_KEY;
  if (!esperada) return res.status(500).json({ error: "Falta configurar CLAVE_EQUIPO en Vercel." });
  if (!apiKey) return res.status(500).json({ error: "Falta configurar RESEND_API_KEY en Vercel." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const a = Buffer.from(String(body.clave || "")), b = Buffer.from(esperada);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ error: "Clave incorrecta." });

  const correo = String(body.correo || "").trim().toLowerCase();
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/.test(correo) || correo.length > 200)
    return res.status(400).json({ error: "Revisa el correo de quien recibe." });

  // Solo se permiten enlaces de esta misma campaña (evita que se use para mandar otra cosa)
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  let enlace;
  try {
    const u = new URL(String(body.url || ""));
    if (u.protocol !== "https:" || u.host !== host) throw new Error();
    enlace = u.href;
  } catch (e) { return res.status(400).json({ error: "Primero crea el enlace corto." }); }

  const para = limpio(body.p, 40), de = limpio(body.d, 40);
  const asunto = de ? `${de} te regaló un año de Whitepaper` : "Tienes un regalo de Whitepaper";
  const enlaceCorreo = enlace + (enlace.includes("?") ? "&" : "?") + "utm_source=correo_regalo&utm_medium=email";

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.REMITENTE || "Whitepaper <regalos@whitepaper.mx>",
        to: [correo],
        subject: asunto,
        html: correoHTML(enlaceCorreo.replace(/&/g, "&amp;")),
        text: correoTexto(enlaceCorreo, para, de),
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ error: "Resend: " + (j.message || r.status) });
    return res.status(200).json({ ok: true, id: j.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
