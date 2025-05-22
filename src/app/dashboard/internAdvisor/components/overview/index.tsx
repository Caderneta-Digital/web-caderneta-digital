import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Api } from "@/services/api";
import { InternType } from "@/types/internTypes";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";

type PropsType = {
  interns: InternType[];
};

export const InternAdvisorDashboardOverview: React.FC<PropsType> = ({interns,}) => {
  const { id: internId } = useParams() as { id: string };

  const router = useRouter();

  const needToConfirmAttendencesCount = interns.reduce((counter, intern) => {
    return (
      counter +
      (intern.attendences?.filter(
        (attendance) => !attendance.isConfirmedByInternAdvisor,
      ).length || 0)
    );
  }, 0);

  const needToConfirmWeeklySummariesCount = interns.reduce(
    (counter, intern) => {
      return (
        counter +
        (intern.weeklySummaries?.filter(
          (weeklySummary) => !weeklySummary.isConfirmedByInternAdvisor,
        ).length || 0)
      );
    },
    0,
  );

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
  

  const cardsData = [
    { title: "Estagiários Inseridos", value: interns.length },
    { title: "Presenças a Confirmar", value: needToConfirmAttendencesCount },
    { title: "Registos a Confirmar", value: needToConfirmWeeklySummariesCount },
    { title: "Horas Restantes (média)", value: "?" },
  ];

  const goInternDetails = (internId: string) => {
    router.push(`/dashboard/internInfo/details/${internId}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {cardsData.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between">
                <h1 className="font-bold">{card.title}</h1>
                <User />
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-4xl">{card.value}</h1>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        <Card>
          <div className="flex justify-between p-3">
            <h1 className="text-xl">Estagiários</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Presenças</TableHead>
                <TableHead>Registos Semanais</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Horas Restantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>{intern.attendences?.length}</TableCell>
                  <TableCell>{intern.weeklySummaries?.length}</TableCell>
                  <TableCell>{finalGrade ?? "N/A"}</TableCell>
                  <TableCell>{intern.remainingHours}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => goInternDetails(intern.id)}
                    >
                      Mais Informações
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
