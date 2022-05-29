import { ActionFunction, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { createCoffee } from '~/coffee.server'
import FormInput from '~/components/FormInput'
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

  const coffee = await createCoffee({ name, roaster, notes, userId })

  return redirect(`/coffees/${coffee.id}`)
}

const NewCoffee = () => {
  const actionData = useActionData()

  return (
    <main>
      <Link to="/coffees">← coffees</Link>
      <h1>Add a new coffee</h1>
      <Form method="post">
        <FormInput errors={actionData?.errors} name="name" required={true}>
          Name
        </FormInput>
        <FormInput errors={actionData?.errors} name="roaster" required={true}>
          Roaster
        </FormInput>
        <div>
          <label htmlFor="notes">Notes</label>
          <br />
          <textarea id="notes" name="notes" aria-describedby="notes-error" />
          {actionData?.errors?.notes && (
            <div style={{ color: 'red' }} id="notes-error">
              {actionData?.errors.notes}
            </div>
          )}
        </div>
        <button type="submit">Add</button>
      </Form>
    </main>
  )
}

export default NewCoffee
