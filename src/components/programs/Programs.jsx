const programs = [
  {
    title: 'Technical Engineering',
    text: 'Hands-on study in mechanics, electronics, robotics, and applied science for future technical leaders.',
  },
  {
    title: 'Digital Design',
    text: 'Creative media and digital systems courses that combine coding, design, and visual storytelling.',
  },
  {
    title: 'Leadership & Ethics',
    text: 'Development of character, civic responsibility, and sustainable leadership habits.',
  },
]

export default function Programs() {
  return (
    <section id="programs" className="section-panel space-y-12 py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sky-300 uppercase tracking-[0.36em] text-sm font-semibold">Academic Programs</p>
        <h2 className="text-4xl font-semibold text-white">An expansive curriculum tailored for success</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <article key={program.title} className="rounded-[2rem] border border-slate-800/60 bg-slate-950/90 p-8 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <span className="mb-4 block text-xl font-semibold text-white">{program.title}</span>
            <p className="leading-7 text-slate-300">{program.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
