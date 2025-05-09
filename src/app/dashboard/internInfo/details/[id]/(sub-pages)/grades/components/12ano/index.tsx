/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InternAdvisorGrades12anoAuto } from "./components/internAdvisorGrades12anoAuto";
import { InternAdvisorGrades12anoInfo } from "./components/internAdvisorGrades12anoInfo";
import { InternAdvisorGrades12anoFinal } from "./components/internAdvisorGrades12anoFinal";
import { useAuth } from "@/context/AuthContext";
import { UserTypeEnum } from "@/types/userTypes";
import { useQuery } from "react-query";
import { Api } from "@/services/api";
import { format, parseISO } from "date-fns";
import { useParams } from "next/navigation";

export const InternAdvisorDashboardGrades12Ano = () => {
  const { id:internId } = useParams() as { id: string }

  const { user } = useAuth();
  
  const { data, isLoading } = useQuery({
    queryKey: ["internGrades", user?.id],
    queryFn: async () => {
      const response = await Api.getInternAutoEvaluation(user?.id as string, "12");
      return response;
    },
  });

  const { data: internAdvisorEvaluation, isLoading: isLoadingInternAdvisor } = useQuery({
      queryKey: ["internFinalGrades", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "12");
        return response;
      },
    });
  
  if (isLoading || isLoadingInternAdvisor) {
    return <h1>Carregando...</h1>;
  }
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
                    <TableCell>{data ? data.participacao : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Autonomia</TableCell>
                    <TableCell>{data ? data.autonomia : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Responsabilidade</TableCell>
                    <TableCell>{data ? data.responsabilidade : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Relacionamento</TableCell>
                    <TableCell>{data ? data.relacionamento : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell className="font-medium">
                      Compreensão / Aplicação (20%)
                    </TableCell>
                    <TableCell>Relatório de FCT</TableCell>
                    <TableCell>Pertinência</TableCell>
                    <TableCell>{data ? data.pertinencia : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Rigor</TableCell>
                    <TableCell>{data ? data.rigor : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Estruturação</TableCell>
                    <TableCell>{data ? data.estruturacao : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Reflexão</TableCell>
                    <TableCell>{data ? data.reflexao : "N/A"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex flex-row justify-between">
                <div className="mt-4 text-sm text-neutral-950">
                  Avaliação Final: N/A &nbsp;&nbsp;&nbsp; Data: N/A
                </div>
                {isIntern && (
                  <InternAdvisorGrades12anoAuto isButtonDisabled={data != "" as any} />
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
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.participacao : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Autonomia</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.autonomia : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Responsabilidade</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.responsabilidade : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Relacionamento</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.relacionamento : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell className="font-medium">
                      Compreensão / Aplicação (20%)
                    </TableCell>
                    <TableCell>Relatório de FCT</TableCell>
                    <TableCell>Pertinência</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.pertinencia : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Rigor</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.rigor : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Estruturação</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.estruturacao : "N/A"}</TableCell>
                  </TableRow>
    
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Reflexão</TableCell>
                    <TableCell>{internAdvisorEvaluation ? internAdvisorEvaluation.reflexao : "N/A"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-neutral-950">
                  Avaliação Final: {internAdvisorEvaluation ? internAdvisorEvaluation.finalGrade : "N/A"} &nbsp;&nbsp;&nbsp; Data: {internAdvisorEvaluation ? format(parseISO(internAdvisorEvaluation.createdAt), "dd/MM/yyyy") : "N/A"}
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