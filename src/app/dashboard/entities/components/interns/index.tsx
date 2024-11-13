import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//import { Checkbox } from "@/components/ui/checkbox";
//import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
//import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const SupervisorDashboardInterns = () => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Estagiários</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Criar Estagiário</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ver Estagiário</DialogTitle>
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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Horas Restantes</TableHead>
              <TableHead>Entidade de Acolhimento</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>André Ferreira</TableCell>
              <TableCell>andreferreira@aluno.com</TableCell>
              <TableCell>GPSI</TableCell>
              <TableCell>18</TableCell>
              <TableCell>172</TableCell>
              <TableCell>Lidl</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline">Mais Informações</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ver Estagiários</DialogTitle>
                  </DialogHeader>
                  <div>
                    <h1 className="text-gray-600">Nome</h1>
                    <p>André Ferreira</p>
                  </div>
                </DialogContent>
              </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}