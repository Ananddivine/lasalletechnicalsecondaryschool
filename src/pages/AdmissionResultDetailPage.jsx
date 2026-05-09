import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import DeleteApplicationDialog from '../components/admin/DeleteApplicationDialog'
import useAdmissionResults from '../hooks/useAdmissionResults'

function normalizeDetailRecord(record) {
  if (!record) {
    return null
  }

  const uploadedFiles = Array.isArray(record.uploadedFiles) ? record.uploadedFiles : []
  const uploadedPhoto = uploadedFiles.find((file) => file?.type === 'image' && file?.url)

  const address =
    record.address ||
    [record.sectionUnit, record.lotBuilding, record.streetName, record.suburb].filter(Boolean).join(', ')

  return {
    ...record,
    address,
    whatsapp:
      record.whatsapp ||
      record.guardianContact ||
      record.guardianContactNumber ||
      record.fatherContactNumber ||
      record.motherContactNumber ||
      '',
    lastSchool: record.lastSchool || record.schoolLastAttended || '',
    guardianName: record.guardianName || record.guardianFullName || '',
    guardianContact: record.guardianContact || record.guardianContactNumber || '',
    courseInterest: record.courseInterest || record.courseApplying || record.applyingGrade || '',
    medicalNote: record.medicalNote || record.seriousIllness || record.physicalDisabilities || '',
    interviewDate: record.interviewDate || record.submittedOn || '',
    uploadedFiles,
    checklistStatus: Array.isArray(record.checklistStatus) ? record.checklistStatus : [],
    profilePhoto: record.profilePhoto || uploadedPhoto?.url || '',
  }
}

function downloadFile(file) {
  const anchor = document.createElement('a')
  anchor.href = file.url
  anchor.download = file.label
  anchor.target = '_blank'
  anchor.rel = 'noreferrer'
  anchor.click()
}

function PrintableSectionHeading({ children }) {
  return (
    <div className="section-heading border-b border-black pb-2 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-slate-950">
      {children}
    </div>
  )
}

