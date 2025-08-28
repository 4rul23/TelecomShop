// Migration script to push users from src/data/users.json to Vercel KV
// Usage: NODE_ENV=production node scripts/migrate-users-to-kv.js

(async () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const usersPath = path.join(process.cwd(), 'src/data/users.json');

    if (!fs.existsSync(usersPath)) {
      console.error('No users.json found at', usersPath);
      process.exit(1);
    }

    const raw = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(raw);

    const { kv } = await import('@vercel/kv');

    await kv.set('users', users || []);
    console.log('Migrated', (users || []).length, 'users to Vercel KV');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
