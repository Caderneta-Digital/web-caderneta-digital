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
import { InternAttendenceType } from "@/types/internTypes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUpdateInternAttendence } from "@/hooks/useUpdateInternAttendence";
import { Pencil } from "lucide-react";

const schema = z.object({
  date: z.coerce.date( { message: "Selecione a data"} ),
  morningHours: z.coerce.number().min(1, { message: "Indique as horas realizadas de manhã" }),
  afternoonHours: z.coerce.number().min(1, { message: "Indique as horas realizadas de tarde" })
}).refine(
  (data) => data.morningHours + data.afternoonHours <= 7,
  {
    message: "A soma das horas da manhã e da tarde não pode ser maior que 7.",
    path: ["morningHours", "afternoonHours"], 
  }
);;

type FormType = z.infer<typeof schema>;

type PropsType = {
  attendence: InternAttendenceType
}

export const EditAttendenceModal: React.FC<PropsType> = ({attendence}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {user} = useAuth();
  const queryClient = useQueryClient();  
  const { toast } = useToast();

  const { mutateAsync: updateInternAttendence, isLoading } =
    useUpdateInternAttendence({
      onSuccess: async () => {
        await queryClient.invalidateQueries(["internDashboard", user?.id]);
        setIsModalOpen(false);
        toast({
          variant: "success",
          title: "Presença foi atualizada com sucesso!",
          description:
            "A sua presença foi atualizada, aguarde pela aprovação do tutor!",
        });
      },
    });

  const handleUpdateInternAttendence = async (data: FormType) => {
    if (!user) {
      return
    }
    await updateInternAttendence({ ...attendence, ...data, date: data.date.toISOString() }) 
  }

  const form = useForm<FormType>({
    resolver: zodResolver( schema ),
    defaultValues: {
      date: new Date(attendence.date),
      morningHours: attendence.morningHours,
      afternoonHours: attendence.afternoonHours
    }
  });
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger disabled={attendence.isConfirmedByInternAdvisor}>
        <Pencil cursor="pointer" className={attendence.isConfirmedByInternAdvisor ? "text-gray-400" : ""} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Presença</DialogTitle>
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
                name="morningHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Manhã</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nº Horas"
                        type="number"
                        max={7}
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="afternoonHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="no-error-color">Tarde</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nº Horas"
                        type="number"
                        max={7}
                        min={0}
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

