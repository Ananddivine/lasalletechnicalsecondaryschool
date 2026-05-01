import { manageCards } from '../data/adminPortalData'

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
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Manage Admissions</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
          Control document checks, payments, and approval routing.
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {manageCards.map((card) => (
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

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Admission workflow</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {workflowSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6"
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