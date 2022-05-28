import { User } from '@prisma/client'
import { Link, useMatches } from '@remix-run/react'

const isUser = (data: any): data is User => {
  return data && typeof data === 'object' && typeof data.email === 'string'
}

const useOptionalUser = (): User | undefined => {
  const matches = useMatches()
  const route = matches.find((match) => match.id === 'root')

  const maybeUser = route?.data?.user
  if (!isUser(maybeUser)) {
    return
  }

  return maybeUser
}

export default function Index() {
  const user = useOptionalUser()

  return (
    <div>
      <h1>Coffeepot</h1>
      <p>Log, rate, and discover your favorite coffees.</p>

      {user && (
        <p>
          Check out your <Link to="/coffees">coffees</Link>
        </p>
      )}
    </div>
  )
}
