import { createCookieSessionStorage, redirect, Session } from '@remix-run/node'
import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set in env')

const USER_SESSION_KEY = 'userId'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

const getSession = (request: Request): Promise<Session> => {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export const getUserId = async (request: Request) => {
  const session = await getSession(request)
  return session.get(USER_SESSION_KEY)
}

export const createUserSession = async (request: Request, userId: string) => {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }),
    },
  })
}
