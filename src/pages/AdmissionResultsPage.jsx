import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DeleteApplicationDialog from '../components/admin/DeleteApplicationDialog'
import useAdmissionResults from '../hooks/useAdmissionResults'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const resultsPerPage = 15
const actionMenuWidth = 192
const actionMenuHeight = 232
const actionMenuOffset = 12
const viewportPadding = 12

const queueLabels = {
  documents: 'Document checks',
  payments: 'Payment follow-up',
  routing: 'Interview routing',
}

function getStatusStyles(status) {
  switch (status) {
    case 'Approved':
      return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
    case 'Pending':
      return 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
    case 'Review':
      return 'bg-sky-100 text-sky-900 ring-1 ring-sky-200'
    case 'Rejected':
      return 'bg-rose-100 text-rose-800 ring-1 ring-rose-200'
    default:
      return 'bg-slate-100 text-slate-800 ring-1 ring-slate-200'
  }
}

function ActionMenu({ isVisible, menuRef, position, onView, onEmail, onWhatsApp, onEdit, onDelete }) {
  if (!isVisible || !position || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-[80] w-48 rounded-[1.35rem] border border-slate-200 bg-white p-2 shadow-[0_22px_50px_rgba(15,23,42,0.16)]"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      {[
        ['View', onView],
        ['Email', onEmail],
        ['WhatsApp', onWhatsApp],
        ['Edit', onEdit],
        ['Delete', onDelete],
      ].map(([label, handler]) => (
        <button
          key={label}
          type="button"
          onClick={handler}
          className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
        >
          {label}
        </button>
      ))}
    </div>,
    document.body,
  )
}

