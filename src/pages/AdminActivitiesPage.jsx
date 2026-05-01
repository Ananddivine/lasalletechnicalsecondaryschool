import { activities } from '../data/adminPortalData'

export default function AdminActivitiesPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Activities</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Registration tasks, team assignments, and review events.
        </h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {activities.map((activity) => (
          <article
            key={`${activity.day}-${activity.title}`}
            className="rounded-[1.85rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{activity.day}</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                  {activity.title}
                </h2>
              </div>
              <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {activity.status}
              </span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Time</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activity.time}</p>
              </div>
              <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Owner</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activity.owner}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}