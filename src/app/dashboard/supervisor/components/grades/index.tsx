"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { SupervisorDashboardGradesCriteria } from "./components/assessmentCriteria";
import { useEffect, useState } from "react";

export const SupervisorDashboardGrades = () => {
  const [shouldShowComponent, setShouldShowComponent] = useState(false);
  console.log(shouldShowComponent);
  useEffect(()=>{
   console.log("aaaa");
  }, []);
  return (
    <div>
      {shouldShowComponent ? (
        <SupervisorDashboardGradesCriteria />
      ) : (
        <Card>
          <div className="flex justify-between p-3">
            <h1 className="text-xl">Estagiários</h1>
            <Button variant="outline" onClick={() => setShouldShowComponent(true)}>Critérios de Avaliação</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Entidade de Acolhimento</TableHead>
                <TableHead>Nota do 11º Ano</TableHead>
                <TableHead>Nota do 12º Ano</TableHead>
                <TableHead>Nota da Avaliação Final</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João</TableCell>
                <TableCell>HitEcossystem</TableCell>
                <TableCell>17</TableCell>
                <TableCell>?</TableCell>
                <TableCell>?</TableCell>
                <TableCell>
                  <Button variant="outline">Processo de Avaliação</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        )}
    </div>
  )
}