import { json, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import CoffeeRepo from '~/coffee.repo'
import { requireUserAuth } from '~/user.server'

interface LoaderData {
  coffees: Awaited<ReturnType<typeof CoffeeRepo.get>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserAuth(request)
  const coffees = await CoffeeRepo.get(userId)

  return json<LoaderData>({ coffees })
}

const Coffees = () => {
  const loaderData: LoaderData = useLoaderData()

  return (
    <div>
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
    </div>
  )
}

export default Coffees
