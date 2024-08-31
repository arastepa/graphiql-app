'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import {
  onAuthStateChanged,
  User,
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  auth?: Auth;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TODO: store the values as env variables
const firebaseConfig = {
  apiKey: 'AIzaSyDUFU00e0w3UX4XJ9xModcYEu28zuoBTEg',
  authDomain: 'rss-login-b7b27.firebaseapp.com',
  projectId: 'rss-login-b7b27',
  storageBucket: 'rss-login-b7b27.appspot.com',
  messagingSenderId: '857999080789',
  appId: '1:857999080789:web:d539086d6b9e8c42aa83dc',
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAuth, setFirebaseAuth] = useState<Auth>();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    setFirebaseAuth(auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!firebaseAuth || loading) return '...Loading';

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), signIn, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
