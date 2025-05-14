"use client";

import { Api, ResetPasswordRequestType } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/loading";
import React from "react";

const schema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "A palavra passe precisa de 6 caracteres" }),
});

type FormType = z.infer<typeof schema>;

export default function PasswordReset() {
  return (
    <Suspense fallback={<h1>A Carregar...</h1>}>
      <PasswordResetContent />
    </Suspense>
  );
}

function PasswordResetContent(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { toast } = useToast();

  const tokenId = searchParams.get("token") as string;

  const { data: token, isLoading } = useQuery({
    queryKey: ["findTokenById", tokenId],
    queryFn: async () => {
      const response = await Api.isTokenValid(tokenId);
      return response;
    },
    onSuccess: (token) => {
      if(token.revoked) {
        return router.push("/")
      }
    }
  });

  const { mutateAsync: resetPassword, isLoading: isLoadingResetPassword } =
    useMutation({
      mutationKey: ["resetPassword"],
      mutationFn: async (data: ResetPasswordRequestType) => {
        const response = await Api.resetPassword(data);
        return response;
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Palavra passe alterada com sucesso!",
        });

        const userType = Cookies.get("type");
        router.push(`/dashboard/${userType}`);
      },
    });

  if (!token || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleChangePassword = async (data: FormType) => {
    await resetPassword({ ...data, tokenId });
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Redefinir sua palavra passe</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleChangePassword)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Palavra passe
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="*******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  isLoading={isLoadingResetPassword}
                  type="submit"
                  className="w-full"
                >
                  Redefinir
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
