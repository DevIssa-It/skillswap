import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('demo1234', 12);

  const users = [
    {
      email: 'demo@skillswap.id',
      name: 'Demo User',
      campus: 'Universitas Indonesia',
      skills: JSON.stringify(['UI Design', 'Figma', 'Wireframing']),
      password,
    },
    {
      email: 'barter@skillswap.id',
      name: 'Barter User',
      campus: 'Institut Teknologi Bandung',
      skills: JSON.stringify(['React', 'Next.js', 'TypeScript']),
      password,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`✅ Upserted: ${user.email}`);
  }

  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
