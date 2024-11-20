import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react"
import { useRouter } from "next/navigation";


export const InternAdvisorDashboardOverview = () => {
  const Router = useRouter();

  const cardsData = [
    { title: "Estagiários Inseridos", value: 2 },
    { title: "Vistos a confirmar", value: 13 },
    { title: "Horas Restantes (média)", value: 146 },
    { title: "Classificação (média)", value: 16.5 }
  ];

  const goInternDetails = () => {
    Router.push(`/dashboard/internAdvisor/intern/details/${1}`);
  }

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
              <h1 className="font-bold text-4xl">{card.value}</h1>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        <Card>
          <div className="flex justify-between p-3">
            <h1 className="text-xl">Estagiários</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Presenças</TableHead>
                <TableHead>Registos Semanais</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Horas Restantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>André Ferreira</TableCell>
                <TableCell>andreferreira@aluno.com</TableCell>
                <TableCell>23</TableCell>
                <TableCell>3</TableCell>
                <TableCell>18</TableCell>
                <TableCell>172</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={goInternDetails}>Mais Informações</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}