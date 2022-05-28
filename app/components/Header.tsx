import { Form, Link } from '@remix-run/react'

interface Props {
  loggedIn: boolean
}

const Header = ({ loggedIn = false }: Props) => {
  return (
    <header>
      <nav>
        {loggedIn ? (
          <Form action="/logout" method="post">
            <button type="submit">Logout</button>
          </Form>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
