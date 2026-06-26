# Guía de imágenes

Reemplazá cada placeholder por la imagen real **usando exactamente el mismo nombre de archivo**. No hace falta tocar el HTML.

| Archivo | Dónde aparece | Proporción | Medida sugerida | Notas |
|---|---|---|---|---|
| `juan.jpg` | Hero (foto principal) | 3:4 vertical | 900 × 1200 px | El sitio le aplica filtro **blanco y negro** por CSS. Mejor que la cara quede en la mitad superior (el recorte es `object-position: top`). |
| `tapa-cartas.jpg` | Libro "Cartas a mi madre" | 2:3 vertical | 800 × 1200 px | Tapa del libro. También se ve en B&N. |
| `tapa-llama.jpg` | Libro "La llama del amor" | 2:3 vertical | 800 × 1200 px | Tapa del libro. |
| `evento1.jpg` | Evento (opcional) | 4:3 | 1000 × 750 px | Solo se muestra si descomentás el `<img>` en `index.html`. |
| `og-image.jpg` | Preview al compartir el link | 1.91:1 | 1200 × 630 px | Lo que se ve en WhatsApp / redes cuando pegás el link. |

## Recomendaciones

- **Formato:** JPG o WebP. WebP pesa bastante menos con la misma calidad.
- **Peso:** apuntá a < 200 KB por imagen. Comprimí en [squoosh.app](https://squoosh.app) o [tinypng.com](https://tinypng.com).
- **Blanco y negro:** el hero, las tapas y el evento se renderizan en escala de grises por diseño. Si querés que se vean en color, sacá la línea `filter: grayscale(100%);` del CSS correspondiente en `index.html`.
- **Mismo nombre = sin tocar código.** Si cambiás el nombre de un archivo, acordate de actualizar el `src` en `index.html`.
