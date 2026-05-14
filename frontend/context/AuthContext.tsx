"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${API_URL}/users/current`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();

        // backend returns { user: { ... } }
        setUser(data?.user ?? data ?? null);
      } catch (error) {
        // network or CORS error
        // keep user null and log for debugging
        // eslint-disable-next-line no-console
        console.error('AuthContext fetchUser error', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);