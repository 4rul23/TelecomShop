import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const USERS_FILE = path.join(process.cwd(), 'src/data/users.json');
const TMP_USERS_FILE = path.join(os.tmpdir(), 'telecom_users.json');

// In-memory fallback when filesystem is not writable (serverless environments)
let memoryUsers = null;

// Helper function to read users from file
function readUsers() {
  try {
    // Try primary file first
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }

    // If primary not available, try tmp file (writable on many serverless platforms)
    if (fs.existsSync(TMP_USERS_FILE)) {
      const data = fs.readFileSync(TMP_USERS_FILE, 'utf8');
      return JSON.parse(data);
    }

    // Fallback to in-memory cache if available
    if (memoryUsers !== null) {
      return memoryUsers;
    }

    // If nothing exists yet, initialize empty array
    return [];
  } catch (error) {
    console.error('Error reading users file:', error);
    // If read fails, try to return memory fallback
    return memoryUsers !== null ? memoryUsers : [];
  }
}

// Helper function to write users to file
function writeUsers(users) {
  try {
    // Try writing to project directory (works locally)
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.warn('Primary write failed, attempting tmp file write:', err.message);
    }

    // Try writing to tmp directory (may work on serverless)
    try {
      fs.writeFileSync(TMP_USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.warn('Tmp file write failed, falling back to memory:', err.message);
    }

    // Fallback: keep users in memory for the life of the function instance
    memoryUsers = users;
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    // store in memory as last resort
    try {
      memoryUsers = users;
      return true;
    } catch (e) {
      return false;
    }
  }
}

// GET - Get all users
export async function GET() {
  try {
    const users = readUsers();
    // Remove passwords from response for security
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });
    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read users' }, { status: 500 });
  }
}

// POST - Create new user (register)
export async function POST(request) {
  try {
    const userData = await request.json();
    const users = readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, hash this!
      phone: userData.phone || '',
      address: userData.address || '',
      dateRegistered: new Date().toISOString(),
      role: userData.role || 'customer'
    };

    users.push(newUser);

    if (writeUsers(users)) {
      // Return user without password
      const { password, ...safeUser } = newUser;
      return NextResponse.json(safeUser, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

// PUT - Update user
export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();
    const users = readUsers();

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...updateData };

    if (writeUsers(users)) {
      const { password, ...safeUser } = users[userIndex];
      return NextResponse.json(safeUser);
    } else {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

// DELETE - Delete user
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const users = readUsers();

    const filteredUsers = users.filter(user => user.id !== id);

    if (filteredUsers.length === users.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (writeUsers(filteredUsers)) {
      return NextResponse.json({ message: 'User deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
