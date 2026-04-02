import ScrollReveal from '../components/scroll/ScrollReveal'

export default function ContactPage() {
  return (
    <div className="space-y-16 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Get in touch with admissions and campus services</h1>
        <p className="mt-6 text-slate-600 leading-8">Have a question about programs, campus tours, or applications? Our team is ready to help you get started.</p>
      </ScrollReveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Contact details</h2>
          <div className="mt-6 space-y-4 text-slate-700">
            <p><span className="font-semibold text-slate-950">Email:</span> info@lasalletech.edu</p>
            <p><span className="font-semibold text-slate-950">Phone:</span> +234 800 123 4567</p>
            <p><span className="font-semibold text-slate-950">Address:</span> 45 Innovation Drive, Ibadan, Nigeria</p>
          </div>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Schedule a visit</h2>
          <p className="mt-6 leading-7 text-slate-600">Join one of our campus tours and discover the labs, classrooms, and student spaces that make Lasalle a strong foundation for your future.</p>
        </ScrollReveal>
      </div>
    </div>
  )
}
