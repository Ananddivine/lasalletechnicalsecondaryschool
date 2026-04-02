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
    <section id="home" className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow">Achieve more with every class</span>
        <h1>Welcome to Lasalle Technical Secondary School</h1>
        <p>
          Building a vibrant campus of innovation, discipline, and academic excellence. Join a community where every learner is prepared to lead the future.
        </p>
        <div className="hero-badges">
          <div className="badge">
            <span>STEM Excellence</span>
          </div>
          <div className="badge">
            <span>Creative Ventures</span>
          </div>
          <div className="badge pulse">
            <span>{phrase}</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-panel-card">
          <h2>Established Heritage</h2>
          <p>Empowering students with technical skills, leadership, and global readiness.</p>
        </div>
      </div>
    </section>
  )
}
