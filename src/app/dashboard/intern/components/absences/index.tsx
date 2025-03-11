"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { InternAbsencesType } from "@/types/internTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { Api, CreateInternAbsencesType } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { handleError } from "@/utils/handleError";

const schema = z.object({
  date: z.coerce.date( { message: "Indique a data da falta"} ),
  reason: z.string().min(1, {message: "Preencha a razão da falta"}),
});


type FormType = z.infer<typeof schema>;

type PropsType = {
  absences: InternAbsencesType[] | undefined
}

export const InternDashboardAbsences: React.FC<PropsType> = ({ absences }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm<FormType>( { resolver: zodResolver( schema ) } );

  const {user} = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createInternAbsenceMutation, isLoading } = useMutation({
    mutationKey: ["createInternAbsences"],
    mutationFn: async (data: CreateInternAbsencesType) => {
      const response = await Api.createInternAbsences(data);
      return response;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["internDashboard", user?.id]);
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: "A sua falta foi registada com sucesso!",
        description:
          "A sua presença foi registada, aguarde pela verificação do tutor ou orientador!",
      });
    },

    onError: async (error) => {
      handleError(error, toast)
    }
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
    await createInternAbsenceMutation( { ...data, internId: user.id } ) 
  }



  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Registos de Faltas</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <Button variant="outline">Marcar Falta</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Marcar Falta</DialogTitle>
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
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Motivo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Motivo da Falta"
                              type="text"
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
              <TableHead>Motivo</TableHead>
              <TableHead>Estado Tutor</TableHead>
              <TableHead>Estado Orientador</TableHead>
              <TableHead>Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {absences?.map((absences) => (
            <TableRow key={absences.id}>
              <TableCell>{formatDate(absences.date)}</TableCell>
              <TableCell>{absences.reason}</TableCell>
              <TableCell>{absences.isConfirmedByHostEntity ? "Aprovado" : "Por aprovar"}</TableCell>
              <TableCell>{absences.isConfirmedBySupervisor ? "Aprovado" : "Por aprovar"}</TableCell>
              <TableCell>
                <EditAttendenceModal absence={absences} />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

