import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export const InternAdvisorGrades11anoFinal = () => {
  const form = useForm();
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" size="sm">
            Preencher Avaliação
          </Button>{" "}
        </DialogTrigger>
        <DialogContent className="h-[500px] overflow-auto w-11/12">
          <DialogHeader>
            <DialogTitle>
              Avaliação Final do Tutor/Professor Orientador
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>Avaliação Final do 11º Ano</DialogDescription>
          <Card className="max-w-md mb-3">
            <CardContent className="p-6 space-y-2">
              <p>
                <b>Nota:</b>
              </p>
              <p>1 = 0 a 44 (Muito Insuficiente)</p>
              <p>2 = 45 a 94 (Insuficiente)</p>
              <p>3 = 95 a 134 (Suficiente)</p>
              <p>4 = 135 a 174 (Bom)</p>
              <p>5 = 175 a 200 (Muito Bom)</p>
            </CardContent>
          </Card>

          <div>
            <Form {...form}>
              <form className="space-y-6">
                <Label className="text-lg">Trabalho Prático (80%)</Label>
                <DialogDescription className="text-sm">
                  Processo de Trabalho na FCT
                </DialogDescription>

                <FormField
                  control={form.control}
                  name="participation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Participação
                      </FormLabel>
                      <FormDescription>(Interesse, Integração)</FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autonomy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Autonomia
                      </FormLabel>
                      <FormDescription>
                        (Iniciativa, Adaptabilidade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Responsabilidade
                      </FormLabel>
                      <FormDescription>
                        (Cumprimento de Tarefas, Recetivo, Trabalho em Equipa)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Relacionamento
                      </FormLabel>
                      <FormDescription>
                        (Assiduidade, Pontualidade, Higiene e Segurança no
                        Trabalho)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="py-1">
                  <Label className="text-lg">
                    Conceptualização/Compreensão/Aplicação (20%)
                  </Label>
                  <DialogDescription className="text-sm">
                    Relatório de FCT
                  </DialogDescription>
                </div>

                <FormField
                  control={form.control}
                  name="relevance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Pertinência
                      </FormLabel>
                      <FormDescription>
                        (Seleciona e recorre a informação e meios descritores da
                        entidade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rigor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">Rigor</FormLabel>
                      <FormDescription>
                        (Clareza, Coerência, Objetividade)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="structuring"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">
                        Estruturação
                      </FormLabel>
                      <FormDescription>
                        (Respeita a estrutura do relatório e a formatação
                        textual)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reflection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="no-error-color">Reflexão</FormLabel>
                      <FormDescription>
                        (Argumenta, apresenta Conclusões da FCT)
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min={0} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div>
            <Label>Avaliação Final</Label>
            <h1>-</h1>
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900"
          >
            Submeter Avaliação
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
