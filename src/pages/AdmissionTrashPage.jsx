import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAdmissionResults from '../hooks/useAdmissionResults'

function formatDeletedAt(value) {
  if (!value) {
    return 'Unknown time'
  }

  return new Date(value).toLocaleString()
}

export default function AdmissionTrashPage() {
  const navigate = useNavigate()
  const { trashResults, restoreResult } = useAdmissionResults()
  const [searchValue, setSearchValue] = useState('')

  const filteredResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return trashResults.filter((result) => {
      if (!query) {
        return true
      }

      return (
        result.applicantName.toLowerCase().includes(query) ||
        result.id.toLowerCase().includes(query) ||
        result.formTitle.toLowerCase().includes(query) ||
        result.deletedReason.toLowerCase().includes(query)
      )
    })
  }, [searchValue, trashResults])

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-600">Trash</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Deleted applications</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Applications deleted from the main results page are kept here with the delete comment so they can be reviewed and restored.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-600">Records in trash</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{trashResults.length}</p>
          </div>
        </div>

        <label className="mt-8 block max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Search trash</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search applicant, ID, form, or delete comment"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div className="overflow-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Applicant</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Form</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Deleted</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Comment</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr
                  key={result.id}
                  className={`align-top ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-200`}
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-slate-950">{result.applicantName}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{result.id}</p>
                    <p className="mt-2 text-sm text-slate-600">{result.email}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">{result.formTitle}</p>
                    <p className="mt-1">{result.applicantType}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700">
                    <p>{formatDeletedAt(result.deletedAt)}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                      {result.deletedBy || 'Admissions Office'}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm leading-6 text-slate-700">{result.deletedReason}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(`/portal/results/${result.id}`)}
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => restoreResult(result.id)}
                        className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Restore
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-sm text-slate-500">
                    No deleted applications matched the current search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}