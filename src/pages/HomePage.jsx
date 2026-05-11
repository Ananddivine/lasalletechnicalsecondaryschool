import { Link } from 'react-router-dom'
import Hero from '../components/hero/Hero'
import ScrollReveal from '../components/scroll/ScrollReveal'
import principalPhoto from '../assets/principle.jpeg'
import campusEntrancePhoto from '../assets/school entrence.jpeg'
import classroomPhoto from '../assets/students at class room.jpeg'
import culturalDancePhoto from '../assets/welcoming guest with cultural dance.jpeg'
import droneViewPhoto from '../assets/school drone view.jpeg'
import campusHallPhoto from '../assets/campus open hall.jpeg'
import studentStudyPhoto from '../assets/students studing.jpeg'

const galleryItems = [
  {
    title: 'Campus arrival',
    subtitle: 'A clear first view of the school environment, administration buildings, and student entry spaces.',
    image: campusEntrancePhoto,
    imageAlt: 'Campus entrance and school buildings',
    imageClassName: 'object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.04]',
  },
  {
    title: 'Focused classroom learning',
    subtitle: 'Students working through lessons in a bright learning space that reflects academic discipline.',
    image: classroomPhoto,
    imageAlt: 'Students in a classroom',
    imageClassName: 'object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.03]',
  },
  {
    title: 'Cultural welcome',
    subtitle: 'School events and ceremonial moments reflect culture, hospitality, and community identity.',
    image: culturalDancePhoto,
    imageAlt: 'Guests welcomed with cultural dance',
    imageClassName: 'object-cover object-center contrast-[1.08] saturate-[1.1] brightness-[1.02]',
  },
  {
    title: 'Aerial campus view',
    subtitle: 'The wider campus footprint shows the school setting, surrounding landscape, and shared student spaces.',
    image: droneViewPhoto,
    imageAlt: 'Drone view of the school campus',
    imageClassName: 'object-cover object-center contrast-[1.08] saturate-[1.08] brightness-[1.03]',
  },
]

const galleryEffects = ['zoom-in', 'fade-left', 'fade-right', 'rotate-in']

const schoolAddress = [
  'La Salle Technical Secondary School, Hohola',
  'Lot 01, Section 05, Oak Street, Hohola',
  'Po Box 1911, Boroko, NCD, PNG',
]

const coreValues = [
  {
    title: 'God Is Our Focus',
    description:
      'Faith is the cornerstone of our school. We nurture a spirit of service, compassion, and integrity, encouraging every student to lead a life guided by Christian values.',
  },
  {
    title: 'We Are Brothers And Sisters To Each Other',
    description:
      'We cultivate a strong sense of community, unity, and respect. At La Salle, every individual belongs to a family that supports and uplifts one another.',
  },
  {
    title: 'Achievement Is Valued',
    description:
      'We strive for excellence in academics, technical skills, and personal development. Our students are celebrated for their efforts, progress, and success.',
  },
  {
    title: 'We Are Always Honest',
    description:
      'Honesty and integrity guide our actions. We foster trust and transparency within our school community.',
  },
  {
    title: 'We Respect Ourselves, One Another, And Property',
    description:
      'Mutual respect ensures a safe, nurturing, and productive learning environment for all.',
  },
]

