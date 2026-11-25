import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

gsap.ticker.lagSmoothing(0);
import { SketchBox, SketchLines } from './Sketch';
import { BLUE, INK, PAPER, notebookTexture, noteTexture, paperTexture } from './paper';

type V3 = [number, number, number];

import { W, H, START_Z, END_Z, DOORS } from './layout';
export { W, H, START_Z, END_Z, DOORS };
const LEN_FRONT = 11;
const LEN_BACK = -47;

const NOTES = [
  { id: 'leadpilot', lines: ['LeadPilot AI'], sub: 'AI sales agent (Claude)', side: 1, z: -5, bg: '#fff4b8' },
  { id: 'anpr', lines: ['AI ANPR'], sub: 'number-plate recognition', side: -1, z: -12, bg: '#d9f2ff' },
  { id: 'mykeys', lines: ['MYKEYS'], sub: 'London property platform', side: 1, z: -19, bg: '#ffe1ec' },
  { id: 'growra', lines: ['Growra Homes'], sub: 'real estate platform', side: -1, z: -26, bg: '#e3f8de' },
  { id: 'wa4link', lines: ['Wa4Link'], sub: 'WhatsApp links + QR SaaS', side: 1, z: -33, bg: '#efe3ff' },
] as const;

type Shared = {
  progress: MutableRefObject<number>;
  onDoor: (id: string) => void;
  onNote: (id: string) => void;
  reducedMotion: boolean;
};

/* ------------------------------------------------------------ shell */
function Shell() {
  const len = LEN_FRONT - LEN_BACK;
  const midZ = (LEN_FRONT + LEN_BACK) / 2;
  const floor = useMemo(() => notebookTexture([3, len / 2]), [len]);
  const wall = useMemo(() => paperTexture([len / 4, 1.5], 2), [len]);
  const ceil = useMemo(() => paperTexture([2, len / 4], 5), [len]);

  // corridor outline: long corner edges + cross "ribs" every 7 units
  const paths = useMemo(() => {
    const p: V3[][] = [
      [[-W, 0, LEN_FRONT], [-W, 0, LEN_BACK]],
      [[W, 0, LEN_FRONT], [W, 0, LEN_BACK]],
      [[-W, H, LEN_FRONT], [-W, H, LEN_BACK]],
      [[W, H, LEN_FRONT], [W, H, LEN_BACK]],
    ];
    for (let z = 4.5; z > LEN_BACK; z -= 7) {
      p.push([[-W, 0, z], [-W, H, z]], [[W, 0, z], [W, H, z]], [[-W, H, z], [W, H, z]]);
    }
    // skirting line
    p.push([[-W, 0.35, LEN_FRONT], [-W, 0.35, LEN_BACK]], [[W, 0.35, LEN_FRONT], [W, 0.35, LEN_BACK]]);
    return p;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, midZ]}>
        <planeGeometry args={[W * 2, len]} />
        <meshBasicMaterial map={floor} color="#f4efe4" toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, midZ]}>
        <planeGeometry args={[W * 2, len]} />
        <meshBasicMaterial map={ceil} color="#efe9dc" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-W, H / 2, midZ]}>
        <planeGeometry args={[len, H]} />
        <meshBasicMaterial map={wall} color="#faf7f0" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[W, H / 2, midZ]}>
        <planeGeometry args={[len, H]} />
        <meshBasicMaterial map={wall} color="#f6f2ea" toneMapped={false} />
      </mesh>
      <SketchLines paths={paths} width={1.3} />
    </group>
  );
}

