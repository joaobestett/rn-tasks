import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "./api";
import { storage } from "./storage";
type User = { id: number; email: string } | null;

type Ctx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<Ctx>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

// ...
  useEffect(() => {
    (async () => {
      const refresh = await storage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await api.post("/auth/refresh", { token: refresh });
          await storage.setItem("access_token", data.access);
          setUser({ id: 0, email: "you@user" });
        } catch {}
      }
      setLoading(false);
    })();
  }, []);
// ...
  async function handleAuth(path: "/auth/login" | "/auth/register", email: string, password: string) {
    const { data } = await api.post(path, { email, password });
    await storage.setItem("access_token", data.access);
    if (data.refresh) await storage.setItem("refresh_token", data.refresh);
    setUser({ id: 0, email });
  }

  return (
    <AuthCtx.Provider
      value={{
        user,
        loading,
        login: (e, p) => handleAuth("/auth/login", e, p),
        register: (e, p) => handleAuth("/auth/register", e, p),
         logout: async () => {
    await storage.deleteItem("access_token");
    await storage.deleteItem("refresh_token");
    setUser(null);
  },
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