const schoolPillars = [
  {
    title: 'A legacy of transformation',
    description:
      'For over five decades, La Salle Technical Secondary School has been a cornerstone of hope and empowerment, transforming the lives of young Papua New Guineans by fostering knowledge, skills, and values that endure for a lifetime.',
  },
  {
    title: 'Cultivating leaders of tomorrow',
    description:
      'We are committed to nurturing future leaders, innovators, and responsible citizens who will positively contribute to their communities and the broader nation of Papua New Guinea.',
  },
  {
    title: 'Excellence through unity',
    description:
      'At La Salle, we believe that the strength of our community lies in our unity—our sense of brotherhood and sisterhood—that inspires collaboration, respect, and mutual support among students and staff alike.',
  },
  {
    title: 'Education beyond academics',
    description:
      'We provide more than just education; we cultivate character, integrity, and resilience. Our programs empower students not only to succeed in examinations but to overcome life\'s challenges with unwavering courage and hope.',
  },
  {
    title: 'Tailored learning for every student',
    description:
      'We embrace diversity with specialized streams like Flexible Open Distance Education (FODE) and National Certificate programs, ensuring that every learner, regardless of their background or circumstances, has the opportunity to succeed and grow.',
  },
  {
    title: 'Faith at our core',
    description:
      'Faith guides every step we take. With God as our central focus, we inspire a spirit of service, compassion, and ethical leadership that shapes well-rounded individuals ready to serve humanity.',
  },
  {
    title: 'A center for vocational excellence',
    description:
      'Our hands-on approach to technical and vocational education equips students with practical skills and industry knowledge, preparing them for rewarding careers and meaningful participation in PNG\'s economy.',
  },
  {
    title: 'Driven by a vision of hope',
    description:
      'La Salle is a place where hope grows—the hope for a brighter future, the hope to break barriers, and the hope to "Never Give Up" in the quest for greatness.',
  },
  {
    title: 'Resilience in the face of challenges',
    description:
      'Despite obstacles such as limited digital resources, our community continually rises above by fostering creativity and determination, always striving to improve the quality of education.',
  },
  {
    title: 'Partners in progress',
    description:
      'We invite all stakeholders—parents, community leaders, industry partners, and supporters—to join us as we invest in the lives of our students and build a stronger, more prosperous Papua New Guinea together.',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-20 ">
      <Hero />
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <ScrollReveal effect="fade-left" className="serial-light-frame rounded-[2rem] p-[2px]" once={false}>
          <div className="serial-light-panel h-full rounded-[calc(2rem-2px)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.94))] p-8 sm:p-10 shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-sky-700">Principal message</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-slate-950 sm:text-4xl">Welcome to La Salle Technical Secondary School, Hohola</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Welcome to La Salle Technical Secondary School, Hohola — a beacon of hope and a pillar of educational excellence in Papua New Guinea for over 53 years. Rooted in a rich heritage that began with the Brigidine Sisters in 1973 and nurtured by the De La Salle Brothers since 1993, our school stands proud as a transformative institution dedicated to the holistic development of every young person entrusted to our care.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              At La Salle, we believe that education is a powerful journey of faith, resilience, and accomplishment. Guided by our five enduring principles—God as our focus, a strong sense of brotherhood and sisterhood, the value of achievement, unwavering honesty, and mutual respect—we create a vibrant community where students are inspired to thrive academically, morally, and socially.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our proud tradition of inclusive education is reflected in over 1,200 students flourishing across three academic streams: Regular Secondary School Academic from Grade 9 to 12, Flexible Open Distance Education (FODE) for Grades 9 and 10, and National Certificate programs for Grade 10 and 12 school and non-school leavers and Grade 12 students gets an opportunity to upgrade their marks while doing NC 1 &2 Course. Our commitment to academic excellence and vocational readiness has earned us the distinguished honour of being the top-performing (Number One) secondary school in PNG in the 2024 and 2025 national Grade 10 and 12 examinations.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              The journey to excellence is never without challenges. As we continue to evolve, we recognize the need to empower our dedicated teachers with modern digital tools to enhance teaching and learning experiences.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our motto, "Never Give Up," embodies the spirit that drives La Salle forward—a spirit of hope, determination, and faith. Together, we nurture a future where every student is motivated, guided, and given every opportunity to excel in life and serve the world with compassion and integrity.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              La Salle Technical Secondary School, Hohola—is more than a school. It is a community, a family, and a beacon of hope lighting the way toward a brighter tomorrow.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.32)]">
                BP
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-950">Br. Antony Samy PANCRAS, FSC</p>
                <p className="mt-1 text-sm uppercase tracking-[0.28em] text-slate-500">Principal</p>
                <p className="mt-2 text-sm text-slate-600">La Salle Technical Secondary School. Hohola.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="serial-light-frame rounded-[2rem] p-[2px]" once={false}>
          <div className="serial-light-panel serial-light-photo rounded-[calc(2rem-2px)] bg-slate-950/95 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
            <div className="relative overflow-hidden rounded-[1.65rem]">
              <img
                src={principalPhoto}
                alt="Principal Br. Antony Samy Pancras"
                className="h-full min-h-[420px] w-full object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-6 pb-6 pt-16 text-white">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">La Salle Hohola</p>
                <p className="mt-3 text-2xl font-semibold">Br. Antony Samy Pancras</p>
                <p className="mt-2 max-w-md text-sm leading-7 text-slate-200">Providing student-centered leadership rooted in Lasallian values and academic excellence.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <ScrollReveal effect="fade-up" className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-12 text-slate-900 shadow-[0_35px_90px_rgba(99,102,241,0.18)]" once={false}>
          <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">School mission</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">A community where every student is motivated, guided, and empowered to excel</h2>
          <p className="mt-6 leading-8 text-slate-600">For over 53 years, La Salle Technical Secondary School, Hohola, has stood as a beacon of hope, faith, and educational excellence in Papua New Guinea. Our journey began in 1973 with the Hohola Youth Development Centre established by the Brigidine Sisters, and since 1993, the De La Salle Brothers have proudly guided our growth and transformation into one of the nation’s top-performing secondary schools.</p>
          <p className="mt-4 leading-8 text-slate-600">Rooted in a legacy of transformation and driven by a vision of hope, La Salle Technical Secondary School has impacted thousands of lives by nurturing knowledge, practical skills, and core values that prepare young people not only to succeed academically but to thrive as responsible and compassionate leaders of tomorrow.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ScrollReveal effect="fade-left" className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)] transition duration-500 hover:-translate-y-1" once={false}>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Academic streams</p>
              <p className="mt-3 text-slate-600">Regular Academic, Flexible Open Distance Education (FODE), and National Certificate One and Two programs ensure no student is left behind.</p>
            </ScrollReveal>
            <ScrollReveal effect="fade-right" className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)] transition duration-500 hover:-translate-y-1" once={false}>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Motto and theme</p>
              <p className="mt-3 text-slate-600">“Never Give Up” is our call to resilience, perseverance, and hope as faith and education combine to build a brighter tomorrow.</p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        <div className="grid gap-6">
          <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-6 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
            <h3 className="text-2xl font-semibold text-slate-950">Our achievements</h3>
            <p className="mt-4 leading-8 text-slate-600">La Salle Technical Secondary School proudly held the top national ranking in the 2024 and 2025 Grade 10 and 12 examinations, a testament to our dedicated faculty and hardworking students.</p>
          </ScrollReveal>
          <ScrollReveal effect="fade-right" className="overflow-hidden rounded-[2rem] ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)] transition duration-700 hover:-translate-y-1" once={false}>
            <div className="relative h-full min-h-[18rem]">
              <img
                src={campusHallPhoto}
                alt="Campus facilities at La Salle Technical Secondary School"
                className="h-full w-full object-cover object-center contrast-[1.08] saturate-[1.05] brightness-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-white">
                <h3 className="text-2xl font-semibold">Commitment to growth</h3>
                <p className="mt-3 max-w-md leading-7 text-slate-100">We continue to invest in stronger digital teaching resources, laptops, and classroom tools that help teachers deliver compelling and effective lessons.</p>
              </div>
            </div>
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
              <div className="mb-6 h-44 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-cyan-200 via-slate-200 to-fuchsia-200">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className={`h-full w-full ${item.imageClassName ?? 'object-cover object-center'}`}
                  />
                ) : null}
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.subtitle}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-2">
        <ScrollReveal effect="fade-left" className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-purple-50 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <p className="text-indigo-600 uppercase tracking-[0.36em] text-sm font-semibold">About the school</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">A Catholic technical school with a national impact</h2>
          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white px-6 py-5 shadow-sm">
            {schoolAddress.map((line) => (
              <p key={line} className="text-sm font-medium leading-7 text-slate-700">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 leading-8 text-slate-600">La Salle Technical Secondary School, Hohola, is more than an institution—it is a community dedicated to human and Christian education. Together, we inspire, challenge, and empower every student to become a beacon of hope, leadership, and positive change.</p>
          <p className="mt-4 leading-8 text-slate-600">Located on 8 hectares near Sacred Heart Primary School, the school offers modern classrooms, vocational workshops, a multi-purpose hall, and specialised training facilities for Auto-mechanics, Carpentry, Metal Fabrication, and Electro-Technology.</p>
          <div className="mt-8 overflow-hidden rounded-[1.8rem] ring-1 ring-slate-200 shadow-[0_20px_45px_rgba(148,163,184,0.16)]">
            <img
              src={droneViewPhoto}
              alt="Aerial view of the La Salle campus"
              className="h-72 w-full object-cover object-center contrast-[1.08] saturate-[1.08] brightness-[1.03]"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal effect="fade-right" className="rounded-[2rem] bg-gradient-to-br from-pink-100 via-orange-100 to-sky-200 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <h2 className="text-3xl font-semibold text-slate-950">Quick facts</h2>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="rounded-3xl bg-white p-5 shadow-sm">Grades offered: Regular Academic from Grade 9 to 12, FODE for Grades 9 and 10, and National Certificate programs for Grade 10 and 12 school and non-school leavers.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">School code: 69/639, serving students from Port Moresby and surrounding communities.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">National ranking: Number One secondary school in PNG in the 2024 and 2025 Grade 10 and 12 examinations.</li>
            <li className="rounded-3xl bg-white p-5 shadow-sm">Learning focus: academic excellence, vocational readiness, faith formation, and character development.</li>
          </ul>
        </ScrollReveal>
      </section>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-indigo-600 text-sm font-semibold uppercase tracking-[0.36em]">Core values</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">The principles that shape life at La Salle</h2>
          </div>
          <p className="max-w-2xl text-slate-600">Our school community is guided by faith, unity, achievement, honesty, and mutual respect in every classroom, workshop, and shared space.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreValues.map((value, index) => (
            <ScrollReveal
              key={value.title}
              effect={galleryEffects[index % galleryEffects.length]}
              className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 ring-1 ring-slate-200 shadow-[0_22px_60px_rgba(148,163,184,0.14)]"
              once={false}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">Core value</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">{value.title}</h3>
              <p className="mt-4 leading-8 text-slate-600">{value.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="space-y-8">
        <ScrollReveal effect="fade-up" className="rounded-[2rem] bg-gradient-to-br from-amber-100 via-white to-sky-100 p-10 ring-1 ring-slate-200 shadow-[0_35px_90px_rgba(148,163,184,0.18)]" once={false}>
          <p className="text-amber-700 text-sm font-semibold uppercase tracking-[0.36em]">Why La Salle</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-950">A stronger future built through faith, skill, and opportunity</h2>
          <p className="mt-6 max-w-4xl leading-8 text-slate-600">La Salle Technical Secondary School has impacted thousands of lives by fostering knowledge, practical skills, and enduring values. We combine academic performance with technical and vocational training so students are equipped to contribute meaningfully to Papua New Guinea’s future.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {schoolPillars.map((pillar, index) => (
              <ScrollReveal
                key={pillar.title}
                effect={galleryEffects[index % galleryEffects.length]}
                className="rounded-[1.75rem] bg-white p-6 ring-1 ring-slate-200 shadow-[0_18px_45px_rgba(148,163,184,0.12)]"
                once={false}
              >
                <h3 className="text-xl font-semibold text-slate-950">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{pillar.description}</p>
              </ScrollReveal>
            ))}
          </div>
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
