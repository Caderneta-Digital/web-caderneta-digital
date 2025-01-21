import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GradesCriteriaCard } from "./gradesCriteriaCard";

type PropsType = {
  setShouldShowComponent: (value: boolean) => void;
};

export const GradesCriteria: React.FC<PropsType> = ({
  setShouldShowComponent,
}) => {
  return (
    <div className="px-10 py-3">
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Rubrica - Relatório de FCT (EFP)</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setShouldShowComponent(false)}
                  className="cursor-pointer"
                >
                  Avaliações
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Critérios de Avaliação</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
            {/* Pertinência */}
            <TableRow>
              <TableCell className="text-neutral-500">Pertinência</TableCell>
              <TableCell>
                Seleciona e identifica a informação de acordo com o real
                trabalho desenvolvido na FCT: Utilizar imagens, tabelas,
                esquemas e gráfico que facilitam a transmissão da informação;
                Explicita materiais, programas e outros recursos utilizados na
                sua FCT; Junta documentos ilustrativos do trabalho efetivamente
                desenvolvido na FCT.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Precisa de apoio para: Selecionar e identificar a informação a
                incluir; Escolher imagens, elaborar tabelas, esquemas e gráficos
                ilustrativos; Explicitar materiais, programas e outros recursos
                utilizados na sua FCT. Juntar documentos ilustrativos do
                trabalho efetivamente desenvolvido na FCT.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Não consegue: Selecionar e identificar a informação a incluir;
                Escolher imagens, elaborar tabelas, esquemas e gráficos
                ilustrativos; Explicitar materiais, programas e outros recursos
                utilizados na sua FCT. Juntar documentos ilustrativos do
                trabalho efetivamente desenvolvido na FCT.
              </TableCell>
            </TableRow>
            {/* Rigor */}
            <TableRow>
              <TableCell className="text-neutral-500">Rigor</TableCell>
              <TableCell>
                Respeita as convenções/normas da língua e da área tecnológica;
                Utiliza terminologia específica da área tecnológica/científica
                da FCT; Carateriza de forma completa a entidade de acolhimento
                da FCT; Descreve com clareza e coerência as etapas da sua
                formação em contexto de trabalho (FCT).
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas pontuais: No respeito pelas convenções/normas
                da língua e da área tecnológica; Na utilização da terminologia
                específica; Na caraterização da entidade de acolhimento; Na
                descrição clara e coerente das etapas da sua formação em
                contexto de trabalho (FCT).
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas sistemáticas: No respeito pelas
                convenções/normas da língua e da área tecnológica; Na utilização
                da terminologia específica; Na caraterização da entidade de
                acolhimento; Na descrição clara e coerente das etapas da sua
                formação em contexto de trabalho (FCT).
              </TableCell>
            </TableRow>
            {/* Estruturação */}
            <TableRow>
              <TableCell className="text-neutral-500">Estruturação</TableCell>
              <TableCell>
                Apresenta uma sequência lógica do trabalho desenvolvido durante
                a FCT; Respeita a estrutura de um relatório: capa, índice,
                caraterização da Entidade de Acolhimento, atividades previstas,
                trabalho desenvolvido na entidade de acolhimento, conclusão,
                referências bibliográficas, anexos; Formata devidamente o texto.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas pontuais: Na sequencialização lógica do
                trabalho desenvolvido; Na estrutura do relatório; Na formatação
                do texto.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas sistemáticas: Na sequencialização lógica do
                trabalho desenvolvido; Na estrutura do relatório; Na formatação
                do texto.
              </TableCell>
            </TableRow>
            {/* Reflexão */}
            <TableRow>
              <TableCell className="text-neutral-500">Reflexão</TableCell>
              <TableCell>
                Utiliza discurso próprio, retirando conclusões, refletindo e
                argumentando com clareza e coerência sobre a qualidade do
                trabalho desenvolvido durante a formação.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas pontuais: Na produção de discurso próprio, nas
                conclusões e nos argumentos acerca da qualidade do trabalho
                desenvolvido durante a formação.
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                Apresenta falhas sistemáticas: Na produção de discurso próprio,
                nas conclusões e nos argumentos acerca da qualidade do trabalho
                desenvolvido durante a formação.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <GradesCriteriaCard />
    </div>
  );
};
