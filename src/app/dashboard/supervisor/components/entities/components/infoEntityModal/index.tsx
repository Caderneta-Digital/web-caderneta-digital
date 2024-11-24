import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputEditLine } from "@/components/ui/inputEditLine";
import { HostEntity } from "@/types/hostEntititesType";

type PropsType = {
  hostEntity: HostEntity;
};

export const InfoEntityModal: React.FC<PropsType> = ({ hostEntity }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Mais Informações</Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Entidade de Acolhimento</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="text-gray-600">Nome</Label>
          <h1>{hostEntity.name}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Nome do Responsável</Label>
          <h1>{hostEntity.responsibleName}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Ramo de Atividade</Label>
          <h1>{hostEntity.activityField}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Tutores de FCT</Label>
          <h1>?</h1>
        </div>

        <div>
          <Label className="text-gray-600">
            Cargo que desempenha na empresa (nao faz sentido)
          </Label>
          <h1>Programador</h1>
        </div>

        <div>
          <Label className="text-gray-600">NIF</Label>
          <h1>{hostEntity.nif}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Endereço</Label>
          <h1>{hostEntity.address}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Telefone</Label>
          <h1>{hostEntity.phone}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Email</Label>
          <h1>{hostEntity.email}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Estagiários Inseridos</Label>
          <h1>{hostEntity.interns.map((intern) => intern.name).join(", ")}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Estado</Label>
          <InputEditLine value="?" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

