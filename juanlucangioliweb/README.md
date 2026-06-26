# Juan Lucangioli — Landing

Sitio estático (HTML + CSS + JS, sin build). Se sube a GitHub y se deploya en Vercel sin configuración.

```
juanlucangioli-web/
├── index.html        ← la página (no renombrar)
├── api/
│   └── subscribe.js      función serverless (newsletter → Brevo)
├── assets/           ← imágenes
│   ├── juan.jpg          (hero)
│   ├── tapa-cartas.jpg   (libro 1)
│   ├── tapa-llama.jpg    (libro 2)
│   ├── evento1.jpg       (evento — opcional)
│   ├── og-image.jpg      (preview al compartir el link)
│   └── README.md         (medidas exactas de cada imagen)
├── INTEGRACIONES.md  ← paso a paso: Spotify, contacto y newsletter
├── .env.example      ← nombres de las variables de Brevo (referencia)
├── README.md
└── .gitignore
```

> Las imágenes que vienen en `assets/` son **placeholders** en escala de grises. Reemplazalas por las reales **manteniendo el mismo nombre de archivo** y listo, no hace falta tocar el HTML. Las medidas de cada una están en `assets/README.md`.

---

## 1. Subir a GitHub

Desde la carpeta del proyecto, en la terminal:

```bash
git init
git add .
git commit -m "Landing Juan Lucangioli"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/juanlucangioli-web.git
git push -u origin main
```

Antes del `push`, creá el repo vacío en github.com (sin README, sin .gitignore — ya los tenés acá) y pegá su URL en el `git remote add`.

> Si no usás terminal: en github.com → **Add file → Upload files**, arrastrás todo el contenido de la carpeta (incluyendo `assets/`) y hacés commit.

---

## 2. Deployar en Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión **con tu cuenta de GitHub**.
2. **Add New… → Project**.
3. **Import** el repo `juanlucangioli-web`.
4. En la configuración:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (raíz)
   - **Build Command:** dejar vacío
   - **Output Directory:** dejar vacío
5. **Deploy**.

En ~30 segundos tenés una URL tipo `juanlucangioli-web.vercel.app`. A partir de ahí, **cada `git push` a `main` redeploya solo**.

### Dominio propio (opcional)
En el proyecto de Vercel → **Settings → Domains** → agregás tu dominio y seguís las instrucciones de DNS.

---

## 3. Cambiar las imágenes más adelante

1. Reemplazá el archivo en `assets/` (mismo nombre).
2. `git add . && git commit -m "Actualizo imágenes" && git push`
3. Vercel redeploya automáticamente.

---

## Integraciones

El detalle paso a paso está en **`INTEGRACIONES.md`**. Resumen:

- **Spotify** → ya activo en la sección Música (mostrá un álbum/playlist distinto cambiando el `src` del iframe).
- **Formulario de contacto** → llega a tu email vía Formspree. Falta pegar tu endpoint en `index.html` (`FORMSPREE_ENDPOINT`).
- **Newsletter** → suscribe a tu lista de Brevo vía `api/subscribe.js`. Falta cargar `BREVO_API_KEY` y `BREVO_LIST_ID` en Vercel.

## Otros pendientes (opcionales, comentados en el HTML)

- **GA4 / Google Tag Manager** (arriba de todo) → pegá tu ID y descomentá.
- **Imagen de evento** (sección Eventos) → descomentá el `<img>` del primer evento si querés mostrarla.
- **og:image / dominio** → cuando tengas la URL final de Vercel, podés poner la URL absoluta en los meta `og:image`.
