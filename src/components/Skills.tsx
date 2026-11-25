import { skills } from '../data/profile';
import SectionTitle from './SectionTitle';

const colors = ['#d9f2ff', '#fff4b8', '#e3f8de', '#ffe1ec', '#efe3ff'];

const Skills = () => (
  <section id="skills" className="bg-paper py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionTitle kicker="skills" title="My toolbox" sub="No percentage bars here. Every skill below is used in a project on this page." />
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <div
            key={g.group}
            className="tape relative p-6 shadow-[4px_6px_0_rgba(38,35,31,0.18)]"
            style={{ background: colors[i % colors.length], transform: `rotate(${[-1, 0.8, -0.5, 1.2, -1.2][i % 5]}deg)` }}
          >
            <h3 className="font-hand text-3xl font-bold text-ink">{g.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-md border-2 border-ink/70 bg-[#fffdf7] px-2.5 py-1 text-sm text-ink">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
