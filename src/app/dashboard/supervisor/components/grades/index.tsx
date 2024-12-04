"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InternType } from "@/types/internTypes";
import { GradesCriteria } from "@/components/ui/gradesCriteria";

type PropsType = {
  interns: InternType[];
};

export const SupervisorDashboardGrades: React.FC<PropsType> = ({ interns }) => {
  const router = useRouter();

  const [shouldShowComponent, setShouldShowComponent] = useState(false);

  const goInternDetails = (internId: string) => {
    router.push(`/dashboard/supervisor/intern/details/${internId}`);
  };

  return (
    <div>
      {shouldShowComponent ? (
        <GradesCriteria
          setShouldShowComponent={setShouldShowComponent}
        />
      ) : (
        <Card>
          <div className="flex justify-between p-3">
            <h1 className="text-xl">Estagiários</h1>
            <Button
              variant="outline"
              onClick={() => setShouldShowComponent(true)}
            >
              Critérios de Avaliação
            </Button>
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
              {interns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.hostEntity?.name}</TableCell>
                  <TableCell>?</TableCell>
                  <TableCell>?</TableCell>
                  <TableCell>?</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => goInternDetails(intern.id)}
                    >
                      Processo de Avaliação
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};
