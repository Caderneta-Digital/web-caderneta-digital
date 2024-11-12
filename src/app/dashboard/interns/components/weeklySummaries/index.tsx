import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

export const InternDashboardWeeklySummaries = () => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos Semanais</h1>
          <Button variant="outline">Criar Registo</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semana</TableHead>
              <TableHead>Registo</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>12/12/2024 a 18/12/2024</TableCell>
              <TableCell>
                <Input />
              </TableCell>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Por Aprovar</TableCell>
              <TableCell>
                <Pencil cursor="pointer" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}