"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { InternAdvisorDashboardAttendences } from "./components/attendences";
import { InternAdvisorDashboardWeeklySummaries } from "./components/weeklySummaries";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { Api } from "@/services/api";
import { Navbar } from "@/components/ui/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Cookies from "js-cookie";
import { InternAdvisorDashboardAbsences } from "./components/absences";
import LoadingSpinner from "@/components/ui/loading";

export default function Dashboard() {
  const params = useParams();
  const router = useRouter();
  const path = usePathname();
  const internId = params.id as string;
  const type = Cookies.get("type");

  const { data: intern, isLoading } = useQuery({
    queryKey: ["findInternById", internId],
    queryFn: async () => {
      const response = await Api.findInternById(internId);
      return response;
    },
  });

  if (!intern || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen">
      <Navbar title={`Informações de ${intern.name}`} />
      <div className="px-4 py-3 flex flex-col gap-4">
        <Tabs defaultValue="attendences" className="w-full space-y-5">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-fit grid-cols-4">
              <TabsTrigger value="attendences">Presenças</TabsTrigger>
              <TabsTrigger value="weeklySummaries">Registos</TabsTrigger>
              <TabsTrigger value="absences">Faltas</TabsTrigger>
              <TabsTrigger
                value="evaluations"
                onClick={() => router.push(`${path}/grades`)}
              >
                Avaliações
              </TabsTrigger>
            </TabsList>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/dashboard/${type}/`}
                    className="cursor-pointer"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Informações do Estagiário</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
          <TabsContent value="absences">
            <InternAdvisorDashboardAbsences absences={intern.absences || []} />
          </TabsContent>
          <TabsContent value="evaluations"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
