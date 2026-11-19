# Regala Whitepaper · Navidad 2026

Landing para quien recibe una membresía anual de Whitepaper como regalo: un sobre que se abre y revela la gift card, lo que incluye la membresía y cómo activarla.

## Personalizar el enlace

```
https://<dominio>/?para=Ana%20Paula&de=Carlos&msg=Tu%20mensaje&activar=<enlace de Substack>&gift_id=123
```

| Parámetro | Uso | Límite |
|---|---|---|
| `para` | Nombre de quien recibe | 40 caracteres |
| `de` | Nombre de quien regala | 40 caracteres |
| `msg` | Mensaje personal | 280 caracteres |
| `activar` | Enlace de activación (solo https de whitepaper.mx o substack.com) | — |
| `gift_id` | Se pasa como `ref` al botón de regalar | 64 caracteres |

Sitio estático, sin build. Cada push a `main` se publica en Vercel.
