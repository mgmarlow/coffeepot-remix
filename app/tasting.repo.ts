import { User } from '@prisma/client'
import { prisma } from './db.server'

interface Options {
  skip?: number
  take?: number
}

class TastingRepo {
  static get(userId: User['id'], opt: Options = {}) {
    return prisma.tasting.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: { coffee: true },
      ...opt,
    })
  }
}

export default TastingRepo
