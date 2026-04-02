import ScrollReveal from '../components/scroll/ScrollReveal'

export default function AdmissionsPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Admissions</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Start your journey at Lasalle</h1>
        <p className="mt-6 text-slate-600 leading-8">Apply today and access our technical pathways, supportive campus environment, and career-focused coaching. Admissions are open for motivated students who want to build real skills and strong leadership.</p>
      </ScrollReveal>
      <section className="grid gap-6 lg:grid-cols-3">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Application steps</h2>
          <ol className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-3xl bg-white p-5 shadow-sm">Complete the online application form.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">Submit academic transcripts and references.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">Attend the admission consultation session.</li>
          </ol>
        </ScrollReveal>
        <ScrollReveal effect="zoom-in" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Why apply</h2>
          <p className="mt-6 leading-7 text-slate-600">Benefit from a technical curriculum enriched by mentoring, project-based learning, and practical labs designed to help students stand out at university and in industry.</p>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Scholarships</h2>
          <p className="mt-6 leading-7 text-slate-600">We offer merit and need-based support to help qualified students access the full Lasalle experience.</p>
        </ScrollReveal>
      </section>
    </div>
  )
}
