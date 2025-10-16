import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query";
import { AuthProvider, useAuth } from "../lib/auth";
import { useEffect } from "react";

export default function Root() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
