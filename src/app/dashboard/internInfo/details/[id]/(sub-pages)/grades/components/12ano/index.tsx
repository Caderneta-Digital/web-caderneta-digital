import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InternAdvisorGrades12anoAuto } from "./components/internAdvisorGrades12anoAuto";
import { InternAdvisorGrades12anoInfo } from "./components/internAdvisorGrades12anoInfo";
import { InternAdvisorGrades12anoFinal } from "./components/internAdvisorGrades12anoFinal";
import { useAuth } from "@/context/AuthContext";
import { UserTypeEnum } from "@/types/userTypes";

export const InternAdvisorDashboardGrades12Ano = () => {
  const { user } = useAuth()

  const isIntern = user?.type === UserTypeEnum.INTERN
  //const isSupervisor = user?.type === UserTypeEnum.SUPERVISOR
  const isInternAdvisor = user?.type === UserTypeEnum.INTERN_ADVISOR

  return (
    <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Autoavaliação do Aluno</CardTitle>
              <InternAdvisorGrades12anoInfo />
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
    
                  <TableRow>
                    <TableCell className="font-medium">
                      Compreensão / Aplicação (20%)
                    </TableCell>
                    <TableCell>Relatório de FCT</TableCell>
                    <TableCell>Pertinência</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Rigor</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Estruturção</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Reflexão</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex flex-row justify-between">
                <div className="mt-4 text-sm text-neutral-950">
                  Avaliação Final: N/A &nbsp;&nbsp;&nbsp; Data: N/A
                </div>
                {isIntern && (
                  <InternAdvisorGrades12anoAuto />
                )}
              </div>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Avaliação Final do Tutor</CardTitle>
              <InternAdvisorGrades12anoInfo />
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
    
                  <TableRow>
                    <TableCell className="font-medium">
                      Compreensão / Aplicação (20%)
                    </TableCell>
                    <TableCell>Relatório de FCT</TableCell>
                    <TableCell>Pertinência</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Rigor</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Estruturção</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Reflexão</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-neutral-950">
                  Avaliação Final: N/A &nbsp;&nbsp;&nbsp; Data: N/A
                </span>
                {
                  isInternAdvisor && (
                    <InternAdvisorGrades12anoFinal />
                  )
                }
              </div>
            </CardContent>
          </Card>
        </div>
  );
};