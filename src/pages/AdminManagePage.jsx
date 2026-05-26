import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { manageCards } from '../data/adminPortalData'
import { fetchManageOverview } from '../lib/api'

const workflowSteps = [
  {
    step: '1',
    title: 'Receive application',
    detail: 'Collect the correct grade form and confirm the applicant category.',
  },
  {
    step: '2',
    title: 'Verify checklist',
    detail: 'Check certificates, offer letters, photo, medical files, and birth evidence.',
  },
  {
    step: '3',
    title: 'Match payment',
    detail: 'Validate the first-installment amount against the form type and fee rules.',
  },
  {
    step: '4',
    title: 'Issue decision',
    detail: 'Approve, hold for review, or reject and add a clear decision note.',
  },
]

export default function AdminManagePage() {
  const [manageData, setManageData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchManageOverview()
      .then((response) => {
        if (isMounted) {
          setManageData(response)
          setErrorMessage('')
        }
      })
      .catch((error) => {
        if (isMounted) {
          setManageData(null)
          setErrorMessage(error.message || 'Unable to load the manage overview.')
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

  const cards = manageData?.cards || manageCards
  const steps = manageData?.workflowSteps || workflowSteps
  const totals = manageData?.totals
  const queues = manageData?.queues || []

  const buildResultsPath = (query) => {
    const searchParams = new URLSearchParams(query)
    return `/portal/results?${searchParams.toString()}`
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Manage Admissions</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Control document checks, payments, and approval routing.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Use the live queues below to move from high-level counts into the exact applications that still need action.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {errorMessage} Showing fallback summary values where available.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">Active applications</p>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            {totals?.applications ?? (isLoading ? '...' : '0')}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Applications currently in the working admissions pipeline.</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">Trash records</p>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            {totals?.deleted ?? (isLoading ? '...' : '0')}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Deleted applications that can still be reviewed and restored.</p>
        </article>
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">Action queues</p>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            {isLoading ? '...' : String(queues.length || 3)}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Document, payment, and routing queues with direct links into results.</p>
        </article>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">{card.title}</p>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{card.count}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {queues.map((queue) => (
          <article
            key={queue.key}
            className="rounded-[1.85rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Action Queue</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{queue.title}</h2>
              </div>
              <Link
                to={buildResultsPath(queue.query)}
                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-sky-700"
              >
                {queue.actionLabel}
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{queue.description}</p>
            <div className="mt-5 space-y-3">
              {queue.items.length > 0 ? queue.items.map((item) => (
                <Link
                  key={item.id}
                  to={buildResultsPath(item.resultFilter)}
                  className="block rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.applicantName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{item.id} • {item.formTitle}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 ring-1 ring-slate-200">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.reason}</p>
                </Link>
              )) : (
                <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
                  No applications are currently waiting in this queue.
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Admission workflow</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.step}
              className="workflow-glow-card rounded-[1.75rem] border border-slate-200 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}