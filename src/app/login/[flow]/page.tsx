"use client";

import React, { useEffect } from "react";
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
import { useMutation } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/handleError";
import { UserTypeEnum } from "@/types/userTypes";
import { InternBusinessLogic } from "@/utils/internBusinessLogin";
import Cookies from "js-cookie";

const schema = z.object({
  email: z
    .string()
    .email("O email precisa ser válido")
    .min(1, { message: "Preencha o email" }),
  password: z.string().min(1, { message: "Preencha a palavra-passe" }),
});

type FormType = z.infer<typeof schema>;

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAuth();
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const params = useParams();
  const flow = params.flow as UserTypeEnum;

  const { mutateAsync: loginInternMutation, isLoading: isLoadingLoginIntern } =
    useMutation({
      mutationKey: ["loginIntern"],
      mutationFn: async (data: { email: string; password: string }) => {
        const response = await Api.loginIntern(data);
        return response;
      },
      onError: (error) => handleError(error, toast),
    });

  const {
    mutateAsync: loginSupervisorMutation,
    isLoading: isLoadingLoginSupervisor,
  } = useMutation({
    mutationKey: ["loginSupervisor"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Api.loginSupervisors(data);
      return response;
    },
    onError: (error) => handleError(error, toast),
  });

  const {
    mutateAsync: loginInternAdvisorMutation,
    isLoading: isLoadingLoginInternAdvisor,
  } = useMutation({
    mutationKey: ["loginInternAdvisor"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Api.loginInternAdvisor(data);
      return response;
    },
    onError: (error) => handleError(error, toast),
  });

  const isLoading =
    isLoadingLoginIntern ||
    isLoadingLoginInternAdvisor ||
    isLoadingLoginSupervisor;

  const onSubmit = async (data: FormType) => {
    if (flow === UserTypeEnum.INTERN) {
      const response = await loginInternMutation(data);
      setUser({
        id: response.intern.id,
        name: response.intern.name,
        email: response.intern.email,
        type: UserTypeEnum.INTERN,
        course: response.intern.course,
      });
      Api.setBearerToken(response.token);
      Cookies.set(
        "user",
        JSON.stringify({ ...response.intern, type: UserTypeEnum.INTERN }),
      );
      Cookies.set("token", response.token);
      Cookies.set("type", UserTypeEnum.INTERN);

      if (InternBusinessLogic.shouldConcludeProfile(response.intern)) {
        return router.push("/concludeProfile/intern");
      }

      return router.push("/dashboard/intern");
    } else if (flow === UserTypeEnum.SUPERVISOR) {
      const response = await loginSupervisorMutation(data);
      setUser({
        id: response.supervisor.id,
        name: response.supervisor.name,
        email: response.supervisor.email,
        type: UserTypeEnum.SUPERVISOR,
        supervisorType: response.supervisor.type,
        course: response.supervisor.course,
      });
      Api.setBearerToken(response.token);
      Cookies.set(
        "user",
        JSON.stringify({
          ...response.supervisor,
          type: UserTypeEnum.SUPERVISOR,
          supervisorType: response.supervisor.type,
        }),
      );
      Cookies.set("token", response.token);
      Cookies.set("type", UserTypeEnum.SUPERVISOR);

      return router.push("/dashboard/supervisor");
    } else if (flow === UserTypeEnum.INTERN_ADVISOR) {
      const response = await loginInternAdvisorMutation(data);
      setUser({
        id: response.internAdvisor.id,
        name: response.internAdvisor.name,
        email: response.internAdvisor.email,
        type: UserTypeEnum.INTERN_ADVISOR,
      });
      Api.setBearerToken(response.token);
      Cookies.set(
        "user",
        JSON.stringify({
          ...response.internAdvisor,
          type: UserTypeEnum.INTERN_ADVISOR,
        }),
      );
      Cookies.set("token", response.token);
      Cookies.set("type", UserTypeEnum.INTERN_ADVISOR);

      return router.push("/dashboard/internAdvisor");
    }
  };

  useEffect(() => {
    const validFlows = ["intern", "supervisor", "internAdvisor"];
    if (!validFlows.includes(flow)) {
      const userType = Cookies.get("type");

      if (userType) {
        return router.push(`/login/${userType}`);
      }

      return router.push("/");
    }
  }, [flow, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-4">Inicie Sessão</h1>
        <p className="text-gray-500 mb-6">
          Inicie sessão e aceda à Caderneta Digital.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button isLoading={isLoading} type="submit" className="w-full">
              Iniciar Sessão
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
