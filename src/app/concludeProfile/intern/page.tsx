"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { InternType } from "@/types/internTypes";
import { useRouter } from "next/navigation";
import { UserTypeEnum } from "@/types/userTypes";

const schema = z.object({
  nif: z.string().min(1, { message: "Preencha o NIF" }),
  cc: z.string(),
  address: z.string().min(1, { message: "Preencha o endereço" }),
  postalCode: z.string().min(1, { message: "Preencha o codigo postal" }),
  phone: z.string().min(1, { message: "Preencha o telemovel" }),
  dadName: z.string().min(1, { message: "Preencha o nome do pai" }),
  motherName: z.string().min(1, { message: "Preencha o nome do mãe" }),
  observations: z.string()
})

type FormType = z.infer<typeof schema>

export default function ConcludeInternProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      nif: "",
      cc: "",
      address: "",
      postalCode: "",
      phone: "",
      dadName: "",
      motherName: "",
      observations: "",
    }
  })

  const { mutateAsync: updateIntern, isLoading } = useMutation({
    mutationKey: ["updateIntern"],
    mutationFn: async (data: Partial<InternType>) => {
      const response = await Api.updateIntern(data)
      return response;
    },
    onSuccess: () => {
      router.push(`/dashboard/${UserTypeEnum.INTERN}`)
    }
  })


  const handleUpdateIntern: SubmitHandler<FormType> = async (data) => {
    if (!user) return

    await updateIntern({
      id: user.id,
      ...data
    })
  }

  return (
    <div className="h-screen flex justify-center p-5">
      <Card className="h-max">
        <CardHeader>
          <CardTitle>Concluir Perfil</CardTitle>
          <CardDescription>Conclui o teu perfil para teres acesso à tua Caderneta Digital</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleUpdateIntern)}>
              <h1 className="text-lg">Identificação do(a) aluno(a)</h1>
              <FormField
                control={form.control}
                name="cc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">CC nº</FormLabel>
                    <FormControl>
                      <Input placeholder="0000000" type="numeric" {...field} />
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
                    <FormLabel className="no-error-color">NIF</FormLabel>
                    <FormControl>
                      <Input placeholder="00000000" type="numeric" {...field} />
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
                    <FormLabel className="no-error-color">Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua Capitães de Abril, 23, Alfornelos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Código Postal</FormLabel>
                    <FormControl>
                      <Input placeholder="0000000" type="numeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h1 className="text-lg">Contactos</h1>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Telemóvel</FormLabel>
                    <FormControl>
                      <Input placeholder="937644100" type="numeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h1 className="text-lg">Filiação</h1>
              <FormField
                control={form.control}
                name="dadName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Nome do Pai</FormLabel>
                    <FormControl>
                      <Input placeholder="Daniel Filipe Vieira" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Nome da Mãe</FormLabel>
                    <FormControl>
                      <Input placeholder="Mafalda Santos Carvalho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h1 className="text-lg">Observações</h1>
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Escreva as tuas observações aqui" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" isLoading={isLoading} className="w-full bg-black text-white hover:bg-gray-900">
                Aceder à Caderneta Digital
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}