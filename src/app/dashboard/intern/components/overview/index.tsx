import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react";
import { format, parseISO } from "date-fns"; 

export const InternDashboardOverview = ({ data }: { data: any }) => {
  const cardsData = [
    { title: "Nota de FCT", value: "N/A" },
    { title: "Horas Restantes", value: data?.totalHours || 0 },
    { title: "Faltas", value: data?.absences?.length || 0 },
    { title: "Registos semanais", value: data?.weeklySummaries?.length || 0 },
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
              <h1 className="font-bold text-3xl">{card.value}</h1>
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
                <TableHead>Tutor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.attendences?.map((attendance: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(attendance.date)}</TableCell>
                  <TableCell>{attendance.morningHours || 0}</TableCell>
                  <TableCell>{attendance.afternoonHours || 0}</TableCell>
                  <TableCell>
                    <Checkbox checked={attendance.tutorApproved} disabled />
                  </TableCell>
                  <TableCell>{attendance.status || "Por Aprovar"}</TableCell>
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
                <TableHead>Tutor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.weeklySummaries?.map((summary: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${formatDate(summary.weekStart)} a ${formatDate(summary.weekEnd)}`}</TableCell>
                  <TableCell>
                    <Checkbox checked={summary.tutorApproved} disabled />
                  </TableCell>
                  <TableCell>{summary.status || "Por Aprovar"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
