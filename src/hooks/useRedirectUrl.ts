import {useEffect, useState} from 'react'

const key = 'redirectUrl'

export const useRedirectUrl = () => {
  const [redirectUrl, setRedirectUrlState] = useState<string | null>(null)

  useEffect(() => {
    setRedirectUrlState(localStorage.getItem(key))
  }, [])

  const clearRedirectUrl = () => {
    localStorage.removeItem(key)
    setRedirectUrlState(null)
  }

  const setRedirectUrl = (url: string | null) => {
    if (url) {
      localStorage.setItem(key, url)
      setRedirectUrlState(url)
    } else {
      clearRedirectUrl()
    }
  }

  return [redirectUrl, setRedirectUrl, clearRedirectUrl] as const
}
