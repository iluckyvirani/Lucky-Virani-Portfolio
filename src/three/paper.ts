import * as THREE from 'three';

export const PAPER = '#f7f3ea';
export const INK = '#26231f';
export const BLUE = '#2f5bd3';
export const HAND = '"Caveat", "Segoe Print", "Comic Sans MS", cursive';

/** Seeded random so the sketch looks the same on every visit. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function grain(ctx: CanvasRenderingContext2D, w: number, h: number, seed: number, amount = 0.05) {
  const img = ctx.getImageData(0, 0, w, h);
  const r = rng(seed);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (r() - 0.5) * 255 * amount;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

function toTexture(c: HTMLCanvasElement, repeat?: [number, number]) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

/** Plain paper with fibre grain (walls, ceiling). */
export function paperTexture(repeat: [number, number], seed = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 256, 256);
  grain(ctx, 256, 256, seed, 0.045);
  return toTexture(c, repeat);
}

/** Notebook paper: ruled blue lines and a red margin (floor). */
export function notebookTexture(repeat: [number, number]) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fbf8f1';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#9db7e8';
  ctx.lineWidth = 2;
  for (let y = 32; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }
  grain(ctx, 512, 512, 7, 0.04);
  return toTexture(c, repeat);
}

/** Hand-lettered card: used for door signs, wall notes and the end wall. */
export function noteTexture(opts: {
  lines: string[];
  sub?: string;
  w?: number;
  h?: number;
  bg?: string;
  color?: string;
  size?: number;
  tape?: boolean;
  seed?: number;
}) {
  const { lines, sub, w = 512, h = 256, bg = '#fffdf7', color = INK, size = 92, tape = false, seed = 3 } = opts;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  grain(ctx, w, h, seed, 0.04);

  // wobbly double border
  const r = rng(seed);
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  for (let pass = 0; pass < 2; pass++) {
    ctx.lineWidth = pass === 0 ? 5 : 2;
    ctx.beginPath();
    const j = () => (r() - 0.5) * 8;
    ctx.moveTo(14 + j(), 14 + j());
    ctx.lineTo(w - 14 + j(), 14 + j());
    ctx.lineTo(w - 14 + j(), h - 14 + j());
    ctx.lineTo(14 + j(), h - 14 + j());
    ctx.closePath();
    ctx.stroke();
  }

  if (tape) {
    ctx.fillStyle = 'rgba(255, 224, 102, 0.75)';
    ctx.save();
    ctx.translate(w / 2, 10);
    ctx.rotate(-0.06);
    ctx.fillRect(-60, -16, 120, 34);
    ctx.restore();
  }

  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const total = lines.length + (sub ? 0.7 : 0);
  let y = h / 2 - ((total - 1) * size * 0.9) / 2;
  for (const l of lines) {
    ctx.font = `700 ${size}px ${HAND}`;
    ctx.fillText(l, w / 2, y);
    y += size * 0.95;
  }
  if (sub) {
    ctx.font = `500 ${Math.round(size * 0.42)}px ${HAND}`;
    ctx.globalAlpha = 0.75;
    ctx.fillText(sub, w / 2, y - size * 0.25);
  }
  return toTexture(c);
}
