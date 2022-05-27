import bcrypt from 'bcryptjs'
import { User, Password } from '@prisma/client'
import { prisma } from '~/db.server'

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
