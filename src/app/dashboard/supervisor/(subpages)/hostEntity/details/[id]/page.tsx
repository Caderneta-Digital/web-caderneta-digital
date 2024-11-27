"use client"

import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Api } from "@/services/api";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { CreateInternAdvisorModal } from "./components/createInternAdvisorModal";

export default function HostEntityDetails() {
  const params = useParams()
  const hostEntityId = params.id as string

  const { data: hostEntity, isLoading } = useQuery({
    queryKey: ["hostEntity", hostEntityId],
    queryFn: async () => {
      const response = await Api.findHostEntityById(hostEntityId)
      return response;
    }
  })

  if (!hostEntity || isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="h-screen w-screen">
      <Navbar title={`Dashboard da ${hostEntity.name}`} />

      <div className="px-4 py-3 flex flex-col gap-4">
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Tutores</h1>
          <CreateInternAdvisorModal />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Estágiarios</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hostEntity.advisors.map((advisor) => (
              <TableRow key={advisor.id}>
                <TableCell>{advisor.name}</TableCell>
                <TableCell>{advisor.email}</TableCell>
                <TableCell>?</TableCell>
                <TableCell>?</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      </div>
    </div>
  )
}