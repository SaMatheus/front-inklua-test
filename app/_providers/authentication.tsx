'use client'

import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "app/_hooks/useLocalStorage";
import { UserData } from "app/_types";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface Values {
  userData: UserData | null | undefined;
  userToken: string | null | undefined;
  setUserData: (value: unknown) => void;
  removeUserData: () => void;
  setUserToken: (value: unknown) => void;
  removeUserToken: () => void;
  loading: boolean;
}

const defaultValues: Values = {
  userData: null,
  userToken: null,
  setUserData: () => console.log('data'),
  setUserToken: () => console.log('token'),
  removeUserData: () => console.log('token'),
  removeUserToken: () => console.log('token'),
  loading: true
};

export const AuthContext = createContext(defaultValues);

export function AuthProvider({ children }: AuthProviderProps) {
  const [
    userData,
    setUserData,
    loadingUserData,
    removeUserData
  ] = useLocalStorage("@user_data");
  const [
    userToken,
    setUserToken,
    loadingUserToken,
    removeUserToken
  ] = useLocalStorage("@user_token");
  const loading = loadingUserData || loadingUserToken;

  const values = useMemo(() => ({
    userData,
    userToken,
    setUserData,
    setUserToken,
    loading,
    removeUserData,
    removeUserToken
  }), [
    userData,
    userToken,
    setUserData,
    setUserToken,
    loading,
    removeUserData,
    removeUserToken
  ]);

  return (
    <AuthContext.Provider value={values as Values}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}