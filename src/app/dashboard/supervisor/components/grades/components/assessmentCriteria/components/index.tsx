import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export const SupervisorDashboardGradesCriteriaCard = ({ }) => {
  return (
    <div>
      <Card className="my-5">
        <div className="flex justify-between p-3">
          <h1 className="text-xl">
            Rubrica - Processo de Trabalho na FCT (EFP)
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neutral-950">Critérios</TableHead>
              <TableHead className="text-neutral-950">
                Descritores e Níveis de Desempenho
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>5</TableHead>
              <TableHead>4</TableHead>
              <TableHead>3</TableHead>
              <TableHead>2</TableHead>
              <TableHead>1</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Participação */}
            <TableRow>
              <TableCell className="text-neutral-500">Participação</TableCell>
              <TableCell>
                Integra-se na entidade de estágio e assumindo as regras de
                funcionamento da organização; Revela interesse pelo trabalho que
                realiza.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta algumas falhas ao nível: da integração na entidade de
                FCT; do interesse pelo trabalho que realiza.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas sistemáticas ao nível: da integração na
                entidade de FCT; do interesse pelo trabalho que realiza.
              </TableCell>
            </TableRow>
            {/* Autonomia */}
            <TableRow>
              <TableCell className="text-neutral-500">Autonomia</TableCell>
              <TableCell>
                Persiste na realização das tarefas, apesar das dificuldades;
                Revela iniciativa; Revela facilidade de se adaptar a novas
                tarefas.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Revela dificuldades em persistir na realização das tarefas,
                quando confrontado com dificuldades; Revela falhas pontuais ao
                nível da iniciativa e na adaptação a novas tarefas.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Dificilmente persiste na realização das tarefas, quando
                confrontado com dificuldades; Não tem capacidade de iniciativa e
                tem dificuldade em adaptar-se a novas tarefas.
              </TableCell>
            </TableRow>
            {/* Responsabilidade */}
            <TableRow>
              <TableCell className="text-neutral-500">
                Responsabilidade
              </TableCell>
              <TableCell>
                Contribui sistematicamente para um bom ambiente de trabalho;
                Revela muito bom relacionamento interpessoal com superiores,
                colegas e clientes; É recetivo às orientações e críticas.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Integra-se no ambiente de trabalho; Revela bom relacionamento
                interpessoal com superiores, colegas e clientes; Nem sempre é
                recetivo às orientações e críticas.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Tem muitas dificuldades de integração no ambiente de trabalho;
                Revela muitas dificuldades de relacionamento interpessoal com
                superiores, colegas e clientes; Pouca recetividade às
                orientações e críticas.
              </TableCell>
            </TableRow>
            {/* Relacionamento */}
            <TableRow>
              <TableCell className="text-neutral-500">Relacionamento</TableCell>
              <TableCell>
                Realiza as suas funções com responsabilidade: Aplica as normas
                de higiene de trabalho; Cumpre os prazos estabelecidos pelos
                seus superiores; Responde prontamente às solicitações dos
                superiores; Integra as sugestões e as críticas, e melhora as
                suas práticas, com base nas mesmas; Realiza todas as tarefas que
                lhe são solicitadas, com a qualidade exigida pelas funções que
                desempenha; É assíduo e pontual.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Integra-se no ambiente de trabalho; Revela bom relacionamento
                interpessoal com superiores, colegas e clientes; Nem sempre é
                recetivo às orientações e críticas.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Tem muitas dificuldades de integração no ambiente de trabalho;
                Revela muitas dificuldades de relacionamento interpessoal com
                superiores, colegas e clientes; Pouca recetividade às
                orientações e críticas.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};