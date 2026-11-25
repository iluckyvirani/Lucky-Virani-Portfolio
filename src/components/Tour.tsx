import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import IntroCard from './IntroCard';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Skills from './Skills';
import Certificates from './Certificates';
import Education from './Education';
import Contact from './Contact';
import Chatbot from './Chatbot';
import { openProject } from './Hero';
import { START_Z, END_Z, DOORS } from '../three/layout';

const Corridor = lazy(() => import('../three/Corridor'));

const ROOMS: Record<string, { title: string; content: ReactNode }> = {
  about: { title: 'About me', content: <><About /><Education /></> },
  projects: { title: 'Projects', content: <Projects /> },
  experience: { title: 'Experience', content: <Experience /> },
  skills: { title: 'Skills & certificates', content: <><Skills /><Certificates /></> },
  contact: { title: 'Contact', content: <Contact /> },
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function Tour() {
  const target = useRef(0);
  const [p, setP] = useState(0);
  const [room, setRoom] = useState<string | null>(null); // 3D destination
  const [panel, setPanel] = useState<string | null>(null); // content board shown
  const [fontsReady, setFontsReady] = useState(false);
  const pendingProject = useRef<string | null>(null);
  const busy = useRef(false);
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [lowPower] = useState(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  });

  // the hand-lettering font must be ready before canvas textures are drawn
  useEffect(() => {
    const done = () => setFontsReady(true);
    if (!document.fonts) return done();
    Promise.all([document.fonts.load('700 64px "Caveat"'), document.fonts.load('500 32px "Caveat"')]).then(done, done);
    const t = window.setTimeout(done, 2500);
    return () => window.clearTimeout(t);
  }, []);

  // the tour owns the whole screen: no page scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const walk = useCallback((delta: number) => {
    if (busy.current) return;
    target.current = clamp(target.current + delta);
    setP(Math.round(target.current * 100) / 100);
  }, []);

  const enter = useCallback(
    (id: string) => {
      if (busy.current) return;
      if (room) {
        // already inside another room: go back first, then into the new one
        busy.current = true;
        const cur = DOORS.find((x) => x.id === room);
        if (cur) {
          target.current = clamp((START_Z - (cur.z + 0.6)) / (START_Z - END_Z));
          setP(Math.round(target.current * 100) / 100);
        }
        setPanel(null);
        setRoom(null);
        window.setTimeout(() => {
          busy.current = false;
          setRoom(id);
          busy.current = true;
        }, reducedMotion ? 450 : 1150);
        return;
      }
      busy.current = true;
      setRoom(id);
    },
    [room, reducedMotion],
  );

  const back = useCallback(() => {
    if (!room || busy.current) return;
    busy.current = true;
    // set the walk position to this door right away, so the intro card doesn't flash back
    const d = DOORS.find((x) => x.id === room);
    if (d) {
      target.current = clamp((START_Z - (d.z + 0.6)) / (START_Z - END_Z));
      setP(Math.round(target.current * 100) / 100);
    }
    setPanel(null);
    setRoom(null);
  }, [room]);

  const onArrived = useCallback((id: string) => {
    setPanel(id);
    busy.current = false;
    if (pendingProject.current) {
      const pid = pendingProject.current;
      pendingProject.current = null;
      window.setTimeout(() => openProject(pid), 350);
    }
  }, []);

  const onExited = useCallback((z: number) => {
    target.current = clamp((START_Z - z) / (START_Z - END_Z));
    setP(Math.round(target.current * 100) / 100);
    busy.current = false;
  }, []);

  const onNote = useCallback(
    (projectId: string) => {
      pendingProject.current = projectId;
      enter('projects');
    },
    [enter],
  );

  // wheel / touch / keyboard walking (only in the corridor)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (room) return;
      walk(e.deltaY * 0.00045);
    };
    let lastY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (room || lastY === null) return;
      const y = e.touches[0].clientY;
      walk((lastY - y) * 0.0016);
      lastY = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return back();
      if (room) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) walk(0.05);
      if (['ArrowUp', 'PageUp'].includes(e.key)) walk(-0.05);
      if (e.key === 'Home') walk(-1);
      if (e.key === 'End') walk(1);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [room, walk, back]);

  const introOpacity = room ? 0 : Math.max(0, 1 - p * 9);
  const showHint = !room && p > 0.06;

  return (
    <div className="fixed inset-0 overflow-hidden bg-paper">
      <Header onNav={enter} onHome={() => (room ? back() : walk(-1))} />

      {fontsReady && (
        <Suspense fallback={null}>
          <Corridor
            progress={target}
            onDoor={enter}
            onNote={onNote}
            reducedMotion={reducedMotion}
            active
            lowPower={lowPower}
            room={room}
            onArrived={onArrived}
            onExited={onExited}
          />
        </Suspense>
      )}

      {/* intro card */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 transition-opacity duration-300" style={{ opacity: introOpacity }}>
        <div className={introOpacity > 0.3 ? 'pointer-events-auto' : ''}>
          <IntroCard walkHint onProjects={() => enter('projects')} />
        </div>
      </div>

      {/* hint + progress */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 transition-opacity duration-300" style={{ opacity: showHint ? 1 : 0 }}>
        <p className="rounded-full bg-[#fffdf7]/90 px-4 py-1 font-hand text-xl text-ink shadow-[2px_3px_0_#26231f]">
          <span className="hidden md:inline">scroll to walk · click a door to step inside · click a sticky note to open a project</span>
          <span className="md:hidden">swipe to walk · tap a door or a sticky note</span>
        </p>
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full bg-blue-ink transition-[width] duration-200" style={{ width: `${p * 100}%` }} />
        </div>
      </div>

      {/* room content board */}
      <div
        className={`absolute inset-x-2 bottom-2 top-16 z-30 mx-auto max-w-6xl transition-all duration-500 md:inset-x-8 md:bottom-8 md:top-24 ${
          panel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
        }`}
        aria-hidden={!panel}
      >
        <div className="sketch-box flex h-full flex-col overflow-hidden bg-paper shadow-[6px_8px_0_#26231f]">
          <div className="flex items-center justify-between border-b-2 border-ink/15 bg-[#fffdf7] px-4 py-2 md:px-6">
            <button onClick={back} className="sketch-btn inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-ink">
              <ArrowLeft size={16} /> Back to the hall
            </button>
            <p className="font-hand text-3xl font-bold text-ink">{panel ? ROOMS[panel].title : ''}</p>
            <span className="hidden text-xs text-ink/50 md:inline">Esc to go back</span>
          </div>
          <div className="room-scroll flex-1 overflow-y-auto overscroll-contain">{panel && ROOMS[panel].content}</div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}
