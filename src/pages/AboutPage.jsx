import ScrollReveal from '../components/scroll/ScrollReveal'

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">About Lasalle</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">A leading technical secondary school with broad student opportunity</h1>
        <p className="mt-6 text-slate-600 leading-8">Lasalle Technical Secondary School blends career-focused technical training with rigorous academics and character development. Our students learn in modern labs, take part in leadership programs, and graduate prepared for higher education and the workforce.</p>
      </ScrollReveal>
      <section className="grid gap-6 xl:grid-cols-3">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 text-slate-900 ring-1 ring-slate-200 shadow-[0_24px_80px_rgba(148,163,184,0.16)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Mission</h2>
          <p className="mt-4 leading-7 text-slate-600">Deliver practical technical training that empowers young people to solve complex problems and thrive with integrity.</p>
        </ScrollReveal>
        <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 text-slate-900 ring-1 ring-slate-200 shadow-[0_24px_80px_rgba(148,163,184,0.16)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Vision</h2>
          <p className="mt-4 leading-7 text-slate-600">Create a future-ready student body defined by creativity, resilience, and leadership in science and technology.</p>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100 p-8 text-slate-900 ring-1 ring-slate-200 shadow-[0_24px_80px_rgba(148,163,184,0.16)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Values</h2>
          <p className="mt-4 leading-7 text-slate-600">Respect, excellence, community, and innovation guide every class, workshop, and student activity.</p>
        </ScrollReveal>
      </section>
      <section className="grid gap-8 lg:grid-cols-2">
        <ScrollReveal effect="zoom-in" className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Why students choose us</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-3xl bg-slate-50 p-5">Practical technical mentorship and certifications</li>
            <li className="rounded-3xl bg-slate-50 p-5">Strong exam support with small class sizes</li>
            <li className="rounded-3xl bg-slate-50 p-5">Vibrant student clubs, sports, and innovation challenges</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal effect="rotate-in" className="rounded-[2rem] bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Campus experience</h2>
          <p className="mt-6 leading-8 text-slate-600">From digital labs to core engineering workshops, our campus encourages hands-on learning and leadership through events, mentorship, and real-world project work.</p>
        </ScrollReveal>
      </section>
    </div>
  )
}
