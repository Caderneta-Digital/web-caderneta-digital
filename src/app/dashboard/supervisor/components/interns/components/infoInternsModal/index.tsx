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
import { InternType } from "@/types/internTypes";

type PropsType = {
  intern: InternType;
};

export const InfoInternsModal: React.FC<PropsType> = ({ intern }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Mais Informações</Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-auto">
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
          <h1>?</h1>
        </div>

        <div>
          <Label className="text-gray-600">Classificação</Label>
          <h1>?</h1>
        </div>

        <div>
          <Label className="text-gray-600">Horas Restantes</Label>
          <h1>?</h1>
        </div>

        <div>
          <Label className="text-gray-600">
            Registos Semanais (acho q nao faz sentido)
          </Label>
          <h1>7</h1>
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
          <h1>{intern.obs}</h1>
        </div>

        <div>
          <Label className="text-gray-600">Estado</Label>
          <InputEditLine value="?" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
