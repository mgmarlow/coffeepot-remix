import { Coffee } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { getCoffee } from '~/coffee.server'
import Header from '~/components/Header'
import { requireUserAuth } from '~/user.server'

interface LoaderData {
  coffee: Coffee
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserAuth(request)
  invariant(params.coffeeId, 'coffeeId not found')

  const coffee = await getCoffee({ userId, id: params.coffeeId })
  if (!coffee) {
    throw new Response('Not Found', { status: 404 })
  }
  return json<LoaderData>({ coffee })
}

const CoffeeDetail = () => {
  const loaderData: LoaderData = useLoaderData()

  return (
    <main>
      <h1>{loaderData.coffee.name}</h1>
      <p>by {loaderData.coffee.roaster}</p>
    </main>
  )
}

export default CoffeeDetail
