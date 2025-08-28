import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prismaClient';

// Prisma client comes from lib/prismaClient.js (singleton)

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');
const CURRENT_USER_FILE = path.join(process.cwd(), 'src/data/currentUser.json');
const TMP_CURRENT_USER_FILE = path.join(os.tmpdir(), 'telecom_current_user.json');

// In-memory fallback
let memoryCurrentUser = null;

// Note: Vercel KV removed from auth route. We rely on Prisma (Neon) when
// DATABASE_URL is set. Otherwise we fall back to file-based and in-memory storage.

// Helper function to read users from file (synchronous fallback)
function readUsersSync() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

async function readUsers() {
  // No KV: return users from project file (synchronous fallback)
  return readUsersSync();
}

// Helper function to write current user to file
function writeCurrentUser(user) {
  try {
    // Try primary path
    try {
      fs.writeFileSync(CURRENT_USER_FILE, JSON.stringify(user, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.warn('Primary currentUser write failed:', err.message);
    }

    // Try tmp path
    try {
      fs.writeFileSync(TMP_CURRENT_USER_FILE, JSON.stringify(user, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.warn('Tmp currentUser write failed:', err.message);
    }

    // Fallback to in-memory
    memoryCurrentUser = user;
    return true;
  } catch (error) {
    console.error('Error writing current user file:', error);
    return false;
  }
}

// Helper function to read current user from file
function readCurrentUser() {
  try {
    if (fs.existsSync(CURRENT_USER_FILE)) {
      const data = fs.readFileSync(CURRENT_USER_FILE, 'utf8');
      return JSON.parse(data);
    }

    if (fs.existsSync(TMP_CURRENT_USER_FILE)) {
      const data = fs.readFileSync(TMP_CURRENT_USER_FILE, 'utf8');
      return JSON.parse(data);
    }

    return memoryCurrentUser;
  } catch (error) {
    console.error('Error reading current user file:', error);
    return null;
  }
}

// POST - Login
export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email;
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        // create session token and save in DB
        const token = crypto.randomBytes(48).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
        await prisma.session.create({ data: { token, userId: user.id, expiresAt } });

        const { password: _, ...safeUser } = user;

        // Also persist current user to fallback file for non-browser clients/tests
        try {
          await writeCurrentUser(safeUser);
        } catch (e) {
          console.warn('Failed to write currentUser after login:', e?.message ?? e);
        }

        // Set HttpOnly cookie with session token
        const res = NextResponse.json(safeUser);
        const cookieOptions = `session_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
        res.headers.set('Set-Cookie', cookieOptions);
        return res;
      } catch (prismaErr) {
        console.error('Auth prisma error:', prismaErr);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
      }
    }

    const users = await readUsers();

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Remove password from response
    const { password: _, ...safeUser } = user;

    // Save current user to file (KV/file/memory)
    const saved = await writeCurrentUser(safeUser);
    if (saved) {
      return NextResponse.json(safeUser);
    } else {
      return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
    }
  } catch (error) {
  console.error('Auth POST error:', error);
  return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

// GET - Get current logged in user
export async function GET(request) {
  try {
    try {
      const token = request.cookies.get && request.cookies.get('session_token')?.value;
      if (token && prisma) {
        const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });
        if (session && (!session.expiresAt || new Date(session.expiresAt) > new Date())) {
          const { password, ...safeUser } = session.user;
          return NextResponse.json(safeUser);
        }
      }

      const currentUser = await readCurrentUser();
      return NextResponse.json(currentUser);
    } catch (e) {
      console.error('Session GET error:', e);
      const currentUser = await readCurrentUser();
      return NextResponse.json(currentUser);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read current user' }, { status: 500 });
  }
}

// DELETE - Logout
export async function DELETE() {
  try {
    // Remove session token cookie and delete DB session if present
    try {
      const cookieHeader = (globalThis?.headers && globalThis.headers.get && globalThis.headers.get('cookie')) || '';
      const match = cookieHeader && cookieHeader.match(/session_token=([^;]+)/);
      const token = match ? match[1] : null;
      if (token && prisma) {
        await prisma.session.deleteMany({ where: { token } });
      }
    } catch (e) {
      console.warn('Failed to delete session from DB:', e?.message ?? e);
    }

    const res = NextResponse.json({ message: 'Logged out successfully' });
    res.headers.set('Set-Cookie', 'session_token=; HttpOnly; Path=/; Max-Age=0');
    return res;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
