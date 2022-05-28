import { Coffee, User } from '@prisma/client'
import { prisma } from './db.server'

export const getCoffees = (userId: User['id']) => {
  return prisma.coffee.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  })
}

export const getCoffee = ({
  id,
  userId,
}: {
  id: Coffee['id']
  userId: User['id']
}) => {
  return prisma.coffee.findFirst({
    where: { userId, id },
  })
}
