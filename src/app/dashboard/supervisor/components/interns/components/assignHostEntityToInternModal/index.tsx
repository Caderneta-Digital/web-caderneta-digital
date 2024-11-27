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
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [selectedHostEntity, setSelectedHostEntity] = useState<HostEntityType | null>(null)
  const [selectedHostEntityAdvisorId, setSelectedHostEntityAdvisorId] = useState<string | null>(null)

  const { data: hostEntities } = useQuery({
    queryKey: ["hostEntities"],
    queryFn: async () => {
      const response = await Api.findAllHostEntities();
      return response;
    },
    onSuccess: async () => {
    },
  });

  const handleAssignHostEntity = async () => {
    if(!selectedHostEntity) return;
    if(!selectedHostEntityAdvisorId) return;

    await updateIntern({
      ...intern,
      advisorId: selectedHostEntityAdvisorId,
      hostEntityId: selectedHostEntity.id,
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Atribuir
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        {selectedHostEntity ? (
          <>
            <DialogHeader>
              <DialogTitle>
                Selecione um tutor da {selectedHostEntity.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Select onValueChange={(value) => setSelectedHostEntityAdvisorId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tutor</SelectLabel>
                    {selectedHostEntity.advisors.map(advisor => (
                      <SelectItem key={advisor.id} value={advisor.id}>{advisor.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button onClick={handleAssignHostEntity} isLoading={isLoading}>
                Atribuir
              </Button>
            </div>
          </>
        ) : (
          <>
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
                  onClick={() => setSelectedHostEntity(hostEntity)}
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
                      <ArrowRight />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
