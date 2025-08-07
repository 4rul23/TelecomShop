'use client';

import { useState, useEffect } from 'react';

export const useFileDatabase = () => {
  // API functions for users
  const registerUser = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (id, updateData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updateData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Update failed');
      }

      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get users');
      }

      return { success: true, users: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed');
      }

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    // User management
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateUser,
    getAllUsers,
    deleteUser,
  };
};
