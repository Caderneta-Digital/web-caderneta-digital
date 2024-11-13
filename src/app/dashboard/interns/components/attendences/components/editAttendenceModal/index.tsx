import { Form,
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel } from "@/components/ui/form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
    

export const EditAttendenceModal = () => {
    const form = useForm();
    return (
        <Dialog>
            <DialogTrigger>
                <Pencil cursor="pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Editar Presença</DialogTitle>
                </DialogHeader>
                <div>
                <Form {...form}>
                    <form className="space-y-6">
                    {/* Campo de Data */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="no-error-color">Data</FormLabel>
                            <FormControl>
                            <Input placeholder="dd/mm/aaaa" type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Campo de Manhã */}
                    <FormField
                        control={form.control}
                        name="morningHours"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="no-error-color">Manhã</FormLabel>
                            <FormControl>
                            <Input placeholder="Nº Horas" type="number" max={7} min={0} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Campo de Tarde */}
                    <FormField
                        control={form.control}
                        name="afternoonHours"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="no-error-color">Tarde</FormLabel>
                            <FormControl>
                            <Input placeholder="Nº Horas" type="number" max={7} min={0} {...field} />
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
                        Editar
                    </Button>
                    </form>
                </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}