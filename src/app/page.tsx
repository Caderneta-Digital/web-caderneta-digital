'use client';

import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
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

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: any = {};
  
  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email é necessário.',
    };
  }

  if (!values.password) {
    errors.password = {
      type: 'required',
      message: 'Palavra Passe é necessária.',
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export default function App() {
  const form = useForm<FormValues>({ resolver });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-4">Inicie Sessão</h1>
        <p className="text-gray-500 mb-6">Inicie sessão e aceda à Caderneta Digital.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="no-error-color">Email</FormLabel> {/* Classe personalizada */}
                  <FormControl>
                    <Input placeholder="exemplo@esmaior.pt" {...field} />
                  </FormControl>
                  <FormMessage /> {/* A mensagem de erro será exibida aqui */}
                </FormItem>
              )}
            />

            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="no-error-color">Palavra Passe</FormLabel> {/* Classe personalizada */}
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage /> {/* A mensagem de erro será exibida aqui */}
                </FormItem>
              )}
            />

            {/* Botão de Submissão */}
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
              Iniciar Sessão
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
