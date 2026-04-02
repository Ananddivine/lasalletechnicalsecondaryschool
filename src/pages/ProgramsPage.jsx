import ScrollReveal from '../components/scroll/ScrollReveal'

const programs = [
  {
    slug: 'engineering',
    title: 'Technical Engineering',
    description: 'Mechanical, electrical, and automation courses with practical lab projects.',
  },
  {
    slug: 'design',
    title: 'Digital Design',
    description: 'Creative media, UI design, and digital systems training with real portfolios.',
  },
  {
    slug: 'leadership',
    title: 'Leadership & Ethics',
    description: 'Character development, civic engagement, and career readiness for every student.',
  },
]

const programEffects = ['fade-up', 'zoom-in', 'fade-right']

export default function ProgramsPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Program catalog</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Technical programs built around innovation and career skills</h1>
        <p className="mt-6 text-slate-600 leading-8">Each program pairs rigorous classroom learning with hands-on application. Students graduate with experience in high-value technical skills, digital creativity, and leadership.</p>
      </ScrollReveal>
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((item, index) => (
          <ScrollReveal key={item.slug} effect={programEffects[index]} className={`rounded-[2rem] p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1 ${index === 0 ? 'bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200' : index === 1 ? 'bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100' : 'bg-gradient-to-br from-purple-100 via-fuchsia-100 to-blue-100'}`} once={false}>
            <h2 className="text-2xl font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-4 text-slate-600 leading-7">{item.description}</p>
            <a href={`/programs/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
              Explore program
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
