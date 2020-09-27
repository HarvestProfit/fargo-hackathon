import { rgb } from 'd3-color';

export default function colorToRGBArray(color) {
  if (Array.isArray(color)) {
    return color.slice(0, 4);
  }
  const c = rgb(color);
  return [c.r, c.g, c.b, 255];
}