export default function AdmissionResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { results, deleteResult } = useAdmissionResults()
  const [searchValue, setSearchValue] = useState(() => searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState(() => searchParams.get('status') || 'all')
  const [formFilter, setFormFilter] = useState(() => searchParams.get('form') || 'all')
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [openActionId, setOpenActionId] = useState(null)
  const [actionMenuPosition, setActionMenuPosition] = useState(null)
  const [pendingDeleteResult, setPendingDeleteResult] = useState(null)
  const [deleteComment, setDeleteComment] = useState('')
  const actionButtonRefs = useRef(new Map())
  const actionMenuRef = useRef(null)
  const queueFilter = searchParams.get('queue') || ''

  useEffect(() => {
    setSearchValue(searchParams.get('search') || '')
    setStatusFilter(searchParams.get('status') || 'all')
    setFormFilter(searchParams.get('form') || 'all')
    setCurrentPage(1)
  }, [searchParams])

  const updateActionMenuPosition = (resultId) => {
    const button = actionButtonRefs.current.get(resultId)

    if (!button) {
      return
    }

    const buttonBounds = button.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const shouldOpenUpward =
      viewportHeight - buttonBounds.bottom < actionMenuHeight + actionMenuOffset &&
      buttonBounds.top > actionMenuHeight + actionMenuOffset
    const top = shouldOpenUpward
      ? Math.max(viewportPadding, buttonBounds.top - actionMenuHeight - actionMenuOffset)
      : Math.min(
          viewportHeight - actionMenuHeight - viewportPadding,
          buttonBounds.bottom + actionMenuOffset,
        )
    const left = Math.min(
      Math.max(viewportPadding, buttonBounds.right - actionMenuWidth),
      viewportWidth - actionMenuWidth - viewportPadding,
    )

    setActionMenuPosition({ top, left })
  }

  useEffect(() => {
    if (!openActionId) {
      return undefined
    }

    const handleViewportChange = () => updateActionMenuPosition(openActionId)
    const handlePointerDown = (event) => {
      const activeButton = actionButtonRefs.current.get(openActionId)

      if (activeButton?.contains(event.target) || actionMenuRef.current?.contains(event.target)) {
        return
      }

      setOpenActionId(null)
      setActionMenuPosition(null)
    }

    handleViewportChange()
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)
    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [openActionId])

  const registerActionButton = (resultId) => (element) => {
    if (element) {
      actionButtonRefs.current.set(resultId, element)
      return
    }

    actionButtonRefs.current.delete(resultId)
  }

  const closeDeleteDialog = () => {
    setPendingDeleteResult(null)
    setDeleteComment('')
  }

  const confirmDelete = () => {
    if (!pendingDeleteResult || !deleteComment.trim()) {
      return
    }

    deleteResult(
      pendingDeleteResult.id,
      deleteComment,
      pendingDeleteResult.reviewer || 'Admissions Office',
    )
    setOpenActionId(null)
    setActionMenuPosition(null)
    closeDeleteDialog()
  }

  const toggleActionMenu = (resultId) => {
    setOpenActionId((currentValue) => {
      const nextValue = currentValue === resultId ? null : resultId

      if (nextValue) {
        updateActionMenuPosition(nextValue)
      } else {
        setActionMenuPosition(null)
      }

      return nextValue
    })
  }

  const toggleDateFilter = () => {
    setShowDateFilter((previousValue) => {
      const nextValue = !previousValue

      if (!nextValue) {
        setIsDateFilterApplied(false)
        setClickCount(0)
      }

      return nextValue
    })
  }

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection
    setDateRange({ startDate, endDate, key: 'selection' })
    setIsDateFilterApplied(true)
    setCurrentPage(1)

    if (startDate.getTime() === endDate.getTime()) {
      if (clickCount === 1) {
        setShowDateFilter(false)
        setClickCount(0)
      } else {
        setClickCount(1)
        setTimeout(() => setClickCount(0), 300)
      }
    } else {
      setShowDateFilter(false)
    }
  }

  const formOptions = [...new Set(results.map((result) => result.formTitle))]

  const filteredResults = useMemo(
    () =>
      results.filter((result) => {
        const query = searchValue.trim().toLowerCase()
        const matchesSearch =
          !query ||
          result.applicantName.toLowerCase().includes(query) ||
          result.id.toLowerCase().includes(query) ||
          result.formTitle.toLowerCase().includes(query) ||
          result.email.toLowerCase().includes(query)

        const matchesStatus = statusFilter === 'all' || result.status === statusFilter
        const matchesForm = formFilter === 'all' || result.formTitle === formFilter
        const matchesQueue =
          !queueFilter ||
          (queueFilter === 'documents' && (!result.uploadedFiles?.length || ['Pending', 'Review'].includes(result.status))) ||
          (queueFilter === 'payments' && !result.paymentStatus.toLowerCase().startsWith('paid')) ||
          (queueFilter === 'routing' && (
            String(result.applicantType || '').toLowerCase().includes('transfer') ||
            String(result.applicantType || '').toLowerCase().includes('repeat') ||
            result.status === 'Review'
          ))
        const matchesDate =
          !isDateFilterApplied ||
          (() => {
            const submittedDate = new Date(result.submittedOn)
            const start = new Date(dateRange.startDate).setHours(0, 0, 0, 0)
            const end = new Date(dateRange.endDate).setHours(23, 59, 59, 999)

            return submittedDate >= start && submittedDate <= end
          })()

        return matchesSearch && matchesStatus && matchesForm && matchesQueue && matchesDate
      }),
    [results, searchValue, statusFilter, formFilter, queueFilter, isDateFilterApplied, dateRange],
  )

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / resultsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedResults = filteredResults.slice(
    (safePage - 1) * resultsPerPage,
    safePage * resultsPerPage,
  )
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (page) => page === 1 || page === totalPages || Math.abs(page - safePage) <= 2,
  )
  const visiblePages = pageNumbers.reduce((accumulator, page, index) => {
    if (index > 0 && pageNumbers[index - 1] !== page - 1) {
      accumulator.push('gap')
    }
    accumulator.push(page)
    return accumulator
  }, [])
  const firstResult = filteredResults.length === 0 ? 0 : (safePage - 1) * resultsPerPage + 1
  const lastResult = Math.min(safePage * resultsPerPage, filteredResults.length)

  return (
    <section className="space-y-8">
      {queueFilter ? (
        <div className="rounded-[1.5rem] border border-sky-200 bg-sky-50 px-5 py-4 text-sm text-sky-950">
          Viewing the <span className="font-semibold">{queueLabels[queueFilter] || 'selected'}</span> queue.
        </div>
      ) : null}

      <div className="serial-light-frame rounded-[2rem] p-[2px]">
        <div className="serial-light-panel overflow-hidden rounded-[calc(2rem-2px)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.94))] shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
          <div className="border-b border-slate-200/90 px-6 py-5">
            <div className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr_0.95fr_1.2fr]">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Search</span>
              <input
                type="search"
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search name, ID, form, or email"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                  setCurrentPage(1)
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                <option value="all">All statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Review">Review</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Form filter</span>
              <select
                value={formFilter}
                onChange={(event) => {
                  setFormFilter(event.target.value)
                  setCurrentPage(1)
                }}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                <option value="all">All forms</option>
                {formOptions.map((formOption) => (
                  <option key={formOption} value={formOption}>
                    {formOption}
                  </option>
                ))}
              </select>
            </label>
            <div className="relative">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Date filter</span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleDateFilter}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  {showDateFilter ? 'Hide Date Filter' : 'Show Date Filter'}
                </button>
                {isDateFilterApplied ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDateFilterApplied(false)
                      setShowDateFilter(false)
                      setClickCount(0)
                      setCurrentPage(1)
                    }}
                    className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    Clear Date
                  </button>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {isDateFilterApplied
                  ? `${format(dateRange.startDate, 'dd MMM yyyy')} - ${format(dateRange.endDate, 'dd MMM yyyy')}`
                  : 'No date range selected'}
              </p>
              {showDateFilter && (
                <div className="absolute left-0 top-full z-20 mt-3 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.14)]">
                  <DateRange
                    ranges={[dateRange]}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#0f172a']}
                  />
                </div>
              )}
            </div>
          </div>
          </div>

          <div className="max-h-[68vh] overflow-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-slate-950 text-white">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Applicant</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Form</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Reviewer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResults.map((result, index) => (
                  <tr
                    key={result.id}
                    className={`align-top ${index % 2 === 0 ? 'bg-white/80' : 'bg-slate-50/85'} border-t border-slate-200/90 hover:bg-slate-200 transition`}
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-slate-950">{result.applicantName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{result.id}</p>
                      <p className="mt-2 text-sm text-slate-600">Submitted: {result.submittedOn}</p>
                      <p className="mt-2 text-sm text-slate-600">{result.email}</p>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">{result.formTitle}</p>
                      <p className="mt-1">{result.applicantType}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${getStatusStyles(result.status)}`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-700">{result.paymentStatus}</td>
                    <td className="px-6 py-5 text-sm text-slate-700">{result.reviewer}</td>
                    <td className="px-6 py-5">
                      <div className="relative">
                        <button
                          ref={registerActionButton(result.id)}
                          type="button"
                          aria-label={`Settings for ${result.applicantName}`}
                          onClick={() => toggleActionMenu(result.id)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-lg font-black text-white transition hover:bg-sky-700"
                        >
                          ⚙
                        </button>
                        <ActionMenu
                          isVisible={openActionId === result.id}
                          menuRef={actionMenuRef}
                          position={actionMenuPosition}
                          onView={() => navigate(`/portal/results/${result.id}`)}
                          onEmail={() =>
                            window.open(
                              `mailto:${result.email}?subject=${encodeURIComponent(`Admission update for ${result.applicantName}`)}`,
                              '_self',
                            )
                          }
                          onWhatsApp={() =>
                            window.open(
                              `https://wa.me/${result.whatsapp}?text=${encodeURIComponent(`Hello ${result.applicantName}, this is the La Salle admissions office regarding your application ${result.id}.`)}`,
                              '_blank',
                              'noopener,noreferrer',
                            )
                          }
                          onEdit={() => navigate(`/portal/results/${result.id}?mode=edit`)}
                          onDelete={() => {
                            setPendingDeleteResult(result)
                            setDeleteComment('')
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedResults.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-sm text-slate-500">
                      No results matched the current search and filter selections.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/90 px-6 py-5">
            <p className="text-sm text-slate-600">
              Showing {firstResult}-{lastResult} of {filteredResults.length} results. 15 results for each pagination.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((currentValue) => Math.max(1, currentValue - 1))}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <div className="flex items-center gap-1">
                {visiblePages.map((page, index) =>
                  page === 'gap' ? (
                    <span key={`gap-${index}`} className="px-2 text-slate-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                        page === safePage
                          ? 'bg-slate-950 text-white'
                          : 'border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((currentValue) => Math.min(totalPages, currentValue + 1))}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteApplicationDialog
        isOpen={Boolean(pendingDeleteResult)}
        applicantName={pendingDeleteResult?.applicantName ?? 'this applicant'}
        comment={deleteComment}
        onCommentChange={setDeleteComment}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </section>
  )
}