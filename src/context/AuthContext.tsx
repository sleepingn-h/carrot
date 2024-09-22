'use client';

import type { AuthLogin, AuthLogout, AuthProps } from '@/model/user';
import { createContext, ReactNode, useContext } from 'react';
import useAuth from '@/hooks/useAuth';
import { loginEmailAndPassword, loginGoogle, logout } from '@/lib/firebase/firebase-auth';

const AuthContext = createContext<AuthProps & AuthLogin & AuthLogout>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Cannot find AuthContext');
  return context;
}

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const user = useAuth();

  return (
    <AuthContext.Provider
      value={{
        ...user,
        loginEmail: loginEmailAndPassword,
        loginGoogle: loginGoogle,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
