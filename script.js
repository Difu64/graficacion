function convertRGBtoHSV(R, G, B) {
  if (![R, G, B].every(Number.isFinite) || [R, G, B].some(n => n < 0 || n > 255)) {
    throw new Error("Los canales RGB deben estar entre 0 y 255.");
  }
  const r = R / 255, g = G / 255, b = B / 255;
  const maximo = Math.max(r, g, b);
  const minimo = Math.min(r, g, b);
  const delta = maximo - minimo;
  let h = 0, s = 0;
  const v = maximo * 100;
  if (delta !== 0) {
    s = (delta / maximo) * 100;
    if (maximo === r) h = 60 * (((g - b) / delta) % 6);
    else if (maximo === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  if (h < 0) h += 360;
  return { h: Number(h.toFixed(2)), s: Number(s.toFixed(2)), v: Number(v.toFixed(2)) };
}
function convertRGBtoHSL(R, G, B) {
  const r = R / 255, g = G / 255, b = B / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  if (h < 0) h += 360;
  return { h: Number(h.toFixed(2)), s: Number((s * 100).toFixed(2)), l: Number((l * 100).toFixed(2)) };
}
const $ = id => document.getElementById(id);
function updateColor() {
  const R = Number($('red').value), G = Number($('green').value), B = Number($('blue').value);
  const hsv = convertRGBtoHSV(R, G, B), hsl = convertRGBtoHSL(R, G, B);
  const hex = '#' + [R, G, B].map(n => n.toString(16).padStart(2, '0')).join('').toUpperCase();
  const max = Math.max(R, G, B) / 255, min = Math.min(R, G, B) / 255, delta = max - min;
  $('redOut').textContent = R; $('greenOut').textContent = G; $('blueOut').textContent = B;
  $('colorPreview').style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  $('hexBadge').textContent = hex;
  $('rgbVal').textContent = `${R}, ${G}, ${B}`;
  $('hsvVal').textContent = `${hsv.h}°, ${hsv.s}%, ${hsv.v}%`;
  $('hslVal').textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
  $('cmyVal').textContent = `${((1-R/255)*100).toFixed(2)}, ${((1-G/255)*100).toFixed(2)}, ${((1-B/255)*100).toFixed(2)}`;
  $('deltaVal').textContent = `${max.toFixed(3)} / ${min.toFixed(3)} / ${delta.toFixed(3)}`;
  $('colorPreview').style.color = (R*0.299 + G*0.587 + B*0.114) > 145 ? '#101514' : '#ffffff';
}
['red', 'green', 'blue'].forEach(id => $(id).addEventListener('input', updateColor));
$('resetColor').addEventListener('click', () => { $('red').value = 64; $('green').value = 128; $('blue').value = 192; updateColor(); });
$('runTest').addEventListener('click', () => {
  const result = convertRGBtoHSV(64, 128, 192);
  const ok = result.h === 210 && result.s === 66.67 && result.v === 75.29;
  $('testResult').textContent = (ok ? '✓ Prueba superada: ' : '✗ Revisar cálculo: ') + JSON.stringify(result) + '. Se esperaba h = 210°, s = 66.67% y v = 75.29%.';
});
updateColor();
