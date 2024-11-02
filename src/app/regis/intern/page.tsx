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
import { Textarea } from "@/components/ui/textarea"


type FormValues = {
  nome: string;
  ccn: string;
  nif: string;
  endereco: string;
  codigoPostal: string;
  telefone: string;
  email: string;
  nomePai: string;
  nomeMae: string;
  observacoes: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: any = {};
  
  if (!values.nome) errors.nome = { type: 'required', message: 'Nome é necessário.' };
  if (!values.ccn) errors.ccn = { type: 'required', message: 'CCN é necessário.' };
  if (!values.nif) errors.nif = { type: 'required', message: 'NIF é necessário.' };
  if (!values.endereco) errors.endereco = { type: 'required', message: 'Endereço é necessário.' };
  if (!values.codigoPostal) errors.codigoPostal = { type: 'required', message: 'Código Postal é necessário.' };
  if (!values.telefone) errors.telefone = { type: 'required', message: 'Telefone é necessário.' };
  if (!values.email) errors.email = { type: 'required', message: 'Email é necessário.' };
  if (!values.nomePai) errors.nomePai = { type: 'required', message: 'Nome do Pai é necessário.' };
  if (!values.nomeMae) errors.nomeMae = { type: 'required', message: 'Nome da Mãe é necessário.' };

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export default function ConcluirPerfil() {
  const form = useForm<FormValues>({ resolver });

  const onSubmit = async (data: FormValues) => {
    console.log('Form Data:', data);
    // Aqui você pode fazer a requisição à API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-semibold mb-4">Concluir Perfil</h1>
        <p className="text-gray-500 mb-6">Complete o seu perfil para ter acesso à sua Caderneta Digital.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Identificação do Aluno */}
            <h2 className="text-xl font-semibold">Identificação do(a) Aluno(a)</h2>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ccn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CCN</FormLabel>
                  <FormControl>
                    <Input placeholder="000000000" {...field} />
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
                  <FormLabel>NIF</FormLabel>
                  <FormControl>
                    <Input placeholder="000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Exemplo, 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigoPostal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="0000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contactos */}
            <h2 className="text-xl font-semibold">Contactos</h2>

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="+351 000 000 000" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Filiação */}
            <h2 className="text-xl font-semibold">Filiação</h2>

            <FormField
              control={form.control}
              name="nomePai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Pai</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Pai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nomeMae"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da Mãe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observações */}
            <h2 className="text-xl font-semibold">Observações</h2>

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escreva aqui as observações" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botão de Submissão */}
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
              Aceder à Caderneta Digital
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
