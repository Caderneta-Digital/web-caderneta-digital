'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SupervisorDashboardOverview } from "./components/overview";
import React from "react";
//import { useRouter } from 'next/navigation';

export default function Dashboard() {
    /*const Router = useRouter();
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          const type = localStorage.getItem("lastFlow")
          Router.push(`/login?flow=${type}`);
        }
      });
    */

    return (
        <div className="h-screen w-screen">
            <div className="flex justify-between items-center px-5 py-3 border-b-[1px] border-b-gray-300">
                <h1 className="font-bold text-2xl">O seu dashboard</h1>
                <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="px-4 py-3 flex flex-col gap-4">
                <SupervisorDashboardOverview />  
            </div>
        </div>
    );
}