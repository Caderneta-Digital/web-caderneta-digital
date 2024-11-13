import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react"


export const SupervisorDashboardOverview = () => {

  const cardsData = [
    { title: "Nota de FCT (média)", value: "N/A" },
    { title: "Nº de Estagiários", value: 34 },
    { title: "Nº de Entidades", value: 2 },
    { title: "Nº de Estagiários sem Entidade", value: 4 }
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
              <TableRow>
                <TableCell>André Ferreira</TableCell>
                <TableCell>andreferreira@aluno.com</TableCell>
                <TableCell>GPSI</TableCell>
                <TableCell>18</TableCell>
              </TableRow>
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
              <TableRow>
                <TableCell>Lidl</TableCell>
                <TableCell>Ricardo Rocha</TableCell>
                <TableCell>André Ferreira, Rita Saramago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}