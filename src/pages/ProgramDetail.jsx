import { useParams, Link } from 'react-router-dom'
import ScrollReveal from '../components/scroll/ScrollReveal'

const programDetails = {
  engineering: {
    title: 'Technical Engineering',
    content: 'A robust engineering track covering mechanical systems, electrical installations, and robotics. Students complete projects that mirror real industrial workflows.',
  },
  design: {
    title: 'Digital Design',
    content: 'Creative design training with emphasis on UI, branding, digital media, and multimedia production. Students publish portfolios and build practical design solutions.',
  },
  leadership: {
    title: 'Leadership & Ethics',
    content: 'Leadership training that focuses on teamwork, ethics, service, and communication. Students lead campus initiatives and complete community-focused capstone projects.',
  },
}

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = programDetails[slug] || programDetails.engineering

  return (
    <div className="space-y-12 py-8">
      <ScrollReveal effect="fade-down" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-10 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
        <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">Program detail</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">{program.title}</h1>
        <p className="mt-6 text-slate-600 leading-8">{program.content}</p>
      </ScrollReveal>
      <ScrollReveal effect="zoom-in" className="rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-100 to-emerald-100 p-8 ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
        <h2 className="text-2xl font-semibold text-slate-950">Next steps</h2>
        <p className="mt-4 text-slate-600 leading-7">Visit the programs page to view all offerings, or contact admissions for guidance on the best track for your interests.</p>
        <Link to="/programs" className="mt-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800">Back to programs</Link>
      </ScrollReveal>
    </div>
  )
}
