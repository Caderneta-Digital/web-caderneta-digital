import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HostEntityType } from "@/types/hostEntititesType";
import { CreateHostEntityModal } from "./components/createHostEntityModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type PropsType = {
  hostEntities: HostEntityType[];
};

export const SupervisorDashboardEntities: React.FC<PropsType> = ({
  hostEntities,
}) => {
  const router = useRouter();

  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Entidades de Acolhimento</h1>
          <CreateHostEntityModal />
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
                <TableCell>{hostEntity.advisors.map(advisor => advisor.name).join(", ") || "-"}</TableCell>
                <TableCell>
                  {hostEntity.interns.map((intern) => intern.name).join(", ") ||
                    "-"}
                </TableCell>
                <TableCell>?</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/dashboard/supervisor/hostEntity/details/${hostEntity.id}`,
                      )
                    }
                  >
                    Mais Informações
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
