'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupervisorDashboardOverview } from "./components/overview";
import { SupervisorDashboardInterns } from "./components/interns";
import { SupervisorDashboardEntities } from "./components/entitys";
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
                <Tabs defaultValue="overview" className="w-full space-y-5">
                    <TabsList className="grid w-fit grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="interns">Estagiários</TabsTrigger>
                        <TabsTrigger value="entities">Entidades</TabsTrigger>
                        <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <SupervisorDashboardOverview />
                    </TabsContent>
                    <TabsContent value="interns">
                        <SupervisorDashboardInterns />
                    </TabsContent>
                    <TabsContent value="entities">
                        <SupervisorDashboardEntities />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}