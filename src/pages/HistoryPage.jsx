import ScrollReveal from '../components/scroll/ScrollReveal'

export default function HistoryPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Our story</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">A proud tradition of technical education since 1973</h1>
        <p className="mt-6 text-slate-600 leading-8">La Salle Technical Secondary School - Hohola began as a youth development centre and has grown into a leading Catholic technical secondary school with more than five decades of service to PNG students.</p>
      </ScrollReveal>

      <section className="grid gap-6 lg:grid-cols-3">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 ring-1 ring-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Founding heritage</h2>
          <p className="mt-4 text-slate-600 leading-7">Established in 1973 as Hohola Youth Development Centre by the Brigidine Sisters, the school began with a mission to support youth who had left traditional schooling.</p>
        </ScrollReveal>
        <ScrollReveal effect="zoom-in" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Lasallian leadership</h2>
          <p className="mt-4 text-slate-600 leading-7">In 1993 the De La Salle Brothers took leadership, helping shape the school around Catholic values and technical excellence in partnership with the Archdiocese of Port Moresby.</p>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Technical growth</h2>
          <p className="mt-4 text-slate-600 leading-7">The school expanded with vocational workshops in auto-mechanics, metal fabrication, carpentry and electro-technology, plus modern classrooms and a multi-purpose hall.</p>
        </ScrollReveal>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Important milestones</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-3xl bg-slate-50 p-5">1973: School founded as Hohola Youth Development Centre.</li>
            <li className="rounded-3xl bg-slate-50 p-5">1993: Administration transferred to De La Salle Brothers.</li>
            <li className="rounded-3xl bg-slate-50 p-5">2000: Curriculum expanded to vocational courses and work experience.</li>
            <li className="rounded-3xl bg-slate-50 p-5">2022: Official technical secondary school registration under the Department of Education.</li>
            <li className="rounded-3xl bg-slate-50 p-5">2024–2025: Ranked 1st in PNG Grade 10 and Grade 12 national exams.</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal effect="rotate-in" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-sapphire-100 to-emerald-100 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Current school profile</h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>Grades offered: 9–12</p>
            <p>Facilities: modern classrooms, workshops, multi-purpose hall and technical labs</p>
            <p>School code: 69/639</p>
            <p>Location: Allotment 01, Section 05, Oak Street, Hohola, Boroko, NCD</p>
            <p>Lasallian network: one of three Lasallian schools in Port Moresby</p>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-yellow-100 to-cyan-200 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <h2 className="text-3xl font-semibold text-slate-950">Land & ownership</h2>
        <p className="mt-4 text-slate-600 leading-8">The school sits on 8 hectares near Sacred Heart Primary School, on land titled to the Board of Trustees of the Catholic Archdiocese of Port Moresby for 99 years since 1968.</p>
      </ScrollReveal>
    </div>
  )
}
