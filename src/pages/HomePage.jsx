import { Link } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import ScrollReveal from '../components/scroll/ScrollReveal'

const galleryItems = [
  { title: 'Modern Labs', subtitle: 'Hands-on practical workshops' },
  { title: 'Campus Life', subtitle: 'Student events and clubs' },
  { title: 'Creative Studio', subtitle: 'Design and digital arts' },
  { title: 'Sports Arena', subtitle: 'Fitness, drills and teamwork' },
]

const galleryEffects = ['zoom-in', 'fade-left', 'fade-right', 'rotate-in']

export default function HomePage() {
  return (
    <div className="space-y-20 py-8">
      <Hero />
      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <ScrollReveal effect="fade-up" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-12 text-slate-900 shadow-[0_35px_90px_rgba(99,102,241,0.18)]" once={false}>
          <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">School highlights</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">A full campus experience beyond the classroom</h2>
          <p className="mt-6 leading-8 text-slate-600">Lasalle offers practical technical education, dynamic student life, and a disciplined environment tuned for academic success. Every program includes mentorship, hands-on projects, and skill-building labs.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ScrollReveal effect="fade-left" className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)] transition duration-500 hover:-translate-y-1" once={false}>
              <p className="text-3xl font-semibold text-slate-950">98%</p>
              <p className="mt-3 text-slate-600">Pass rate across national technical exams</p>
            </ScrollReveal>
            <ScrollReveal effect="fade-right" className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)] transition duration-500 hover:-translate-y-1" once={false}>
              <p className="text-3xl font-semibold text-slate-950">24+</p>
              <p className="mt-3 text-slate-600">Advanced technical courses across 3 specialty tracks</p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        <div className="grid gap-6">
          <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-6 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
            <h3 className="text-2xl font-semibold text-slate-950">Our promise</h3>
            <p className="mt-4 leading-8 text-slate-600">We prepare students for real-world careers by combining technical mastery, leadership training, and high-quality academic support.</p>
          </ScrollReveal>
          <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-fuchsia-100 via-cyan-100 to-slate-100 p-6 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
            <h3 className="text-2xl font-semibold text-slate-950">Campus culture</h3>
            <p className="mt-4 leading-8 text-slate-600">A safe, stimulating campus where students are encouraged to innovate, collaborate, and lead with integrity.</p>
          </ScrollReveal>
        </div>
      </section>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Gallery</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Inside our campus</h2>
          </div>
          <p className="max-w-xl text-slate-600">Explore a gallery of campus life, technical labs, student activities, and creative learning spaces that make Lasalle feel vibrant and engaging.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.title} effect={galleryEffects[index % galleryEffects.length]} className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-6 shadow-[0_30px_80px_rgba(148,163,184,0.18)] ring-1 ring-slate-200 transition duration-700 hover:-translate-y-1" once={false}>
              <div className="mb-6 h-44 rounded-[1.75rem] bg-gradient-to-br from-cyan-200 via-slate-200 to-fuchsia-200"></div>
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.subtitle}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-2">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">About the school</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">A Catholic technical school with 53 years of service</h2>
          <p className="mt-6 leading-8 text-slate-600">La Salle Technical Secondary School - Hohola is a registered Catholic Agency School under the Department of Education and the Archdiocese of Port Moresby. Since 1973, the school has delivered national curriculum education, technical qualification pathways, and Lasallian values for students in the National Capital District.</p>
          <p className="mt-4 leading-8 text-slate-600">Located on 8 hectares near Sacred Heart Primary School, the school offers modern classrooms, vocational workshops, a multi-purpose hall, and specialised training facilities for Auto-mechanics, Carpentry, Metal Fabrication, and Electro-Technology.</p>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Quick facts</h2>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-3xl bg-white p-5 shadow-sm">Grades offered: 9–12 with National Curriculum and NC 1 & NC 2 courses.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">School code: 69/639, serving students from Port Moresby and surrounding communities.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">Top-ranked in PNG national exams: 1st in Grade 10 and Grade 12 in 2024–2025.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">Average class size: 50 students, supported by disciplined academic and faith-based programs.</li>
          </ul>
        </ScrollReveal>
      </section>
      <section className="space-y-8">
        <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">School leadership</h2>
          <p className="mt-4 text-slate-600 leading-8">Our leadership team guides academic excellence, administration, and vocational education for a supportive and disciplined campus culture.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Principal</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Br. Antony Samy Pancras</p>
              <p className="mt-3 text-slate-600">Phone: +675 720 72 451</p>
              <p className="text-slate-600">Email: antonypng@yahoo.com</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Deputy Principal</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Br. Francis ToLiman</p>
              <p className="mt-3 text-slate-600">Administration lead</p>
              <p className="text-slate-600">Phone: +675 766 23 466</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Academic lead</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Ms. Alice Kalama</p>
              <p className="mt-3 text-slate-600">Supports student learning and curriculum delivery</p>
              <p className="text-slate-600">Phone: +675 717 96 352</p>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">TVET Coordinator</p>
              <p className="mt-3 text-xl font-semibold text-slate-950">Mrs. Penina Alesa</p>
              <p className="mt-3 text-slate-600">Leads technical and vocational education training</p>
              <p className="text-slate-600">Phone: +675 721 69 818</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Explore our history</h2>
          <p className="mt-4 text-slate-600 leading-8">Read the story of how Lasalle evolved from a youth development centre into a modern technical secondary school serving Port Moresby and the wider community.</p>
          <Link
            to="/history"
            className="mt-8 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View the full history
          </Link>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Student handbook</h2>
          <p className="mt-4 text-slate-600 leading-8">Learn more about school expectations, student responsibilities, conduct procedures, and the Lasallian values that guide our community.</p>
          <Link
            to="/handbook"
            className="mt-8 inline-flex items-center rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700"
          >
            View the student handbook
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
