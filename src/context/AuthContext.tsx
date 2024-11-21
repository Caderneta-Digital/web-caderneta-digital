"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  useEffect,
} from "react";
import { UserType } from "@/types/userTypes";
import Cookies from "js-cookie";
import { Api } from "@/services/api";

// Definir o tipo do contexto de autenticação
interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  closeAuth: () => void;
}

// Criar o contexto com um valor inicial indefinido
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Definir o tipo das props do provider
interface AuthProviderProps {
  children: ReactNode;
}

// Criar o AuthProvider
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user));
    }

    if (token) Api.setBearerToken(token);
  }, []);

  const closeAuth = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // TODO: redirect user to login page
  };

  return (
    <AuthContext.Provider value={{ user, setUser, closeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
