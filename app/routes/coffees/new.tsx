import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import CoffeeRepo from '~/coffee.repo'
import FormControl from '~/components/FormControl'
import Input from '~/components/Input'
import { requireUserAuth } from '~/user.server'

interface ActionData {
  errors?: {
    name?: string
    roaster?: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserAuth(request)
  const formData = await request.formData()
  const name = formData.get('name')
  const roaster = formData.get('roaster')
  const notes = formData.get('notes')

  if (typeof name !== 'string' || name.length === 0) {
    return json<ActionData>(
      { errors: { name: 'name is required' } },
      { status: 400 },
    )
  }

  if (typeof roaster !== 'string' || roaster.length === 0) {
    return json<ActionData>(
      { errors: { roaster: 'roaster is required' } },
      { status: 400 },
    )
  }

  if (typeof notes !== 'string') {
    return json(
      { errors: { notes: 'notes must be a string' } },
      { status: 400 },
    )
  }

  const coffee = await CoffeeRepo.create({ name, roaster, notes, userId })

  return redirect(`/coffees/${coffee.id}`)
}

const NewCoffee = () => {
  const actionData = useActionData()

  return (
    <div>
      <h1>Add a new coffee</h1>
      <Form method="post">
        <Input
          errors={actionData?.errors}
          name="name"
          required={true}
          label="Name"
        />
        <Input
          errors={actionData?.errors}
          name="roaster"
          required={true}
          label="Roaster"
        />
        <FormControl label="Notes" errors={actionData?.errors} name="notes">
          <textarea id="notes" name="notes" aria-describedby="notes-error" />
        </FormControl>
        <button type="submit">Add</button>
      </Form>
    </div>
  )
}

export default NewCoffee
