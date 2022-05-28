import { ActionFunction, json } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { createUserSession } from '~/session.server'
import { createUser, getUserByEmail } from '~/user.server'
import { validateEmail, validatePassword } from '~/utils'

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
      <h1>Sign up for Coffeepot</h1>

      <Form method="post">
        <div>
          <label className="block" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
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
            className="border border-gray-300 placeholder-gray-500 text-gray-900 rounded"
            required
            name="password"
            type="password"
            autoComplete="none"
            aria-describedby="password-error"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>

        <button className="border px-3 py-1 rounded" type="submit">
          Sign up
        </button>
      </Form>

      <p>
        Already have an account?{' '}
        <Link className="text-blue-700" to="/login">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Signup
