import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet } from '@remix-run/react'
import { requireUserAuth } from '~/user.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserAuth(request)
  return json({})
}

const Coffees = () => {
  return (
    <div>
      <nav className="routeNav">
        <NavLink to="/coffees" end>
          Your coffees
        </NavLink>
        <NavLink to="/coffees/new">Add coffee</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Coffees
