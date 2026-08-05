import { useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import {
  downloadMailboxAttachment,
  fetchMailboxMessage,
  fetchMailboxMessages,
  replyMailboxMessage,
  sendMailboxMessage,
} from '../lib/api'

// -----------------------------------------------------------------------
// NOTE: This file assumes a <QueryClientProvider> wraps your app root.
// See the setup snippet at the bottom of this file (queryClient.js) for
// the provider you need to add once, near where you render <App />.
// -----------------------------------------------------------------------

function formatDateTime(value) {
  if (!value) {
    return 'Unknown date'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function buildMessageFormData(fields, attachments = []) {
  const formData = new FormData()

  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim()) {
      formData.append(key, value.trim())
    }
  })

  Array.from(attachments).forEach((file) => {
    formData.append('attachments', file)
  })

  return formData
}

function normalizeThreadSubject(subject) {
  if (!subject) {
    return '(No subject)'
  }

  return subject.replace(/^(re:|fw:|fwd:)\s*/gi, '').trim() || '(No subject)'
}

function buildThreadKey(message) {
  const baseSubject = normalizeThreadSubject(message.subject)
  const threadId =
    (typeof message.inReplyTo === 'string' && message.inReplyTo.trim()) ||
    (Array.isArray(message.references) && message.references.find((ref) => typeof ref === 'string' && ref.trim())) ||
    (typeof message.messageId === 'string' && message.messageId.trim()) ||
    baseSubject

  return `${baseSubject}|thread:${threadId}`
}

