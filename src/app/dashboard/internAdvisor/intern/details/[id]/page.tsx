'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { InternAdvisorDashboardAttendences } from "./components/attendences/page";
import { InternAdvisorDashboardEvaluation } from "./components/evaluation/page";
import { InternAdvisorDashboardWeeklySummaries } from "./components/weeklySummaries/page";
import Link from "next/link";
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
                <h1 className="font-bold text-2xl">Informações de ...</h1>
                <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="px-4 py-3 flex flex-col gap-4">
                <Tabs defaultValue="attendences" className="w-full space-y-5">
                    <div className="flex justify-between items-center">
                        <TabsList className="grid w-fit grid-cols-3">
                            <TabsTrigger value="attendences">Overview</TabsTrigger>
                            <TabsTrigger value="weeklySummaries">Presenças</TabsTrigger>
                            <TabsTrigger value="evaluations">Registos</TabsTrigger>
                        </TabsList>
                        <p className="text-sm">
                            <Link href={'/dashboard/internAdvisor/'} className="text-gray-600">Home</Link> &gt; Informações do estagiário
                        </p>
                    </div>
                    <TabsContent value="attendences">
                        <InternAdvisorDashboardAttendences />
                    </TabsContent>
                    <TabsContent value="weeklySummaries">
                        <InternAdvisorDashboardWeeklySummaries />
                    </TabsContent>
                    <TabsContent value="evaluations">
                        <InternAdvisorDashboardEvaluation />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}