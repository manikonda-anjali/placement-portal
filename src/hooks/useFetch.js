import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) { setLoading(false); return }
    setLoading(true)
    api.get(url)
      .then(res => { setData(res.data); setError(null) })
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch'))
      .finally(() => setLoading(false))
  }, [url, ...deps])

  return { data, loading, error }
}