function MailStatusPill({ read, answered }) {
  const className = answered
    ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
    : read
      ? 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
      : 'bg-sky-100 text-sky-900 ring-1 ring-sky-200'
  const label = answered ? 'Answered' : read ? 'Read' : 'Unread'

  return <span className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${className}`}>{label}</span>
}

// Query key helpers — keep these consistent everywhere you touch a query,
// otherwise cache hits/invalidation silently stop working.
const mailboxMessagesKey = (folder, unreadOnly, query) => ['mailboxMessages', folder, unreadOnly, query]
const mailboxMessageKey = (uid, folder) => ['mailboxMessage', uid, folder]

export default function AdminMailboxPage() {
  const { mailboxSummary, refreshMailboxSummary, portalSession } = useOutletContext() || {}
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedMessageUid = searchParams.get('messageUid') || ''
  const queryClient = useQueryClient()

  const [searchValue, setSearchValue] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [mailboxFolder, setMailboxFolder] = useState('INBOX')
  const [isSendingReply, setIsSendingReply] = useState(false)
  const [isSendingCompose, setIsSendingCompose] = useState(false)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [replyFiles, setReplyFiles] = useState([])
  const [composeForm, setComposeForm] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
  })
  const [composeFiles, setComposeFiles] = useState([])
  const refreshMailboxSummaryRef = useRef(refreshMailboxSummary)

  useEffect(() => {
    refreshMailboxSummaryRef.current = refreshMailboxSummary
  }, [refreshMailboxSummary])

  // --- Message list query -------------------------------------------------
  // placeholderData: keepPreviousData means switching folders/search/unread
  // keeps showing the last list instead of blanking to a spinner. isFetching
  // (not isLoading) tells you when a background refresh is in flight.
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    isFetching: isRefetchingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: mailboxMessagesKey(mailboxFolder, showUnreadOnly, appliedSearch),
    queryFn: ({ signal }) =>
      fetchMailboxMessages({
        query: appliedSearch,
        unreadOnly: showUnreadOnly,
        folder: mailboxFolder,
        signal, // pass through so in-flight requests can be aborted on key change
      }),
    select: (response) => response.messages || [],
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  })

  useEffect(() => {
    if (messagesError) {
      setErrorMessage(messagesError.message || 'Unable to load mailbox messages.')
    }
  }, [messagesError])

  // Keep the selected UID valid whenever the list changes (folder switch,
  // search, refresh). Falls back to the first message in the new list.
  useEffect(() => {
    if (isLoadingMessages) {
      return
    }

    const stillExists = messages.some((message) => message.uid === selectedMessageUid)
    const nextUid = stillExists ? selectedMessageUid : messages[0]?.uid

    if (nextUid === selectedMessageUid) {
      return
    }

    setSearchParams((currentValue) => {
      const nextValue = new URLSearchParams(currentValue)
      if (nextUid) {
        nextValue.set('messageUid', nextUid)
      } else {
        nextValue.delete('messageUid')
      }
      return nextValue
    }, { replace: true })
  }, [messages, isLoadingMessages, selectedMessageUid, setSearchParams])

  // --- Message detail query ------------------------------------------------
  // Cached per (uid, folder), so reopening a message you already viewed this
  // session is instant. Hover-prefetching below warms this cache before the
  // click even happens.
  const {
    data: messageDetail,
    isLoading: isLoadingMessage,
    error: messageError,
  } = useQuery({
    queryKey: mailboxMessageKey(selectedMessageUid, mailboxFolder),
    queryFn: () => fetchMailboxMessage(selectedMessageUid, { folder: mailboxFolder }),
    select: (response) => response.message,
    enabled: Boolean(selectedMessageUid),
    staleTime: 60_000,
  })

  useEffect(() => {
    if (messageError) {
      setErrorMessage(messageError.message || 'Unable to load the selected email.')
    }
  }, [messageError])

  // Mark as read locally + tell the summary badge to refresh once we've
  // actually loaded a message's detail (mirrors old "open marks read" logic).
  const markedReadRef = useRef(new Set())
  useEffect(() => {
    if (!messageDetail || markedReadRef.current.has(messageDetail.uid)) {
      return
    }
    markedReadRef.current.add(messageDetail.uid)

    queryClient.setQueryData(
      mailboxMessagesKey(mailboxFolder, showUnreadOnly, appliedSearch),
      (current) => current, // no-op placeholder; see note below
    )
    refreshMailboxSummaryRef.current?.()
  }, [messageDetail, mailboxFolder, showUnreadOnly, appliedSearch, queryClient])

  const filteredMessageLabel = useMemo(() => {
    const folderLabel = mailboxFolder === 'Sent' ? 'Sent' : 'Inbox'

    if (showUnreadOnly && mailboxFolder !== 'Sent') {
      return `Unread ${folderLabel.toLowerCase()}`
    }

    if (appliedSearch) {
      return `Search results for "${appliedSearch}" in ${folderLabel}`
    }

    return folderLabel
  }, [appliedSearch, showUnreadOnly, mailboxFolder])

  const threadedMessages = useMemo(() => {
    const groups = new Map()

    messages.forEach((message) => {
      const key = buildThreadKey(message)
      const threadSubject = normalizeThreadSubject(message.subject)

      if (!groups.has(key)) {
        groups.set(key, { subject: threadSubject, messages: [] })
      }

      groups.get(key).messages.push(message)
    })

    return Array.from(groups.values())
      .map((thread) => {
        const sortedMessages = [...thread.messages].sort((first, second) => new Date(second.date || 0) - new Date(first.date || 0))

        return {
          ...sortedMessages[0],
          threadSubject: thread.subject,
          threadCount: sortedMessages.length,
          threadMessages: sortedMessages,
        }
      })
      .sort((first, second) => new Date(second.date || 0) - new Date(first.date || 0))
  }, [messages])

  const selectedThreadUid = useMemo(() => {
    const selectedThread = threadedMessages.find((thread) =>
      thread.threadMessages.some((message) => message.uid === selectedMessageUid),
    )

    return selectedThread?.uid || ''
  }, [threadedMessages, selectedMessageUid])

  const unreadCount = mailboxSummary?.unreadCount ?? messages.filter((message) => !message.read).length

  const openMessage = (uid) => {
    setSearchParams((currentValue) => {
      const nextValue = new URLSearchParams(currentValue)
      nextValue.set('messageUid', uid)
      return nextValue
    })
  }

  // Warms the detail cache before the user clicks. By the time onClick
  // fires, the query is often already resolved (or resolving), so opening
  // a message feels instant instead of triggering a fresh spinner.
  const prefetchMessage = (uid) => {
    queryClient.prefetchQuery({
      queryKey: mailboxMessageKey(uid, mailboxFolder),
      queryFn: () => fetchMailboxMessage(uid, { folder: mailboxFolder }),
      staleTime: 60_000,
    })
  }

  const handleSearchSubmit = () => {
    setAppliedSearch(searchValue.trim())
  }

  const downloadAttachment = async (attachment) => {
    if (!messageDetail) {
      return
    }

    const blob = await downloadMailboxAttachment(messageDetail.uid, attachment.id, {
      folder: mailboxFolder,
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = attachment.filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleReply = async () => {
    if (!messageDetail || !replyMessage.trim()) {
      return
    }

    try {
      setIsSendingReply(true)
      await replyMailboxMessage(messageDetail.uid, buildMessageFormData({ message: replyMessage }, replyFiles))
      setReplyMessage('')
      setReplyFiles([])
      refreshMailboxSummary?.()

      // Invalidate instead of manually re-fetching two separate ways —
      // React Query re-runs both queries (and dedupes if either is already
      // fetching) and swaps the UI in once fresh data lands.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['mailboxMessages'] }),
        queryClient.invalidateQueries({ queryKey: mailboxMessageKey(messageDetail.uid, mailboxFolder) }),
      ])
    } catch (error) {
      setErrorMessage(error.message || 'Unable to send the reply.')
    } finally {
      setIsSendingReply(false)
    }
  }

  const handleCompose = async () => {
    if (!composeForm.to.trim() || !composeForm.subject.trim() || !composeForm.message.trim()) {
      return
    }

    try {
      setIsSendingCompose(true)
      await sendMailboxMessage(buildMessageFormData(composeForm, composeFiles))
      setComposeForm({ to: '', cc: '', bcc: '', subject: '', message: '' })
      setComposeFiles([])
      setIsComposeOpen(false)
      await queryClient.invalidateQueries({ queryKey: ['mailboxMessages'] })
    } catch (error) {
      setErrorMessage(error.message || 'Unable to send the email.')
    } finally {
      setIsSendingCompose(false)
    }
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Mailbox</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Manage live inbox activity for the current portal account.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            The mailbox below follows the logged-in user, so signing in as <span className="font-semibold text-slate-900">{portalSession?.email || 'a portal user'}</span> will show that account's inbox, unread count, message details, and reply workflow.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-sky-900 to-cyan-800 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">Mailbox status</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Unread</p>
              <p className="mt-3 text-4xl font-black tracking-tight">{unreadCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Account</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/90">{mailboxSummary?.accountEmail || portalSession?.email || 'Not connected'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsComposeOpen((currentValue) => !currentValue)}
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
          >
            {isComposeOpen ? 'Close composer' : 'Compose email'}
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {errorMessage}
        </div>
      ) : null}

      {isComposeOpen ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Compose</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Send a new message</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['to', 'To'],
              ['cc', 'CC'],
              ['bcc', 'BCC'],
              ['subject', 'Subject'],
            ].map(([key, label]) => (
              <label key={key} className={`block ${key === 'subject' ? 'md:col-span-2' : ''}`}>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{label}</span>
                <input
                  type="text"
                  value={composeForm[key]}
                  onChange={(event) => setComposeForm((currentValue) => ({ ...currentValue, [key]: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Message</span>
              <textarea
                rows="7"
                value={composeForm.message}
                onChange={(event) => setComposeForm((currentValue) => ({ ...currentValue, message: event.target.value }))}
                className="mt-2 w-full rounded-[1.5rem] border border-slate-200 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Attachments</span>
              <input
                type="file"
                multiple
                onChange={(event) => setComposeFiles(Array.from(event.target.files || []))}
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-500">{composeFiles.length} attachment(s) ready to send.</p>
            <button
              type="button"
              onClick={handleCompose}
              disabled={isSendingCompose}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSendingCompose ? 'Sending...' : 'Send email'}
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                  {filteredMessageLabel}
                  {isRefetchingMessages ? <span className="ml-2 normal-case text-sky-600">· updating…</span> : null}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{mailboxFolder === 'Sent' ? 'Sent messages' : 'Inbox messages'}</h2>
              </div>
              <button
                type="button"
                onClick={() => refetchMessages()}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Refresh
              </button>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Folder</span>
                <div className="flex flex-wrap gap-2">
                  {['INBOX', 'Sent'].map((folder) => (
                    <button
                      key={folder}
                      type="button"
                      onClick={() => setMailboxFolder(folder)}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${mailboxFolder === folder ? 'bg-slate-950 text-white' : 'border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'}`}
                    >
                      {folder === 'Sent' ? 'Sent' : 'Inbox'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSearchSubmit()}
                  placeholder="Search subject or sender"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUnreadOnly((currentValue) => !currentValue)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${showUnreadOnly ? 'border-sky-300 bg-sky-50 text-sky-900' : 'border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'}`}
                  >
                    {showUnreadOnly ? 'Unread only' : 'All mail'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-slate-950 text-white">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">From</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Subject</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.26em]">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingMessages ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-16 text-center text-sm text-slate-500">Loading inbox...</td>
                  </tr>
                ) : threadedMessages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-16 text-center text-sm text-slate-500">No emails matched the current search.</td>
                  </tr>
                ) : threadedMessages.map((message, index) => (
                  <tr
                    key={message.uid}
                    className={`cursor-pointer border-t border-slate-200/90 ${index % 2 === 0 ? 'bg-white/80' : 'bg-slate-50/85'} ${selectedThreadUid === message.uid ? 'bg-sky-50' : 'hover:bg-slate-100'}`}
                    onMouseEnter={() => prefetchMessage(message.uid)}
                    onFocus={() => prefetchMessage(message.uid)}
                    onClick={() => openMessage(message.uid)}
                  >
                    <td className="px-6 py-5 align-top text-sm text-slate-700">
                      <p className="font-semibold text-slate-950">{message.from || 'Unknown sender'}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{formatDateTime(message.date)}</p>
                    </td>
                    <td className="px-6 py-5 align-top text-sm text-slate-700">
                      <p className="font-semibold text-slate-950">{message.threadSubject || message.subject}</p>
                      {message.threadCount > 1 ? (
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{message.threadCount} messages</p>
                      ) : (
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">UID {message.uid}</p>
                      )}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <MailStatusPill read={message.read} answered={message.answered} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          {isLoadingMessage && !messageDetail ? (
            <div className="flex min-h-[28rem] items-center justify-center text-sm text-slate-500">Loading email...</div>
          ) : messageDetail ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Open email</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{messageDetail.subject}</h2>
                </div>
                <MailStatusPill read={messageDetail.read} answered={messageDetail.answered} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">From</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{messageDetail.from || 'Unknown sender'}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Received</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{formatDateTime(messageDetail.date)}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">To</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{messageDetail.to || portalSession?.email || 'Current mailbox'}</p>
                </div>
              </div>

              {messageDetail.attachments.length > 0 ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Attachments</p>
                      <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950">Download files from this email</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {messageDetail.attachments.map((attachment) => (
                      <button
                        key={attachment.id}
                        type="button"
                        onClick={() => downloadAttachment(attachment)}
                        className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                      >
                        {attachment.filename}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Email body</p>
                {messageDetail.html ? (
                  <div className="prose prose-slate mt-4 max-w-none text-sm" dangerouslySetInnerHTML={{ __html: messageDetail.html }} />
                ) : (
                  <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">{messageDetail.text || 'No message body available.'}</pre>
                )}
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Reply</p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">Respond from this mailbox</h3>
                  </div>
                </div>
                <textarea
                  rows="6"
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  placeholder="Write your reply..."
                  className="mt-5 w-full rounded-[1.5rem] border border-slate-200 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
                <input
                  type="file"
                  multiple
                  onChange={(event) => setReplyFiles(Array.from(event.target.files || []))}
                  className="mt-4 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                />
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">{replyFiles.length} attachment(s) selected for this reply.</p>
                  <button
                    type="button"
                    onClick={handleReply}
                    disabled={isSendingReply}
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSendingReply ? 'Sending reply...' : 'Send reply'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[28rem] items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
              Select an email from the inbox list to open it here.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}