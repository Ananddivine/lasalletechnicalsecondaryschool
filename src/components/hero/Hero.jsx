import { useEffect, useState } from 'react'

const animatedPhrases = [
  'Future Engineers',
  'Creative Leaders',
  'Global Citizens',
  'Academic Champions',
]

export default function Hero() {
  const [phrase, setPhrase] = useState(animatedPhrases[0])

  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % animatedPhrases.length
      setPhrase(animatedPhrases[idx])
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="hero-panel grid gap-10 lg:grid-cols-[1.4fr_0.9fr] py-20">
      <div className="hero-copy space-y-8">
        <span className="inline-flex uppercase tracking-[0.36em] text-sm font-semibold text-indigo-600">
          Achieve more with every class
        </span>
       <h1 className="max-w-3xl text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] font-semibold bg-gradient-to-r from-blue-400 via-cyan-800 to-pink-800 text-transparent bg-clip-text">
  Welcome to Lasalle Technical Secondary School
</h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Building a vibrant campus of innovation, discipline, and academic excellence. Join a community where every learner is prepared to lead the future.
        </p>
        <div className="hero-badges flex flex-wrap gap-4">
          <div className="rounded-[2rem] border border-violet-100 bg-white/90 px-5 py-4 shadow-[0_20px_70px_rgba(99,102,241,0.16)]">
            <span className="font-semibold text-slate-900">STEM Excellence</span>
          </div>
          <div className="rounded-[2rem] border border-cyan-100 bg-white/90 px-5 py-4 shadow-[0_20px_70px_rgba(14,165,233,0.16)]">
            <span className="font-semibold text-slate-900">Creative Ventures</span>
          </div>
          <div className="rounded-[2rem] border border-fuchsia-100 bg-gradient-to-r from-fuchsia-100 via-sky-100 to-cyan-100 px-5 py-4 text-slate-900 shadow-[0_20px_70px_rgba(236,72,153,0.14)] animate-pulse">
            <span className="font-semibold">{phrase}</span>
          </div>
        </div>
      </div>

      <div className="hero-visual rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(148,163,184,0.18)]">
        <div className="hero-panel-card flex h-full flex-col justify-center rounded-[2rem] bg-gradient-to-br from-cyan-100 via-slate-50 to-violet-100 p-12 text-slate-900 shadow-[0_35px_90px_rgba(99,102,241,0.18)]">
          <h2 className="mb-5 text-3xl font-semibold">Established Heritage</h2>
          <p className="leading-8">
            Empowering students with technical skills, leadership, and global readiness through an ambitious curriculum and a supportive campus culture.
          </p>
        </div>
      </div>
    </section>
  )
}
