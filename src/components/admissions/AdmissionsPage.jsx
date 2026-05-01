import { admissionForms } from '../../data/admissionForms'

export default function AdmissionsPage({ navigate }) {
  return (
    <section className="mx-auto flex w-full flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700 px-6 py-10 text-white sm:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">
                Admissions 2026
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                Choose the correct admission form for your intake category.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-cyan-50 sm:text-base">
                Each option below opens the full registration form based on the original school
                document. Select the form title that matches your grade and student status.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/portal/login')}
              className="inline-flex rounded-full border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_36px_rgba(15,23,42,0.18)] transition hover:bg-cyan-50"
            >
              Login
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-2 xl:grid-cols-3">
          {admissionForms.map((form) => (
            <button
              key={form.slug}
              type="button"
              onClick={() => navigate(`/admissions/${form.slug}`)}
              className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 text-left shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_24px_60px_rgba(14,116,144,0.18)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
                    {form.formHeading}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {form.navLabel}
                  </h2>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {form.badge}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{form.shortTitle}</p>

              <div className="mt-6 rounded-2xl bg-slate-900/95 p-4 text-sm text-slate-100">
                <p className="font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Registration Day
                </p>
                <p className="mt-2 leading-6">{form.registrationSchedule}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">Full form</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Input fields</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Submit ready</span>
              </div>

              <span className="mt-6 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:text-sky-900">
                Open form
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}