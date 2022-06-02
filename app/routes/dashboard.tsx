import { json, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import TastingRepo from '~/tasting.repo'
import { requireUserAuth } from '~/user.server'

interface LoaderData {
  tastings: Awaited<ReturnType<typeof TastingRepo.get>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserAuth(request)
  const tastings = await TastingRepo.get(userId, { skip: 0, take: 3 })

  return json<LoaderData>({
    tastings,
  })
}

const Tastings = () => {
  const loaderData = useLoaderData()

  return (
    <div>
      <h1>Recent Tastings</h1>

      {loaderData.tastings.map((tasting) => (
        <div>
          <h3>{tasting.coffee.name}</h3>
          <p>Rated: {tasting.rating}/5.</p>
          <p>Brewed with {tasting.method}.</p>
        </div>
      ))}

      {/* <Link to="/tastings/new">
        <button>Add a tasting</button>
      </Link> */}
    </div>
  )
}

export default Tastings
