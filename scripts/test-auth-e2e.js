#!/usr/bin/env node
// Simple E2E test for register -> login -> session verification
// Usage: Start your dev server (npm run dev) then run: node scripts/test-auth-e2e.js

const assert = require('assert');

const BASE = process.env.TEST_BASE_URL || 'http://localhost:3000';
const randomId = Math.floor(Math.random() * 1000000);
const testUser = {
  name: 'E2E Tester ' + randomId,
  email: `e2e_${randomId}@example.com`,
  password: 'password123',
  phone: '08123456789'
};

async function run() {
  console.log('E2E test base URL:', BASE);

  // Register
  console.log('Registering user', testUser.email);
  let res = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser)
  });

  const regBody = await res.json().catch(() => null);
  if (!res.ok) {
    console.error('Register failed:', res.status, regBody);
    process.exit(2);
  }
  console.log('Register OK:', regBody.email || regBody);

  // Login
  console.log('Logging in...');
  res = await fetch(`${BASE}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUser.email, password: testUser.password })
  });

  const loginBody = await res.json().catch(() => null);
  if (!res.ok) {
    console.error('Login failed:', res.status, loginBody);
    process.exit(3);
  }
  console.log('Login OK:', loginBody.email || loginBody);

  // Verify server session (GET /api/auth returns current user)
  console.log('Verifying server session (/api/auth)...');
  res = await fetch(`${BASE}/api/auth`, { method: 'GET' });
  const sessionBody = await res.json().catch(() => null);
  if (!res.ok) {
    console.error('/api/auth read failed:', res.status, sessionBody);
    process.exit(4);
  }
  console.log('Current user from server:', sessionBody && sessionBody.email);
  assert(sessionBody && sessionBody.email === testUser.email, 'Session user email mismatch');

  // Verify user exists in GET /api/users
  console.log('Checking /api/users for the created user...');
  res = await fetch(`${BASE}/api/users`, { method: 'GET' });
  const users = await res.json().catch(() => null);
  if (!res.ok) {
    console.error('/api/users failed:', res.status, users);
    process.exit(5);
  }

  const found = Array.isArray(users) && users.find(u => u.email === testUser.email);
  assert(found, 'User not found in /api/users');
  console.log('User found in /api/users:', found.email);

  console.log('\nE2E test passed — register, login, and session verification OK');
}

run().catch(err => {
  console.error('E2E test error:', err && err.message ? err.message : err);
  process.exit(10);
});
