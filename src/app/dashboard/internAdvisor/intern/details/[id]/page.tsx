"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { InternAdvisorDashboardAttendences } from "./components/attendences";
import { InternAdvisorDashboardEvaluation } from "./components/evaluation";
import { InternAdvisorDashboardWeeklySummaries } from "./components/weeklySummaries";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { Api } from "@/services/api";
import { Navbar } from "@/components/ui/navbar";

export default function Dashboard() {
  const params = useParams();
  const internId = params.id as string;

  const { data: intern, isLoading } = useQuery({
    queryKey: ["findInternById", internId],
    queryFn: async () => {
      const response = await Api.findInternById(internId);
      return response;
    },
  });

  if (!intern || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title={`Informaçõs do ${intern.name}`} />

      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="attendences" className="w-full space-y-5">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="attendences">Presenças</TabsTrigger>
              <TabsTrigger value="weeklySummaries">
                Registos Semanais
              </TabsTrigger>
              <TabsTrigger value="evaluations">?</TabsTrigger>
            </TabsList>
            <p className="text-sm">
              <Link
                href={"/dashboard/internAdvisor/"}
                className="text-gray-600"
              >
                Home
              </Link>{" "}
              &gt; Informações do estagiário
            </p>
          </div>
          <TabsContent value="attendences">
            <InternAdvisorDashboardAttendences
              attendences={intern.attendences || []}
            />
          </TabsContent>
          <TabsContent value="weeklySummaries">
            <InternAdvisorDashboardWeeklySummaries
              weeklySummaries={intern.weeklySummaries || []}
            />
          </TabsContent>
          <TabsContent value="evaluations">
            <InternAdvisorDashboardEvaluation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
