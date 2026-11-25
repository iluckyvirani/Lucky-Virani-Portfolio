export default function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div>
      <p className="font-hand text-2xl text-blue-ink">{kicker}</p>
      <h2 className="font-hand text-5xl font-bold leading-tight text-ink md:text-6xl">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-2xl text-ink/70">{sub}</p>}
    </div>
  );
}
