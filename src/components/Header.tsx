import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

/** onNav: when given (3D tour), nav items open rooms instead of scrolling the page. */
const Header = ({ onNav, onHome }: { onNav?: (id: string) => void; onHome?: () => void } = {}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (onNav) return onNav(href.slice(1));
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || onNav ? 'border-b-2 border-ink/10 bg-paper/90 backdrop-blur' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <button onClick={() => (onHome ? onHome() : window.scrollTo({ top: 0, behavior: 'smooth' }))} className="flex items-center gap-2 text-ink">
          <span className="sketch-btn grid h-10 w-10 place-items-center font-hand text-2xl font-bold">LV</span>
          <span className="hidden font-hand text-3xl font-bold sm:inline">Lucky Virani</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="font-hand text-2xl text-ink/80 transition-colors hover:text-blue-ink">
              {n.label}
            </button>
          ))}
          <a href="/Lucky-Virani-Resume.pdf" download className="sketch-btn px-4 py-1.5 text-sm font-semibold text-ink">
            Resume
          </a>
        </div>

        <button className="sketch-btn p-2 text-ink md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="sketch-box mx-4 mb-4 bg-[#fffdf7] p-2 md:hidden">
          {navItems.map((n) => (
            <button key={n.href} onClick={() => go(n.href)} className="block w-full rounded-lg px-4 py-2 text-left font-hand text-2xl text-ink hover:bg-marker/40">
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
