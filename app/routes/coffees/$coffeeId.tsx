import { Coffee } from '@prisma/client'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import CoffeeRepo from '~/coffee.repo'
import { requireUserAuth } from '~/user.server'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserAuth(request)
  invariant(params.coffeeId, 'coffeeId not found')

  await CoffeeRepo.destroy({ userId, id: params.coffeeId })
  return redirect('/coffees')
}

interface LoaderData {
  coffee: Coffee
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserAuth(request)
  invariant(params.coffeeId, 'coffeeId not found')

  const coffee = await CoffeeRepo.getById({ userId, id: params.coffeeId })
  if (!coffee) {
    throw new Response('Not Found', { status: 404 })
  }
  return json<LoaderData>({ coffee })
}

const CoffeeDetail = () => {
  const loaderData: LoaderData = useLoaderData()

  return (
    <div>
      <h1>{loaderData.coffee.name}</h1>
      <p>by {loaderData.coffee.roaster}</p>
      {loaderData.coffee.notes && <p>{loaderData.coffee.notes}</p>}
      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </div>
  )
}

export default CoffeeDetail
