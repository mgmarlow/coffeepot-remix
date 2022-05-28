import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { Link } from 'react-router-dom'
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
    <div className="flex min-h-full flex-col justify-center">
      <h1>Log in to <Link to="/">Coffeepot</Link></h1>

      <Form method="post">
        <div>
          <label className="block" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="border border-gray-300 text-gray-900 rounded"
            required
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby="email-error"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>

        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="border rounded border-gray-300 text-gray-900"
            required
            name="password"
            type="password"
            autoComplete="current-password"
            aria-describedby="password-error"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>

        <button className="border py-1 px-3 rounded" type="submit">Log in</button>
      </Form>
    </div>
  )
}

export default Login
