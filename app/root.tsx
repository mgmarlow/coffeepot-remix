import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import Header from './components/Header'
import { getUser } from './session.server'
// Use tailwind soonTM
/* import styles from './styles/app.css' */

export const links = () => {
  return [
    /* {
     *   rel: 'stylesheet',
     *   href: styles,
     * }, */
    {
      rel: 'stylesheet',
      href: 'https://cdn.simplecss.org/simple.min.css',
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Coffeepot',
  viewport: 'width=device-width,initial-scale=1',
})

interface LoaderData {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)

  return json<LoaderData>({
    user,
  })
}

export default function App() {
  const loaderData = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Header loggedIn={!!loaderData?.user?.id} />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  )
}
