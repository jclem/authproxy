import type {NextPage} from 'next'
import {Layout} from '../components/Layout'
import {useRedirectUrl} from '../hooks/useRedirectUrl'

interface Props {
  redirectUrl: string | null
}

const Home: NextPage<Props> = () => {
  const [url, setUrl, clearUrl] = useRedirectUrl()

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Current URL:</span>{' '}
            <code suppressHydrationWarning>
              {url ? <a href={url}>{url}</a> : '<none>'}
            </code>
          </p>

          <form
            onSubmit={e => {
              e.preventDefault()
              clearUrl()
            }}
          >
            <button type="submit" disabled={!url}>
              Clear redirect URL
            </button>
          </form>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault()
            setUrl(new FormData(e.currentTarget).get('url')?.toString() ?? null)
            e.currentTarget.reset()
          }}
          className="flex flex-col items-start gap-2"
        >
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
