import bcrypt from 'bcryptjs'
import { User, Password } from '@prisma/client'
import { prisma } from '~/db.server'
import { getUserId } from './session.server'
import { redirect } from '@remix-run/node'

export const verifyUser = async (
  email: User['email'],
  password: Password['hash'],
): Promise<User | undefined> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  })

  if (!user || !user.password) {
    return
  }

  const isValid = await bcrypt.compare(password, user.password.hash)

  if (!isValid) {
    return
  }

  const { password: _password, ...userSansPassword } = user

  return userSansPassword
}

export const getUserByEmail = async (email: User['email']) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async (
  email: User['email'],
  password: Password['hash'],
) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

// TODO: This should probably go somewhere else
export const requireUserAuth = async (request: Request) => {
  const userId = await getUserId(request)
  if (!userId) {
    throw redirect('/login')
  }
  return userId
}
