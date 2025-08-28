// Hash existing plaintext passwords stored in Neon (via Prisma).
// Usage: ensure .env contains DATABASE_URL, then run:
//   node scripts/hash-neon-passwords.js

require('dotenv').config();
const bcrypt = require('bcryptjs');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required in env');
    process.exit(1);
  }

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany();
    console.log('Found', users.length, 'users');

    for (const u of users) {
      const pwd = u.password || '';
      // If password already looks like a bcrypt hash, skip
      if (pwd.startsWith('$2a$') || pwd.startsWith('$2b$') || pwd.startsWith('$2y$') || pwd.startsWith('$2$')) {
        console.log('Skipping already-hashed password for', u.email);
        continue;
      }

      // Hash and update
      const hashed = await bcrypt.hash(pwd, 10);
      await prisma.user.update({ where: { id: u.id }, data: { password: hashed } });
      console.log('Hashed password for', u.email);
    }

    console.log('Done hashing passwords');
  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(err => { console.error(err); process.exit(1); });
