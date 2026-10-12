# Museo web: Color en movimiento

Sitio educativo responsive basado en el starter-museo. Incluye una línea del tiempo de cinco momentos, aplicación real, tres experimentos de color, explorador interactivo RGB/CMY/HSV/HSL, pseudocódigo, función `convertRGBtoHSV`, explicación de `delta = 0`, glosario y fuentes.

## Cómo abrirlo
1. Descomprime el proyecto completo.
2. Abre `index.html` en un navegador moderno. No necesita servidor ni instalación.
3. Personaliza `[Escribe tu nombre]` en portada y créditos.
4. Revisa los enlaces de fuentes y añade el grupo/fecha de consulta si tu profesor lo pide.

## Archivos
- `index.html`: contenido y estructura.
- `styles.css`: diseño adaptable a computadora y móvil.
- `script.js`: conversión RGB→HSV/HSL y controles interactivos.

## Nota sobre el contenido
Los dibujos de la línea del tiempo son ilustraciones SVG/CSS originales, no fotografías históricas. Los valores RGB se normalizan entre 0 y 1 para calcular delta. La función devuelve `{ h, s, v }`; H está en grados y S/V en porcentajes.
