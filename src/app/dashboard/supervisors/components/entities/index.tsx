import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

import { Form, FormItem, FormControl, FormField, FormMessage, FormLabel } from "@/components/ui/form";
import { InfoEntityModal } from "./components/infoEntityModal";



export const SupervisorDashboardEntities = () => {
  const form = useForm();
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
                <DialogTitle>Criar Conta</DialogTitle>
                <DialogDescription>Crie a conta da Entidade de Acolhimento</DialogDescription>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Campo de Nome */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="António Pinheiro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="a00000@alunos.esmaior.pt" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Senha */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Palavra Passe
                          </FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                      Criar
                    </Button>

                  </form>
                </Form>
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
                <InfoEntityModal></InfoEntityModal>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}