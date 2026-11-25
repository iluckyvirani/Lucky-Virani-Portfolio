import { ExternalLink, Github, Lock } from 'lucide-react';
import { projects, moreSites, type Project } from '../data/profile';
import SectionTitle from './SectionTitle';

function Card({ p, big, i }: { p: Project; big?: boolean; i: number }) {
  return (
    <article
      id={`project-${p.id}`}
      className={`sketch-box group relative flex flex-col bg-[#fffdf7] p-6 shadow-[4px_5px_0_#26231f] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_8px_0_#26231f] ${big ? 'md:p-8' : ''}`}
      style={{ transform: `rotate(${(i % 3) - 1 === 0 ? 0 : ((i % 3) - 1) * 0.6}deg)` }}
    >
      <span className="absolute -top-3 left-6 rounded-full border-2 border-ink px-3 py-0.5 text-xs font-semibold text-ink" style={{ background: p.color }}>
        {p.tagline}
      </span>
      <h3 className={`mt-3 font-hand font-bold text-ink ${big ? 'text-4xl' : 'text-3xl'}`}>{p.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{p.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="rounded-md border border-ink/25 bg-paper px-2 py-0.5 text-xs text-ink/80">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-blue-ink underline decoration-2 underline-offset-4 hover:decoration-marker">
            <ExternalLink size={15} /> {new URL(p.live).host}
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-blue-ink">
            <Github size={15} /> Code
          </a>
        )}
        {p.note && (
          <span className="inline-flex items-center gap-1.5 text-ink/55">
            <Lock size={14} /> {p.note}
          </span>
        )}
      </div>
    </article>
  );
}

const Projects = () => {
  const featured = projects.filter((p) => p.tier === 1);
  const more = projects.filter((p) => p.tier === 2);
  return (
    <section id="projects" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="projects" title="Things I've built and shipped" sub="Every link below is a live product. Click a card's link to try it." />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {featured.map((p, i) => (
            <Card key={p.id} p={p} big i={i} />
          ))}
        </div>

        <h3 className="mt-20 font-hand text-4xl font-bold text-ink">More live products</h3>
        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <Card key={p.id} p={p} i={i + 1} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-hand text-2xl text-ink/70">also built:</span>
          {moreSites.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="sketch-btn px-3 py-1 text-ink">
              {s.name}
            </a>
          ))}
          <a href="https://github.com/iluckyvirani" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 font-semibold text-blue-ink underline underline-offset-4">
            <Github size={15} /> All code on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
