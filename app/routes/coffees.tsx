import { json, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getCoffees } from '~/coffee.server'
import { requireUserAuth } from '~/user.server'

interface LoaderData {
  coffees: Awaited<ReturnType<typeof getCoffees>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserAuth(request)
  const coffees = await getCoffees(userId)

  return json<LoaderData>({ coffees })
}

const Coffees = () => {
  const loaderData: LoaderData = useLoaderData()

  return (
    <div>
      <main>
        <h1>Your Coffees</h1>

        <ul>
          {loaderData.coffees.map((coffee) => {
            return (
              <li key={coffee.id}>
                <Link to={coffee.id}>{coffee.name}</Link> by {coffee.roaster}
              </li>
            )
          })}
        </ul>

        <Link to="new">Add coffee</Link>

        <Outlet />
      </main>
    </div>
  )
}

export default Coffees
