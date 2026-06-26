// /api/subscribe.js — Función serverless de Vercel
// Recibe { email } desde el formulario de newsletter y lo agrega a una lista de Brevo.
// La API key y el ID de lista se configuran como Variables de Entorno en Vercel
// (Settings → Environment Variables): BREVO_API_KEY y BREVO_LIST_ID.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  const API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = Number(process.env.BREVO_LIST_ID);

  if (!API_KEY || !LIST_ID) {
    return res.status(500).json({ message: 'Falta configurar BREVO_API_KEY o BREVO_LIST_ID en Vercel' });
  }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        updateEnabled: true // si el contacto ya existe, lo actualiza en vez de fallar
      })
    });

    // Brevo devuelve 201 (creado) o 204 (actualizado) en caso de éxito
    if (r.status === 201 || r.status === 204) {
      return res.status(200).json({ ok: true });
    }

    const data = await r.json().catch(() => ({}));
    // Si el contacto ya existía y no se pudo actualizar, lo tratamos como éxito suave
    if (data.code === 'duplicate_parameter') {
      return res.status(200).json({ ok: true });
    }
    return res.status(502).json({ message: data.message || 'Error al suscribir en Brevo' });
  } catch (err) {
    return res.status(500).json({ message: 'Error de servidor' });
  }
}
