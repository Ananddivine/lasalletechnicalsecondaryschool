import apiClient from '../axiosinstance/apiClient'

function getErrorMessage(error) {
  return error.response?.data?.message || error.message || 'Request failed.'
}

export function loginAdmin(credentials) {
  return apiClient.post('/admin/login', credentials).then((response) => {
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Invalid credentials.')
    }

    return response.data
  }).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function verifyPortalSession() {
  return apiClient.get('/verify-token').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchApplications() {
  return apiClient.get('/applications').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchAdmissionFormDefinitions() {
  return apiClient.get('/applications/forms/definitions').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchApplicationsByForm(formSlug) {
  return apiClient.get(`/applications/forms/${formSlug}`).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchApplicationsByFormStats(formSlug) {
  return apiClient.get(`/applications/forms/${formSlug}/stats`).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchDashboardOverview() {
  return apiClient.get('/admin/dashboard').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchManageOverview() {
  return apiClient.get('/admin/manage').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function fetchPortalUsers() {
  return apiClient.get('/users').then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function createPortalUser(formData) {
  return apiClient.post('/create-user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function updatePortalUser(userId, formData) {
  return apiClient.put(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function deletePortalUser(userId) {
  return apiClient.delete(`/users/${userId}`).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function updateApplication(resultId, updates) {
  const requestConfig = updates instanceof FormData
    ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    : undefined

  return apiClient.patch(`/applications/${resultId}`, updates, requestConfig).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function deleteApplication(resultId, payload) {
  return apiClient.delete(`/applications/${resultId}`, { data: payload }).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function restoreApplication(resultId) {
  return apiClient.post(`/applications/${resultId}/restore`).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}

export function submitApplication(formData) {
  return apiClient.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => response.data).catch((error) => {
    throw new Error(getErrorMessage(error))
  })
}