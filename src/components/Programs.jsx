const programs = [
  {
    title: 'Technical Engineering',
    text: 'Hands-on study in mechanics, electronics, robotics, and applied science for future technical leaders.',
  },
  {
    title: 'Digital Design',
    text: 'Creative media and digital systems courses that combine coding, design, and visual storytelling.',
  },
  {
    title: 'Leadership & Ethics',
    text: 'Development of character, civic responsibility, and sustainable leadership habits.',
  },
]

export default function Programs() {
  return (
    <section id="programs" className="section-panel programs-panel">
      <div className="section-header wide">
        <p className="section-tag">Academic Programs</p>
        <h2>An expansive curriculum tailored for success</h2>
      </div>
      <div className="program-grid">
        {programs.map((program) => (
          <article key={program.title} className="program-card">
            <span className="program-index">{program.title}</span>
            <p>{program.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
