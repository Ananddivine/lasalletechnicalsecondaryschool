export default function DeleteApplicationDialog({
  isOpen,
  applicantName,
  comment,
  onCommentChange,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null
  }

  const isConfirmDisabled = !comment.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-600">Move to trash</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Delete {applicantName}?</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add the reason for deleting this application. The record will be moved to Trash instead of being removed permanently.
        </p>
        <label className="mt-6 block">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Delete comment</span>
          <textarea
            rows={5}
            value={comment}
            onChange={(event) => onCommentChange(event.target.value)}
            placeholder="Explain why this application is being deleted"
            className="mt-2 w-full rounded-[1.5rem] border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
          />
        </label>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isConfirmDisabled}
            onClick={onConfirm}
            className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
          >
            Delete application
          </button>
        </div>
      </div>
    </div>
  )
}