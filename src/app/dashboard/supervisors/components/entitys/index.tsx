import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";

export const SupervisorDashboardEntities = () => {
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Entidades de Acolhimento</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Criar Entidade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ver Entidades</DialogTitle>
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
              <TableHead>Nome do Responsável</TableHead>
              <TableHead>Rame de Actividade</TableHead>
              <TableHead>Tutores de FCT</TableHead>
              <TableHead>Estiários Inseridos</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Lidl</TableCell>
              <TableCell>Ricardo Rocha</TableCell>
              <TableCell>Desenvolvimento de Software</TableCell>
              <TableCell>Fábio Afonso</TableCell>
              <TableCell>Fábio Pereira, Rita Saramago</TableCell>
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