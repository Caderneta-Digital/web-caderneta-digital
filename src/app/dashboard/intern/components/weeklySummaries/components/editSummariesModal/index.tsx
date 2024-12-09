import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { InternWeeklySummaryType } from "@/types/internTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { useUpdateInternWeeklySummary } from "@/hooks/useUpdateInternWeeklySummary";

const schema = z.object({
  weekStart: z.coerce.date( { message: "Selecione a data de início da semana"} ),
  weekEnd: z.coerce.date( { message: "Selecione a data de fim da semana"}),
  text: z.coerce.string().min(1, { message: "Indique as atividades realizadas" })
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  summary: InternWeeklySummaryType
}

export const EditSummariesModal: React.FC<PropsType> = ({ summary }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm<FormType>( { resolver: zodResolver( schema ) } );

  const {user} = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: updateInternWeeklySummaries, isLoading } =
  useUpdateInternWeeklySummary({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["internDashboard", user?.id]);
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: "O registo semanal foi atualizado com sucesso!",
        description:
          "O registo semanal foi atualizado, aguarde pela aprovação do tutor!",
      });
    },
  });

const handleUpdateInternWeeklySummary = async (data: FormType) => {
  if (!user) {
    return
  }
  await updateInternWeeklySummaries({
    ...summary,
    ...data,
    weekStart: data.weekStart.toISOString(),
    weekEnd: data.weekEnd.toISOString(),
  });  
}

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Pencil cursor="pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Registo</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleUpdateInternWeeklySummary)}>
              {/* Campo de Data de Ínicio */}
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

              {/* Campo de Data de Fim */}
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
                        }/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de Observações */}
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

              {/* Botão de Submissão */}
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
  );
};

