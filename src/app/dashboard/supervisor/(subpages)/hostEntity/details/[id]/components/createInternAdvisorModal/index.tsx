import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { Api, CreateInternAdvisorRequestType } from "@/services/api";
import { HostEntityType } from "@/types/hostEntititesType";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, { message: "Preencha o nome" }),
  email: z.string().email({ message: "Email inválido" }).min(1, { message: "Preencha o email" }),
  phone: z.string(),
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  hostEntity: HostEntityType;
};

export const CreateInternAdvisorModal: React.FC<PropsType> = ({
  hostEntity,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: createInternAdvisor, isLoading } = useMutation({
    mutationKey: ["createInternAdvisor"],
    mutationFn: async (data: CreateInternAdvisorRequestType) => {
      const response = await Api.createInternAdvisor(data);
      return response;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(["hostEntity", hostEntity.id]);
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: "Conta do tutor criada com sucesso!",
        description:
          "Foi enviado um email para o tutor com as intruções de acesso à Caderneta Digital",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleCreateInternAdvisor = async (data: FormType) => {
    await createInternAdvisor({
      ...data,
      hostEntityId: hostEntity.id,
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="outline">Criar Tutor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Conta</DialogTitle>
          <DialogDescription>Crie a conta do Tutor</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleCreateInternAdvisor)}
            >
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="a00000@alunos.esmaior.pt"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Telemóvel</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="951567843" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Criar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
