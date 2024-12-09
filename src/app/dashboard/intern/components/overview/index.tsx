import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react";
import { format, parseISO } from "date-fns"; 
import { InternAttendenceType, InternWeeklySummaryType } from "@/types/internTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PropsType = {
  weeklySummaries: InternWeeklySummaryType[] | undefined,
  attendences: InternAttendenceType[] | undefined,
  remainingHours: number
}

export const InternDashboardOverview: React.FC<PropsType> = ({ weeklySummaries, attendences, remainingHours }) => {
  const cardsData = [
    { title: "Nota de FCT", value: "N/A" },
    { title: "Horas Restantes", value: remainingHours },
    { title: "Faltas", value: 0 },
    { title: "Registos Semanais", value: weeklySummaries ?.length, secondValue: weeklySummaries?.filter(item => item.isConfirmedByInternAdvisor).length },
  ];

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Data inválida";
    }
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
              <div className="flex gap-2">
              <h1 className="font-bold text-3xl">{card.value}</h1>
              {card.secondValue && (
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <h1 className="text-gray-500 font-bold text-3xl">({card.secondValue})</h1>   
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Registos Semanais aprovados</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <Card>
          <div className="p-3">
            <h1 className="text-xl">Registos de Presenças</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Manhã</TableHead>
                <TableHead>Tarde</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendences?.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{formatDate(attendance.date)}</TableCell>
                  <TableCell>{attendance.morningHours || 0}</TableCell>
                  <TableCell>{attendance.afternoonHours || 0}</TableCell>
                  <TableCell>{attendance.isConfirmedByInternAdvisor ? "Aprovado" : "Por aprovar"}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
          <div className="p-3">
            <h1 className="text-xl">Registos Semanais</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semana</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklySummaries?.map((summary) => (
                <TableRow key={summary.id}>
                  <TableCell>{`${formatDate(summary.weekStart)} a ${formatDate(summary.weekEnd)}`}</TableCell>
                  <TableCell>{summary.isConfirmedByInternAdvisor ? "Aprovado" : "Por aprovar"}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
