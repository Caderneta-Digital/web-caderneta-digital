"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InternDashboardOverview } from "./components/overview";
import { InternDashboardAttendences } from "./components/attendences";
import { InternDashboardWeeklySummaries } from "./components/weeklySummaries";
import React from "react";
import { useQuery } from "react-query";
import { Api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/ui/navbar";

export default function Dashboard() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["internDashboard", user?.id],
    queryFn: async () => {
      const response = await Api.dashboardIntern();
      return response;
    },
  });

  return (
    <div className="h-screen w-screen">
      <Navbar title="O seu dashboard" />

      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="overview" className="w-full space-y-5">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendences">Presenças</TabsTrigger>
            <TabsTrigger value="weeklySummaries">Registos</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <InternDashboardOverview data={data} />
          </TabsContent>
          <TabsContent value="attendences">
            <InternDashboardAttendences data={data} />
          </TabsContent>
          <TabsContent value="weeklySummaries">
            <InternDashboardWeeklySummaries data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
