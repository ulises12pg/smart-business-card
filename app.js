const PROFILE = {
  name: "Herrería e Innovación",
  role: "Forjando soluciones, Diseñando el futuro",
  location: "Conejos Atotonilco Hidalgo · México",
  /** Teléfono principal (Llamar y WhatsApp 1) */
  phoneE164: "+529845097009",
  /** WhatsApp línea 2 (mismo mensaje que la primera) */
  whatsapp2E164: "+529989363962",
  /** Un correo por botón (orden = orden en pantalla) */
  emails: ["herreriaeinnovacion@gmail.com", "innovacion865@gmail.com"],
  whatsappE164: "+529845097009",
  whatsappMessage:
    "Hola, vi la tarjeta de Herrería e Innovación y me gustaría una cotización.",
  mapsUrl:
    "https://www.google.com/maps?q=19.9688795,-99.2455191&z=17&hl=es",
  /** Archivo de logo local (coloca `logo.png` en la carpeta del proyecto) */
  logoSrc: "./logo.png",
  socials: {
    instagram: "",
    facebook:
      "https://www.facebook.com/profile.php?id=61576450940744&mibextid=ZbWKwL",
    tiktok:
     "https://www.tiktok.com/@herreria.e.innova?_r=1&_d=f2g3b1e0l2hhfk&sec_uid=MS4wLjABAAAAX64l_EQB5_5qy_l2HWe3RXMYGI7DHvu9xs7vI41P9JzItmIpEYFxHlQjynHWWm8w&share_author_id=7619765708092212242&sharer_language=es&source=h5_m&u_code=f2g3c271d58b56&timestamp=1774491266&user_id=7619765708092212242&sec_user_id=MS4wLjABAAAAX64l_EQB5_5qy_l2HWe3RXMYGI7DHvu9xs7vI41P9JzItmIpEYFxHlQjynHWWm8w&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7619765661300164359&share_link_id=27ca3865-3696-43c7-ac56-a2a87fcdd51d&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb0229&social_share_type=5&enable_checksum=1",
    website: ""
  }
};

/**
 * Galería: coloca tus fotos en la carpeta `gallery/` y añade entradas aquí.
 * Ejemplo: { src: "./gallery/mueble-1.jpg", alt: "Reja metálica" }
 */
const GALLERY = [ { src:"./gallery/img1.jpeg", alt: "Zaguán corte laser" }, {src:"./gallery/img2.jpeg", alt: "Armario multiusos"}, { src:"./gallery/img3.jpeg", alt: "Portón metalico"}, { src:"./gallery/img4.jpeg", alt: "Escalera de herreria"}, { src:"./gallery/img5.jpeg", alt: "Escalera de caracol"}, { src:"./gallery/img6.jpeg", alt: "Armario metálico"}, { src:"./gallery/img7.jpeg", alt: "Contra reja de metal"}, { src:"./gallery/img8.jpeg", alt: "Montaje techo "}]

const $ = (sel) => document.querySelector(sel);

function safeText(el, value) {
  if (!el) return;
  el.textContent = value ?? "";
}

function initialsFromName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = (parts[0] || "T").slice(0, 1).toUpperCase();
  const lastWord = parts.length > 1 ? parts[parts.length - 1] : parts[0] || "N";
  const second = lastWord.slice(0, 1).toUpperCase();
  return `${first}${second}`;
}

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("show"), 1800);
}

function formatMxPhoneDisplay(e164) {
  const digits = String(e164 || "").replace(/\D/g, "");
  const ten = digits.length >= 10 ? digits.slice(-10) : digits;
  if (ten.length !== 10) return String(e164 || "").replace(/^\+52/, "") || "";
  return `${ten.slice(0, 3)} ${ten.slice(3, 6)} ${ten.slice(6)}`;
}

function mailtoHrefSingle(addr) {
  const e = String(addr || "").trim();
  return e ? `mailto:${e}` : "#";
}

