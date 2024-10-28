'use client';

import type { AuthProps } from '@/model/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { onUserIdTokenChanged } from '@/lib/firebase/firebase-auth';

const useAuth = () => {
  const [userState, setUserState] = useState<AuthProps | null>(null);
  const getUserState = useCallback(async () => {
    const user: AuthProps = await onUserIdTokenChanged();

    if (!user) {
      setUserState(null);
      return;
    }

    if (user.photoURL === null) user.photoURL = '';

    setUserState(user);
  }, []);

  useEffect(() => {
    getUserState();
  }, [getUserState]);

  useEffect(() => {
    const refreshToken = setInterval(async () => {
      if (userState.currentUser) userState.currentUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshToken);
  }, [userState]);

  const user = useMemo(() => userState, [userState]);

  return { ...user, setUserState };
};

export default useAuth;
