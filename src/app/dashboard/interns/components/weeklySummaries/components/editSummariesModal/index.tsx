import { Form,
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel
} from "@/components/ui/form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

export const EditSummariesModal = () => {
    const form = useForm();
    return (
        <Dialog>
            <DialogTrigger>
                <Pencil cursor="pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Registo</DialogTitle>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Campo de Data de Ínicio */}
                    <FormField
                      control={form.control}
                      name="dateBegin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Data de ínicio</FormLabel>
                          <FormControl>
                            <Input placeholder="dd/mm/aaaa" type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Data de Fim */}
                    <FormField
                      control={form.control}
                      name="dateFinal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Data de Fim</FormLabel>
                          <FormControl>
                            <Input placeholder="Nº Horas" type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Observações */}
                    <FormField
                      control={form.control}
                      name="observacoes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Observações</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Escreve aqui as tuas Observações" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Botão de Submissão */}
                    <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                      Confirmar
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
    )
}