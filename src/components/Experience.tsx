import { experience } from '../data/profile';
import SectionTitle from './SectionTitle';

const Experience = () => (
  <section id="experience" className="paper-dots py-24">
    <div className="mx-auto max-w-4xl px-6">
      <SectionTitle kicker="experience" title="Where I've worked" />
      <ol className="relative mt-12 border-l-[3px] border-dashed border-ink/40">
        {experience.map((e, i) => (
          <li key={e.company} className="mb-10 ml-8 last:mb-0">
            <span className={`absolute -left-[11px] mt-2 h-5 w-5 rounded-full border-[3px] border-ink ${i === 0 ? 'bg-marker' : 'bg-[#fffdf7]'}`} />
            <div className="sketch-box bg-[#fffdf7] p-5 shadow-[3px_4px_0_#26231f]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-hand text-3xl font-bold text-ink">
                  {e.role} <span className="text-blue-ink">@ {e.company}</span>
                </h3>
                <span className="text-sm text-ink/60">
                  {e.period} · {e.place}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="font-hand text-xl leading-5 text-blue-ink">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