/* ------------------------------------------------------------- door */
function Door({ d, onDoor, open }: { d: (typeof DOORS)[number]; onDoor: (id: string) => void; open: boolean }) {
  const hinge = useRef<THREE.Group>(null!);
  const [hover, setHover] = useState(false);
  const sign = useMemo(() => noteTexture({ lines: [d.label], sub: d.sub, size: 96, seed: d.z * -7 + 1 }), [d]);
  const inside = useMemo(
    () => noteTexture({ lines: ['→'], sub: `open ${d.label.toLowerCase()}`, w: 256, h: 512, bg: '#ffe9a8', size: 150, seed: 11 }),
    [d],
  );
  const s = d.side;
  const base = s === -1 ? Math.PI / 2 : -Math.PI / 2;
  const hingeZ = d.z + (s === -1 ? 0.7 : -0.7);
  const wallX = s * (W - 0.02);

  useFrame((_, dt) => {
    const target = base - (open ? 1.45 : hover ? 0.3 : 0);
    hinge.current.rotation.y = THREE.MathUtils.damp(hinge.current.rotation.y, target, open ? 3 : 7, dt);
  });

  return (
    <group>
      {/* doorway glow behind the door */}
      <mesh
        visible={!open}
        position={[wallX, 1.3, d.z]}
        rotation={[0, -s * (Math.PI / 2), 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDoor(d.id);
        }}
      >
        <planeGeometry args={[1.4, 2.6]} />
        <meshBasicMaterial map={inside} toneMapped={false} />
      </mesh>
      {/* frame */}
      <SketchBox size={[0.12, 2.78, 1.62]} position={[wallX, 1.39, d.z]} seed={Math.abs(d.z) * 3} width={2.2} skip={[0, 4, 8, 9]} />

      {/* door leaf on its hinge */}
      <group ref={hinge} position={[s * (W - 0.06), 0, hingeZ]} rotation={[0, base, 0]}>
        <group
          position={[0.7, 1.3, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = '';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDoor(d.id);
          }}
        >
          <mesh>
            <boxGeometry args={[1.4, 2.6, 0.06]} />
            <meshBasicMaterial color={hover ? '#fff6cc' : '#fffdf7'} toneMapped={false} />
          </mesh>
          <SketchBox size={[1.4, 2.6, 0.06]} seed={Math.abs(d.z) * 5 + 2} width={1.8} />
          {/* inset panels */}
          <SketchBox size={[1.0, 0.9, 0.001]} position={[0, 0.65, 0.035]} seed={Math.abs(d.z) + 4} width={1.1} passes={1} />
          <SketchBox size={[1.0, 0.9, 0.001]} position={[0, -0.55, 0.035]} seed={Math.abs(d.z) + 8} width={1.1} passes={1} />
          {/* knob */}
          <mesh position={[0.52, -0.05, 0.07]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={BLUE} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* hanging sign, perpendicular to the wall so you read it as you walk up */}
      <group position={[s * (W - 0.85), 3.25, d.z + 0.95]}>
        <mesh>
          <planeGeometry args={[1.5, 0.75]} />
          <meshBasicMaterial map={sign} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        <SketchLines
          paths={[
            [[-0.55, 0.37, 0], [-0.55, H - 3.25, 0]],
            [[0.55, 0.37, 0], [0.55, H - 3.25, 0]],
            [[s * 0.8, 0.2, 0], [s * 0.8, 0.2, 0]],
          ]}
          width={1.2}
        />
      </group>
    </group>
  );
}

