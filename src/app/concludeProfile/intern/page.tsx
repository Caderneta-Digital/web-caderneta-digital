"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nif: z.string().min(1, { message: "Preencha o NIF"})
})

type FormType = z.infer<typeof schema>

export default function ConcludeInternProfilePage() {
  const form = useForm<FormType>({
    resolver: zodResolver(schema)
  })

  return (
    <div className="h-screen flex justify-center p-5">
      <Card className="h-max">
        <CardHeader>
          <CardTitle>Concluir Perfil</CardTitle>
          <CardDescription>Conclui o teu perfil para teres acesso à tua Caderneta Digital</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
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

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                Aceder à Caderneta Digital 
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}