function setWaHref(el, e164) {
  if (!el) return;
  const wa = String(e164 || "").replace(/[^\d+]/g, "");
  const waMsg = encodeURIComponent(PROFILE.whatsappMessage || "");
  el.href = wa ? `https://wa.me/${wa.replace("+", "")}?text=${waMsg}` : "#";
}

function setLinks() {
  const whats = $("#whatsLink");
  const whats2 = $("#whatsLink2");
  const call = $("#callLink");
  const mail = $("#mailLink");
  const mail2 = $("#mailLink2");
  const maps = $("#mapsLink");

  setWaHref(whats, PROFILE.whatsappE164);
  setWaHref(whats2, PROFILE.whatsapp2E164);

  const tel = String(PROFILE.phoneE164 || "").replace(/[^\d+]/g, "");
  if (call) call.href = tel ? `tel:${tel}` : "#";

  const emails = PROFILE.emails?.length ? PROFILE.emails : PROFILE.email ? [PROFILE.email] : [];
  if (mail) mail.href = mailtoHrefSingle(emails[0]);
  if (mail2) {
    mail2.href = mailtoHrefSingle(emails[1]);
    mail2.hidden = !emails[1];
  }
  if (maps) maps.href = PROFILE.mapsUrl || "#";

  const ig = $("#igLink");
  const fb = $("#fbLink");
  const tt = $("#ttLink");
  const web = $("#webLink");

  if (ig) ig.href = PROFILE.socials.instagram || "#";
  if (fb) fb.href = PROFILE.socials.facebook || "#";
  if (tt) tt.href = PROFILE.socials.tiktok || "#";
  if (web) web.href = PROFILE.socials.website || "#";

  [ig, tt, web].forEach((a) => {
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const tile = a.closest(".tile");
    if (tile) tile.hidden = !href || href === "#";
  });

  const socialGrid = document.querySelector("[data-social-grid]");
  if (socialGrid) {
    const tiles = [...socialGrid.querySelectorAll(".tile")];
    const visible = tiles.filter((t) => !t.hidden).length;
    socialGrid.classList.toggle("social-compact", visible <= 1);
  }
}

function currentUrl() {
  return window.location.href.split("#")[0];
}

function setQr() {
  const img = $("#qrImg");
  if (!img) return;

  const url = currentUrl();

  // QR as an image (no libraries). You can swap provider later.
  // If you need 100% offline, replace this with an embedded QR generator.
  const src = `https://quickchart.io/qr?size=700&text=${encodeURIComponent(url)}`;
  img.src = src;
}

async function copyLink() {
  const url = currentUrl();
  try {
    await navigator.clipboard.writeText(url);
    toast("Enlace copiado.");
  } catch {
    toast("No se pudo copiar. Mantén presionado y copia el link.");
  }
}

async function share() {
  const url = currentUrl();
  const payload = {
    title: `${PROFILE.name} · Tarjeta digital`,
    text: "Guarda nuestro contacto y escríbenos en 1 clic.",
    url
  };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return;
    } catch {
      // user cancelled or failed; fallback to copy
    }
  }
  await copyLink();
}

function downloadQr() {
  const img = $("#qrImg");
  if (!img || !img.src) return;

  const a = document.createElement("a");
  a.href = img.src;
  a.download = "qr-smart-business-card.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast("Descargando QR…");
}

function getTheme() {
  return localStorage.getItem("sbc_theme") || "";
}

function setTheme(next) {
  if (!next) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("sbc_theme");
    return;
  }
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("sbc_theme", next);
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "";
  const next = cur === "dark" ? "light" : "dark";
  setTheme(next);
  toast(`Tema: ${next}`);
}

function bumpStat() {
  const key = "sbc_visits";
  const v = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(v));
  safeText($("#miniStat"), `${v} visitas (local)`);
}

function wireActions() {
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    if (action === "copy") copyLink();
    if (action === "share") share();
    if (action === "download-qr") downloadQr();
    if (action === "toggle-theme") toggleTheme();
  });
}

