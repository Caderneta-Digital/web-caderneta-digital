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
import { format, parseISO } from "date-fns"; 
import { InternWeeklySummaryType } from "@/types/internTypes";
import { EditSummariesModal } from "./components/editSummariesModal";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Api, CreateInternWeeklySummariesType } from "@/services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  weekStart: z.coerce.date( { message: "Selecione a data de início da semana"} ),
  weekEnd: z.coerce.date( { message: "Selecione a data de fim da semana"}),
  text: z.coerce.string().min(1, { message: "Indique as atividades realizadas" })
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  weeklySummaries: InternWeeklySummaryType[] | undefined
}

export const InternDashboardWeeklySummaries: React.FC<PropsType> = ({ weeklySummaries }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm<FormType>( { resolver: zodResolver( schema ) } );

  const {user} = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();


  const { mutateAsync: createInternWeeklySummariesMutation, isLoading } = useMutation({
    mutationKey: ["createInternWeeklySummaries"],
    mutationFn: async (data: CreateInternWeeklySummariesType) => {
      const response = await Api.createInternWeeklySummaries(data);
      return response;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["internDashboard", user?.id]);
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: "Presença foi criada com sucesso!",
        description:
          "A sua presença foi criada, aguarde pela aprovação do tutor!",
      });
    },
  });


  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch {
      return "Data inválida";
    }
  };

  const handleCreateInternWeeklySummaries = async (data: FormType) => {
    if (!user) {
      return
    }
    await createInternWeeklySummariesMutation( { ...data, internId: user.id } ) 
  }

  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos Semanais</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <Button variant="outline">Criar Registo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Registo</DialogTitle>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(handleCreateInternWeeklySummaries)}>
                    <FormField
                      control={form.control}
                      name="weekStart"
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
                              value={
                                field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weekEnd"
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
                              value={
                                field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="text"
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
                      isLoading={isLoading}
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
              {weeklySummaries?.map((summary) => (
                <TableRow key={summary.id}>
                  <TableCell>{`${formatDate(summary.weekStart)} a ${formatDate(summary.weekEnd)}`}</TableCell>
                  <TableCell>{summary.text}</TableCell>
                  <TableCell>
                    <Checkbox checked={summary.isConfirmedByInternAdvisor} disabled />
                  </TableCell>
                  <TableCell>{summary.isConfirmedByInternAdvisor ? "Aprovador" : "Por aprovar"}</TableCell>
                  <TableCell>
                    <EditSummariesModal />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </Card>
    </div>
  );
};

