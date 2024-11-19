"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Api } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query"
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/handleError";
import { UserTypeEnum } from "@/types/userTypes";
import { InternBusinessLogic } from "@/utils/internBusinessLogin";
import { InternType } from "@/types/internTypes";

const schema = z.object({
  email: z.string().email("O email precisa ser válido").min(1, { message: "Preencha o email" }),
  password: z.string().min(1, { message: "Preencha a palavra-passe" }),
});

type FormType = z.infer<typeof schema>;

export default function Login() {
  const { toast } = useToast()
  const router = useRouter();
  const { setUser } = useAuth();
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { 
      email: "",
      password: ""
    }
  });
  const params = useParams()
  const flow = params.flow as UserTypeEnum

  const { mutateAsync: loginInternMutation, isLoading } = useMutation({
    mutationKey: ["loginIntern"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Api.loginIntern(data)
      return response;
    },
    onError: (error) => handleError(error, toast)
  })

  const onSubmit = async (data: FormType) => {
    if (flow === UserTypeEnum.INTERN) {
      // TODO: Passar toda essa função para o AuthContext
      const response = await loginInternMutation(data);
      setUser({
        id: response.intern.id,
        name: response.intern.name,
        email: response.intern.email,
        type: UserTypeEnum.INTERN,
      });
      Api.setBearerToken(response.token)
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.intern, type: UserTypeEnum.INTERN })
      );
      localStorage.setItem("token", response.token);

      if (InternBusinessLogic.shouldConcludeProfile(response.intern)) {
        return router.push("/concludeProfile/intern")
      }

      return router.push("/concludeProfile/intern")
    } else if (flow === UserTypeEnum.SUPERVISOR) {
      const response = await Api.loginSupervisors(data);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.supervisor, type: "supervisors" })
      );
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    }
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const type = user && user.type;

    if (type === UserTypeEnum.INTERN && InternBusinessLogic.shouldConcludeProfile(user as InternType)) {
      return router.push("/concludeProfile/intern")
    }

    if (user && type) {
      router.push(`/dashboard/${type}`);
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-4">Inicie Sessão</h1>
        <p className="text-gray-500 mb-6">
          Inicie sessão e aceda à Caderneta Digital.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="no-error-color">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo@esmaior.pt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo de Senha */}
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

            {/* Botão de Submissão */}
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              Iniciar Sessão
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
