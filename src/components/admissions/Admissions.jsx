export default function Admissions() {
  return (
    <section id="admissions" className="section-panel grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center py-20">
      <div className="space-y-6">
        <p className="text-sky-300 uppercase tracking-[0.36em] text-sm font-semibold">Join the Community</p>
        <h2 className="text-4xl font-semibold text-white">Start your application and become part of a thriving technical campus</h2>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">
          Admissions are open for all motivated students ready to embrace learning, innovation, and personal growth.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button type="button" className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_80px_rgba(56,189,248,0.25)] transition hover:brightness-110">
          Apply Now
        </button>
        <button type="button" className="rounded-full border border-slate-700 bg-slate-900/90 px-8 py-4 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
          Schedule a Tour
        </button>
      </div>
    </section>
  )
}
