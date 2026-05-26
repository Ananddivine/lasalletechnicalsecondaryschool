import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { activities } from '../data/adminPortalData'
import { fetchActivitiesOverview } from '../lib/api'

export default function AdminActivitiesPage() {
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchActivitiesOverview()
      .then((response) => {
        if (isMounted) {
          setActivityData(response)
          setErrorMessage('')
        }
      })
      .catch((error) => {
        if (isMounted) {
          setActivityData(null)
          setErrorMessage(error.message || 'Unable to load the activities overview.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const stats = activityData?.stats || []
  const timeline = activityData?.timeline || activities
  const owners = activityData?.owners || []
  const buildResultsPath = (query) => {
    const searchParams = new URLSearchParams(query)
    return `/portal/results?${searchParams.toString()}`
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Activities</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Registration tasks, team assignments, and review events.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          This page now surfaces live operations from the admissions dataset so staff can move directly into the relevant queue.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {errorMessage} Showing the fallback activity board.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {(stats.length > 0 ? stats : [{ label: 'Loading', value: isLoading ? '...' : '0', detail: 'Waiting for activity data.' }]).map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
            <p className="mt-4 text-4xl font-black tracking-tight text-slate-950">{stat.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{stat.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {timeline.map((activity) => (
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
            <p className="mt-4 text-sm leading-6 text-slate-600">{activity.detail || 'Scheduled admissions activity.'}</p>
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
            {'count' in activity ? (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Items in queue</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{activity.count}</p>
                </div>
                {activity.query ? (
                  <Link
                    to={buildResultsPath(activity.query)}
                    className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
                  >
                    Open queue
                  </Link>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {owners.length > 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Workload</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Top reviewers and owners</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {owners.map((owner) => (
              <article key={owner.owner} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg font-black tracking-tight text-slate-950">{owner.owner}</p>
                <p className="mt-4 text-sm text-slate-600">{owner.tasks} assigned applications</p>
                <p className="mt-2 text-sm text-slate-600">{owner.pending} pending • {owner.review} in review</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}