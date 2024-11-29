"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupervisorDashboardOverview } from "./components/overview";
import { SupervisorDashboardInterns } from "./components/interns";
import { SupervisorDashboardEntities } from "./components/entities";
import React from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { Api } from "@/services/api";
import { Navbar } from "@/components/ui/navbar";
import { SupervisorDashboardGrades } from "./components/grades";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user: supervisor } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["supervisorDashboard", supervisor?.id],
    queryFn: async () => {
      const response = await Api.supervisorDashboard();
      return response;
    },
  });

  if (!data || isLoading) {
    return (
      <div className="h-screen w-screen">
        <Navbar title="O seu dashboard" />

        <div className="px-4 py-3 flex flex-col gap-4">
          <Tabs defaultValue="overview" className="w-full space-y-5">
            <TabsList className="grid w-fit grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interns">Estagiários</TabsTrigger>
              <TabsTrigger value="entities">Entidades</TabsTrigger>
              <TabsTrigger value="grades">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <Skeleton className="w-full h-[140px]" />
                  <Skeleton className="w-full h-[140px]" />
                  <Skeleton className="w-full h-[140px]" />
                  <Skeleton className="w-full h-[140px]" />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Skeleton className="w-full h-[500px]" />
                  <Skeleton className="w-full h-[500px]" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title="O seu dashboard" />

      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="overview" className="w-full space-y-5">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interns">Estagiários</TabsTrigger>
            <TabsTrigger value="entities">Entidades</TabsTrigger>
            <TabsTrigger value="grades">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <SupervisorDashboardOverview
              interns={data.interns}
              hostEntities={data.hostEntities}
            />
          </TabsContent>
          <TabsContent value="interns">
            <SupervisorDashboardInterns interns={data.interns} />
          </TabsContent>
          <TabsContent value="entities">
            <SupervisorDashboardEntities hostEntities={data.hostEntities} />
          </TabsContent>
          <TabsContent value="grades">
            <SupervisorDashboardGrades interns={data.interns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
