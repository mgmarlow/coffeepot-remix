import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
