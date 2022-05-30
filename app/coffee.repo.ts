import { Coffee, User } from '@prisma/client'
import { prisma } from './db.server'

class CoffeeRepo {
  static get(userId: User['id']) {
    return prisma.coffee.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    })
  }

  static getById({ id, userId }: { id: Coffee['id']; userId: User['id'] }) {
    return prisma.coffee.findFirst({
      where: { userId, id },
    })
  }

  static create({
    name,
    roaster,
    userId,
    notes,
  }: {
    name: Coffee['name']
    roaster: Coffee['roaster']
    userId: User['id']
    notes: Coffee['notes']
  }) {
    return prisma.coffee.create({
      data: {
        name,
        roaster,
        userId,
        notes,
      },
    })
  }

  static destroy({ id, userId }: { id: Coffee['id']; userId: User['id'] }) {
    return prisma.coffee.deleteMany({ where: { userId, id } })
  }
}

export default CoffeeRepo
