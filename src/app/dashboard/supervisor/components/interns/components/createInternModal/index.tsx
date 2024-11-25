import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Api, CreateInternRequestType } from "@/services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  name: z.string().min(1, { message: "Preencha o nome" }),
  email: z.string().email().min(1, { message: "Preencha o email" }),
  password: z.string().min(1, { message: "Preencha a senha" }),
  course: z.string(),
});

type FormType = z.infer<typeof schema>;

export const CreateInternModal = () => {
  const { user: supervisor } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      course: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createIntern, isLoading } = useMutation({
    mutationKey: ["createIntern"],
    mutationFn: async (data: CreateInternRequestType) => {
      const response = await Api.createIntern(data);
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "supervisorDashboard",
        supervisor?.id,
      ]);
      setIsModalOpen(false);
    },
  });

  const handleCreateIntern = async (data: FormType) => {
    await createIntern(data);
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Criar Estagiário
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Criar Conta</DialogTitle>
          <DialogDescription>Crie a conta do Estagiário</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleCreateIntern)}
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
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Curso</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AUD">AUD</SelectItem>
                          <SelectItem value="GPSI">GPSI</SelectItem>
                          <SelectItem value="MEBE">MEBE</SelectItem>
                          <SelectItem value="TUR">TUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField */}
              {/*   control={form.control} */}
              {/*   name="turma" */}
              {/*   render={({}) => ( */}
              {/*     <FormItem> */}
              {/*       <FormLabel className="no-error-color">Turma</FormLabel> */}
              {/*       <FormControl> */}
              {/*         <Select> */}
              {/*           <SelectTrigger> */}
              {/*             <SelectValue placeholder="12ºP" /> */}
              {/*           </SelectTrigger> */}
              {/*           <SelectContent> */}
              {/*             <SelectItem value="10">10ºP</SelectItem> */}
              {/*             <SelectItem value="11">11ºP</SelectItem> */}
              {/*             <SelectItem value="12">12ºP</SelectItem> */}
              {/*           </SelectContent> */}
              {/*         </Select> */}
              {/*       </FormControl> */}
              {/*       <FormMessage /> */}
              {/*     </FormItem> */}
              {/*   )} */}
              {/* /> */}

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

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Criar
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
