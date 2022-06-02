import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const sample = <T>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

const prisma = new PrismaClient()

async function seed() {
  const email = 'dev@coffeepot.com'

  await prisma.user.delete({ where: { email } }).catch(() => {
    // ignore if user doesn't exist
  })

  const hashedPassword = await bcrypt.hash('coffeepotdev', 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  const birdRock = await prisma.coffee.create({
    data: {
      name: 'Bird Rock Blend',
      roaster: 'Bird Rock',
      userId: user.id,
    },
  })

  const monkeyBite = await prisma.coffee.create({
    data: {
      name: 'Monkey Bite Espresso',
      roaster: 'Bird Rock',
      userId: user.id,
    },
  })

  const methods = [
    'Chemex',
    'Aeropress',
    'French Press',
    'Expresso',
    'Moka pot',
  ]

  const tastings = [
    {
      rating: 4,
      notes: 'was good',
      method: sample(methods),
      coffeeId: monkeyBite.id,
      userId: user.id,
    },
    {
      rating: 3,
      notes: 'not as good this time',
      method: sample(methods),
      coffeeId: monkeyBite.id,
      userId: user.id,
    },
    {
      rating: 2,
      method: sample(methods),
      coffeeId: birdRock.id,
      userId: user.id,
    },
  ]

  // createMany is not supported by SQLite :(
  await Promise.all(
    tastings.map((tasting) => prisma.tasting.create({ data: tasting })),
  )
}

try {
  seed()
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  prisma.$disconnect()
}
