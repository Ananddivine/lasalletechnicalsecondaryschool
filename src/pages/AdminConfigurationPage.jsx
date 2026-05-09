import { useEffect, useMemo, useState } from 'react'
import {
  createPortalUser,
  deletePortalUser,
  fetchPortalUsers,
  updatePortalUser,
} from '../lib/api'
import { getPortalSession, portalPageOptions, portalAccessByRole } from '../data/adminPortalData'

const roleOptions = ['admin', 'developer', 'manager', 'viewer', 'stemofficer']

const emptyForm = {
  id: null,
  name: '',
  email: '',
  password: '',
  role: 'viewer',
  portalAccess: [...portalAccessByRole.viewer],
  profilePhoto: null,
}

function buildUserFormData(formState) {
  const formData = new FormData()
  formData.append('name', formState.name.trim())
  formData.append('email', formState.email.trim())
  formData.append('role', formState.role)
  formData.append('portalAccess', JSON.stringify(formState.portalAccess))

  if (formState.password.trim()) {
    formData.append('password', formState.password)
  }

  if (formState.profilePhoto) {
    formData.append('profilePhoto', formState.profilePhoto)
  }

  return formData
}

function formatDateTime(value) {
  if (!value) {
    return 'Never'
  }

  return new Date(value).toLocaleString()
}

export default function AdminConfigurationPage() {
  const session = getPortalSession()
  const [users, setUsers] = useState([])
  const [formState, setFormState] = useState(emptyForm)
  const [searchValue, setSearchValue] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetchPortalUsers()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setUsers(response.users || [])
        setIsLoading(false)
      })
      .catch((error) => {
        if (!isMounted) {
          return
        }

        setErrorMessage(error.message || 'Unable to load users.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return users.filter((user) => {
      if (!query) {
        return true
      }

      return [user.name, user.email, user.role, user.refId]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    })
  }, [searchValue, users])

  const isEditing = Boolean(formState.id)

  const resetForm = () => {
    setFormState(emptyForm)
  }

  const startEdit = (user) => {
    setFormState({
      id: user.id,
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'viewer',
      portalAccess: Array.isArray(user.portalAccess)
        ? user.portalAccess
        : [...(portalAccessByRole[user.role] || portalAccessByRole.viewer)],
      profilePhoto: null,
    })
    setErrorMessage('')
    setStatusMessage('')
  }

  const handleRoleChange = (nextRole) => {
    setFormState((currentValue) => ({
      ...currentValue,
      role: nextRole,
      portalAccess: [...(portalAccessByRole[nextRole] || portalAccessByRole.viewer)],
    }))
  }

  const handlePermissionToggle = (permission) => {
    setFormState((currentValue) => {
      const hasPermission = currentValue.portalAccess.includes(permission)
      const nextPermissions = hasPermission
        ? currentValue.portalAccess.filter((value) => value !== permission)
        : [...currentValue.portalAccess, permission]

      return {
        ...currentValue,
        portalAccess: nextPermissions,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')
    setIsSubmitting(true)

    try {
      const payload = buildUserFormData(formState)
      const response = isEditing
        ? await updatePortalUser(formState.id, payload)
        : await createPortalUser(payload)

      if (isEditing) {
        setUsers((currentValue) =>
          currentValue.map((user) => (user.id === response.user.id ? response.user : user)),
        )
      } else {
        setUsers((currentValue) => [response.user, ...currentValue])
      }

      setStatusMessage(response.message || 'User saved successfully.')
      resetForm()
    } catch (error) {
      setErrorMessage(error.message || 'Unable to save user.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name || user.email}?`)) {
      return
    }

    setErrorMessage('')
    setStatusMessage('')

    try {
      const response = await deletePortalUser(user.id)
      setUsers((currentValue) => currentValue.filter((currentUser) => currentUser.id !== user.id))
      setStatusMessage(response.message || 'User deleted successfully.')

      if (formState.id === user.id) {
        resetForm()
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to delete user.')
    }
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-700">Configuration</p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              Manage portal users, roles, and page access.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Create new portal accounts, upload profile photos, choose a role, and decide which
              pages each user can open. Hidden pages stay out of the sidebar for that user.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Signed in as</p>
            <p className="mt-2 text-lg font-black text-slate-950">{session?.name || 'Portal admin'}</p>
            <p className="text-sm text-slate-600">{session?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                {isEditing ? 'Edit user' : 'Create user'}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                {isEditing ? 'Update portal account' : 'Add portal account'}
              </h2>
            </div>
            {isEditing ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Cancel edit
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full name</span>
              <input
                type="text"
                value={formState.name}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, name: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="Portal user name"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={formState.email}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, email: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder="name@lasalle.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                {isEditing ? 'New password' : 'Password'}
              </span>
              <input
                type="password"
                value={formState.password}
                onChange={(event) => setFormState((currentValue) => ({ ...currentValue, password: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                placeholder={isEditing ? 'Leave blank to keep current password' : 'Create a password'}
                required={!isEditing}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Role</span>
              <select
                value={formState.role}
                onChange={(event) => handleRoleChange(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-700">Profile photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFormState((currentValue) => ({ ...currentValue, profilePhoto: event.target.files?.[0] || null }))}
              className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </label>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Page access</p>
                <p className="mt-1 text-sm text-slate-500">Only selected pages will appear in the sidebar.</p>
              </div>
              <button
                type="button"
                onClick={() => handleRoleChange(formState.role)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Reset to role default
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {portalPageOptions.map((page) => {
                const isChecked = formState.portalAccess.includes(page.key)

                return (
                  <label
                    key={page.key}
                    className={`rounded-[1.5rem] border px-5 py-4 transition ${
                      isChecked ? 'border-sky-300 bg-sky-50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePermissionToggle(page.key)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{page.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{page.description}</p>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {statusMessage ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {statusMessage}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update user' : 'Create user'}
          </button>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Portal users</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                Current accounts and access
              </h2>
            </div>
            <label className="block w-full max-w-sm">
              <span className="sr-only">Search users</span>
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search name, email, role, or reference"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-600">
                Loading portal users...
              </div>
            ) : null}

            {!isLoading && filteredUsers.length === 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-600">
                No portal users matched the current search.
              </div>
            ) : null}

            {filteredUsers.map((user) => (
              <article
                key={user.id}
                className="rounded-[1.6rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={user.profilePhoto || session?.avatar}
                      alt={user.name || user.email}
                      className="h-14 w-14 rounded-2xl object-cover object-center"
                    />
                    <div>
                      <p className="text-lg font-black text-slate-950">{user.name || 'Unnamed user'}</p>
                      <p className="mt-1 text-sm text-slate-600">{user.email}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                          {user.role}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                          {user.isActive ? 'active' : 'inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(user)}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user)}
                      className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Reference</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{user.refId || 'Not assigned'}</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Last active</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{formatDateTime(user.lastActive)}</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Accessible pages</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{user.portalAccess?.length || 0}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(user.portalAccess || []).map((permission) => (
                    <span
                      key={`${user.id}-${permission}`}
                      className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}