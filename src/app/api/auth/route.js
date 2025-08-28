import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');
const CURRENT_USER_FILE = path.join(process.cwd(), 'src/data/currentUser.json');
const TMP_CURRENT_USER_FILE = path.join(os.tmpdir(), 'telecom_current_user.json');

// In-memory fallback
let memoryCurrentUser = null;

// Helper function to read users from file
function readUsers() {
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
    const { email, password } = await request.json();
    const users = readUsers();

    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Remove password from response
    const { password: _, ...safeUser } = user;

    // Save current user to file
    if (writeCurrentUser(safeUser)) {
      return NextResponse.json(safeUser);
    } else {
      return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

// GET - Get current logged in user
export async function GET() {
  try {
    const currentUser = readCurrentUser();
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read current user' }, { status: 500 });
  }
}

// DELETE - Logout
export async function DELETE() {
  try {
    if (writeCurrentUser(null)) {
      return NextResponse.json({ message: 'Logged out successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
