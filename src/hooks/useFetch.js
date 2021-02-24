import { useEffect, useState } from "react"

const useFetch = (fetcher, setter) => {
  /* const abortController = new AbortController()
  fetch('url', { signal: abortController.signal })
  return abortController.abort() */
  let abortion = false
  const [pending, setPending] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    fetcher().then(data => {
      if (abortion) throw new Error('Aborted')
      return data
    }).then(data => {
      setter(data)
      setPending(false)
    }).catch(err => {
      if (err.message === 'Aborted') {
        console.info('Aborted')
        return
      }
      setError(err.message)
      setPending(false)
    })
    return () => abortion = true
  }, [])

  return [pending, error]
}

export default useFetch
