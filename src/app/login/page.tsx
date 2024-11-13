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
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query"
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/handleError";

const schema = z.object({
  email: z.string().email().min(1, { message: "Preencha o email" }),
  password: z.string().min(1, { message: "Preencha a palavra-passe" }),
});

type FormType = z.infer<typeof schema>;

export default function Login() {
  const { toast } = useToast()
  const { mutateAsync: loginInternMutation, isLoading } = useMutation({
    mutationKey: ["loginIntern"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Api.loginIntern(data)
      return response;
    },
    onError: (error) => handleError(error, toast) 
  })

  const searchParams = useSearchParams();
  const router = useRouter();
  const flow = searchParams.get("flow");
  const { setUser } = useAuth();

  const form = useForm<FormType>({ resolver: zodResolver(schema) });

  React.useEffect(() => {
    if (flow) {
      localStorage.setItem("lastFlow", flow);
    }
  }, [flow]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const type = JSON.parse(user).type;
      router.push(`/dashboard/${type}`);
    }
  }, [router]);

  const onSubmit = async (data: FormType) => {
    try {
      if (flow === "interns") {
        const response = await loginInternMutation(data);
        setUser(response.intern);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.intern, type: "interns" })
        );
        localStorage.setItem("token", response.token);
        router.push("/dashboard/interns");
      } else if (flow === "supervisors") {
        const response = await Api.loginSupervisors(data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.supervisor, type: "supervisors" })
        );
        localStorage.setItem("token", response.token);
        router.push("/dashboard");
      }
    } catch (error) {
      router.push("/login?flow=" + localStorage.getItem("lastFlow"));
    }
  };

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
