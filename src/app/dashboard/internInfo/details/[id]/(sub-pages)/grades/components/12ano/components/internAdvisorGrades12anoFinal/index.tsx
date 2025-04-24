import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Api, CreateInternAdvisorEvaluationType } from "@/services/api";
import { z } from "zod";
import { handleError } from "@/utils/handleError";

const schema = z.object({
  participacao: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  autonomia: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  responsabilidade: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  relacionamento: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  pertinencia: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  rigor:  z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  estruturacao: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
  reflexao: z.coerce.number()
    .int({ message: "Apenas números inteiros compreendidos de 0 a 200 são permitidos" })
    .min(1, { message: "O número deve ser no mínimo 0" })
    .max(200, { message: "O número deve ser no máximo 200" }),
});

type FormType = z.infer<typeof schema>;


export const InternAdvisorGrades12anoFinal = () => {
  const { id:internId } = useParams() as { id: string }
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
  const form = useForm<FormType>( { resolver: zodResolver( schema ), mode: "onBlur" } );

  const {user} = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createInternAdvisorEvaluationMutation, isLoading } = useMutation({
      mutationKey: ["createInternAdvisorEvaluation"],
      mutationFn: async (data: CreateInternAdvisorEvaluationType) => {
        const response = await Api.createInternAdvisorEvaluation(data);
        return response;
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(["internAdvisorEvaluation", user?.id]);
        setIsModalOpen(false);
        toast({
          variant: "success",
          title: "A sua Auto Avaliação foi registada com sucesso!",
          description: "A sua Auto Avaliação foi registada, !",
        });
      },
      onError: async (error) => {
        handleError(error, toast);
      }
  });

  const handleCreateInternAdvisorEvaluation = async (data: FormType) => {
    if (!user) {
      return;
    }
    await createInternAdvisorEvaluationMutation({ ...data, period: "12", internId});
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <Button variant="outline" size="sm">
            Preencher Avaliação
          </Button>{" "}
        </DialogTrigger>
        <DialogContent className="h-[500px] overflow-auto w-11/12">
          <DialogHeader>
            <DialogTitle>
              Avaliação Final do Tutor/Professor Orientador
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>Avaliação Final do 12º Ano</DialogDescription>
          <Card className="max-w-md mb-3">
            <CardContent className="p-6 space-y-2">
              <p>
                <b>Nota:</b>
              </p>
              <p>1 = 0 a 44 (Muito Insuficiente)</p>
              <p>2 = 45 a 94 (Insuficiente)</p>
              <p>3 = 95 a 134 (Suficiente)</p>
              <p>4 = 135 a 174 (Bom)</p>
              <p>5 = 175 a 200 (Muito Bom)</p>
            </CardContent>
          </Card>

          <div>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(handleCreateInternAdvisorEvaluation)}>
                <Label className="text-lg">Trabalho Prático (80%)</Label>
                <DialogDescription className="text-sm">
                  Processo de Trabalho na FCT
                </DialogDescription>

                <FormField
                  control={form.control}
                  name="participacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Participação
                      </FormLabel>
                      <FormDescription>(Interesse, Integração)</FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autonomia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Autonomia
                      </FormLabel>
                      <FormDescription>
                        (Iniciativa, Adaptabilidade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsabilidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Responsabilidade
                      </FormLabel>
                      <FormDescription>
                        (Cumprimento de Tarefas, Recetivo, Trabalho em Equipa)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relacionamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Relacionamento
                      </FormLabel>
                      <FormDescription>
                        (Assiduidade, Pontualidade, Higiene e Segurança no
                        Trabalho)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="py-1">
                  <Label className="text-lg">
                    Conceptualização/Compreensão/Aplicação (20%)
                  </Label>
                  <DialogDescription className="text-sm">
                    Relatório de FCT
                  </DialogDescription>
                </div>

                <FormField
                  control={form.control}
                  name="pertinencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Pertinência
                      </FormLabel>
                      <FormDescription>
                        (Seleciona e recorre a informação e meios descritores da
                        entidade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rigor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">Rigor</FormLabel>
                      <FormDescription>
                        (Clareza, Coerência, Objetividade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estruturacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Estruturação
                      </FormLabel>
                      <FormDescription>
                        (Respeita a estrutura do relatório e a formatação
                        textual)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reflexao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">Reflexão</FormLabel>
                      <FormDescription>
                        (Argumenta, apresenta Conclusões da FCT)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={1} max={200} {...field} />
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
                  Submeter Avaliação 
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
