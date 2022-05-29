import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { Link } from 'react-router-dom'
import Input from '~/components/Input'
import { createUserSession, getUserId } from '~/session.server'
import { verifyUser } from '~/user.server'
import { validateEmail } from '~/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  if (!password || typeof password !== 'string') {
    return json(
      { errors: { password: 'password is required' } },
      { status: 400 },
    )
  }

  if (!email) {
    return json({ errors: { password: 'email is required' } }, { status: 400 })
  }

  if (!validateEmail(email)) {
    return json(
      {
        errors: { email: 'email is invalid' },
      },
      { status: 400 },
    )
  }

  const user = await verifyUser(email, password)

  if (!user) {
    return json(
      {
        errors: { email: 'invalid email or password' },
      },
      { status: 400 },
    )
  }

  return createUserSession(request, user.id)
}

const Login = () => {
  const actionData = useActionData()

  return (
    <div>
      <h1>
        Log in to <Link to="/">Coffeepot</Link>
      </h1>

      <Form method="post">
        <Input
          name="email"
          type="email"
          label="Email address"
          errors={actionData?.errors}
          required={true}
          autoComplete="email"
        />
        <Input
          name="password"
          label="Password"
          errors={actionData?.errors}
          type="password"
          autoComplete="current-password"
          required={true}
        />
        <button type="submit">Log in</button>
      </Form>
    </div>
  )
}

export default Login
