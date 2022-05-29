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

export const createCoffee = ({
  name,
  roaster,
  userId,
  notes,
}: {
  name: Coffee['name']
  roaster: Coffee['roaster']
  userId: User['id']
  notes: Coffee['notes']
}) => {
  return prisma.coffee.create({
    data: {
      name,
      roaster,
      userId,
      notes,
    },
  })
}
