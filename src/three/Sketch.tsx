import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { INK, rng } from './paper';

type V3 = [number, number, number];

/** A single pen stroke between two points, with slight wobble and an overshoot like a real sketch. */
function stroke(a: V3, b: V3, r: () => number, wobble: number): V3[] {
  const pts: V3[] = [];
  const seg = 5;
  const over = 0.04 + r() * 0.06;
  for (let i = 0; i <= seg; i++) {
    const t = -over + (i / seg) * (1 + over * 2);
    const n = i === 0 || i === seg ? 0.3 : 1;
    pts.push([
      a[0] + (b[0] - a[0]) * t + (r() - 0.5) * wobble * n,
      a[1] + (b[1] - a[1]) * t + (r() - 0.5) * wobble * n,
      a[2] + (b[2] - a[2]) * t + (r() - 0.5) * wobble * n,
    ]);
  }
  return pts;
}

/** Polylines -> flat segment pairs, so many strokes render in ONE draw call. */
function toSegments(polys: V3[][]): V3[] {
  const out: V3[] = [];
  for (const p of polys) for (let i = 0; i < p.length - 1; i++) out.push(p[i], p[i + 1]);
  return out;
}

function Strokes({ main, light, color, width }: { main: V3[]; light: V3[]; color: string; width: number }) {
  return (
    <>
      {main.length > 1 && <Line segments points={main} color={color} lineWidth={width} transparent opacity={0.95} />}
      {light.length > 1 && <Line segments points={light} color={color} lineWidth={width * 0.6} transparent opacity={0.5} />}
    </>
  );
}

/** Ink outline of a box (w × h × d), drawn twice for a hand-sketched feel. */
export function SketchBox({
  size,
  position = [0, 0, 0],
  seed = 1,
  color = INK,
  width = 1.6,
  wobble = 0.03,
  passes = 2,
  skip = [],
}: {
  size: V3;
  position?: V3;
  seed?: number;
  color?: string;
  width?: number;
  wobble?: number;
  passes?: number;
  skip?: number[];
}) {
  const [main, light] = useMemo(() => {
    const [w, h, d] = size.map((v) => v / 2) as V3;
    const c: V3[] = [
      [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
      [-w, -h, d], [w, -h, d], [w, h, d], [-w, h, d],
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    const r = rng(seed);
    const a: V3[][] = [];
    const b: V3[][] = [];
    edges.forEach(([i, j], k) => {
      if (skip.includes(k)) return;
      a.push(stroke(c[i], c[j], r, wobble));
      if (passes > 1) b.push(stroke(c[i], c[j], r, wobble));
    });
    return [toSegments(a), toSegments(b)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.join(','), seed, wobble, passes, skip.join(',')]);

  return (
    <group position={position}>
      <Strokes main={main} light={light} color={color} width={width} />
    </group>
  );
}

/** Free sketch lines (list of point lists). */
export function SketchLines({ paths, color = INK, width = 1.4, seed = 9 }: { paths: V3[][]; color?: string; width?: number; seed?: number }) {
  const main = useMemo(() => {
    const r = rng(seed);
    const polys: V3[][] = [];
    for (const p of paths) for (let i = 0; i < p.length - 1; i++) polys.push(stroke(p[i], p[i + 1], r, 0.025));
    return toSegments(polys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(paths), seed]);
  return <Strokes main={main} light={[]} color={color} width={width} />;
}