function PrintableInfoTable({ rows, className = '' }) {
  return (
    <table className={`print-table w-full border-collapse table-fixed text-[12px] text-slate-950 ${className}`.trim()}>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="print-avoid-break">
            <th className="w-[28%] border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">
              {row.label}
            </th>
            <td className="border border-black px-3 py-2 font-medium">{row.value || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PrintableTwoColumnTable({ leftRows, rightRows }) {
  const maxLength = Math.max(leftRows.length, rightRows.length)

  return (
    <table className="print-table w-full border-collapse table-fixed text-[12px] text-slate-950">
      <tbody>
        {Array.from({ length: maxLength }, (_, index) => {
          const left = leftRows[index]
          const right = rightRows[index]

          return (
            <tr key={`${left?.label ?? 'left'}-${right?.label ?? 'right'}-${index}`} className="print-avoid-break">
              <th className="w-[19%] border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">
                {left?.label ?? ''}
              </th>
              <td className="w-[31%] border border-black px-3 py-2 font-medium">{left?.value || ''}</td>
              <th className="w-[19%] border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">
                {right?.label ?? ''}
              </th>
              <td className="w-[31%] border border-black px-3 py-2 font-medium">{right?.value || ''}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default function AdmissionResultDetailPage() {
  const { resultId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { allResults, isLoading, errorMessage, updateResult, deleteResult, restoreResult } = useAdmissionResults()
  const result = useMemo(
    () => normalizeDetailRecord(allResults.find((item) => item.id === resultId)),
    [allResults, resultId],
  )
  const printRef = useRef(null)
  const isEditMode = searchParams.get('mode') === 'edit'
  const [deleteComment, setDeleteComment] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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

  useEffect(() => {
    if (!result) {
      return
    }

    console.log('[AdmissionResultDetail] photo debug', {
      resultId: result.id,
      applicantName: result.applicantName,
      profilePhoto: result.profilePhoto,
      uploadedFiles: result.uploadedFiles,
      selectedPhotoSource: result.profilePhoto || null,
    })
  }, [result])

  const displayRecord = useMemo(
    () => (isEditMode && draft ? { ...result, ...draft, age: Number(draft.age) || draft.age } : result),
    [draft, isEditMode, result],
  )

  const printableSections = useMemo(() => {
    if (!displayRecord) {
      return null
    }

    const pageOneLeft = [
      { label: 'Applicant Name', value: displayRecord.applicantName },
      { label: 'Application No.', value: displayRecord.id },
      { label: 'Form Title', value: displayRecord.formTitle },
      { label: 'Applicant Type', value: displayRecord.applicantType },
      { label: 'Date of Birth', value: displayRecord.dateOfBirth },
      { label: 'Age', value: String(displayRecord.age) },
      { label: 'Gender', value: displayRecord.gender },
      { label: 'Home Province', value: displayRecord.homeProvince },
    ]

    const pageOneRight = [
      { label: 'Address', value: displayRecord.address },
      { label: 'Email Address', value: displayRecord.email },
      { label: 'Contact Number', value: displayRecord.whatsapp },
      { label: 'Last School', value: displayRecord.lastSchool },
      { label: 'Guardian Name', value: displayRecord.guardianName },
      { label: 'Guardian Contact', value: displayRecord.guardianContact },
      { label: 'Course Interest', value: displayRecord.courseInterest },
      { label: 'Interview Date', value: displayRecord.interviewDate },
    ]

    const reviewRows = [
      { label: 'Status', value: displayRecord.status },
      { label: 'Reviewer', value: displayRecord.reviewer },
      { label: 'Payment Status', value: displayRecord.paymentStatus },
      { label: 'Submitted On', value: displayRecord.submittedOn },
      { label: 'Medical Note', value: displayRecord.medicalNote },
      { label: 'Deleted On', value: displayRecord.deletedAt ? new Date(displayRecord.deletedAt).toLocaleString() : 'Active' },
      { label: 'Delete Reason', value: displayRecord.deletedReason || 'Not deleted' },
    ]

    const conditions = [
      `${displayRecord.formTitle} students must present complete registration records on the official registration day.`,
      `First installment and payment confirmation must match the admissions office record before clearance is granted.`,
      'Any false, missing, or forged documents may lead to cancellation of admission and further disciplinary action.',
      'Uniform, identification, and compulsory supporting documents are required before the student attends classes.',
    ]

    return {
      pageOneLeft,
      pageOneRight,
      reviewRows,
      conditions,
    }
  }, [displayRecord])

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: result ? `${result.applicantName.replace(/\s+/g, '_')}_admission_result` : 'admission_result',
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      html, body {
        margin: 0;
        padding: 0;
      }
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 11px;
        line-height: 1.25;
        color: #000;
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        background: white;
      }
      .print-hidden {
        display: none !important;
      }
      .print-sheet {
        width: 210mm;
        height: 297mm;
        box-sizing: border-box;
        padding: 8mm;
        margin: 0;
        page-break-after: always;
        break-after: page;
        background: white;
        overflow: hidden;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
      .print-sheet:last-child {
        page-break-after: auto;
        break-after: auto;
      }
      .print-sheet + .print-sheet {
        margin-top: 0 !important;
      }
      .print-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        border-bottom: 1.5px solid #000;
        padding-bottom: 6px;
      }
      .print-title {
        margin: 4px 0 0;
        font-size: 17px;
        font-weight: bold;
        text-align: left;
        letter-spacing: 0.04em;
      }
      .print-subtitle {
        margin: 3px 0 0;
        font-size: 11px;
      }
      .photo-box {
        width: 24mm;
        height: 32mm;
        flex-shrink: 0;
        border: 1px solid #000;
        padding: 1.5mm;
        box-sizing: border-box;
      }
      .photo-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .section {
        margin-top: 6px;
      }
      .section-tight {
        margin-top: 4px;
      }
      .section-heading {
        text-align: center;
        font-weight: bold;
        letter-spacing: 1px;
      }
      .print-sheet p,
      .print-sheet h2,
      .print-sheet h3 {
        margin-bottom: 0;
      }
      .print-sheet ol {
        margin: 6px 0 0;
      }
      .print-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        page-break-inside: auto;
      }
      .print-table th,
      .print-table td {
        border: 1px solid #000;
        padding: 4px 6px;
        vertical-align: top;
      }
      .print-table th {
        font-weight: bold;
        text-transform: uppercase;
      }
      .print-table tr {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .print-avoid-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .print-block-avoid {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .signature-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 12px;
      }
      .signature-box {
        width: 48%;
      }
      .signature-line {
        border-bottom: 1px solid #000;
        height: 20px;
      }
      .signature-label {
        margin-top: 3px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .print-sheet .mt-2 {
        margin-top: 4px !important;
      }
      .print-sheet .mt-3 {
        margin-top: 6px !important;
      }
      .print-sheet .mt-4 {
        margin-top: 8px !important;
      }
      .print-sheet .mt-8 {
        margin-top: 12px !important;
      }
    `,
  })

  if (isLoading) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">Result Detail</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">Loading applicant record</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">The admissions record is being loaded from the server.</p>
      </section>
    )
  }

  if (!result) {
    return (
      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-700">Result Detail</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-amber-950">Applicant record not found</h1>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          {errorMessage || 'This admission record could not be found. It may have been removed or the page loaded before the record was available.'}
        </p>
        <Link
          to="/portal/results"
          className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Back to results
        </Link>
      </section>
    )
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
            {result.isDeleted ? 'In Trash' : result.status}
          </span>
        </div>
      </div>

      <div className="print-hidden flex flex-wrap gap-4">
        {!result.isDeleted ? (
          <>
            <Link
              to={`/portal/results/${result.id}${isEditMode ? '' : '?mode=edit'}`}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {isEditMode ? 'Editing mode' : 'Edit details'}
            </Link>
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="rounded-full border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-700 hover:bg-rose-50"
            >
              Delete applicant
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => restoreResult(result.id)}
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Restore applicant
            </button>
            <Link
              to="/portal/trash"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to trash
            </Link>
          </>
        )}
      </div>

      <div ref={printRef} className="space-y-6 bg-slate-100/60 print:space-y-0 print:bg-white">
        <div className="print-sheet rounded-[1rem] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] print:rounded-none print:shadow-none">
          <div className="print-header print-block-avoid border-b-[1.5px] border-black pb-3">
            <div className="flex-1">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.34em] text-slate-800">La Salle Technical Secondary School</p>
                <h2 className="print-title mt-2 text-[24px] font-black tracking-tight text-slate-950">Official Admission Result Form</h2>
                <p className="print-subtitle mt-2 text-[11px] leading-5 text-slate-800">Admissions Office, Port Moresby, Papua New Guinea</p>
                <p className="text-[11px] leading-5 text-slate-800">Issued for school admission review and applicant records.</p>
              </div>
            </div>
            <div className="photo-box flex w-[6.5rem] shrink-0 items-center justify-center border border-black p-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-700">
              {displayRecord.profilePhoto ? (
                <img
                  src={displayRecord.profilePhoto}
                  alt={displayRecord.applicantName}
                  onLoad={(event) => {
                    console.log('[AdmissionResultDetail] photo loaded', {
                      resultId: displayRecord.id,
                      src: event.currentTarget.currentSrc || event.currentTarget.src,
                      naturalWidth: event.currentTarget.naturalWidth,
                      naturalHeight: event.currentTarget.naturalHeight,
                    })
                  }}
                  onError={(event) => {
                    console.error('[AdmissionResultDetail] photo failed', {
                      resultId: displayRecord.id,
                      src: event.currentTarget.currentSrc || event.currentTarget.src,
                      uploadedFiles: displayRecord.uploadedFiles,
                    })
                  }}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <span>Photo Pending</span>
              )}
            </div>
          </div>

          <div className="section grid gap-3 md:grid-cols-2">
            <div className="print-block-avoid">
              <PrintableSectionHeading>Student Information</PrintableSectionHeading>
              <div className="section-tight mt-3">
                <PrintableInfoTable rows={printableSections.pageOneLeft} />
              </div>
            </div>
            <div className="print-block-avoid">
              <PrintableSectionHeading>Application and Contact</PrintableSectionHeading>
              <div className="section-tight mt-3">
                <PrintableInfoTable rows={printableSections.pageOneRight} />
              </div>
            </div>
          </div>

          <div className="section print-block-avoid">
            <PrintableSectionHeading>Review Information</PrintableSectionHeading>
            <div className="section-tight mt-3">
              <PrintableInfoTable rows={printableSections.reviewRows} />
            </div>
          </div>
        </div>

        <div className="print-sheet rounded-[1rem] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] print:rounded-none print:shadow-none">
          <div className="print-block-avoid">
            <PrintableSectionHeading>Admissions Decision</PrintableSectionHeading>
            <div className="section-tight border border-black px-3 py-3 text-[11px] leading-5 text-slate-950">
              <p className="font-bold uppercase tracking-[0.08em]">Decision</p>
              <p className="mt-2">{displayRecord.decision}</p>
              <p className="mt-4 font-bold uppercase tracking-[0.08em]">Notes</p>
              <p className="mt-2 whitespace-pre-wrap">{displayRecord.notes}</p>
            </div>
          </div>

          <div className="section print-block-avoid">
            <PrintableSectionHeading>Uploaded Files Reference</PrintableSectionHeading>
            <table className="print-table section-tight mt-3 w-full border-collapse table-fixed text-[12px] text-slate-950">
              <thead>
                <tr>
                  <th className="w-14 border border-black px-3 py-2 text-center font-bold">#</th>
                  <th className="border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Document</th>
                  <th className="w-28 border border-black px-3 py-2 text-center font-bold uppercase tracking-[0.08em]">Type</th>
                </tr>
              </thead>
              <tbody>
                {displayRecord.uploadedFiles.map((file, index) => (
                  <tr key={file.id} className="print-avoid-break">
                    <td className="border border-black px-3 py-2 text-center font-semibold">{index + 1}</td>
                    <td className="border border-black px-3 py-2">{file.label}</td>
                    <td className="border border-black px-3 py-2 text-center uppercase">{file.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section print-block-avoid">
            <PrintableSectionHeading>Certification</PrintableSectionHeading>
            <div className="section-tight border border-black px-4 py-3 text-[11px] leading-5 text-slate-950">
              <p>
                I certify that the above information and submitted documents are correct to the best of my knowledge and are ready for admission verification.
              </p>
              <div className="signature-row mt-6 grid gap-4 sm:grid-cols-2">
                <div className="signature-box">
                  <div className="signature-line border-b border-black pb-5" />
                  <p className="signature-label mt-2 font-semibold uppercase tracking-[0.08em]">Student Name / Signature</p>
                  <p className="mt-2">{displayRecord.applicantName}</p>
                </div>
                <div className="signature-box">
                  <div className="signature-line border-b border-black pb-5" />
                  <p className="signature-label mt-2 font-semibold uppercase tracking-[0.08em]">Parent / Guardian Signature</p>
                  <p className="mt-2">{displayRecord.guardianName}</p>
                </div>
              </div>
              <div className="signature-row mt-6 grid gap-4 sm:grid-cols-2">
                <div className="signature-box">
                  <div className="signature-line border-b border-black pb-4" />
                  <p className="signature-label mt-2 font-semibold uppercase tracking-[0.08em]">Date</p>
                  <p className="mt-2">{displayRecord.interviewDate || displayRecord.submittedOn}</p>
                </div>
                <div className="signature-box">
                  <div className="signature-line border-b border-black pb-4" />
                  <p className="signature-label mt-2 font-semibold uppercase tracking-[0.08em]">Admissions Officer</p>
                  <p className="mt-2">{displayRecord.reviewer}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="print-sheet rounded-[1rem] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] print:rounded-none print:shadow-none">

          <div className="print-block-avoid">
            <PrintableSectionHeading>Checklist Verification</PrintableSectionHeading>
            <table className="print-table section-tight mt-3 w-full border-collapse table-fixed text-[12px] text-slate-950">
              <thead>
                <tr>
                  <th className="w-14 border border-black px-3 py-2 text-center font-bold">#</th>
                  <th className="border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Requirement</th>
                  <th className="w-24 border border-black px-3 py-2 text-center font-bold uppercase tracking-[0.08em]">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayRecord.checklistStatus.map((item, index) => (
                  <tr key={item} className="print-avoid-break">
                    <td className="border border-black px-3 py-2 text-center font-semibold">{index + 1}</td>
                    <td className="border border-black px-3 py-2">{item}</td>
                    <td className="border border-black px-3 py-2 text-center font-semibold">Checked</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="print-block-avoid">
            <PrintableSectionHeading>Registration Conditions</PrintableSectionHeading>
            <div className="section-tight border border-black px-4 py-3 text-[11px] leading-5 text-slate-950">
              <p className="font-semibold">
                The registration committee will verify these requirements before the student is cleared for classes.
              </p>
              <ol className="mt-3 space-y-1.5 pl-5">
                {printableSections.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="section print-block-avoid">
            <PrintableSectionHeading>Office Use Only</PrintableSectionHeading>
            <table className="print-table section-tight mt-3 w-full border-collapse table-fixed text-[12px] text-slate-950">
              <tbody>
                <tr className="print-avoid-break">
                  <th className="w-[25%] border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Approved Status</th>
                  <td className="border border-black px-3 py-2 font-semibold">{displayRecord.status}</td>
                </tr>
                <tr className="print-avoid-break">
                  <th className="border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Receiving Staff</th>
                  <td className="border border-black px-3 py-2">{displayRecord.reviewer}</td>
                </tr>
                <tr className="print-avoid-break">
                  <th className="border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Payment Clearance</th>
                  <td className="border border-black px-3 py-2">{displayRecord.paymentStatus}</td>
                </tr>
                <tr className="print-avoid-break">
                  <th className="border border-black px-3 py-2 text-left font-bold uppercase tracking-[0.08em]">Official Remarks</th>
                  <td className="border border-black px-3 py-5">{displayRecord.decision}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="print-hidden mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                  ['Deleted On', displayRecord.deletedAt ? new Date(displayRecord.deletedAt).toLocaleString() : 'Active'],
                  ['Delete Reason', displayRecord.deletedReason || 'Not deleted'],
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
      </div>

      <DeleteApplicationDialog
        isOpen={isDeleteDialogOpen}
        applicantName={result.applicantName}
        comment={deleteComment}
        onCommentChange={setDeleteComment}
        onCancel={() => {
          setIsDeleteDialogOpen(false)
          setDeleteComment('')
        }}
        onConfirm={() => {
          if (!deleteComment.trim()) {
            return
          }

          deleteResult(result.id, deleteComment, result.reviewer || 'Admissions Office')
          setIsDeleteDialogOpen(false)
          setDeleteComment('')
          navigate('/portal/trash', { replace: true })
        }}
      />
    </section>
  )
}