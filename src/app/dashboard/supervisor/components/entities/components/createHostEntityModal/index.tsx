"use client"

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { Api, CreateHostEntityRequestType } from "@/services/api";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  name: z.string().min(1, { message: "Preencha o nome" }),
  email: z.string().email({ message: "Insira um email valido" }),
  phone: z.string().min(1, { message: "Preencha o telemovel" }),
  nif: z.string().min(1, { message: "Preencha o NIF" }),
  responsibleName: z.string().min(1, { message: "Preencha o nome do responsavel" }),
  address: z.string().min(1, { message: "Preencha o endereço" }),
  activityField: z.string().min(1, { message: "Preencha o ramo de atividade" }),
})

type FormType = z.infer<typeof schema>

export const CreateHostEntityModal = () => {
  const { user: supervisor } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      activityField: "",
      address: "",
      email: "",
      name: "",
      nif: "",
      phone: "",
      responsibleName: ""
    }
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createHostEntity, isLoading } = useMutation({
    mutationKey: ["createHostEntity"],
    mutationFn: async (data: CreateHostEntityRequestType) => {
      const response = await Api.createHostEntity(data)
      return response
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["supervisorDashboard", supervisor?.id])
      setIsModalOpen(false)
    }
  })

  const handleCreateHostEntity = async (data: FormType) => {
    await createHostEntity(data)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="outline">Criar Entidade</Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Criar Conta</DialogTitle>
          <DialogDescription>
            Crie a conta da Entidade de Acolhimento
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleCreateHostEntity)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="AAVC" {...field} />
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
                    <FormLabel className="no-error-color">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@entidade.com"
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
                    <FormLabel className="no-error-color">
                      Telemovel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="937655187"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">
                      Nome do Reponsavel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Julio Cesar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">
                      NIF
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="214144442"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">
                      Endereço
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rua da Madeira, 123, Meadela"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">
                      Ramo de Atividade
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Desenvolvimento de Software"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button isLoading={isLoading} type="submit" className="w-full">
                Criar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}