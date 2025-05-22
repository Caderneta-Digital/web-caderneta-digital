import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InternType } from "@/types/internTypes";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

type PropsType = {
  interns: InternType[];
};

export const InternAdvisorDashboardOverview: React.FC<PropsType> = ({interns,}) => {

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

  const needToConfirmAbsencesCount = interns.reduce(
    (counter, intern) => {
      return (
        counter +
        (intern.absences?.filter(
          (absence) => !absence.isConfirmedByHostEntity,
        ).length || 0)
      );
    },
    0,
  );

  const cardsData = [
    { title: "Estagiários Inseridos", value: interns.length },
    { title: "Presenças a Confirmar", value: needToConfirmAttendencesCount },
    { title: "Registos a Confirmar", value: needToConfirmWeeklySummariesCount },
    { title: "Faltas a Confirmar", value: needToConfirmAbsencesCount },
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
