import { json, LoaderFunction, redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { getUserId } from '~/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) {
    throw redirect('/dashboard')
  }
  return json({})
}

export default function Index() {
  return (
    <div>
      <h1>Coffeepot</h1>
      <p>Log, rate, and discover your favorite coffees.</p>

      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  )
}
