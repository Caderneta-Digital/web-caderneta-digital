import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//import { Checkbox } from "@/components/ui/checkbox";
//import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
//import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InfoInternsModal } from "./components/infoInternsModal";
import { Form, FormItem, FormControl, FormField, FormMessage, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export const SupervisorDashboardInterns = () => {
  const form = useForm();
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Estagiários</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Criar Estagiário</Button>
            </DialogTrigger>
            <DialogContent className="h-[500px] overflow-auto">
              <DialogHeader>
                <DialogTitle>Criar Conta</DialogTitle>
                <DialogDescription>Crie a conta do Estagiário</DialogDescription>
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

                    {/* Campo de Curso */}
                    <FormField
                      control={form.control}
                      name="curso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Curso</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="GPSI" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="audiovisuais">AUD</SelectItem>
                                <SelectItem value="informatica">GPSI</SelectItem>
                                <SelectItem value="massagens">MEBE</SelectItem>
                                <SelectItem value="turismo">TUR</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Turma */}
                    <FormField
                      control={form.control}
                      name="turma"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Turma</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="12ºP" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10">10ºP</SelectItem>
                                <SelectItem value="11">11ºP</SelectItem>
                                <SelectItem value="12">12ºP</SelectItem>
                              </SelectContent>
                            </Select>
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
                      Confirmar
                    </Button>

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full bg-white text-black border-solid border-2 border-black hover:bg-gray-900 hover:text-white hover:border-gray-900">
                      Cancelar
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
                <InfoInternsModal></InfoInternsModal>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}