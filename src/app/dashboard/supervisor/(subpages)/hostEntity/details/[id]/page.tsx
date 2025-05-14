"use client";

import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Api } from "@/services/api";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { CreateInternAdvisorModal } from "./components/createInternAdvisorModal";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/loading";
import React from "react";

export default function HostEntityDetails() {
  const { user } = useAuth()
  const params = useParams();
  const hostEntityId = params.id as string;

  const { data: hostEntity, isLoading } = useQuery({
    queryKey: ["hostEntity", hostEntityId],
    queryFn: async () => {
      const response = await Api.findHostEntityById(hostEntityId);
      return response;
    },
  });

  if (!hostEntity || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title={`Dashboard da ${hostEntity.name}`} goBackUrl={`/dashboard/${user?.type}`}/>

      <div className="px-4 py-3 flex flex-col gap-4">
        <Card>
          <div className="flex justify-between p-3">
            <h1 className="text-xl">Tutores</h1>
            <CreateInternAdvisorModal hostEntity={hostEntity} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estagiários</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostEntity.advisors.map((advisor) => (
                <TableRow key={advisor.id}>
                  <TableCell>{advisor.name}</TableCell>
                  <TableCell>{advisor.email}</TableCell>
                  <TableCell>{advisor.interns?.map(intern => intern.name).join(", ") || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
