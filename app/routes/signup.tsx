import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import Input from '~/components/Input'
import { createUserSession, getUserId } from '~/session.server'
import { createUser, getUserByEmail } from '~/user.server'
import { validateEmail, validatePassword } from '~/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (!validateEmail(email)) {
    return json({ errors: { email: 'email is invalid' } }, { status: 400 })
  }

  if (!validatePassword(password)) {
    return json(
      {
        errors: {
          password: 'password is invalid (must be greater than 8 characters)',
        },
      },
      { status: 400 },
    )
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json(
      { errors: { email: 'A user already exists with this email' } },
      { status: 400 },
    )
  }

  const user = await createUser(email, password)

  return createUserSession(request, user.id)
}

const Signup = () => {
  const actionData = useActionData()

  return (
    <div>
      <h1>
        Sign up for <Link to="/">Coffeepot</Link>
      </h1>

      <Form method="post">
        <Input
          label="Email address"
          name="email"
          required={true}
          autoComplete="email"
          type="email"
        />
        <Input
          name="password"
          label="Password"
          errors={actionData?.errors}
          type="password"
          autoComplete="current-password"
          required={true}
        />
        <button type="submit">Sign up</button>
      </Form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}

export default Signup
