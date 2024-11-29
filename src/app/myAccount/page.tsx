"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputEditLine } from "@/components/ui/inputEditLine";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/ui/navbar";
import { Api, UpdateUserRequestType } from "@/services/api";
import { useMutation, useQuery } from "react-query";

export default function MyAccount() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["findUserById"],
    queryFn: async () => {
      const response = await Api.getProfile();
      return response;
    },
  });

  const { mutateAsync: requestPasswordReset, isLoading } = useMutation({
    mutationKey: ["requestPasswordReset"],
    mutationFn: async () => {
      const response = await Api.requestPasswordReset();
      return response;
    },
  });

  const { mutateAsync: updateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationKey: ["updateUser"],
      mutationFn: async (data: UpdateUserRequestType) => {
        const response = await Api.updateUser(data);
        return response;
      },
    });

  if (!profile || isLoadingProfile) {
    return <h1>Loading...</h1>;
  }

  const handleRequestPasswordReset = async () => {
    await requestPasswordReset();
  };

  return (
    <div className="w-screen h-screen">
      <Navbar title="Minha Conta" />

      <div className="px-4 py-3 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Meus Dados</CardTitle>
            <CardDescription>
              Gerencie suas informações pessoais e credenciais de acesso
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div>
              <Label>Nome</Label>
              <InputEditLine
                value={profile.name}
                isLoading={isLoadingUpdateUser}
                onConfirmEdit={(newValue) => {
                  updateUser({
                    ...profile,
                    name: newValue,
                  });
                }}
              />
            </div>

            <div>
              <Label>Email</Label>
              <h1>{profile.email}</h1>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Palavra-passe</Label>
              <Button
                isLoading={isLoading}
                onClick={handleRequestPasswordReset}
                className="w-fit"
              >
                Pedir Redefinição de Palavra Passe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
