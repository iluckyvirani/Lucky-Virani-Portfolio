import IntroCard from './IntroCard';

/** Scrolls to a project card (inside the Projects room or on the classic page) and flashes it. */
export function openProject(id: string) {
  const el = document.getElementById(`project-${id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('ring-4', 'ring-yellow-300');
  window.setTimeout(() => el.classList.remove('ring-4', 'ring-yellow-300'), 1800);
}

/** Classic hero, used only when WebGL is not available (the 3D tour replaces it otherwise). */
const Hero = () => (
  <section id="home" className="paper-dots flex min-h-[100svh] items-center justify-center px-5 pt-20">
    <IntroCard />
  </section>
);

export default Hero;
