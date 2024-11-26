import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useUpdateIntern } from "@/hooks/useUpdateIntern";
import { Api } from "@/services/api";
import { HostEntityType } from "@/types/hostEntititesType";
import { InternType } from "@/types/internTypes";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

type PropsType = {
  intern: InternType;
};

export const AssignHostEntityToInternModal: React.FC<PropsType> = ({
  intern,
}) => {
  const queryClient = useQueryClient();

  const { user: supervisor } = useAuth();

  const { mutateAsync: updateIntern, isLoading } = useUpdateIntern({
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "supervisorDashboard",
        supervisor?.id,
      ]);

      setIsModalOpen(false);
    }
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: hostEntities } = useQuery({
    queryKey: ["hostEntities"],
    queryFn: async () => {
      const response = await Api.findAllHostEntities();
      return response;
    },
    onSuccess: async () => {
    },
  });

  const handleAssignHostEntity = async (selectedHostEntity: HostEntityType) => {
    await updateIntern({
      ...intern,
      hostEntityId: selectedHostEntity.id,
    });
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Atribuir
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>
            Atribuir Ent. de Acolhimento ao {intern.name}
          </DialogTitle>
        </DialogHeader>

        <div>
          {hostEntities?.map((hostEntity) => (
            <Card
              key={hostEntity.id}
              className="cursor-pointer"
              onClick={() => handleAssignHostEntity(hostEntity)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{hostEntity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <Label>Estágiario Inseridos</Label>
                    <p>{hostEntity.interns.length}</p>
                  </div>
                  {isLoading ?
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    : <ArrowRight />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
