import { json, LoaderFunction } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { getUserId } from '~/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)

  return json({
    userId,
  })
}

export default function Index() {
  const loaderData: { userId?: string } = useLoaderData()

  return (
    <div>
      <header>
        <nav>
          {loaderData.userId ? (
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </header>

      <h1>Coffeepot</h1>
      <p>Log, rate, and discover your favorite coffees.</p>
    </div>
  )
}
