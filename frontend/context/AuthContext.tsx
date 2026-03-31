"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // { id, name, email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setUser(payload); // payload has { id, role, ... }
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      setUser(payload);
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);