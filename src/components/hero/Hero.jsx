import { useEffect, useState } from 'react'
import campusDronePhoto from '../../assets/school drone view.jpeg'
import campusEntrancePhoto from '../../assets/school entrence.jpeg'
import classroomPhoto from '../../assets/students at class room.jpeg'

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
    <section id="home" className="grid gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
      <div className="serial-light-frame rounded-[2.6rem] p-[2px]">
        <div className="serial-light-panel h-full rounded-[calc(2.6rem-2px)] bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(241,245,249,0.95))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-10 lg:p-12">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-sky-700">
              Lasallian education in action
            </span>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-[clamp(3rem,5vw,5.2rem)] font-black leading-[0.93] tracking-tight text-slate-950">
                A sharper campus story for
                <span className="block bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-500 bg-clip-text text-transparent">
                  La Salle Technical Secondary School
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Academic discipline, technical excellence, and a strong Christian foundation come together in one campus community preparing students for real leadership and practical careers.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-[1.8rem] border border-sky-100 bg-white px-5 py-4 shadow-[0_20px_60px_rgba(14,165,233,0.12)]">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Campus focus</p>
                <p className="mt-2 text-base font-semibold text-slate-950">High-clarity learning spaces</p>
              </div>
              <div className="rounded-[1.8rem] border border-emerald-100 bg-white px-5 py-4 shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Student identity</p>
                <p className="mt-2 text-base font-semibold text-slate-950">Culture, discipline, and service</p>
              </div>
              <div className="rounded-[1.8rem] border border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 via-sky-50 to-cyan-50 px-5 py-4 shadow-[0_20px_60px_rgba(236,72,153,0.12)]">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Today&apos;s learners</p>
                <p className="mt-2 text-base font-semibold text-slate-950">{phrase}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.8rem] bg-slate-950 px-5 py-5 text-white shadow-[0_22px_45px_rgba(15,23,42,0.18)]">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-200">Serving since</p>
                <p className="mt-3 text-3xl font-black">1973</p>
              </div>
              <div className="rounded-[1.8rem] bg-white px-5 py-5 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)]">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Learning profile</p>
                <p className="mt-3 text-3xl font-black text-slate-950">9-12</p>
              </div>
              <div className="rounded-[1.8rem] bg-white px-5 py-5 ring-1 ring-slate-200 shadow-[0_20px_40px_rgba(148,163,184,0.15)]">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Student pathway</p>
                <p className="mt-3 text-3xl font-black text-slate-950">NC 1 & 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="relative overflow-hidden rounded-[2.6rem] border border-slate-200 bg-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
          <img
            src={campusDronePhoto}
            alt="Drone view of La Salle Technical Secondary School"
            className="h-[23rem] w-full object-cover object-center contrast-[1.06] saturate-[1.08] brightness-[1.03] md:h-[28rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-white sm:px-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">Campus overview</p>
            <p className="mt-3 max-w-lg text-3xl font-black tracking-tight">A hillside campus shaped for focused study and technical training.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(148,163,184,0.16)]">
            <img
              src={campusEntrancePhoto}
              alt="Campus entrance and administration buildings"
              className="h-64 w-full object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-5 pb-5 pt-16 text-white">
              <p className="text-xl font-semibold">Welcoming campus entrance</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(148,163,184,0.16)]">
            <img
              src={classroomPhoto}
              alt="Students learning in a classroom"
              className="h-64 w-full object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-5 pb-5 pt-16 text-white">
              <p className="text-xl font-semibold">Active classroom learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
