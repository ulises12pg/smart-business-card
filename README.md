# SmartBusinessCard — Herrería e Innovación

Una **tarjeta de negocios digital inteligente** (HTML · CSS · JS puro) lista para producción en Vercel.

- WhatsApp, llamada, correo y ubicación con un clic
- Botón **Guardar contacto** (descarga `.vcf` compatible iOS y Android)
- Galería de proyectos, QR automático, tema oscuro/claro
- Sin backend · sin dependencias · carga ultra rápida

---

## ⚡ Puesta en producción paso a paso

### 1 — Configura Git en tu máquina (solo la primera vez)

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@correo.com"
```

### 2 — Inicializa el repositorio local

```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "chore: initial commit"
```

### 3 — Crea el repositorio en GitHub y sube el código

1. Ve a [github.com/new](https://github.com/new)
2. Nómbralo `smart-business-card`, selecciona **Privado** o Público, **no** initialices con README
3. Ejecuta los comandos que GitHub te muestra, por ejemplo:

```bash
git remote add origin https://github.com/TU_USUARIO/smart-business-card.git
git branch -M main
git push -u origin main
```

### 4 — Importa el proyecto en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new) e inicia sesión con GitHub
2. Haz clic en **Import** junto a `smart-business-card`
3. En *Framework Preset* selecciona **Other** (es HTML estático)
4. Deja todos los demás campos vacíos y haz clic en **Deploy**

Vercel detecta automáticamente el `vercel.json` y aplica las cabeceras de seguridad y caché.

### 5 — Dominio personalizado (opcional)

1. En el panel de Vercel → tu proyecto → **Settings › Domains**
2. Escribe tu dominio (ej. `tarjeta.herreriainnovacion.mx`) y sigue las instrucciones DNS

---

## 🔄 Flujo de trabajo cotidiano

```
Editar archivos  →  git add .  →  git commit -m "descripción"  →  git push
                                                                    ↓
                                                     Vercel despliega automáticamente
```

Cada `git push` a `main` genera un deploy automático. También puedes hacer **Preview deploys** desde ramas distintas.

---

## ✏️ Personalización rápida

Edita el objeto `PROFILE` en `app.js`:

| Campo | Descripción |
|---|---|
| `name` | Nombre o empresa |
| `role` | Slogan o cargo |
| `location` | Ciudad y país |
| `phoneE164` | Teléfono principal (`+52…`) |
| `whatsapp2E164` | Segunda línea WhatsApp (opcional) |
| `emails` | Array de correos (máx. 2) |
| `mapsUrl` | URL de Google Maps |
| `socials.facebook` | URL de Facebook |
| `socials.tiktok` | URL de TikTok |
| `socials.instagram` | URL de Instagram |
| `logoSrc` | Ruta al logo (ej. `./logo.png`) |

### Galería
Coloca las imágenes en `gallery/` y actualiza el array `GALLERY` en `app.js`.

### Contacto VCF
Edita `contact.vcf` con el nombre, empresa y teléfono. Es lo que iOS/Android guarda como contacto.

---

## 📦 Estructura del proyecto

```
smart-business-card/
├── index.html       # Estructura de la página
├── styles.css       # Estilos (tema oscuro y claro)
├── app.js           # Toda la lógica + configuración PROFILE
├── contact.vcf      # Archivo vCard (guardar contacto)
├── logo.png         # Logo de la empresa
├── favicon.svg      # Ícono de la pestaña
├── vercel.json      # Cabeceras HTTP y caché para producción
├── .gitignore       # Archivos excluidos de Git
└── gallery/         # Fotos de proyectos
    └── img*.jpeg
```

---

## 🔒 Seguridad y rendimiento (incluidos vía `vercel.json`)

| Cabecera | Valor |
|---|---|
| `X-Frame-Options` | `DENY` (bloquea clickjacking) |
| `X-Content-Type-Options` | `nosniff` |
| `Content-Security-Policy` | Restringe orígenes de scripts, imágenes, etc. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| Assets de galería | `Cache-Control: max-age=1 año` (inmutable) |
| CSS / JS | `Cache-Control: 1 hora` con revalidación |

---

> **QR dinámico**: el QR se genera automáticamente apuntando a la URL del sitio.  
> En desarrollo apunta a `localhost`; al publicar en Vercel apuntará a tu dominio real.
