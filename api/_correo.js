// Plantilla del correo de regalo (generada a partir de email/correo-regalo.html).
// enlace: link corto de la persona (ya validado en api/enviar.js)
function correoHTML(enlace) {
  return `<!doctype html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
<title>Tu regalo de Whitepaper</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin: 0; padding: 0; background: #1b231f; }
  a { text-decoration: none; }
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 20px !important; padding-right: 20px !important; }
    .lead { font-size: 21px !important; }
    .btn { padding: 16px 28px !important; font-size: 14px !important; letter-spacing: 1px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#1b231f;">
  <!-- Texto de vista previa (preheader) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#1b231f;opacity:0;">
    Un año de nuevas historias, perspectivas y aprendizajes.&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1b231f;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#1b231f;">

          <!-- Hero: titular + sobre (imagen enlazada) -->
          <tr>
            <td align="center" style="padding:0;">
              <a href="${enlace}" target="_blank">
                <img src="https://campa-anavidad.vercel.app/email/regalo-hero.jpg" width="600" alt="Tienes un regalo. Tu regalo de Whitepaper: un sobre con lacre rojo. Suscripción anual." style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;color:#f4f1ea;font-family:Georgia,serif;font-size:22px;background:#1b231f;" />
              </a>
            </td>
          </tr>

          <!-- Texto -->
          <tr>
            <td class="px" align="center" style="padding:8px 48px 0 48px;">
              <p style="margin:6px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.55;color:#c9cbc6;"><span style="display:inline-block;">Un año de nuevas historias, perspectivas&nbsp;y</span> <span style="display:inline-block;">aprendizajes sobre los negocios en&nbsp;México.</span></p>
            </td>
          </tr>

          <!-- Botón (funciona aunque las imágenes estén bloqueadas) -->
          <tr>
            <td align="center" style="padding:30px 48px 0 48px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${enlace}" style="height:56px;v-text-anchor:middle;width:300px;" arcsize="8%" stroke="f" fillcolor="#FF383C">
                <w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:17px;font-weight:bold;letter-spacing:1px;">ABRIR MI REGALO</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <a href="${enlace}" target="_blank" class="btn" style="display:inline-block;background:#FF383C;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;line-height:20px;padding:18px 36px;border-radius:4px;white-space:nowrap;mso-line-height-rule:exactly;">Abrir mi regalo</a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Firma -->
          <tr>
            <td align="center" style="padding:44px 48px 0 48px;">
              <img src="https://campa-anavidad.vercel.app/email/w-roja.png" width="34" alt="" style="display:block;width:34px;height:auto;border:0;" />
            </td>
          </tr>

          <!-- Pie -->
          <tr>
            <td class="px" align="center" style="padding:28px 48px 44px 48px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #34413a;font-size:0;line-height:0;">&nbsp;</td></tr></table>
              <p style="margin:22px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;color:#f4f1ea;">WHITEPAPER</p>
              <p style="margin:8px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.5;color:#8f948f;">Lo que la comunidad empresarial necesita saber.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
function correoTexto(enlace, para, de) {
  return (para ? para + ", t" : "T") + "ienes un regalo" + (de ? " de " + de : "") + ": un año de Whitepaper.\n\n" +
    "Ábrelo aquí: " + enlace + "\n\nUn año de nuevas historias, perspectivas y aprendizajes sobre los negocios en México.\n\nWhitepaper\nLo que la comunidad empresarial necesita saber.";
}
module.exports = { correoHTML, correoTexto };
