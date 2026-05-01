import { useEffect, useState } from 'react'
import { getAdmissionResults, saveAdmissionResults } from '../data/adminPortalData'

export default function useAdmissionResults() {
  const [results, setResults] = useState(() => getAdmissionResults())

  useEffect(() => {
    const handleUpdate = () => {
      setResults(getAdmissionResults())
    }

    window.addEventListener('storage', handleUpdate)
    window.addEventListener('admission-results-updated', handleUpdate)

    return () => {
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener('admission-results-updated', handleUpdate)
    }
  }, [])

  const persist = (nextResults) => {
    setResults(nextResults)
    saveAdmissionResults(nextResults)
  }

  const updateResult = (resultId, updater) => {
    const nextResults = results.map((result) => {
      if (result.id !== resultId) {
        return result
      }

      return typeof updater === 'function' ? updater(result) : { ...result, ...updater }
    })

    persist(nextResults)
  }

  const deleteResult = (resultId) => {
    persist(results.filter((result) => result.id !== resultId))
  }

  return {
    results,
    updateResult,
    deleteResult,
  }
}