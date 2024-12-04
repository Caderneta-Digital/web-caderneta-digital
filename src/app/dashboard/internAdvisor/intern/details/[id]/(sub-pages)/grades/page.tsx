"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { useParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { SupervisorDashboardGradesCriteria } from "./assessmentCriteria";
import { InternAdvisorDashboardGrades11Ano } from "./components/11ano";
import { InternAdvisorDashboardGrades12Ano } from "./components/12ano";
import { InternAdvisorDashboardGradesFinal } from "./components/final";

export default function Dashboard() {
  const [shouldShowComponent, setShouldShowComponent] = useState(false);

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
    return <h1>A Carregar...</h1>;
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title={`Avaliação do ${intern.name}`} />

      {shouldShowComponent ? (
        <SupervisorDashboardGradesCriteria
          setShouldShowComponent={setShouldShowComponent}
          className="p-4"
        />
      ) : (
        <div className="px-4 py-3 flex flex-col gap-4">
          <Tabs defaultValue="11ano" className="w-full space-y-5">
            <div className="flex justify-between items-center">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="11ano">11º Ano</TabsTrigger>
                <TabsTrigger value="12ano">12º Ano</TabsTrigger>
                <TabsTrigger value="final">Final</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-16">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/dashboard/internAdvisor`}
                        className="cursor-pointer"
                      >
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/dashboard/internAdvisor/intern/details/${internId}`}
                        className="cursor-pointer"
                      >
                        Informações do Estagiário
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Processo de Avaliação</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Button
                  variant="outline"
                  onClick={() => setShouldShowComponent(true)}
                >
                  Critérios de Avaliação
                </Button>
              </div>
            </div>
            <TabsContent value="11ano">
              <InternAdvisorDashboardGrades11Ano />
            </TabsContent>
            <TabsContent value="12ano">
              <InternAdvisorDashboardGrades12Ano />
            </TabsContent>
            <TabsContent value="final">
              <InternAdvisorDashboardGradesFinal />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}