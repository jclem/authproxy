import type {NextPage} from 'next'
import {useState} from 'react'
import {Layout} from '../components/Layout'
import {useRedirectUrl} from '../hooks/useRedirectUrl'

interface Props {
  redirectUrl: string | null
}

const redirectURL = 'https://www.authproxy.dev/redirect'

const Home: NextPage<Props> = () => {
  const [url, setUrl, clearUrl] = useRedirectUrl()

  const [wasCopied, setWasCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(redirectURL)
    setWasCopied(true)
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2>Redirect URL for Your OAuth App</h2>

          <div className="flex">
            <code className="w-full p-2 border border-zinc-300 rounded-l-md">
              {redirectURL}
            </code>{' '}
            <button
              type="button"
              title="Click to copy"
              onClick={copy}
              className="w-16 p-2 border-t border-r border-b border-l-0 rounded-r-md rounded-l-none"
            >
              {wasCopied ? '✅' : '📋'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h2>Current Authproxy Redirect URL</h2>{' '}
            <div className="flex">
              <code
                className="w-full p-2 border border-zinc-300 rounded-l-md"
                suppressHydrationWarning
              >
                {url ? <a href={url}>{url}</a> : '<none>'}
              </code>{' '}
              <button
                type="button"
                title="Click to clear redirect URL"
                onClick={clearUrl}
                disabled={!url}
                className="w-16 p-2 border-t border-r border-b border-l-0 rounded-r-md rounded-l-none"
              >
                <span className={url ? 'opacity-100' : 'opacity-25'}>❌</span>
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault()
            setUrl(new FormData(e.currentTarget).get('url')?.toString() ?? null)
            e.currentTarget.reset()
          }}
          className="flex flex-col items-start gap-2"
        >
          <h2>Set Authproxy Redirect URL</h2>

          <label htmlFor="url" className="flex flex-col gap-2">
            <span className="block text-sm font-semibold">URL</span>

            <input
              id="url"
              type="url"
              name="url"
              placeholder="https://www.example.com"
              required
            />

            <p>
              When you come back to Authproxy, this is the URL you&apos;ll be
              redirected to, along with whatever query parameters were added by
              the provider.
            </p>
          </label>

          <button type="submit">Set redirect URL</button>
        </form>
      </div>
    </Layout>
  )
}

export default Home
