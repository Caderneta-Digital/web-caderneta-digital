"use client";

import AuthProvider from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
