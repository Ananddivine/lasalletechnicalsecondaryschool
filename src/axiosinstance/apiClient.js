import axios from 'axios'
import { getPortalSession, clearPortalSession } from '../data/adminPortalData'

function resolveApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '')
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