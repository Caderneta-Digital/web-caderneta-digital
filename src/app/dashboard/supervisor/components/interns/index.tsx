import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateInternModal } from "./components/createInternModal";
import { useAuth } from "@/context/AuthContext";
import { SupervisorTypeEnum } from "@/types/userTypes";
import { InternTableRow } from "./components/internTableRow";
import { InternType } from "@/types/internTypes";

type PropsType = {
  interns: InternType[];
};

export const SupervisorDashboardInterns: React.FC<PropsType> = ({
  interns,
}) => {
  const { user: supervisor } = useAuth();

  return (
    <div>
      <Card>
        <div className="flex justify-between p-3">
          <h1 className="text-xl">Estagiários</h1>
          {supervisor?.supervisorType ===
            SupervisorTypeEnum.COURSE_DIRECTOR && <CreateInternModal />}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Horas Restantes</TableHead>
              <TableHead>Entidade de Acolhimento</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interns.map((intern) => (
              <InternTableRow key={intern.id} intern={intern} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
