import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const InternDashboardGradesFinal = () => {
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
            <h1>200</h1>
          </div>

          <div>
            <Label>Avaliação Final do 12º Ano</Label>
            <CardDescription>Coeficiente (75%)</CardDescription>
            <h1>?</h1>
          </div>

          <Label className="text-lg">Resultado</Label>
          <div>
            <Label>Avaliação Final do 11º Ano</Label>
            <h1>50</h1>
          </div>

          <div>
            <Label>Avaliação Final do 12º Ano</Label>
            <h1>?</h1>
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
