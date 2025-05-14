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
import { useRouter } from "next/navigation";
import { InternDashboardAbsences } from "./components/absences";
import LoadingSpinner from "@/components/ui/loading";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["internDashboard", user?.id],
    queryFn: async () => {
      const response = await Api.dashboardIntern();
      return response;
    },
  });

  if (!data || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title="O seu dashboard" />

      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="overview" className="w-full space-y-5">
          <TabsList className="grid w-fit grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendences">Presenças</TabsTrigger>
            <TabsTrigger value="weeklySummaries">Registos</TabsTrigger>
            <TabsTrigger value="absences">Faltas</TabsTrigger>
            <TabsTrigger
              value="evaluations"
              onClick={() =>
                router.push(`internInfo/details/${data.id}/grades`)
              }
            >
              Avaliações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <InternDashboardOverview
              attendences={data.attendences}
              weeklySummaries={data.weeklySummaries}
              remainingHours={data.remainingHours}
              absences={data.absences}
            />
          </TabsContent>
          <TabsContent value="attendences">
            <InternDashboardAttendences attendences={data.attendences} />
          </TabsContent>
          <TabsContent value="absences">
            <InternDashboardAbsences absences={data.absences} />
          </TabsContent>
          <TabsContent value="weeklySummaries">
            <InternDashboardWeeklySummaries
              weeklySummaries={data.weeklySummaries}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
