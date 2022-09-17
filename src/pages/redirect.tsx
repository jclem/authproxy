import type {NextPage} from 'next'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Layout} from '../components/Layout'
import {useRedirectUrl} from '../hooks/useRedirectUrl'

const Redirect: NextPage = () => {
  const [url] = useRedirectUrl()
  const loc = typeof window === 'undefined' ? null : window.location
  const redirectTo = url ? `${url}${loc?.search}${loc?.hash}` : null
  const [showComponent, setShowComponent] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const [isCounting, setIsCounting] = useState(false)

  const clearIntervalRef = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const tickCountdown = useCallback(() => {
    if (!redirectTo) return

    if (countdownRef.current === 1) {
      window.location.href = redirectTo
    } else {
      setCountdown(countdown => {
        countdownRef.current = countdown - 1
        return countdownRef.current
      })
    }
  }, [redirectTo])

  const start = useCallback(() => {
    clearIntervalRef()
    setIsCounting(true)
    intervalRef.current = window.setInterval(tickCountdown, 1_000)
  }, [tickCountdown])

  const stop = () => {
    clearIntervalRef()
    setIsCounting(false)
  }

  useEffect(() => {
    start()
    return clearIntervalRef
  }, [start])

  useEffect(() => {
    setShowComponent(true)
  }, [])

  const [countdown, setCountdown] = useState(3)
  const countdownRef = useRef(countdown)

  return (
    <Layout>
      {showComponent ? (
        redirectTo ? (
          <>
            <p className="font-semibold">
              You {isCounting ? 'are' : 'were'} being redirected to:
            </p>
            <code>
              <a href={redirectTo}>{redirectTo}</a>
            </code>
            {isCounting && (
              <>
                <div className="h-24 flex justify-center items-center relative top-4">
                  <p
                    className={`${
                      isCounting ? 'spin' : ''
                    } absolute top-0 p-4 h-24 w-24 border border-dashed border-slate-400 rounded-full leading-none text-5xl text-center font-bold`}
                  ></p>
                  <p className="absolute top-[22px] leading-none text-5xl text-center font-bold">
                    {countdown}
                  </p>
                </div>

                <button onClick={stop} className="mt-8">
                  Cancel redirect
                </button>
              </>
            )}
          </>
        ) : (
          <p>You have no redirect URL set.</p>
        )
      ) : null}
    </Layout>
  )
}

export default Redirect
