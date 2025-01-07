import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const test_user = await prisma.user.upsert({
    where: { username: 'Bookify-user' },
    update: {},
    create: {
      username: 'Bookify-user',
      password: await argon.hash(process.env.TEST_USER_PASSWORD),
    },
  });
  console.log({ ...test_user, password: '***' });
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
