import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { profile } from '../data/profile';

export default function IntroCard({ onProjects, walkHint }: { onProjects?: () => void; walkHint?: boolean }) {
  return (
    <div className="sketch-card max-w-2xl rotate-[-1deg] bg-[#fffdf7]/95 p-7 text-center shadow-[6px_8px_0_#26231f] md:p-10">
      <p className="font-hand text-2xl text-blue-ink md:text-3xl">Hi, I'm</p>
      <h1 className="font-hand text-6xl font-bold leading-none text-ink md:text-8xl">
        {profile.name}
      </h1>
      <h2 className="mt-3 text-lg font-semibold text-ink md:text-xl">
        {profile.title} · <span className="text-blue-ink">{profile.subtitle}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-ink/75">{profile.summary}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onProjects ? (
          <MagneticButton onClick={onProjects}>View projects</MagneticButton>
        ) : (
          <MagneticButton href="#projects">View projects</MagneticButton>
        )}
        <MagneticButton href={profile.resume} download variant="ghost">
          <Download size={16} /> Resume
        </MagneticButton>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="sketch-btn p-3 text-ink">
          <Github size={18} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="sketch-btn p-3 text-ink">
          <Linkedin size={18} />
        </a>
      </div>
      {walkHint && (
        <p className="mt-6 inline-flex items-center gap-2 font-hand text-2xl text-ink/70">
          scroll or swipe to walk through my sketchbook <ArrowDown size={18} className="animate-bounce" />
        </p>
      )}
    </div>
  );
}
