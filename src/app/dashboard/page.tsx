'use client'

import { useAuth } from "@/context/AuthContext";


export default function Dashboard() {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>
            <h1>Olá, {user?.name}</h1>
        </div>
    );
}