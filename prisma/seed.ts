import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  const email = 'dev@coffeepot.com'

  await prisma.user.delete({ where: { email } }).catch(() => {
    // ignore if user doesn't exist
  })

  const hashedPassword = await bcrypt.hash('supersecretpassword', 10)

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

  await prisma.coffee.create({
    data: {
      name: 'Bird Rock Blend',
      roaster: 'Bird Rock',
      userId: user.id,
    },
  })

  await prisma.coffee.create({
    data: {
      name: 'Monkey Bite Espresso',
      roaster: 'Bird Rock',
      userId: user.id,
    },
  })
}

try {
  seed()
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  prisma.$disconnect()
}
