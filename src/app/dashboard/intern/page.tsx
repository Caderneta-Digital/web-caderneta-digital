"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternDashboardOverview } from "./components/overview";
import { InternDashboardAttendences } from "./components/attendences";
import { InternDashboardWeeklySummaries } from "./components/weeklySummaries";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  // const { data } = useQuery({
  //   queryKey: ["internDashboard", user?.id],
  //   queryFn: async () => {
  //     const response = await Api.dashboardIntern();
  //     return response;
  //   },
  // });

  useEffect(() => {
    const a = async () => {
      const v = await Api.dashboardIntern();
      console.log(v);
    };

    a();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="flex justify-between items-center px-5 py-3 border-b-[1px] border-b-gray-300">
        <h1 className="font-bold text-2xl">O seu dashboard {user?.name}</h1>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="overview" className="w-full space-y-5">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendences">Presenças</TabsTrigger>
            <TabsTrigger value="weeklySummaries">Registos</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <InternDashboardOverview />
          </TabsContent>
          <TabsContent value="attendences">
            <InternDashboardAttendences />
          </TabsContent>
          <TabsContent value="weeklySummaries">
            <InternDashboardWeeklySummaries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

