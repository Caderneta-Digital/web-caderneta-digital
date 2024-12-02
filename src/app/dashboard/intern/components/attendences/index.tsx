"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { EditAttendenceModal } from "./components/editAttendenceModal";
import { format, parseISO } from "date-fns"; 
import { InternAttendenceType } from "@/types/internTypes";

type PropsType = {
  attendences: InternAttendenceType[] | undefined
}

export const InternDashboardAttendences: React.FC<PropsType> = ({ attendences }) => {
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
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Data</FormLabel>
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

                    <FormField
                      control={form.control}
                      name="morningHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Manhã
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nº Horas"
                              type="number"
                              max={7}
                              min={0}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="afternoonHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Tarde
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nº Horas"
                              type="number"
                              max={7}
                              min={0}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
          {attendences?.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>{formatDate(attendance.date)}</TableCell>
              <TableCell>{attendance.morningHours || 0}</TableCell>
              <TableCell>{attendance.afternoonHours || 0}</TableCell>
              <TableCell><Input disabled/></TableCell>
              <TableCell>
                <Checkbox checked={attendance.isConfirmedByInternAdvisor} disabled />
              </TableCell>
              <TableCell>{attendance.isConfirmedByInternAdvisor ? "Aprovador" : "Por aprovar"}</TableCell>
              <TableCell>
                <EditAttendenceModal />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

