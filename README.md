# SmartBusinessCard (Single Page)

Una **Tarjeta Profesional Inteligente** (HTML/CSS/JS) para usar con **QR o NFC**:
- Botones rápidos (WhatsApp, llamada, correo, mapas)
- Botón **Guardar contacto** (descarga `.vcf`)
- Diseño premium, ultrarrápido, sin backend
- QR generado automáticamente hacia tu URL pública

## Personalización rápida (2 minutos)

1) Edita tu info en `app.js` en el objeto `PROFILE`:
- `name`, `role`, `location`
- `phoneE164`, `email`
- `whatsappE164` y `whatsappMessage`
- `mapsUrl` y `socials`

2) Edita `contact.vcf` con el nombre/empresa/teléfono correctos (esto es lo que más impresiona).

## Publicar gratis

- Netlify: arrastra la carpeta `smart-business-card` al panel.
- Vercel: importa como proyecto estático.
- GitHub Pages: sube el contenido y activa Pages.

## Nota sobre el QR

El QR se genera como imagen desde `quickchart.io` apuntando a la URL actual.
Cuando publiques, el QR automáticamente apuntará a tu dominio/URL final.
