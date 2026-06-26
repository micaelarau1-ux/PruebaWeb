# Integraciones — paso a paso

Tres cosas para dejar funcionando: **Spotify**, **formulario de contacto** y **newsletter**.
Spotify ya está activo. Los otros dos necesitan que generes una clave/ID de tu lado.

---

## 1. Spotify 🎵 — ya está conectado

El embed del artista ya quedó activo en la sección Música. Solo cambiá lo que se muestra si querés:

1. Abrí Spotify (app o web) en el álbum, playlist o canción que quieras mostrar.
2. Botón **···** (más opciones) → **Compartir** → **Insertar** (Embed).
3. Copiá la URL que aparece en el `src` del código (empieza con `https://open.spotify.com/embed/...`).
4. En `index.html`, sección Música, pegá esa URL reemplazando la del `src` del `<iframe>`.

> Ahora muestra el artista completo. Si querés que arranque mostrando el último disco, usá el embed del álbum.

---

## 2. Formulario de contacto ✉️ — que los mensajes lleguen a un email

Usa **Formspree** (gratis hasta 50 mensajes/mes, suficiente para un sitio así).

1. Entrá a [formspree.io](https://formspree.io) y registrate con el email donde querés **recibir** los mensajes.
2. **New Form** → ponele un nombre (ej. "Contacto web Juan").
3. Te da un endpoint con esta forma: `https://formspree.io/f/abcdwxyz`.
4. En `index.html`, buscá la línea:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX';
   ```
   y reemplazá `XXXXXXXX` por tu código real.
5. `git push` → Vercel redeploya. El **primer** mensaje de prueba pide confirmar el email una vez; después llegan directo al inbox.

> **Alternativa sin cuenta:** [web3forms.com](https://web3forms.com) te da una *access key* por email (gratis e ilimitado). Si preferís esa, avisame y te dejo el código adaptado.

---

## 3. Newsletter 📩 — que los suscriptores entren a tu lista de Brevo

Ya está armada la función `api/subscribe.js` que conecta el formulario con **Brevo**. Solo falta cargar dos datos en Vercel (la API key queda del lado del servidor, nunca en el HTML).

**a) Conseguir la API key**
1. En [brevo.com](https://www.brevo.com) → arriba a la derecha, tu nombre → **SMTP & API** → pestaña **API Keys** → **Generate a new API key**.
2. Copiala (empieza con `xkeysib-`). Se ve una sola vez.

**b) Conseguir el ID de la lista**
1. Brevo → **Contacts** → **Lists**.
2. Creá la lista (ej. "Newsletter web") o usá una existente. El **ID** es el número que aparece al lado del nombre.

**c) Cargar las variables en Vercel**
1. En tu proyecto de Vercel → **Settings** → **Environment Variables**.
2. Agregá estas dos (para Production, Preview y Development):
   | Name | Value |
   |---|---|
   | `BREVO_API_KEY` | tu clave `xkeysib-...` |
   | `BREVO_LIST_ID` | el número de la lista (ej. `2`) |
3. **Redeploy** (Deployments → ··· → Redeploy) para que tome las variables.

Listo: cada email que se suscribe entra a esa lista de Brevo. Si el contacto ya existía, lo actualiza sin romper.

> **Importante:** estas variables **no** van en el código ni en GitHub. El archivo `.env.example` es solo una referencia de los nombres; el `.gitignore` ya bloquea los `.env` reales.

> **Alternativa sin función:** si no querés manejar la función serverless, Brevo te da un formulario embebible listo (Contacts → Forms). Es más rápido de poner, pero usa el diseño de Brevo en vez del input personalizado del sitio.

---

## Resumen de qué tenés que generar vos

| Integración | Qué necesitás | Dónde se pega |
|---|---|---|
| Spotify | (opcional) URL de embed del álbum/playlist | `src` del `<iframe>` en `index.html` |
| Contacto | Endpoint de Formspree | `FORMSPREE_ENDPOINT` en `index.html` |
| Newsletter | `BREVO_API_KEY` + `BREVO_LIST_ID` | Variables de entorno en Vercel |
