import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InternAbsencesType } from "@/types/internTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUpdateInternAbsences } from "@/hooks/useUpdateInternAbsence";
import { Pencil } from "lucide-react";

const schema = z.object({
  date: z.coerce.date( { message: "Indique a data da falta"} ),
  reason: z.string().min(1, {message: "Preencha a razão da falta"}),
});

type FormType = z.infer<typeof schema>;

type PropsType = {
  absence: InternAbsencesType;
}

export const EditAttendenceModal: React.FC<PropsType> = ({ absence }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {user} = useAuth();
  const queryClient = useQueryClient();  
  const { toast } = useToast();

  const { mutateAsync: updateInternAbsence, isLoading } =
    useUpdateInternAbsences ({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["internDashboard", user?.id]);
        setIsModalOpen(false);
        toast({
          variant: "success",
          title: "A sua falta foi atualizada com sucesso!",
          description:
            "A sua falta foi atualizada, aguarde pela aprovação do tutor e do orientador!",
        });
      },
    });

  const handleUpdateInternAttendence = async (data: FormType) => {
    if (!user) {
      return
    }
    await updateInternAbsence({ ...absence, ...data, date: data.date.toISOString() }) 
  }

  const form = useForm<FormType>({
    resolver: zodResolver( schema ),
    defaultValues: {
      date: new Date(absence.date),
      reason: absence.reason,
    }
  });
  
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger disabled={absence.isConfirmedBySupervisor || absence.isConfirmedByHostEntity}>
        <Pencil cursor="pointer" className={(absence.isConfirmedBySupervisor || absence.isConfirmedByHostEntity) ? "text-gray-400" : ""} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Falta</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleUpdateInternAttendence)}>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Data</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field}
                        value={
                          field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : field.value
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Motivo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Motivo"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-900"
                isLoading={isLoading}
              >
                Editar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