function hydrateText() {
  safeText($("#displayName"), PROFILE.name);
  safeText($("#footerName"), PROFILE.name);
  safeText($("#displayRole"), PROFILE.role);
  safeText($("#displayLocation"), PROFILE.location);
  safeText($("#avatarInitials"), initialsFromName(PROFILE.name));
  safeText($("#year"), String(new Date().getFullYear()));

  const emails = PROFILE.emails?.length ? PROFILE.emails : PROFILE.email ? [PROFILE.email] : [];
  const mailSub = $("#mailLinkSub");
  if (mailSub) mailSub.textContent = emails[0] || "";
  const mail2Sub = $("#mailLink2Sub");
  if (mail2Sub) mail2Sub.textContent = emails[1] || "";

  const waSub = $("#whatsLinkSub");
  if (waSub && PROFILE.whatsappE164) {
    waSub.textContent = formatMxPhoneDisplay(PROFILE.whatsappE164);
  }
  const wa2Sub = $("#whatsLink2Sub");
  if (wa2Sub && PROFILE.whatsapp2E164) {
    wa2Sub.textContent = formatMxPhoneDisplay(PROFILE.whatsapp2E164);
  }

  const callSub = $("#callLinkSub");
  if (callSub && PROFILE.phoneE164) {
    callSub.textContent = formatMxPhoneDisplay(PROFILE.phoneE164);
  }

  const setMailTitle = (a, addr) => {
    if (!a || !addr) return;
    a.setAttribute("title", addr);
    a.setAttribute("aria-label", `Enviar correo a ${addr}`);
  };
  setMailTitle($("#mailLink"), emails[0]);
  setMailTitle($("#mailLink2"), emails[1]);

  // Logo del avatar (con fallback a iniciales)
  const logo = $("#avatarLogo");
  const initials = $("#avatarInitials");
  if (logo && initials) {
    const src = PROFILE.logoSrc;
    if (!src) {
      logo.hidden = true;
      initials.hidden = false;
    } else {
      logo.hidden = true;
      initials.hidden = false;
      logo.addEventListener(
        "load",
        () => {
          logo.hidden = false;
          initials.hidden = true;
        },
        { once: true }
      );
      logo.addEventListener(
        "error",
        () => {
          logo.hidden = true;
          initials.hidden = false;
        },
        { once: true }
      );
      logo.src = src;
    }
  }
}

function renderGallery() {
  const root = $("#galleryRoot");
  if (!root) return;

  const hint = $("#galleryHint");
  if (!GALLERY.length) {
    root.innerHTML =
      '<p class="gallery-empty muted">Aún no hay fotos. Sigue los pasos de abajo para añadir la galería.</p>';
    if (hint) hint.hidden = false;
    return;
  }

  if (hint) hint.hidden = true;
  root.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  for (const item of GALLERY) {
    const src = item.src;
    const alt = item.alt || "Foto de galería";
    if (!src) continue;
    const wrap = document.createElement("figure");
    wrap.className = "gallery-item";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    wrap.appendChild(img);
    if (item.alt) {
      const cap = document.createElement("figcaption");
      cap.textContent = item.alt;
      wrap.appendChild(cap);
    }
    grid.appendChild(wrap);
  }

  root.appendChild(grid);
}

function applySavedTheme() {
  const t = getTheme();
  if (t === "light" || t === "dark") setTheme(t);
}

function guardEmptyLinks() {
  document.addEventListener("click", (e) => {
    const a = e.target instanceof Element ? e.target.closest("a") : null;
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href === "#" || href.trim() === "") {
      e.preventDefault();
      toast("Personaliza este botón antes de publicarlo.");
    }
  });
}

function main() {
  applySavedTheme();
  hydrateText();
  setLinks();
  setQr();
  renderGallery();
  bumpStat();
  wireActions();
  guardEmptyLinks();
}

main();

