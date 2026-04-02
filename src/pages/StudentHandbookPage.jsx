import ScrollReveal from '../components/scroll/ScrollReveal'

export default function StudentHandbookPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Student handbook</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Values, safety and school expectations</h1>
        <p className="mt-6 text-slate-600 leading-8">Our handbook reflects the Lasallian commitment to faith, safety, respect and excellence for every student, teacher and member of the school community.</p>
      </ScrollReveal>

      <section className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 ring-1 ring-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Safeguarding commitment</h2>
          <p className="mt-4 text-slate-600 leading-7">La Salle Technical Secondary School is committed to protecting children and adults at risk through robust recruitment, mandatory induction, ongoing training, and clear conduct expectations.</p>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-slate-700">
            <li>Screening and psychological assessment for staff</li>
            <li>Mandatory induction and professional learning</li>
            <li>Clear reporting, information sharing and compliance</li>
            <li>Vigilance and respect for diverse backgrounds</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal effect="zoom-in" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_80px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Classroom expectations</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>Be well groomed and seated when the bell rings.</li>
            <li>Listen respectfully when teachers speak.</li>
            <li>Raise your hand to speak and bring only learning materials.</li>
            <li>Use appropriate English language in class.</li>
            <li>Leave class only with permission.</li>
          </ul>
        </ScrollReveal>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Student responsibilities</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>Be punctual and attend all school activities.</li>
            <li>Show respect for staff, students and property.</li>
            <li>Complete homework and assignments consistently.</li>
            <li>Be committed, hardworking and proud of your school.</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal effect="rotate-in" className="rounded-[2rem] bg-gradient-to-br from-violet-100 via-fuchsia-100 to-cyan-100 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Discipline process</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li>Verbal warning and discipline notice.</li>
            <li>Phone call to parent/guardian when needed.</li>
            <li>Referral to the Deputy Principal - Administration office.</li>
          </ul>
        </ScrollReveal>
      </section>

      <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-slate-100 via-blue-100 to-fuchsia-100 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <h2 className="text-3xl font-semibold text-slate-950">Six Patrons of our school</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">St. De La Salle</h3>
            <p className="mt-3 text-slate-600 leading-7">Founder of the Brothers of the Christian Schools, model of faith, service and education.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Blessed Brother Arnold Reche</h3>
            <p className="mt-3 text-slate-600 leading-7">Teacher, catechist, and leader known for piety, wisdom and dedication to students.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">St. Benildus Romançon</h3>
            <p className="mt-3 text-slate-600 leading-7">A humble educator whose ministry became a centre of village life and learning.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Saint Miguel Febres Cordero</h3>
            <p className="mt-3 text-slate-600 leading-7">Scholar and teacher who inspired students through books, poetry and service.</p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-yellow-100 to-cyan-200 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <blockquote className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-slate-800 shadow-sm">
          <p className="text-xl font-semibold">“Smile to the electricity and life is a battery. Whenever you smile the battery gets charged & a beautiful day is activated. So, Keep Smiling…”</p>
        </blockquote>
      </ScrollReveal>
    </div>
  )
}
