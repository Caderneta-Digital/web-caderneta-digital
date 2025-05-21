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
import { useParams, useRouter } from "next/navigation";
import { InternType } from "@/types/internTypes";
import { GradesCriteria } from "@/components/ui/gradesCriteria";
import { Api } from "@/services/api";
import { useQuery } from "react-query";
import LoadingSpinner from "@/components/ui/loading";

type PropsType = {
  interns: InternType[];
};

export const SupervisorDashboardGrades: React.FC<PropsType> = ({ interns }) => {
  const { id: internId } = useParams() as { id: string };

  const router = useRouter();

  const [shouldShowComponent, setShouldShowComponent] = useState(false);

  const goInternDetails = (internId: string) => {
    router.push(`/dashboard/internInfo/details/${internId}/grades`);
  };

  // 11º
  const { data: internFinalGrade11, isLoading: isLoadingFinalGrade11 } = useQuery(
    {
      queryKey: ["internFinalGrade11", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "11");
        return response;
      },
    }
  );
  
  // 12º
  const { data: internFinalGrade12, isLoading: isLoadingFinalGrade12 } = useQuery(
    {
      queryKey: ["internFinalGrade12", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "12");
        return response;
      },
    }
  );

  if (isLoadingFinalGrade11 || isLoadingFinalGrade12) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const finalGrade = (internFinalGrade11?.finalGrade ?? 0) * 0.25 + (internFinalGrade12?.finalGrade ?? 0) * 0.75;

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
                  <TableCell>{internFinalGrade11 ? internFinalGrade11.finalGrade : "N/A"}</TableCell>
                  <TableCell>{internFinalGrade12 ? internFinalGrade12.finalGrade : "N/A"}</TableCell>
                  <TableCell>{finalGrade ?? "N/A"}</TableCell>
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
