"use client"

import { AuthProvider } from "./authentication";
import { ReactQueryProvider } from "./reactQuery";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  )
}