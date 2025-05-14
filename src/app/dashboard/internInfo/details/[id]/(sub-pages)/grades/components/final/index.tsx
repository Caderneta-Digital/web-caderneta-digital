import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading";
import { Api } from "@/services/api";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export const InternAdvisorDashboardGradesFinal = () => {
  const { id: internId } = useParams() as { id: string };

  // Auto avaliação do Estagiário
  // 11º
  const { data: internAutoEvaluation11, isLoading: isLoadingAuto11 } = useQuery(
    {
      queryKey: ["internAutoGrades11", internId],
      queryFn: async () => {
        const response = await Api.getInternAutoEvaluation(internId, "11");
        return response;
      },
    }
  );

  // 12º
  const { data: internAutoEvaluation12, isLoading: isLoadingAuto12 } = useQuery(
    {
      queryKey: ["internAutoGrades12", internId],
      queryFn: async () => {
        const response = await Api.getInternAutoEvaluation(internId, "12");
        return response;
      },
    }
  );

  // Avaliação Final pelo Tutor
  const { data: internFinalGrade11, isLoading: isLoadingFinalGrade11 } =
    useQuery({
      queryKey: ["internFinalGrade11", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "11");
        return response;
      },
    });

  const { data: internFinalGrade12, isLoading: isLoadingFinalGrade12 } =
    useQuery({
      queryKey: ["internFinalGrade12", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "12");
        return response;
      },
    });

  if (
    isLoadingFinalGrade11 ||
    isLoadingFinalGrade12 ||
    isLoadingAuto11 ||
    isLoadingAuto12
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Avaliação Final da FCT</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Card className="max-w-md mb-3">
            <CardContent className="p-6 space-y-2">
              Os parâmetros de avaliação, classificados de 1 a 2, são
              multiplicados pelo respetivo coeficiente de ponderação.{" "}
              <p>
                <b>A Classificação Final expressa-se numa escala de 0 a 20.</b>
              </p>
            </CardContent>
          </Card>
          <Label className="text-lg">Parâmetros de Avaliação</Label>
          <div>
            <Label>Avaliação Final do 11º Ano</Label>
            <CardDescription>Coeficiente (25%)</CardDescription>
            <h1>
              {internAutoEvaluation11
                ? internAutoEvaluation11.finalGrade
                : "N/A"}
            </h1>
          </div>

          <div>
            <Label>Avaliação Final do 12º Ano</Label>
            <CardDescription>Coeficiente (75%)</CardDescription>
            <h1>
              {internAutoEvaluation12
                ? internAutoEvaluation12.finalGrade
                : "N/A"}
            </h1>
          </div>

          <Label className="text-lg">Resultado</Label>
          <div>
            <Label>Avaliação Final do 11º Ano</Label>
            <h1>
              {internFinalGrade11 ? internFinalGrade11.finalGrade : "N/A"}
            </h1>
          </div>

          <div>
            <Label>Avaliação Final do 12º Ano</Label>
            <h1>
              {internFinalGrade12 ? internFinalGrade12.finalGrade : "N/A"}
            </h1>
          </div>

          <Label className="text-lg">Classificação</Label>
          <div>
            <Label>Total</Label>
            <h1>?</h1>
          </div>

          <div>
            <Label>Classificação Final</Label>
            <CardDescription>(Arredondada às unidades)</CardDescription>
            <h1>?</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
