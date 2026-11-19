# Regala Whitepaper · Navidad 2026

Landing para quien recibe una suscripción anual de Whitepaper como regalo: un sobre que se abre y revela la gift card, lo que incluye la suscripción y cómo activarla.

## Links cortos

`/crear` genera links tipo `campa-anavidad.vercel.app/x7k2mn`. Cómo funciona:
- `api/crear.js` guarda los datos en Upstash Redis (conectado desde Vercel → Storage) y devuelve un código de 6 caracteres. Pide la clave del equipo (`CLAVE_EQUIPO`, en Vercel → Settings → Environment Variables).
- `api/r.js` + el rewrite de `vercel.json` hacen que `/:codigo` abra la landing con esos datos.
- Los links largos (`?p=…&d=…`) siguen funcionando.

## Crear tarjetas

En `/crear` el equipo escribe para quién es, de quién y el mensaje, y obtiene el enlace listo para copiar o enviar por WhatsApp.

## Personalizar el enlace

```
https://<dominio>/?p=Ana+Paula&d=Carlos&m=Tu+mensaje&a=<enlace de Substack>&g=123
```

| Parámetro | Uso | Límite |
|---|---|---|
| `p` | Nombre de quien recibe | 40 caracteres |
| `d` | Nombre de quien regala | 40 caracteres |
| `m` | Mensaje personal | 280 caracteres |
| `a` | Enlace de activación (solo https de whitepaper.mx o substack.com) | — |
| `g` | Se pasa como `ref` al botón de regalar | 64 caracteres |

Los nombres largos (`para`, `de`, `msg`, `activar`, `gift_id`) también funcionan.

Sitio estático, sin build. Cada push a `main` se publica en Vercel.
