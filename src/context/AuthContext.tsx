'use client';

import React, { createContext, useState, ReactNode, FC, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    phone: string;
    cc: string;
    nif: string;
    adress: string;
    postalCode: string;
    dadName: string;
    motherName: string;
    obs: string;
    totalHours: number;
    createdAt: string;
}

// Definir o tipo do contexto de autenticação
interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    closeAuth: () => void;
}

// Criar o contexto com um valor inicial indefinido
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir o tipo das props do provider
interface AuthProviderProps {
    children: ReactNode;
}

// Criar o AuthProvider
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Verifica se estamos no lado do cliente antes de acessar o localStorage
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const closeAuth = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login?flow=intern");
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
