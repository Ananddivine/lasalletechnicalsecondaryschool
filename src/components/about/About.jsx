export default function About() {
  return (
    <section id="about" className="section-panel space-y-12 py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-sky-300 uppercase tracking-[0.36em] text-sm font-semibold">About Our School</p>
        <h2 className="text-4xl font-semibold text-white">Advanced learning with a disciplined, supportive culture</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-[2rem] border border-slate-800/60 bg-slate-950/90 p-8 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          <h3 className="mb-4 text-xl font-semibold text-white">Modern labs</h3>
          <p className="leading-7 text-slate-300">Industry-ready workshops for mechanical, electrical, and software engineering.</p>
        </article>
        <article className="rounded-[2rem] border border-slate-800/60 bg-slate-950/90 p-8 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          <h3 className="mb-4 text-xl font-semibold text-white">Student leadership</h3>
          <p className="leading-7 text-slate-300">Structured clubs and mentorship programs that develop confidence and teamwork.</p>
        </article>
        <article className="rounded-[2rem] border border-slate-800/60 bg-slate-950/90 p-8 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          <h3 className="mb-4 text-xl font-semibold text-white">Academic rigor</h3>
          <p className="leading-7 text-slate-300">Balanced class schedules and expert faculty support strong exam performance.</p>
        </article>
      </div>
    </section>
  )
}
