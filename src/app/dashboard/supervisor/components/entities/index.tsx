import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { InfoEntityModal } from "./components/infoEntityModal";
import { HostEntity } from "@/types/hostEntititesType";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PropsType = {
  hostEntities: HostEntity[];
};

export const SupervisorDashboardEntities: React.FC<PropsType> = ({
  hostEntities,
}) => {
  const form = useForm();

  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Entidades de Acolhimento</h1>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Criar Entidade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Conta</DialogTitle>
                <DialogDescription>
                  Crie a conta da Entidade de Acolhimento
                </DialogDescription>
              </DialogHeader>
              <div>
                <Form {...form}>
                  <form className="space-y-6">
                    {/* Campo de Nome */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="António Pinheiro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo de Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="no-error-color">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="a00000@alunos.esmaior.pt"
                              {...field}
                            />
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
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-900"
                    >
                      Criar
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nome do Responsável</TableHead>
              <TableHead>Ramo de Actividade</TableHead>
              <TableHead>Tutores de FCT</TableHead>
              <TableHead>Estágiarios Inseridos</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hostEntities.map((hostEntity) => (
              <TableRow key={hostEntity.id}>
                <TableCell>{hostEntity.name}</TableCell>
                <TableCell>{hostEntity.responsibleName}</TableCell>
                <TableCell>{hostEntity.activityField}</TableCell>
                <TableCell>?</TableCell>
                <TableCell>
                  {hostEntity.interns.map((intern) => intern.name).join(", ")}
                </TableCell>
                <TableCell>?</TableCell>
                <TableCell>
                  <InfoEntityModal hostEntity={hostEntity}></InfoEntityModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

