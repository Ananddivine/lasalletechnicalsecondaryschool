import axios from 'axios'
import { getPortalSession, clearPortalSession } from '../data/adminPortalData'

function normalizeApiBaseUrl(rawBaseUrl) {
  const trimmedBaseUrl = rawBaseUrl?.trim()

  if (!trimmedBaseUrl) {
    return null
  }

  const baseUrlWithScheme = /^https?:\/\//i.test(trimmedBaseUrl)
    ? trimmedBaseUrl
    : `https://${trimmedBaseUrl}`

  const normalizedUrl = new URL(baseUrlWithScheme)
  const normalizedPath = normalizedUrl.pathname.replace(/\/$/, '')

  normalizedUrl.pathname = normalizedPath.endsWith('/api')
    ? normalizedPath || '/api'
    : `${normalizedPath || ''}/api`

  return normalizedUrl.toString().replace(/\/$/, '')
}

function resolveApiBaseUrl() {
  const configuredBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL)

  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5050/api'
    }

    if (hostname.endsWith('lasalletechnicalsecondaryschool.com')) {
      return 'https://api.lasalletechnicalsecondaryschool.com/api'
    }
  }

  return 'https://api.lasalletechnicalsecondaryschool.com/api'
}

const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
})

apiClient.interceptors.request.use((config) => {
  const session = getPortalSession()

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearPortalSession()
    }

    return Promise.reject(error)
  },
)

export default apiClient