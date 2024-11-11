'use client'

import React, { createContext, useState, ReactNode, FC, useContext, useEffect } from "react";

interface User {
    id: string
    name: string
    password: string
    email: string
    phone: string
}

// Definir o tipo do contexto de autenticação
interface AuthContextType {
    user: User|null
    setUser: React.Dispatch<React.SetStateAction<User|null>>;
}

// Criar o contexto com um valor inicial indefinido
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir o tipo das props do provider
interface AuthProviderProps {
    children: ReactNode;
}

// Criar o AuthProvider
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User|null>(null);
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user === null) {
            return
        } else {
            setUser(JSON.parse(user))
        }
    }, [])



    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};

export default AuthProvider;