/* --------------------------------------------------- sticky notes */
function Note({ n, onNote }: { n: (typeof NOTES)[number]; onNote: (id: string) => void }) {
  const g = useRef<THREE.Group>(null!);
  const [hover, setHover] = useState(false);
  const tex = useMemo(() => noteTexture({ lines: [...n.lines], sub: n.sub, bg: n.bg, size: 86, tape: true, seed: Math.abs(n.z) * 13 }), [n]);
  const tilt = ((Math.abs(n.z) * 37) % 10) / 100 - 0.05;
  useFrame((_, dt) => {
    g.current.scale.setScalar(THREE.MathUtils.damp(g.current.scale.x, hover ? 1.08 : 1, 8, dt));
  });
  return (
    <group
      ref={g}
      position={[n.side * (W - 0.03), 1.95, n.z]}
      rotation={[0, -n.side * (Math.PI / 2), tilt]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onNote(n.id);
      }}
    >
      <mesh>
        <planeGeometry args={[1.7, 0.85]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------- entrance & end */
function EndWall() {
  const tex = useMemo(
    () => noteTexture({ lines: ['End of the hall'], sub: 'pick any door to step inside', w: 1024, h: 512, size: 130, seed: 33 }),
    [],
  );
  return (
    <group position={[0, 0, LEN_BACK]}>
      <mesh position={[0, H / 2, 0]}>
        <planeGeometry args={[W * 2, H]} />
        <meshBasicMaterial color="#f1ecdf" toneMapped={false} />
      </mesh>
      <mesh position={[0, 2.1, 0.02]}>
        <planeGeometry args={[3.6, 1.8]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* floor arrows */
function Arrows() {
  const paths = useMemo(() => {
    const p: V3[][] = [];
    for (let z = 2; z > END_Z; z -= 7) {
      p.push([[0, 0.01, z], [0, 0.01, z - 1.2]], [[-0.25, 0.01, z - 0.9], [0, 0.01, z - 1.2], [0.25, 0.01, z - 0.9]]);
    }
    return p;
  }, []);
  return <SketchLines paths={paths} color={BLUE} width={2.2} seed={4} />;
}

/* -------------------------------------------------------------- rooms */
const ROOM_W = 8; // depth of a room away from the corridor (x)
const ROOM_D = 7; // length along z

const ROOM_STYLE: Record<string, { tint: string; title: string; sub: string }> = {
  about: { tint: '#fff8e6', title: 'About me', sub: 'who I am & how I work' },
  projects: { tint: '#eef6ff', title: 'Projects', sub: 'things I built and shipped' },
  experience: { tint: '#f3fbef', title: 'Experience', sub: "where I've worked" },
  skills: { tint: '#fdf0f5', title: 'Skills', sub: 'my toolbox' },
  contact: { tint: '#f4efff', title: 'Contact', sub: "let's talk" },
};

function Room({ d, visible }: { d: (typeof DOORS)[number]; visible: boolean }) {
  const s = d.side;
  const cx = s * (W + ROOM_W / 2);
  const st = ROOM_STYLE[d.id];
  const walls = useMemo(() => paperTexture([3, 1.5], Math.abs(d.z) + 50), [d.z]);
  const floor = useMemo(() => notebookTexture([2, 2]), []);
  const title = useMemo(
    () => noteTexture({ lines: [st.title], sub: st.sub, w: 1024, h: 320, size: 130, tape: true, seed: Math.abs(d.z) * 3 }),
    [st, d.z],
  );
  const farX = s * (W + ROOM_W - 0.03);

  return (
    <group visible={visible}>
      {/* inside of the room (back faces only, so it is invisible from the corridor) */}
      <mesh position={[cx, H / 2, d.z]}>
        <boxGeometry args={[ROOM_W, H, ROOM_D]} />
        <meshBasicMaterial map={walls} color={st.tint} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0.003, d.z]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshBasicMaterial map={floor} color="#f6f1e6" toneMapped={false} />
      </mesh>
      <SketchBox size={[ROOM_W, H, ROOM_D]} position={[cx, H / 2, d.z]} seed={Math.abs(d.z) * 11} width={1.4} />

      {/* title card on the far wall */}
      <mesh position={[farX, 3.35, d.z]} rotation={[0, -s * (Math.PI / 2), 0]}>
        <planeGeometry args={[3.2, 1]} />
        <meshBasicMaterial map={title} toneMapped={false} />
      </mesh>

      {/* window on the far wall */}
      <group position={[farX, 2.0, d.z + 2.4]} rotation={[0, -s * (Math.PI / 2), 0]}>
        <SketchBox size={[1.3, 1.5, 0.02]} seed={Math.abs(d.z) + 61} width={1.6} />
        <SketchLines paths={[[[0, -0.75, 0], [0, 0.75, 0]], [[-0.65, 0, 0], [0.65, 0, 0]]]} width={1.2} seed={62} />
      </group>

      {/* picture frames on the side wall */}
      <group position={[s * (W + 3), 2.1, d.z - ROOM_D / 2 + 0.03]}>
        <SketchBox size={[1.1, 0.8, 0.02]} seed={Math.abs(d.z) + 71} width={1.5} />
        <SketchLines paths={[[[-0.4, -0.25, 0], [-0.1, 0.1, 0], [0.1, -0.1, 0], [0.4, 0.25, 0]]]} color={BLUE} width={1.6} seed={72} />
      </group>
      <group position={[s * (W + 5), 1.9, d.z - ROOM_D / 2 + 0.03]}>
        <SketchBox size={[0.7, 1.0, 0.02]} seed={Math.abs(d.z) + 81} width={1.5} />
      </group>

      {/* desk with a laptop */}
      <group position={[s * (W + ROOM_W - 1.4), 0, d.z - 2.2]}>
        <SketchBox size={[1.2, 0.08, 2]} position={[0, 0.9, 0]} seed={Math.abs(d.z) + 91} width={1.6} />
        <SketchLines
          paths={[
            [[-0.5, 0, -0.9], [-0.5, 0.86, -0.9]],
            [[0.5, 0, -0.9], [0.5, 0.86, -0.9]],
            [[-0.5, 0, 0.9], [-0.5, 0.86, 0.9]],
            [[0.5, 0, 0.9], [0.5, 0.86, 0.9]],
          ]}
          width={1.4}
          seed={92}
        />
        <SketchBox size={[0.5, 0.02, 0.7]} position={[0, 0.96, 0]} seed={93} width={1.2} passes={1} />
        <group position={[s * 0.22, 1.18, 0]} rotation={[0, 0, s * -0.25]}>
          <SketchBox size={[0.02, 0.45, 0.7]} seed={94} width={1.2} passes={1} />
        </group>
      </group>

      {/* plant */}
      <group position={[s * (W + ROOM_W - 0.8), 0, d.z + 2.6]}>
        <SketchBox size={[0.4, 0.45, 0.4]} position={[0, 0.22, 0]} seed={101} width={1.4} />
        <SketchLines
          paths={[
            [[0, 0.45, 0], [-0.15, 0.9, 0.05], [-0.35, 1.05, 0]],
            [[0, 0.45, 0], [0.1, 1.0, 0], [0.3, 1.2, -0.05]],
            [[0, 0.45, 0], [0.02, 1.2, 0.1], [-0.05, 1.4, 0]],
          ]}
          color="#3c8d4a"
          width={2}
          seed={102}
        />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------ camera */
type Mode = 'walk' | 'anim' | 'room';

function Walker({
  progress,
  reducedMotion,
  mode,
  look,
}: {
  progress: MutableRefObject<number>;
  reducedMotion: boolean;
  mode: MutableRefObject<Mode>;
  look: THREE.Vector3;
}) {
  const { camera, pointer } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const fov = cam.aspect < 0.8 ? 88 : cam.aspect < 1.2 ? 74 : 62;
    if (Math.abs(cam.fov - fov) > 0.1) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    if (mode.current === 'walk') {
      const z = THREE.MathUtils.lerp(START_Z, END_Z, progress.current);
      const bob = reducedMotion ? 0 : Math.sin(z * 2.2) * 0.025;
      const px = reducedMotion ? 0 : pointer.x * 0.35;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 3, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.75 + bob, 4, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 5, dt);
      tmp.set(pointer.x * (reducedMotion ? 0 : 1.2), 1.65 + pointer.y * (reducedMotion ? 0 : 0.5), camera.position.z - 10);
      look.lerp(tmp, 1 - Math.exp(-5 * dt));
    } else if (mode.current === 'room' && !reducedMotion) {
      look.y = THREE.MathUtils.damp(look.y, 1.8 + pointer.y * 0.4, 3, dt);
    }
    camera.lookAt(look);
  });
  return null;
}

function Director({
  room,
  mode,
  look,
  onArrived,
  onExited,
  reducedMotion,
}: {
  room: string | null;
  mode: MutableRefObject<Mode>;
  look: THREE.Vector3;
  onArrived: (id: string) => void;
  onExited: (z: number) => void;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const prev = useRef<string | null>(null);
  useEffect(() => {
    const k = reducedMotion ? 0.35 : 1;
    const tl = gsap.timeline();
    const d = DOORS.find((x) => x.id === room);
    if (d) {
      const s = d.side;
      mode.current = 'anim';
      tl.to(camera.position, { x: 0, y: 1.75, z: d.z + 0.6, duration: 0.7 * k, ease: 'power2.inOut' }, 0)
        .to(look, { x: s * W, y: 1.6, z: d.z, duration: 0.7 * k, ease: 'power2.inOut' }, 0)
        .to(camera.position, { x: s * (W + 1.6), y: 1.8, z: d.z, duration: 1.1 * k, ease: 'power2.inOut' })
        .to(look, { x: s * (W + ROOM_W), y: 1.8, z: d.z, duration: 1.1 * k, ease: 'power2.inOut' }, '<')
        .call(() => {
          mode.current = 'room';
          onArrived(d.id);
        });
    } else if (prev.current) {
      const pd = DOORS.find((x) => x.id === prev.current)!;
      mode.current = 'anim';
      tl.to(camera.position, { x: 0, y: 1.75, z: pd.z + 0.6, duration: 1.0 * k, ease: 'power2.inOut' }, 0)
        .to(look, { x: 0, y: 1.65, z: pd.z - 10, duration: 1.0 * k, ease: 'power2.inOut' }, 0)
        .call(() => {
          mode.current = 'walk';
          onExited(pd.z + 0.6);
        });
    }
    prev.current = room;
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  return null;
}

type SceneProps = Shared & {
  room: string | null;
  onArrived: (id: string) => void;
  onExited: (z: number) => void;
};

function Scene({ progress, onDoor, onNote, reducedMotion, room, onArrived, onExited }: SceneProps) {
  const mode = useRef<Mode>('walk');
  const look = useMemo(() => new THREE.Vector3(0, 1.7, -10), []);
  // keep the last room drawn while walking back out of it
  const [shownRoom, setShownRoom] = useState<string | null>(null);
  useEffect(() => {
    if (room) setShownRoom(room);
  }, [room]);
  const exited = useCallback(
    (z: number) => {
      setShownRoom(null);
      onExited(z);
    },
    [onExited],
  );
  return (
    <>
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 12, 36]} />
      <Shell />
      <Arrows />
      {DOORS.map((d) => (
        <Door key={d.id} d={d} onDoor={onDoor} open={room === d.id} />
      ))}
      {DOORS.map((d) => (
        <Room key={`room-${d.id}`} d={d} visible={shownRoom === d.id} />
      ))}
      {NOTES.map((n) => (
        <Note key={n.id} n={n} onNote={onNote} />
      ))}
      <EndWall />
      <Walker progress={progress} reducedMotion={reducedMotion} mode={mode} look={look} />
      <Director room={room} mode={mode} look={look} onArrived={onArrived} onExited={exited} reducedMotion={reducedMotion} />
      <AdaptiveDpr pixelated={false} />
    </>
  );
}

export default function Corridor(props: SceneProps & { active: boolean; lowPower: boolean }) {
  const { active, lowPower, ...rest } = props;
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 1.75, START_Z], fov: 62, near: 0.05, far: 80 }}
      gl={{ antialias: true }}
      onPointerMissed={() => (document.body.style.cursor = '')}
    >
      <Scene {...rest} />
    </Canvas>
  );
}

export { INK };
