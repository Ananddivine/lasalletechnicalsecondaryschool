import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { admissionForms } from '../data/admissionForms'
import { dashboardChecklist } from '../data/adminPortalData'
import useAdmissionResults from '../hooks/useAdmissionResults'

const statusColors = {
  Approved: '#10b981',
  Pending: '#f59e0b',
  Review: '#0ea5e9',
  Rejected: '#f43f5e',
}

const paymentColors = {
  paid: '#14b8a6',
  unpaid: '#6366f1',
}

export default function AdminDashboardPage() {
  const { results } = useAdmissionResults()
  const dashboardStats = [
    {
      label: 'Total applications',
      value: String(results.length),
      detail: 'Across all 8 admissions forms for the current intake cycle.',
    },
    {
      label: 'Approved',
      value: String(results.filter((result) => result.status === 'Approved').length),
      detail: 'Students already cleared for admission confirmation.',
    },
    {
      label: 'Pending review',
      value: String(results.filter((result) => result.status === 'Pending').length),
      detail: 'Applications waiting on checklist verification or interview notes.',
    },
    {
      label: 'Payments confirmed',
      value: String(
        results.filter((result) => result.paymentStatus.toLowerCase().startsWith('paid')).length,
      ),
      detail: 'First-installment payments validated by the admissions office.',
    },
  ]

  const statusChartData = useMemo(() => {
    const statusCounts = results.reduce((accumulator, result) => {
      accumulator[result.status] = (accumulator[result.status] ?? 0) + 1
      return accumulator
    }, {})

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
  }, [results])

  const formChartData = useMemo(() => {
    const formCounts = admissionForms.reduce((accumulator, form) => {
      accumulator[form.navLabel] = {
        name: form.navLabel,
        boys: 0,
        girls: 0,
      }

      return accumulator
    }, {})

    results.forEach((result) => {
      if (!formCounts[result.formTitle]) {
        formCounts[result.formTitle] = {
          name: result.formTitle,
          boys: 0,
          girls: 0,
        }
      }

      if (result.gender?.toLowerCase() === 'female') {
        formCounts[result.formTitle].girls += 1
      } else {
        formCounts[result.formTitle].boys += 1
      }
    })

    return Object.values(formCounts)
  }, [results])

  const monthlyTrendData = useMemo(() => {
    const monthlyCounts = results.reduce((accumulator, result) => {
      const date = new Date(result.submittedOn)
      const monthLabel = date.toLocaleString('en-US', { month: 'short' })
      const paymentKey = result.paymentStatus.toLowerCase().startsWith('paid') ? 'paid' : 'unpaid'

      if (!accumulator[monthLabel]) {
        accumulator[monthLabel] = {
          month: monthLabel,
          submissions: 0,
          approved: 0,
          paid: 0,
          unpaid: 0,
          sortValue: date.getMonth(),
        }
      }

      accumulator[monthLabel].submissions += 1
      accumulator[monthLabel].approved += result.status === 'Approved' ? 1 : 0
      accumulator[monthLabel][paymentKey] += 1

      return accumulator
    }, {})

    return Object.values(monthlyCounts).sort((first, second) => first.sortValue - second.sortValue)
  }, [results])

  const paymentSummary = useMemo(() => {
    const paid = results.filter((result) => result.paymentStatus.toLowerCase().startsWith('paid')).length
    const unpaid = results.length - paid

    return [
      { label: 'Paid / confirmed', value: paid, color: paymentColors.paid },
      { label: 'Awaiting / partial', value: unpaid, color: paymentColors.unpaid },
    ]
  }, [results])

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Admissions Dashboard</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
            Monitor the full admission process from first application to final decision.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            This dashboard gives the admissions team a quick view of intake volume, approval
            status, payment confirmations, and the tasks that still need action before students
            are cleared for registration day.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-sky-900 to-cyan-800 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">Today</p>
          <h2 className="mt-4 text-2xl font-black tracking-tight">Admissions control room</h2>
          <p className="mt-4 text-sm leading-7 text-sky-50">
            Focus today on transfer cases, medical report follow-up, and fee reconciliation before
            registration desks open.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
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

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Pie Chart</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Application status split</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-700">
              Live mix
            </span>
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={108}
                  paddingAngle={4}
                >
                  {statusChartData.map((entry) => (
                    <Cell key={entry.name} fill={statusColors[entry.name] ?? '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {paymentSummary.map((item) => (
              <div key={item.label} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                </div>
                <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Bar Chart</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Applications by form</h2>
            </div>
            <span className="rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-800">
              Intake demand
            </span>
          </div>
          <div className="mt-6 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formChartData} barCategoryGap={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} angle={-15} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="boys" stackId="gender" radius={[0, 0, 0, 0]} fill="#2563eb" name="Boys" />
                <Bar dataKey="girls" stackId="gender" radius={[10, 10, 0, 0]} fill="#ec4899" name="Girls" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Trend Chart</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Submission and approval trend</h2>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
            Monthly overview
          </span>
        </div>
        <div className="mt-6 h-[24rem]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="submissions" stroke="#0f172a" strokeWidth={3} dot={{ r: 4 }} name="Submissions" />
              <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Approved" />
              <Line type="monotone" dataKey="paid" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} name="Paid / confirmed" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Priority checklist</h2>
          <div className="mt-6 space-y-3">
            {dashboardChecklist.map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Recent decisions</h2>
            <span className="rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-sky-800">
              Latest results
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {results.slice(0, 4).map((result) => (
              <article
                key={result.id}
                className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{result.applicantName}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {result.formTitle} • {result.id}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {result.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{result.decision}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}