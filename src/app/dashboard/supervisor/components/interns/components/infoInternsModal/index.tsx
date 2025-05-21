import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InternStatusEnum, InternType } from "@/types/internTypes";
import { useUpdateIntern } from "@/hooks/useUpdateIntern";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { Api } from "@/services/api";
import LoadingSpinner from "@/components/ui/loading";
import { SupervisorTypeEnum } from "@/types/userTypes";

type PropsType = {
  intern: InternType;
};

export const InfoInternsModal: React.FC<PropsType> = ({ intern }) => {
  const { user } = useAuth()
  const { id: internId } = useParams() as { id: string };

  const queryClient = useQueryClient()
  const { mutateAsync: updateIntern } = useUpdateIntern({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["supervisorDashboard", user?.id])
    }
  })

  // 11º
  const { data: internFinalGrade11, isLoading: isLoadingFinalGrade11 } = useQuery(
    {
      queryKey: ["internFinalGrade11", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "11");
        return response;
      },
    }
  );
    
  // 12º
  const { data: internFinalGrade12, isLoading: isLoadingFinalGrade12 } = useQuery(
    {
      queryKey: ["internFinalGrade12", internId],
      queryFn: async () => {
        const response = await Api.getInternAdvisorEvaluation(internId, "12");
        return response;
      },
    }
  );

  if (isLoadingFinalGrade11 || isLoadingFinalGrade12) {
      return (
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
  }

  const finalGrade = (internFinalGrade11?.finalGrade ?? 0) * 0.25 + (internFinalGrade12?.finalGrade ?? 0) * 0.75;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Mais Informações</Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto w-11/12">
        <DialogHeader>
          <DialogTitle>Estagiário</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="text-gray-600">Nome</Label>
          <h1>{intern.name}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Email</Label>
          <h1>{intern.email}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Curso</Label>
          <h1>{intern.course.name}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Classificação</Label>
          <h1>{finalGrade ?? "N/A"}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Horas Restantes</Label>
          <h1>{intern.remainingHours}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Registos Semanais</Label>
          <h1>{intern.weeklySummaries?.length || 0}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Entidade de Acolhimento</Label>
          <h1>{intern.hostEntity?.name}</h1>
        </div>

        <div>
          <Label className="text-gray-600">CC Nº</Label>
          <h1>{intern.cc ?? "-"}</h1>
        </div>

        <div>
          <Label className="text-gray-600">NIF</Label>
          <h1>{intern.nif}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Endereço</Label>
          <h1>{intern.address}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Código Postal</Label>
          <h1>{intern.postalCode}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Pai</Label>
          <h1>{intern.dadName}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Mãe</Label>
          <h1>{intern.motherName}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Observações</Label>
          <h1>{intern.obs || "-"}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Estado</Label>
          <Select disabled={user?.supervisorType !== SupervisorTypeEnum.COURSE_DIRECTOR} value={intern.status} onValueChange={value => updateIntern({ ...intern, status: value as InternStatusEnum })}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={InternStatusEnum.ACTIVE}>Ativo</SelectItem>
              <SelectItem value={InternStatusEnum.NOT_ACTIVE}>
                Não Ativo
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};
