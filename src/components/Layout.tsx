import Link from 'next/link'
import {FC, PropsWithChildren} from 'react'

export const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-8 mx-auto max-w-2xl">
      <main className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          <Link href="/">Authproxy</Link>
        </h1>
        <p>
          Authproxy allows you to develop against OAuth providers that do not
          accept wildcard callback URLs. This is useful, for example, when
          wanting to use OAuth providers like GitHub or Twitter with Vercel
          preview deployments.
        </p>

        {children}
      </main>

      <footer>
        <p className="text-sm">
          Authproxy was built by{' '}
          <a
            href="https://www.jclem.me"
            title="Link to Jonathan Clem's personal home page"
          >
            Jonathan Clem
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
