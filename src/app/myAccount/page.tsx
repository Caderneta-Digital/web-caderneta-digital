"use client";

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

export default function MyAccount() {
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
              <InputEditLine value="Andre Oliveira Rocha" />
            </div>

            <div>
              <Label>Email</Label>
              <h1>andre.rocha@gmail.com</h1>
            </div>

            <div>
              <Label>Palavra-passe</Label>
              <h1>*********</h1>
            </div>

            <div>
              <Label>NIF</Label>
              <h1>123124124</h1>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
