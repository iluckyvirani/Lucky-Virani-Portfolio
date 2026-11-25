import { Bot, Cpu, Server, Rocket } from 'lucide-react';
import { profile } from '../data/profile';
import SectionTitle from './SectionTitle';

const pillars = [
  { icon: Cpu, title: 'AI products', text: 'LLM agents with tool use and structured outputs, plus computer-vision dashboards (ANPR) in production.', bg: '#d9f2ff' },
  { icon: Server, title: 'Full stack', text: 'Next.js and React frontends on Node/Express APIs with PostgreSQL and Prisma, including auth, payments and admin panels.', bg: '#fff4b8' },
  { icon: Rocket, title: 'Shipping', text: 'Live on real domains: Ubuntu VPS with Nginx, Vercel and AWS, with cron jobs and monitoring.', bg: '#e3f8de' },
  { icon: Bot, title: 'Automation', text: 'Lead-generation and outreach pipelines, scheduled follow-ups and reports that save hours every week.', bg: '#ffe1ec' },
];

const About = () => (
  <section id="about" className="paper-dots py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionTitle kicker="about me" title="Frontend roots, full stack reach, AI in production." />
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="leading-relaxed text-ink/80">
            I'm a full stack developer in {profile.location}. At <b>Synergy Telematics</b> I build the web platform for an AI-based
            number-plate recognition system: live camera feeds, real-time detections and analytics that handle large, constantly
            updating data.
          </p>
          <p className="mt-4 leading-relaxed text-ink/80">
            Beyond that I've built and shipped <b>more than ten products</b> end to end, from a London property platform to a
            trading-challenge platform and a government portal, plus an open-source AI sales agent that runs on Claude tool use.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s, i) => (
              <div key={s.label} className="sketch-box bg-[#fffdf7] p-4 shadow-[3px_4px_0_#26231f]" style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                <p className="font-hand text-4xl font-bold text-blue-ink">{s.value}</p>
                <p className="mt-1 text-xs text-ink/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text, bg }, i) => (
            <div
              key={title}
              className="tape relative p-6 shadow-[4px_6px_0_rgba(38,35,31,0.18)] transition-transform hover:-rotate-1 hover:scale-[1.02]"
              style={{ background: bg, transform: `rotate(${[-1.5, 1, 1.2, -0.8][i]}deg)` }}
            >
              <Icon className="text-ink" size={22} />
              <h3 className="mt-3 font-hand text-3xl font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
