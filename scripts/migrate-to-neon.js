/*
  Usage:
    Ensure .env contains DATABASE_URL or set env in session, then:
      npm run migrate:neon
  This script will run prisma generate/migrate and then seed users from src/data/users.json
*/
// Load .env variables if present
try {
  require('dotenv').config();
} catch (e) {
  // dotenv might not be installed; we'll still proceed if env vars are set another way
}

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required in env. Put it into a local .env file or export it in your shell.');
    process.exit(1);
  }

  console.log('Running prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('Running prisma migrate deploy...');
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } catch (e) {
    console.log('No migrations to deploy or migration failed, continuing...');
  }

  // Ensure DB schema exists. Use binary engine on Windows to avoid Node-API engine issues.
  if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
    process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
  }
  try {
    console.log('Ensuring database schema exists with prisma db push...');
    execSync('npx prisma db push', { stdio: 'inherit' });
  } catch (e) {
    console.error('prisma db push failed:', e.message);
    // continue to attempt seeding; upserts will fail if schema missing
  }

  // Seed users
  const usersPath = path.join(process.cwd(), 'src/data/users.json');
  if (!fs.existsSync(usersPath)) {
    console.log('No users.json to import, done.');
    return;
  }

  const raw = fs.readFileSync(usersPath, 'utf8');
  const users = JSON.parse(raw);

  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  for (const u of users) {
    try {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {
          name: u.name,
          password: u.password,
          phone: u.phone || null,
          address: u.address || null,
          role: u.role || 'customer'
        },
        create: {
          name: u.name,
          email: u.email,
          password: u.password,
          phone: u.phone || null,
          address: u.address || null,
          role: u.role || 'customer'
        }
      });
      console.log('Imported', u.email);
    } catch (err) {
      console.error('Failed to import', u.email, err.message);
    }
  }

  await prisma.$disconnect();
  console.log('Seeding done');
}

main().catch(err => { console.error(err); process.exit(1); });
