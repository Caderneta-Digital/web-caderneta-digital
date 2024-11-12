import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const InternDashboardAttendences = () => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos de Presenças</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Marcar Presença</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Marcar Presença</DialogTitle>
              </DialogHeader>
              <div>
                <h1>ADD FORM AQUI</h1>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Manhã</TableHead>
              <TableHead>Tarde</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>12/12/2024</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
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