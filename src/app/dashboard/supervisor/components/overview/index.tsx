import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HostEntityType } from "@/types/hostEntititesType";
import { InternType } from "@/types/internTypes";
import { User } from "lucide-react";

type PropsType = {
  interns: InternType[];
  hostEntities: HostEntityType[];
};

export const SupervisorDashboardOverview: React.FC<PropsType> = ({
  interns,
  hostEntities,
}) => {
  const cardsData = [
    { title: "Nota de FCT (média)", value: "?" },
    { title: "Nº de Estagiários", value: interns.length },
    { title: "Nº de Entidades", value: hostEntities.length },
    {
      title: "Nº de Estagiários sem Entidade",
      value: interns.filter((intern) => !intern.hostEntity).length,
    },
  ];

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
            <h1 className="text-xl">Estagiários</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Classificação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.email}</TableCell>
                  <TableCell>{intern.course.name}</TableCell>
                  <TableCell>?</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <Card>
          <div className="p-3">
            <h1 className="text-xl">Entidades de acolhimento</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Nome do Responsável</TableHead>
                <TableHead>Estiários inseridos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostEntities.map((hostEntity) => (
                <TableRow key={hostEntity.id}>
                  <TableCell>{hostEntity.name}</TableCell>
                  <TableCell>{hostEntity.responsibleName}</TableCell>
                  <TableCell>
                    {hostEntity.interns
                      .map((intern) => intern.name)
                      .join(", ") || "-"}
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
