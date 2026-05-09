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
            <p><span className="font-semibold text-slate-950">Email us:</span> info@lasalletechnicalsecondaryschool.com</p>
            <p><span className="font-semibold text-slate-950">Admission :</span> Admission@lasalletechnicalsecondaryschool.com</p>
            <p><span className="font-semibold text-slate-950">Phone:</span> +67571689267</p>
            <p><span className="font-semibold text-slate-950">Address:</span> G5WF+2FG, Oak St, Port Moresby National Capital District, Papua New Guinea</p>
          </div>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
          <h2 className="text-2xl font-semibold text-slate-950">Find us on the map</h2>
          <p className="mt-6 leading-7 text-slate-600">Use the map below to locate La Salle Technical College in Port Moresby.</p>
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1414.4308331193167!2d147.17409811000158!3d-9.455733947145719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6902312129e65e7b%3A0x365c9c97df867507!2sLa%20Salle%20Technical%20College!5e0!3m2!1sen!2sin!4v1777974922884!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Salle Technical College map"
              className="h-[22rem] w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
