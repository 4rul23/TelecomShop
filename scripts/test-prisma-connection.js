// Direct Prisma connectivity test to Neon
// Usage: ensures .env has DATABASE_URL; run with Powershell:
// $env:PRISMA_CLIENT_ENGINE_TYPE='binary'; node scripts/test-prisma-connection.js

require('dotenv').config();
process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE || 'binary';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing Prisma -> DATABASE_URL:', !!process.env.DATABASE_URL);
    const ar2 = await prisma.user.findUnique({ where: { email: 'ar2@gmail.com' } });
    if (ar2) {
      const { password, ...safe } = ar2;
      console.log('Found ar2@gmail.com:', safe);
    } else {
      console.log('ar2@gmail.com not found');
    }

    const count = await prisma.user.count();
    console.log('User count in DB:', count);
  } catch (e) {
    console.error('Prisma connectivity error:', e);
    process.exitCode = 2;
  } finally {
    await prisma.$disconnect();
  }
}

main();
