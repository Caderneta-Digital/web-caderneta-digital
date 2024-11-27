import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SupervisorGrades12anoAuto } from "./components/supervisorGrades12anoAuto";
import { SupervisorGrades12anoInfo } from "./components/supervisorGrades12anoInfo";

export const SupervisorDashboardGrades12Ano = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Autoavaliação do Aluno</CardTitle>
          <SupervisorGrades12anoAuto />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domínios/Ponderações</TableHead>
                <TableHead>Processos de Recolha de Informação</TableHead>
                <TableHead>Critérios de Avaliação</TableHead>
                <TableHead>Classificação (0-200)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Trabalho Prático (80%)
                </TableCell>
                <TableCell>Processo de Trabalho na FCT</TableCell>
                <TableCell>Participação</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Autonomia</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Responsabilidade</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Relacionamento</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 text-sm text-neutral-950">
            Avaliação Final: N/A &nbsp;&nbsp;&nbsp; Data: N/A
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Avaliação Final do Tutor/Professor Orientador</CardTitle>
          <SupervisorGrades12anoInfo/>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domínios/Ponderações</TableHead>
                <TableHead>Processos de Recolha de Informação</TableHead>
                <TableHead>Critérios de Avaliação</TableHead>
                <TableHead>Classificação (0-200)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Trabalho Prático (80%)
                </TableCell>
                <TableCell>Processo de Trabalho na FCT</TableCell>
                <TableCell>Participação</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Autonomia</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Responsabilidade</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Relacionamento</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-neutral-950">
              Avaliação Final: N/A &nbsp;&nbsp;&nbsp; Data: N/A
            </span>
            <Button variant="outline" size="sm">
              Preencher Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};