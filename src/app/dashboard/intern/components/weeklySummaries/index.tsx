import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
=======
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
>>>>>>> cc41e36e076059dd8aa838a162cadf41efe0e208
import { useForm } from "react-hook-form";
import { EditSummariesModal } from "./components/editSummariesModal";
import { format, parseISO } from "date-fns"; 

type PropsType = {
  weeklyeSummaries: Intern
}

export const InternDashboardWeeklySummaries = ({ data }: { data: any }) => {
  const form = useForm();
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Data inválida";
    }
  };
  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos Semanais</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Criar Registo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Registo</DialogTitle>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Campo de Data de Ínicio */}
                    <FormField
                      control={form.control}
                      name="dateBegin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Data de ínicio
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="dd/mm/aaaa"
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Data de Fim */}
                    <FormField
                      control={form.control}
                      name="dateFinal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Data de Fim
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nº Horas"
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Observações */}
                    <FormField
                      control={form.control}
                      name="observacoes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Observações
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escreve aqui as tuas Observações"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Botão de Submissão */}
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-900"
                    >
                      Confirmar
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
              <TableHead>Semana</TableHead>
              <TableHead>Registo</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
          <TableBody>
              {data?.weeklySummaries?.map((summary: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{`${formatDate(summary.weekStart)} a ${formatDate(summary.weekEnd)}`}</TableCell>
                  <TableCell>
                    <Input disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={summary.tutorApproved} disabled />
                  </TableCell>
                  <TableCell>{summary.status || "Por Aprovar"}</TableCell>
                  <TableCell>
                    <EditSummariesModal></EditSummariesModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </Card>
    </div>
  );
};

