import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import useAdmissionResults from '../hooks/useAdmissionResults'

function downloadFile(file) {
  const anchor = document.createElement('a')
  anchor.href = file.url
  anchor.download = file.label
  anchor.target = '_blank'
  anchor.rel = 'noreferrer'
  anchor.click()
}

export default function AdmissionResultDetailPage() {
  const { resultId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { results, updateResult, deleteResult } = useAdmissionResults()
  const result = results.find((item) => item.id === resultId)
  const printRef = useRef(null)
  const isEditMode = searchParams.get('mode') === 'edit'
  const [draft, setDraft] = useState(() =>
    result
      ? {
          applicantName: result.applicantName,
          email: result.email,
          whatsapp: result.whatsapp,
          dateOfBirth: result.dateOfBirth,
          age: String(result.age),
          gender: result.gender,
          address: result.address,
          homeProvince: result.homeProvince,
          lastSchool: result.lastSchool,
          guardianName: result.guardianName,
          guardianContact: result.guardianContact,
          courseInterest: result.courseInterest,
          medicalNote: result.medicalNote,
          interviewDate: result.interviewDate,
          status: result.status,
          reviewer: result.reviewer,
          paymentStatus: result.paymentStatus,
          decision: result.decision,
          notes: result.notes,
        }
      : null,
  )

  useEffect(() => {
    if (!result) {
      return
    }

    setDraft({
      applicantName: result.applicantName,
      email: result.email,
      whatsapp: result.whatsapp,
      dateOfBirth: result.dateOfBirth,
      age: String(result.age),
      gender: result.gender,
      address: result.address,
      homeProvince: result.homeProvince,
      lastSchool: result.lastSchool,
      guardianName: result.guardianName,
      guardianContact: result.guardianContact,
      courseInterest: result.courseInterest,
      medicalNote: result.medicalNote,
      interviewDate: result.interviewDate,
      status: result.status,
      reviewer: result.reviewer,
      paymentStatus: result.paymentStatus,
      decision: result.decision,
      notes: result.notes,
    })
  }, [result])

  const displayRecord = useMemo(
    () => (isEditMode && draft ? { ...result, ...draft, age: Number(draft.age) || draft.age } : result),
    [draft, isEditMode, result],
  )

  const detailGroups = useMemo(
    () =>
      displayRecord
        ? [
            [
              ['Application ID', displayRecord.id],
              ['Form Title', displayRecord.formTitle],
              ['Applicant Type', displayRecord.applicantType],
              ['Status', displayRecord.status],
            ],
            [
              ['Email', displayRecord.email],
              ['WhatsApp', displayRecord.whatsapp],
              ['Date of Birth', displayRecord.dateOfBirth],
              ['Age', String(displayRecord.age)],
            ],
            [
              ['Gender', displayRecord.gender],
              ['Home Province', displayRecord.homeProvince],
              ['Address', displayRecord.address],
              ['Last School', displayRecord.lastSchool],
            ],
            [
              ['Guardian Name', displayRecord.guardianName],
              ['Guardian Contact', displayRecord.guardianContact],
              ['Course Interest', displayRecord.courseInterest],
              ['Interview Date', displayRecord.interviewDate],
            ],
          ]
        : [],
    [displayRecord],
  )

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: result ? `${result.applicantName.replace(/\s+/g, '_')}_admission_result` : 'admission_result',
    pageStyle: `
      @page {
        size: A4;
        margin: 16mm;
      }
      body {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        background: white;
      }
      .print-hidden {
        display: none !important;
      }
    `,
  })

  if (!result) {
    return <Navigate to="/portal/results" replace />
  }

  const handleDraftChange = (field, value) => {
    setDraft((currentValue) => ({ ...currentValue, [field]: value }))
  }

  const handleSaveChanges = () => {
    updateResult(result.id, {
      ...draft,
      age: Number(draft.age) || result.age,
    })
    navigate(`/portal/results/${result.id}`, { replace: true })
  }

  return (
    <section className="space-y-8">
      <div className="print-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Result Detail</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              {result.applicantName}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {result.formTitle} • {result.applicantType} • {result.id}
            </p>
          </div>
          <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
            {result.status}
          </span>
        </div>
      </div>

      <div className="print-hidden flex flex-wrap gap-4">
        <Link
          to={`/portal/results/${result.id}${isEditMode ? '' : '?mode=edit'}`}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          {isEditMode ? 'Editing mode' : 'Edit details'}
        </Link>
        <button
          type="button"
          onClick={() => {
            deleteResult(result.id)
            navigate('/portal/results', { replace: true })
          }}
          className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-700 hover:bg-rose-50"
        >
          Delete applicant
        </button>
      </div>

      <div ref={printRef} className="border border-slate-300 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] print:border-black print:p-0 print:shadow-none sm:p-8">
        <div className="border-b-2 border-slate-900 pb-6 print:px-6 print:pt-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-slate-700">La Salle Technical Secondary School</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Official Admission Result Form</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Admissions Office, Port Moresby, Papua New Guinea
              </p>
              <p className="text-sm leading-6 text-slate-700">Issued for school admission review and applicant records.</p>
            </div>
            <div className="border border-slate-400 p-2">
              <img
                src={displayRecord.profilePhoto}
                alt={displayRecord.applicantName}
                className="h-36 w-28 object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border border-slate-300 print:mx-6">
          <div className="grid border-b border-slate-300 bg-slate-100 text-sm font-bold uppercase tracking-[0.24em] text-slate-700 sm:grid-cols-[220px_1fr_220px_1fr] print:bg-transparent">
            <div className="border-r border-slate-300 px-4 py-3">Applicant Name</div>
            <div className="border-r border-slate-300 px-4 py-3 text-base font-semibold normal-case tracking-normal text-slate-950">{displayRecord.applicantName}</div>
            <div className="border-r border-slate-300 px-4 py-3">Application No.</div>
            <div className="px-4 py-3 text-base font-semibold normal-case tracking-normal text-slate-950">{displayRecord.id}</div>
          </div>
          {detailGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="grid sm:grid-cols-2">
              {group.map(([label, value], index) => (
                <div key={label} className={`grid border-b border-slate-300 sm:grid-cols-[220px_1fr] ${index % 2 === 0 ? 'sm:border-r' : ''}`}>
                  <div className="border-r border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-[0.22em] text-slate-600 print:bg-transparent">
                    {label}
                  </div>
                  <div className="px-4 py-3 text-sm font-medium text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr] print:mx-6 print:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {isEditMode ? (
              <div className="print-hidden border border-slate-300 p-5">
                <h3 className="text-xl font-black tracking-tight text-slate-950">Edit Applicant Record</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Applicant name</span>
                    <input
                      type="text"
                      value={draft?.applicantName ?? ''}
                      onChange={(event) => handleDraftChange('applicantName', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Email</span>
                    <input
                      type="email"
                      value={draft?.email ?? ''}
                      onChange={(event) => handleDraftChange('email', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">WhatsApp</span>
                    <input
                      type="text"
                      value={draft?.whatsapp ?? ''}
                      onChange={(event) => handleDraftChange('whatsapp', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Date of Birth</span>
                    <input
                      type="date"
                      value={draft?.dateOfBirth ?? ''}
                      onChange={(event) => handleDraftChange('dateOfBirth', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Age</span>
                    <input
                      type="number"
                      value={draft?.age ?? ''}
                      onChange={(event) => handleDraftChange('age', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Gender</span>
                    <input
                      type="text"
                      value={draft?.gender ?? ''}
                      onChange={(event) => handleDraftChange('gender', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Address</span>
                    <input
                      type="text"
                      value={draft?.address ?? ''}
                      onChange={(event) => handleDraftChange('address', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Home Province</span>
                    <input
                      type="text"
                      value={draft?.homeProvince ?? ''}
                      onChange={(event) => handleDraftChange('homeProvince', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Last School</span>
                    <input
                      type="text"
                      value={draft?.lastSchool ?? ''}
                      onChange={(event) => handleDraftChange('lastSchool', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Guardian Name</span>
                    <input
                      type="text"
                      value={draft?.guardianName ?? ''}
                      onChange={(event) => handleDraftChange('guardianName', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Guardian Contact</span>
                    <input
                      type="text"
                      value={draft?.guardianContact ?? ''}
                      onChange={(event) => handleDraftChange('guardianContact', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Course Interest</span>
                    <input
                      type="text"
                      value={draft?.courseInterest ?? ''}
                      onChange={(event) => handleDraftChange('courseInterest', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Interview Date</span>
                    <input
                      type="date"
                      value={draft?.interviewDate ?? ''}
                      onChange={(event) => handleDraftChange('interviewDate', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Medical note</span>
                    <textarea
                      rows={2}
                      value={draft?.medicalNote ?? ''}
                      onChange={(event) => handleDraftChange('medicalNote', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Status</span>
                    <select
                      value={draft?.status ?? result.status}
                      onChange={(event) => handleDraftChange('status', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Review">Review</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Reviewer</span>
                    <input
                      type="text"
                      value={draft?.reviewer ?? ''}
                      onChange={(event) => handleDraftChange('reviewer', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Payment Status</span>
                    <input
                      type="text"
                      value={draft?.paymentStatus ?? ''}
                      onChange={(event) => handleDraftChange('paymentStatus', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Decision</span>
                    <textarea
                      rows={3}
                      value={draft?.decision ?? ''}
                      onChange={(event) => handleDraftChange('decision', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Notes</span>
                    <textarea
                      rows={5}
                      value={draft?.notes ?? ''}
                      onChange={(event) => handleDraftChange('notes', event.target.value)}
                      className="mt-2 w-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                    />
                  </label>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    Save changes
                  </button>
                  <Link
                    to={`/portal/results/${result.id}`}
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    Cancel edit
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="border border-slate-300 p-5">
              <h3 className="border-b border-slate-300 pb-3 text-lg font-black uppercase tracking-[0.18em] text-slate-900">
                Admissions Decision
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-800">{displayRecord.decision}</p>
              <p className="mt-4 text-sm leading-7 text-slate-700">{displayRecord.notes}</p>
            </div>

            <div className="border border-slate-300 p-5">
              <h3 className="border-b border-slate-300 pb-3 text-lg font-black uppercase tracking-[0.18em] text-slate-900">
                Checklist Verification
              </h3>
              <div className="mt-4 divide-y divide-slate-300 border border-slate-300">
                {displayRecord.checklistStatus.map((item, index) => (
                  <div key={item} className="grid sm:grid-cols-[60px_1fr]">
                    <div className="border-r border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">{index + 1}</div>
                    <div className="px-4 py-3 text-sm text-slate-800">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-300 p-5">
              <h3 className="border-b border-slate-300 pb-3 text-lg font-black uppercase tracking-[0.18em] text-slate-900">
                Review Information
              </h3>
              <div className="mt-4 divide-y divide-slate-300 border border-slate-300">
                {[
                  ['Reviewer', displayRecord.reviewer],
                  ['Payment Status', displayRecord.paymentStatus],
                  ['Submitted On', displayRecord.submittedOn],
                  ['Medical Note', displayRecord.medicalNote],
                ].map(([label, value]) => (
                  <div key={label} className="grid sm:grid-cols-[170px_1fr]">
                    <div className="border-r border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-600 print:bg-transparent">
                      {label}
                    </div>
                    <div className="px-4 py-3 text-sm font-medium text-slate-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-300 p-5">
              <h3 className="border-b border-slate-300 pb-3 text-lg font-black uppercase tracking-[0.18em] text-slate-900">
                Authorization
              </h3>
              <div className="mt-6 space-y-6 text-sm text-slate-800">
                <div>
                  <p className="font-semibold">Admissions Officer</p>
                  <div className="mt-8 border-b border-slate-400" />
                  <p className="mt-2">{displayRecord.reviewer}</p>
                </div>
                <div>
                  <p className="font-semibold">Decision Date</p>
                  <div className="mt-8 border-b border-slate-400" />
                  <p className="mt-2">{displayRecord.interviewDate || displayRecord.submittedOn}</p>
                </div>
                <div>
                  <p className="font-semibold">Official Remarks</p>
                  <div className="mt-8 border-b border-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-slate-300 p-5 print-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Uploaded files</h2>
            <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
              {displayRecord.uploadedFiles.length} files
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayRecord.uploadedFiles.map((file) => (
              <article key={file.id} className="border border-slate-300 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{file.label}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{file.type}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => downloadFile(file)}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateResult(result.id, (currentValue) => ({
                        ...currentValue,
                        uploadedFiles: currentValue.uploadedFiles.filter(
                          (currentFile) => currentFile.id !== file.id,
                        ),
                      }))
                    }
                    className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-700 hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="print-hidden flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Print
          </button>
          <Link
            to="/portal/results"
            className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to results table
          </Link>
        </div>

        <div className="hidden print:block">
          <div className="mx-6 mt-6 border border-slate-300 p-4">
            <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-950">Uploaded files reference</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {displayRecord.uploadedFiles.map((file) => (
                <div key={file.id} className="border border-slate-300 px-4 py-3 text-sm text-slate-700">
                {file.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}