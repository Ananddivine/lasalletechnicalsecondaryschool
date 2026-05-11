import { useEffect, useMemo, useState } from 'react'
import { initialAdmissionResults } from '../data/adminPortalData'
import {
  deleteApplication,
  fetchApplications,
  restoreApplication,
  updateApplication,
} from '../lib/api'

export default function useAdmissionResults() {
  const [allResults, setAllResults] = useState(() => initialAdmissionResults)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadResults() {
      try {
        setIsLoading(true)
        const response = await fetchApplications()

        if (!isMounted) {
          return
        }

        setAllResults(Array.isArray(response.results) ? response.results : [])
        setErrorMessage('')
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(error.message || 'Unable to load admission results.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadResults()

    return () => {
      isMounted = false
    }
  }, [])

  const results = useMemo(
    () => allResults.filter((result) => !result.isDeleted),
    [allResults],
  )

  const trashResults = useMemo(
    () => allResults.filter((result) => result.isDeleted),
    [allResults],
  )

  const updateResult = async (resultId, updater) => {
    const currentResult = allResults.find((result) => result.id === resultId)

    if (!currentResult) {
      return
    }

    const nextValue = typeof updater === 'function'
      ? updater(currentResult)
      : updater instanceof FormData
        ? updater
        : { ...currentResult, ...updater }
    const response = await updateApplication(resultId, nextValue)

    setAllResults((currentValue) =>
      currentValue.map((result) => (result.id === resultId ? response.result : result)),
    )
  }

  const deleteResult = async (
    resultId,
    reason = 'Deleted from the admissions portal',
    deletedBy = 'Admissions Office',
  ) => {
    const response = await deleteApplication(resultId, {
      reason: reason.trim(),
      deletedBy,
    })

    setAllResults((currentValue) =>
      currentValue.map((result) => (result.id === resultId ? response.result : result)),
    )
  }

  const restoreResult = async (resultId) => {
    const response = await restoreApplication(resultId)

    setAllResults((currentValue) =>
      currentValue.map((result) => (result.id === resultId ? response.result : result)),
    )
  }

  return {
    results,
    allResults,
    trashResults,
    isLoading,
    errorMessage,
    updateResult,
    deleteResult,
    restoreResult,
  }
}