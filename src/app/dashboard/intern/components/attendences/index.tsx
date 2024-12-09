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
import { EditAttendenceModal } from "./components/editAttendenceModal";
import { format, parseISO } from "date-fns"; 
import { InternAttendenceType } from "@/types/internTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { Api, CreateInternAttendenceType } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const schema = z.object({
  date: z.coerce.date( { message: "Selecione a data"} ),
  morningHours: z.coerce.number().min(1, { message: "Indique as horas realizadas de manhã" }),
  afternoonHours: z.coerce.number().min(1, { message: "Indique as horas realizadas de tarde" })
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  attendences: InternAttendenceType[] | undefined
}

export const InternDashboardAttendences: React.FC<PropsType> = ({ attendences }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm<FormType>( { resolver: zodResolver( schema ) } );

  const {user} = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createInternAttendeceMutation, isLoading } = useMutation({
    mutationKey: ["createInternAttendence"],
    mutationFn: async (data: CreateInternAttendenceType) => {
      const response = await Api.createInternAttendence(data);
      return response;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["internDashboard", user?.id]);
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: "A sua presença foi criada com sucesso!",
        description:
          "A sua presença foi criada, aguarde pela aprovação do tutor!",
      });
    },
  });

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy")
    } catch {
      return "Data inválida"
    }
  };

  const handleCreateInternAttendence = async (data: FormType) => {
    if (!user) {
      return
    }
    await createInternAttendeceMutation( { ...data, internId: user.id } ) 
  }



  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos de Presenças</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <Button variant="outline">Marcar Presença</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Marcar Presença</DialogTitle>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(handleCreateInternAttendence)}>
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
              <TableHead>Data</TableHead>
              <TableHead>Manhã</TableHead>
              <TableHead>Tarde</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {attendences?.map((attendence) => (
            <TableRow key={attendence.id}>
              <TableCell>{formatDate(attendence.date)}</TableCell>
              <TableCell>{attendence.morningHours || 0}</TableCell>
              <TableCell>{attendence.afternoonHours || 0}</TableCell>
              <TableCell>
                <Checkbox checked={attendence.isConfirmedByInternAdvisor} disabled />
              </TableCell>
              <TableCell>{attendence.isConfirmedByInternAdvisor ? "Aprovador" : "Por aprovar"}</TableCell>
              <TableCell>
                <EditAttendenceModal attendence={attendence} />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

