
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react"


export const InternDashboardOverview = () => {

  const cardsData = [
    { title: "Nota de FCT", value: "N/A" },
    { title: "Horas Restantes", value: 413 },
    { title: "Faltas", value: 2 },
    { title: "Registos semanais", value: 4 }
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
            <h1 className="text-xl">Registos de Presenças</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Manhã</TableHead>
                <TableHead>Tarde</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>12/12/2024</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Por Aprovar</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <Card>
          <div className="p-3">
            <h1 className="text-xl">Registos de Presenças</h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Manhã</TableHead>
                <TableHead>Tarde</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>12/12/2024</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Por Aprovar</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}