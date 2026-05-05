import { useEffect, useMemo, useState } from 'react'
import { getAdmissionResults, saveAdmissionResults } from '../data/adminPortalData'

export default function useAdmissionResults() {
  const [allResults, setAllResults] = useState(() => getAdmissionResults())

  useEffect(() => {
    const handleUpdate = () => {
      setAllResults(getAdmissionResults())
    }

    window.addEventListener('storage', handleUpdate)
    window.addEventListener('admission-results-updated', handleUpdate)

    return () => {
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener('admission-results-updated', handleUpdate)
    }
  }, [])

  const persist = (nextResults) => {
    setAllResults(nextResults)
    saveAdmissionResults(nextResults)
  }

  const results = useMemo(
    () => allResults.filter((result) => !result.isDeleted),
    [allResults],
  )

  const trashResults = useMemo(
    () => allResults.filter((result) => result.isDeleted),
    [allResults],
  )

  const updateResult = (resultId, updater) => {
    const nextResults = allResults.map((result) => {
      if (result.id !== resultId) {
        return result
      }

      return typeof updater === 'function' ? updater(result) : { ...result, ...updater }
    })

    persist(nextResults)
  }

  const deleteResult = (resultId, reason = 'Deleted from the admissions portal', deletedBy = 'Admissions Office') => {
    const trimmedReason = reason.trim()

    const nextResults = allResults.map((result) => {
      if (result.id !== resultId) {
        return result
      }

      return {
        ...result,
        isDeleted: true,
        deletedAt: new Date().toISOString(),
        deletedReason: trimmedReason || 'Deleted from the admissions portal',
        deletedBy,
      }
    })

    persist(nextResults)
  }

  const restoreResult = (resultId) => {
    const nextResults = allResults.map((result) => {
      if (result.id !== resultId) {
        return result
      }

      return {
        ...result,
        isDeleted: false,
        deletedAt: null,
        deletedReason: '',
        deletedBy: '',
      }
    })

    persist(nextResults)
  }

  return {
    results,
    allResults,
    trashResults,
    updateResult,
    deleteResult,
    restoreResult,
  }
}